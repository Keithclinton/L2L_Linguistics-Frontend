import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api, { MEDIA_BASE_URL } from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

const LEVEL_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export default function CourseDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    api.get(`/courses/${id}/`)
      .then(({ data }) => setCourse(data))
      .catch(() => navigate('/courses'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleEnroll = async () => {
    if (!user) return navigate('/login')
    setEnrolling(true)
    setMessage(null)
    try {
      await api.post(`/courses/${id}/enroll/`)
      const { data } = await api.get(`/courses/${id}/`)
      setCourse(data)
      setMessage({ type: 'success', text: 'Enrolled successfully! You can now access all lessons.' })
    } catch (err) {
      const detail = err.response?.data?.detail
      if (err.response?.status === 402) {
        navigate('/payment', { state: { course } })
      } else {
        setMessage({ type: 'error', text: detail || 'Enrollment failed. Please try again.' })
      }
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) return <Spinner fullPage />
  if (!course) return null

  const isFree = parseFloat(course.price) === 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Tooltip text={sw.backToCourses}>
        <Link to="/courses" className="text-sm text-slate-500 hover:text-primary-700 flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </Link>
      </Tooltip>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.category && (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {course.category.name}
                </span>
              )}
              <span className="badge-level">{LEVEL_LABELS[course.level] || course.level}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 leading-tight">{course.title}</h1>
          </div>

          {/* Thumbnail */}
          {course.thumbnail ? (
            <img
              src={`${MEDIA_BASE_URL}${course.thumbnail}`}
              alt={course.title}
              className="w-full rounded-xl object-cover h-56 sm:h-72"
            />
          ) : (
            <div className="w-full rounded-xl h-56 sm:h-72 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}

          {/* Description */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">About this course</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{course.description}</p>
          </div>

          {/* Lessons */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Course Content
              <span className="text-sm text-slate-400 font-normal ml-2">({course.lesson_count} lessons)</span>
            </h2>
            {course.lessons?.length === 0 ? (
              <p className="text-slate-400 text-sm">No lessons available yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {course.lessons?.map((lesson, i) => (
                  <li key={lesson.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-medium flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{lesson.title}</p>
                        {lesson.duration_minutes > 0 && (
                          <p className="text-xs text-slate-400">{lesson.duration_minutes} min</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.is_preview && (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Preview</span>
                      )}
                      {course.is_enrolled ? (
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                        >
                          Start →
                        </Link>
                      ) : lesson.is_preview ? (
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                        >
                          Preview →
                        </Link>
                      ) : (
                        <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24 space-y-4">
            <div className="text-center">
              {isFree ? (
                <p className="text-3xl font-bold text-emerald-600">Free</p>
              ) : (
                <p className="text-3xl font-bold text-slate-800">
                  KES {parseFloat(course.price).toLocaleString()}
                </p>
              )}
            </div>

            {message && (
              <div className={`text-sm rounded-lg px-4 py-3 ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {message.text}
              </div>
            )}

            {course.is_enrolled ? (
              <div className="text-center space-y-3">
                <div className="text-sm text-emerald-600 font-medium flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You are enrolled
                </div>
                {course.lessons?.[0] && (
                  <Tooltip text={sw.continueLearning} className="block w-full">
                    <Link to={`/lessons/${course.lessons[0].id}`} className="btn-primary w-full text-center block">
                      Continue Learning
                    </Link>
                  </Tooltip>
                )}
              </div>
            ) : (
              <Tooltip text={isFree ? sw.enrollFree : sw.enrollNow} className="block w-full">
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full"
                >
                  {enrolling ? 'Processing…' : isFree ? 'Enroll for Free' : 'Enroll Now'}
                </button>
              </Tooltip>
            )}

            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.lesson_count} lessons
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Level: {LEVEL_LABELS[course.level] || course.level}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Full lifetime access
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
