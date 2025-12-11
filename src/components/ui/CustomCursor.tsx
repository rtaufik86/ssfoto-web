'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function CustomCursor() {
  // Primary cursor position (instant)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Secondary cursor position (with lag)
  const [lagPosition, setLagPosition] = useState({ x: 0, y: 0 });
  
  // Hover state
  const [isHovering, setIsHovering] = useState(false);
  
  // Refs for animation
  const rafId = useRef<number>();
  const currentLagPosition = useRef({ x: 0, y: 0 });
  
  // Lag factor for smooth following effect (lower = more lag)
  const lagFactor = 0.2;

  // Update primary cursor position (instant)
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Detect hovering over interactive elements
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if hovering over interactive elements
    const isInteractive = 
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('.cursor-link');
    
    setIsHovering(!!isInteractive);
  }, []);

  // Animate secondary cursor with lag effect using lerp
  useEffect(() => {
    const animateLagCursor = () => {
      // Linear interpolation for smooth lag effect
      currentLagPosition.current.x += 
        (mousePosition.x - currentLagPosition.current.x) * lagFactor;
      currentLagPosition.current.y += 
        (mousePosition.y - currentLagPosition.current.y) * lagFactor;
      
      setLagPosition({
        x: currentLagPosition.current.x,
        y: currentLagPosition.current.y,
      });

      // Continue animation loop
      rafId.current = requestAnimationFrame(animateLagCursor);
    };

    // Start animation
    rafId.current = requestAnimationFrame(animateLagCursor);

    // Cleanup
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mousePosition, lagFactor]);

  // Setup event listeners
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [updateMousePosition, handleMouseOver]);

  return (
    <>
      {/* Primary Cursor - Fast-moving dot */}
      <div
        className="w-2 h-2 bg-red-600 rounded-full fixed pointer-events-none z-[9999] transition-transform duration-100 ease-linear"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary Cursor - Smooth-moving ring with lag effect */}
      <div
        className={`
          w-8 h-8 rounded-full fixed pointer-events-none z-[9998]
          transition-all duration-300 ease-out
          ${
            isHovering
              ? 'scale-[2.0] bg-red-600/30 border-none'
              : 'scale-100 border-2 border-red-600 bg-transparent'
          }
        `}
        style={{
          left: `${lagPosition.x}px`,
          top: `${lagPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
