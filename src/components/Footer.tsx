"use client";

import Image from "next/image";
import { socials } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 border-t border-[rgb(var(--tint)/0.08)]">
      <div className="max-w-[1120px] mx-auto px-6 py-[34px] flex flex-wrap items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-[11px] font-bold">
          <span className="relative grid place-items-center w-8 h-8 overflow-hidden rounded-[10px] border border-[rgb(var(--tint)/0.14)] bg-white shadow-[inset_0_1px_0_rgba(0,0,0,0.06)]">
            <Image
              src="/logo/Logo-Dark.png"
              alt="Logo Evan Morales"
              width={26}
              height={26}
              className="object-contain"
            />
          </span>
          <span className="text-sm text-[var(--c-fg-2)]">Evan Morales</span>
        </a>
        <div className="flex flex-wrap gap-[22px] text-sm text-[var(--c-muted)]">
          <a href="#about" className="hover:text-[var(--c-fg)] transition-colors">
            {t.footer.links.about}
          </a>
          <a href="#skills" className="hover:text-[var(--c-fg)] transition-colors">
            {t.footer.links.skills}
          </a>
          <a href="#projects" className="hover:text-[var(--c-fg)] transition-colors">
            {t.footer.links.projects}
          </a>
          <a href="#contact" className="hover:text-[var(--c-fg)] transition-colors">
            {t.footer.links.contact}
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
        <div className="text-[13px] text-[var(--c-faint)]">{t.footer.rights}</div>
      </div>
    </footer>
  );
}
