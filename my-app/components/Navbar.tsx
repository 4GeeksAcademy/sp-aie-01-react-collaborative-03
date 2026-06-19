"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

interface RouteData {
    path: string,
    displayText: string;
}

const navRoutes: RouteData[] = [
    {
        path: "catalog",
        displayText: "Catalogo gatuno"
    },
    {
        path: "formulario-sergiomb",
        displayText: "Formulario SergioMB",
    }
];

const dropdownRoutes: RouteData[] = [
    {
        path: "Formulario",
        displayText: "Formulario",
    },
    {
        path: "catalogo-jonathan",
        displayText: "Cat. Jonathan",
    },
    {
        path: "catalogo-sergio",
        displayText: "Cat. Sergio Hernández",
    },
    {
        path: "catalogo-sergiomb",
        displayText: "Cat. Sergio MB",
    }
];

const Navbar = () => {
    const { favoritesCount } = useFavorites();

    return (
        <nav className="relative z-40 flex items-center h-20 bg-black border-b border-black/10 px-8 border-b-1 border-white/20">
            {/* Logo */}
            <div className="select-none">
                <Link href="/">
                    <span className="text-amber-400 text-3xl font-black tracking-wider">
                        GATITOS CUTE
                    </span>
                </Link>
            </div>

            {/* Rutas centradas */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
                {navRoutes.map((route) => (
                    <Link
                        key={route.path}
                        href={`/${route.path}`}
                        className="relative font-medium text-white hover:text-amber-500 transition-colors duration-200"
                    >
                        {route.displayText}
                    </Link>
                ))}

                <div className="group relative">
                    <button
                        type="button"
                        className="font-medium text-white hover:text-amber-500 transition-colors duration-200"
                    >
                        Mas rutas
                    </button>

                    <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/20 bg-zinc-900 p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        {dropdownRoutes.map((route) => (
                            <Link
                                key={route.path}
                                href={`/${route.path}`}
                                className="block rounded-lg px-3 py-2 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-amber-400"
                            >
                                {route.displayText}
                            </Link>
                        ))}
                    </div>
                </div>

                <Link
                    href="/favoritos"
                    className="relative font-medium text-white hover:text-amber-500 transition-colors duration-200"
                >
                    Favoritos
                    <span className="ml-2 inline-flex min-w-6 justify-center rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-zinc-900">
                        {favoritesCount}
                    </span>
                </Link>
            </div>
        </nav>
    );
};


export default Navbar;