import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRAVITY = 0.5;
const JUMP = -7.5;
const PIPE_SPEED = 3.5;
const PIPE_WIDTH = 50;
const PIPE_SPAWN_X = 400;
const GAP_SIZE = 140;
const BIRD_SIZE = 24;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const BIRD_X = 50;

export default function FlappyBird({ onClose }) {
  const [birdY, setBirdY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Use refs for values needed inside requestAnimationFrame or intervals
  const birdYRef = useRef(birdY);
  const velocityRef = useRef(velocity);
  const pipesRef = useRef(pipes);
  const gameOverRef = useRef(gameOver);
  const scoreRef = useRef(score);
  const hasStartedRef = useRef(hasStarted);

  useEffect(() => { birdYRef.current = birdY; }, [birdY]);
  useEffect(() => { velocityRef.current = velocity; }, [velocity]);
  useEffect(() => { pipesRef.current = pipes; }, [pipes]);
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { hasStartedRef.current = hasStarted; }, [hasStarted]);

  const jump = useCallback(() => {
    if (gameOverRef.current) return;
    if (!hasStartedRef.current) {
      setHasStarted(true);
    }
    setVelocity(JUMP);
  }, []);

  const resetGame = () => {
    setBirdY(250);
    setVelocity(0);
    setPipes([]);
    setGameOver(false);
    setScore(0);
    setHasStarted(false);
  };

  useEffect(() => {
    let animationFrameId;
    let frames = 0;

    const gameLoop = () => {
      if (!hasStartedRef.current || gameOverRef.current) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      frames++;

      // Apply physics
      let newVelocity = velocityRef.current + GRAVITY;
      let newBirdY = birdYRef.current + newVelocity;

      // Pipe generation
      let newPipes = [...pipesRef.current];
      if (frames % 80 === 0) { // spawn every 80 frames
        const minHeight = 50;
        const maxHeight = GAME_HEIGHT - GAP_SIZE - 50;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        newPipes.push({ x: PIPE_SPAWN_X, topHeight, passed: false });
      }

      // Move pipes & collision check
      let currentGameOver = false;
      let newScore = scoreRef.current;

      newPipes = newPipes.map(pipe => {
        const nextX = pipe.x - PIPE_SPEED;
        
        // Score update
        if (!pipe.passed && nextX + PIPE_WIDTH < BIRD_X) {
          pipe.passed = true;
          newScore++;
        }

        // Collision detection
        const birdLeft = BIRD_X;
        const birdRight = BIRD_X + BIRD_SIZE;
        const birdTop = newBirdY;
        const birdBottom = newBirdY + BIRD_SIZE;

        const pipeLeft = nextX;
        const pipeRight = nextX + PIPE_WIDTH;

        // Hit Pipe
        if (birdRight > pipeLeft && birdLeft < pipeRight) {
          // Top pipe: y from 0 to topHeight
          if (birdTop < pipe.topHeight) {
            currentGameOver = true;
          }
          // Bottom pipe: y from topHeight + GAP_SIZE to GAME_HEIGHT
          if (birdBottom > pipe.topHeight + GAP_SIZE) {
            currentGameOver = true;
          }
        }

        return { ...pipe, x: nextX };
      }).filter(pipe => pipe.x + PIPE_WIDTH > 0);

      // Hit Floor or Ceiling
      if (newBirdY >= GAME_HEIGHT - BIRD_SIZE || newBirdY <= 0) {
        currentGameOver = true;
        newBirdY = GAME_HEIGHT - BIRD_SIZE; // don't fall infinitely
      }

      setBirdY(newBirdY);
      setVelocity(newVelocity);
      setPipes(newPipes);
      
      if (currentGameOver) {
        setGameOver(true);
      } else {
        if (newScore !== scoreRef.current) setScore(newScore);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-pixel select-none" onClick={jump}>
      <div 
        className="relative bg-[#70c5ce] overflow-hidden rounded-lg shadow-2xl border-4 border-white"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, maxWidth: '100%' }}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[20px] bg-[#ded895] border-t-4 border-[#73bf2e] z-10" />

        {/* Score */}
        <div className="absolute top-6 left-0 w-full text-center z-20">
          <span className="text-5xl text-white drop-shadow-[2px_2px_0px_#000]">{score}</span>
        </div>

        {/* Bird */}
        <div 
          className="absolute bg-[#f4d03f] border-[3px] border-black rounded-full shadow-sm flex items-center justify-center text-xs z-10"
          style={{ 
            left: BIRD_X, 
            top: birdY, 
            width: BIRD_SIZE, 
            height: BIRD_SIZE,
            transform: `rotate(${Math.min(Math.max(velocity * 4, -45), 90)}deg)`,
            transition: 'transform 0.1s'
          }}
        >
          <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white rounded-full"><div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-black rounded-full"/></div>
          <div className="absolute bottom-1 right-[-4px] w-3 h-1.5 bg-orange-500 rounded-full border border-black"/>
        </div>

        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            {/* Top Pipe */}
            <div 
              className="absolute bg-[#74bf2e] border-2 border-black"
              style={{
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: pipe.topHeight,
              }}
            >
              <div className="absolute bottom-0 left-[-4px] w-[54px] h-[24px] bg-[#74bf2e] border-2 border-black" />
            </div>
            
            {/* Bottom Pipe */}
            <div 
              className="absolute bg-[#74bf2e] border-2 border-black"
              style={{
                left: pipe.x,
                top: pipe.topHeight + GAP_SIZE,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - (pipe.topHeight + GAP_SIZE),
              }}
            >
              <div className="absolute top-0 left-[-4px] w-[54px] h-[24px] bg-[#74bf2e] border-2 border-black" />
            </div>
          </React.Fragment>
        ))}

        {/* Start / Game Over Screens */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-30">
            <p className="text-3xl text-white drop-shadow-[2px_2px_0px_#000] animate-pulse">
              CLICK OR SPACE TO FLY
            </p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-30">
            <h2 className="text-5xl text-white mb-6 drop-shadow-[3px_3px_0px_#000]">GAME OVER</h2>
            <div className="bg-[#ded895] border-4 border-black p-6 rounded text-center mb-8">
              <p className="text-xl text-[#b6663f] mb-1">SCORE</p>
              <p className="text-5xl text-white drop-shadow-[2px_2px_0px_#000] mb-4">{score}</p>
            </div>
            <div className="flex gap-4">
              <button 
                className="bg-[#e86101] text-white border-2 border-black px-6 py-2 text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
                onClick={(e) => { e.stopPropagation(); resetGame(); }}
              >
                RESTART
              </button>
              <button 
                className="bg-gray-400 text-white border-2 border-black px-6 py-2 text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
              >
                EXIT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
