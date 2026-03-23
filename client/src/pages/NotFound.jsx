import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Code2, AlertTriangle, Home } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();
  const [code, setCode] = useState([]);

  useEffect(() => {
    const codeLines = [
      '$ npm run deploy',
      '> Building application...',
      '✓ Components compiled',
      '✓ Routes optimized',
      '✓ Assets bundled',
      '',
      'ERROR 404: Resource not found',
      'Location: ' + window.location.pathname,
      'Status: Page Not Found',
      'Time: ' + new Date().toLocaleTimeString(),
      '',
      '',
      'Searching nearby routes...',
      '  └─ / (Home)',
    ];

    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setCode(prev => [...prev, line]);
      }, index * 50);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Terminal Container */}
        <div className="bg-gray-900 border-2 border-purple-500/50 rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="bg-gray-800 border-b border-purple-500/30 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm ml-2">
              <Terminal className="w-4 h-4 inline mr-2" />
              sumit@portfolio ~ % Error Handler
            </span>
          </div>

          {/* Terminal Content */}
          <div className="bg-gray-950 p-6 font-mono text-sm min-h-96">
            <div className="space-y-1">
              {code.map((line, index) => (
                <div
                  key={index}
                  className={`text-gray-300 ${
                    line.includes('ERROR') ? 'text-red-400 font-bold' :
                    line.includes('✓') ? 'text-green-400' :
                    line.includes('$') ? 'text-purple-400' :
                    line.includes('-->') ? 'text-yellow-400' :
                    'text-gray-400'
                  } transition-all duration-100`}
                >
                  {line}
                </div>
              ))}
              {code.length > 0 && <div className="text-purple-400 animate-pulse">▌</div>}
            </div>
          </div>
        </div>

        {/* 404 Display */}
        <div className="mt-8 text-center space-y-6">
          <div className="flex justify-center items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
            <div className="text-7xl font-black bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              404
            </div>
            <Code2 className="w-12 h-12 text-purple-500 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-400 text-lg">
              The page you're looking for has escaped into the digital void.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold rounded-lg transition-all transform hover:scale-105 border border-gray-500"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Error Code: ERR_404_NOT_FOUND | Timestamp: {new Date().toISOString()}</p>
          <p className="mt-2">Need help? Contact support or check the documentation</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}

export default NotFound;
