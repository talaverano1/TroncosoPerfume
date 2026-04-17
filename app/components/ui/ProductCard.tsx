"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {product.isBestseller && (
        <span className="absolute top-3 left-3 z-10 bg-gold text-black text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
          Más vendido
        </span>
      )}

      <div className="relative h-64 w-full overflow-hidden bg-black-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-black mb-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gold font-bold text-lg">
            ${product.price.toLocaleString("es-AR")} {/* toLocaleString("es-AR") formatea el número como moneda argentina */}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gold hover:text-black transition-colors duration-300 cursor-pointer"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
