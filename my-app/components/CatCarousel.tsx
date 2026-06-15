"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1600&q=80",
    alt: "Gato naranja descansando sobre una manta",
    title: "Siestas con estilo",
    subtitle: "Tu dosis diaria de tranquilidad felina.",
  },
  {
    src: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1600&q=80",
    alt: "Gato mirando fijamente a la camara",
    title: "Curiosidad infinita",
    subtitle: "Cada esquina de casa es una nueva aventura.",
  },
  {
    src: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1600&q=80",
    alt: "Gato con pelaje gris sentado frente a una ventana",
    title: "Ventanas y vigilancia",
    subtitle: "Observadores profesionales del barrio.",
  },
  {
    src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1600&q=80",
    alt: "Gato blanco y negro acostado en un sofa",
    title: "Descanso premium",
    subtitle: "Confort absoluto en cualquier rincon.",
  },
];

export function CatCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const goTo = (targetIndex: number) => setIndex(targetIndex);
  const goPrev = () => setIndex((current) => (current - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((current) => (current + 1) % slides.length);

  return (
    <section
      aria-label="Carrusel de gatos"
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-72 w-full sm:h-80 md:h-[420px]">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1100px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
              <h2 className="text-2xl font-bold text-amber-200 md:text-3xl">{slide.title}</h2>
              <p className="mt-2 max-w-xl text-sm text-stone-200 md:text-base">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={goPrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/25 bg-stone-900/70 px-3 py-2 text-sm font-semibold text-white transition hover:border-amber-200/70 hover:text-amber-200"
        >
          ◀
        </button>

        <button
          type="button"
          aria-label="Siguiente imagen"
          onClick={goNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/25 bg-stone-900/70 px-3 py-2 text-sm font-semibold text-white transition hover:border-amber-200/70 hover:text-amber-200"
        >
          ▶
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 p-4">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Ir a ${slide.title}`}
            aria-current={slideIndex === index}
            className={`h-2.5 rounded-full transition ${
              slideIndex === index ? "w-8 bg-amber-300" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
