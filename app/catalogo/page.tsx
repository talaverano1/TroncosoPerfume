"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ProductCard from "@/app/components/ui/ProductCard";
import { products, Product } from "@/app/data/products";
import Link from "next/link";

// ─── Variants ────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── Filter Config ────────────────────────────────────────────────────────────
const GENDERS = [
  { key: "all",       label: "Todos",  icon: "✦" },
  { key: "Masculino", label: "Hombre", icon: "♂" },
  { key: "Femenino",  label: "Mujer",  icon: "♀" },
  { key: "Unisex",    label: "Unisex", icon: "◈" },
] as const;

const TIME_FILTERS = [
  { key: "all",   label: "Cualquier hora", icon: "🕐" },
  { key: "Día",   label: "De Día",         icon: "☀️" },
  { key: "Noche", label: "De Noche",       icon: "🌙" },
] as const;

const SEASON_FILTERS = [
  { key: "all",       label: "Toda estación", icon: "🗓" },
  { key: "Primavera", label: "Primavera",     icon: "🌿" },
  { key: "Verano",    label: "Verano",        icon: "☂️" },
  { key: "Otoño",     label: "Otoño",         icon: "🍂" },
  { key: "Invierno",  label: "Invierno",      icon: "❄️" },
] as const;

type GenderKey = typeof GENDERS[number]["key"];
type TimeKey   = typeof TIME_FILTERS[number]["key"];
type SeasonKey = typeof SEASON_FILTERS[number]["key"];

const GENDER_SECTIONS: Array<{ key: Exclude<GenderKey, "all">; label: string; accent: string; dot: string }> = [
  { key: "Masculino", label: "Hombre",  accent: "text-blue-300",  dot: "bg-blue-400" },
  { key: "Femenino",  label: "Mujer",   accent: "text-rose-300",  dot: "bg-rose-400" },
  { key: "Unisex",    label: "Unisex",  accent: "text-amber-300", dot: "bg-amber-400" },
];

// Match a product against the active filters
function matchesFilters(p: Product, time: TimeKey, season: SeasonKey): boolean {
  const timeOk   = time   === "all" || p.timeOfDay.includes(time as "Día" | "Noche");
  const seasonOk = season === "all" || p.climate.includes(season);
  return timeOk && seasonOk;
}

// ─── FilterChip ───────────────────────────────────────────────────────────────
function FilterChip({
  icon, label, active, onClick,
}: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-250 whitespace-nowrap border ${
        active
          ? "bg-gold text-black border-gold shadow-md shadow-gold/20"
          : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
      }`}
    >
      <span className="text-sm leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CatalogoPage() {
  const [activeGender, setActiveGender] = useState<GenderKey>("all");
  const [activeTime,   setActiveTime]   = useState<TimeKey>("all");
  const [activeSeason, setActiveSeason] = useState<SeasonKey>("all");

  const hasActiveFilters = activeTime !== "all" || activeSeason !== "all";

  const [filtersOpen, setFiltersOpen] = useState(false);

  const clearFilters = () => {
    setActiveTime("all");
    setActiveSeason("all");
  };

  // Products filtered by cuando usarlo filters
  const baseFiltered = useMemo(
    () => products.filter((p) => matchesFilters(p, activeTime, activeSeason)),
    [activeTime, activeSeason]
  );

  // Sort: bestsellers first, then alphabetical
  const sortProducts = (list: typeof products) =>
    [...list].sort((a, b) => {
      if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
      return a.name.localeCompare(b.name, "es");
    });

  // Flat list for "all" gender mode (no section headers)
  const flatList = useMemo(
    () => sortProducts(baseFiltered),
    [baseFiltered]
  );

  // Sections (only used when a specific gender is selected)
  const sections = useMemo(() => {
    if (activeGender === "all") return [];
    return GENDER_SECTIONS
      .filter((g) => g.key === activeGender)
      .map((g) => ({
        ...g,
        products: sortProducts(baseFiltered.filter((p) => p.gender === g.key)),
      }))
      .filter((s) => s.products.length > 0);
  }, [activeGender, baseFiltered]);

  const totalCount = activeGender === "all"
    ? flatList.length
    : sections.reduce((acc, s) => acc + s.products.length, 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-10">

          {/* ── Breadcrumb ───────────────────────────────────────────────── */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-white/40 mb-12"
          >
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70 font-medium">Colección</span>
          </motion.nav>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-medium">
              Troncoso Perfumes
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-white mb-4">
              Nuestra Colección
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto">
              {products.length} fragancias artesanales pensadas para cada momento y personalidad.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </motion.div>

          {/* ── Sticky Control Bar ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-20 z-40 mb-10"
          >
            <div className="bg-[#111]/90 backdrop-blur-xl border border-white/8 rounded-2xl p-4 shadow-2xl space-y-4">

              {/* Gender tabs */}
              <div className="flex gap-1.5">
                {GENDERS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    id={`gender-tab-${key}`}
                    onClick={() => setActiveGender(key)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-250 ${
                      activeGender === key
                        ? "bg-gold text-black shadow-md"
                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <span>{icon}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* Divider + toggle */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/8" />
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-white/40 hover:text-white/70 transition-colors"
                >
                  {hasActiveFilters && !filtersOpen && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  )}
                  <span>{filtersOpen ? "Ocultar filtros" : "Filtrar"}</span>
                  <motion.span
                    animate={{ rotate: filtersOpen ? 0 : 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="inline-block leading-none"
                  >
                    ⌃
                  </motion.span>
                </button>
              </div>

              {/* Collapsible filters */}
              <AnimatePresence initial={false}>
                {filtersOpen && (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-1">
                      {/* Filters: Momento */}
                      <div className="space-y-2">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium px-1">
                          Momento del día
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {TIME_FILTERS.map(({ key, label, icon }) => (
                            <FilterChip
                              key={key}
                              icon={icon}
                              label={label}
                              active={activeTime === key}
                              onClick={() => setActiveTime(key)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Filters: Estación */}
                      <div className="space-y-2">
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium px-1">
                          Estación
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SEASON_FILTERS.map(({ key, label, icon }) => (
                            <FilterChip
                              key={key}
                              icon={icon}
                              label={label}
                              active={activeSeason === key}
                              onClick={() => setActiveSeason(key)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Active filter summary + clear */}
                      <AnimatePresence>
                        {hasActiveFilters && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-center justify-between pt-1 border-t border-white/8">
                              <p className="text-white/40 text-xs">
                                Mostrando <span className="text-gold font-bold">{totalCount}</span> {totalCount === 1 ? "fragancia" : "fragancias"}
                              </p>
                              <button
                                onClick={clearFilters}
                                className="text-xs text-white/40 hover:text-white underline transition-colors"
                              >
                                Limpiar filtros
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Product Sections ──────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeGender}-${activeTime}-${activeSeason}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* ── Flat grid: "Todos" — no gender headers ─────────────────── */}
              {activeGender === "all" && (
                flatList.length > 0 ? (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
                  >
                    {flatList.map((product, i) => (
                      <motion.div key={product.id} variants={fadeUp} className="h-full">
                        <ProductCard product={product} index={i} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-28 flex flex-col items-center gap-4">
                    <span className="text-5xl opacity-30">✦</span>
                    <p className="text-white/30 text-lg font-medium">
                      No hay fragancias para esta combinación de filtros.
                    </p>
                    <button onClick={clearFilters} className="mt-2 text-gold hover:text-white underline text-sm transition-colors">
                      Limpiar filtros
                    </button>
                  </div>
                )
              )}

              {/* ── Sectioned grid: specific gender selected ───────────────── */}
              {activeGender !== "all" && (
                sections.length > 0 ? (
                  <div className="space-y-16">
                    {sections.map((section) => (
                      <section key={section.key} id={`section-${section.key.toLowerCase()}`}>
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`w-2 h-2 rounded-full ${section.dot}`} />
                          <h2 className={`font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold ${section.accent}`}>
                            {section.label}
                          </h2>
                          <div className="h-px flex-1 bg-white/8" />
                          <span className="text-white/25 text-xs font-medium">
                            {section.products.length} {section.products.length === 1 ? "fragancia" : "fragancias"}
                          </span>
                        </div>
                        <motion.div
                          variants={stagger}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-40px" }}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
                        >
                          {section.products.map((product, i) => (
                            <motion.div key={product.id} variants={fadeUp} className="h-full">
                              <ProductCard product={product} index={i} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-28 flex flex-col items-center gap-4">
                    <span className="text-5xl opacity-30">✦</span>
                    <p className="text-white/30 text-lg font-medium">
                      No hay fragancias para esta combinación de filtros.
                    </p>
                    <button onClick={clearFilters} className="mt-2 text-gold hover:text-white underline text-sm transition-colors">
                      Limpiar filtros
                    </button>
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
}
