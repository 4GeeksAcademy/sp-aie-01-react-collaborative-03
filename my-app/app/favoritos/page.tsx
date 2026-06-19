"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritosPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start bg-zinc-950 text-white pt-8">
      <main className="w-full max-w-7xl p-6 space-y-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Mis Favoritos</h1>
            <p className="text-zinc-300">{favorites.length} gatitos guardados</p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="rounded-lg border border-red-300 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20"
            >
              Limpiar favoritos
            </button>
          )}
        </header>

        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8 text-center">
            <p className="mb-4 text-zinc-300">Aun no tienes favoritos seleccionados.</p>
            <Link
              href="/catalog"
              className="inline-flex rounded-lg bg-amber-400 px-4 py-2 font-semibold text-zinc-900 transition-colors hover:bg-amber-300"
            >
              Ir al catalogo
            </Link>
          </div>
        ) : (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Lista de favoritos</h2>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                {favorites.length} gatos
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {favorites.map((catId) => (
                <article
                  key={catId}
                  className="group overflow-hidden rounded-2xl border bg-white text-zinc-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={`https://cataas.com/cat/${catId}`}
                      alt={`Cat ${catId}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      onClick={() => removeFavorite(catId)}
                      className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white transition-colors hover:bg-red-500"
                      aria-label={`Borrar ${catId} de favoritos`}
                      title="Borrar de favoritos"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-3">
                    <p className="truncate text-sm text-zinc-500">ID: {catId}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
