import CardsList from "@/components/CardsList";
// 1. Importamos tu catálogo (usamos la ruta relativa correcta)
import CatalogoJonathanPage from "../catalogo-jonathan/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-zinc-950 text-white font-sans pt-8">
      <main className="p-6 w-full max-w-7xl space-y-16">
        
        {/* ========================================================
            SECCIÓN 1: GALERÍA GENERAL DE TUS COMPAÑEROS
           ======================================================== */}
        <section className="space-y-6">
          <header className="mb-8 flex flex-col gap-1">
            <h1 className="text-5xl font-bold">Galería Gatuna 😻</h1>
            <p className="text-lg text-gray-300">
              ¡Aquí podrás disfrutar de algunas imagenes de gatos recogidos de una API externa para prácticar consumo y renderizado en React!
            </p>
          </header>
          
          <CardsList />
        </section>

        {/* Línea divisoria elegante para separar los entornos de prueba */}
        <div className="border-t border-zinc-800 my-12" />

        {/* ========================================================
            SECCIÓN 2: ENTORNO DE PRUEBAS - TU CATÁLOGO
           ======================================================== */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-10 shadow-xl backdrop-blur">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-300 uppercase">
                Área de Pruebas
              </span>
              <h2 className="text-3xl font-bold mt-2 text-zinc-100">Vista del Componente Jonathan</h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-xs text-left md:text-right">
              Validación de consumo de <strong>The Cat API</strong> con filtros activos.
            </p>
          </div>

          {/* Renderizamos tu catálogo aislado */}
          <div className="text-zinc-100">
            <CatalogoJonathanPage />
          </div>
        </section>

      </main>
    </div>
  );
}
