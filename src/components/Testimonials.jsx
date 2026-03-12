import { useState } from 'react'

const ITEMS = [
  {
    name: 'John Doe',
    role: 'Client',
    quote: 'Excellent work on our web platform. Delivered on time with great communication and clean code.',
    avatar: '👤',
  },
  {
    name: 'Jane Smith',
    role: 'Client',
    quote: 'Professional full stack developer. The application is fast, secure, and easy to maintain.',
    avatar: '👤',
  },
  {
    name: 'Alex Johnson',
    role: 'Client',
    quote: 'Highly recommend for any web project. Clear process and outstanding results.',
    avatar: '👤',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const item = ITEMS[active]

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]/50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Testimonials</h2>
        <p className="text-gray-400 mb-12">What My Clients Say</p>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="p-8 rounded-xl bg-[#1f1f1f] border border-gray-800/50 text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center text-2xl">
                {item.avatar}
              </div>
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-500">- {item.role}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === active ? 'bg-[#E50914] w-6' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
