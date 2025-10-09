import React, { useCallback, useEffect, useMemo, useState } from "react";

const FacesCarousel = ({ videos }) => {
  const slides = useMemo(() => videos ?? [], [videos]);
  const [index, setIndex] = useState(0);

  const count = slides.length || 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <div className="relative w-full lg:w-[40%] overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((video, i) => (
          <div className="w-full shrink-0 flex items-center justify-center" key={i}>
            <iframe
              width="324"
              height="576"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

  {/* Navigation */}
{count > 1 && (
  <>
    <button
      type="button"
      aria-label="Previous"
      onClick={goPrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-none text-alpha text-8xl p-3 hover:scale-110 transition-transform"
    >
      ‹
    </button>
    <button
      type="button"
      aria-label="Next"
      onClick={goNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-none text-alpha text-8xl p-3 hover:scale-110 transition-transform"
    >
      ›
    </button>

   
  </>
)}

    </div>
  );
};

export default FacesCarousel;
