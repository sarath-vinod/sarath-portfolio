import { useState } from 'react'
import emailjs from '@emailjs/browser'

const LINKS = [
  { label: 'Email', href: 'mailto:sarath@example.com', icon: '✉️' },
  { label: 'GitHub', href: 'https://github.com/sarath-vinod', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sarath-vinod', icon: '💼' },
]

const EMAILJS_PUBLIC_KEY = 'VN4pJNLd2BHkYr4Kh'
const EMAILJS_SERVICE_ID = 'service_d6vq5oi'
const EMAILJS_TEMPLATE_ID = 'template_p7lr1fl'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.text || err.message || 'Something went wrong. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status) setStatus(null)
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-theme-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2 text-center">Contact</h2>
        <p className="text-theme-muted mb-12 text-center max-w-xl mx-auto">
          Open to new opportunities and collaborations. Email, LinkedIn, and GitHub below — or send a message.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-theme-muted mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-lg bg-theme-card border border-theme-muted text-theme-primary placeholder-theme-muted focus-theme-accent outline-none transition-colors disabled:opacity-60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-theme-muted mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-lg bg-theme-card border border-theme-muted text-theme-primary placeholder-theme-muted focus-theme-accent outline-none transition-colors disabled:opacity-60"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-theme-muted mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-theme-card border border-theme-muted text-theme-primary placeholder-theme-muted focus-theme-accent outline-none transition-colors resize-none disabled:opacity-60"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-8 py-4 bg-theme-accent text-white font-semibold rounded hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-sm text-theme-accent">Thanks! I&apos;ll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </form>
          </div>
          <div className="flex-1 w-full lg:max-w-sm">
            <p className="text-theme-muted mb-4">Or reach me directly:</p>
            <div className="flex flex-wrap gap-4">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-theme-card border border-theme-muted text-theme-primary font-medium hover:border-theme-accent hover:bg-theme-accent/10 transition-colors"
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
