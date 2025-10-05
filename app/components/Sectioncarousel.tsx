"use client";
import Carousel from "./ui/carousel";
export function Sectioncarousel() {
  const slideData = [
    {
      title: "تعدين واستغلال المحاجر",
      button: "استكشف الطلبات والعروض",
      src: "/gold.webp",
    },
    {
      title: "تعدين الفحم والليغنيت",
      button: "استكشف الطلبات والعروض",
      src: "/track.webp",
    },
    {
      title: "المنتجات الغدائية",
      button: "استكشف الطلبات والعروض",
      src: "/groceries.webp",
    },

    {
      title: "المشروبات",
      button: "استكشف الطلبات والعروض",
      src: "/drinks.webp",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
