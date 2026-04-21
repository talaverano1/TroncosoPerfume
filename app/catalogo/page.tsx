"use client";

import { motion, Variants } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ProductCard from "@/app/components/ui/ProductCard";
import { products } from "@/app/data/products";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function CatalogoPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-black/40 mb-12"
          >
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-black/70 font-medium">Catálogo</span>
          </motion.nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4 font-medium">
              Troncoso Perfumes
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-black mb-4">
              Nuestra Colección
            </h1>
            <p className="text-black/50 text-base md:text-lg max-w-xl mx-auto">
              {products.length} fragancias artesanales pensadas para cada momento y personalidad.
            </p>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
          </motion.div>

          {/* Product grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, i) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
