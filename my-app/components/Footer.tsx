const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/25 px-8 py-10 text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <p className="text-sm text-white/80 text-center">
                    © {new Date().getFullYear()} GATITOS CUTE. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;