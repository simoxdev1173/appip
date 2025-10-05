"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;      // index in the *extended* array
  current: number;    // current index in the *extended* array
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;
  const isActive = current === index;

  return (
    <div className="[perspective:1500px] [transform-style:preserve-3d]">
      <motion.li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformOrigin: "bottom" }}
        animate={{
          scale: isActive ? 1 : 0.98,
          rotateX: isActive ? 0 : 8,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform: isActive
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{ opacity: isActive ? 1 : 0.5 }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {isActive && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-700 ease-in-out ${
            isActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-center">
            <motion.button
              whileHover={{
                y: -2,
                scale: 1.04,
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset",
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              className="mt-6 px-5 py-2.5 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-white"
            >
              {button}
            </motion.button>
          </div>
        </article>
      </motion.li>
    </div>
  );
};

interface CarouselControlProps {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={`w-11 h-11 flex items-center mx-2 justify-center bg-neutral-200/80 dark:bg-neutral-800/80 rounded-full ring-1 ring-white/10 backdrop-blur-sm
      ${type === "previous" ? "rotate-180" : ""}`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-700 dark:text-neutral-200" />
    </motion.button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  // Build an extended list with a clone at the head and tail to eliminate "blank edges"
  const extendedSlides = useMemo<SlideData[]>(
    () =>
      slides.length > 1
        ? [slides[slides.length - 1], ...slides, slides[0]]
        : [...slides],
    [slides]
  );

  // current is the index within extendedSlides
  const [current, setCurrent] = useState(slides.length > 1 ? 1 : 0);

  // Measures a single slide (including horizontal margins) so we can animate the track in pixels
  const trackRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLLIElement | null>(null);
  const [slideSize, setSlideSize] = useState<number>(0);

  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const rect = measureRef.current.getBoundingClientRect();
      const style = window.getComputedStyle(measureRef.current);
      const ml = parseFloat(style.marginLeft || "0");
      const mr = parseFloat(style.marginRight || "0");
      setSlideSize(rect.width + ml + mr);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [extendedSlides.length]);

  // Autoplay (respects reduced motion + tab visibility)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_PLAY_MS = 3500;

  const startAutoplay = () => {
    if (intervalRef.current || extendedSlides.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, AUTO_PLAY_MS);
  };

  const stopAutoplay = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startAutoplay();
    }
    const onVisibility = () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedSlides.length]);

  // Seamless looping: when we slide to the end clone, snap back to the real first (index 1)
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    if (extendedSlides.length <= 1) return;
    if (current === extendedSlides.length - 1) {
      // after anim completes, jump to index 1
      const t = setTimeout(() => {
        setInstant(true);
        setCurrent(1);
      }, 320); // should be less than the transition duration so users don't notice
      return () => clearTimeout(t);
    }
    if (current === 0) {
      const t = setTimeout(() => {
        setInstant(true);
        setCurrent(extendedSlides.length - 2);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [current, extendedSlides.length]);

  useEffect(() => {
    if (!instant) return;
    // turn off animation just for this "teleport" frame
    const t = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(t);
  }, [instant]);

  const handlePreviousClick = () => {
    setCurrent((prev) => prev - 1);
    stopAutoplay();
    startAutoplay();
  };

  const handleNextClick = () => {
    setCurrent((prev) => prev + 1);
    stopAutoplay();
    startAutoplay();
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
      stopAutoplay();
      startAutoplay();
    }
  };

  const id = useId();

  // Compute the x offset (in px) to center the current slide
  const x = -(current * slideSize);

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto overflow-visible"
      aria-labelledby={`carousel-heading-${id}`}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onTouchStart={stopAutoplay}
      onTouchEnd={startAutoplay}
    >
      {/* Invisible single slide to measure size (first real slide in extended set) */}
      <ul className="absolute opacity-0 pointer-events-none">
        <li
          ref={(el) => {
            if (el) measureRef.current = el;
          }}
          className="w-[70vmin] h-[70vmin] mx-[4vmin]"
        />
      </ul>

      <motion.ul
        ref={trackRef}
        className="absolute flex mx-[-4vmin] items-center"
        animate={{ x }}
        transition={
          instant
            ? { duration: 0 } // instant snap for seamless loop
            : { type: "spring", stiffness: 120, damping: 22 }
        }
        style={{ willChange: "transform" }}
      >
        {extendedSlides.map((slide, index) => (
          <Slide
            key={`${slide.src}-${index}`}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </motion.ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
