import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Rocket, Cpu, Database, Globe, Zap, Coffee } from 'lucide-react';
import AnimatedLines from './AnimatedLines';

const TechHero = ({ isDarkMode, projects = [] }) => {
  const [text, setText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Full Stack Developer',
    'Backend Developer',
    'MERN Stack Developer',
    'SDE',
    'API Architect'
  ];

  const codeLines = [
    "const developer = {",
    "  name: 'Sumit Tiwari',",
    "  role: 'MERN Stack Developer',",
    "  availableFor: ['Freelance', 'Paid Projects', 'Collabs'],",
    "  stack: ['React', 'Node.js', 'MongoDB', 'Express'],",
    "  status: 'Open to Hire 💼'",
    "};"
  ];

  const techStack = [
    { icon: Code2, name: 'React', color: 'from-cyan-400 to-blue-500' },
    { icon: Database, name: 'MongoDB', color: 'from-green-400 to-emerald-500' },
    { icon: Terminal, name: 'Node.js', color: 'from-lime-400 to-green-500' },
    { icon: Globe, name: 'Express', color: 'from-gray-400 to-gray-600' },
    { icon: Cpu, name: 'REST API', color: 'from-purple-400 to-pink-500' },
    { icon: Zap, name: 'JavaScript', color: 'from-yellow-400 to-orange-500' }
  ];

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      if (text.length < line.length) {
        const timeout = setTimeout(() => {
          setText(text + line[text.length]);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setText('');
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(0);
        setText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [text, currentLine]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for roles
  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && roleText.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setRoleText(currentRole.slice(0, roleText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && roleText.length === currentRole.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && roleText.length > 0) {
      const timeout = setTimeout(() => {
        setRoleText(roleText.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && roleText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
  }, [roleText, isDeleting, roleIndex]);

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900'
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
      {/* Animated Lines Background */}
      <AnimatedLines isDarkMode={isDarkMode} />

      {/* Grid Background */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['{', '}', '<', '>', '/>', '()', '[]', '=>', '&&', '||'].map((symbol, i) => (
          <motion.div
            key={i}
            className={`absolute text-6xl font-mono ${
              isDarkMode ? 'text-purple-500/10' : 'text-purple-600/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Code Editor Window */}
            <div className={`${
              isDarkMode ? 'bg-gray-900/90' : 'bg-gray-900'
            } rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border ${
              isDarkMode ? 'border-purple-500/20' : 'border-purple-500/10'
            }`}>
              {/* Editor Header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-xs font-mono">developer.js</span>
                <Terminal className="h-4 w-4 text-gray-400" />
              </div>

              {/* Editor Body */}
              <div className="p-6 font-mono text-sm min-h-[300px]">
                {codeLines.slice(0, currentLine).map((line, i) => (
                  <div key={i} className="mb-2">
                    <span className="text-gray-500 mr-4">{i + 1}</span>
                    <span className={
                      line.includes('const') || line.includes('return')
                        ? 'text-purple-400'
                        : line.includes(':')
                        ? 'text-blue-400'
                        : 'text-green-400'
                    }>{line}</span>
                  </div>
                ))}
                {currentLine < codeLines.length && (
                  <div className="mb-2">
                    <span className="text-gray-500 mr-4">{currentLine + 1}</span>
                    <span className="text-blue-400">
                      {text}
                      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-white`}>▊</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`px-4 py-2 rounded-xl bg-gradient-to-r ${tech.color} shadow-lg flex items-center gap-2`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                    <span className="text-white font-semibold text-sm">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold shadow-lg flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                Available for Work
              </div>
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                } font-mono`}
              >
                {'<Developer />'}
              </motion.div>

              <h1 className={`text-6xl md:text-7xl font-black mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Hey, I'm{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Sumit
                </span>
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <Rocket className={`h-8 w-8 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <span className={`text-2xl md:text-3xl font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {roleText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1`}>|</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className={`text-xl leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Crafting <span className="font-bold text-purple-600">scalable web solutions</span> with the MERN stack.
              Passionate about <span className="font-bold text-blue-600">clean architecture</span> and
              <span className="font-bold text-pink-600"> performant code</span>.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
                } backdrop-blur-sm shadow-xl border ${
                  isDarkMode ? 'border-purple-500/20' : 'border-purple-200'
                } text-center`}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {`${projects.length}+` || '10+'}
                </div>
                <div className={`text-sm font-semibold mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Projects</div>
              </motion.div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                } backdrop-blur-sm shadow-xl border border-transparent text-center cursor-pointer transition-all`}
              >
                <div className="text-4xl">
                  <Coffee className="inline-block h-10 w-10 text-white" />
                </div>
                <div className="text-sm font-semibold mt-1 text-white">Hire Me</div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
                } backdrop-blur-sm shadow-xl border ${
                  isDarkMode ? 'border-green-500/20' : 'border-green-200'
                } text-center`}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  1
                </div>
                <div className={`text-sm font-semibold mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Years Exp</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className={`px-8 py-4 ${
                  isDarkMode
                    ? 'bg-gray-900/50 hover:bg-gray-800/50 border-purple-500/50'
                    : 'bg-white/80 hover:bg-white border-purple-300'
                } backdrop-blur-sm rounded-xl font-bold shadow-lg transition-all border-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Let's Connect
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default TechHero;
