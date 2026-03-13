import React, { useEffect, useState } from 'react';

const CursorGlow = ({ isDarkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorIcon, setCursorIcon] = useState(0);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  // Map section IDs to cursor icons
  const sectionIcons = {
    'home': 0,      // ❯
    'about': 1,     // ⟨⟩
    'projects': 2,  // {...}
    'skills': 3,    // </>
    'education': 4, // ⚡
    'contact': 5,   // ◆
    'default': 6    // ▸
  };

  const cursorIcons = ['❯', '⟨⟩', '{...}', '</>', '⚡', '◆', '▸'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if cursor is over interactive elements
      const target = e.target;
      const isInteractive = target.tagName === 'BUTTON' ||
                           target.tagName === 'INPUT' ||
                           target.tagName === 'TEXTAREA' ||
                           target.tagName === 'A' ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.closest('input') ||
                           target.closest('textarea');

      setIsOverInteractive(isInteractive);

      // Detect which section the cursor is in
      let currentSection = 'default';
      const sections = ['home', 'about', 'projects', 'skills', 'education', 'contact'];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Update cursor icon based on section
      const newIconIndex = sectionIcons[currentSection];
      if (newIconIndex !== cursorIcon) {
        setCursorIcon(newIconIndex);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorIcon]);

  return (
    <>
      {/* Custom Cursor Icon */}
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-200"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible && !isOverInteractive ? 1 : 0,
        }}
      >
        <div className={`text-2xl font-mono font-bold ${
          isDarkMode ? 'text-purple-400' : 'text-purple-600'
        } animate-pulse`} style={{
          textShadow: isDarkMode
            ? '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(219, 39, 119, 0.4)'
            : '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)'
        }}>
          {cursorIcons[cursorIcon]}
        </div>
      </div>

      {/* Hide default cursor except on interactive elements */}
      <style dangerouslySetInnerHTML={{__html: `
        * {
          cursor: none !important;
        }

        a, button, input, textarea, select {
          cursor: pointer !important;
        }

        input[type="text"], input[type="email"], input[type="number"], input[type="password"], textarea, select {
          cursor: text !important;
        }
      `}} />
    </>
  );
};

export default CursorGlow;
