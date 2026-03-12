import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const SKILL_BARS = [
  { label: 'PHP', percent: 88 },
  { label: 'JavaScript', percent: 90 },
  { label: 'Django', percent: 85 },
  { label: 'Laravel', percent: 82 },
]

const ABOUT_PHOTO_LIGHT = '/photos/photo1.png'
const ABOUT_PHOTO_DARK = '/photos/photo.png'

export default function About() {
  const { theme } = useTheme()
  const aboutPhoto = theme === 'light' ? ABOUT_PHOTO_LIGHT : ABOUT_PHOTO_DARK
  const [aboutImgError, setAboutImgError] = useState(false)

  useEffect(() => {
    setAboutImgError(false)
  }, [theme])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-theme-section">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        <div className="flex-1 relative w-full max-w-lg">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-theme-muted bg-theme-card-alt">
            {!aboutImgError ? (
              <img
                src={aboutPhoto}
                alt="Sarath Vinod"
                className="absolute inset-0 w-full h-full object-cover object-center"
                onError={() => setAboutImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-theme-muted">
                <span className="text-6xl">💻</span>
              </div>
            )}
          </div>
          <div className={`absolute bottom-4 left-4 px-4 py-3 rounded font-semibold text-sm shadow-lg border ${
            theme === 'light'
              ? 'bg-white/95 text-black border-black/20'
              : 'bg-black/85 text-white border-white/30'
          }`}>
            Full-Stack & Databases
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-6">About Me</h2>
          <ul className="text-theme-muted space-y-3 mb-8 leading-relaxed">
            <li>Web Development student at <strong className="text-theme-primary">Algonquin College</strong></li>
            <li>Previously worked as <strong className="text-theme-primary">Software Developer at Infox Technologies</strong></li>
            <li>Experience in <strong className="text-theme-primary">full-stack development, databases, and secure web applications</strong></li>
            <li>Interested in <strong className="text-theme-primary">web applications, backend development, and software engineering</strong></li>
          </ul>

          <div className="space-y-4 mb-10">
            {SKILL_BARS.map(({ label, percent }) => (
              <div key={label}>
                <div className="flex justify-between text-sm text-theme-muted mb-1">
                  <span className="uppercase font-medium">{label}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-2 bg-theme-card rounded-full overflow-hidden">
                  <div className="h-full bg-theme-accent rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo('contact')} className="px-8 py-4 bg-theme-accent text-white font-semibold rounded hover:opacity-90 transition-opacity">
              Hire Me!
            </button>
            <button onClick={() => scrollTo('projects')} className="px-8 py-4 bg-transparent btn-outline-theme font-semibold rounded transition-colors">
              View Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
