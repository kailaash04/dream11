"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, TrendingUp, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "AI-Powered Predictions",
    description:
      "Advanced machine learning algorithms analyze player performance, pitch conditions, and historical data to provide accurate team predictions.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description:
      "Get live updates on player form, injury reports, and match conditions to make informed decisions for your fantasy team.",
  },
  {
    icon: Users,
    title: "Expert Insights",
    description:
      "Combine AI predictions with expert cricket analysis to maximize your chances of winning in Dream11 contests.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant team suggestions and player recommendations with our optimized prediction engine.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      className="relative py-20 px-4 min-h-screen flex items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 dark:from-cyan-400 dark:via-yellow-400 dark:to-blue-400 bg-clip-text text-transparent font-orbitron">
            ABOUT THE PREDICTOR
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dream11 Fantasy Team Predictor revolutionizes fantasy cricket by leveraging cutting-edge AI and machine
            learning to analyze thousands of data points and provide you with the most optimal team combinations for
            maximum points.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-cyan-500/10 dark:to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-cyan-500 dark:to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-cyan-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">{feature.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { number: "95%", label: "Prediction Accuracy" },
            { number: "50K+", label: "Happy Users" },
            { number: "1M+", label: "Predictions Made" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-yellow-400 dark:to-orange-500 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
