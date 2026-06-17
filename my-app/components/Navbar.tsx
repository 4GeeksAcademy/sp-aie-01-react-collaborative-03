import Link from "next/link";

interface RouteData {
    path: string,
    displayText: string;
}

const routes: RouteData[] = [
     {
        path: "catalog",
        displayText: "Catalogo gatuno"
    },
    {
        path: "Formulario",
        displayText: "Formulario"
    },
    {
        path: "formulario-sergiomb",
        displayText: "Formulario SergioMB",
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
]

const Navbar = () => {
    return (
        <nav className="relative flex items-center h-20 border-b border-black/10 px-8 border-b-1 border-white/20">
            {/* Logo */}
            <div className="select-none">
                <Link href="/">
                    <span className="text-amber-400 text-3xl font-black tracking-wider">
                        GATITOS CUTE
                    </span>
                </Link>
            </div>

            {/* Rutas centradas */}
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-10">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        href={`/${route.path}`}
                        className="font-medium text-white hover:text-amber-500 transition-colors duration-200"
                    >
                        {route.displayText}
                    </Link>
                ))}
            </div>
        </nav>
    );
};


export default Navbar;