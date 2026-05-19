"use client";

import { useParams } from "next/navigation";
import { creams } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function CreamDetailPage() {
  const params = useParams<{ id: string }>();
  const cream = creams.find((c) => c.id === Number(params.id));

  if (!cream) return notFound();

  const isOnSale = cream.discountPrice != null && cream.discountPrice < cream.price;
  const currentPrice = isOnSale ? cream.discountPrice! : cream.price;
  const savingsPct = isOnSale ? Math.round((1 - currentPrice / cream.price) * 100) : 0;

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa la "${cream.name}" (${cream.quantity}) — ARS ${currentPrice.toLocaleString("es-AR")}. ¿Tienen stock disponible?`
  );
  const whatsappUrl = `https://wa.me/5492615177609?text=${whatsappMessage}`;

  const images = cream.images ?? [cream.image];
  const [activeImg, setActiveImg] = useState(0);

  // Float-until-anchor: button is fixed while scrolling, docks when reaching bottom
  const anchorRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);
  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtBottom(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-10">

        {/* ─── Breadcrumb ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 mb-10"
        >
          <nav className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="text-white/60 hover:text-gold transition-colors">Colección</Link>
            <span>/</span>
            <span className="text-gold truncate">{cream.name}</span>
          </nav>
        </motion.div>

        {/* ─── Main Content ────────────────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 md:gap-y-4 items-start">

            {/* ── Left: Image ─────────────────────────────────────────────── */}
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:sticky md:top-24 z-10 flex flex-col gap-3"
              >
                {/* Main image frame */}
                <div className="relative group">
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gold/10 blur-2xl md:blur-3xl scale-90 opacity-60 pointer-events-none" />

                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
                    <div className="relative w-full aspect-square md:aspect-[5/6]">
                      <Image
                        src={images[activeImg]}
                        alt={cream.name}
                        fill
                        className="object-contain p-6 md:p-8"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Thumbnails (desktop only, only when multiple images) */}
                {images.length > 1 && (
                  <div className="hidden md:flex gap-2">
                    {images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === activeImg
                          ? "border-gold shadow-md shadow-gold/20"
                          : "border-white/10 hover:border-white/30"
                          }`}
                        style={{ aspectRatio: "1" }}
                        aria-label={`Seleccionar imagen ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${cream.name} thumbnail ${i + 1}`}
                          fill
                          className="object-contain p-2"
                          sizes="10vw"
                        />
                        {i !== activeImg && (
                          <div className="absolute inset-0 bg-black/40" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── Right: Product Info ──────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 md:gap-8 pb-4"
            >

              {/* Name */}
              <motion.div variants={fadeUp}>
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {cream.name}
                </h1>
              </motion.div>

              {/* Price */}
              <motion.div variants={fadeUp}>
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-gold font-bold text-3xl md:text-4xl tracking-tight">
                    ARS {currentPrice.toLocaleString("es-AR")}
                  </span>
                  {isOnSale && (
                    <span className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-bold px-3 py-1.5 rounded-full tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Ahorrás {savingsPct}%
                    </span>
                  )}
                </div>
                {isOnSale && (
                  <p className="text-white/35 text-base mt-1 line-through">
                    ARS {cream.price.toLocaleString("es-AR")}
                  </p>
                )}
                <p className="text-white/40 text-sm md:text-base mt-2">
                  Precio por unidad · {cream.quantity} · Stock disponible
                </p>
              </motion.div>

              {/* Desktop CTA */}
              <motion.div variants={fadeUp} className="hidden md:block">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 gold-gradient text-black font-bold py-4 px-8 rounded-2xl text-lg tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Comprar por WhatsApp
                </a>
              </motion.div>

              {/* Divider */}
              <motion.hr variants={fadeUp} className="border-white/10" />

              {/* Descripción */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                  Descripción
                </h2>
                <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                  {cream.description}
                </p>
              </motion.div>

              {/* Propiedades */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                  Propiedades
                </h2>
                <ul className="flex flex-col gap-3">
                  {cream.fullDescription.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                        {line}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* ── Mobile CTA: inline anchor (always rendered, visible when at bottom) ── */}
        <div
          ref={anchorRef}
          className={`md:hidden px-4 pt-6 pb-8 max-w-7xl mx-auto transition-opacity duration-200 ${atBottom ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 gold-gradient text-black font-bold py-3.5 px-4 rounded-xl text-sm tracking-wide shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Comprar por WhatsApp
          </a>
        </div>

        {/* ── Mobile floating CTA (visible while NOT at bottom) ─────────────── */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-200 ${atBottom ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <a
            id="btn-whatsapp-cream"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 gold-gradient text-black font-bold py-3.5 px-4 rounded-xl text-sm tracking-wide shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Comprar por WhatsApp
          </a>
        </div>

      </main>

      <Footer />
    </>
  );
}
