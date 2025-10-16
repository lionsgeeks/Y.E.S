import React, { useEffect, useMemo, useRef, useState } from "react";

const clampIndex = (index, length) => {
  if (length === 0) return 0;
  const mod = index % length;
  return mod >= 0 ? mod : mod + length;
};

const AutoCarousel = ({
  slides,
  intervalMs = 4000,
  className = "",
  showArrows = true,
  showDots = true,
  transitionMs = 600,
}) => {
  const validSlides = useMemo(() => Array.isArray(slides) ? slides.filter(Boolean) : [], [slides]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = (i) => setIndex((prev) => clampIndex(typeof i === "number" ? i : prev + i, validSlides.length));

  useEffect(() => {
    if (validSlides.length <= 1) return;
    timerRef.current = setInterval(() => goTo(index + 1), intervalMs);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [index, intervalMs, validSlides.length]);

  const onMouseEnter = () => timerRef.current && clearInterval(timerRef.current);
  const onMouseLeave = () => {
    if (validSlides.length <= 1) return;
    timerRef.current = setInterval(() => goTo(index + 1), intervalMs);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const deltaX = (e.changedTouches?.[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      goTo(deltaX > 0 ? index - 1 : index + 1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="whitespace-nowrap h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: `transform ${transitionMs}ms ease`
        }}
      >
        {validSlides.map((slide, i) => (
          <div key={i} className="inline-block align-top w-full h-full">
            {typeof slide === "function" ? slide() : slide}
          </div>
        ))}
      </div>

      {showArrows && validSlides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full grid place-items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M15.78 4.72a.75.75 0 0 1 0 1.06L9.56 12l6.22 6.22a.75.75 0 1 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full grid place-items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.22 19.28a.75.75 0 0 1 0-1.06L14.44 12 8.22 5.78a.75.75 0 1 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}

      {/* {showDots && validSlides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {validSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AutoCarousel;
