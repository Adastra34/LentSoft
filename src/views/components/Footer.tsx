import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

interface FooterProps {
  textSize: number;
}

export function Footer({ textSize }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-purple-100/80 to-purple-200/80 backdrop-blur-sm mt-16 border-t border-purple-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y Métodos de Pago */}
          <div>
            <h3 
              className="font-bold text-purple-900 mb-4"
              style={{ fontSize: `${textSize * 1.25}rem` }}
            >
              LentSoft
            </h3>
            <p 
              className="text-purple-700 mb-4"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              Especialistas en óptica y salud visual
            </p>
            <div className="mb-4">
              <p 
                className="text-purple-900 font-semibold mb-2"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                Aceptamos:
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white px-3 py-2 rounded-lg border border-purple-200">
                  <CreditCard className="w-6 h-6 text-purple-700" />
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-purple-200">
                  <span className="text-purple-900 font-bold text-sm">VISA</span>
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-purple-200">
                  <span className="text-purple-900 font-bold text-sm">MC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 
              className="font-semibold text-purple-900 mb-4"
              style={{ fontSize: `${textSize}rem` }}
            >
              SERVICIOS
            </h4>
            <ul className="space-y-2">
              {[
                'Examen de vista',
                'Monturas ópticas',
                'Lentes de contacto',
                'Lentes de sol',
                'Personalización de gafas',
                'Ajuste de monturas',
                'Reparaciones'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-purple-700 hover:text-purple-900 transition-colors"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 
              className="font-semibold text-purple-900 mb-4"
              style={{ fontSize: `${textSize}rem` }}
            >
              NOSOTROS
            </h4>
            <ul className="space-y-2">
              {[
                'Quiénes somos',
                'Nuestras tiendas',
                'Garantía',
                'Términos y condiciones',
                'Política de privacidad',
                'Devoluciones y cambios',
                'Preguntas frecuentes'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-purple-700 hover:text-purple-900 transition-colors"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 
              className="font-semibold text-purple-900 mb-4"
              style={{ fontSize: `${textSize}rem` }}
            >
              CONTACTO
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-semibold"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Matriz:
                  </p>
                  <p 
                    className="text-purple-700"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Cra. 15 #93-40, Chicó Norte<br />
                    Bogotá, Colombia
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-semibold"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Teléfono:
                  </p>
                  <p 
                    className="text-purple-700"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    +57 601 234 5678<br />
                    +57 310 456 7890
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <p 
                    className="text-purple-900 font-semibold"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    Email:
                  </p>
                  <p 
                    className="text-purple-700"
                    style={{ fontSize: `${textSize * 0.875}rem` }}
                  >
                    contacto@lentsoft.com
                  </p>
                </div>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="mt-6">
              <p 
                className="text-purple-900 font-semibold mb-3"
                style={{ fontSize: `${textSize * 0.875}rem` }}
              >
                Síguenos:
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="bg-white hover:bg-purple-100 p-2 rounded-full transition-colors border border-purple-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-purple-700" />
                </a>
                <a
                  href="#"
                  className="bg-white hover:bg-purple-100 p-2 rounded-full transition-colors border border-purple-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-purple-700" />
                </a>
                <a
                  href="#"
                  className="bg-white hover:bg-purple-100 p-2 rounded-full transition-colors border border-purple-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-purple-700" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-300 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              className="text-purple-700"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              © 2026 LentSoft - Cuidamos tu visión. Todos los derechos reservados.
            </p>
            <p 
              className="text-purple-600"
              style={{ fontSize: `${textSize * 0.875}rem` }}
            >
              Versión 1.1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}