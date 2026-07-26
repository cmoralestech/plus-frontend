"use client";

import { useRef, useState } from "react";

interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function SwipeCard({ children, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swiped, setSwiped] = useState(false);

  const threshold = 100;

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setOffsetX(clientX - startX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (offsetX > threshold) {
      // Swiped right — like
      setSwiped(true);
      setOffsetX(400);
      setTimeout(() => {
        onSwipeRight();
        setSwiped(false);
        setOffsetX(0);
      }, 200);
    } else if (offsetX < -threshold) {
      // Swiped left — pass
      setSwiped(true);
      setOffsetX(-400);
      setTimeout(() => {
        onSwipeLeft();
        setSwiped(false);
        setOffsetX(0);
      }, 200);
    } else {
      setOffsetX(0);
    }
  };

  const rotation = offsetX * 0.05;
  const opacity = Math.max(0, 1 - Math.abs(offsetX) / 400);

  return (
    <div className="relative">
      {/* Swipe indicators */}
      {offsetX > 30 && (
        <div className="absolute top-8 left-8 z-10 px-4 py-2 border-2 border-success text-success text-lg font-bold rounded-lg -rotate-12" style={{ opacity: Math.min(1, offsetX / threshold) }}>
          LIKE
        </div>
      )}
      {offsetX < -30 && (
        <div className="absolute top-8 right-8 z-10 px-4 py-2 border-2 border-danger text-danger text-lg font-bold rounded-lg rotate-12" style={{ opacity: Math.min(1, Math.abs(offsetX) / threshold) }}>
          PASS
        </div>
      )}

      <div
        ref={cardRef}
        style={{
          transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
          opacity: swiped ? opacity : 1,
          transition: isDragging ? "none" : "transform 0.2s ease-out, opacity 0.2s ease-out",
          touchAction: "pan-y",
        }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => { if (isDragging) handleMove(e.clientX); }}
        onMouseUp={handleEnd}
        onMouseLeave={() => { if (isDragging) handleEnd(); }}
      >
        {children}
      </div>
    </div>
  );
}
