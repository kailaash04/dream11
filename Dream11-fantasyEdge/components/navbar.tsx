"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Menu, X, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Working", href: "#working" },
  { name: "Builder", href: "#builder" },
  { name: "Use Case", href: "#use-case" },
  { name: "Why This?", href: "#why-this" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const navbarBlur = useTransform(scrollY, [0, 100], [8, 16])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        opacity: navbarOpacity,
        backdropFilter: `blur(${navbarBlur}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Zap className="w-8 h-8 text-gray-800 dark:text-yellow-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-cyan-400 dark:to-yellow-400 bg-clip-text text-transparent">
              Dream11 Predictor
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "text-gray-900 dark:text-cyan-400 bg-gray-100 dark:bg-cyan-400/10 shadow-lg shadow-gray-300/20 dark:shadow-cyan-400/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-cyan-400/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Team Prediction Link */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/team-prediction">
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-yellow-400 dark:to-orange-500 text-white dark:text-black rounded-full font-bold text-sm hover:shadow-lg hover:shadow-gray-500/50 dark:hover:shadow-yellow-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Predictions
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 dark:focus:text-white"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-gray-900 dark:text-cyan-400 bg-gray-100 dark:bg-cyan-400/10"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-cyan-400/5"
              }`}
              whileHover={{ x: 10 }}
            >
              {item.name}
            </motion.button>
          ))}
          <Link href="/team-prediction">
            <motion.button
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-yellow-400 dark:to-orange-500 text-white dark:text-black rounded-full font-bold text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Predictions
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}
