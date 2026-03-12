const SKILL_GROUPS = [
  {
    title: 'Languages',
    items: ['PHP', 'JavaScript', 'Python', 'C#', 'SQL', 'HTML / CSS'],
  },
  {
    title: 'Frameworks & Tools',
    items: ['Django', 'ASP.NET Core', 'Laravel', 'Bootstrap', 'Git / GitHub'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'SQLite'],
  },
  {
    title: 'Tools',
    items: ['VS Code', 'Visual Studio', 'DataGrip', 'Figma'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-theme-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2 text-center">Technical Skills</h2>
        <p className="text-theme-muted mb-12 text-center">Languages, frameworks, databases & tools I use</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-xl bg-theme-card border border-theme-muted p-6">
              <h3 className="text-lg font-semibold text-theme-accent mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg bg-theme-card-alt border border-theme-muted text-theme-muted text-sm font-medium hover:border-theme-accent/50 hover:bg-theme-accent/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
