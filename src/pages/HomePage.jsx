import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import CourseCard from '../components/CourseCard'
import Spinner from '../components/Spinner'

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses/?ordering=-created_at')
      .then(({ data }) => setCourses(data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block bg-primary-600/40 text-primary-100 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Online Learning Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Master Kiswahili<br />
            <span className="text-primary-300">At Your Own Pace</span>
          </h1>
          <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
            From greetings to fluency — structured courses, real lessons, and a community of learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/courses"
              className="bg-white text-primary-700 px-7 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="border border-white/40 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { value: 'Free & Paid', label: 'Course options' },
            { value: 'Structured', label: 'Lesson paths' },
            { value: 'Any device', label: 'Learn anywhere' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-primary-700">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Featured Courses</h2>
            <p className="text-slate-500 mt-1 text-sm">Start learning today — some are completely free</p>
          </div>
          <Link to="/courses" className="btn-outline text-sm hidden sm:block">View all</Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No courses yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/courses" className="btn-outline">View all courses</Link>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to start your journey?</h2>
          <p className="text-slate-300 mb-7">Create a free account and begin learning Kiswahili today.</p>
          <Link to="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
