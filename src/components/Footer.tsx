export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08]">
      <div className="max-w-[1120px] mx-auto px-6 py-[34px] flex flex-wrap items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-[10px] font-bold">
          <span className="grid place-items-center w-8 h-8 rounded-[10px] border border-white/[0.14] bg-gradient-to-br from-white/[0.14] to-white/[0.02] font-extrabold text-sm tracking-[-0.04em]">
            EM
          </span>
          <span className="text-sm text-[#C9C9C9]">Evan Morales</span>
        </a>
        <div className="flex flex-wrap gap-[22px] text-sm text-[#8A8A8A]">
          <a href="#about" className="hover:text-white transition-colors">
            Sobre mí
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Proyectos
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contacto
          </a>
        </div>
        <div className="text-[13px] text-[#5A5A5A]">© 2026 Evan Morales</div>
      </div>
    </footer>
  );
}
