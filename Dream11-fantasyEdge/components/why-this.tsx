"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Brain, Clock, Star } from "lucide-react"

const advantages = [
  {
    icon: Brain,
    title: "Advanced AI Technology",
    description:
      "Our proprietary machine learning algorithms analyze 100+ parameters to provide the most accurate predictions in the market.",
    stats: "95% accuracy rate",
  },
  {
    icon: Zap,
    title: "Lightning Fast Results",
    description:
      "Get instant team predictions within seconds. No more waiting or manual research - just quick, reliable results.",
    stats: "< 2 seconds response time",
  },
  {
    icon: Shield,
    title: "Proven Track Record",
    description:
      "Trusted by 50,000+ fantasy cricket players with a consistent history of winning predictions and satisfied users.",
    stats: "50K+ happy users",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description:
      "Stay ahead with live player updates, injury reports, and last-minute team changes that affect your fantasy team.",
    stats: "24/7 monitoring",
  },
]

const comparisons = [
  {
    feature: "Prediction Accuracy",
    us: "95%",
    others: "70-80%",
    advantage: "Higher win rates",
  },
  {
    feature: "Data Sources",
    us: "50+ sources",
    others: "10-15 sources",
    advantage: "More comprehensive analysis",
  },
  {
    feature: "Update Frequency",
    us: "Real-time",
    others: "Daily/Weekly",
    advantage: "Latest information",
  },
  {
    feature: "User Support",
    us: "24/7 Chat",
    others: "Email only",
    advantage: "Instant help",
  },
  {
    feature: "Price",
    us: "₹99/month",
    others: "₹299/month",
    advantage: "3x more affordable",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Fantasy Cricket Pro",
    comment: "Increased my win rate from 45% to 78% in just 2 months. The AI predictions are incredibly accurate!",
    rating: 5,
    winnings: "₹1.2L last month",
  },
  {
    name: "Priya Singh",
    role: "Casual Player",
    comment:
      "As someone new to fantasy cricket, this tool made it so easy to create winning teams without any research.",
    rating: 5,
    winnings: "₹25K in 3 months",
  },
  {
    name: "Amit Sharma",
    role: "League Manager",
    comment: "Managing multiple teams became effortless. The bulk prediction feature saved me hours of work.",
    rating: 5,
    winnings: "₹3.5L this season",
  },
]

export default function WhyThis() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-this" className="relative py-20 px-4 min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-purple-900/10" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
            WHY CHOOSE US?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            In a crowded market of fantasy cricket tools, here's what makes Dream11 Fantasy Team Predictor the clear
            winner for serious players and casual fans alike.
          </motion.p>
        </motion.div>

        {/* Key Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {advantages.map((advantage, index) => (
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
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <advantage.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">{advantage.title}</h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{advantage.description}</p>

                  <div className="text-cyan-400 font-bold text-lg">{advantage.stats}</div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">How We Compare</h3>

          <div className="overflow-x-auto">
            <table className="w-full bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="p-4 text-left text-white font-bold">Feature</th>
                  <th className="p-4 text-center text-cyan-400 font-bold">Dream11 Predictor</th>
                  <th className="p-4 text-center text-gray-400 font-bold">Others</th>
                  <th className="p-4 text-center text-yellow-400 font-bold">Advantage</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comparison, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-700/30 hover:bg-cyan-500/5 transition-colors duration-300"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  >
                    <td className="p-4 text-white font-medium">{comparison.feature}</td>
                    <td className="p-4 text-center text-cyan-400 font-bold">{comparison.us}</td>
                    <td className="p-4 text-center text-gray-400">{comparison.others}</td>
                    <td className="p-4 text-center text-yellow-400 text-sm">{comparison.advantage}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">What Our Users Say</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative p-6 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 mb-4 italic leading-relaxed">"{testimonial.comment}"</p>

                <div className="border-t border-gray-700/50 pt-4">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                  <div className="text-yellow-400 text-sm font-medium mt-1">💰 {testimonial.winnings}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold mb-6 text-cyan-400">Ready to Dominate Fantasy Cricket?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful fantasy players who trust our AI-powered predictions to win consistently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Winning Today
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-yellow-400 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
