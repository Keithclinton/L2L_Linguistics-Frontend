import { Link } from 'react-router-dom'
import { MEDIA_BASE_URL } from '../api/axios'

const LEVEL_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

export default function CourseCard({ course }) {
  const isFree = parseFloat(course.price) === 0

  return (
    <Link to={`/courses/${course.id}`} className="card hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Thumbnail */}
      <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
        {course.thumbnail ? (
          <img
            src={`${MEDIA_BASE_URL}${course.thumbnail}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {isFree
            ? <span className="badge-free">Free</span>
            : <span className="badge-paid">KES {parseFloat(course.price).toLocaleString()}</span>
          }
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          {course.category && (
            <span className="text-xs text-slate-500 font-medium">{course.category.name}</span>
          )}
          <span className="badge-level">{LEVEL_LABELS[course.level] || course.level}</span>
        </div>
        <h3 className="font-semibold text-slate-800 leading-snug mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 flex-1">{course.description}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>{course.lesson_count ?? 0} lessons</span>
          <span className="text-primary-600 font-medium">View Course →</span>
        </div>
      </div>
    </Link>
  )
}
