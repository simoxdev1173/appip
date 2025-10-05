"use client";

import React from "react";

import {  testimonials } from "./data/index";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { Highlight } from "./ui/hero-highlight";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-main">
        شهادات عن المنصة<br />
        <Highlight>
            <span className="text-white">
              من بين أكثر من العملاء الراضين
            </span>
        </Highlight>
       
      </h1>

      <div className="flex flex-col items-end max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased text-right justify-center items-end relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>


      </div>
    </section>
  );
};

export default Clients;