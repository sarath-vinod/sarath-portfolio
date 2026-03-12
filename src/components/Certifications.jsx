const CERTS = [
  { title: 'Machine Learning Feature Selection in Python', icon: '🧠' },
  { title: 'IBM Watson AI', icon: '🤖' },
  { title: 'CPR / First Aid', icon: '🩹' },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2 text-center">Certifications</h2>
        <p className="text-theme-muted mb-12 text-center">Courses and credentials</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="rounded-xl bg-theme-card border border-theme-muted p-6 text-center hover:border-theme-accent/50 transition-colors"
            >
              <span className="text-4xl block mb-3">{c.icon}</span>
              <h3 className="text-theme-primary font-semibold">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
