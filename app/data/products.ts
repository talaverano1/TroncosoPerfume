export interface ScentNote {
  name: string;
  intensity: number; // 1–10
}

export interface MainAccord {
  name: string;
  percentage: number; // 0–100
  color: string; // tailwind bg class for the bar
}

export interface Product {
  id: number;
  name: string;
  gender: "Masculino" | "Femenino" | "Unisex";
  description: string;
  fullDescription: string;
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
}

export const products: Product[] = [
  {
    id: 1,
    name: "Soberano",
    gender: "Masculino",
    description: "Notas amaderadas con un toque de vainilla y ámbar",
    fullDescription:
      "Eleva tu presencia con Soberano. Elegante, intenso, inolvidable. Arranca fresco con bergamota y mandarina. Toma caracter con pimienta. Y se queda... con maderas y haba tonka durante horas. Alta duracion real. Presencia que no se pierde",
    price: 52500,
    image: "/SoberanoPerfume.png",
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
      { name: "Cítrico Chispeante", percentage: 95, color: "bg-orange-600" },
      { name: "Amaderado", percentage: 85, color: "bg-amber-800" },
      { name: "Ambarado", percentage: 80, color: "bg-yellow-700" },
      { name: "Especiado (Pimienta)", percentage: 75, color: "bg-zinc-600" },
      { name: "Dulce (Vainilla/Haba Tonka)", percentage: 60, color: "bg-amber-600" },
    ],
    timeOfDay: ["Día"], // updated slightly to reflect new usage logic
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
  },
  {
    id: 2,
    name: "Rosa Imperial",
    gender: "Femenino",
    description: "Fragancia floral con pétalos de rosa y jazmín",
    fullDescription:
      "Rosa Imperial captura la esencia de un jardín en plena floración. Las notas de apertura de lichi y pera crean una entrada fresca y delicada, mientras el corazón revela una opulenta rosa de Bulgaria entretejida con jazmín y iris. La base de sándalo blanco y almizcle añade una femineidad atemporal.",
    price: 9800,
    image: "/hero-bg.png",
    isBestseller: false,
    scentNotes: [
      { name: "Lichi", intensity: 7 },
      { name: "Pera", intensity: 6 },
      { name: "Bergamota", intensity: 8 },
      { name: "Rosa de Bulgaria", intensity: 10 },
      { name: "Jazmín", intensity: 9 },
      { name: "Iris", intensity: 7 },
      { name: "Sándalo Blanco", intensity: 8 },
      { name: "Almizcle", intensity: 6 },
      { name: "Pachulí", intensity: 5 },
    ],
    mainAccords: [
      { name: "Floral", percentage: 98, color: "bg-rose-500" },
      { name: "Frutal", percentage: 80, color: "bg-pink-400" },
      { name: "Polvoroso", percentage: 65, color: "bg-rose-300" },
      { name: "Amaderado", percentage: 55, color: "bg-amber-700" },
      { name: "Almizcle", percentage: 45, color: "bg-stone-400" },
    ],
    timeOfDay: ["Día"],
    style: "Romántico & Floral",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Primeras Citas", "Celebraciones"],
  },
  {
    id: 3,
    name: "Oud Dorado",
    gender: "Unisex",
    description: "Esencia oriental con oud, sándalo y especias",
    fullDescription:
      "Oud Dorado es un viaje sensorial hacia el corazón de Medio Oriente. La explosiva apertura de azafrán y cardamomo anuncia un corazón resinoso de oud puro y rosa turca. La base de sándalo de Mysore, ámbar y benjuí envuelve la piel en una calidez que perdura horas.",
    price: 15200,
    image: "/hero-bg.png",
    isBestseller: true,
    scentNotes: [
      { name: "Azafrán", intensity: 9 },
      { name: "Cardamomo", intensity: 8 },
      { name: "Bergamota", intensity: 7 },
      { name: "Oud", intensity: 10 },
      { name: "Rosa Turca", intensity: 8 },
      { name: "Resina", intensity: 7 },
      { name: "Sándalo de Mysore", intensity: 9 },
      { name: "Ámbar", intensity: 8 },
      { name: "Benjuí", intensity: 6 },
    ],
    mainAccords: [
      { name: "Oud", percentage: 100, color: "bg-yellow-800" },
      { name: "Ambarado", percentage: 88, color: "bg-yellow-600" },
      { name: "Especiado", percentage: 80, color: "bg-orange-700" },
      { name: "Resinoso", percentage: 72, color: "bg-amber-900" },
      { name: "Floral", percentage: 50, color: "bg-rose-500" },
    ],
    timeOfDay: ["Noche"],
    style: "Oriental & Exótico",
    climate: ["Otoño", "Invierno"],
    occasions: ["Ocasiones Especiales", "Noches de Gala", "Arte & Cultura"],
  },
  {
    id: 4,
    name: "Brisa Marina",
    gender: "Unisex",
    description: "Frescura cítrica con notas de bergamota y sal marina",
    fullDescription:
      "Brisa Marina evoca la libertad del océano abierto al primer amanecer. La apertura cítrica de bergamota y limón siciliano se funde con una brisa de sal marina y notas acuáticas. El corazón de madera de driftwood y flores blancas añade profundidad antes de llegar a la base limpia de almizcle marino.",
    price: 8500,
    image: "/hero-bg.png",
    isBestseller: false,
    scentNotes: [
      { name: "Bergamota", intensity: 9 },
      { name: "Limón Siciliano", intensity: 8 },
      { name: "Sal Marina", intensity: 7 },
      { name: "Notas Acuáticas", intensity: 9 },
      { name: "Driftwood", intensity: 6 },
      { name: "Flores Blancas", intensity: 7 },
      { name: "Almizcle Marino", intensity: 8 },
      { name: "Cedro", intensity: 6 },
      { name: "Ámbar Blanco", intensity: 5 },
    ],
    mainAccords: [
      { name: "Acuático", percentage: 95, color: "bg-cyan-500" },
      { name: "Cítrico", percentage: 88, color: "bg-yellow-400" },
      { name: "Marino", percentage: 80, color: "bg-blue-500" },
      { name: "Fresco", percentage: 75, color: "bg-sky-400" },
      { name: "Amaderado", percentage: 50, color: "bg-amber-700" },
    ],
    timeOfDay: ["Día"],
    style: "Fresco & Libre",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Actividades al Aire Libre", "Viajes"],
  },
  {
    id: 5,
    name: "Vetiver Noche",
    gender: "Masculino",
    description: "Masculinidad sofisticada con vetiver y cuero",
    fullDescription:
      "Vetiver Noche es la expresión máxima de la masculinidad contemporánea. La apertura ahumada con toques de pomelo crea un contraste fascinante con el corazón de vetiver haitiano y especias oscuras. La base de cuero, labdanum y madera de guayaco construye una estela poderosa e inconfundible.",
    price: 11000,
    image: "/hero-bg.png",
    isBestseller: true,
    scentNotes: [
      { name: "Pomelo", intensity: 7 },
      { name: "Notas Ahumadas", intensity: 9 },
      { name: "Pimienta Roja", intensity: 8 },
      { name: "Vetiver Haitiano", intensity: 10 },
      { name: "Geranio", intensity: 6 },
      { name: "Especias Oscuras", intensity: 9 },
      { name: "Cuero", intensity: 8 },
      { name: "Labdanum", intensity: 7 },
      { name: "Madera de Guayaco", intensity: 8 },
    ],
    mainAccords: [
      { name: "Terroso", percentage: 92, color: "bg-stone-500" },
      { name: "Ahumado", percentage: 85, color: "bg-slate-600" },
      { name: "Cuero", percentage: 78, color: "bg-amber-800" },
      { name: "Especiado", percentage: 70, color: "bg-orange-700" },
      { name: "Amaderado", percentage: 65, color: "bg-amber-700" },
    ],
    timeOfDay: ["Noche"],
    style: "Potente & Misterioso",
    climate: ["Otoño", "Invierno"],
    occasions: ["Trabajo Ejecutivo", "Eventos Nocturnos", "Conferencias"],
  },
  {
    id: 6,
    name: "Flor de Azahar",
    gender: "Femenino",
    description: "Delicadeza natural con azahar y musk blanco",
    fullDescription:
      "Flor de Azahar es un susurro perfumado que evoca jardines mediterráneos al atardecer. La apertura de mandarina y neroli deriva suavemente hacia un corazón de azahar, magnolia y peonía. La base de musk blanco, madera de cachemira y vainilla sutil envuelve la piel como una brisa tibia.",
    price: 9200,
    image: "/hero-bg.png",
    isBestseller: false,
    scentNotes: [
      { name: "Mandarina", intensity: 8 },
      { name: "Neroli", intensity: 9 },
      { name: "Bergamota Rosa", intensity: 7 },
      { name: "Azahar", intensity: 10 },
      { name: "Magnolia", intensity: 8 },
      { name: "Peonía", intensity: 7 },
      { name: "Musk Blanco", intensity: 6 },
      { name: "Madera de Cachemira", intensity: 7 },
      { name: "Vainilla Suave", intensity: 5 },
    ],
    mainAccords: [
      { name: "Floral Blanco", percentage: 96, color: "bg-pink-200" },
      { name: "Cítrico", percentage: 82, color: "bg-yellow-400" },
      { name: "Almizcle", percentage: 68, color: "bg-stone-400" },
      { name: "Polvoroso", percentage: 55, color: "bg-rose-300" },
      { name: "Amaderado", percentage: 45, color: "bg-amber-700" },
    ],
    timeOfDay: ["Día"],
    style: "Delicado & Natural",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Brunch", "Jardines & Naturaleza"],
  },
];

// aca se cargan los productos que se muestran en la pagina principal.