import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTRO_QUOTE = "Welcome to my portfolio. I build secure, modern web applications."

// Flow: AZ logo → AMBROZZZ → typewriter quote → end
export default function AZIntro() {
  const [stage, setStage] = useState('logo')   // 'logo' | 'text' | 'quote'
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStage('text'), 2800)
    const t2 = setTimeout(() => setStage('quote'), 5000)
    const t3 = setTimeout(() => setFadeOut(true), 8500)
    const t4 = setTimeout(() => setShow(false), 9000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  // Typewriter: reveal one character at a time when on quote stage
  useEffect(() => {
    if (stage !== 'quote') return
    setVisibleChars(0)
    const total = INTRO_QUOTE.length
    const id = setInterval(() => {
      setVisibleChars((n) => {
        if (n >= total) {
          clearInterval(id)
          return n
        }
        return n + 1
      })
    }, 55)
    return () => clearInterval(id)
  }, [stage])

  if (!show) return null

  const logoBlock = (key) => (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      <img
        src="/logo/az-logo.png"
        alt="Ambrozzz"
        className="relative z-10 w-48 sm:w-64 md:w-72 max-w-[280px] h-auto block"
        onError={(e) => {
          e.target.style.display = 'none'
          const fallback = e.target.nextElementSibling
          if (fallback) fallback.classList.remove('hidden')
        }}
      />
      <span className="hidden relative z-10 text-6xl sm:text-7xl md:text-8xl font-black text-[#E50914]">
        AZ
      </span>
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        initial={false}
      >
        <motion.div
          className="absolute w-[140%] h-24 bg-gradient-to-r from-transparent via-red-500/40 to-transparent skew-x-[-12deg]"
          initial={{ x: '-120%' }}
          animate={{ x: '120%' }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-red-600/30 blur-[80px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {stage === 'logo' && logoBlock('logo')}

        {stage === 'text' && (
          <motion.h1
            key="ambrozzz"
            className="text-[#E50914] text-7xl md:text-8xl font-extrabold tracking-[0.15em] md:tracking-[0.2em] z-10 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            initial={{ opacity: 0, scale: 0.75, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '0.2em' }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            AMBROZZZ
          </motion.h1>
        )}

        {/* Typewriter intro quote after AMBROZZZ */}
        {stage === 'quote' && (
          <motion.div
            key="quote"
            className="z-10 max-w-[90vw] sm:max-w-xl px-4 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-200 text-lg sm:text-xl md:text-2xl font-light leading-relaxed min-h-[4em] flex flex-col items-center justify-center gap-4">
              <span className="inline">
                {INTRO_QUOTE.slice(0, visibleChars)}
                <motion.span
                  className="inline-block w-0.5 h-[0.9em] bg-[#E50914] ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </span>
              <span className="text-gray-500 text-sm sm:text-base font-medium tracking-wider">
                Powered by Sarath Vinod
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
