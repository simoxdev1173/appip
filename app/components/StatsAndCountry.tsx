"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  IconMap2,
  IconBolt,
  IconBuildingFactory,
  IconMapPin,
  IconCurrencyDollar,
} from "@tabler/icons-react";

/* ================== Top KPI Grid ================== */

type KpiItem = {
  title: string;
  value: number;
  icon: React.ReactNode;
  badge?: string; // optional top-left label
};

const KPI_DATA: KpiItem[] = [
  { title: "دولة عربية", value: 21, icon: <IconMap2 className="h-6 w-6" /> },
  { title: "معادن الطاقة النظيفة", value: 38, icon: <IconBolt className="h-6 w-6" /> },
  { title: "المعادن الصناعية", value: 53, icon: <IconBuildingFactory className="h-6 w-6" /> },
  {
    title: "موقع / مكمن",
    value: 5574,
    icon: <IconMapPin className="h-6 w-6" />,
    badge: "المتوفر حاليا",
  },
  {
    title: "الفرص الاستثمارية",
    value: 162,
    icon: <IconCurrencyDollar className="h-6 w-6" />,
    badge: "المتاحة حاليا",
  },
];

/* ================== Countries Marquee ================== */

type CountryItem = {
  name: string;
  slug: string;                 // file name (no extension) inside /public/countries/
  ext?: "webp" | "jpg" | "png"; // optional preferred extension
};

const COUNTRIES: CountryItem[] = [
  { name: "المغرب", slug: "morocco" },
  { name: "مصر", slug: "egypt" },
  { name: "السعودية", slug: "saudi" },
  { name: "الإمارات", slug: "uae" },
  { name: "قطر", slug: "qatar" },
  { name: "فلسطين", slug: "palestine" }, // 
];

/* ================== Exported Section ================== */

export default function StatsAndCountries({
  className,
}: {
  className?: string;
}) {
  return (
    <section  className="w-full bg-foreground ">
      {/* ====== KPI GRID (10 cols) ====== */}
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl p-4">
        <h1 className="mb-6 text-4xl font-bold text-main text-center">
          إحصائيات المنصة
        </h1>
        <div className="mb-8 mt-4 grid grid-cols-10 gap-4">
          {KPI_DATA.map((item, idx) => (
            <KpiTile  key={idx} item={item} />
          ))}
        </div>
      </div>

      {/* ====== COUNTRIES MARQUEE ====== */}
      <h1  className="mb-6 text-4xl font-bold text-main text-center">
          دول عربية مشتركة
        </h1>
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <CountryMarquee countries={COUNTRIES} speed={40} />
      </div>
    </section>
  );
}

/* ================== Pieces ================== */

function KpiTile({ item }: { item: KpiItem }) {
  return (
    <motion.div
      data-aos="fade-up"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative col-span-10 md:col-span-5 lg:col-span-2"
    >
      {/* {item.badge && (
        <span className="absolute left-0 top-0 z-10 bg-black/10 text-black/70 px-2 py-1 text-xs rounded-br">
          {item.badge}
        </span>
      )} */}

      <div className="flex h-full flex-col items-center justify-center gap-6 rounded-xl border-2 border-black/10 bg-[#EFF6E0] p-8 text-black">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/80 ring-1 ring-black/10 text-main">
          {/* unified color — no rainbow */}
          {item.icon}
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* Latin digits */}
          <h4 className="text-3xl font-black text-main">
            {item.value.toLocaleString("en-US")}
          </h4>
          <p className="whitespace-nowrap text-[#124559] font-bold">{item.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Marquee ---- */
function CountryMarquee({
  countries,
  speed = 28, // seconds per loop
}: {
  countries: CountryItem[];
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  // Duplicate list once for infinite flow RTL → LTR (we translate left)
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

  // Hook up CSS vars for speed/direction
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--animation-duration", `${speed}s`);
    containerRef.current.style.setProperty("--animation-direction", "forwards"); // RTL: slide left
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
          className="flex min-w-full w-max shrink-0 gap-4 p-3 animate-scroll"
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

/* ---- Country Card with looping flag & centered moving name ---- */
function CountryCard({
  name,
  slug,
  ext,
}: {
  name: string;
  slug: string;
  ext?: "webp" | "jpg" | "png";
}) {
  // smart extension fallback: try ext -> jpg -> png (or webp -> jpg -> png)
  const order = useMemo(() => (ext ? [ext, "jpg", "png"] : ["webp", "jpg", "png"]), [ext]);
  const [idx, setIdx] = useState(0);
  const src = `/countries/${slug}.png`;

  return (
    <div className="relative h-full w-full">
      {/* Looping flag (Ken Burns subtle scale/translate) */}
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
          priority={false}
          onError={() => setIdx((i) => (i + 1 < order.length ? i + 1 : i))}
        />
      </motion.div>

      {/* Darken bottom/top a bit for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Centered name that moves slowly */}
      <div className="absolute inset-0 flex items-end justify-end">
        <motion.span
          className="px-3 py-1 rounded-full  text-white font-bold text-base md:text-lg"
          initial={{ x: 0 }}
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {name}
        </motion.span>
      </div>
    </div>
  );
}
