"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, Users, TrendingUp, Target, Star, Award } from "lucide-react"

const useCases = [
  {
    icon: Trophy,
    title: "Contest Winners",
    description: "Perfect for players who want to consistently win Dream11 contests and climb leaderboards.",
    benefits: ["Higher win rates", "Better ROI", "Consistent performance"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Casual Players",
    description: "Ideal for cricket fans who want to enjoy fantasy cricket without spending hours on research.",
    benefits: ["Quick team selection", "Easy to use", "No research needed"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Professional Players",
    description: "Advanced analytics and insights for serious fantasy cricket professionals and influencers.",
    benefits: ["Detailed analytics", "Multiple strategies", "Performance tracking"],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Target,
    title: "League Managers",
    description: "Manage multiple teams across different contests with optimized player combinations.",
    benefits: ["Multi-team management", "Contest optimization", "Risk management"],
    color: "from-purple-500 to-pink-500",
  },
]

const scenarios = [
  {
    title: "IPL Season",
    description: "During IPL, get daily team predictions with player form analysis and pitch-specific recommendations.",
    stats: "85% accuracy rate during IPL 2023",
  },
  {
    title: "International Matches",
    description: "Comprehensive analysis for Test, ODI, and T20I matches with weather and pitch conditions.",
    stats: "90% user satisfaction for international games",
  },
  {
    title: "Domestic Leagues",
    description: "Coverage of major domestic leagues including BBL, CPL, PSL, and county championships.",
    stats: "50+ leagues covered globally",
  },
]

export default function UseCase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="use-case" className="relative py-20 px-4 min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-blue-900/10" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
            USE CASES
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Whether you're a casual cricket fan or a serious fantasy player, our AI-powered predictor adapts to your
            playing style and helps you achieve your fantasy cricket goals.
          </motion.p>
        </motion.div>

        {/* User Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm h-full">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="relative z-10 text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${useCase.color} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}
                  >
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">{useCase.title}</h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{useCase.description}</p>

                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center justify-center text-xs text-cyan-400">
                        <Star className="w-3 h-3 mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scenarios */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">Perfect for Every Cricket Season</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                className="relative p-6 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-bold mb-3 text-yellow-400">{scenario.title}</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">{scenario.description}</p>
                <div className="flex items-center text-sm text-cyan-400">
                  <Award className="w-4 h-4 mr-2" />
                  {scenario.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold mb-8 text-cyan-400">Success Stories</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { metric: "₹2.5L+", label: "Average Monthly Winnings", subtitle: "Top 10% of users" },
              { metric: "78%", label: "Contest Win Rate", subtitle: "Above platform average" },
              { metric: "4.8/5", label: "User Satisfaction", subtitle: "Based on 10,000+ reviews" },
            ].map((story, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-green-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">
                  {story.metric}
                </div>
                <div className="text-white font-medium mb-1">{story.label}</div>
                <div className="text-gray-400 text-sm">{story.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
