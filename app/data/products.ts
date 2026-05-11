export interface ScentNote {
  name: string;
  intensity: number; // 1–10
}

export interface MainAccord {
  name: string;
  percentage: number; // 0–100
  color: string; // tailwind bg class for the bar
}

export interface Longevity {
  hours: number;   // estimated wear time in hours
  label: string;   // e.g. "Larga duración"
}

export interface Product {
  id: number;
  name: string;
  gender: "Masculino" | "Femenino" | "Unisex";
  description: string;
  fullDescription: string;
  images?: string[]; // multiple images for carousel; falls back to [image]
  price: number;
  image: string;
  isBestseller: boolean;
  scentNotes: ScentNote[];
  mainAccords: MainAccord[];
  timeOfDay: ("Día" | "Noche")[];
  usageLevels?: Record<string, number>;
  style: string;
  climate: string[];
  occasions: string[];
  longevity: Longevity;
}

export const products: Product[] = [
  // ── 1. Soberano ──────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Soberano",
    gender: "Masculino",
    description: "Notas amaderadas con un toque de vainilla y ámbar",
    fullDescription:
      "Frescura chispeante de mandarina y bergamota que impacta desde el primer segundo.\n"
      + "El sándalo y el cedro le dan una profundidad masculina, elegante y segura.\n"
      + "Cierra con vainilla y haba tonka: un fondo cálido, adictivo y duradero.\n"
      + "No es un perfume más.\n"
      + "Es presencia que se siente.",
    price: 52500,
    image: "/Soberano/Soberano_Img_1.jpg",
    images: ["/Soberano/Soberano_Img_1.jpg", "/Soberano/Soberano_Img_2.jpg"],
    isBestseller: true,
    scentNotes: [
      { name: "Mandarina", intensity: 9 },
      { name: "Bergamota", intensity: 8 },
      { name: "Pimienta", intensity: 7 },
      { name: "Haba Tonka", intensity: 8 },
      { name: "Cedro", intensity: 9 },
      { name: "Almizcle", intensity: 6 },
    ],
    mainAccords: [
      { name: "Fresco Especiado", percentage: 100, color: "bg-[#2e6b14]" },
      { name: "Ámbar", percentage: 70, color: "bg-[#7a2e0c]" },
      { name: "Cítrico", percentage: 68, color: "bg-[#526014]" },
      { name: "Aromático", percentage: 55, color: "bg-[#1a5e50]" },
      { name: "Almizclado", percentage: 50, color: "bg-[#4a3848]" },
      { name: "Amaderado", percentage: 45, color: "bg-[#4a2c14]" },
      { name: "Lavanda", percentage: 38, color: "bg-[#4a3878]" },
      { name: "Herbal", percentage: 30, color: "bg-[#1e4a2a]" },
      { name: "Cálido Especiado", percentage: 25, color: "bg-[#7a2808]" },
    ],
    timeOfDay: ["Día"],
    usageLevels: {
      Primavera: 3,
      Verano: 3,
      Otoño: 3,
      Invierno: 1,
      Día: 2,
      Noche: 1,
    },
    style: "Seductor & Sofisticado",
    climate: ["Otoño", "Invierno"],
    occasions: ["Veladas Nocturnas", "Eventos Formales", "Citas Románticas"],
    longevity: { hours: 10, label: "Larga duración" },
  },

  // ── 2. Salvatore ─────────────────────────────────────────────────────────────
  {
    id: 2,
    name: "Salvatore",
    gender: "Masculino",
    description: "Cítricos vibrantes que evolucionan hacia una base cálida e irresistible",
    fullDescription:
      "Cítricos vibrantes que despiertan los sentidos desde el primer instante.\n"
      + "Un corazón de frutas tropicales jugosas, dulce y provocativo.\n"
      + "Y al final… vainilla y ámbar gris, cálidos y sensuales, que se funden con la piel.\n"
      + "Fresco al inicio.\n"
      + "Irresistible al final.",
    price: 52500,
    image: "/Salvatore/Salvatore_Img_1.jpg",
    images: ["/Salvatore/Salvatore_Img_1.jpg"],
    isBestseller: false,
    scentNotes: [
      { name: "Cítricos", intensity: 10 },
      { name: "Frutas Tropicales", intensity: 9 },
      { name: "Vainilla", intensity: 8 },
      { name: "Ámbar Gris", intensity: 8 },
      { name: "Almizcle", intensity: 6 },
    ],
    mainAccords: [
      { name: "Cítrico", percentage: 100, color: "bg-[#526014]" },
      { name: "Afrutados", percentage: 88, color: "bg-[#a02818]" },
      { name: "Dulce", percentage: 78, color: "bg-[#9a1818]" },
      { name: "Almizclado", percentage: 65, color: "bg-[#4a3848]" },
      { name: "Atalcado", percentage: 55, color: "bg-[#524a2e]" },
      { name: "Avainillado", percentage: 45, color: "bg-[#6e5a1a]" },
      { name: "Ámbar", percentage: 35, color: "bg-[#7a2e0c]" },
      { name: "Fresco Especiado", percentage: 25, color: "bg-[#2e6b14]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 3,
      Verano: 3,
      Otoño: 2,
      Invierno: 1,
      Día: 3,
      Noche: 2,
    },
    style: "Fresco & Seductor",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Citas", "Salidas Nocturnas"],
    longevity: { hours: 9, label: "Larga duración" },
  },

  // ── 3. Indomable ─────────────────────────────────────────────────────────────
  {
    id: 3,
    name: "Indomable",
    gender: "Masculino",
    description: "Lavanda y pimienta que evolucionan hacia una profundidad oscura e intensa",
    fullDescription:
      "Lavanda fresca con pimienta rosa: limpia, pero con actitud.\n"
      + "Ciruela jugosa y geranio aportan un corazón dulce y elegante.\n"
      + "Vetiver, trufa, cedro y roble cierran con una profundidad oscura, intensa y adictiva.\n"
      + "Fresco al inicio…\n"
      + "pero termina siendo puro magnetismo.",
    price: 52500,
    image: "/Indomable/Indomable_Img_1.jpg",
    images: ["/Indomable/Indomable_Img_1.jpg"],
    isBestseller: true,
    scentNotes: [
      { name: "Lavanda", intensity: 9 },
      { name: "Pimienta Rosa", intensity: 8 },
      { name: "Ciruela", intensity: 8 },
      { name: "Geranio", intensity: 7 },
      { name: "Vetiver", intensity: 9 },
      { name: "Cedro", intensity: 8 },
    ],
    mainAccords: [
      { name: "Aromático", percentage: 100, color: "bg-[#1a5e50]" },
      { name: "Amaderado", percentage: 88, color: "bg-[#4a2c14]" },
      { name: "Afrutados", percentage: 78, color: "bg-[#a02818]" },
      { name: "Lavanda", percentage: 68, color: "bg-[#4a3878]" },
      { name: "Fresco Especiado", percentage: 58, color: "bg-[#2e6b14]" },
      { name: "Terrosos", percentage: 50, color: "bg-[#3e2820]" },
      { name: "Dulce", percentage: 42, color: "bg-[#9a1818]" },
      { name: "Especiado Sutil", percentage: 35, color: "bg-[#5a1c0c]" },
      { name: "Herbal", percentage: 28, color: "bg-[#1e4a2a]" },
      { name: "Rosas", percentage: 20, color: "bg-[#8a0c50]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 2,
      Verano: 1,
      Otoño: 3,
      Invierno: 3,
      Día: 2,
      Noche: 3,
    },
    style: "Magnético & Intenso",
    climate: ["Otoño", "Invierno"],
    occasions: ["Salidas Nocturnas", "Eventos Formales", "Trabajo Ejecutivo"],
    longevity: { hours: 11, label: "Muy larga duración" },
  },

  // ── 4. Enigma ────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Enigma",
    gender: "Masculino",
    description: "Absenta y lavanda que cierran en vainilla negra y almizcle cálido",
    fullDescription:
      "Absenta, anís e hinojo abren con un toque oscuro y provocador.\n"
      + "La lavanda equilibra con una frescura elegante y adictiva.\n"
      + "Vainilla negra y almizcle cierran cálidos, sensuales… pegados a la piel.\n"
      + "Dulce, especiado y magnético.\n"
      + "De esos que no se olvidan.",
    price: 52500,
    image: "/Enigma/Enigma_Img_1.jpg",
    images: ["/Enigma/Enigma_Img_1.jpg"],
    isBestseller: false,
    scentNotes: [
      { name: "Absenta", intensity: 9 },
      { name: "Anís", intensity: 8 },
      { name: "Hinojo", intensity: 7 },
      { name: "Lavanda", intensity: 8 },
      { name: "Vainilla Negra", intensity: 9 },
      { name: "Almizcle", intensity: 8 },
    ],
    mainAccords: [
      { name: "Aromático", percentage: 100, color: "bg-[#1a5e50]" },
      { name: "Avainillado", percentage: 90, color: "bg-[#6e5a1a]" },
      { name: "Especiado Suave", percentage: 80, color: "bg-[#6a2e0c]" },
      { name: "Anís", percentage: 70, color: "bg-[#2e5028]" },
      { name: "Lavanda", percentage: 60, color: "bg-[#4a3878]" },
      { name: "Almizclado", percentage: 52, color: "bg-[#4a3848]" },
      { name: "Atalcado", percentage: 44, color: "bg-[#524a2e]" },
      { name: "Amargo", percentage: 36, color: "bg-[#424e0c]" },
      { name: "Dulce", percentage: 28, color: "bg-[#9a1818]" },
      { name: "Fresco Especiado", percentage: 20, color: "bg-[#2e6b14]" },
    ],
    timeOfDay: ["Noche"],
    usageLevels: {
      Primavera: 1,
      Verano: 1,
      Otoño: 3,
      Invierno: 3,
      Día: 1,
      Noche: 3,
    },
    style: "Oscuro & Magnético",
    climate: ["Otoño", "Invierno"],
    occasions: ["Veladas Nocturnas", "Citas Románticas", "Ocasiones Especiales"],
    longevity: { hours: 12, label: "Muy larga duración" },
  },

  // ── 5. Tropical ──────────────────────────────────────────────────────────────
  {
    id: 5,
    name: "Tropical",
    gender: "Unisex",
    description: "Piña y jengibre que evolucionan hacia coco, sándalo y ámbar adictivo",
    fullDescription:
      "Piña jugosa y jengibre abren frescos… pero provocan desde el primer instante.\n"
      + "Coco cremoso y maderas envuelven con un calor tropical irresistible.\n"
      + "Sándalo, haba tonka y ámbar gris se funden en la piel… dulces, profundos y adictivos.\n"
      + "Empieza fresco…\n"
      + "termina siendo pura tentación.",
    price: 52500,
    image: "/Tropical/Tropical_Img_1.jpg",
    images: ["/Tropical/Tropical_Img_1.jpg"],
    isBestseller: false,
    scentNotes: [
      { name: "Piña", intensity: 10 },
      { name: "Jengibre", intensity: 8 },
      { name: "Coco", intensity: 9 },
      { name: "Sándalo", intensity: 8 },
      { name: "Haba Tonka", intensity: 7 },
      { name: "Ámbar Gris", intensity: 8 },
    ],
    mainAccords: [
      { name: "Coco", percentage: 100, color: "bg-[#5a4a14]" },
      { name: "Avainillado", percentage: 88, color: "bg-[#6e5a1a]" },
      { name: "Dulce", percentage: 78, color: "bg-[#9a1818]" },
      { name: "Cítrico", percentage: 65, color: "bg-[#526014]" },
      { name: "Lactónico", percentage: 54, color: "bg-[#3e4a4e]" },
      { name: "Aromático", percentage: 44, color: "bg-[#1a5e50]" },
      { name: "Ámbar", percentage: 36, color: "bg-[#7a2e0c]" },
      { name: "Tropical", percentage: 28, color: "bg-[#3a5210]" },
      { name: "Fresco Especiado", percentage: 20, color: "bg-[#2e6b14]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 3,
      Verano: 3,
      Otoño: 2,
      Invierno: 1,
      Día: 3,
      Noche: 2,
    },
    style: "Tropical & Seductor",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Playa", "Salidas Casuales"],
    longevity: { hours: 9, label: "Larga duración" },
  },

  // ── 6. Homme Intens ──────────────────────────────────────────────────────────
  {
    id: 6,
    name: "Homme Intens",
    gender: "Masculino",
    description: "Geranio cítrico con haba tonka y sándalo de profundidad irresistible",
    fullDescription:
      "Geranio fresco con un toque cítrico abre limpio… pero con intención.\n"
      + "Haba tonka en el corazón: cálida, envolvente… despierta el anhelo.\n"
      + "Sándalo en el fondo: profundo, firme… pura intensidad que se siente.\n"
      + "No es solo presencia.\n"
      + "Es poder que se percibe…\n"
      + "y deseo que no se apaga.",
    price: 52500,
    image: "/hero-bg.png",
    isBestseller: false,
    scentNotes: [
      { name: "Geranio", intensity: 9 },
      { name: "Cítricos", intensity: 8 },
      { name: "Haba Tonka", intensity: 10 },
      { name: "Sándalo", intensity: 9 },
      { name: "Almizcle", intensity: 7 },
    ],
    mainAccords: [
      { name: "Caramelo", percentage: 100, color: "bg-[#6a4010]" },
      { name: "Aromático", percentage: 88, color: "bg-[#1a5e50]" },
      { name: "Dulce", percentage: 78, color: "bg-[#9a1818]" },
      { name: "Cítrico", percentage: 65, color: "bg-[#526014]" },
      { name: "Avainillado", percentage: 54, color: "bg-[#6e5a1a]" },
      { name: "Ámbar", percentage: 44, color: "bg-[#7a2e0c]" },
      { name: "Especiado Suave", percentage: 35, color: "bg-[#6a2e0c]" },
      { name: "Amaderado", percentage: 26, color: "bg-[#4a2c14]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 2,
      Verano: 2,
      Otoño: 3,
      Invierno: 3,
      Día: 2,
      Noche: 3,
    },
    style: "Intenso & Poderoso",
    climate: ["Otoño", "Invierno"],
    occasions: ["Trabajo Ejecutivo", "Eventos Formales", "Citas"],
    longevity: { hours: 11, label: "Muy larga duración" },
  },

  // ── 7. Campeones ─────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Campeones",
    gender: "Masculino",
    description: "Lavanda especiada e incienso que cierran en vainilla cálida y triunfante",
    fullDescription:
      "Lavanda, cardamomo y pimienta negra abren con una frescura especiada que despierta el juego.\n"
      + "Incienso y pachulí profundizan: carácter, intensidad… mentalidad ganadora.\n"
      + "Vainilla, haba tonka y ámbar cierran cálidos, firmes… como el sueño cumplido.\n"
      + "No es solo un aroma.\n"
      + "Es creer hasta el final.\n"
      + "CAMPEONES.",
    price: 52500,
    image: "/Campeones/Campeones_Img_1.jpg",
    images: ["/Campeones/Campeones_Img_1.jpg"],
    isBestseller: true,
    scentNotes: [
      { name: "Lavanda", intensity: 9 },
      { name: "Cardamomo", intensity: 8 },
      { name: "Pimienta Negra", intensity: 8 },
      { name: "Incienso", intensity: 9 },
      { name: "Pachulí", intensity: 7 },
      { name: "Vainilla", intensity: 8 },
      { name: "Haba Tonka", intensity: 8 },
    ],
    mainAccords: [
      { name: "Avainillado", percentage: 100, color: "bg-[#6e5a1a]" },
      { name: "Ámbar", percentage: 88, color: "bg-[#7a2e0c]" },
      { name: "Dulce", percentage: 78, color: "bg-[#9a1818]" },
      { name: "Aromático", percentage: 68, color: "bg-[#1a5e50]" },
      { name: "Especiado Suave", percentage: 58, color: "bg-[#6a2e0c]" },
      { name: "Lavanda", percentage: 50, color: "bg-[#4a3878]" },
      { name: "Atalcado", percentage: 42, color: "bg-[#524a2e]" },
      { name: "Fresco Especiado", percentage: 34, color: "bg-[#2e6b14]" },
      { name: "Cítrico", percentage: 26, color: "bg-[#526014]" },
      { name: "Balsámico", percentage: 18, color: "bg-[#3a2408]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 2,
      Verano: 1,
      Otoño: 3,
      Invierno: 3,
      Día: 2,
      Noche: 3,
    },
    style: "Ganador & Audaz",
    climate: ["Otoño", "Invierno"],
    occasions: ["Deporte", "Trabajo", "Eventos Especiales"],
    longevity: { hours: 10, label: "Larga duración" },
  },

  // ── 8. Amor y Luz ────────────────────────────────────────────────────────────
  {
    id: 8,
    name: "Amor y Luz",
    gender: "Femenino",
    description: "Champagne rosé y flores que se quedan en la piel cálidos e imposibles de olvidar",
    fullDescription:
      "Champagne rosé y pimienta rosa abren chispeantes… imposibles de ignorar.\n"
      + "Flor de duraznero y rosa envuelven suaves, dulces… pero dejan marca.\n"
      + "Almizcle blanco y maderas se quedan en la piel… cálidos, adictivos… difíciles de soltar.\n"
      + "Sutil al inicio…\n"
      + "pero de esos aromas que te desarman, te confunden…\n"
      + "y te hacen desear lo que ya no podés tener.",
    price: 52500,
    image: "/Amor y Luz/AmorYLuz_Img_1.jpg",
    images: ["/Amor y Luz/AmorYLuz_Img_1.jpg"],
    isBestseller: false,
    scentNotes: [
      { name: "Champagne Rosé", intensity: 9 },
      { name: "Pimienta Rosa", intensity: 7 },
      { name: "Flor de Duraznero", intensity: 9 },
      { name: "Rosa", intensity: 8 },
      { name: "Almizcle Blanco", intensity: 8 },
      { name: "Maderas", intensity: 6 },
    ],
    mainAccords: [
      { name: "Florales", percentage: 100, color: "bg-[#a01060]" },
      { name: "Almizclado", percentage: 85, color: "bg-[#4a3848]" },
      { name: "Afrutados", percentage: 72, color: "bg-[#a02818]" },
      { name: "Amaderado", percentage: 60, color: "bg-[#4a2c14]" },
      { name: "Atalcado", percentage: 48, color: "bg-[#524a2e]" },
      { name: "Rosas", percentage: 36, color: "bg-[#8a0c50]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 3,
      Verano: 3,
      Otoño: 2,
      Invierno: 1,
      Día: 3,
      Noche: 2,
    },
    style: "Romántico & Adictivo",
    climate: ["Primavera", "Verano"],
    occasions: ["Citas", "Uso Diario", "Celebraciones"],
    longevity: { hours: 8, label: "Larga duración" },
  },

  // ── 9. Clásico Blush ─────────────────────────────────────────────────────────
  {
    id: 9,
    name: "Clásico Blush",
    gender: "Femenino",
    description: "Bergamota y almendra con peonía que cierran en vainilla adictiva e inolvidable",
    fullDescription:
      "Bergamota y almendra abren suaves, con un dulzor que engancha desde el primer instante.\n"
      + "Peonía y ylang-ylang envuelven con una feminidad delicada, casi íntima.\n"
      + "Vainilla y cumarina quedan en la piel… cálidas, adictivas, imposibles de olvidar.\n"
      + "Un aroma que se queda…\n"
      + "como esos recuerdos que vuelven cuando menos lo esperás.",
    price: 52500,
    image: "/Clasico Blush/ClasicoBlush_Img_1.jpg",
    images: ["/Clasico Blush/ClasicoBlush_Img_1.jpg"],
    isBestseller: false,
    scentNotes: [
      { name: "Bergamota", intensity: 8 },
      { name: "Almendra", intensity: 9 },
      { name: "Peonía", intensity: 9 },
      { name: "Ylang-Ylang", intensity: 7 },
      { name: "Vainilla", intensity: 10 },
      { name: "Cumarina", intensity: 8 },
    ],
    mainAccords: [
      { name: "Florales", percentage: 100, color: "bg-[#a01060]" },
      { name: "Avainillado", percentage: 88, color: "bg-[#6e5a1a]" },
      { name: "Fresco", percentage: 78, color: "bg-[#1a5a6a]" },
      { name: "Cítrico", percentage: 68, color: "bg-[#526014]" },
      { name: "Dulce", percentage: 58, color: "bg-[#9a1818]" },
      { name: "Floral Amarillo", percentage: 48, color: "bg-[#5a5e0c]" },
      { name: "Rosas", percentage: 40, color: "bg-[#8a0c50]" },
      { name: "Amaderado", percentage: 32, color: "bg-[#4a2c14]" },
      { name: "Almendrado", percentage: 24, color: "bg-[#52401e]" },
      { name: "Aromático", percentage: 16, color: "bg-[#1a5e50]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 3,
      Verano: 2,
      Otoño: 3,
      Invierno: 2,
      Día: 3,
      Noche: 2,
    },
    style: "Delicado & Femenino",
    climate: ["Primavera", "Otoño"],
    occasions: ["Uso Diario", "Trabajo", "Citas"],
    longevity: { hours: 9, label: "Larga duración" },
  },

  // ── 10. Regina ───────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Regina",
    gender: "Femenino",
    description: "Almendra y café que evolucionan hacia un corazón floral y una base cálida e irresistible",
    fullDescription:
      "Almendra, café, bergamota y limón abren dulces y luminosos… imposibles de ignorar.\n"
      + "Nardos, jazmín, azahar, iris y rosa búlgara envuelven con una elegancia profunda y adictiva.\n"
      + "Haba tonka, cacao, vainilla, praliné, ámbar y maderas se funden en la piel… cálidos, intensos y memorables.\n"
      + "Un aroma que se vuelve costumbre…\n"
      + "y termina siendo un recuerdo del que no te soltás.",
    price: 52500,
    image: "/hero-bg.png",
    isBestseller: true,
    scentNotes: [
      { name: "Almendra", intensity: 9 },
      { name: "Café", intensity: 8 },
      { name: "Jazmín", intensity: 9 },
      { name: "Rosa Búlgara", intensity: 9 },
      { name: "Vainilla", intensity: 10 },
      { name: "Cacao", intensity: 8 },
      { name: "Haba Tonka", intensity: 8 },
    ],
    mainAccords: [
      { name: "Dulce", percentage: 100, color: "bg-[#9a1818]" },
      { name: "Floral Blanco", percentage: 90, color: "bg-[#2a3a50]" },
      { name: "Cálido Especiado", percentage: 80, color: "bg-[#7a2808]" },
      { name: "Avainillado", percentage: 70, color: "bg-[#6e5a1a]" },
      { name: "Ámbar", percentage: 50, color: "bg-[#7a2e0c]" },
      { name: "Cacao", percentage: 48, color: "bg-[#3e1c08]" },
      { name: "Amaderado", percentage: 44, color: "bg-[#4a2c14]" },
      { name: "Nardos", percentage: 40, color: "bg-[#2a4050]" },
      { name: "Almendrado", percentage: 38, color: "bg-[#52401e]" },
      { name: "Atalcado", percentage: 38, color: "bg-[#524a2e]" },
    ],
    timeOfDay: ["Día", "Noche"],
    usageLevels: {
      Primavera: 2,
      Verano: 1,
      Otoño: 3,
      Invierno: 3,
      Día: 2,
      Noche: 3,
    },
    style: "Elegante & Memorable",
    climate: ["Otoño", "Invierno"],
    occasions: ["Ocasiones Especiales", "Cenas", "Eventos de Gala"],
    longevity: { hours: 13, label: "Excepcional" },
  },
];