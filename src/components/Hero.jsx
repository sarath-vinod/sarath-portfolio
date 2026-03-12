import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import SlidingVideoBanner from './SlidingVideoBanner'

const DEFAULT_PHOTO_LIGHT = '/photos/dancer_transparent_final.png'
const DEFAULT_PHOTO_DARK = '/photos/dancer_no_background.png'

export default function Hero() {
  const { theme } = useTheme()
  const defaultPhoto = theme === 'light' ? DEFAULT_PHOTO_LIGHT : DEFAULT_PHOTO_DARK
  const [photoSrc, setPhotoSrc] = useState(defaultPhoto)
  const [photoError, setPhotoError] = useState(false)

  useEffect(() => {
    setPhotoSrc(theme === 'light' ? DEFAULT_PHOTO_LIGHT : DEFAULT_PHOTO_DARK)
    setPhotoError(false)
  }, [theme])

  const handlePhotoError = () => {
    if (photoSrc === '/photos/dancer_transparent_final.png') setPhotoSrc('/photos/dancer_no_background1.png')
    else if (photoSrc === '/photos/dancer_no_background1.png') setPhotoSrc('/photos/dancer_no_background.png')
    else if (photoSrc === '/photos/dancer_no_background.png') setPhotoSrc('/photos/dance_image.svg')
    else if (photoSrc === '/photos/dance_image.svg') setPhotoSrc('/photos/about-black.png')
    else if (photoSrc === '/photos/about-black.png') setPhotoSrc('/photos/about.png')
    else if (photoSrc === '/photos/about.png') setPhotoSrc('/photos/photo.png')
    else if (photoSrc === '/photos/photo.png') setPhotoSrc('/photos/home-photo.jpg')
    else if (photoSrc === '/photos/home-photo.jpg') setPhotoSrc('/photos/home-photo.png')
    else if (photoSrc === '/photos/home-photo.png') setPhotoSrc('/photos/home-photo.jpeg')
    else setPhotoError(true)
  }
  const isSvg = photoSrc.endsWith('.svg')
  const isNoBgDance = photoSrc.includes('dancer_no_background') || photoSrc.includes('nobackground1') || photoSrc.includes('transparent_final')

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden pt-20 pb-12">
        {/* Subtle background - brushstroke feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" aria-hidden>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E50914]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Name + role — same visual hierarchy as DEVELOPER / Coder headings */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary mb-2 text-center tracking-tight">
            Sarath Mangadampillil Vinod
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-theme-accent font-semibold mb-10 sm:mb-14 text-center tracking-tight">
            Web Developer · Full-Stack Developer
          </p>

          {/* Center: photo with flanking text (reference layout) */}
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Left: Designer / Developer label */}
            <div className="order-2 lg:order-1 flex-1 text-center lg:text-right lg:max-w-xs">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-primary uppercase tracking-tight mb-2">
                Developer
              </h2>
              <p className="text-theme-muted text-sm sm:text-base leading-relaxed">
                Full-stack developer specialising in web applications, APIs and secure systems.
              </p>
            </div>

            {/* Center: no-background dance image, SVG, or photo — website-friendly size */}
            <div className="order-1 lg:order-2 flex-shrink-0 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px]">
              {!photoError ? (
                <div className={`relative w-full overflow-hidden rounded-lg ${isNoBgDance ? 'bg-transparent min-h-[320px] sm:min-h-[380px] flex items-center justify-center' : `border border-theme shadow-2xl bg-theme-card-alt ${isSvg ? 'aspect-square min-h-[280px] sm:min-h-[340px]' : 'aspect-[3/4]'}`}`}>
                  <img
                    src={photoSrc}
                    alt="Sarath Vinod"
                    className={`${isNoBgDance ? 'w-full h-auto max-h-[380px] sm:max-h-[480px] md:max-h-[520px] lg:max-h-[580px] object-contain object-center' : `absolute inset-0 w-full h-full ${isSvg ? 'object-contain object-center p-2' : 'object-cover object-center'}`}`}
                    onError={handlePhotoError}
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] w-full rounded-lg border-2 border-dashed border-theme-accent/40 bg-theme-card flex items-center justify-center text-theme-muted text-sm text-center px-4">
                  Add your image to <strong>public/photos/</strong>
                </div>
              )}
            </div>

            {/* Right: Coder label */}
            <div className="order-3 flex-1 text-center lg:text-left lg:max-w-xs">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-primary tracking-tight mb-2">
                <span className="text-theme-muted">&lt;</span>Coder<span className="text-theme-muted">&gt;</span>
              </h2>
              <p className="text-theme-muted text-sm sm:text-base leading-relaxed">
                Front-end and backend developer who writes clean, maintainable code.
              </p>
            </div>
          </div>

          {/* CTAs + links below */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-4 bg-theme-accent text-white font-semibold rounded hover:opacity-90 transition-opacity"
            >
              View Projects
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-4 bg-transparent btn-outline-theme font-semibold rounded transition-colors"
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-transparent btn-outline-theme font-semibold rounded transition-colors"
            >
              Contact Me
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-8 text-sm justify-center">
            <a href="mailto:sarath@example.com" className="text-theme-muted hover:text-theme-accent transition-colors">Mail</a>
            <a href="https://github.com/sarath-vinod" target="_blank" rel="noopener noreferrer" className="text-theme-muted hover:text-theme-accent transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/sarath-vinod" target="_blank" rel="noopener noreferrer" className="text-theme-muted hover:text-theme-accent transition-colors">LinkedIn</a>
          </div>
          <button
            onClick={() => scrollTo('about')}
            className="mt-8 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      <div className="relative w-[100vw] left-1/2 -translate-x-1/2 px-3 sm:px-6 pb-8">
        <SlidingVideoBanner />
      </div>
    </>
  )
}
