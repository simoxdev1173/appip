"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  IconMap2,
  IconShoppingCart,
  IconBuildingFactory,
  IconBuildings,
  IconBusinessplan,
} from "@tabler/icons-react";

// -------------------- Types --------------------
type KpiItem = {
  title: string;
  value: number;
  icon: React.ReactNode;
  badge?: string;
};

type CountryItem = {
  name: string;
  slug: string;
  ext?: "webp" | "jpg" | "png";
};

// -------------------- Data --------------------
const KPI_DATA: KpiItem[] = [
  { title: "دولة عربية", value: 21, icon: <IconMap2 className="h-6 w-6" /> },
  { title: "المنتجات", value: 5321, icon: <IconShoppingCart className="h-6 w-6" /> },
  { title: "المعادن الصناعية", value: 53, icon: <IconBuildingFactory className="h-6 w-6" /> },
  { title: "منشأة", value: 5574, icon: <IconBuildings className="h-6 w-6" />, badge: "المتوفر حاليا" },
  { title: "الفرص الاستثمارية", value: 162, icon: <IconBusinessplan className="h-6 w-6" />, badge: "المتاحة حاليا" },
];

const COUNTRIES: CountryItem[] = [
  { name: "المغرب", slug: "morocco" },
  { name: "مصر", slug: "egypt" },
  { name: "السعودية", slug: "saudi" },
  { name: "الإمارات", slug: "uae" },
  { name: "قطر", slug: "qatar" },
  { name: "فلسطين", slug: "palestine" },
];

// -------------------- Component --------------------
export default function StatsAndCountries({ className }: { className?: string }) {
  return (
    <section className={`w-full bg-foreground pt-8 ${className ?? ""}`}>
      {/* Title 1 */}
      <motion.h1
        className="mx-auto max-w-7xl px-4 mb-6 text-4xl font-bold text-main text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        إحصائيات المنصة
      </motion.h1>

      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl p-4">
        <motion.div
          className="mb-8 mt-4 grid grid-cols-10 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
        >
          {KPI_DATA.map((item, idx) => (
            <KpiTile key={idx} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Title 2 */}
      <motion.h1
        className="mx-auto max-w-7xl px-4 mb-6 text-4xl font-bold text-main text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        دول عربية مشتركة
      </motion.h1>

      {/* ====== COUNTRIES MARQUEE ====== */}
      <motion.div
        className="mx-auto w-[calc(100%-2rem)] max-w-7xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6 }}
      >
        <CountryMarquee countries={COUNTRIES} speed={40} />
      </motion.div>
    </section>
  );
}

function KpiTile({ item }: { item: KpiItem }) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={tileRef}
      variants={{
        hidden: { opacity: 0, y: 16, rotateX: 4 },
        show: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { type: "spring", stiffness: 200, damping: 24 },
        },
      }}
      className="relative col-span-10 md:col-span-5 lg:col-span-2"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border-2 border-black/10 bg-[#EFF6E0] p-8 text-black"
      >
        <motion.div
          className="grid h-12 w-12 place-items-center rounded-xl bg-white/80 ring-1 ring-black/10 text-main"
          initial={{ scale: 0.9, rotate: -3, opacity: 0 }}
          animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {item.icon}
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <h4 className="text-3xl font-black text-main">
            <CountUp to={item.value} start={inView} />
          </h4>
          <p className="whitespace-nowrap text-[#124559] font-bold">{item.title}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CountUp({
  to,
  start,
  duration = 1.2,
}: {
  to: number;
  start: boolean;
  duration?: number; // seconds
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    let raf = 0;
    let startTime: number | null = null;
    const total = Math.max(duration, 0.2) * 1000;

    const step = (t: number) => {
      if (startTime == null) startTime = t;
      const p = Math.min((t - startTime) / total, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return <>{val.toLocaleString("en-US")}</>;
}

/* ---- Marquee ---- */
function CountryMarquee({
  countries,
  speed = 28,
}: {
  countries: CountryItem[];
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const dupedRef = useRef(false);

  // ✅ Prevent runaway duplication that created many blanks
  useEffect(() => {
    if (!scrollerRef.current || dupedRef.current) return;
    const children = Array.from(scrollerRef.current.children);
    if (!children.length) return;
    const frag = document.createDocumentFragment();
    children.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.dataset.dup = "1";
      frag.appendChild(clone);
    });
    scrollerRef.current.appendChild(frag);
    dupedRef.current = true;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--animation-duration", `${speed}s`);
    containerRef.current.style.setProperty("--animation-direction", "forwards");
  }, [speed]);

  return (
    <div className="mt-1">
      <div
        ref={containerRef}
        className="scroller relative w-full overflow-hidden rounded-2xl bg-foreground/60 ring-1 ring-black/10
                   [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <ul
          ref={scrollerRef}
          className="flex min-w-full w-max shrink-0 gap-4 p-3 animate-scroll hover:[animation-play-state:paused]"
        >
          {countries.map((c, idx) => (
            <li
              key={`${c.slug}-${idx}`}
              className="relative flex h-32 w-[260px] md:h-36 md:w-[320px] flex-shrink-0 overflow-hidden rounded-xl ring-1 ring-black/10 bg-black/5"
            >
              <CountryCard name={c.name} slug={c.slug} ext={c.ext} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CountryCard({
  name,
  slug,
  ext,
}: {
  name: string;
  slug: string;
  ext?: "webp" | "jpg" | "png";
}) {
  const order = useMemo(() => (ext ? [ext, "jpg", "png"] : ["webp", "jpg", "png"]), [ext]);
  const [idx, setIdx] = useState(0);
  const [hasImage, setHasImage] = useState(true);
  const src = `/countries/${slug}.${order[Math.min(idx, order.length - 1)]}`;

  const handleError = () => {
    setIdx((i) => {
      const next = i + 1;
      if (next < order.length) return next;
      // No working image extension – fallback to placeholder
      setHasImage(false);
      return i;
    });
  };

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: [1, 1.06, 1], x: [0, -6, 0], y: [0, 4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        {hasImage ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="320px"
            onError={handleError}
            priority={false}
          />
        ) : (
          // Graceful fallback so you don't get empty/blank tiles
          <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-500" />
        )}
      </motion.div>

      {/* Overlay to darken for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

      {/* Country name — crisp, white, bold, fixed position (bottom-end) */}
      <div className="absolute inset-0 flex items-end justify-end p-3">
        <span
          className="px-3 py-1 rounded-md text-white font-extrabold text-base md:text-lg drop-shadow-md select-none bg-black/30 backdrop-blur-[1px]"
        >
          {name}
        </span>
      </div>
    </div>
  );
}

// -------------------- Tailwind helpers --------------------
// Add the following to your globals if not present:
// .animate-scroll { animation: scroll var(--animation-duration, 28s) linear infinite; }
// @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
