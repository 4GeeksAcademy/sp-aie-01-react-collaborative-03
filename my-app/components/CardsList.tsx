"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// ==========================================
// 1. DEFINICIÓN DE INTERFACES PARA TYPESCRIPT
// ==========================================
interface Cat {
  _id: string; // La API CATAAS usa '_id' con guion bajo en su respuesta JSON
  id: string;  // Mapeamos ambos por si la estructura cambia
  tags: string[];
}

interface TagSectionProps {
  tag: string;
}

const TagSection = ({ tag }: TagSectionProps) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        // Hacemos el fetch a la API CATAAS filtrando por etiquetas (tags)
        const res = await fetch(
          `https://cataas.com/api/cats?tags=${tag}`
        );

        if (!res.ok) {
          throw new Error("No se pudieron cargar los gatos");
        }

        const data = await res.json();

        // Guardamos solo los primeros 8 gatos de esa categoría
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
        {/* Nombre de la Categoría */}
        <h2 className="text-2xl font-bold capitalize text-amber-200">{tag}</h2>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 border border-zinc-700">
          {cats.length} gatos
        </span>
      </div>

      {/* Esqueleto de Carga Animado (Pulse Effect) */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-xl bg-zinc-800"
            />
          ))}
        </div>
      )}

      {/* Manejo de Alertas de Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Renderizado de la Cuadrícula de Tarjetas Felinas */}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((cat) => {
            // CATAAS a veces devuelve la propiedad de ID como _id o id
            const catId = cat._id || cat.id;

            return (
              <div
                key={catId}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-amber-400/40"
              >
                <div className="relative aspect-square">
                  <Image
                    src={`https://cataas.com/cat/${catId}`}
                    alt={`Gato de la categoría ${tag}`}
                    fill
                    sizes="(max-w-7xl) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-3 bg-zinc-900 border-t border-zinc-800">
                  <p className="truncate text-xs text-zinc-400 font-mono">
                    ID: {catId}
                  </p>
                </div>
              </div>
            );
          })}
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

        // Filtramos para traer una selección controlada de categorías (índices 10 a 20)
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
      <div className="mx-auto max-w-7xl text-center py-12">
        <p className="text-lg text-zinc-400 animate-pulse">Cargando categorías felinas...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 bg-transparent text-white">
      {tags.map((tag) => (
        <TagSection key={tag} tag={tag} />
      ))}
    </div>
  );
}
