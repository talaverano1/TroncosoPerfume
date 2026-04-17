"use client";

import { useParams } from "next/navigation";
import { products } from "@/app/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Gender badge color ───────────────────────────────────────────────────────
const genderColor: Record<string, string> = {
  Masculino: "bg-blue-950/60 text-blue-300 border border-blue-700/40",
  Femenino: "bg-rose-950/60 text-rose-300 border border-rose-700/40",
  Unisex: "bg-amber-950/60 text-amber-300 border border-amber-700/40",
};

// ─── Climate icon map ─────────────────────────────────────────────────────────
const climateIcon: Record<string, string> = {
  Primavera: "🌸",
  Verano: "☀️",
  Otoño: "🍂",
  Invierno: "❄️",
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));

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
            <span className="text-white/60">Colección</span>
            <span>/</span>
            <span className="text-gold truncate">{product.name}</span>
          </nav>
        </motion.div>

        {/* ─── Main Grid ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Product Image ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-3xl bg-gold/10 blur-3xl scale-90 opacity-60 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Bestseller badge */}
              {product.isBestseller && (
                <span className="absolute top-5 left-5 z-10 gold-gradient text-black text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                  ⭐ Más vendido
                </span>
              )}

              <div className="relative h-[480px] md:h-[560px] w-full bg-black-light">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* ── Right: Product Info ─────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Gender tag + Name */}
            <motion.div variants={fadeUp}>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase mb-3 ${genderColor[product.gender]}`}
              >
                {product.gender}
              </span>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white leading-tight">
                {product.name}
              </h1>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeUp}>
              <p className="text-gold text-3xl font-bold tracking-wide">
                ARS {product.price.toLocaleString("es-AR")}
              </p>
              <p className="text-white/40 text-sm mt-1">Precio por unidad · Stock disponible</p>
            </motion.div>

            {/* Divider */}
            <motion.hr
              variants={fadeUp}
              className="border-white/10"
            />

            {/* Full description */}
            <motion.p
              variants={fadeUp}
              className="text-white/70 text-base leading-relaxed"
            >
              {product.fullDescription}
            </motion.p>

            {/* ── Scent Notes ──────────────────────────────────────────────── */}
            <motion.div variants={fadeUp} className="space-y-3">
              <h2 className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold">
                Pirámide Olfativa
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {/* Top */}
                <ScentColumn label="Salida" notes={product.scentNotes.top} color="from-yellow-500/20" />
                {/* Heart */}
                <ScentColumn label="Corazón" notes={product.scentNotes.heart} color="from-rose-500/20" />
                {/* Base */}
                <ScentColumn label="Fondo" notes={product.scentNotes.base} color="from-amber-900/30" />
              </div>
            </motion.div>

            {/* ── Style & Climate ───────────────────────────────────────────── */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              <InfoCard
                icon="✦"
                label="Estilo"
                value={product.style}
              />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Clima ideal</p>
                <div className="flex flex-wrap gap-2">
                  {product.climate.map((c) => (
                    <span
                      key={c}
                      className="text-sm text-white/80 bg-white/10 px-2 py-1 rounded-lg flex items-center gap-1"
                    >
                      <span>{climateIcon[c] ?? "🌤"}</span> {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Occasions ────────────────────────────────────────────────── */}
            <motion.div variants={fadeUp}>
              <h2 className="text-white/50 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                Ocasiones de uso
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map((occ) => (
                  <span
                    key={occ}
                    className="text-sm text-gold border border-gold/30 bg-gold/5 px-3 py-1.5 rounded-full"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── CTA Buttons ───────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                id="btn-buy-now"
                className="flex-1 gold-gradient text-black font-bold py-4 px-8 rounded-2xl text-base tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Comprar ahora
              </button>

              <a
                id="btn-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-2xl text-base tracking-wide transition-all duration-200 active:scale-95"
              >
                {/* WhatsApp icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-green-400"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScentColumn({
  label,
  notes,
  color,
}: {
  label: string;
  notes: string[];
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-b ${color} to-white/5 border border-white/10 rounded-2xl p-3 flex flex-col gap-2`}
    >
      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold text-center">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {notes.map((note) => (
          <span
            key={note}
            className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-lg text-center leading-tight"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
      <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
      <p className="text-white text-sm font-semibold flex items-center gap-1.5">
        <span className="text-gold">{icon}</span> {value}
      </p>
    </div>
  );
}
