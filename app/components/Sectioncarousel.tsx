"use client";

import Carousel from "./ui/carousel";
export function Sectioncarousel() {
  const slideData = [
    {
      title: "تعدين واستغلال المحاجر",
      button: "استكشف الطلبات والعروض",
      src: "./gold.webp",
    },
    {
      title: "تعدين الفحم والليغنيت",
      button: "استكشف الطلبات والعروض",
      src: "./track.webp",
    },
    {
      title: "تعدين واستغلال المحاجر",
      button: "استكشف الطلبات والعروض",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "همسات الصحراء",
      button: "استكشف الطلبات والعروض",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
