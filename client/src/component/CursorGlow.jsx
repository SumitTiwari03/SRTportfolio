import React, { useEffect, useState } from 'react';

const CursorGlow = ({ isDarkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorIcon, setCursorIcon] = useState(0);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

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

      // Change cursor icon randomly on movement
      if (Math.random() > 0.95) {
        setCursorIcon(prev => (prev + 1) % cursorIcons.length);
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
  }, []);

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
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        a, button, input, textarea, select {
          cursor: auto !important;
        }
      `}</style>
    </>
  );
};

export default CursorGlow;
