"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    info: "support@dream11predictor.com",
    description: "Get support within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    info: "+91 98765 43210",
    description: "Mon-Fri, 9 AM - 6 PM IST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    info: "Mumbai, Maharashtra, India",
    description: "Cricket capital of India",
  },
  {
    icon: Globe,
    title: "Follow Us",
    info: "@dream11predictor",
    description: "Latest updates and tips",
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="relative py-20 px-4 min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
            GET IN TOUCH
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have questions about our predictions? Need technical support? Want to suggest new features? We'd love to
            hear from you and help you dominate your fantasy leagues.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-cyan-400">Let's Connect</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{contact.title}</h4>
                    <p className="text-cyan-400 font-medium mb-1">{contact.info}</p>
                    <p className="text-gray-400 text-sm">{contact.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="text-center p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400 mb-1">&lt; 2hrs</div>
                <div className="text-gray-400 text-sm">Response Time</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-green-500/20">
                <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
                <div className="text-gray-400 text-sm">Support Available</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="billing">Billing & Pricing</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-cyan-400">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How accurate are your predictions?",
                answer:
                  "Our AI model maintains a 95% accuracy rate based on historical performance data and continuous learning from match outcomes.",
              },
              {
                question: "Do you cover all cricket formats?",
                answer:
                  "Yes, we provide predictions for T20, ODI, Test matches, and all major domestic leagues including IPL, BBL, CPL, and more.",
              },
              {
                question: "How often are predictions updated?",
                answer:
                  "Predictions are updated in real-time based on team announcements, weather conditions, pitch reports, and player availability.",
              },
              {
                question: "Is there a money-back guarantee?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our prediction accuracy and service quality.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(0, 255, 255, 0.5)" }}
              >
                <h4 className="text-lg font-bold text-cyan-400 mb-3">{faq.question}</h4>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
