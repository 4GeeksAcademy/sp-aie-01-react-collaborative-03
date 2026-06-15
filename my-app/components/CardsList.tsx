"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TagSection = ({ tag }: TagSectionProps) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <main className="mx-auto max-w-7xl p-6">
        <p>Cargando categorías...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-12 p-6">
      <header>
        <h1 className="text-4xl font-bold">🐱 Cat Gallery</h1>
      </header>

      {tags.map((tag) => (
        <TagSection key={tag} tag={tag} />
      ))}
    </main>
  );
}