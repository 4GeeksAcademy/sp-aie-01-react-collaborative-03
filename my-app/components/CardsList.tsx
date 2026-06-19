"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";

interface Cat {
  id: string;
}

interface TagSectionProps {
  tag: string;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M12 21s-6.716-4.373-9.428-8.57C.678 9.492 2.004 5.5 5.5 5.5c2.043 0 3.362 1.118 4.11 2.192a.5.5 0 0 0 .78 0C11.139 6.618 12.457 5.5 14.5 5.5c3.496 0 4.822 3.992 2.928 6.93C18.716 16.627 12 21 12 21z" />
  </svg>
);

const TagSection = ({ tag }: TagSectionProps) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://cataas.com/api/cats?tags=${tag}`
        );

        if (!res.ok) {
          throw new Error("No se pudieron cargar los gatos");
        }

        const data = await res.json();

        setCats(data.slice(0, 8));
      } catch (err) {
        setError("Error cargando imágenes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [tag]);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">{tag}</h2>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
          {cats.length} gatos
        </span>
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-zinc-200"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-square">
                <Image
                  src={`https://cataas.com/cat/${cat.id}`}
                  alt={`Cat ${cat.id}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  onClick={() => toggleFavorite(cat.id)}
                  className={`absolute right-2 top-2 rounded-full p-2 transition-colors ${
                    isFavorite(cat.id)
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-zinc-700 hover:bg-white"
                  }`}
                  aria-label={
                    isFavorite(cat.id)
                      ? `Quitar ${cat.id} de favoritos`
                      : `Agregar ${cat.id} a favoritos`
                  }
                >
                  <HeartIcon filled={isFavorite(cat.id)} />
                </button>
              </div>

              <div className="p-3">
                <p className="truncate text-sm text-zinc-500">
                  ID: {cat.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default function CardsList() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTags() {
      try {
        const res = await fetch("https://cataas.com/api/tags");

        if (!res.ok) {
          throw new Error("Error al obtener tags");
        }

        const data: string[] = await res.json();

        // Índices 10 a 20 (incluyendo el 20)
        const selectedTags = data.slice(10, 21);

        setTags(selectedTags);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTags();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl">
        <p>Cargando categorías...</p>
      </main>
    );
  }

  return (
  <main className="min-h-screen w-full bg-zinc-950 text-white space-y-12">
    {tags.map((tag) => (
      <TagSection key={tag} tag={tag} />
    ))}
  </main>
);
}