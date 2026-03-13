import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Gamepad2, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';

const TerminalGames = ({ isDarkMode }) => {
  const [gameMode, setGameMode] = useState('menu'); // menu, dino, snake, tictactoe, memory
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  // ============= DINO GAME =============
  const DinoGame = () => {
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const gameStateRef = useRef({
      dino: { x: 50, y: 150, velocity: 0, jumping: false },
      obstacles: [],
      score: 0,
      gameSpeed: 5,
      obstacleTimer: 0
    });

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = 600;
      canvas.height = 200;

      const jump = (e) => {
        if (e.code === 'Space' && !gameStateRef.current.dino.jumping && !isGameOver) {
          gameStateRef.current.dino.velocity = -12;
          gameStateRef.current.dino.jumping = true;
        }
        if (e.code === 'Space' && isGameOver) {
          resetGame();
        }
      };

      const resetGame = () => {
        gameStateRef.current = {
          dino: { x: 50, y: 150, velocity: 0, jumping: false },
          obstacles: [],
          score: 0,
          gameSpeed: 5,
          obstacleTimer: 0
        };
        setScore(0);
        setIsGameOver(false);
      };

      document.addEventListener('keydown', jump);

      const animate = () => {
        if (isGameOver) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw ground
        ctx.strokeStyle = isDarkMode ? '#8b5cf6' : '#7c3aed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 170);
        ctx.lineTo(canvas.width, 170);
        ctx.stroke();

        const state = gameStateRef.current;

        // Update dino physics
        state.dino.velocity += 0.6;
        state.dino.y += state.dino.velocity;

        if (state.dino.y >= 150) {
          state.dino.y = 150;
          state.dino.velocity = 0;
          state.dino.jumping = false;
        }

        // Draw dino
        ctx.fillStyle = isDarkMode ? '#a78bfa' : '#8b5cf6';
        ctx.fillRect(state.dino.x, state.dino.y, 20, 20);

        // Generate obstacles
        state.obstacleTimer++;
        if (state.obstacleTimer > 80) {
          state.obstacles.push({ x: canvas.width, width: 15, height: 30 });
          state.obstacleTimer = 0;
        }

        // Update and draw obstacles
        state.obstacles.forEach((obstacle, index) => {
          obstacle.x -= state.gameSpeed;

          ctx.fillStyle = isDarkMode ? '#ec4899' : '#db2777';
          ctx.fillRect(obstacle.x, 140, obstacle.width, obstacle.height);

          // Collision detection
          if (
            state.dino.x < obstacle.x + obstacle.width &&
            state.dino.x + 20 > obstacle.x &&
            state.dino.y < 140 + obstacle.height &&
            state.dino.y + 20 > 140
          ) {
            setIsGameOver(true);
          }

          // Remove off-screen obstacles
          if (obstacle.x + obstacle.width < 0) {
            state.obstacles.splice(index, 1);
            state.score += 10;
            setScore(state.score);
          }
        });

        // Draw score
        ctx.fillStyle = isDarkMode ? '#fff' : '#000';
        ctx.font = '16px monospace';
        ctx.fillText(`Score: ${state.score}`, 10, 30);

        gameLoopRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        document.removeEventListener('keydown', jump);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }, [isGameOver, isDarkMode]);

    return (
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className="border-2 border-purple-500 rounded-lg" />
        <div className="mt-4 text-center">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm`}>
            Press <span className="text-purple-500 font-bold">SPACE</span> to jump
          </p>
          {isGameOver && (
            <div className="mt-2">
              <p className="text-red-500 font-bold">Game Over! Score: {score}</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                Press SPACE to restart
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============= SNAKE GAME =============
  const SnakeGame = () => {
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const gameStateRef = useRef({
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      score: 0
    });

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 400;
      const gridSize = 20;
      const tileCount = 20;

      const changeDirection = (e) => {
        const state = gameStateRef.current;
        if (isGameOver && e.code === 'Space') {
          resetGame();
          return;
        }

        switch (e.code) {
          case 'ArrowUp':
            if (state.direction.y === 0) state.nextDirection = { x: 0, y: -1 };
            break;
          case 'ArrowDown':
            if (state.direction.y === 0) state.nextDirection = { x: 0, y: 1 };
            break;
          case 'ArrowLeft':
            if (state.direction.x === 0) state.nextDirection = { x: -1, y: 0 };
            break;
          case 'ArrowRight':
            if (state.direction.x === 0) state.nextDirection = { x: 1, y: 0 };
            break;
        }
      };

      const resetGame = () => {
        gameStateRef.current = {
          snake: [{ x: 10, y: 10 }],
          food: { x: 15, y: 15 },
          direction: { x: 1, y: 0 },
          nextDirection: { x: 1, y: 0 },
          score: 0
        };
        setScore(0);
        setIsGameOver(false);
      };

      document.addEventListener('keydown', changeDirection);

      const gameLoop = setInterval(() => {
        if (isGameOver) return;

        const state = gameStateRef.current;
        state.direction = state.nextDirection;

        // Move snake
        const head = {
          x: state.snake[0].x + state.direction.x,
          y: state.snake[0].y + state.direction.y
        };

        // Check wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
          setIsGameOver(true);
          return;
        }

        // Check self collision
        if (state.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setIsGameOver(true);
          return;
        }

        state.snake.unshift(head);

        // Check food collision
        if (head.x === state.food.x && head.y === state.food.y) {
          state.score += 10;
          setScore(state.score);
          state.food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
          };
        } else {
          state.snake.pop();
        }

        // Draw
        ctx.fillStyle = isDarkMode ? '#1f2937' : '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = isDarkMode ? '#374151' : '#e5e7eb';
        for (let i = 0; i <= tileCount; i++) {
          ctx.beginPath();
          ctx.moveTo(i * gridSize, 0);
          ctx.lineTo(i * gridSize, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i * gridSize);
          ctx.lineTo(canvas.width, i * gridSize);
          ctx.stroke();
        }

        // Draw snake
        state.snake.forEach((segment, index) => {
          ctx.fillStyle = index === 0
            ? (isDarkMode ? '#a78bfa' : '#8b5cf6')
            : (isDarkMode ? '#8b5cf6' : '#7c3aed');
          ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = isDarkMode ? '#ec4899' : '#db2777';
        ctx.fillRect(state.food.x * gridSize, state.food.y * gridSize, gridSize - 2, gridSize - 2);

        // Draw score
        ctx.fillStyle = isDarkMode ? '#fff' : '#000';
        ctx.font = '16px monospace';
        ctx.fillText(`Score: ${state.score}`, 10, 20);
      }, 150);

      return () => {
        document.removeEventListener('keydown', changeDirection);
        clearInterval(gameLoop);
      };
    }, [isGameOver, isDarkMode]);

    return (
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className="border-2 border-purple-500 rounded-lg" />
        <div className="mt-4 text-center">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-sm`}>
            Use <span className="text-purple-500 font-bold">ARROW KEYS</span> to move
          </p>
          {isGameOver && (
            <div className="mt-2">
              <p className="text-red-500 font-bold">Game Over! Score: {score}</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                Press SPACE to restart
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============= TIC-TAC-TOE WITH AI =============
  const TicTacToeGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [gameMode, setGameModeLocal] = useState(null); // 'ai' or 'player'

    const calculateWinner = (squares) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    };

    const getAvailableMoves = (squares) => {
      return squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    };

    const minimax = (squares, isMaximizing) => {
      const winner = calculateWinner(squares);
      if (winner === 'O') return 10;
      if (winner === 'X') return -10;
      if (!squares.includes(null)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (squares[i] === null) {
            squares[i] = 'O';
            const score = minimax(squares, false);
            squares[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (squares[i] === null) {
            squares[i] = 'X';
            const score = minimax(squares, true);
            squares[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    };

    const getBestMove = (squares) => {
      let bestScore = -Infinity;
      let bestMove = null;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, false);
          squares[i] = null;
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      return bestMove;
    };

    const handleClick = (index) => {
      if (board[index] || winner || !gameMode) return;

      const newBoard = [...board];
      newBoard[index] = 'X';
      setBoard(newBoard);

      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        return;
      }

      if (!newBoard.includes(null)) {
        setWinner('Draw');
        return;
      }

      if (gameMode === 'ai') {
        // AI's turn
        setTimeout(() => {
          const aiMove = getBestMove(newBoard);
          if (aiMove !== null) {
            newBoard[aiMove] = 'O';
            setBoard([...newBoard]);

            const aiWinner = calculateWinner(newBoard);
            if (aiWinner) {
              setWinner(aiWinner);
            } else if (!newBoard.includes(null)) {
              setWinner('Draw');
            }
          }
        }, 500);
      } else {
        // Two player mode
        setIsXNext(!isXNext);
      }
    };

    const handlePlayerClick = (index) => {
      if (board[index] || winner || !gameMode || gameMode !== 'player') return;

      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);

      const gameWinner = calculateWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newBoard.includes(null)) {
        setWinner('Draw');
      }
    };

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
      setGameModeLocal(null);
    };

    if (!gameMode) {
      return (
        <div className="flex flex-col items-center gap-4">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Choose Game Mode
          </h3>
          <button
            onClick={() => setGameModeLocal('ai')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            Play vs AI (Hard Mode)
          </button>
          <button
            onClick={() => setGameModeLocal('player')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            Two Players
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => gameMode === 'ai' ? handleClick(index) : handlePlayerClick(index)}
              className={`w-24 h-24 text-4xl font-bold rounded-lg border-2 transition-all ${
                isDarkMode
                  ? 'bg-gray-800 border-purple-500 hover:bg-gray-700'
                  : 'bg-white border-purple-400 hover:bg-gray-50'
              } ${cell === 'X' ? 'text-purple-500' : 'text-pink-500'}`}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center">
          {winner ? (
            <div>
              <p className={`text-xl font-bold mb-2 ${
                winner === 'Draw' ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
              </p>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {gameMode === 'ai' ? (
                <span>Your Turn (X)</span>
              ) : (
                <span>
                  Next: <span className={isXNext ? 'text-purple-500' : 'text-pink-500'}>
                    {isXNext ? 'X' : 'O'}
                  </span>
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    );
  };

  // ============= MEMORY GAME =============
  const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [moves, setMoves] = useState(0);

    const symbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎺'];

    useEffect(() => {
      initializeGame();
    }, []);

    const initializeGame = () => {
      const shuffledCards = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({ id: index, symbol }));
      setCards(shuffledCards);
      setFlipped([]);
      setSolved([]);
      setMoves(0);
    };

    const handleCardClick = (id) => {
      if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves(moves + 1);
        const [first, second] = newFlipped;
        if (cards[first].symbol === cards[second].symbol) {
          setSolved([...solved, first, second]);
          setFlipped([]);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    const isWon = solved.length === cards.length && cards.length > 0;

    return (
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Moves: <span className="text-purple-500">{moves}</span>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-16 h-16 text-3xl font-bold rounded-lg border-2 transition-all ${
                flipped.includes(card.id) || solved.includes(card.id)
                  ? isDarkMode
                    ? 'bg-purple-600 border-purple-400'
                    : 'bg-purple-500 border-purple-300'
                  : isDarkMode
                  ? 'bg-gray-800 border-purple-500 hover:bg-gray-700'
                  : 'bg-white border-purple-400 hover:bg-gray-50'
              }`}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              {flipped.includes(card.id) || solved.includes(card.id) ? card.symbol : '?'}
            </button>
          ))}
        </div>
        {isWon && (
          <div className="text-center">
            <p className="text-xl font-bold text-green-500 mb-2">
              You Won in {moves} moves!
            </p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  };

  // ============= GAME MENU =============
  const GameMenu = () => {
    const games = [
      {
        id: 'dino',
        name: 'Chrome Dino',
        description: 'Jump over obstacles with SPACE',
        emoji: '🦖'
      },
      {
        id: 'snake',
        name: 'Snake Game',
        description: 'Eat food and grow longer',
        emoji: '🐍'
      },
      {
        id: 'tictactoe',
        name: 'Tic-Tac-Toe',
        description: 'Play vs AI or Friend',
        emoji: '⭕'
      },
      {
        id: 'memory',
        name: 'Memory Match',
        description: 'Find matching pairs',
        emoji: '🎴'
      }
    ];

    return (
      <div className="space-y-4 w-full max-w-md">
        <h3 className={`text-2xl font-bold text-center mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Select a Game
        </h3>
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setGameMode(game.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              isDarkMode
                ? 'bg-gray-800 border-purple-500 hover:bg-gray-700'
                : 'bg-white border-purple-400 hover:bg-gray-50'
            } flex items-center gap-4`}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <span className="text-4xl">{game.emoji}</span>
            <div className="text-left">
              <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {game.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {game.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      data-game-mode="true"
      className={`${
        isDarkMode ? 'bg-gray-900/90' : 'bg-gray-900'
      } rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border ${
        isDarkMode ? 'border-purple-500/20' : 'border-purple-500/10'
      } p-6 transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 max-w-none' : ''
      }`}
      style={{ cursor: 'auto', pointerEvents: 'auto' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-purple-400" />
          <span className="text-purple-400 text-sm font-mono">game-mode.js</span>
        </div>
        <div className="flex items-center gap-2">
          {gameMode !== 'menu' && (
            <button
              onClick={() => setGameMode('menu')}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-colors"
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-colors"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className={`flex items-center justify-center ${isFullscreen ? 'min-h-[calc(100vh-200px)]' : 'min-h-[300px]'}`}>
        {gameMode === 'menu' && <GameMenu />}
        {gameMode === 'dino' && <DinoGame />}
        {gameMode === 'snake' && <SnakeGame />}
        {gameMode === 'tictactoe' && <TicTacToeGame />}
        {gameMode === 'memory' && <MemoryGame />}
      </div>
    </div>
  );
};

export default TerminalGames;
