import { useState, useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  { id: 1, title: 'SLCA Ottawa Digital Hub', description: 'Community platform for SLCA Ottawa. Digital hub for members and events.', technologies: ['React', 'PHP', 'MySQL'], githubUrl: 'https://github.com', liveUrl: null, imagePlaceholder: '🌐' },
  { id: 2, title: 'Movie Mayhem Security Project', description: 'Security-focused movie app with authentication and safe data handling.', technologies: ['React', 'Node.js', 'JWT'], githubUrl: 'https://github.com', liveUrl: null, imagePlaceholder: '🎬' },
  { id: 3, title: 'Task Manager Application', description: 'Full-featured task manager with boards, due dates, and collaboration.', technologies: ['React', 'JavaScript', 'REST API'], githubUrl: 'https://github.com', liveUrl: null, imagePlaceholder: '✅' },
  { id: 4, title: 'Invoice Management System', description: 'Create, send, and track invoices with client management.', technologies: ['PHP', 'Laravel', 'MySQL'], githubUrl: 'https://github.com', liveUrl: null, imagePlaceholder: '📄' },
  { id: 5, title: 'Pokedex API App', description: 'Browse Pokémon data with search and filters using the PokeAPI.', technologies: ['React', 'JavaScript', 'API'], githubUrl: 'https://github.com', liveUrl: null, imagePlaceholder: '⚡' },
]

const SLIDE_DURATION_MS = 5000
// 11 segments: [spacer, p0..p4, p0..p4] — no gap between last (Pokedex) and first
const SEGMENT_COUNT = 11
const MAX_POSITION = 6 // at 6 we show p0,p1,p2; reset to 1 (same view, no gap)

export default function Projects() {
  const [slidePosition, setSlidePosition] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const containerRef = useRef(null)

  const activeProjectIndex = slidePosition <= 4 ? slidePosition : slidePosition === 5 ? 0 : 1

  const goToProject = (projectIndex) => {
    setNoTransition(false)
    setSlidePosition(projectIndex)
  }

  const goNext = () => {
    if (slidePosition === MAX_POSITION) {
      setNoTransition(true)
      setSlidePosition(1)
      return
    }
    setNoTransition(false)
    setSlidePosition(slidePosition + 1)
  }

  const goPrev = () => {
    setNoTransition(false)
    setSlidePosition(slidePosition === 0 ? MAX_POSITION : slidePosition - 1)
  }

  useEffect(() => {
    if (noTransition) {
      const t = requestAnimationFrame(() => setNoTransition(false))
      return () => cancelAnimationFrame(t)
    }
  }, [noTransition])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      if (slidePosition === MAX_POSITION) {
        setNoTransition(true)
        setSlidePosition(1)
      } else {
        setSlidePosition((p) => p + 1)
      }
    }, SLIDE_DURATION_MS)
    return () => clearInterval(id)
  }, [isPaused, slidePosition])

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart == null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
    setTouchStart(null)
  }

  // [spacer, p0, p1, p2, p3, p4, p0, p1, p2, p3, p4] — no gap after Pokedex, no gap before first
  const segments = [
    null,
    ...projects.map((p) => ({ project: p })),
    ...projects.map((p) => ({ project: p })),
  ]

  // Centre segment for highlight: pos 0->1, 1->2, 2->3, 3->4, 4->5, 5->6 (p0), 6->7 (p1)
  const centerSegmentIndex = slidePosition <= 4 ? slidePosition + 1 : slidePosition === 5 ? 6 : 7

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Projects</h2>
        <p className="text-gray-400 mb-8">3 cards visible — centre one is big, then slides forward to the next</p>

        <div
          ref={containerRef}
          className="relative overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex flex-shrink-0"
            style={{
              width: `${SEGMENT_COUNT * (100 / 3)}%`,
              transform: `translateX(-${slidePosition * (100 / SEGMENT_COUNT)}%)`,
              transition: noTransition ? 'none' : 'transform 500ms ease-out',
            }}
          >
            {segments.map((seg, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center py-3 sm:py-4 px-1"
                style={{ width: `${100 / SEGMENT_COUNT}%` }}
                aria-hidden={!seg}
              >
                {seg ? (
                  <div className="w-full max-w-[280px] mx-auto">
                    <ProjectCard
                      title={seg.project.title}
                      description={seg.project.description}
                      technologies={seg.project.technologies}
                      githubUrl={seg.project.githubUrl}
                      liveUrl={seg.project.liveUrl}
                      imagePlaceholder={seg.project.imagePlaceholder}
                      isHighlighted={i === centerSegmentIndex}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {projects.length > 1 && (
            <>
              <button type="button" onClick={goPrev} aria-label="Previous" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" onClick={goNext} aria-label="Next" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <div className="flex justify-center gap-2 pb-4 pt-2">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Project ${i + 1}`}
                onClick={() => goToProject(i)}
                className={`h-1.5 rounded-full transition-all ${i === activeProjectIndex ? 'w-6 bg-[#E50914]' : 'w-1.5 bg-gray-500 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
