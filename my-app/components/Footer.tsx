import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-white/20 px-8 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <p className="text-sm text-white/50 text-center">
                    © {new Date().getFullYear()} GATITOS CUTE. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;