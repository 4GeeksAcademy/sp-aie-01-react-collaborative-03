'use client';

import { useState, useEffect } from 'react';

// 1. Declaramos la interfaz exacta que maneja tu equipo
interface Cat {
  _id?: string;
  id?: string;
}

export default function CatalogoJonathanPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

          // Consumimos CATAAS por medio del proxy local para evitar bloqueos de navegador
          const res = await fetch("/api/gatos-externos/api/cats");

        if (!res.ok) {
          throw new Error("No se pudieron cargar los gatos");
        }

        const data: Cat[] = await res.json();

        // 3. Tomamos una porción diferente de gatos (ej. los primeros 8) para que sea TU catálogo propio
        setCats(data.slice(0, 8));
      } catch (err) {
        setError("Error cargando imágenes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 font-sans text-zinc-100">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-300 mb-2">🐾 Catálogo de Jonathan</h2>
        <p className="text-sm text-zinc-400">Renderizando con éxito en Firefox usando la configuración del equipo</p>
      </header>

      {/* Estados visuales de carga o error */}
      {loading && <p className="text-center text-zinc-400 animate-pulse">Cargando tus imágenes...</p>}
      {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">⚠️ {error}</p>}

      {/* Grilla visual idéntica adaptada con Tailwind */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cats.map((cat) => {
            // Evaluamos cuál propiedad de ID responde la API para no romper la URL de la imagen
            const catId = cat._id || cat.id;

            if (!catId) return null;

            return (
              <div key={catId} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:-translate-y-1 hover:border-amber-400/30">
                <div className="relative w-full h-48 bg-zinc-800">
                  <img
                    src={`/api/gatos-externos/cat/${catId}`}
                    alt="Gato del catálogo de Jonathan"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-zinc-900 border-t border-zinc-800">
                  <p className="truncate text-[10px] text-zinc-500 font-mono">ID: {catId}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
