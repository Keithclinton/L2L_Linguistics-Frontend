import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

export default function LessonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get(`/courses/lessons/${id}/`)
      .then(({ data }) => setLesson(data))
      .catch((err) => {
        if (err.response?.status === 403) {
          setError('You need to enroll in this course to access this lesson.')
        } else {
          navigate('/courses')
        }
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const markComplete = async () => {
    setMarking(true)
    try {
      await api.post(`/courses/lessons/${id}/complete/`)
      setCompleted(true)
    } catch {
      // ignore
    } finally {
      setMarking(false)
    }
  }

  if (loading) return <Spinner fullPage />

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="card p-10">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-slate-600 mb-6">{error}</p>
          <Tooltip text={sw.browseCourses}>
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
          </Tooltip>
        </div>
      </div>
    )
  }

  if (!lesson) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/courses" className="hover:text-primary-700 transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium truncate">{lesson.title}</span>
      </nav>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{lesson.title}</h1>
          {lesson.duration_minutes > 0 && (
            <p className="text-sm text-slate-400 mt-1">{lesson.duration_minutes} min</p>
          )}
        </div>

        {/* Video */}
        {lesson.video_url && (
          <div className="rounded-xl overflow-hidden aspect-video bg-slate-900">
            <iframe
              src={lesson.video_url}
              title={lesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Content */}
        {lesson.content && (
          <div className="card p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-3">Lesson Notes</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">
              {lesson.content}
            </div>
          </div>
        )}

        {/* Mark complete */}
        <div className="card p-5 flex items-center justify-between">
          <div>
            {completed ? (
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Lesson marked as complete!
              </div>
            ) : (
              <p className="text-sm text-slate-600">Finished this lesson?</p>
            )}
          </div>
          {!completed && (
            <Tooltip text={sw.markComplete}>
              <button onClick={markComplete} disabled={marking} className="btn-primary text-sm">
                {marking ? 'Saving…' : 'Mark Complete'}
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
