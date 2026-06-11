import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import CourseCard from '../components/CourseCard'
import Spinner from '../components/Spinner'

const LEVELS = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const level = searchParams.get('level') || ''
  const free = searchParams.get('free') || ''
  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''

  useEffect(() => {
    api.get('/courses/categories/').then(({ data }) => setCategories(data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (level) params.level = level
    if (free) params.free = free
    if (category) params.category = category
    if (search) params.search = search

    api.get('/courses/', { params })
      .then(({ data }) => setCourses(data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [level, free, category, search])

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Courses</h1>
      <p className="text-slate-500 mb-8">Browse our Kiswahili learning catalogue</p>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-8 flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-slate-500 block mb-1">Search</label>
          <input
            type="text"
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setParam('search', e.target.value)}
            className="input text-sm"
          />
        </div>

        {/* Category */}
        <div className="min-w-[160px]">
          <label className="text-xs font-medium text-slate-500 block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setParam('category', e.target.value)}
            className="input text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="min-w-[140px]">
          <label className="text-xs font-medium text-slate-500 block mb-1">Level</label>
          <select value={level} onChange={(e) => setParam('level', e.target.value)} className="input text-sm">
            {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        {/* Free only toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none pb-2">
          <div
            className={`w-10 h-5 rounded-full transition-colors duration-200 ${free === 'true' ? 'bg-emerald-500' : 'bg-slate-200'}`}
            onClick={() => setParam('free', free === 'true' ? '' : 'true')}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${free === 'true' ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-slate-600">Free only</span>
        </label>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg">No courses match your filters.</p>
          <button onClick={() => setSearchParams({})} className="btn-outline mt-4 text-sm">Clear filters</button>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-400 mb-5">{courses.length} course{courses.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </>
      )}
    </div>
  )
}
