import { useState } from 'react'
import {
  Mail,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  CheckCircle2,
  Copy,
  Image as ImageIcon
} from 'lucide-react'

// Types
interface ExperienceItem {
  id: string
  role: string
  company: string
  employmentType?: string
  period?: string
  description: string
  badgeColor: 'orange' | 'blue' | 'neutral'
  tags?: string[]
}

interface TechStackItem {
  id: string
  name: string
  icon: 'react' | 'node' | 'nestjs' | 'docker' | 'postgres' | 'linux' | 'tailwind' | 'python' | 'flutter' | 'git'
}

interface ProjectItem {
  id: string
  category: string
  title: string
  description: string
  tags: string[]
  theme: 'orange' | 'blue'
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
}

// Tech Stack SVG Logos Component
function TechLogo({ type }: { type: TechStackItem['icon'] }) {
  switch (type) {
    case 'react':
      return (
        <svg className="w-5 h-5 text-[#61DAFB] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'node':
      return (
        <svg className="w-5 h-5 text-[#5FA04E] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3L12 4.3z" />
          <path d="M12 7.5l4 2.3v4.4l-4 2.3-4-2.3V9.8l4-2.3z" />
        </svg>
      )
    case 'nestjs':
      return (
        <svg className="w-5 h-5 text-[#EA2845] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.4 2.2c-.3-.2-.7-.2-.9 0L2.8 7.3c-.3.2-.5.5-.5.8v9.8c0 .3.2.7.5.8l8.7 5.1c.3.2.7.2.9 0l8.8-5.1c.3-.2.5-.5.5-.8V8.1c0-.3-.2-.7-.5-.8L12.4 2.2zm-2.2 4.6l6 3.5-3.8 2.2-6-3.5 3.8-2.2zm-5.4 3.1l4.6 2.7v5.4l-4.6-2.7V9.9zm6.6 8.1v-5.4l4.6-2.7v5.4l-4.6 2.7z" />
        </svg>
      )
    case 'docker':
      return (
        <svg className="w-5 h-5 text-[#2496ED] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 9.53h2.15v2.15H13.98zm-2.6 0h2.15v2.15h-2.15zm-2.6 0h2.15v2.15H8.78zm5.2-2.6h2.15v2.15h-2.15zm-2.6 0h2.15v2.15h-2.15zm-2.6 0h2.15v2.15H8.78zm-2.6 2.6h2.15v2.15H6.18zm0-2.6h2.15v2.15H6.18zm5.2-2.6h2.15v2.15h-2.15z" />
          <path d="M21.93 11.83c-.45-.33-1.42-.48-2.2-.38-.13-.75-.62-1.44-1.28-1.87l-.48-.31-.33.47c-.43.62-.6 1.4-.48 2.14-.38.19-.88.35-1.49.46H2.17c-.42 0-.67.34-.67.75 0 2.22.75 4.3 2.1 5.65C5.07 20.2 7.7 21 11.23 21c6.54 0 10.9-4.07 11.27-8.23.03-.31-.1-.66-.57-.94z" />
        </svg>
      )
    case 'postgres':
      return (
        <svg className="w-5 h-5 text-[#336791] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
        </svg>
      )
    case 'linux':
      return (
        <svg className="w-5 h-5 text-[#FCC624] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-3.3 0-6 2.7-6 6 0 2.2 1.2 4.1 3 5.1V15c-2.2 0-4 1.8-4 4v3h14v-3c0-2.2-1.8-4-4-4v-1.9c1.8-1 3-2.9 3-5.1 0-3.3-2.7-6-6-6zm-1.5 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
        </svg>
      )
    case 'tailwind':
      return (
        <svg className="w-5 h-5 text-[#38BDF8] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      )
    case 'python':
      return (
        <svg className="w-5 h-5 text-[#3776AB] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.928 1.25c-5.01 0-4.695 2.172-4.695 2.172l.006 2.25h4.757v.675H5.309S2 5.97 2 11.01s2.887 4.86 2.887 4.86h1.724v-2.434s-.093-2.887 2.836-2.887h4.868v-.675s.162-2.316-2.387-2.316zm-1.625 1.547a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
          <path d="M12.072 22.75c5.01 0 4.695-2.172 4.695-2.172l-.006-2.25h-4.757v-.675h6.687S22 18.03 22 12.99s-2.887-4.86-2.887-4.86h-1.724v2.434s.093 2.887-2.836 2.887H9.685v.675s-.162 2.316 2.387 2.316zm1.625-1.547a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
        </svg>
      )
    case 'flutter':
      return (
        <svg className="w-5 h-5 text-[#02569B] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.014 11.072L7.957 17.443 14.328 23.8h7.372l-9.986-9.986 2.614-2.742z" />
        </svg>
      )
    case 'git':
      return (
        <svg className="w-5 h-5 text-[#F05032] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.62 10.95L13.06 2.4a1.86 1.86 0 0 0-2.63 0l-1.9 1.9 2.5 2.5a2.2 2.2 0 0 1 2.8 2.8l2.4 2.4a2.2 2.2 0 1 1-1.3 1.3l-2.26-2.26v5.33a2.2 2.2 0 1 1-1.86 0V11a2.2 2.2 0 0 1-1.2-2.89L7.14 5.62 2.38 10.4a1.86 1.86 0 0 0 0 2.63l8.56 8.56a1.86 1.86 0 0 0 2.63 0l8.05-8.05a1.86 1.86 0 0 0 0-2.59z" />
        </svg>
      )
  }
}

// Minimalist PCB / Circuit Line Background Accents
function CircuitBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top Right Circuit Accent (Along Right Outer Margin) */}
      <svg
        className="absolute -top-6 -right-24 lg:-right-10 w-[360px] sm:w-[480px] h-[480px] text-neutral-800/30 opacity-40"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M500 70 H360 L300 130 H220 L180 170 V250 L130 300 H40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M500 150 H390 L340 200 H260 L220 240 V330 L170 380 H80"
          stroke="#FF6A00"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <path
          d="M500 230 H420 L370 280 H310 L280 310 V410"
          stroke="#2563EB"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        {/* Circuit Nodes */}
        <circle cx="220" cy="130" r="3.5" fill="#08090C" stroke="#FF6A00" strokeWidth="1.5" />
        <circle cx="180" cy="170" r="3" fill="#FF6A00" fillOpacity="0.6" />
        <circle cx="130" cy="300" r="3.5" fill="#08090C" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="260" cy="200" r="3" fill="#2563EB" fillOpacity="0.6" />
        <circle cx="220" cy="240" r="4" fill="#08090C" stroke="#FF6A00" strokeWidth="1.5" />
        <circle cx="80" cy="380" r="3" fill="#FF6A00" fillOpacity="0.8" />
        <circle cx="280" cy="410" r="3.5" fill="#2563EB" fillOpacity="0.8" />
      </svg>

      {/* Mid Left Circuit Accent (Along Left Outer Margin) */}
      <svg
        className="absolute top-[800px] -left-24 lg:-left-12 w-[340px] sm:w-[460px] h-[540px] text-neutral-800/30 opacity-40"
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120 H140 L200 180 H280 L330 230 V320 L270 380 H180"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <path
          d="M0 200 H100 L160 260 H240 L290 310 V420 L340 470 H440"
          stroke="#2563EB"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <path
          d="M0 320 H80 L130 370 V480 L170 520 H260"
          stroke="#FF6A00"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        {/* Nodes */}
        <circle cx="140" cy="120" r="3.5" fill="#08090C" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="200" cy="180" r="3" fill="#2563EB" fillOpacity="0.6" />
        <circle cx="330" cy="230" r="3.5" fill="#08090C" stroke="#FF6A00" strokeWidth="1.5" />
        <circle cx="180" cy="380" r="4" fill="#FF6A00" fillOpacity="0.7" />
        <circle cx="240" cy="260" r="3" fill="#2563EB" fillOpacity="0.6" />
        <circle cx="440" cy="470" r="3.5" fill="#08090C" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="260" cy="520" r="3" fill="#FF6A00" fillOpacity="0.8" />
      </svg>

      {/* Bottom Right Circuit Accent (Near Projects & Contact) */}
      <svg
        className="absolute top-[1600px] -right-24 lg:-right-12 w-[360px] sm:w-[480px] h-[560px] text-neutral-800/30 opacity-40"
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M500 100 H350 L290 160 H200 L150 210 V310 L90 370 H0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <path
          d="M500 220 H380 L310 290 H230 L180 340 V440 L130 490 H30"
          stroke="#FF6A00"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        {/* Nodes */}
        <circle cx="350" cy="100" r="3.5" fill="#08090C" stroke="#FF6A00" strokeWidth="1.5" />
        <circle cx="200" cy="160" r="3" fill="#FF6A00" fillOpacity="0.6" />
        <circle cx="150" cy="210" r="3.5" fill="#08090C" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="230" cy="290" r="3" fill="#2563EB" fillOpacity="0.6" />
        <circle cx="30" cy="490" r="4" fill="#FF6A00" fillOpacity="0.8" />
      </svg>
    </div>
  )
}

export default function App() {
  const [experienceTab, setExperienceTab] = useState<'work' | 'creative'>('work')
  const [copiedEmail, setCopiedEmail] = useState(false)

  const workExperiences: ExperienceItem[] = [
    {
      id: 'kamunesia',
      role: 'Lead Software Engineer',
      company: 'PT Kamunesia Media Arta',
      employmentType: 'Full-time',
      period: 'September 2025 — Sekarang',
      description:
        'Memimpin pengembangan dan arsitektur sistem full-stack (React, NestJS, PostgreSQL), serta mengelola infrastruktur server dan deployment (DevOps, CI/CD).',
      badgeColor: 'orange',
      tags: ['React', 'NestJS', 'PostgreSQL', 'System Architecture', 'DevOps', 'CI/CD']
    },
    {
      id: 'binus',
      role: 'Computer Science Undergraduate Student',
      company: 'BINUS University',
      employmentType: 'Education',
      period: '2024 — Sekarang',
      description:
        'Mempelajari dan menerapkan konsep ilmu komputer, algoritma, struktur data, basis data, serta pengembangan perangkat lunak melalui berbagai proyek akademik dan pengembangan aplikasi.',
      badgeColor: 'blue',
      tags: ['Computer Science', 'Algorithm', 'Data Structure', 'Database', 'Software Engineering']
    }
  ]

  const creativeExperiences: ExperienceItem[] = [
    {
      id: 'btri',
      role: 'Community & Media Administrator',
      company: 'Komunitas Bocchi the Rock! Indonesia',
      employmentType: 'Volunteer',
      period: 'Mei 2026 — Sekarang',
      description:
        'Mengelola administrasi dan kegiatan komunitas, termasuk koordinasi acara, publikasi informasi, pengelolaan media sosial, serta dokumentasi dan komunikasi dengan anggota komunitas.',
      badgeColor: 'blue',
      tags: ['Leadership', 'Community Management', 'Event Planning & Coordination', 'Social Media', 'Public Relations']
    },
    {
      id: 'gkgs',
      role: 'Youth Ministry & Music Volunteer',
      company: 'Gereja Kristus Gading Serpong',
      employmentType: 'Volunteer',
      period: '2022 — Sekarang',
      description:
        'Terlibat dalam pelayanan remaja dan kegiatan youth, termasuk membantu koordinasi kegiatan, persiapan acara, serta mendukung pelayanan musik dalam ibadah.',
      badgeColor: 'orange',
      tags: ['Youth Ministry', 'Music', 'Project Management', 'Faith-Based Leadership']
    }
  ]

  const techStacks: TechStackItem[] = [
    { id: 'react', name: 'React', icon: 'react' },
    { id: 'node', name: 'Node.js', icon: 'node' },
    { id: 'nestjs', name: 'NestJS', icon: 'nestjs' },
    { id: 'docker', name: 'Docker', icon: 'docker' },
    { id: 'postgres', name: 'PostgreSQL', icon: 'postgres' },
    { id: 'linux', name: 'Linux / DevOps', icon: 'linux' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwind' },
    { id: 'python', name: 'Python', icon: 'python' }
  ]

  const projects: ProjectItem[] = [
    {
      id: 'gkgs',
      category: 'Full-Stack Ecosystem',
      title: 'GKGS Platform',
      description:
        'Aplikasi mobile dan backend logistik operasional menggunakan Flutter, NestJS, dan PostgreSQL dengan arsitektur scalable.',
      tags: ['Flutter', 'NestJS', 'Prisma', 'PostgreSQL'],
      theme: 'orange',
      imageUrl: '' // Tempat memasukkan file gambar nanti (misal: '/images/gkgs.png')
    },
    {
      id: 'etle',
      category: 'Computer Vision AI & Infrastructure',
      title: 'ETLE Helmet Detection',
      description:
        'Benchmarking dan implementasi YOLOv8n untuk deteksi helm pengendara motor secara real-time pada sistem ETLE dengan pipeline terautomasi.',
      tags: ['YOLOv8', 'PyTorch', 'OpenCV', 'Docker'],
      theme: 'blue',
      imageUrl: ''
    },
    {
      id: 'fresh',
      category: 'AI Classification & API',
      title: 'FRESH AI Classifier',
      description:
        'Klasifikasi citra kualitas kesegaran bahan pangan secara otomatis dengan deployment REST API untuk meminimalisasi limbah makanan.',
      tags: ['Python', 'CNN', 'FastAPI', 'Cloud'],
      theme: 'orange',
      imageUrl: ''
    },
    {
      id: 'sinefolis',
      category: 'Web Application',
      title: 'Sinefolis Platform',
      description:
        'Platform katalog film modern yang berfokus pada prinsip User-Centered Design (UCD) dan performa interaktif berkecepatan tinggi.',
      tags: ['React', 'Tailwind', 'TypeScript', 'UI/UX'],
      theme: 'blue',
      imageUrl: ''
    }
  ]

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('jovan.siallagan@binus.ac.id')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const currentExperiences = experienceTab === 'work' ? workExperiences : creativeExperiences

  return (
    <div className="relative min-h-screen bg-brand-dark text-slate-200 overflow-x-hidden selection:bg-brand-orange selection:text-black font-sans">
      {/* Ambient Light Orbs */}
      <div className="glow-orange top-12 left-1/4 -translate-x-1/2" />
      <div className="glow-blue top-24 right-1/4 translate-x-1/2" />
      <div className="glow-blue top-[1100px] -left-20" />
      <div className="glow-orange top-[1600px] -right-20" />

      {/* Minimalist Circuit Line Background Accents */}
      <CircuitBackground />

      {/* Sticky Minimal Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-brand-dark/80 border-b border-brand-border/60 transition-all">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#"
            className="text-sm sm:text-base font-bold tracking-tight text-white hover:text-brand-orange transition flex items-center gap-0.5"
          >
            Jovan Siallagan<span className="text-brand-orange text-base leading-none font-bold">.</span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-xs tracking-wide text-neutral-400">
            <a href="#about" className="hover:text-brand-orange transition">
              About
            </a>
            <a href="#experience" className="hover:text-brand-orange transition">
              Experience
            </a>
            <a href="#stack" className="hover:text-brand-orange transition">
              Tech Stack
            </a>
            <a href="#projects" className="hover:text-brand-orange transition">
              Projects
            </a>
          </nav>

          <a
            href="#contact"
            className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-brand-border bg-neutral-900/60 hover:border-brand-orange hover:text-brand-orange transition flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            Contact
          </a>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-24">
        {/* HERO SECTION (Personal Brand Centric) */}
        <section id="about" className="scroll-mt-24 text-center pt-8 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#11141B] border border-brand-border text-xs text-neutral-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-medium">Open to Software Engineering Opportunities</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400 font-mono text-[11px]">Tangerang, ID</span>
          </div>

          {/* Main Name Greeting Headline */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-brand-orange">Jovan Siallagan</span>
            </h1>

            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight">
              <span className="text-white">Software Engineer</span>{' '}
              <span className="text-neutral-600 mx-1">·</span>{' '}
              <span className="text-brand-blue">Digital Systems & Solutions</span>
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed pt-1">
              Merancang arsitektur dan membangun sistem, aplikasi, serta website yang scalable, dari development hingga deployment.
            </p>
          </div>

          {/* 2-Button Call to Action (View Projects & Contact Me) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition shadow-lg shadow-white/10"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-200 hover:text-white transition flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              <span>Contact Me</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href="https://linkedin.com/in/jovan-siallagan"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-400 hover:text-white transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://github.com/JovanSiallagan"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-400 hover:text-white transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION (Interactive Tab, No Border Hover) */}
        <section id="experience" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-orange" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-400 font-mono">
                Experience
              </h2>
            </div>

            {/* Interactive Toggle Switch */}
            <div className="flex p-0.5 rounded-lg bg-neutral-900 border border-brand-border text-xs">
              <button
                type="button"
                onClick={() => setExperienceTab('work')}
                className={`px-3.5 py-1 rounded-md transition font-medium ${experienceTab === 'work'
                  ? 'bg-[#1A1E29] text-brand-orange shadow-sm'
                  : 'text-neutral-400 hover:text-white'
                  }`}
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => setExperienceTab('creative')}
                className={`px-3.5 py-1 rounded-md transition font-medium ${experienceTab === 'creative'
                  ? 'bg-[#1A1E29] text-brand-orange shadow-sm'
                  : 'text-neutral-400 hover:text-white'
                  }`}
              >
                Creative
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-card/60 backdrop-blur-sm p-6 space-y-6">
            {currentExperiences.map((item, index) => {
              const isLast = index === currentExperiences.length - 1
              const ringClass =
                item.badgeColor === 'orange'
                  ? 'bg-brand-orange ring-4 ring-brand-orange/20'
                  : item.badgeColor === 'blue'
                    ? 'bg-brand-blue ring-4 ring-brand-blue/20'
                    : 'bg-neutral-600'

              return (
                <div key={item.id} className="flex gap-4 group">
                  <div className="mt-1 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${ringClass}`} />
                    {!isLast && <div className="w-0.5 h-full bg-brand-border mt-2" />}
                  </div>
                  <div className={`space-y-2 flex-1 ${!isLast ? 'pb-6' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-sm font-semibold text-white group-hover:text-brand-orange transition">
                          {item.role}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono">@ {item.company}</span>
                        {item.employmentType && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-brand-border/60">
                            {item.employmentType}
                          </span>
                        )}
                      </div>
                      {item.period && (
                        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-brand-border/60 whitespace-nowrap self-start sm:self-auto">
                          {item.period}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-400 border border-brand-border/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* TECH STACK SECTION (Hoverable Card) */}
        <section id="stack" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-orange" />
            <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-400 font-mono">
              Current Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStacks.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-brand-card border border-brand-border hover:border-brand-orange/70 transition-all group cursor-default"
              >
                <div className="p-1.5 rounded-md bg-neutral-900/90 border border-brand-border/60 group-hover:border-brand-orange/40 transition">
                  <TechLogo type={tech.icon} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-brand-orange transition">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION (Hoverable Card with Image Container) */}
        <section id="projects" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-orange" />
              <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-400 font-mono">
                Selected Projects
              </h2>
            </div>
            <span className="text-xs text-brand-orange font-mono">04 Cases</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-xl border border-brand-border bg-brand-card p-5 space-y-4 transition-all duration-200 group flex flex-col justify-between hover:border-brand-orange/70"
              >
                <div className="space-y-3">
                  {/* Image/Photo Container Placeholder */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-brand-border/80 bg-neutral-900/90 group-hover:border-brand-orange/50 transition flex items-center justify-center">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-neutral-500 group-hover:text-neutral-400 transition p-4 text-center">
                        <div className="p-2.5 rounded-full bg-neutral-800/80 border border-brand-border group-hover:border-brand-orange/40 group-hover:text-brand-orange transition">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono tracking-tight text-neutral-400">
                          {proj.title} Preview
                        </span>
                        <span className="text-[9px] font-mono text-neutral-600">
                          (Taruh file gambar di sini)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono uppercase text-brand-orange">
                      {proj.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  </div>

                  <h3 className="text-base font-semibold text-white transition flex items-center justify-between group-hover:text-brand-orange">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-brand-border/60">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-brand-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA BOX */}
        <section
          id="contact"
          className="scroll-mt-24 p-8 rounded-2xl border border-brand-border bg-gradient-to-b from-brand-card to-[#090B0F] space-y-4 text-center relative overflow-hidden"
        >
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for Collaboration & Projects</span>
          </div> */}

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white max-w-md mx-auto">
            Terbuka untuk Peluang Baru
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
            Saya terbuka untuk peluang kerja, proyek, maupun kolaborasi di bidang software engineering, pengembangan sistem, dan teknologi.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:jovan.siallagan@binus.ac.id"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-orange text-black hover:bg-orange-500 transition shadow-lg shadow-brand-orange/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Kirim Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-neutral-900 border border-brand-border hover:border-neutral-500 text-neutral-300 hover:text-white transition"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Email Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Email</span>
                </>
              )}
            </button>
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-brand-border/40 py-8 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Jovan Siallagan</div>
          <div className="text-[11px] text-neutral-500">
            Tangerang, Indonesia (WIB) · All rights reserved
          </div>
        </div>
      </footer>
    </div>
  )
}
