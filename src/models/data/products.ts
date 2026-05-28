export interface Product {
  id: number;
  name: string;
  category: "gafas" | "lentes";
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isBestSeller: boolean;
  description: string;
  brand?: string;
  material?: string;
  color?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Gafas Ray-Ban Aviador Clásicas",
    category: "gafas",
    price: 659900,
    originalPrice: 829900,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3OTQwMDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 234,
    isBestSeller: true,
    description: "Icónicas gafas de sol con protección UV400",
    brand: "Ray-Ban",
    material: "Metal",
    color: "Dorado/Verde"
  },
  {
    id: 2,
    name: "Lentes de Contacto Mensuales Acuvue",
    category: "lentes",
    price: 124900,
    image: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk0MDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 512,
    isBestSeller: true,
    description: "Colocación fácil y cómoda para uso prolongado",
    brand: "Acuvue"
  },
  {
    id: 3,
    name: "Gafas Oakley Deportivas",
    category: "gafas",
    price: 789900,
    image: "https://images.unsplash.com/photo-1610136649349-0f646f318053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3OTQwMDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 189,
    isBestSeller: true,
    description: "Perfectas para actividades deportivas con lentes polarizadas",
    brand: "Oakley",
    material: "Policarbonato",
    color: "Negro/Rojo"
  },
  {
    id: 4,
    name: "Lentes de Contacto Diarias FreshLook",
    category: "lentes",
    price: 104900,
    originalPrice: 139900,
    image: "https://images.unsplash.com/photo-1516220362602-dba5272034e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk0MDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 423,
    isBestSeller: true,
    description: "Transparentes y suaves, aplicación sencilla en tu dedo",
    brand: "FreshLook"
  },
  {
    id: 5,
    name: "Gafas Graduadas Marco Metálico",
    category: "gafas",
    price: 374900,
    image: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVnbGFzc2VzJTIwb3B0aWNhbCUyMGZyYW1lcyUyMG1vZGVybnxlbnwxfHx8fDE3Nzk0MDAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 156,
    isBestSeller: false,
    description: "Elegantes gafas graduadas con marco ligero",
    material: "Titanio",
    color: "Plata"
  },
  {
    id: 6,
    name: "Gafas Wayfarer Modernas",
    category: "gafas",
    price: 539900,
    image: "https://images.unsplash.com/photo-1556306510-31ca015374b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxleWVnbGFzc2VzJTIwb3B0aWNhbCUyMGZyYW1lcyUyMG1vZGVybnxlbnwxfHx8fDE3Nzk0MDAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 298,
    isBestSeller: false,
    description: "Diseño clásico reinventado con estilo contemporáneo",
    material: "Acetato",
    color: "Negro Mate"
  },
  {
    id: 7,
    name: "Lentes de Contacto Tóricas Astigmatismo",
    category: "lentes",
    price: 166900,
    image: "https://images.unsplash.com/photo-1587910234573-d6fc84743bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk0MDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 267,
    isBestSeller: false,
    description: "Diseño Turin-Gray, efecto natural de 14.2mm con 38% de agua",
    brand: "EyeShare"
  },
  {
    id: 8,
    name: "Gafas de Lectura Minimalistas",
    category: "gafas",
    price: 207900,
    originalPrice: 291900,
    image: "https://images.unsplash.com/photo-1534078477103-9f6a18b3a5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxleWVnbGFzc2VzJTIwb3B0aWNhbCUyMGZyYW1lcyUyMG1vZGVybnxlbnwxfHx8fDE3Nzk0MDAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4,
    reviews: 145,
    isBestSeller: false,
    description: "Diseño elegante y ligero para uso diario",
    material: "Acetato",
    color: "Transparente"
  },
  {
    id: 9,
    name: "Lentes de Contacto Multifocales",
    category: "lentes",
    price: 187900,
    image: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk0MDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 178,
    isBestSeller: false,
    description: "Perfectas para visión de cerca y lejos, fácil aplicación",
    brand: "Air Optix"
  },
  {
    id: 10,
    name: "Gafas de Sol Polarizadas Premium",
    category: "gafas",
    price: 707900,
    image: "https://images.unsplash.com/photo-1611222777277-61319d63ca94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3OTQwMDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 345,
    isBestSeller: false,
    description: "Máxima protección con estilo exclusivo",
    material: "Acetato Premium",
    color: "Negro/Gris"
  },
  {
    id: 11,
    name: "Lentes de Contacto de Color",
    category: "lentes",
    price: 145900,
    image: "https://images.unsplash.com/photo-1564278692313-b2d65996fc93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk0MDAzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.3,
    reviews: 234,
    isBestSeller: false,
    description: "Colección rosa y gris, efecto natural y vibrante",
    brand: "FreshLook ColorBlends"
  },
  {
    id: 12,
    name: "Gafas Retro Vintage",
    category: "gafas",
    price: 416900,
    image: "https://images.unsplash.com/photo-1603578119639-798b8413d8d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxleWVnbGFzc2VzJTIwb3B0aWNhbCUyMGZyYW1lcyUyMG1vZGVybnxlbnwxfHx8fDE3Nzk0MDAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 189,
    isBestSeller: false,
    description: "Inspiradas en la moda de los años 70",
    material: "Acetato",
    color: "Marrón Tortuga"
  }
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
