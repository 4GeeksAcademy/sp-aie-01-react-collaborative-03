import Link from "next/link";
import { CatCarousel } from "@/components/CatCarousel";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-stone-950 px-6 py-16 text-stone-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase">
            Mundo Gatuno
          </p>

          <h1 className="max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
            Bienvenido a tu rincón para descubrir y cuidar gatos.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-stone-300 md:text-lg">
            Explora perfiles felinos, consejos de bienestar y guias practicas para
            convivencia responsable. Todo en un solo lugar para amantes de los gatos.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Ver gatos en catalogo
            </Link>
            <Link
              href="#features"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/60 hover:text-amber-200"
            >
              Conocer mas
            </Link>
          </div>
        </section>

        <CatCarousel />

        <section id="features" className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-amber-200">Adopcion responsable</h2>
            <p className="mt-2 text-sm text-stone-300">
              Encuentra gatos listos para un hogar con informacion clara y completa.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-amber-200">Cuidados diarios</h2>
            <p className="mt-2 text-sm text-stone-300">
              Aprende sobre alimentacion, salud y rutina para su bienestar.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-amber-200">Comunidad felina</h2>
            <p className="mt-2 text-sm text-stone-300">
              Comparte experiencias y conecta con otras personas amantes de los gatos.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
