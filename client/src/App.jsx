import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useForm } from 'react-hook-form'
// import { MAIL_API } from './config'

import { Linkedin, Mail, Download, Send, ExternalLink, Moon, Sun, Github } from 'lucide-react'

import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaLinkedin, FaGithub, FaPython, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiGatsby, SiMongodb, SiMysql, SiExpress } from 'react-icons/si';

// Assume these UI components are defined elsewhere in your project
import { Button, Card, CardContent, Badge, Tabs, TabsContent, TabsList, TabsTrigger, LandingPage, ProjectSection } from './component'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your API
    try {
      const sendForm = await axios.post(`https://sumit-dev-api.onrender.com/api/mail`, {
        username,
        email,
        message
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

  const projects = [
    {
      id: 1,
      title: 'Zaika',
      description: "A hotel website named Zaika Hotel's website offers an enticing showcase of delicious cuisines, easy online reservations, and contact information. It also have the chief side which can be access by click on the logo of the cart page.",
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '/zaika.png',
      link: 'https://zaikahotel.netlify.app'
    },
    {
      id: 3,
      title: 'Organiser Todos',
      description: 'A React based todo app, where a user can add edit and delete the todos. Not only this but it can aslo keep the track of all your tasks by allowingyou to check and uncheck it. The data is stored in the Local Storage.',
      tech: ['React', 'Tailwind'],
      image: '/todo.jpg',
      link: 'https://organiser-todo.vercel.app/'
    },
    {
      id: 3,
      title: 'Youtube clone',
      description: 'A youtube clone website developed to practice my api skills',
      tech: ['Html', 'css', 'Javascript'],
      image: '/youtubeclone.png',
      link: 'https://youtube0309.netlify.app/'
    },
    {
      id: 4,
      title: 'Wheather tacker',
      description: 'Real-time wheather tracking app.',
      tech: ['React Native', 'Redux', 'Crypto APIs'],
      image: "/wheatherforcasting.png",
      link: 'https://whatweather03.netlify.app/'
    },
    {
      id: 5,
      title: 'Cnv Holidays',
      description: 'A holiday based website.',
      tech: ['Raspberry Pi', 'Python', 'MQTT'],
      image: "/cnv.jpg",
      link: 'https://cnvholidays.netlify.app'
    },
  ]

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'GSAP',] },
    { category: 'Backend', items: ['Node.js', 'Express js'] },
    { category: 'Database', items: ['MongoDB', 'MySQL'] },
    { category: 'Languages', items: ['Python', 'JavaScript', 'Java',] },
  ]

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

  const achievements = [
    {
      college: 'Nagindas khandawal college',
      fest: 'Zestech',
      ranker: 'Second runner up',
      date: 'Apr 2023 - Sep 2023',
      letter: 'Certifcate',
      link: ''
    },
  ]

  const experiences = [
    {
      company: 'CREDIT AND VAULT',
      role: 'Web developer',
      Duration: 'Apr 2023 - Sep 2023',
      letter: 'Experience letter',
      link: 'https://drive.google.com/file/d/1_ILtrx_deEOk2AYqNy2znTcI8InrL5NK/view?usp=sharing'
    },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800 text-white' : 'from-gray-100 to-white text-gray-900'} transition-colors duration-300`}>
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
                onClick={() => window.open('/resume.pdf', '_blank')}
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
                  onClick={() => window.open('/resume.pdf', '_blank')}
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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-primary/20 to-secondary/20' : 'bg-gradient-to-br from-primary/10 to-secondary/10'}`}></div>
            <div className={`absolute inset-0 bg-[url('/background-pattern.svg')] ${isDarkMode ? 'opacity-10' : 'opacity-5'} animate-pulse`}></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 flex-col"
          >
            <LandingPage className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`} ></LandingPage>
          </motion.div>

        </section>

        {/* ===============================================================About us section ================================================================== */}

        <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/3"
              >
                <img
                  src="/profile.jpg"
                  alt="John Doe"
                  className="rounded-full shadow-lg mx-auto w-64 h-64 object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-2/3"
              >
                <p className="text-lg mb-6">
                  Hello! I'm Sumit Tiwari, a full-stack developer with a strong background in building dynamic, user-friendly web applications.
                  With extensive experience in the MERN stack, I bring a balanced focus on frontend aesthetics and backend performance.
                  I have led project redesigns, enhanced functionalities, and developed unique platforms.
                </p>
                <p className="text-lg mb-6">
                  Skilled in Node.js, React, MongoDB, and modern technologies, I create responsive, high-performance applications with seamless user experiences. I thrive on problem-solving, innovation, and continuous learning.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href='https://github.com/SumitTiwari03' target="_blank" className='flex justify-center items-center' rel="noopener noreferrer">
                      <Github className="mr-2 w-4 h-4 inline-block" /> Github
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href='https://www.linkedin.com/in/sumit-tiwari-7a198a241/' target="_blank" className='flex justify-center items-center' rel="noopener noreferrer">
                      <Linkedin className="mr-2 w-4 h-4 inline-block" /> LinkedIn
                    </a>
                  </Button>


                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================================projects section ============================================================ */}

        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className={`h-full transition-colors`}>
                    <CardContent className="p-6">
                      <div className="h-80 w-full object-cover rounded-md mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-fit object-cover rounded-md mb-4"
                        />
                      </div>
                      <h3 className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-2xl font-semibold mb-2`}>{project.title}</h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a href={project.link} target="_blank" className='flex justify-center items-center' rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* <section>
        <ProjectSection {...{isDarkMode}} />
        </section> */}

        {/* ============================================================== Skills sections ======================================================================== */}
        <section id="skills" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
            {skills.map((skillCategory) => (
              <div key={skillCategory.category} className="mb-8">
                {/* Category Title */}
                <h3 className="text-2xl font-semibold mb-4">
                  {skillCategory.category}
                </h3>
                {/* Skill Items */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillCategory.items.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={`${isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-white hover:bg-gray-50'
                          } transition-colors`}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            {skillIcons[skill]} {/* Display the skill icon */}
                            <span className="text-xl font-medium">{skill}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================= Education and achivement sections=============================================== */}
        <section id="education" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Education & Experience</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Education</h3>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <Card key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary' : 'bg-primary/20'} flex items-center justify-center mr-4`}>
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}>{edu.level[0]}</span>
                          </div>
                          <div>
                            <h4 className="text-xl font-medium">{edu.level}</h4>
                            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{edu.institution}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{edu.year}</span>
                          <Badge variant="secondary">{edu.grade}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-6">Experience</h3>
                {experiences.map((ele, index) => (
                  <Card key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary' : 'bg-primary/20'} flex items-center justify-center mr-4`}>
                          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}>{ele.company[0]}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium">{ele.company}</h4>
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ele.role}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ele.Duration}</span>
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <a href={ele.link} target="_blank" className='flex justify-center items-center' rel="noopener noreferrer">
                            {ele.letter}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <h3 className="text-2xl font-semibold my-6">Achievements</h3>
                {achievements.map((ele, index) => (
                  <Card key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-primary' : 'bg-primary/20'} flex items-center justify-center mr-4`}>
                          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}>{ele.college[0]}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium mb-3">{ele.college}</h4>
                          <p className={`font-bold text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ele.fest}</p>
                          <p className={`font- ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ele.ranker}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ele.date}</span>
                        <Button onClick={handleSubmit} variant="outline" size="sm" asChild className="w-full">
                          <a className='flex justify-center items-center' rel="noopener noreferrer"> {ele.letter}</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================================================Contact me section ============================================================ */}

        <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
            <div className="flex justify-center items-center w-full">


              <form className="p-6 w-full flex flex-col justify-center items-center">
                <div className="flex flex-col w-fit md:w-1/3">
                  <label for="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => {
                      let value = e.target.value
                      setUsername(value)
                    }}
                    value={username}
                    type="name"
                    name="username"
                    id="name"
                    placeholder="Full Name"
                    className={`w-100 mt-2 py-3 px-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none`}
                  />
                </div>

                <div className="flex flex-col w-fit md:w-1/3">
                  <label for="email" className="hidden">
                    Email
                  </label>
                  <input
                    onChange={(e) => {
                      let value = e.target.value
                      setEmail(value)
                    }}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className={`w-100 mt-2 py-3 px-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none`}
                  />
                </div>

                <div className="flex flex-col w-fit md:w-1/3 mb-4">
                  <label for="tel" className="hidden">
                    Number
                  </label>
                  <input
                    onChange={(e) => {
                      let value = e.target.value
                      setMessage(value)
                    }}
                    value={message}
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Write me something..."
                    className={`w-100 mt-2 py-3 px-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none`}
                  />
                </div>

                <Button onClick={handleSubmit} href='#home' variant="outline" size="sm" asChild className="w-full">
                  {/* <a  className='flex justify-center items-center' rel="noopener noreferrer"> */}
                  <a className='flex justify-center items-center' rel="noopener noreferrer">
                    <Send className="mr-2 h-4 w-4" /> Submit
                  </a>

                  {/* </a> */}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/*     ====================================================== footer section ==========================================================  */}
      <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} py-8`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2024 Sumit Tiwari. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/SumitTiwari03" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {/* <GitHub className="h-6 w-6" /> */}

                <FaGithub className='h-6 w-6' />
              </a>
              <a href="https://www.linkedin.com/in/sumit-tiwari-7a198a241/" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="mailto:amantiwari0309@gmail.com" target="_blank" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
