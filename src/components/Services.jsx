const SERVICES = [
  {
    icon: 'S',
    title: 'Strategy & Research',
    description: 'Planning and analysis to align your product with user needs and business goals.',
    accent: true,
  },
  {
    icon: '🖥️',
    title: 'Web Development',
    description: 'Full stack web applications with modern frameworks, APIs, and databases.',
    accent: true,
  },
  {
    icon: '📱',
    title: 'UI/UX Design',
    description: 'Clean, accessible interfaces and user flows for web and mobile.',
    accent: false,
  },
  {
    icon: '🔒',
    title: 'Security & APIs',
    description: 'Secure authentication, authorization, and RESTful or GraphQL APIs.',
    accent: false,
  },
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Optimized load times, caching, and scalable architecture.',
    accent: true,
  },
  {
    icon: '🛠️',
    title: 'Maintenance',
    description: 'Ongoing support, updates, and refactoring to keep projects healthy.',
    accent: false,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Services</h2>
        <p className="text-gray-400 mb-12">What I Do For My Clients</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-xl bg-[#1f1f1f] border border-gray-800/50 text-left hover:border-[#E50914]/50 transition-colors"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-lg text-2xl font-bold mb-4 ${
                  s.accent ? 'bg-[#E50914] text-white' : 'bg-[#2a2a2a] text-gray-300'
                }`}
              >
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 bg-[#E50914] text-white font-semibold rounded hover:bg-[#f40612] transition-colors"
        >
          Read More
        </button>
      </div>
    </section>
  )
}
