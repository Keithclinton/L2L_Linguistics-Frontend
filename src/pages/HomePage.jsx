import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import CourseCarousel from '../components/CourseCarousel'
import FAQAccordion from '../components/FAQAccordion'
import Spinner from '../components/Spinner'
import Tooltip from '../components/Tooltip'
import sw from '../i18n/sw'

const STEPS = [
  { title: 'Sign Up', desc: 'Create a free account in seconds — no payment needed to get started.' },
  { title: 'Pick a Course', desc: 'Browse free and paid courses by level and topic, then enroll.' },
  { title: 'Start Learning', desc: 'Work through lessons at your own pace, anytime, on any device.' },
]

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses/')
      .then(({ data }) => setCourses(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const freeCourses = courses.filter((c) => parseFloat(c.price) === 0)

  const categoryGroups = courses.reduce((acc, course) => {
    const name = course.category?.name || 'Other'
    if (!acc[name]) acc[name] = []
    acc[name].push(course)
    return acc
  }, {})

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
            <Tooltip text={sw.browseCourses}>
              <Link
                to="/courses"
                className="bg-white text-primary-700 px-7 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Browse Courses
              </Link>
            </Tooltip>
            <Tooltip text={sw.signUpFree}>
              <Link
                to="/register"
                className="border border-white/40 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Sign Up Free
              </Link>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">How It Works</h2>
          <p className="text-slate-500 text-center mb-10 text-sm">Three simple steps to start learning Kiswahili</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
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

      {/* Course carousels */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Explore Courses</h2>
            <p className="text-slate-500 mt-1 text-sm">Start learning today — some are completely free</p>
          </div>
          <Tooltip text={sw.viewAll} className="hidden sm:inline-block">
            <Link to="/courses" className="btn-outline text-sm">View all</Link>
          </Tooltip>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">No courses yet — check back soon.</p>
          </div>
        ) : (
          <>
            <CourseCarousel title="Free Courses" courses={freeCourses} />
            {Object.entries(categoryGroups).map(([name, list]) => (
              <CourseCarousel key={name} title={name} courses={list} />
            ))}
          </>
        )}

        <div className="text-center mt-4 sm:hidden">
          <Tooltip text={sw.viewAllCourses}>
            <Link to="/courses" className="btn-outline">View all courses</Link>
          </Tooltip>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-center mb-8 text-sm">Quick answers about courses and payments</p>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to start your journey?</h2>
          <p className="text-slate-300 mb-7">Create a free account and begin learning Kiswahili today.</p>
          <Tooltip text={sw.createFreeAccount}>
            <Link to="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Create Free Account
            </Link>
          </Tooltip>
        </div>
      </section>
    </div>
  )
}
