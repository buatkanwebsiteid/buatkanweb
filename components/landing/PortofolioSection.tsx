"use client";

import { useEffect, useRef } from "react";

const PORTFOLIO_ITEMS = [
  {
    src: "/Portofolio Buatkanweb.webp",
    alt: "Kalcer Run 2026",
    name: "Kalcer Run 2026",
    category: "Event",
  },
  {
    src: "/Portofolio Buatkanweb-2.webp",
    alt: "Tool and Room Lending Management",
    name: "Tool and Room Lending Management",
    category: "Facility Management",
  },
  {
    src: "/Portofolio Buatkanweb-3.webp",
    alt: "Swarna Works Creative Agency",
    name: "Company Profile",
    category: "Company Profile",
  },
  {
    src: "/Portofolio Buatkanweb-4.webp",
    alt: "Nusa Desa",
    name: "Landing Page Website",
    category: "Tourism",
  },
  {
    src: "/Portofolio Buatkanweb-5.webp",
    alt: "Hipertensi Platform",
    name: "Platform Pembelajaran",
    category: "Education",
  },
  {
    src: "/Portofolio Buatkanweb-6.webp",
    alt: "Kolam Renang FV UNY",
    name: "Kolam Renang FV UNY",
    category: "Facility Management",
  },
];

export default function PortofolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const duplicated = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section
      id="portofolio"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden"
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="reveal reveal-delay-1 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Hasil Karya Kami
          </h2>
          <p className="reveal reveal-delay-2 text-[#94a3b8] text-[14px] sm:text-[15px] mt-4 max-w-lg mx-auto leading-relaxed">
            Berbagai Website yang telah kami buat untuk mendukung pertumbuhan bisnis UMKM dan Mendukung Event.
          </p>
        </div>

        {/* Marquee Scroll */}
        <div className="reveal reveal-delay-3 relative w-full overflow-hidden">
          {/* Edge fades */}
          <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee-scroll">
            {duplicated.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-3 group relative"
              >
                <div className="relative h-[280px] sm:h-[320px] rounded-[10px] overflow-hidden shadow-lg shadow-black/40">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-[#67BAF4]/90 backdrop-blur-sm text-[#0a0a0a] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay - name only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-4">
                    <h3 className="text-white text-[15px] sm:text-[17px] font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
