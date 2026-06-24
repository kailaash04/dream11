"use client"

import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Janakiraman",
    role: "AI & Full Stack Developer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "AI enthusiast and full stack developer with a passion for cricket and building web experiences.",
    skills: ["Python", "Next.js", "AI/ML", "Cricket Analytics"],
    social: {
      github: "#",
      linkedin: "#",
      email: "techie.jr21@gmail.com",
    },
  },
  {
    name: "Joel Sundar Singh",
    role: "Frontend & UX Specialist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Frontend wizard focused on seamless user experiences and modern UI. Loves cricket and creative coding.",
    skills: ["React", "TailwindCSS", "UI/UX", "TypeScript"],
    social: {
      github: "#",
      linkedin: "#",
      email: "joelsundarsingh2005@gmail.com",
    },
  },
]

export default function Builder() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section
      id="builder"
      className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent to-muted py-20 px-4 transition-colors duration-300"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">Meet the Team</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-xl">
        We are passionate about cricket and technology. Get to know the people behind this project!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {teamMembers.map((member, idx) => (
          <div
            key={member.name}
            className={`relative bg-card rounded-xl border border-border cursor-pointer transition-all duration-300
              ${expanded === idx
                ? "sm:col-span-2 z-30 scale-100 shadow-2xl border-2 border-primary ring-4 ring-primary/20"
                : "hover:scale-105 hover:shadow-xl"}
              ${expanded === null ? "" : expanded !== idx ? "opacity-60 blur-[2px] pointer-events-none" : ""}
            `}
            style={{
              gridColumn: expanded === idx ? "span 2 / span 2" : undefined,
              minHeight: expanded === idx ? "380px" : "auto",
              transition: "all 0.4s cubic-bezier(.4,2,.6,1)",
            }}
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <div className={`flex flex-col items-center justify-center p-6 transition-all duration-300 ${expanded === idx ? "sm:flex-row sm:items-start" : ""}`}>
              <Image
                src={member.image}
                alt={member.name}
                width={expanded === idx ? 180 : 100}
                height={expanded === idx ? 180 : 100}
                className={`rounded-full border-2 border-primary mb-4 transition-all duration-300 bg-muted ${expanded === idx ? "w-44 h-44 mr-8" : "w-24 h-24"}`}
              />
              <div className={`${expanded === idx ? "flex-1" : ""}`}>
                <h3 className="text-2xl font-semibold mb-1 text-primary">{member.name}</h3>
                <p className="text-accent-foreground mb-2">{member.role}</p>
                <div className="flex flex-wrap gap-2 mb-2 justify-center sm:justify-start">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-accent text-xs rounded-full text-accent-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {expanded === idx && (
                  <div className="animate-fade-in mt-4">
                    <p className="text-foreground mb-4 text-lg">{member.bio}</p>
                    <div className="flex gap-4 mt-2">
                      <a href={member.social.github} className="hover:text-blue-600" aria-label="GitHub">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={member.social.linkedin} className="hover:text-blue-700" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="hover:text-rose-600" aria-label="Email">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                    <button
                      className="mt-6 px-4 py-2 rounded bg-muted-foreground/10 text-foreground border border-border hover:bg-muted-foreground/20 transition"
                      onClick={e => {
                        e.stopPropagation()
                        setExpanded(null)
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
      `}</style>
    </section>
  )
}