import Image from "next/image";
import { NavbarH } from "./components/Navbar";
import { Highlight } from "./components/ui/hero-highlight";
import { Sectioncarousel } from "./components/Sectioncarousel";
import Clients from "./components/Clients";
import { FeatureSection } from "./FeatureSection";
import { SectionFeatures } from "./components/SectionFeatures";
import { NavbarSecondary } from "./components/SecondaryNavbar";

export default function Home() {
  return (
    <main className="bg-background min-h-dvh">
      {/* Navbar at the very top */}
      <header>
        <NavbarSecondary className="w-full"/>
        <NavbarH />
      </header>

      {/* Centered page container with nice horizontal padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-4 items-center min-h-[60vh]">
          {/* Right column (hero) should appear FIRST on mobile */}
          <div className="order-1 md:order-2 md:col-span-2 rounded-lg p-4">
            <div className="container mx-auto p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <h1 className="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold text-main leading-tight">
                المنصة الصناعية العربية:{" "}
                <Highlight>
                  <span className="text-white">
                    نافذتك للتكامل الصناعي والتجاري
                  </span>
                </Highlight>
              </h1>

              <p className="mb-8 md:mb-12 text-base md:text-xl font-bold text-main leading-relaxed">
                منصة رسمية تجمع بين العروض والطلبات الصناعية في الدول العربية،
                لتعزيز التعاون، تبادل الفرص، ودعم سلاسل الإمداد والتوريد العربية.
              </p>

              <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden w-full max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="البحث عن طلبات أو عروض"
                  className="w-full outline-none text-main bg-white pl-10 text-base md:text-lg py-2"
                />
                <button
                  type="button"
                  className="bg-[#124559] hover:bg-blue-700 transition-all text-white text-sm md:text-base rounded-full px-8 md:px-10 py-2.5 md:py-3"
                >
                  لبحث
                </button>
              </div>
            </div>
          </div>

          {/* Left column: carousel (shows SECOND on mobile) */}
          <div className="order-2 md:order-1 md:col-span-2 rounded-lg p-4">
            <Sectioncarousel />
          </div>
        </section>
      </div>
       <section className="mt-4 w-full bg-foreground">
        <SectionFeatures />
      </section>
      {/* <section className="mt-4 w-full ">
        <Clients />
      </section> */}

     
    </main>
  );
}
