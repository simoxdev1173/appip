"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  IconMail,
  IconPhone,
  IconBrandFacebook,
  IconBrandX,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";

export const NavbarSecondary = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      role="navigation"
      className={cn(
        // ⬇️ Show only on large screens and up; not fixed, not sticky
        "hidden lg:block relative z-[60] mb-2",
        // palette + subtle blur/shadow to match main navbar
        "bg-[#AEC3B0]/95 supports-[backdrop-filter]:backdrop-blur border-b border-black/5",
        className
      )}
    >
      <div
        dir="rtl"
        className="mx-auto w-[calc(100%-2rem)] max-w-7xl py-2 text-sm text-black"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          {/* Right side (RTL): links + email + phone */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href="/sponsorship"
              className="font-semibold hover:text-[#124559] transition"
            >
              الرعاية والإعلان
            </a>

            <span className="hidden md:inline-block h-4 w-px bg-black/20" />

            <a
              href="mailto:ads@apip.online"
              className="inline-flex items-center gap-1 hover:text-[#124559] transition"
            >
              <IconMail size={16} />
              ads@apip.online
            </a>

            <span className="hidden md:inline-block h-4 w-px bg-black/20" />
             <a
              href="tel:0021253727450"
              className="inline-flex items-center gap-1 hover:text-[#124559] transition"
            >
              0021253727450
            </a>
            <a
              href="/contact"
              className="inline-flex items-center font-bold gap-1 hover:text-[#124559] transition"
            >
              <IconPhone size={16} />
              اتصل بنا
            </a>

           
          </div>

          {/* Left side (RTL): socials */}
          <div className="flex items-center gap-2 md:gap-3">
            <SocialIcon
              href="https://facebook.com/"
              label="Facebook"
              icon={<IconBrandFacebook size={18} />}
            />
            <SocialIcon
              href="https://x.com/"
              label="X"
              icon={<IconBrandX size={18} />}
            />
            <SocialIcon
              href="https://www.linkedin.com/"
              label="LinkedIn"
              icon={<IconBrandLinkedin size={18} />}
            />
            <SocialIcon
              href="https://www.instagram.com/"
              label="Instagram"
              icon={<IconBrandInstagram size={18} />}
            />
            <SocialIcon
              href="https://www.youtube.com/"
              label="YouTube"
              icon={<IconBrandYoutube size={18} />}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialIcon = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-8 w-8 place-items-center rounded-full bg-white/80 text-black ring-1 ring-black/10 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
  >
    {icon}
  </a>
);
