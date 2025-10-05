"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconSearch,
  IconBuildingStore,
  IconBriefcase,
  IconCategory2,
  IconChartBar,
} from "@tabler/icons-react";
import { motion } from "motion/react";

export function SectionFeatures() {
  return (
    <section dir="rtl" className="w-full">
      {/* Full width, not centered */}
      <BentoGrid className="w-full max-w-none !mx-0 md:auto-rows-[22rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={
              <span className="text-main font-bold text-lg lg:text-xl">
                {item.title}
              </span>
            }
            description={
              <div className="flex flex-col gap-3 text-right">
                <span className="text-sm text-main/80">{item.description}</span>
                {/* CTA buttons */}
                <div className="mt-1 flex flex-wrap items-center justify-end gap-2">
                  {item.ctas?.map((cta, idx) => (
                    <motion.a
                      key={idx}
                      href={cta.href}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      className={cn(
                        "inline-flex items-center rounded-full px-4 py-2 text-xs md:text-sm transition",
                        cta.variant === "solid"
                          ? "bg-[#124559] text-white hover:bg-blue-700"
                          : "border border-[#124559] text-[#124559] hover:bg-[#124559] hover:text-white"
                      )}
                    >
                      {cta.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            }
            header={item.header}
            className={cn("h-full [&>p:text-lg] text-right", item.className)}
            icon={<item.icon className="h-4 w-4 text-neutral-500" />}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

/* ========================= Animated Headers (Skeletons) ========================= */

const SearchSkeleton = () => {
  // shimmering input lines + chips
  const line = {
    initial: { width: "0%" },
    animate: { width: "100%", transition: { duration: 0.6 } },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 1.8, repeat: Infinity, repeatType: "reverse" as const },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex h-full w-full min-h-[6rem] flex-col justify-between rounded-2xl p-4 dark:bg-dot-white/[0.2] bg-dot-black/[0.15]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />
          <motion.div variants={line} className="h-3 w-full rounded-full bg-neutral-200 dark:bg-neutral-900" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          <motion.div variants={line} className="h-3 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-900" />
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {["نوع البحث", "التصنيف", "القطاع", "الدولة"].map((chip, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -2 }}
            className="rounded-full border border-[#124559]/30 bg-white/70 dark:bg-black/50 px-3 py-1 text-xs text-main"
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const RequestsOffersSkeleton = () => {
  // alternating chat bubbles (طلبات / عروض)
  const right = {
    initial: { x: 0 },
    animate: { x: -6, rotate: -2, transition: { duration: 0.25 } },
  };
  const left = {
    initial: { x: 0 },
    animate: { x: 6, rotate: 2, transition: { duration: 0.25 } },
  };
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full w-full min-h-[6rem] flex-col gap-3 rounded-2xl p-4 dark:bg-dot-white/[0.2] bg-dot-black/[0.15]"
    >
      <motion.div
        variants={right}
        className="flex items-start gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-3"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        <div className="flex-1">
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            تجهيز كونكريت جاهز خرسانة — 5000 م³ •{" "}
            <span className="text-emerald-600">طلب</span>
          </p>
          <div className="mt-1 h-2 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-900" />
        </div>
      </motion.div>

      <motion.div
        variants={left}
        className="ml-auto flex items-start gap-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-3 w-4/5"
      >
        <div className="flex-1">
          <p className="text-xs text-neutral-600 dark:text-neutral-300 text-right">
            SEA Group •{" "}
            <span className="text-sky-600">عرض</span>
          </p>
          <div className="mt-1 h-2 w-2/3 rounded-full bg-neutral-200 dark:bg-neutral-900 ml-auto" />
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
      </motion.div>

      <motion.div
        variants={right}
        className="flex items-start gap-2 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-3"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-rose-500 to-orange-500" />
        <div className="flex-1">
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            محللات CNS/SIMDIS للنفط الخام •{" "}
            <span className="text-emerald-600">طلب</span>
          </p>
          <div className="mt-1 h-2 w-1/2 rounded-full bg-neutral-200 dark:bg-neutral-900" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const StoreSkeleton = () => {
  // 3 steps with gentle float
  const float = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [-2, 2, -2],
      transition: { duration: 2 + i * 0.3, repeat: Infinity },
    }),
  };
  const steps = [
    { n: 1, t: "التسجيل على المنصة" },
    { n: 2, t: "ملء استمارة فتح المتجر مجانًا" },
    { n: 3, t: "إدراج المنتجات بعد الموافقة" },
  ];
  return (
    <div className="grid h-full w-full grid-cols-3 gap-3 rounded-2xl p-4 dark:bg-dot-white/[0.2] bg-dot-black/[0.15]">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          custom={i}
          variants={float}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-4"
        >
          <span className="text-xs text-neutral-500">الخطوة</span>
          <span className="text-3xl font-bold text-main">{s.n}</span>
          <div className="mt-2 h-2 w-10/12 rounded-full bg-neutral-200 dark:bg-neutral-900" />
          <span className="mt-2 text-[11px] text-neutral-600 dark:text-neutral-300 text-center">
            {s.t}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const OpportunitiesSkeleton = () => {
  // animated gradient background
  return (
    <motion.div
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      className="h-full w-full rounded-2xl p-4"
      style={{
        background:
          "linear-gradient(-45deg, #124559, #0ea5e9, #22c55e, #a855f7)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="grid h-full grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-white/80 dark:bg-black/50 p-3 backdrop-blur-sm border border-white/30 dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-main/80">فرصة {i}</span>
              <span className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 text-[10px]">
                متاحة
              </span>
            </div>
            <div className="mt-2 h-2 w-3/4 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-1 h-2 w-2/3 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SectorsSkeleton = () => {
  // three mini cards with counts
  const pop = {
    initial: { scale: 0.98, opacity: 0.9 },
    whileInView: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
  };
  const data = [
    { t: "القطاعات الصناعية", c: "26" },
    { t: "القطاعات التعدينية", c: "12" },
    { t: "المنصة في أرقام", c: "21 دولة عربية" },
  ];
  return (
    <div className="grid h-full w-full grid-cols-3 gap-3 rounded-2xl p-4 dark:bg-dot-white/[0.2] bg-dot-black/[0.15]">
      {data.map((d, i) => (
        <motion.div
          key={i}
          variants={pop}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-black p-4 text-center"
        >
          <span className="text-xs text-neutral-500">{d.t}</span>
          <span className="mt-1 text-lg font-bold text-main">{d.c}</span>
          <div className="mt-2 h-2 w-9/12 rounded-full bg-neutral-200 dark:bg-neutral-900" />
        </motion.div>
      ))}
    </div>
  );
};

/* ========================= Items ========================= */

const items: {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  icon: typeof IconSearch;
  ctas?: { label: string; href: string; variant?: "solid" | "outline" }[];
}[] = [
  {
    title: "البحث الذكي",
    description:
      "ابحث عبر الطلبات والعروض والمنتجات والفرص الاستثمارية مع فلاتر: نوع البحث، التصنيف، القطاع، الدولة.",
    header: <SearchSkeleton />,
    className: "md:col-span-1",
    icon: IconSearch,
    ctas: [
      { label: "ابحث الآن", href: "/search", variant: "solid" },
      { label: "تصفية متقدمة", href: "/search?advanced=1", variant: "outline" },
    ],
  },
  {
    title: "إدارة الطلبات والعروض",
    description:
      "اطّلع على أحدث الطلبات والعروض من الدول العربية، وأضِف طلبًا أو عرضًا بسهولة.",
    header: <RequestsOffersSkeleton />,
    className: "md:col-span-1",
    icon: IconBriefcase,
    ctas: [
      { label: "أضف طلبًا", href: "/requests/new", variant: "outline" },
      { label: "أضف عرضًا", href: "/offers/new", variant: "solid" },
    ],
  },
  {
    title: "متجر إلكتروني مجاني",
    description:
      "افتح متجرك الصناعي مجانًا بثلاث خطوات: التسجيل، تعبئة الاستمارة، ثم إدراج المنتجات بعد الموافقة.",
    header: <StoreSkeleton />,
    className: "md:col-span-1",
    icon: IconBuildingStore,
    ctas: [
      { label: "افتح متجرك", href: "/store/new", variant: "solid" },
      { label: "تعرف على الشروط", href: "/store/requirements", variant: "outline" },
    ],
  },
  {
    title: "فرص استثمارية",
    description:
      "استكشف فرصًا صناعية حقيقية في عدة دول عربية مع تفاصيل التصنيف والقطاع والموقع.",
    header: <OpportunitiesSkeleton />,
    className: "md:col-span-2",
    icon: IconChartBar,
    ctas: [
      { label: "استكشاف الفرص", href: "/investments", variant: "solid" },
      { label: "تقديم فرصة", href: "/investments/new", variant: "outline" },
    ],
  },
  {
    title: "القطاعات الصناعية والتعدينية",
    description:
      "تصفّح القطاعات الصناعية والتعدينية، وشاهد الأرقام والأنشطة المرتبطة بكل قطاع.",
    header: <SectorsSkeleton />,
    className: "md:col-span-1",
    icon: IconCategory2,
    ctas: [
      { label: "جميع القطاعات", href: "/sectors", variant: "solid" },
      { label: "المنصة في أرقام", href: "/stats", variant: "outline" },
    ],
  },
];
