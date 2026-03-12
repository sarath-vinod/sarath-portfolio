import AZIntro from './components/AZIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import FreelanceBanner from './components/FreelanceBanner'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-theme-page text-theme-primary transition-colors duration-300">
      <AZIntro />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <FreelanceBanner />
        <Contact />
      </main>
    </div>
  )
}

export default App
