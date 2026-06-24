"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Spline from "@splinetool/react-spline" // <-- Correct import!
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Working from "@/components/working"
import Builder from "@/components/builder"
import UseCase from "@/components/use-case"
import WhyThis from "@/components/why-this"
import Contact from "@/components/contact"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div
      ref={containerRef}
      className="relative bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300"
    >
      {/* Animated Background */}
      <motion.div
        style={{
          background: `
          radial-gradient(circle at 20% 50%, rgba(156, 163, 175, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(209, 213, 219, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(107, 114, 128, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)
        `,
          y: backgroundY,
        }}
        className=" inset-0 z-0 dark:bg-[radial-gradient(circle_at_20%_50%,rgba(0,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,0,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(0,100,255,0.1)_0%,transparent_50%),linear-gradient(180deg,#000000_0%,#001122_100%)]"
      />

      <Navbar />

      {/* Hero Section with Spline */}
      <section id="home" className="relative min-h-screen h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10"> 
        <iframe src='https://my.spline.design/nexbotrobotcharacterconcept-eFJnFboDFyduaIiAmiINGbFQ/' frameborder='0' width='100%' height='100%'></iframe>
        </div>
        <motion.div
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <br />
            <br />
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-cyan-500 dark:to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-gray-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "rotate(180deg)" }}
            >
              Get Predictions
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-gray-800 dark:border-yellow-400 text-gray-800 dark:text-yellow-400 rounded-full font-bold text-lg hover:bg-gray-800 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Cricket Elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-yellow-400 dark:to-orange-500 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 dark:from-cyan-400 dark:to-blue-500 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </section>

      <About />
      <Working />
      <Builder />
      <UseCase />
      <WhyThis />
      <Contact />
    </div>
  )
}
