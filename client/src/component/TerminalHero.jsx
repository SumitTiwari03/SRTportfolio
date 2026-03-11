import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Coffee, Code2, Zap } from 'lucide-react';

const TerminalHero = ({ isDarkMode, projects = [] }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "console.log('Hello, I build amazing things! 🚀')";
  const [commandIndex, setCommandIndex] = useState(0);

  const commands = [
    { cmd: "$ whoami", output: "Full Stack Developer 💻" },
    { cmd: "$ ls skills/", output: "React • Node.js • MongoDB • Express" },
    { cmd: "$ cat passion.txt", output: "Building scalable web applications 🔥" },
    { cmd: "$ sudo make-it-awesome", output: "✓ Ready to create magic!" }
  ];

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {/* Terminal Header */}
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} px-4 py-3 flex items-center gap-2`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                sumit@portfolio:~
              </span>
            </div>

            {/* Terminal Body */}
            <div className={`p-6 font-mono text-sm ${isDarkMode ? 'text-green-400' : 'text-gray-800'} space-y-3`}>
              {commands.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                >
                  <div className={`${isDarkMode ? 'text-blue-400' : 'text-purple-600'} mb-1`}>{item.cmd}</div>
                  <div className="ml-4 mb-3">{item.output}</div>
                </motion.div>
              ))}
              <div className={`${isDarkMode ? 'text-blue-400' : 'text-purple-600'}`}>
                $ node inspire.js
              </div>
              <div className="ml-4">
                {text}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-block"
            >
              <span className={`px-4 py-2 rounded-full ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              } text-white text-sm font-semibold shadow-lg`}>
                ⚡ Available for Opportunities
              </span>
            </motion.div>

            <h1 className={`text-6xl md:text-7xl font-black ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Sumit
              </span>
            </h1>

            <div className="flex items-center gap-4 text-2xl md:text-3xl font-bold">
              <Code2 className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Full Stack Developer
              </span>
            </div>

            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              I craft <span className="font-semibold text-purple-600">scalable web applications</span> with the MERN stack.
              Passionate about <span className="font-semibold text-blue-600">clean code</span> and
              <span className="font-semibold text-pink-600"> innovative solutions</span>.
              Let's build something amazing together! 🚀
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg text-center`}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {projects.length || '10+'}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg text-center`}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  <Coffee className="inline h-8 w-8" />
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Coffee++</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg text-center`}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  <Zap className="inline h-8 w-8" />
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fast AF</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                View My Work 🎨
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className={`px-8 py-4 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50'
                } ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                Let's Talk 💬
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHero;
