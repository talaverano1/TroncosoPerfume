"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AdItem {
  id: number;
  name: string;
  tagline: string;
  image: string;
  accent: string;
}

const ads: AdItem[] = [
  { id: 1, name: "Soberano", tagline: "Elegante. Intenso. Inolvidable.", image: "/SoberanoPublicidad.png", accent: "#C9A96E" },
  { id: 2, name: "Rosa Imperial", tagline: "La elegancia hecha fragancia", image: "/RosaImperialPublicidad.png", accent: "#E8A0BF" },
  { id: 3, name: "Oud Dorado", tagline: "Un viaje al corazón del lujo", image: "/OudDoradoPublicidad.png", accent: "#D4A017" },
  { id: 4, name: "Brisa Marina", tagline: "Libertad en cada nota", image: "/BrisaMarinaPublicidad.png", accent: "#67C8D4" },
  { id: 5, name: "Vetiver Noche", tagline: "La oscuridad tiene su propio lenguaje", image: "/VetiverNochePublicidad.png", accent: "#8A9BA8" },
  { id: 6, name: "Flor de Azahar", tagline: "Delicadeza que florece en tu piel", image: "/FlorDeAzaharPublicidad.png", accent: "#F5CBA7" },
];

// Responsive card: 78% of viewport width, max 800px
// We read the real px size client-side via a CSS custom property set on the wrapper.
// For the JS offset we use the same formula via a ref.
const CARD_GAP = 20;

export default function PerfumeAds() {
  const [current, setCurrent] = useState(0);

  const go = useCallback((delta: number) => setCurrent(p => (p + delta + ads.length) % ads.length), []);
  const goTo = useCallback((i: number) => setCurrent(i), []);

  const ad = ads[current];

  // CSS will handle centering via padding; JS only needs to shift the track by `current` steps.
  // We express the step in the same unit the CSS uses: min(85vw, 1024px) + gap.
  // We use a CSS calc() string directly in the transform so it stays in sync.
  const trackTransform = `translateX(calc(${current} * (min(85vw, 1024px) + ${CARD_GAP}px) * -1))`;

  return (
    <section id="publicidad-perfumes" className="bg-black py-14 md:py-20">

      {/* Header */}
      <div className="text-center mb-10 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="text-gold text-xs uppercase tracking-[0.4em] mb-2 font-medium"
        >
          Nuestra colección
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-white text-3xl md:text-5xl font-bold"
        >
          Cada fragancia, una <span className="text-gold-gradient">historia</span>
        </motion.h2>
      </div>

      {/* Viewport: clips everything outside; contains the sliding track */}
      <div className="relative overflow-hidden">

        {/* Track: all cards side by side; paddingLeft centers card[0], then translateX shifts by current */}
        <div
          className="flex"
          style={{
            gap: CARD_GAP,
            paddingLeft: "calc(50vw - min(42.5vw, 512px))",  // = 50vw - cardWidth/2
            paddingRight: "calc(50vw - min(42.5vw, 512px))",
            transform: trackTransform,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {ads.map((item, i) => {
            const isActive = i === current;
            return (
              <div
                key={item.id}
                onClick={() => !isActive && goTo(i)}
                className="shrink-0 rounded-2xl overflow-hidden"
                style={{
                  width: "min(85vw, 1024px)",
                  opacity: isActive ? 1 : 0.42,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                  transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease",
                  cursor: isActive ? "default" : "pointer",
                  boxShadow: isActive ? `0 0 60px ${item.accent}28, 0 24px 60px rgba(0,0,0,0.7)` : "none",
                }}
              >
                {/* Image — exactly 1:1 aspect ratio, centered crop */}
                <div className="relative w-full aspect-square bg-black">
                  <Image
                    src={item.image}
                    alt={`Publicidad de ${item.name}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 85vw, 1024px"
                    priority={i < 2}
                  />
                </div>

                {/* Info bar */}
                <div
                  className="flex items-center justify-between gap-4 px-6 md:px-8 py-4"
                  style={{
                    background: "#0d0d0d",
                    borderTop: `1px solid ${item.accent}33`,
                  }}
                >
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold truncate"
                      style={{ color: isActive ? "#F5F5F3" : "#777" }}>
                      {item.name}
                    </p>
                    <p className="text-sm mt-0.5 truncate"
                      style={{ color: isActive ? `${item.accent}cc` : "#555" }}>
                      {item.tagline}
                    </p>
                  </div>

                  {isActive && (
                    <Link
                      href={`/product/${item.id}`}
                      id={`ad-link-${item.id}`}
                      onClick={e => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:gap-4"
                      style={{
                        background: `${item.accent}18`,
                        border: `1px solid ${item.accent}70`,
                        color: item.accent,
                      }}
                    >
                      Descubrir
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Left arrow */}
        <AnimatePresence>
          {current > 0 && (
            <motion.button
              key="prev"
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.2 }}
              onClick={() => go(-1)}
              id="ad-arrow-prev" aria-label="Anterior"
              className="absolute left-4 md:left-8 top-[42%] -translate-y-1/2 z-30
                         w-12 h-12 flex items-center justify-center rounded-full
                         border border-white/25 bg-black/70 backdrop-blur-sm text-white
                         hover:bg-white/15 hover:border-white/50 transition-all duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {current < ads.length - 1 && (
            <motion.button
              key="next"
              initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.2 }}
              onClick={() => go(1)}
              id="ad-arrow-next" aria-label="Siguiente"
              className="absolute right-4 md:right-8 top-[42%] -translate-y-1/2 z-30
                         w-12 h-12 flex items-center justify-center rounded-full
                         border border-white/25 bg-black/70 backdrop-blur-sm text-white
                         hover:bg-white/15 hover:border-white/50 transition-all duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-2 mt-7">
        {ads.map((item, i) => (
          <button
            key={item.id} onClick={() => goTo(i)}
            aria-label={`Ir a ${item.name}`}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? ad.accent : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
      <p className="text-center text-white/25 text-xs mt-2 tracking-widest">
        {current + 1} / {ads.length}
      </p>
    </section>
  );
}
