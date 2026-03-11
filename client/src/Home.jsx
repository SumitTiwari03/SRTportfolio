import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useForm } from 'react-hook-form'
// import { MAIL_API } from './config'

import { Linkedin, Mail, Download, Send, ExternalLink, Moon, Sun, Github } from 'lucide-react'

import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaLinkedin, FaGithub, FaPython, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiGatsby, SiMongodb, SiMysql, SiExpress } from 'react-icons/si';

// Assume these UI components are defined elsewhere in your project
import { Button, Card, CardContent, Badge, Tabs, TabsContent, TabsList, TabsTrigger, LandingPage, ProjectSection, TechHero, CursorGlow, ScrollProgress, DynamicGridBackground, PulsingLineEffect } from './component'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [isDarkMode, setIsDarkMode] = useState(false)

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [achievements, setAchievements] = useState([])
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf')

  useEffect(() => {
    // Fetch resume
    axios.get('https://sumit-dev-api.onrender.com/api/resume').then((res) => {
      if (res.data && res.data.url) {
        setResumeUrl(res.data.url)
      }
    }).catch((err) => {
      console.log("Using default resume path");
    })
    // Fetch projects
    axios.get('https://sumit-dev-api.onrender.com/api/dashboard/getproject').then(async (res) => {
      console.log(res.data)
      await setProjects(res.data)
    }).catch((err) => {
      console.log("Error while getting the projects ", err);
    })

    // Fetch skills
    axios.get('https://sumit-dev-api.onrender.com/api/skills').then((res) => {
      setSkills(res.data.length > 0 ? res.data : [
        { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'GSAP'] },
        { category: 'Backend', items: ['Node.js', 'Express js'] },
        { category: 'Database', items: ['MongoDB', 'MySQL'] },
        { category: 'Languages', items: ['Python', 'JavaScript', 'Java'] },
      ])
    }).catch((err) => {
      console.log("Error while getting skills:", err);
      // Fallback to default skills
      setSkills([
        { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'GSAP'] },
        { category: 'Backend', items: ['Node.js', 'Express js'] },
        { category: 'Database', items: ['MongoDB', 'MySQL'] },
        { category: 'Languages', items: ['Python', 'JavaScript', 'Java'] },
      ])
    })

    // Fetch experiences
    axios.get('https://sumit-dev-api.onrender.com/api/experiences').then((res) => {
      setExperiences(res.data.length > 0 ? res.data : [
        {
          company: 'CREDIT AND VAULT',
          role: 'Web developer',
          Duration: 'Apr 2023 - Sep 2023',
          letter: 'Experience letter',
          link: 'https://drive.google.com/file/d/1_ILtrx_deEOk2AYqNy2znTcI8InrL5NK/view?usp=sharing'
        },
      ])
    }).catch((err) => {
      console.log("Error while getting experiences:", err);
      setExperiences([
        {
          company: 'CREDIT AND VAULT',
          role: 'Web developer',
          Duration: 'Apr 2023 - Sep 2023',
          letter: 'Experience letter',
          link: 'https://drive.google.com/file/d/1_ILtrx_deEOk2AYqNy2znTcI8InrL5NK/view?usp=sharing'
        },
      ])
    })

    // Fetch achievements
    axios.get('https://sumit-dev-api.onrender.com/api/achievements').then((res) => {
      setAchievements(res.data.length > 0 ? res.data : [
        {
          college: 'Nagindas khandawal college',
          fest: 'Zestech',
          ranker: 'Second runner up',
          date: 'Apr 2023 - Sep 2023',
          letter: 'Certificate',
          link: ''
        },
      ])
    }).catch((err) => {
      console.log("Error while getting achievements:", err);
      setAchievements([
        {
          college: 'Nagindas khandawal college',
          fest: 'Zestech',
          ranker: 'Second runner up',
          date: 'Apr 2023 - Sep 2023',
          letter: 'Certificate',
          link: ''
        },
      ])
    })
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'education', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Get in tocuch form submission function
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your API
    const sr = 1
    try {
      const sendForm = await axios.post(`https://sumit-dev-api.onrender.com/api/mail`, {
        username,
        email,
        message,
        date: Date.now()
      })
    }
    catch (err) {
      console.log("Error:- ", err);


    }
    // Reset form fields
    setUsername('')
    setEmail('')
    setMessage('')
  }

  const skillIcons = {
    React: <FaReact />,
    HTML5: <FaHtml5 />,
    CSS3: <FaCss3Alt />,
    JavaScript: <FaJsSquare />,
    Tailwind: <SiTailwindcss />,
    GSAP: <SiGatsby />, // GSAP doesn't have a specific icon in `react-icons`, so this is a placeholder
    'Node.js': <FaNodeJs />,
    'Express js': <SiExpress />,
    MongoDB: <SiMongodb />,
    MySQL: <SiMysql />,
    Python: <FaPython />,
    Java: <FaJava />,
  };

  const education = [
    { level: 'Bachelor\'s Degree', institution: 'Nagindas khandwala college of mumbai', year: '2022-2025', grade: 'CGPA: 9.27/10' },
    { level: 'Higher Secondary', institution: 'Vidya varidhi vidyalaya', year: '2021-2022', grade: 'Percentage: 74%' },
    { level: 'High School', institution: 'Vidya varidhi vidyalaya', year: '2020-2021', grade: 'Percentage: 79.4%' },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800 text-white' : 'from-gray-100 to-white text-gray-900'} transition-colors duration-300`} style={{ scrollBehavior: 'smooth' }}>
      {/* Cursor Glow Effect */}
      <CursorGlow isDarkMode={isDarkMode} />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        * {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#1f2937' : '#f3f4f6'};
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #ec4899, #3b82f6);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #db2777, #2563eb);
        }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'} backdrop-blur-sm`}>
        <nav className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <img src={`${isDarkMode ? '/logo-white.png' : '/logo.svg'}`} className={`h-14`} alt="logo" />
            </motion.div>
            <div className="hidden md:flex space-x-4 items-center">
              {['home', 'about', 'projects', 'skills', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize ${activeSection === item ? 'text-primary' : isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-primary transition-colors`}
                >
                  {item}
                </a>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(resumeUrl, '_blank')}
                className="flex items-center"
              >
                <Download className="mr-2 h-5 w-5" /> Resume
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-2"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="mr-2"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? 'Close' : 'Menu'}
              </Button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-2`}
            >
              {['home', 'about', 'projects', 'skills', 'education', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`block px-6 py-2 capitalize ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="px-6 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(resumeUrl, '_blank')}
                  className="w-full flex items-center justify-center"
                >
                  <Download className="mr-2 h-4 w-4" /> Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===============================================Landing page============================================================= */}

      <main>
        <section id="home">
          <TechHero isDarkMode={isDarkMode} projects={projects} />
        </section>

        {/* ===============================================================About us section ================================================================== */}

        <section id="about" className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Background Grid */}
          <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}>
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          {/* Dynamic Moving Lines */}
          <DynamicGridBackground isDarkMode={isDarkMode} />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className={`text-xl font-mono ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {'// Building scalable systems with MERN stack'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Code Block - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-gray-900'} rounded-2xl shadow-2xl overflow-hidden border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-500/20'}`}>
                  {/* Terminal Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-xs font-mono">about.js</span>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 font-mono text-sm">
                    <div className="space-y-2">
                      <div><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-gray-400">=</span> <span className="text-yellow-400">{'{'}</span></div>
                      <div className="ml-4"><span className="text-blue-400">name:</span> <span className="text-green-400">'Sumit Tiwari'</span>,</div>
                      <div className="ml-4"><span className="text-blue-400">role:</span> <span className="text-green-400">'MERN Stack Developer'</span>,</div>
                      <div className="ml-4"><span className="text-blue-400">focus:</span> <span className="text-green-400">'Backend Architecture'</span>,</div>
                      <div className="ml-4"><span className="text-blue-400">expertise:</span> <span className="text-yellow-400">[</span></div>
                      <div className="ml-8"><span className="text-green-400">'RESTful API Design'</span>,</div>
                      <div className="ml-8"><span className="text-green-400">'Database Optimization'</span>,</div>
                      <div className="ml-8"><span className="text-green-400">'Scalable Systems'</span>,</div>
                      <div className="ml-8"><span className="text-green-400">'Full-Stack Development'</span></div>
                      <div className="ml-4"><span className="text-yellow-400">]</span>,</div>
                      <div className="ml-4"><span className="text-blue-400">stack:</span> <span className="text-yellow-400">{'{'}</span></div>
                      <div className="ml-8"><span className="text-cyan-400">frontend:</span> <span className="text-green-400">['React', 'Next.js']</span>,</div>
                      <div className="ml-8"><span className="text-cyan-400">backend:</span> <span className="text-green-400">['Node.js', 'Express']</span>,</div>
                      <div className="ml-8"><span className="text-cyan-400">database:</span> <span className="text-green-400">['MongoDB', 'MySQL']</span></div>
                      <div className="ml-4"><span className="text-yellow-400">{'}'}</span>,</div>
                      <div className="ml-4"><span className="text-blue-400">passion:</span> <span className="text-green-400">'Clean Code & Performance'</span></div>
                      <div><span className="text-yellow-400">{'}'}</span>;</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-6`}>
                  <p className="text-lg leading-relaxed">
                    Hey! I'm <span className="font-bold text-purple-600">Sumit Tiwari</span>, a passionate <span className="font-bold text-blue-600">MERN Stack Developer</span> specializing in building <span className="font-bold text-pink-600">scalable backend systems</span> and seamless full-stack applications.
                  </p>

                  <p className="text-lg leading-relaxed">
                    With deep expertise in <span className="font-bold text-green-600">Node.js</span>, <span className="font-bold text-green-600">Express</span>, and <span className="font-bold text-green-600">MongoDB</span>, I architect robust APIs, optimize database performance, and create efficient server-side solutions. On the frontend, I craft responsive interfaces with <span className="font-bold text-cyan-600">React</span> that deliver exceptional user experiences.
                  </p>

                  <p className="text-lg leading-relaxed">
                    I'm driven by <span className="font-bold text-orange-600">clean architecture</span>, <span className="font-bold text-orange-600">performance optimization</span>, and solving complex technical challenges. Whether it's designing microservices, implementing authentication systems, or building real-time features, I love turning ideas into production-ready applications.
                  </p>

                  <div className="pt-4">
                    <div className="flex flex-wrap gap-3">
                      <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg">
                        💻 Backend Expert
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold shadow-lg">
                        🚀 API Architect
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold shadow-lg">
                        ⚡ Performance Focused
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href='https://github.com/SumitTiwari03'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg"
                  >
                    <Github className="h-5 w-5" /> GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href='https://www.linkedin.com/in/sumit-tiwari-7a198a241/'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg"
                  >
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================================projects section ============================================================ */}

        <section id="projects" className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className={`text-xl font-mono ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {'// Real-world applications & technical implementations'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`h-full rounded-2xl overflow-hidden ${
                      isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                    } border-2 ${
                      isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
                    } shadow-xl hover:shadow-2xl transition-all`}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.img.url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-black text-white mb-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base leading-relaxed`}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              isDarkMode
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-purple-100 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.gitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all ${
                            isDarkMode
                              ? 'bg-gray-800 text-white border-2 border-purple-500/50'
                              : 'bg-white text-gray-900 border-2 border-purple-300'
                          }`}
                        >
                          <Github className="h-4 w-4" /> Code
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* <section>
        <ProjectSection {...{isDarkMode}} />
        </section> */}

        {/* ============================================================== Skills sections ======================================================================== */}
        <section id="skills" className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Grid Background */}
          <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}>
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          {/* Dynamic Moving Lines */}
          <DynamicGridBackground isDarkMode={isDarkMode} />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </h2>
              <p className={`text-xl font-mono ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {'// Tools & technologies I work with'}
              </p>
            </motion.div>

            {skills.map((skillCategory, categoryIndex) => (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                {/* Category Title with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`px-4 py-2 rounded-xl ${
                    categoryIndex === 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                    categoryIndex === 1 ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                    categoryIndex === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  } text-white shadow-lg`}>
                    <h3 className="text-2xl font-black">
                      {skillCategory.category}
                    </h3>
                  </div>
                  <div className={`h-1 flex-1 rounded-full ${
                    categoryIndex === 0 ? 'bg-gradient-to-r from-cyan-500/50 to-transparent' :
                    categoryIndex === 1 ? 'bg-gradient-to-r from-green-500/50 to-transparent' :
                    categoryIndex === 2 ? 'bg-gradient-to-r from-purple-500/50 to-transparent' :
                    'bg-gradient-to-r from-orange-500/50 to-transparent'
                  }`}></div>
                </div>

                {/* Skill Items */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    >
                      <div
                        className={`p-4 rounded-xl ${
                          isDarkMode
                            ? 'bg-gray-800/80 border-2 border-purple-500/30 hover:border-purple-500/60'
                            : 'bg-white border-2 border-purple-200 hover:border-purple-400'
                        } shadow-lg hover:shadow-xl transition-all backdrop-blur-sm`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className={`text-3xl ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {skillIcons[skill]}
                          </div>
                          <span className={`text-lg font-bold ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {skill}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Additional Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16"
            >
              <div className={`p-8 rounded-2xl ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-white'
              } border-2 ${
                isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
              } shadow-2xl`}>
                <div className="text-center">
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-bold text-purple-600">Always learning, always growing.</span>
                    {' '}Constantly exploring new technologies and staying updated with the latest industry trends.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================= Education and achivement sections=============================================== */}
        <section id="education" className={`py-20 relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className={`text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  My Journey
                </span>
              </h2>
              <p className={`text-xl font-mono ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {'// Education, Experience & Recognition'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Education Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
                    <h3 className="text-2xl font-black">Education</h3>
                  </div>
                  <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                </div>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className={`p-6 rounded-2xl ${
                        isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                      } border-2 ${
                        isDarkMode ? 'border-blue-500/30' : 'border-blue-200'
                      } shadow-lg hover:shadow-xl transition-all`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
                          index === 0 ? 'from-blue-600 to-cyan-600' :
                          index === 1 ? 'from-purple-600 to-pink-600' :
                          'from-green-600 to-teal-600'
                        } flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <span className="text-2xl font-black text-white">{edu.level[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {edu.level}
                          </h4>
                          <p className={`font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            {edu.institution}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {edu.year}
                            </span>
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                              isDarkMode
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-green-100 text-green-700 border border-green-200'
                            }`}>
                              {edu.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Experience & Achievements Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Experience Section */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                    <h3 className="text-2xl font-black">Experience</h3>
                  </div>
                  <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                </div>

                <div className="space-y-6">
                  {experiences.map((ele, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className={`p-6 rounded-2xl ${
                        isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                      } border-2 ${
                        isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
                      } shadow-lg hover:shadow-xl transition-all`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-2xl font-black text-white">{ele.company[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {ele.company}
                          </h4>
                          <p className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                            {ele.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {ele.Duration}
                        </span>
                        <motion.a
                          href={ele.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-sm shadow-lg"
                        >
                          {ele.letter}
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Achievements Section */}
                <div className="flex items-center gap-3 mb-8 mt-12">
                  <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                    <h3 className="text-2xl font-black">Achievements & Recognition</h3>
                  </div>
                  <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                </div>

                <div className="space-y-6">
                  {achievements.map((ele, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className={`p-6 rounded-2xl ${
                        isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                      } border-2 ${
                        isDarkMode ? 'border-orange-500/30' : 'border-orange-200'
                      } shadow-lg hover:shadow-xl transition-all`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-2xl font-black text-white">
                            {ele.college ? ele.college[0] : '🏆'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {ele.college || 'Achievement'}
                          </h4>
                          <p className={`font-bold mb-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                            {ele.fest || 'Event/Program'}
                          </p>
                          <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {ele.ranker || 'Recognition'}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {ele.date}
                        </span>
                        {ele.link && (
                          <motion.a
                            href={ele.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-bold text-sm shadow-lg"
                          >
                            {ele.letter || 'View Certificate'}
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================================================Contact me section ============================================================ */}

        <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} relative overflow-hidden`}>
          {/* Pulsing Line Effect */}
          <PulsingLineEffect isDarkMode={isDarkMode} />

          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid Pattern */}
          <div className={`absolute inset-0 ${isDarkMode ? 'opacity-5' : 'opacity-3'}`}>
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className={`text-5xl md:text-6xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Let's Build Together
                </span>
              </h2>
              <p className={`text-xl font-mono ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`}>
                {'// Open for freelance, collaborations & full-time opportunities'}
              </p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Got an exciting project or opportunity? Drop me a message!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Left Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`${
                  isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                } rounded-2xl shadow-2xl overflow-hidden border-2 ${
                  isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
                } backdrop-blur-sm`}>
                  {/* Terminal Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm font-mono ml-2">contact.js</span>
                  </div>

                  {/* Form Content */}
                  <div className="p-8">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label className={`text-sm font-mono font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                          {'> const name = '}
                        </label>
                        <input
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                          type="text"
                          placeholder="Your Name"
                          className={`w-full py-3 px-4 rounded-lg ${
                            isDarkMode
                              ? 'bg-gray-800 text-white border-purple-500/50'
                              : 'bg-white text-gray-900 border-purple-300'
                          } border-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all font-mono`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-sm font-mono font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {'> const email = '}
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          placeholder="your.email@example.com"
                          className={`w-full py-3 px-4 rounded-lg ${
                            isDarkMode
                              ? 'bg-gray-800 text-white border-blue-500/50'
                              : 'bg-white text-gray-900 border-blue-300'
                          } border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all font-mono`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-sm font-mono font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          {'> const message = '}
                        </label>
                        <textarea
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          rows="5"
                          placeholder="Tell me about your project, idea, or opportunity..."
                          className={`w-full py-3 px-4 rounded-lg ${
                            isDarkMode
                              ? 'bg-gray-800 text-white border-green-500/50'
                              : 'bg-white text-gray-900 border-green-300'
                          } border-2 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none font-mono`}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        type="button"
                        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <Send className="h-5 w-5" />
                        <span className="font-mono">sendMessage()</span>
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Contact Info & Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Quick Contact Cards */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Get In Touch
                  </h3>

                  {/* Email Card */}
                  <motion.a
                    href="mailto:amantiwari0309@gmail.com"
                    whileHover={{ scale: 1.03, x: 5 }}
                    className={`flex items-center gap-4 p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                    } border-2 ${
                      isDarkMode ? 'border-pink-500/30 hover:border-pink-500/60' : 'border-pink-200 hover:border-pink-400'
                    } shadow-lg hover:shadow-xl transition-all group`}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-pink-600 to-red-600 text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Email Me
                      </p>
                      <p className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-pink-600 transition-colors`}>
                        amantiwari0309@gmail.com
                      </p>
                    </div>
                  </motion.a>

                  {/* LinkedIn Card */}
                  <motion.a
                    href="https://www.linkedin.com/in/sumit-tiwari-7a198a241/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 5 }}
                    className={`flex items-center gap-4 p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                    } border-2 ${
                      isDarkMode ? 'border-blue-500/30 hover:border-blue-500/60' : 'border-blue-200 hover:border-blue-400'
                    } shadow-lg hover:shadow-xl transition-all group`}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Connect on LinkedIn
                      </p>
                      <p className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors`}>
                        @sumit-tiwari
                      </p>
                    </div>
                  </motion.a>

                  {/* GitHub Card */}
                  <motion.a
                    href="https://github.com/SumitTiwari03"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 5 }}
                    className={`flex items-center gap-4 p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-900/90' : 'bg-gray-50'
                    } border-2 ${
                      isDarkMode ? 'border-purple-500/30 hover:border-purple-500/60' : 'border-purple-200 hover:border-purple-400'
                    } shadow-lg hover:shadow-xl transition-all group`}
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Check my GitHub
                      </p>
                      <p className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-purple-600 transition-colors`}>
                        @SumitTiwari03
                      </p>
                    </div>
                  </motion.a>
                </div>

                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gradient-to-r from-green-900/50 to-teal-900/50' : 'bg-gradient-to-r from-green-50 to-teal-50'
                  } border-2 border-green-500/50 shadow-xl`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                    </span>
                    <span className={`font-black text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Currently Available
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Open for <span className="font-bold text-green-600">freelance projects</span>, <span className="font-bold text-blue-600">collaborations</span>, and <span className="font-bold text-purple-600">full-time opportunities</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/*     ====================================================== footer section ==========================================================  */}
      <footer className={`relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-900 to-black'} text-white py-16`}>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Like This Portfolio?
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Want a stunning portfolio or website for yourself? I create custom, professional websites tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Your Website
                </motion.a>
                <motion.a
                  href="mailto:amantiwari0309@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Drop a Message
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-12"></div>

          {/* Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <h4 className="text-2xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sumit Tiwari
              </h4>
              <p className="text-gray-400 mb-4">
                Full Stack Developer crafting exceptional digital experiences with the MERN stack.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/SumitTiwari03"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <FaGithub className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sumit-tiwari-7a198a241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <FaLinkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="mailto:amantiwari0309@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-black mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors inline-block hover:translate-x-2 transform duration-200"
                    >
                      → {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-black mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>→ Full Stack Development</li>
                <li>→ Custom Websites</li>
                <li>→ Portfolio Design</li>
                <li>→ API Development</li>
                <li>→ Database Design</li>
                <li>→ Web Consulting</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Sumit Tiwari. All rights reserved. Built with 💜
              </p>
              <p className="text-gray-400 text-sm font-mono">
                Designed & Developed with React + Node.js
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
