"use client";

import { useParams } from "next/navigation";
import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));
  const [showAccordsBars, setShowAccordsBars] = useState(false);

  if (!product) return notFound();

  const whatsappMessage = encodeURIComponent(
    `Hola! Me interesa el perfume "${product.name}" (ARS ${product.price.toLocaleString("es-AR")}). ¿Tienen stock disponible?`
  );
  const whatsappUrl = `https://wa.me/5492615177609?text=${whatsappMessage}`;

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

            {/* ── Left: Product Image ──────────────────────────────────────── */}
            <div className="h-full w-full relative">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="sticky top-24 z-10"
              >
                {/* Glow halo */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gold/10 blur-2xl md:blur-3xl scale-90 opacity-60 pointer-events-none" />

                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  {product.isBestseller && (
                    <span className="absolute top-2 left-2 md:top-5 md:left-5 z-10 gold-gradient text-black text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-4 md:py-1.5 rounded-full tracking-wider md:tracking-widest uppercase shadow-md md:shadow-lg">
                      ⭐ Más vendido
                    </span>
                  )}
                  <div className="relative w-full bg-black-light flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={1000}
                      height={1200}
                      priority
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-contain"
                      sizes="(max-width: 1024px) 40vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
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
                <p className="text-gold text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
                  ARS {product.price.toLocaleString("es-AR")}
                </p>
                <p className="text-white/40 text-sm md:text-base mt-2">Precio por unidad · Stock disponible</p>
              </motion.div>

              {/* Divider */}
              <motion.hr variants={fadeUp} className="border-white/10" />

              {/* Full description */}
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed"
              >
                {product.fullDescription}
              </motion.p>

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
    </>
  );
}
