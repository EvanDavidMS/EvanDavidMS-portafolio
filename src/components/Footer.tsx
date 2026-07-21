import { socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgb(var(--tint)/0.08)]">
      <div className="max-w-[1120px] mx-auto px-6 py-[34px] flex flex-wrap items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-[10px] font-bold">
          <span className="grid place-items-center w-8 h-8 rounded-[10px] border border-[rgb(var(--tint)/0.14)] bg-gradient-to-br from-[rgb(var(--tint)/0.14)] to-[rgb(var(--tint)/0.02)] font-extrabold text-sm tracking-[-0.04em]">
            EM
          </span>
          <span className="text-sm text-[var(--c-fg-2)]">Evan Morales</span>
        </a>
        <div className="flex flex-wrap gap-[22px] text-sm text-[var(--c-muted)]">
          <a href="#about" className="hover:text-[var(--c-fg)] transition-colors">
            Sobre mí
          </a>
          <a href="#skills" className="hover:text-[var(--c-fg)] transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-[var(--c-fg)] transition-colors">
            Proyectos
          </a>
          <a href="#contact" className="hover:text-[var(--c-fg)] transition-colors">
            Contacto
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-sm text-[var(--c-muted)]">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--c-fg)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="text-[13px] text-[var(--c-faint)]">© 2026 Evan Morales</div>
      </div>
    </footer>
  );
}
