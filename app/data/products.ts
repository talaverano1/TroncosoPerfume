export interface Product {
  id: number;
  name: string;
  gender: "Masculino" | "Femenino" | "Unisex";
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  isBestseller: boolean;
  scentNotes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  style: string;
  climate: string[];
  occasions: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Noir Élégance",
    gender: "Masculino",
    description: "Notas amaderadas con un toque de vainilla y ámbar",
    fullDescription:
      "Noir Élégance es un homenaje a la sofisticación nocturna. Su apertura intensa de bergamota da paso a un corazón de madera de cedro y violeta, que se asienta sobre una base cálida de vainilla bourbon, ámbar gris y musgo. Una fragancia para el hombre que busca dejar una huella imborrable.",
    price: 12500,
    image: "/hero-bg.png",
    isBestseller: true,
    scentNotes: {
      top: ["Bergamota", "Pimienta Negra"],
      heart: ["Cedro", "Violeta", "Cuero"],
      base: ["Vainilla", "Ámbar", "Musgo de Roble"],
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
    scentNotes: {
      top: ["Lichi", "Pera", "Bergamota"],
      heart: ["Rosa de Bulgaria", "Jazmín", "Iris"],
      base: ["Sándalo Blanco", "Almizcle", "Pachulí"],
    },
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
    scentNotes: {
      top: ["Azafrán", "Cardamomo", "Bergamota"],
      heart: ["Oud", "Rosa Turca", "Resina"],
      base: ["Sándalo de Mysore", "Ámbar", "Benjuí"],
    },
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
    scentNotes: {
      top: ["Bergamota", "Limón Siciliano", "Sal Marina"],
      heart: ["Notas Acuáticas", "Driftwood", "Flores Blancas"],
      base: ["Almizcle Marino", "Cedro", "Ámbar Blanco"],
    },
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
    scentNotes: {
      top: ["Pomelo", "Notas Ahumadas", "Pimienta Roja"],
      heart: ["Vetiver Haitiano", "Geranio", "Especias Oscuras"],
      base: ["Cuero", "Labdanum", "Madera de Guayaco"],
    },
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
    scentNotes: {
      top: ["Mandarina", "Neroli", "Bergamota Rosa"],
      heart: ["Azahar", "Magnolia", "Peonía"],
      base: ["Musk Blanco", "Madera de Cachemira", "Vainilla Suave"],
    },
    style: "Delicado & Natural",
    climate: ["Primavera", "Verano"],
    occasions: ["Uso Diario", "Brunch", "Jardines & Naturaleza"],
  },
];

// aca se cargan los productos que se muestran en la pagina principal.