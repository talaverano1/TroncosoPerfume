"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cream } from "@/app/data/products";

interface CreamCardProps {
  cream: Cream;
  index?: number;
}

export default function CreamCard({ cream, index = 0 }: CreamCardProps) {
  const isOnSale =
    cream.discountPrice != null && cream.discountPrice < cream.price;
  const displayPrice = isOnSale ? cream.discountPrice! : cream.price;
  const savingsPct = isOnSale
    ? Math.round((1 - cream.discountPrice! / cream.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-row md:flex-col items-stretch"
    >
      {/* Quantity badge */}
      <span className="absolute top-2 right-2 md:top-3 md:right-3 z-20 bg-black/80 text-white text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-widest uppercase">
        {cream.quantity}
      </span>

      {/* Image */}
      <div className="relative w-[40%] md:w-full md:h-52 shrink-0 bg-[#111] overflow-hidden">
        <Image
          src={cream.image}
          alt={cream.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 p-3 md:p-2"
          sizes="(max-width: 768px) 40vw, 300px"
        />
      </div>

      {/* Info */}
      <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* "Complemento" chip */}
          <span className="inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black gold-gradient px-2 py-0.5 rounded-full mb-2">
            Complemento
          </span>
          <h3 className="font-[family-name:var(--font-heading)] text-sm md:text-lg font-semibold text-black mb-1 line-clamp-2 leading-tight">
            {cream.name}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm mb-2 line-clamp-2 md:line-clamp-3 leading-relaxed">
            {cream.description}
          </p>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-0 mt-auto">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-gold font-bold text-sm md:text-lg">
                ARS {displayPrice.toLocaleString("es-AR")}
              </span>
              {isOnSale && (
                <span className="inline-flex items-center bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-wide leading-none">
                  -{savingsPct}%
                </span>
              )}
            </div>
            {isOnSale && (
              <span className="text-gray-400 text-[10px] md:text-xs line-through leading-none">
                ARS {cream.price.toLocaleString("es-AR")}
              </span>
            )}
          </div>

          {/* Desktop CTA */}
          <Link
            href={`/crema/${cream.id}`}
            className="hidden md:flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gold hover:text-black transition-colors duration-300 w-fit text-center font-semibold"
          >
            Ver producto
          </Link>
        </div>
      </div>

      {/* Full card tap target — mobile only */}
      <Link
        href={`/crema/${cream.id}`}
        className="absolute inset-0 z-10 md:hidden"
        aria-label={`Ver ${cream.name}`}
      />
    </motion.div>
  );
}
