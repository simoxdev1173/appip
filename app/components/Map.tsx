"use client";
import { WorldMap } from "./ui/world-map";
import { motion } from "motion/react";

export function Map() {
  return (
    <div className=" py-40 dark:bg-black bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Remote{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <WorldMap
  dots={[
    {
      start: { lat: 24.7136, lng: 46.6753 }, // Riyadh, Saudi Arabia
      end: { lat: 30.0444, lng: 31.2357 },  // Cairo, Egypt
    },
    {
      start: { lat: 30.0444, lng: 31.2357 }, // Cairo
      end: { lat: 33.8938, lng: 35.5018 },  // Beirut, Lebanon
    },
    {
      start: { lat: 33.3152, lng: 44.3661 }, // Baghdad, Iraq
      end: { lat: 31.9539, lng: 35.9106 },  // Amman, Jordan
    },
    {
      start: { lat: 25.276987, lng: 55.296249 }, // Dubai, UAE
      end: { lat: 24.7136, lng: 46.6753 },     // Riyadh
    },
    {
      start: { lat: 34.0209, lng: -6.8416 }, // Rabat, Morocco
      end: { lat: 36.8065, lng: 10.1815 },  // Tunis, Tunisia
    },
  ]}
/>
    </div>
  );
}
