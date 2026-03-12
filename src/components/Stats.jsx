const STATS = [
  { value: '50+', label: 'Projects Completed' },
  { value: '68', label: 'Award Winner' },
  { value: '30', label: 'Happy Clients' },
  { value: '08', label: 'Years Experience' },
]

export default function Stats() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="text-center p-6 rounded-xl bg-[#141414] border border-gray-800/50"
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                <span className="text-[#E50914]">{value}</span>
              </p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
