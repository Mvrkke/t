'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

const ColorScheme = {
  primary: '#007AFF',
  background: '#FFFFFF',
  text: '#000000'
}

export function MinimalistPortfolioComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const homeRef = useRef(null)
  const workRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      if (scrollPosition < workRef.current.offsetTop) {
        setActiveSection('home')
      } else if (scrollPosition < aboutRef.current.offsetTop) {
        setActiveSection('work')
      } else if (scrollPosition < contactRef.current.offsetTop) {
        setActiveSection('about')
      } else {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-white text-black" style={{ backgroundColor: ColorScheme.background, color: ColorScheme.text }}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ color: ColorScheme.primary }}
          >
            HANS MÖBEL
          </motion.h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <ul className="hidden md:flex space-x-8">
            {['Home', 'Work', 'About', 'Contact'].map((item) => (
              <motion.li 
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`text-lg transition-colors ${activeSection === item.toLowerCase() ? 'font-bold' : ''}`}
                  style={{ color: activeSection === item.toLowerCase() ? ColorScheme.primary : ColorScheme.text }}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>

      <motion.div
        className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center ${isMenuOpen ? '' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {['Home', 'Work', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-3xl my-4 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: ColorScheme.text }}
          >
            {item}
          </motion.a>
        ))}
      </motion.div>

      <main className="container mx-auto px-4">
        <motion.section 
          id="home" 
          className="h-screen flex flex-col justify-center items-center text-center"
          ref={homeRef}
          style={{ opacity, scale }}
        >
          <motion.h2 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: ColorScheme.primary }}
          >
            Crafting Timeless Furniture
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your space with our meticulously designed furniture. Each piece blends form and function, creating a harmonious balance of style and practicality for modern living.
          </motion.p>
          <motion.a
            href="#work"
            className="inline-flex items-center text-lg px-6 py-3 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: ColorScheme.primary, color: ColorScheme.background }}
          >
            Explore Our Work
            <ChevronDown className="ml-2" />
          </motion.a>
        </motion.section>

        <motion.section id="work" className="py-24" {...fadeIn} ref={workRef}>
          <h2 className="text-4xl font-bold mb-12" style={{ color: ColorScheme.primary }}>Our Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={`/placeholder.svg?height=400&width=400`}
                  alt={`Furniture design ${item}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-bold">View Details</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="about" className="py-24" {...fadeIn} ref={aboutRef}>
          <h2 className="text-4xl font-bold mb-12" style={{ color: ColorScheme.primary }}>Our Philosophy</h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <p className="text-xl leading-relaxed">
                At Hans Möbel, we believe in the power of simplicity and functionality. Our designs are rooted in the principle that less is more, focusing on clean lines and purposeful forms. We create furniture that not only looks beautiful but also enhances the lives of those who use it.
              </p>
              <p className="text-xl leading-relaxed mt-6">
                Every piece we craft is a testament to our commitment to quality, sustainability, and innovative design. We strive to create furniture that will be cherished for generations to come, blending timeless aesthetics with modern sensibilities.
              </p>
            </div>
            <motion.div 
              className="md:w-1/2 aspect-square bg-gray-100 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Hans Möbel workshop"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="contact" className="py-24" {...fadeIn} ref={contactRef}>
          <h2 className="text-4xl font-bold mb-12" style={{ color: ColorScheme.primary }}>Get in Touch</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <p className="text-xl mb-6">We'd love to hear from you. Whether you're interested in our designs or want to collaborate, don't hesitate to reach out.</p>
              <a 
                href="mailto:info@hansmoebel.com" 
                className="inline-flex items-center text-xl transition-colors"
                style={{ color: ColorScheme.primary }}
              >
                info@hansmoebel.com
                <ArrowRight className="ml-2" />
              </a>
            </div>
            <form className="md:w-1/2 space-y-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ borderColor: ColorScheme.text, color: ColorScheme.text }}
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ borderColor: ColorScheme.text, color: ColorScheme.text }}
              />
              <textarea 
                placeholder="Your Message" 
                rows={4} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ borderColor: ColorScheme.text, color: ColorScheme.text }}
              ></textarea>
              <button 
                type="submit" 
                className="px-6 py-3 rounded-full text-white transition-colors"
                style={{ backgroundColor: ColorScheme.primary, color: ColorScheme.background }}
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-sm" style={{ color: ColorScheme.text }}>
        © 2023 Hans Möbel. All rights reserved.
      </footer>
    </div>
  )
}