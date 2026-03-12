const EDUCATION = [
  {
    school: 'Algonquin College',
    program: 'Web Development and Internet Applications',
    note: "Dean's Honour List – GPA 3.6",
  },
  {
    school: 'Government Institute of Printing Technology',
    program: 'Diploma in Computer Engineering',
    note: null,
  },
]

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-theme-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2 text-center">Education</h2>
        <p className="text-theme-muted mb-12 text-center">Academic background</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {EDUCATION.map((item) => (
            <div key={item.school} className="rounded-xl bg-theme-card border border-theme-muted p-6">
              <h3 className="text-lg font-bold text-theme-primary mb-1">{item.school}</h3>
              <p className="text-theme-muted mb-2">{item.program}</p>
              {item.note && <p className="text-sm text-theme-accent font-medium">{item.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
