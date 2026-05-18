"use client";

import { useParams } from "next/navigation";
import { products, type SizeKey } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
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

// ─── Accord bar expand variants ──────────────────────────────────────────────
const accordItemVariants: Variants = {
  collapsed: { opacity: 0, x: -10 },
  expanded: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const barVariants: Variants = {
  collapsed: { scaleX: 0, opacity: 0 },
  expanded: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.0, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Gender badge color ───────────────────────────────────────────────────────
const genderColor: Record<string, string> = {
  Masculino: "bg-blue-950/60 text-blue-300 border border-blue-700/40",
  Femenino: "bg-rose-950/60 text-rose-300 border border-rose-700/40",
  Unisex: "bg-amber-950/60 text-amber-300 border border-amber-700/40",
};

// ─── Climate icon & color map ────────────────────────────────────────────────
const climateConfig: Record<string, { icon: string; color: string }> = {
  Primavera: { icon: "🌿", color: "bg-green-500" },
  Verano: { icon: "☂️", color: "bg-pink-400" },
  Otoño: { icon: "🍂", color: "bg-amber-600" },
  Invierno: { icon: "❄️", color: "bg-blue-400" },
};

const timeOfDayConfig: Record<string, { icon: string; color: string }> = {
  Día: { icon: "☀️", color: "bg-yellow-400" },
  Noche: { icon: "🌙", color: "bg-indigo-400" },
};

const ALL_SEASONS = ["Invierno", "Primavera", "Verano", "Otoño"] as const;
const ALL_TIMES = ["Día", "Noche"] as const;

// ─── Size options (labels only — prices come from each product's `prices` field) ──
const SIZE_LABELS: SizeKey[] = ["5 ml", "50 ml"];

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));
  const [showAccordsBars, setShowAccordsBars] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeKey>("50 ml");

  if (!product) return notFound();

  // Resolve prices: a size is on sale when discountPrices[size] < prices[size]
  const originalPrice = product.prices[selectedSize];
  const discountedPrice = product.discountPrices?.[selectedSize];
  const isOnSale = discountedPrice != null && discountedPrice < originalPrice;
  const currentPrice = isOnSale ? discountedPrice : originalPrice;
  const savingsPct = isOnSale ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el perfume "${product.name}" en ${selectedSize} (ARS ${currentPrice.toLocaleString("es-AR")}). ¿Tienen stock disponible?`
  );
  const whatsappUrl = `https://wa.me/5492615177609?text=${whatsappMessage}`;

  // ── Image carousel ──────────────────────────────────────────────────────────
  const images = product.images ?? [product.image];
  // ── Lightbox ───────────────────────────────────────────────────────────
  const [activeImg, setActiveImg] = useState(0);
  const [direction, setDirection] = useState(1); // 1 forward, -1 backward
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxScrollRef = useRef<HTMLDivElement>(null);

  const scrollLightboxTo = useCallback((idx: number) => {
    if (!lightboxScrollRef.current) return;
    const container = lightboxScrollRef.current;
    const child = container.children[idx + 1] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2, behavior: "smooth" });
    }
  }, []);

  const goTo = useCallback((idx: number) => {
    if (lightboxOpen) {
      scrollLightboxTo(idx);
    } else {
      setDirection(idx > activeImg ? 1 : -1);
      setActiveImg(idx);
    }
  }, [activeImg, lightboxOpen, scrollLightboxTo]);

  const prev = useCallback(() => goTo((activeImg - 1 + images.length) % images.length), [activeImg, images.length, goTo]);
  const next = useCallback(() => goTo((activeImg + 1) % images.length), [activeImg, images.length, goTo]);

  const slideVariants: Variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }),
  };

  // Scroll lightbox to the active image (without animation) right when it opens
  useEffect(() => {
    if (!lightboxOpen) return;
    // Use requestAnimationFrame so the DOM has rendered before we scroll
    const raf = requestAnimationFrame(() => {
      if (!lightboxScrollRef.current) return;
      const container = lightboxScrollRef.current;
      const child = container.children[activeImg + 1] as HTMLElement; // +1 for left spacer
      if (child) {
        container.scrollTo({
          left: child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2,
          behavior: "instant" as ScrollBehavior,
        });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [lightboxOpen]); // intentionally omit activeImg — we only want this on open

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
        {/* ─── Breadcrumb ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-6 mb-10"
        >
          <nav className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-gold transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="text-white/60 hover:text-gold transition-colors">Colección</Link>
            <span>/</span>
            <span className="text-gold truncate">{product.name}</span>
          </nav>
        </motion.div>

        {/* ─── Main Content Wrapper ─────────────────────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">

          {/* ─── Two-column grid: image | info ───────────────────────────────── */}
          <div className="grid grid-cols-[38%_1fr] md:grid-cols-2 gap-x-4 md:gap-x-12 lg:gap-x-20 gap-y-2 md:gap-y-4 items-start">

            {/* ── Left: Product Image / Carousel ──────────────────────────── */}
            <div className="h-full w-full relative">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="sticky top-24 z-10 flex flex-col gap-2 md:gap-3"
              >
                {/* Main image frame */}
                <div className="relative group">
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gold/10 blur-2xl md:blur-3xl scale-90 opacity-60 pointer-events-none" />

                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    {product.isBestseller && (
                      <span className="absolute top-2 left-2 md:top-5 md:left-5 z-20 gold-gradient text-black text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-4 md:py-1.5 rounded-full tracking-wider md:tracking-widest uppercase shadow-md md:shadow-lg">
                        ⭐ Más vendido
                      </span>
                    )}

                    {/* Slide container */}
                    <div className="relative w-full bg-black-light overflow-hidden" style={{ aspectRatio: "5/6" }}>
                      {/* Drag wrapper — enables swipe on mobile + click to open lightbox */}
                      <motion.div
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        drag={images.length > 1 ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onClick={() => setLightboxOpen(true)}
                        onDragEnd={(_e, info) => {
                          const threshold = 50;
                          if (info.offset.x < -threshold) next();
                          else if (info.offset.x > threshold) prev();
                        }}
                      >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                          <motion.div
                            key={activeImg}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 pointer-events-none"
                          >
                            <Image
                              src={images[activeImg]}
                              alt={`${product.name} — imagen ${activeImg + 1}`}
                              fill
                              priority={activeImg === 0}
                              className="object-contain"
                              sizes="(max-width: 1024px) 40vw, 50vw"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </motion.div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

                      {/* Arrows — only when multiple images */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Imagen anterior"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold hover:text-black hover:border-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Imagen siguiente"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 md:w-4 md:h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          {/* Dot indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`rounded-full transition-all duration-300 ${i === activeImg
                                  ? "bg-gold w-4 h-1.5 md:w-5 md:h-2"
                                  : "bg-white/40 w-1.5 h-1.5 md:w-2 md:h-2 hover:bg-white/70"
                                  }`}
                                aria-label={`Ver imagen ${i + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thumbnails — only when multiple images */}
                {images.length > 1 && (
                  <div className="flex gap-1.5 md:gap-2">
                    {images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`relative flex-1 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === activeImg
                          ? "border-gold shadow-md shadow-gold/20"
                          : "border-white/10 hover:border-white/30"
                          }`}
                        style={{ aspectRatio: "1" }}
                        aria-label={`Seleccionar imagen ${i + 1}`}
                      >
                        <Image
                          src={src}
                          alt={`${product.name} thumbnail ${i + 1}`}
                          fill
                          className="object-contain"
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
              {/* Gender tag + Name */}
              <motion.div variants={fadeUp}>
                <span className={`inline-block text-xs md:text-sm font-semibold px-3 py-1 md:py-1.5 rounded-full tracking-widest uppercase mb-3 ${genderColor[product.gender]}`}>
                  {product.gender}
                </span>
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                  {product.name}
                </h1>
              </motion.div>

              {/* Price */}
              <motion.div variants={fadeUp}>
                {/* Current price + optional savings badge */}
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-gold text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
                    ARS {currentPrice.toLocaleString("es-AR")}
                  </p>
                  {isOnSale && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full tracking-wide">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm.75-9.75a.75.75 0 00-1.5 0v3.19L7.47 8.66a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l2.5-2.5a.75.75 0 10-1.06-1.06l-1.66 1.78V7.25z" clipRule="evenodd" />
                      </svg>
                      Ahorrás {savingsPct}%
                    </span>
                  )}
                </div>

                {/* Strikethrough original price */}
                {isOnSale && (
                  <p className="text-white/35 text-sm sm:text-base line-through mt-1">
                    ARS {originalPrice.toLocaleString("es-AR")}
                  </p>
                )}

                <p className="text-white/40 text-sm md:text-base mt-2">Precio por unidad · Stock disponible</p>

                {/* Size selector */}
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold">Tamaño del envase</span>
                  <div className="flex gap-2">
                    {SIZE_LABELS.map((size) => {
                      const isSelected = selectedSize === size;
                      const optOriginalPrice = product.prices[size];
                      const optDiscountedPrice = product.discountPrices?.[size];
                      const hasOptDiscount = optDiscountedPrice != null && optDiscountedPrice < optOriginalPrice;
                      return (
                        <button
                          key={size}
                          id={`size-${size.replace(" ", "")}`}
                          onClick={() => setSelectedSize(size)}
                          className={`relative flex flex-col items-center justify-center gap-0.5 px-4 py-2.5 rounded-xl border-2 font-bold text-sm tracking-wide transition-all duration-250 select-none ${isSelected
                            ? "gold-gradient text-black border-transparent shadow-lg shadow-gold/30 scale-105"
                            : "bg-transparent text-gold border-gold/40 hover:border-gold/80 hover:bg-gold/5"
                            }`}
                          aria-pressed={isSelected}
                        >
                          <span className="text-base leading-none">{size}</span>
                          {hasOptDiscount ? (
                            <>
                              <span className={`text-[10px] font-semibold tracking-widest leading-none ${isSelected ? "text-black/70" : "text-gold/80"
                                }`}>
                                ARS {optDiscountedPrice!.toLocaleString("es-AR")}
                              </span>
                              <span className={`text-[9px] font-semibold leading-none line-through ${isSelected ? "text-black/40" : "text-white/30"
                                }`}>
                                {optOriginalPrice.toLocaleString("es-AR")}
                              </span>
                            </>
                          ) : (
                            <span className={`text-[10px] font-semibold tracking-widest leading-none ${isSelected ? "text-black/70" : "text-white/40"
                              }`}>
                              ARS {optOriginalPrice.toLocaleString("es-AR")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.hr variants={fadeUp} className="border-white/10" />

              {/* Full description */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3 md:gap-4">
                {product.fullDescription.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* ── Scent Notes ──────────────────────────────────────────── */}
              <motion.div variants={fadeUp} className="space-y-4">
                <h2 className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                  Notas Olfativas
                </h2>
                <div className="flex flex-col gap-3 md:gap-4">
                  {product.scentNotes.map((note) => (
                    <div key={note.name} className="flex items-center gap-3 md:gap-4">
                      <span className="text-white/80 text-sm sm:text-base md:text-lg w-20 sm:w-28 md:w-44 shrink-0 truncate font-medium">{note.name}</span>
                      <div className="flex-1 h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full rounded-full gold-gradient"
                          style={{ width: `${note.intensity * 10}%` }}
                        />
                      </div>
                      <span className="text-gold/80 text-xs sm:text-sm md:text-base font-bold w-6 md:w-8 text-right shrink-0">
                        {note.intensity / 2}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Acordes Principales (Full-width, always below grid) ──────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 md:mt-8 w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold">
                Acordes Principales
              </h2>
              <button
                onClick={() => setShowAccordsBars(!showAccordsBars)}
                className="text-gold hover:text-white underline transition-colors text-[10px] sm:text-xs md:text-sm"
              >
                {showAccordsBars ? 'Ocultar' : 'Detalles'}
              </button>
            </div>

            {/* Collapsed: pill tags */}
            <AnimatePresence mode="popLayout">
              {!showAccordsBars && (
                <motion.div
                  key="pills"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="flex flex-wrap gap-1.5 md:gap-3"
                >
                  {product.mainAccords.map((accord) => (
                    <span
                      key={accord.name}
                      className={`inline-block rounded-md text-white/90 uppercase tracking-widest font-bold shadow-sm ${accord.color} px-2 py-1 md:px-3 md:py-1.5 text-[9px] sm:text-xs md:text-sm`}
                    >
                      {accord.name}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded: stacked rows with animated bars */}
            <AnimatePresence mode="popLayout">
              {showAccordsBars && (
                <motion.div
                  key="bars"
                  initial="collapsed"
                  animate="expanded"
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  className="flex flex-col gap-3 md:gap-5 w-full"
                >
                  {product.mainAccords.map((accord, idx) => (
                    <motion.div
                      key={accord.name}
                      custom={idx}
                      variants={accordItemVariants}
                      className="flex flex-col items-start w-full"
                    >
                      {/* Pill label */}
                      <span
                        className={`inline-block rounded-md text-white/90 uppercase tracking-widest font-bold shadow-sm ${accord.color} px-2 py-1 md:px-3 md:py-1.5 text-[9px] sm:text-xs md:text-sm mb-1.5 md:mb-2`}
                      >
                        {accord.name}
                      </span>

                      {/* Bar track */}
                      <div className="w-full h-4 sm:h-6 md:h-8 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                        <motion.div
                          custom={idx}
                          variants={barVariants}
                          style={{ originX: 0, width: `${accord.percentage}%` }}
                          className={`h-full rounded-full ${accord.color} flex items-center justify-end pr-2 md:pr-4`}
                        >
                          <span className="text-white/90 text-[10px] sm:text-xs md:text-sm font-bold leading-none tracking-widest drop-shadow-md">
                            {accord.percentage}%
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Cuándo Usarlo ────────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 md:mt-12 space-y-3 md:space-y-4"
          >
            <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
              <span>🕐</span> Cuándo Usarlo
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-3 sm:p-6 md:p-8">
              <div className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 justify-items-center w-full">
                {ALL_SEASONS.map((season) => {
                  const hasUsage = product.usageLevels !== undefined;
                  const defaultActive = product.climate.includes(season);
                  const level = hasUsage ? (product.usageLevels?.[season] ?? 1) : (defaultActive ? 3 : 1);
                  const isActive = level > 1;
                  const fillValue = level === 3 ? 100 : level === 2 ? 50 : 0;
                  const cfg = climateConfig[season];
                  return (
                    <div key={season} className="flex flex-col items-center gap-1.5 sm:gap-3 w-full">
                      <span className={`text-base sm:text-2xl md:text-3xl transition-all ${isActive ? "opacity-100" : "opacity-20 grayscale"}`}>
                        {cfg.icon}
                      </span>
                      <span className={`text-[8px] sm:text-[10px] md:text-xs text-center font-medium tracking-tighter sm:tracking-wide uppercase w-full truncate ${isActive ? "text-white/80" : "text-white/30"}`}>
                        {season}
                      </span>
                      <div className="w-[80%] sm:w-[90%] md:w-full h-1 md:h-2 bg-white/10 rounded-full overflow-hidden mx-auto mt-0.5">
                        <div
                          className={`h-full rounded-full ${cfg.color} transition-all duration-700`}
                          style={{ width: `${fillValue}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {ALL_TIMES.map((time) => {
                  const hasUsage = product.usageLevels !== undefined;
                  const defaultActive = product.timeOfDay.includes(time);
                  const level = hasUsage ? (product.usageLevels?.[time] ?? 1) : (defaultActive ? 3 : 1);
                  const isActive = level > 1;
                  const fillValue = level === 3 ? 100 : level === 2 ? 50 : 0;
                  const cfg = timeOfDayConfig[time];
                  return (
                    <div key={time} className="flex flex-col items-center gap-1.5 sm:gap-3 w-full">
                      <span className={`text-base sm:text-2xl md:text-3xl transition-all ${isActive ? "opacity-100" : "opacity-20 grayscale"}`}>
                        {cfg.icon}
                      </span>
                      <span className={`text-[8px] sm:text-[10px] md:text-xs text-center font-medium tracking-tighter sm:tracking-wide uppercase w-full truncate ${isActive ? "text-white/80" : "text-white/30"}`}>
                        {time}
                      </span>
                      <div className="w-[80%] sm:w-[90%] md:w-full h-1 md:h-2 bg-white/10 rounded-full overflow-hidden mx-auto mt-0.5">
                        <div
                          className={`h-full rounded-full ${cfg.color} transition-all duration-700`}
                          style={{ width: `${fillValue}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Duración ──────────────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 md:mt-12"
          >
            <h2 className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-semibold flex items-center gap-2 mb-4 md:mb-6">
              <span>⏱️</span> Duración en piel
            </h2>

            <div className="relative bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10">
              {/* Subtle golden glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative flex justify-center">

                {/* Circular gauge */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    {/* Track ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="8"
                      />
                      {/* Filled arc — maps hours to 0-16h max */}
                      <motion.circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - Math.min(product.longevity.hours, 16) / 16)}`}
                        initial={{ strokeDashoffset: `${2 * Math.PI * 44}` }}
                        animate={{ strokeDashoffset: `${2 * Math.PI * 44 * (1 - Math.min(product.longevity.hours, 16) / 16)}` }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      />
                      <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#C9A84C" />
                          <stop offset="100%" stopColor="#F5D78E" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-4xl sm:text-5xl font-bold text-gold leading-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {product.longevity.hours}
                      </motion.span>
                      <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">horas</span>
                    </div>
                  </div>

                  {/* Label badge below gauge */}
                  <span className="mt-3 inline-block gold-gradient text-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow">
                    {product.longevity.label}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CTA Button ───────────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="pt-8 sticky bottom-4 z-50 mb-8 drop-shadow-2xl"
          >
            <a
              id="btn-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 md:gap-3 gold-gradient text-black font-bold py-3 md:py-4 px-4 md:px-8 rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7 text-black" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar por WhatsApp
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* ── Lightbox Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Image track — CSS Native Scroll Snap */}
            <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
              <div
                ref={lightboxScrollRef}
                className="flex items-center w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  const itemWidth = container.children[1].clientWidth + 24; // child[1] is the first real card (0 is spacer)
                  const newIndex = Math.round(scrollLeft / itemWidth);
                  if (newIndex !== activeImg && newIndex >= 0 && newIndex < images.length) {
                    setActiveImg(newIndex);
                  }
                }}
              >
                {/* Left spacer to center the first item */}
                <div style={{ flex: "0 0 calc(50vw - min(42.5vw, 512px, 42.5vh))" }} className="shrink-0" />

                {images.map((src, i) => {
                  const isActive = i === activeImg;
                  return (
                    <div
                      key={i}
                      className="snap-center relative shrink-0 overflow-hidden bg-black rounded-2xl shadow-2xl"
                      style={{
                        width: "min(85vw, 1024px, 85vh)",
                        height: "min(85vw, 1024px, 85vh)",
                        marginRight: i === images.length - 1 ? 0 : "24px",
                        opacity: isActive ? 1 : 0.42,
                        transform: isActive ? "scale(1)" : "scale(0.95)",
                        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: isActive ? "default" : "pointer",
                        boxShadow: isActive ? "0 0 60px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.7)" : "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isActive) goTo(i);
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} — imagen ${i + 1}`}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 1024px) 85vw, 1024px"
                        priority={i === activeImg}
                      />
                    </div>
                  );
                })}

                {/* Right spacer to center the last item */}
                <div style={{ flex: "0 0 calc(50vw - min(42.5vw, 512px, 42.5vh))" }} className="shrink-0" />
              </div>
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200"
                  aria-label="Imagen anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200"
                  aria-label="Imagen siguiente"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-white/70 text-xs font-medium tracking-widest">
                {activeImg + 1} / {images.length}
              </div>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`rounded-full transition-all duration-300 ${i === activeImg
                      ? "bg-gold w-5 h-2"
                      : "bg-white/40 w-2 h-2 hover:bg-white/70"
                      }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
