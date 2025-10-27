import { CandleIcon } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-8 lg:px-20 py-8 border-t border-accent">
        <div className="max-w-7xl mx-auto flex gap-6 flex-wrap items-center justify-center text-highlight">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-colors"
            href="#"
          >
            <CandleIcon size={20} color="#885d14" className="w-6 h-6" />
            Acerca de nosotros
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-purple-800 dark:hover:text-pink-200 transition-colors"
            href="#"
          >
            <CandleIcon size={20} color="#885d14" className="w-6 h-6" />
            Colecciones
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-purple-800 dark:hover:text-pink-200 transition-colors"
            href="#"
          >
            <CandleIcon size={20} color="#885d14" className="w-6 h-6" />
            Contacto →
          </a>
        </div>
      </footer>
  )
}