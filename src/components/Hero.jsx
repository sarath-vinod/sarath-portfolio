import SlidingVideoBanner from './SlidingVideoBanner'

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#141414]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E50914_0%,_transparent_60%)] opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
          Sarath Vinod
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-[#E50914] font-semibold mb-6">
          Full Stack Web Developer
        </p>
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Building secure, scalable web applications with modern technologies. Focused on clean code,
          performance, and great user experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-[#E50914] text-white font-semibold rounded-lg hover:bg-[#f40612] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E50914]/30"
          >
            View Projects
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </button>
        </div>

        {/* E-commerce style offer banners - full width */}
        <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-10 sm:mt-14 px-3 sm:px-6">
          <SlidingVideoBanner />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
