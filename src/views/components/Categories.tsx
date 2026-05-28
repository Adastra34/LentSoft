import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const sunglassesImage = "https://images.unsplash.com/photo-1610136649349-0f646f318053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3Nzk5MTYwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const contactLensesImage = "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVuc2VzJTIwZXllJTIwY2FyZXxlbnwxfHx8fDE3Nzk5MTYwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080";

interface CategoriesProps {
  textSize: number;
}

const categories = [
  {
    id: 1,
    name: "Gafas de sol",
    image: sunglassesImage,
    alt: "Gafas de sol para protección UV",
    link: "/categoria/gafas-sol"
  },
  {
    id: 2,
    name: "Gafas oftálmicas",
    image: "https://images.unsplash.com/photo-1617791932882-a70117e3564d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpY2FsJTIwZ2xhc3NlcyUyMGZyYW1lc3xlbnwxfHx8fDE3NzM4Njk2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Gafas oftálmicas para corrección visual",
    link: "/categoria/gafas-oftalmicas"
  },
  {
    id: 3,
    name: "Lentes de contacto",
    image: contactLensesImage,
    alt: "Lentes de contacto para uso diario",
    link: "/categoria/lentes"
  },
  {
    id: 4,
    name: "Sale",
    image: "https://images.unsplash.com/photo-1607083207685-aaf05f2c908c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlJTIwZGlzY291bnQlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NzM4Njk2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Ofertas y descuentos especiales",
    link: "/categoria/sale"
  }
];

export function Categories({ textSize }: CategoriesProps) {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 
        className="text-3xl md:text-4xl text-purple-900 mb-10 text-center"
        style={{ fontSize: `${textSize * 2.25}rem` }}
      >
        Nuestras Categorías
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/60 backdrop-blur-sm shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
            aria-label={`Ver categoría ${category.name}`}
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-purple-50">
              <ImageWithFallback
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span 
              className="text-purple-900 text-center"
              style={{ fontSize: `${textSize * 1.125}rem` }}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}