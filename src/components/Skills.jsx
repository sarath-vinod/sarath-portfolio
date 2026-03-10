const skills = [
  'PHP',
  'JavaScript',
  'Python',
  'C#',
  'React',
  'MySQL',
  'Laravel',
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Skills & Technologies</h2>
        <p className="text-gray-400 mb-10">Technologies I work with</p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {skills.map((skill) => (
            <div
              key={skill}
              className="px-6 py-4 rounded-xl bg-[#1f1f1f] border border-gray-800/50 text-white font-semibold hover:border-[#E50914]/50 hover:bg-[#E50914]/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#E50914]/20 cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
