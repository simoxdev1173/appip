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


type KpiItem = {
  title: string;
  value: number;
  icon: React.ReactNode;
  badge?: string;
};

const KPI_DATA: KpiItem[] = [
  { title: "دولة عربية", value: 21, icon: <IconMap2 className="h-6 w-6" /> },
  { title:"المنتجات", value: 5321, icon: <IconShoppingCart className="h-6 w-6" /> },
  { title: "المعادن الصناعية", value: 53, icon: <IconBuildingFactory className="h-6 w-6" /> },
  { title: "منشأة", value: 5574, icon: <IconBuildings className="h-6 w-6" />, badge: "المتوفر حاليا" },
  { title: "الفرص الاستثمارية", value: 162, icon: <IconBusinessplan className="h-6 w-6" />, badge: "المتاحة حاليا" },
];


type CountryItem = {
  name: string;
  slug: string;
  ext?: "webp" | "jpg" | "png";
};

const COUNTRIES: CountryItem[] = [
  { name: "المغرب", slug: "morocco" },
  { name: "مصر", slug: "egypt" },
  { name: "السعودية", slug: "saudi" },
  { name: "الإمارات", slug: "uae" },
  { name: "قطر", slug: "qatar" },
  { name: "فلسطين", slug: "palestine" },
];


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
      {/* {item.badge && (
        <span className="absolute left-0 top-0 z-10 bg-black/10 text-black/70 px-2 py-1 text-xs rounded-br">
          {item.badge}
        </span>
      )} */}

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
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
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

  useEffect(() => {
    if (!scrollerRef.current) return;
    const children = Array.from(scrollerRef.current.children);
    if (children.length && (children[0] as HTMLElement).dataset?.dup === "1") return;
    children.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.dataset.dup = "1";
      scrollerRef.current!.appendChild(clone);
    });
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
  const src = `/countries/${slug}.${order[Math.min(idx, order.length - 1)]}`;

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: [1, 1.06, 1], x: [0, -6, 0], y: [0, 4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="320px"
          onError={() => setIdx((i) => (i + 1 < order.length ? i + 1 : i))}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t " />

      <div className="absolute inset-0 flex items-end justify-end">
        <motion.span
          className="px-3 py-1 rounded-full text-white font-bold text-base md:text-lg "
          initial={{ x: 0, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {name}
        </motion.span>
      </div>
    </div>
  );
}
