const links = [
  { label: 'Email', href: 'mailto:sarath@example.com', icon: '✉️' },
  { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Open to new opportunities and collaborations. Feel free to reach out.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#1f1f1f] border border-gray-800/50 text-white font-medium hover:border-[#E50914] hover:bg-[#E50914]/10 hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
