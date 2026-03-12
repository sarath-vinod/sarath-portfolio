export default function FreelanceBanner() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-theme-card-alt" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-8">
          I&apos;m Available for Freelancing
        </h2>
        <button
          onClick={() => scrollTo('contact')}
          className="px-10 py-4 bg-theme-accent text-white font-semibold rounded hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </button>
      </div>
    </section>
  )
}
