import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api, { MEDIA_BASE_URL } from '../api/axios'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-primary-50 text-primary-700',
  cancelled: 'bg-slate-100 text-slate-500',
}

export default function MyEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses/my-enrollments/')
      .then(({ data }) => setEnrollments(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner fullPage />

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">My Learning</h1>
      <p className="text-slate-500 text-sm mb-8">Courses you are enrolled in</p>

      {enrollments.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-14 h-14 mx-auto text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-slate-500 text-lg mb-4">You haven't enrolled in any courses yet.</p>
          <Tooltip text={sw.browseCourses}>
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
          </Tooltip>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.course
            const isFree = parseFloat(course.price) === 0
            return (
              <div key={enrollment.id} className="card flex flex-col">
                {/* Thumbnail */}
                <div className="h-36 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={`${MEDIA_BASE_URL}${course.thumbnail}`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <span className={`absolute top-2 right-2 badge ${STATUS_STYLES[enrollment.status]}`}>
                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-slate-400 mb-1">{course.category?.name}</p>
                  <h3 className="font-semibold text-slate-800 leading-snug mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Tooltip text={sw.viewCourse} className="flex-1 block">
                      <Link to={`/courses/${course.id}`} className="btn-outline text-xs w-full text-center block">
                        View Course
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
