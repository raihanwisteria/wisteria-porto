import React, { useState, useEffect, useCallback } from 'react';
import FlappyBird from './ui/FlappyBird';

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(null);

  // Flappy Bird states
  const [showGame, setShowGame] = useState(false);
  const [cardClickCount, setCardClickCount] = useState(0);
  const [cardTimer, setCardTimer] = useState(null);

  const handleClick = useCallback((e) => {
    // Only trigger initial easter egg from footer
    const footer = e.target.closest('footer');
    if (!footer) return;

    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShow(true);
        return 0;
      }
      return next;
    });

    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => setClickCount(0), 500);
    setTimer(newTimer);
  }, [timer]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Auto-hide the initial easter egg message ONLY if game is not shown
  useEffect(() => {
    if (show && !showGame) {
      const t = setTimeout(() => setShow(false), 8000); // give them more time to read
      return () => clearTimeout(t);
    }
  }, [show, showGame]);

  const handleCardClick = (e) => {
    e.stopPropagation(); // prevent backdrop click

    setCardClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShowGame(true);
        return 0;
      }
      return next;
    });

    if (cardTimer) clearTimeout(cardTimer);
    const newTimer = setTimeout(() => setCardClickCount(0), 500);
    setCardTimer(newTimer);
  };

  const closeGame = () => {
    setShowGame(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-6 pointer-events-none">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in pointer-events-auto"
          onClick={() => {
            if (!showGame) setShow(false);
          }} 
        />

        {/* Solid Inverted Card */}
        <div 
          className="relative animate-easter pointer-events-auto rounded-sm border-4 border-bg px-8 py-6 max-w-md text-center shadow-[8px_8px_0px_rgba(0,0,0,0.5)] bg-text-primary cursor-pointer hover:scale-105 transition-transform"
          onClick={handleCardClick}
        >
          <p className="font-pixel text-2xl text-bg leading-relaxed uppercase tracking-wide mb-6">
            "All of this is fake — this is just a website I made for fun from vibe coding."
          </p>

          <p className="font-pixel text-sm text-bg/60 animate-pulse uppercase tracking-widest border-t-2 border-bg/20 pt-4">
            [ Click this card 3x to play Flappy Bird ]
          </p>
        </div>
      </div>

      {showGame && <FlappyBird onClose={closeGame} />}
    </>
  );
}
