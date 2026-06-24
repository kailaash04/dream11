"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Trophy,
  Users,
  Target,
  Zap,
  Shield,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the type for the input form data
interface PredictionInput {
  match_id: number
  home_team: string
  away_team: string
  venue: string
  toss_winner: string
  toss_decision: "Bat" | "Bowl"
}

// Define the type for a single player from the API response
interface PredictedPlayer {
  "Away Team": string
  "Balls Faced": number
  C: boolean
  Catches: number
  Credits: number
  Economy: number
  Fours: number
  "Home Team": string
  IsPlaying: string
  LineupOrder: number
  Maidens: number
  Overs: number
  Player: string
  "Player Role": string
  Priority: number
  Role: string
  RoleFlag: string
  "Run Outs (Assist)": number
  "Run Outs (Direct)": number
  Runs: number
  "Runs Conceded": number
  "Runs Given": number
  Sixes: number
  "Strike Rate": number
  Stumpings: number
  Team: string
  VC: boolean
  Venue: string
  Wickets: number
  combined_score: number
}

// Define the type for the full API response
interface PredictionResponse {
  success: boolean
  team: PredictedPlayer[]
}

// Define the steps for the storyboard input
const formSteps = [
  {
    id: 0,
    title: "Match Setup",
    narrative: (data: PredictionInput) =>
      `A fierce match is set between ${data.home_team || "___"} and ${data.away_team || "___"}.`,
    fields: [
      { label: "Match ID", name: "match_id", type: "number" },
      {
        label: "Home Team",
        name: "home_team",
        type: "select",
        options: ["RCB", "SRH", "CSK", "DC", "PBKS", "MI", "LSG", "GT", "KKR", "RR"],
      },
      {
        label: "Away Team",
        name: "away_team",
        type: "select",
        options: ["RCB", "SRH", "CSK", "DC", "PBKS", "MI", "LSG", "GT", "KKR", "RR"],
      },
    ],
  },
  {
    id: 1,
    title: "Venue Details",
    narrative: (data: PredictionInput) => `The battle unfolds in the grand arena of ${data.venue || "___"}.`,
    fields: [{ label: "Venue", name: "venue", type: "text" }],
  },
  {
    id: 2,
    title: "Toss Outcome",
    narrative: (data: PredictionInput) =>
      `The digital coin toss favors ${data.toss_winner || "___"}. They strategically choose to ${data.toss_decision || "___"} first.`,
    fields: [
      { label: "Toss Winner", name: "toss_winner", type: "text" },
      { label: "Toss Decision", name: "toss_decision", type: "select", options: ["Bat", "Bowl"] },
    ],
  },
]

export default function TeamPrediction() {
  const [formData, setFormData] = useState<PredictionInput>({
    match_id: 0,
    home_team: "RCB", // Set a default IPL team
    away_team: "SRH", // Set a default IPL team
    venue: "",
    toss_winner: "",
    toss_decision: "Bat",
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [predictedTeam, setPredictedTeam] = useState<PredictedPlayer[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "match_id"
          ? value === ""
            ? 0 // Set to 0 if the input is empty
            : Number.parseInt(value)
          : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setPredictedTeam([])
    setError(null)

    try {
      // Send POST request with JSON body
      const response = await fetch("http://127.0.0.1:5000/predict_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: PredictionResponse = await response.json()

      if (data.success) {
        setPredictedTeam(data.team)
      } else {
        setError("Failed to generate team. Please try again.")
      }
    } catch (err) {
      console.error("Error fetching prediction:", err)
      setError("An error occurred while fetching the prediction. Please check your network.")
    } finally {
      setIsGenerating(false)
    }
  }

  const totalCredits = predictedTeam.reduce((sum, player) => sum + player.Credits, 0)
  const totalPlayers = predictedTeam.length
  const avgCombinedScore =
    totalPlayers > 0 ? predictedTeam.reduce((sum, p) => sum + p.combined_score, 0) / totalPlayers : 0

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "bat":
        return Target
      case "bowl":
        return Zap
      case "all":
        return Star
      case "wk":
        return Shield
      default:
        return Users
    }
  }

  const currentPanel = formSteps[currentStep]
  const progressPercentage = ((currentStep + 1) / formSteps.length) * 100

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-blue-900/10 dark:to-purple-900/10" />

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-gray-700 dark:text-cyan-400 hover:text-gray-900 dark:hover:text-cyan-300 transition-colors duration-300"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </Link>

            <motion.h1
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-cyan-400 dark:to-yellow-400 bg-clip-text text-transparent font-orbitron"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI Team Predictor
            </motion.h1>

            <ThemeToggle />
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          {/* Input Form - Futuristic Storyboard View */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 dark:from-gray-900/95 dark:via-black/90 dark:to-gray-900/95 rounded-3xl border-0 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Animated background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse" />
              <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 rounded-3xl" />

              {/* Floating orbs */}
              <div
                className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute top-20 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              />

              <div className="relative z-10 p-8">
                <CardHeader className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                      <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>

                  <CardTitle className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {currentPanel.title}
                  </CardTitle>

                  {/* Holographic divider */}
                  <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-4" />

                  <motion.p
                    key={currentStep + "-narrative"}
                    className="text-xl md:text-2xl bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent font-light tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentPanel.narrative(formData)}
                  </motion.p>
                </CardHeader>

                <CardContent>
                  {/* Holographic Progress Bar */}
                  <div className="relative w-full h-3 bg-gray-800/50 rounded-full mb-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full" />
                    <motion.div
                      className="relative h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </motion.div>
                    {/* Progress indicator dots */}
                    <div className="absolute inset-0 flex justify-between items-center px-2">
                      {formSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index <= currentStep ? "bg-white shadow-lg shadow-white/50" : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.form
                      key={currentStep}
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      custom={currentStep}
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      {currentPanel.fields.map((field, index) => (
                        <motion.div
                          key={field.name}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                          <label
                            htmlFor={field.name}
                            className="block text-sm font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider"
                          >
                            {field.label}
                          </label>

                          <div className="relative group">
                            {/* Glowing input container */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm group-focus-within:blur-md transition-all duration-300" />

                            {field.type === "select" ? (
                              <select
                                id={field.name}
                                name={field.name}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                className="relative w-full px-6 py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 shadow-inner
                                     focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300
                                     hover:border-gray-600 hover:shadow-lg hover:shadow-cyan-500/10
                                     appearance-none cursor-pointer font-mono tracking-wide"
                                required
                              >
                                {field.options?.map((option) => (
                                  <option key={option} value={option} className="bg-gray-900 text-white">
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                className="relative w-full px-6 py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 shadow-inner
                                     focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 focus:outline-none transition-all duration-300
                                     hover:border-gray-600 hover:shadow-lg hover:shadow-cyan-500/10
                                     font-mono tracking-wide"
                                required
                              />
                            )}

                            {/* Animated border effect */}
                            <div className="absolute inset-0 border border-transparent rounded-xl bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Corner accent dots */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Data stream effect */}
                          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-30">
                            <div className="w-8 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent animate-pulse" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.form>
                  </AnimatePresence>
                  {/* Futuristic Navigation Buttons */}
                  <div className="flex justify-between items-center mt-12">
                    <motion.button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 0 || isGenerating}
                      className="relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-bold flex items-center space-x-3 overflow-hidden
                           hover:from-gray-600 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-lg shadow-gray-700/50 hover:shadow-xl hover:shadow-gray-600/50"
                      whileHover={{ scale: currentStep === 0 || isGenerating ? 1 : 1.05 }}
                      whileTap={{ scale: currentStep === 0 || isGenerating ? 1 : 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                      <ChevronLeft className="w-5 h-5 relative z-10" />
                      <span className="relative z-10 font-mono tracking-wide">PREVIOUS</span>
                    </motion.button>
                    {currentStep < formSteps.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        disabled={isGenerating}
                        className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold flex items-center space-x-3 overflow-hidden
                             hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-400/50"
                        whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                        whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        <span className="relative z-10 font-mono tracking-wide">NEXT</span>
                        <ChevronRight className="w-5 h-5 relative z-10" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isGenerating}
                        className={`relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-full font-bold text-xl flex items-center space-x-4 overflow-hidden
                             hover:from-purple-500 hover:via-pink-500 hover:to-red-500 transition-all duration-300
                              shadow-2xl shadow-purple-500/50 hover:shadow-3xl hover:shadow-purple-400/60
                             ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                        whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                        whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        {isGenerating ? (
                          <div className="flex items-center space-x-4 relative z-10">
                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="font-mono tracking-wide">INITIALIZING AI MATRIX...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-4 relative z-10">
                            <Trophy className="w-8 h-8" />
                            <span className="font-mono tracking-wide">DEPLOY DREAM TEAM</span>
                          </div>
                        )}

                        {/* Particle effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div
                            className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "0s" }}
                          />
                          <div
                            className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "0.5s" }}
                          />
                          <div
                            className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "1s" }}
                          />
                          <div
                            className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full animate-ping"
                            style={{ animationDelay: "1.5s" }}
                          />
                        </div>
                      </motion.button>
                    )}
                  </div>
                  {/* Futuristic Error Display */}
                  {error && (
                    <motion.div
                      className="relative mt-8 p-6 bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-2xl border border-red-500/50 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-red-500/10 rounded-2xl animate-pulse" />
                      <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                        <p className="text-red-300 font-mono tracking-wide text-lg">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Team Display */}
          {predictedTeam.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Team Summary */}
              <div className="mb-12 p-6 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-300 dark:border-green-500/30 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">{totalPlayers}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Players Selected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700 dark:text-cyan-400">
                      ₹{totalCredits.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Credits Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                      {avgCombinedScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Predicted Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">92%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Win Probability</div>
                  </div>
                </div>
              </div>

              {/* Players Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {predictedTeam.map((player, index) => {
                  const RoleIcon = getRoleIcon(player.Role)
                  return (
                    <motion.div
                      key={player.Player + index}
                      className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Captain/Vice-Captain Badge */}
                      {player.C && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500 text-white dark:text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                          C
                        </div>
                      )}
                      {player.VC && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          VC
                        </div>
                      )}

                      <div className="text-center">
                        {/* Player Image */}
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-cyan-500 dark:to-blue-500 rounded-full p-1">
                            <Image
                              src={`/placeholder.svg?height=80&width=80`}
                              alt={player.Player}
                              width={80}
                              height={80}
                              className="w-full h-full rounded-full object-cover bg-gray-200 dark:bg-gray-800"
                            />
                          </div>
                        </div>

                        {/* Player Info */}
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{player.Player}</h3>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{player.Team}</span>
                          <RoleIcon className="w-4 h-4 text-gray-700 dark:text-cyan-400" />
                          <span className="text-sm text-gray-700 dark:text-cyan-400">{player["Player Role"]}</span>
                        </div>

                        {/* Credits and Predicted Score */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                            <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                              {player.combined_score}
                            </span>
                          </div>
                          <div className="text-green-600 dark:text-green-400 font-bold">₹{player.Credits}</div>
                        </div>

                        {/* Playing Status */}
                        <div
                          className={`text-sm font-medium mb-3 ${player.IsPlaying === "PLAYING" ? "text-green-500" : "text-red-500"}`}
                        >
                          Status: {player.IsPlaying}
                        </div>

                        {/* Key Stats */}
                        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {player["Player Role"].toLowerCase() === "bat" ||
                          player["Player Role"].toLowerCase() === "all" ? (
                            <>
                              <div>
                                Runs: {player.Runs} | BF: {player["Balls Faced"]} | SR: {player["Strike Rate"]}
                              </div>
                              <div>
                                Fours: {player.Fours} | Sixes: {player.Sixes}
                              </div>
                            </>
                          ) : null}
                          {player["Player Role"].toLowerCase() === "bowl" ||
                          player["Player Role"].toLowerCase() === "all" ? (
                            <>
                              <div>
                                Wickets: {player.Wickets} | Overs: {player.Overs} | Eco: {player.Economy}
                              </div>
                              <div>
                                Maidens: {player.Maidens} | Runs Conceded: {player["Runs Conceded"]}
                              </div>
                            </>
                          ) : null}
                          {player["Player Role"].toLowerCase() === "wk" ? (
                            <>
                              <div>
                                Catches: {player.Catches} | Stumpings: {player.Stumpings}
                              </div>
                              <div>Run Outs: {player["Run Outs (Assist)"] + player["Run Outs (Direct)"]}</div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Team Analysis */}
              <motion.div
                className="mt-12 p-6 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-300 dark:border-purple-500/30 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
                  AI Analysis & Recommendations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/50 dark:bg-black/30 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Batting Strength</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Strong top-order with consistent performers. Expected score: 180-200
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white/50 dark:bg-black/30 rounded-xl">
                    <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Bowling Attack</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Balanced pace and spin attack. Can restrict opponents to 160-175
                    </p>
                  </div>

                  <div className="text-center p-4 bg-white/50 dark:bg-black/30 rounded-xl">
                    <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Win Probability</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      High chance of success based on current form and match conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
