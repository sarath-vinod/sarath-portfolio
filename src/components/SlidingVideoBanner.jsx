import { useState, useEffect, useRef } from 'react'

/**
 * E-commerce style offer banners: video or image + optional headline, CTA.
 * Add videos to public/banners/ — use headline, subtext, ctaText, ctaLink, badge per slide.
 */
const DEFAULT_BANNERS = [
  {
    type: 'video',
    src: '/banners/banner-1.mp4',
    poster: '/banners/banner-1-poster.jpg',
    title: 'Project showcase',
    headline: 'Featured Projects',
    subtext: 'Secure, modern web applications',
    ctaText: 'View Projects',
    ctaLink: '#projects',
    badge: 'New',
  },
  {
    type: 'video',
    src: '/banners/banner-2.mp4',
    poster: '/banners/banner-2-poster.jpg',
    title: 'Demo',
    headline: 'See My Work',
    subtext: 'Full stack development & more',
    ctaText: 'Explore',
    ctaLink: '#projects',
    badge: 'Hot',
  },
  {
    type: 'video',
    src: '/banners/banner-3.mp4',
    poster: '/banners/banner-3-poster.jpg',
    title: 'Work',
    headline: 'Let\'s Build Together',
    subtext: 'Get in touch for your next project',
    ctaText: 'Contact Me',
    ctaLink: '#contact',
    badge: null,
  },
]

const SLIDE_DURATION_MS = 5000

export default function SlidingVideoBanner({ items = DEFAULT_BANNERS, slideDuration = SLIDE_DURATION_MS }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [progress, setProgress] = useState(0)
  const list = items.length ? items : DEFAULT_BANNERS
  const containerRef = useRef(null)
  const videoRefs = useRef([])

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === activeIndex) el.play().catch(() => {})
      else el.pause()
    })
  }, [activeIndex])

  const goTo = (index) => {
    setActiveIndex((index + list.length) % list.length)
    setProgress(0)
  }
  const goNext = () => goTo(activeIndex + 1)
  const goPrev = () => goTo(activeIndex - 1)

  useEffect(() => {
    if (isPaused) return
    setProgress(0)
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min((elapsed / slideDuration) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        setActiveIndex((i) => (i + 1) % list.length)
      }
    }, 80)
    return () => clearInterval(id)
  }, [isPaused, activeIndex, list.length, slideDuration])

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart == null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
    setTouchStart(null)
  }

  const scrollToId = (id) => {
    document.getElementById(id?.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-black rounded-none sm:rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding track - e-commerce wide aspect */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {list.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full relative aspect-[21/9] min-h-[200px] sm:min-h-[240px] md:min-h-[280px]"
            >
              {item.type === 'video' ? (
                <>
                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={item.src}
                    poster={item.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const fallback = e.target.nextElementSibling
                      if (fallback) fallback.classList.remove('hidden')
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] items-center justify-center">
                    <span className="text-gray-500 text-sm">Video: {item.title || index + 1}</span>
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={item.title || `Offer ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* E-commerce style gradient overlay for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Offer content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-start text-left max-w-2xl">
                  {item.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E50914] text-white text-xs font-bold uppercase tracking-wider mb-3">
                      {item.badge}
                    </span>
                  )}
                  {item.headline && (
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-1">
                      {item.headline}
                    </h2>
                  )}
                  {item.subtext && (
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4">{item.subtext}</p>
                  )}
                  {item.ctaText && item.ctaLink && (
                    <a
                      href={item.ctaLink}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToId(item.ctaLink)
                      }}
                      className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-[#E50914] text-white font-semibold text-sm sm:text-base hover:bg-[#f40612] transition-colors shadow-lg"
                    >
                      {item.ctaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next - e-commerce style */}
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Progress bar (e-commerce style) */}
        {list.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
            <div
              className="h-full bg-[#E50914] transition-none duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Dots */}
        {list.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {isPaused && (
          <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded bg-black/50 text-white/80 text-xs">
            Paused
          </div>
        )}
      </div>
    </div>
  )
}
