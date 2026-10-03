import { useState } from 'react'
import {
  Mail,
  ArrowUpRight,
  Layers,
  Code2,
  Terminal,
  CheckCircle2,
  Copy,
  Image as ImageIcon,
  FileText
} from 'lucide-react'

// Types
export interface ExperienceItem {
  id: string
  role: string
  company: string
  employmentType?: string
  period?: string
  description: string
  badgeColor: 'orange' | 'blue' | 'neutral'
  tags?: string[]
}

export interface TechStackItem {
  id: string
  name: string
  // Tempat menaruh logo: file lokal di folder 'public/icons/' atau link URL gambar/SVG
  logo: string
}

export interface ProjectItem {
  id: string
  category: string
  title: string
  description: string
  tags: string[]
  theme: 'orange' | 'blue'
  imageUrl?: string
  // Tombol link proyek (bisa diisi 'View Web', 'GitHub Repo', dsb beserta URL-nya)
  linkText?: string
  linkUrl?: string
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
  const [lang, setLang] = useState<'id' | 'en'>('id')
  const [experienceTab, setExperienceTab] = useState<'work' | 'creative'>('work')
  const [copiedEmail, setCopiedEmail] = useState(false)

  const t = {
    id: {
      nav: {
        about: 'About',
        experience: 'Experience',
        stack: 'Tech Stack',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        status: 'Open to Software Engineering Opportunities',
        greeting: "Hi, I'm",
        title: 'Software Engineer',
        subtitle: 'Digital Systems & Solutions',
        description:
          'Merancang arsitektur dan membangun sistem, aplikasi, serta website yang scalable, dari development hingga deployment.',
        viewResume: 'View Resume',
        contactMe: 'Contact Me'
      },
      experience: {
        sectionTitle: 'Experience',
        workTab: 'Work',
        creativeTab: 'Creative'
      },
      stack: {
        sectionTitle: 'Current Technologies'
      },
      projectsMeta: {
        sectionTitle: 'Selected Projects',
        casesCount: '04 Cases',
        previewImageText: 'Preview',
        placeholderTip: '(Taruh file gambar di sini)'
      },
      contactBox: {
        title: 'Terbuka untuk Peluang Baru',
        description:
          'Saya terbuka untuk peluang kerja, proyek, maupun kolaborasi di bidang software engineering, pengembangan sistem, dan teknologi.',
        sendEmail: 'Kirim Email',
        viewResume: 'Lihat CV',
        copyEmail: 'Salin Email',
        copiedEmail: 'Email Disalin!'
      },
      footer: {
        location: 'Tangerang, Indonesia (WIB) · All rights reserved'
      },
      workExperiences: [
        {
          id: 'kamunesia',
          role: 'Lead Software Engineer',
          company: 'PT Kamunesia Media Arta',
          employmentType: 'Full-time',
          period: 'September 2025 — Sekarang',
          description:
            'Memimpin pengembangan dan arsitektur sistem full-stack (React, NestJS, PostgreSQL), serta mengelola infrastruktur server dan deployment (DevOps, CI/CD).',
          badgeColor: 'orange' as const,
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
          badgeColor: 'blue' as const,
          tags: ['Computer Science', 'Algorithm', 'Data Structure', 'Database', 'Software Engineering']
        }
      ],
      creativeExperiences: [
        {
          id: 'btri',
          role: 'Community & Media Administrator',
          company: 'Komunitas Bocchi the Rock! Indonesia',
          employmentType: 'Volunteer',
          period: 'Mei 2026 — Sekarang',
          description:
            'Mengelola administrasi dan kegiatan komunitas, termasuk koordinasi acara, publikasi informasi, pengelolaan media sosial, serta dokumentasi dan komunikasi dengan anggota komunitas.',
          badgeColor: 'blue' as const,
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
          badgeColor: 'orange' as const,
          tags: ['Youth Ministry', 'Music', 'Project Management', 'Faith-Based Leadership']
        }
      ],
      projectsList: [
        {
          id: 'kamunesiaweb',
          category: 'Web Application',
          title: 'Kamunesia Media Arta Web',
          description:
            'Memimpin pengembangan web application PT Kamunesia Media Arta bersama tim, mulai dari merancang sistem dan arsitektur aplikasi, mengembangkan frontend dan backend secara full-stack, hingga deployment dan pengelolaan infrastruktur.',
          tags: ['React', 'Node.js', 'REST API', 'PostgreSQL', 'DevOps'],
          theme: 'orange' as const,
          imageUrl: '/images/KMA_Web.png',
          linkText: 'View Web',
          linkUrl: 'https://kamunesia.com'
        },
        {
          id: 'ojs',
          category: 'Web Platform',
          title: 'EduHuman Society Journal Web',
          description:
            'Website jurnal ilmiah EduHuman Society berbasis Open Journal Systems (OJS), yang dikembangkan dan dikonfigurasi untuk mendukung pengelolaan publikasi, artikel ilmiah, serta proses editorial dan penerbitan jurnal secara online.',
          tags: ['PHP', 'Open Journal Systems', 'MySQL', 'Deployment'],
          theme: 'blue' as const,
          imageUrl: '/images/OJS_Web.png',
          linkText: 'View Web',
          linkUrl: 'https://journal.kamunesia.com'
        },
        {
          id: 'gkgs',
          category: 'Mobile Application',
          title: 'GKGS APP',
          description:
            'Prototype aplikasi mobile untuk mendukung digitalisasi layanan dan aktivitas gereja. Dikembangkan secara full-stack menggunakan Flutter, NestJS, dan PostgreSQL melalui Supabase, dengan fitur QR attendance, informasi gereja, doa & kesaksian, Alkitab digital, serta persembahan.',
          tags: ['Flutter', 'NestJS', 'PostgreSQL', 'Supabase'],
          theme: 'orange' as const,
          imageUrl: '/images/gkgs_app.png',
          linkText: 'GitHub Repo',
          linkUrl: 'https://github.com/JovanSiallagan/GKGS-APP'
        },
        {
          id: 'bocchipoll',
          category: 'Desktop Application',
          title: 'Bocchi the Rock! Indonesia — Polling System',
          description:
            'Aplikasi desktop interaktif untuk melakukan polling karakter favorit dari Bocchi the Rock!. Dibangun menggunakan Java Swing dan SQLite, dengan fitur live voting, visualisasi hasil secara real-time, serta penyimpanan data secara lokal.',
          tags: ['Java', 'Swing', 'SQLite'],
          theme: 'blue' as const,
          imageUrl: '/images/bocchi_poll.png',
          linkText: 'GitHub Repo',
          linkUrl: 'https://github.com/JovanSiallagan/BocchiPoll'
        }
      ]
    },
    en: {
      nav: {
        about: 'About',
        experience: 'Experience',
        stack: 'Tech Stack',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        status: 'Open to Software Engineering Opportunities',
        greeting: "Hi, I'm",
        title: 'Software Engineer',
        subtitle: 'Digital Systems & Solutions',
        description:
          'Architecting and building scalable systems, applications, and web platforms across the development lifecycle.',
        viewResume: 'View Resume',
        contactMe: 'Contact Me'
      },
      experience: {
        sectionTitle: 'Experience',
        workTab: 'Work',
        creativeTab: 'Creative'
      },
      stack: {
        sectionTitle: 'Current Technologies'
      },
      projectsMeta: {
        sectionTitle: 'Selected Projects',
        casesCount: '04 Cases',
        previewImageText: 'Preview',
        placeholderTip: '(Place image file here)'
      },
      contactBox: {
        title: 'Open for New Opportunities',
        description:
          'I am open to job opportunities, projects, and collaborations in software engineering, system development, and modern technologies.',
        sendEmail: 'Send Email',
        viewResume: 'View Resume',
        copyEmail: 'Copy Email',
        copiedEmail: 'Email Copied!'
      },
      footer: {
        location: 'Tangerang, Indonesia (WIB) · All rights reserved'
      },
      workExperiences: [
        {
          id: 'kamunesia',
          role: 'Lead Software Engineer',
          company: 'PT Kamunesia Media Arta',
          employmentType: 'Full-time',
          period: 'September 2025 — Present',
          description:
            'Leading full-stack system development and architecture (React, NestJS, PostgreSQL), as well as managing server infrastructure and deployment pipelines (DevOps, CI/CD).',
          badgeColor: 'orange' as const,
          tags: ['React', 'NestJS', 'PostgreSQL', 'System Architecture', 'DevOps', 'CI/CD']
        },
        {
          id: 'binus',
          role: 'Computer Science Undergraduate Student',
          company: 'BINUS University',
          employmentType: 'Education',
          period: '2024 — Present',
          description:
            'Studying and implementing computer science foundations, algorithms, data structures, databases, and software engineering through academic projects and application development.',
          badgeColor: 'blue' as const,
          tags: ['Computer Science', 'Algorithm', 'Data Structure', 'Database', 'Software Engineering']
        }
      ],
      creativeExperiences: [
        {
          id: 'btri',
          role: 'Community & Media Administrator',
          company: 'Bocchi the Rock! Indonesia Community',
          employmentType: 'Volunteer',
          period: 'May 2026 — Present',
          description:
            'Managing community administration and operations, including event coordination, announcements, social media management, documentation, and member relations.',
          badgeColor: 'blue' as const,
          tags: ['Leadership', 'Community Management', 'Event Planning & Coordination', 'Social Media', 'Public Relations']
        },
        {
          id: 'gkgs',
          role: 'Youth Ministry & Music Volunteer',
          company: 'Gereja Kristus Gading Serpong',
          employmentType: 'Volunteer',
          period: '2022 — Present',
          description:
            'Engaged in youth ministry, assisting with event coordination, service preparation, and supporting the music ministry during worship services.',
          badgeColor: 'orange' as const,
          tags: ['Youth Ministry', 'Music', 'Project Management', 'Faith-Based Leadership']
        }
      ],
      projectsList: [
        {
          id: 'kamunesiaweb',
          category: 'Web Application',
          title: 'Kamunesia Media Arta Web',
          description:
            'Led the development of PT Kamunesia Media Arta web application with the team—from system architecture design and full-stack development (frontend & backend) to cloud deployment and infrastructure management.',
          tags: ['React', 'Node.js', 'REST API', 'PostgreSQL', 'DevOps'],
          theme: 'orange' as const,
          imageUrl: '/images/KMA_Web.png',
          linkText: 'View Web',
          linkUrl: 'https://kamunesia.com'
        },
        {
          id: 'ojs',
          category: 'Web Platform',
          title: 'EduHuman Society Journal Web',
          description:
            'Scientific journal website for EduHuman Society powered by Open Journal Systems (OJS), configured and customized to support publication management, research papers, and online editorial workflows.',
          tags: ['PHP', 'Open Journal Systems', 'MySQL', 'Deployment'],
          theme: 'blue' as const,
          imageUrl: '/images/OJS_Web.png',
          linkText: 'View Web',
          linkUrl: 'https://journal.kamunesia.com'
        },
        {
          id: 'gkgs',
          category: 'Mobile Application',
          title: 'GKGS APP',
          description:
            'A mobile application prototype supporting digital church services and operations. Built full-stack using Flutter, NestJS, and PostgreSQL via Supabase, featuring QR attendance, church bulletins, prayer requests, digital Bible, and tithes.',
          tags: ['Flutter', 'NestJS', 'PostgreSQL', 'Supabase'],
          theme: 'orange' as const,
          imageUrl: '/images/gkgs_app.png',
          linkText: 'GitHub Repo',
          linkUrl: 'https://github.com/JovanSiallagan/GKGS-APP'
        },
        {
          id: 'bocchipoll',
          category: 'Desktop Application',
          title: 'Bocchi the Rock! Indonesia — Polling System',
          description:
            'An interactive desktop application for voting favorite Bocchi the Rock! characters. Developed with Java Swing and SQLite, featuring live voting, real-time results visualization, and local data persistence.',
          tags: ['Java', 'Swing', 'SQLite'],
          theme: 'blue' as const,
          imageUrl: '/images/bocchi_poll.png',
          linkText: 'GitHub Repo',
          linkUrl: 'https://github.com/JovanSiallagan/BocchiPoll'
        }
      ]
    }
  }

  const currentContent = t[lang]

  const techStacks: TechStackItem[] = [
    { id: 'typescript', name: 'TypeScript', logo: '/icons/typescript.svg' },
    { id: 'nodejs', name: 'Node.js', logo: '/icons/nodejs.svg' },
    { id: 'git', name: 'Git', logo: '/icons/git.svg' },
    { id: 'java', name: 'Java', logo: '/icons/java.svg' },
    { id: 'react', name: 'React', logo: '/icons/react.svg' },
    { id: 'postgresql', name: 'PostgreSQL', logo: '/icons/postgresql.svg' },
    { id: 'flutter', name: 'Flutter', logo: '/icons/flutter.svg' },
    { id: 'deployment', name: 'Deployment', logo: '/icons/deployment.svg' }
  ]

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('jovansiallagan@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const currentExperiences =
    experienceTab === 'work' ? currentContent.workExperiences : currentContent.creativeExperiences

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

          {/* Centered Navigation Links (including Contact) */}
          <nav className="hidden sm:flex items-center gap-6 text-xs tracking-wide text-neutral-400">
            <a href="#about" className="hover:text-brand-orange transition">
              {currentContent.nav.about}
            </a>
            <a href="#experience" className="hover:text-brand-orange transition">
              {currentContent.nav.experience}
            </a>
            <a href="#stack" className="hover:text-brand-orange transition">
              {currentContent.nav.stack}
            </a>
            <a href="#projects" className="hover:text-brand-orange transition">
              {currentContent.nav.projects}
            </a>
            <a href="#contact" className="hover:text-brand-orange transition">
              {currentContent.nav.contact}
            </a>
          </nav>

          {/* Language Switcher (ID / EN Toggle) */}
          <div className="flex items-center p-0.5 rounded-full bg-neutral-900 border border-brand-border text-xs">
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${lang === 'id'
                  ? 'bg-brand-orange text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${lang === 'en'
                  ? 'bg-brand-orange text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
                }`}
            >
              EN
            </button>
          </div>
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
            <span className="font-medium">{currentContent.hero.status}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400 font-mono text-[11px]">Tangerang, ID</span>
          </div>

          {/* Main Name Greeting Headline */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {currentContent.hero.greeting} <span className="text-brand-orange">Jovan Siallagan</span>
            </h1>

            <h2 className="text-lg sm:text-2xl font-semibold tracking-tight">
              <span className="text-brand-blue">{currentContent.hero.title}</span>{' '}
              <span className="text-neutral-600 mx-1">·</span>{' '}
              <span className="text-white">{currentContent.hero.subtitle}</span>
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed pt-1">
              {currentContent.hero.description}
            </p>
          </div>

          {/* Call to Action Buttons (View Resume & Contact Me) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="/CV%20Jovan%20Yehezkiel%20Farand%20Siallagan%20-%20WEB.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition shadow-lg shadow-white/10 flex items-center gap-2 group"
            >
              <FileText className="w-3.5 h-3.5 text-black group-hover:scale-110 transition" />
              <span>{currentContent.hero.viewResume}</span>
            </a>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-200 hover:text-white transition flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              <span>{currentContent.hero.contactMe}</span>
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
                {currentContent.experience.sectionTitle}
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
                {currentContent.experience.workTab}
              </button>
              <button
                type="button"
                onClick={() => setExperienceTab('creative')}
                className={`px-3.5 py-1 rounded-md transition font-medium ${experienceTab === 'creative'
                    ? 'bg-[#1A1E29] text-brand-orange shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                  }`}
              >
                {currentContent.experience.creativeTab}
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
              {currentContent.stack.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStacks.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-brand-card border border-brand-border hover:border-brand-orange/70 transition-all group cursor-default"
              >
                <div className="w-8 h-8 rounded-md bg-neutral-900/90 border border-brand-border/60 group-hover:border-brand-orange/40 transition flex items-center justify-center p-1.5 flex-shrink-0">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-brand-orange transition truncate">
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
                {currentContent.projectsMeta.sectionTitle}
              </h2>
            </div>
            <span className="text-xs text-brand-orange font-mono">{currentContent.projectsMeta.casesCount}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentContent.projectsList.map((proj) => (
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
                          {proj.title} {currentContent.projectsMeta.previewImageText}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-600">
                          {currentContent.projectsMeta.placeholderTip}
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

                  <h3 className="text-base font-semibold text-white transition group-hover:text-brand-orange">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-brand-border/60">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-brand-border/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {proj.linkUrl && (
                    <div className="pt-1">
                      <a
                        href={proj.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-neutral-900 border border-brand-border hover:border-brand-orange hover:text-white text-neutral-300 transition group/btn"
                      >
                        <span>{proj.linkText || 'View Project'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-orange group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA BOX */}
        <section
          id="contact"
          className="scroll-mt-24 p-8 rounded-2xl border border-brand-border hover:border-brand-orange/60 bg-gradient-to-b from-brand-card to-[#090B0F] space-y-4 text-center relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.15)]"
        >
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white max-w-md mx-auto">
            {currentContent.contactBox.title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-light leading-relaxed">
            {currentContent.contactBox.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:jovansiallagan@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition shadow-lg shadow-white/10 group"
            >
              <Mail className="w-3.5 h-3.5 text-black group-hover:scale-110 transition" />
              <span>{currentContent.contactBox.sendEmail}</span>
            </a>

            <a
              href="/CV%20Jovan%20Yehezkiel%20Farand%20Siallagan%20-%20WEB.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-200 hover:text-white transition group"
            >
              <FileText className="w-3.5 h-3.5 text-brand-orange group-hover:scale-110 transition" />
              <span>{currentContent.contactBox.viewResume}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-neutral-900 border border-brand-border hover:border-brand-orange text-neutral-200 hover:text-white transition group"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">{currentContent.contactBox.copiedEmail}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-orange transition" />
                  <span>{currentContent.contactBox.copyEmail}</span>
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
            {currentContent.footer.location}
          </div>
        </div>
      </footer>
    </div>
  )
}
