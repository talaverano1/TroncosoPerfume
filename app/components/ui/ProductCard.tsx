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
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-row md:flex-col items-stretch h-full"
    >
      {product.isBestseller && (
        <span className="absolute top-2 left-2 md:top-3 md:left-3 z-10 bg-gold text-black text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-full tracking-wide shadow-sm">
          Más vendido
        </span>
      )}

      {/* Contenedor de la Imagen: 40% del ancho en móvil, 100% en desktop */}
      {/* Fixed height keeps every card's image area identical across the grid */}
      <div className="relative w-[40%] md:w-full h-full md:h-52 overflow-hidden bg-[#111] shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 p-2 md:p-0"
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Contenedor del Texto */}
      <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-sm md:text-lg font-semibold text-black mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm mb-2 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mt-auto">
          <span className="text-gold font-bold text-sm md:text-lg">
            ${product.price.toLocaleString("es-AR")}
          </span>
          <Link
            href={`/product/${product.id}`}
            className="bg-black text-white text-[11px] md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-gold hover:text-black transition-colors duration-300 w-fit md:w-auto text-center"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
