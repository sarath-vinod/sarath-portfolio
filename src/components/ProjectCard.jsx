export default function ProjectCard({ title, description, technologies, githubUrl, liveUrl, imagePlaceholder, isHighlighted }) {
  return (
    <div className={`group flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] transition-all duration-300 ${isHighlighted ? 'scale-110 z-10' : 'scale-90 opacity-90 hover:scale-95 hover:opacity-95'}`}>
      <div className={`relative rounded-lg overflow-hidden bg-theme-card border-2 shadow-xl transition-all duration-300 backdrop-blur-sm ${
        isHighlighted
          ? 'border-theme-accent shadow-2xl'
          : 'border-theme-accent-soft hover:shadow-2xl hover:border-theme-accent'
      }`}>
        {/* Card image / placeholder */}
        <div className="aspect-video bg-gradient-to-br from-theme-card-alt to-theme-card flex items-center justify-center overflow-hidden">
          {imagePlaceholder ? (
            <div className="w-full h-full bg-gradient-to-br from-theme-accent/20 to-theme-page flex items-center justify-center text-4xl opacity-80">
              {imagePlaceholder}
            </div>
          ) : (
            <div className="text-theme-muted text-6xl font-bold opacity-30">{title.charAt(0)}</div>
          )}
        </div>

        {/* Content - visible on hover (glassmorphism) */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-page/95 via-theme-page/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-theme-primary mb-1">{title}</h3>
          <p className="text-sm text-theme-muted mb-3 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded bg-theme-card/80 text-theme-muted border border-theme"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-sm font-medium bg-theme-card/80 hover:bg-theme-accent text-white rounded transition-colors"
              >
                GitHub
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-sm font-medium bg-theme-accent hover:opacity-90 text-white rounded transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Always-visible title bar (compact) */}
        <div className="p-3 group-hover:opacity-0 transition-opacity">
          <h3 className="text-theme-primary font-semibold truncate">{title}</h3>
          <p className="text-xs text-theme-muted truncate">{technologies.join(' • ')}</p>
        </div>
      </div>
    </div>
  )
}
