export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2 text-center">Professional Experience</h2>
        <p className="text-theme-muted mb-12 text-center">How I apply my skills in real projects</p>

        <div className="max-w-3xl mx-auto rounded-xl bg-theme-card border border-theme-muted p-8 md:p-10">
          <div className="flex flex-wrap items-baseline gap-2 mb-4">
            <h3 className="text-xl font-bold text-theme-primary">Software Developer</h3>
            <span className="text-theme-accent font-medium">Infox Technologies</span>
          </div>
          <ul className="text-theme-muted space-y-2 list-disc list-inside">
            <li>Developed Django web applications for clients</li>
            <li>Maintained MySQL databases and ensured data integrity</li>
            <li>Debugged software issues and improved application stability</li>
            <li>Worked on e-commerce and hospital management systems</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
