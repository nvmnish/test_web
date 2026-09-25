import React, { useEffect, useState, useRef } from 'react';

interface CasinoSpinDigitProps {
  digit: number;
  durationMs: number;
  delayMs?: number;
  className?: string;
}

const SINGLE_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Create an extended reel with multiple rounds for slot-machine spin effect
const createReel = (finalDigit: number, cycles = 3) => {
  const reel: number[] = [];
  for (let c = 0; c < cycles; c++) {
    reel.push(...SINGLE_DIGITS);
  }
  reel.push(finalDigit);
  return reel;
};

export const CasinoSpinNumber: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  containerClassName?: string;
}> = ({ value, suffix = '', className = '', suffixClassName = '', containerClassName = '' }) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const digits = value.toString().split('').map((d) => parseInt(d, 10));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={containerClassName || "inline-flex items-baseline font-serif italic tracking-tight select-none overflow-hidden"}
    >
      <div className="inline-flex items-center overflow-hidden h-[1.18em]">
        {digits.map((digit, idx) => (
          <CasinoDigitColumn
            key={idx}
            targetDigit={digit}
            animate={inView}
            duration={2200 + idx * 300}
            delay={idx * 150}
            className={className}
          />
        ))}
      </div>
      {suffix && (
        <span className={`inline-block ml-0.5 ${suffixClassName}`}>
          {suffix}
        </span>
      )}
    </div>
  );
};

const CasinoDigitColumn: React.FC<{
  targetDigit: number;
  animate: boolean;
  duration: number;
  delay: number;
  className: string;
}> = ({ targetDigit, animate, duration, delay, className }) => {
  const reel = useRef(createReel(targetDigit, 4)).current;
  const targetIndex = reel.length - 1;
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let animationFrameId: number;
    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const run = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Quintic / cubic ease-out like a real casino wheel clicking into place
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentIdx = ease * targetIndex;
        setOffsetY(currentIdx);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(run);
        } else {
          setOffsetY(targetIndex);
        }
      };

      animationFrameId = requestAnimationFrame(run);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animate, delay, duration, targetIndex]);

  return (
    <div className="relative inline-block overflow-hidden h-full leading-none">
      <div
        className="will-change-transform flex flex-col items-center"
        style={{
          transform: `translateY(-${(offsetY / reel.length) * 100}%)`,
        }}
      >
        {reel.map((num, i) => (
          <div
            key={i}
            className={`h-[1.18em] flex items-center justify-center leading-none ${className}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
