"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Database, Brain, BarChart3, Trophy } from "lucide-react"

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description:
      "We gather comprehensive data from multiple sources including player statistics, match history, pitch reports, weather conditions, and team dynamics.",
    color: "from-gray-600 to-gray-800 dark:from-cyan-500 dark:to-blue-500",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced machine learning algorithms process thousands of data points to identify patterns, trends, and optimal player combinations.",
    color: "from-gray-700 to-gray-900 dark:from-yellow-500 dark:to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Performance Prediction",
    description:
      "The AI model generates probability scores for each player's performance based on current form, opposition, and playing conditions.",
    color: "from-gray-500 to-gray-700 dark:from-green-500 dark:to-teal-500",
  },
  {
    icon: Trophy,
    title: "Team Optimization",
    description:
      "Finally, we create the most balanced and high-scoring team within your budget constraints, maximizing your winning potential.",
    color: "from-gray-800 to-black dark:from-purple-500 dark:to-pink-500",
  },
]

export default function Working() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="working"
      className="relative py-20 px-4 min-h-screen flex items-center bg-white dark:bg-black transition-colors duration-300"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 dark:from-cyan-400 dark:via-yellow-400 dark:to-blue-400 bg-clip-text text-transparent font-orbitron">
            HOW IT WORKS
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our sophisticated AI-powered system follows a proven 4-step process to deliver the most accurate Dream11
            team predictions in the market.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800 dark:from-cyan-500 dark:via-yellow-500 dark:to-purple-500 opacity-30" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
              >
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm h-full shadow-lg hover:shadow-xl">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-cyan-500 dark:to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-cyan-500/5 dark:to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{step.title}</h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                  </motion.div>

                  {/* Animated particles */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-gray-600 dark:bg-cyan-400 rounded-full opacity-60"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  />
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 transform -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  >
                    <div className="w-0 h-0 border-l-8 border-l-gray-600 dark:border-l-cyan-500 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-cyan-400">Powered By Advanced Technology</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Machine Learning",
              "Neural Networks",
              "Big Data Analytics",
              "Real-time Processing",
              "Cloud Computing",
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-cyan-500/30 text-gray-700 dark:text-cyan-300 shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: "rgba(107, 114, 128, 0.8)" }}
                className="dark:hover:border-cyan-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
