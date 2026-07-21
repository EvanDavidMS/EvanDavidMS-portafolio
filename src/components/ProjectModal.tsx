"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X, ArrowUpRight, Quote } from "lucide-react";

import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--c-faint)]">
        {label}
      </h4>
      {children}
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = !!project;

  // Pause Lenis smooth-scroll while the modal is open so the page behind it
  // doesn't scroll (Radix also locks scroll; this keeps Lenis in sync).
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    return () => lenis?.start();
  }, [open]);

  const study = project?.study;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-[980px]",
            "max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden",
            "flex flex-col md:flex-row",
            "rounded-3xl border border-[rgb(var(--tint)/0.12)] bg-[var(--c-bg)]",
            "shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] focus:outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-3 data-[state=open]:duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          {project && (
            <>
              {/* left: image (full height on desktop, banner on mobile) */}
              <div className="relative aspect-[16/10] shrink-0 bg-[var(--c-surf)] md:aspect-auto md:w-[42%]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  // load immediately when the modal opens (lazy-loading doesn't
                  // reliably trigger for an image revealed inside a dialog)
                  priority
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover object-top"
                />
                {/* fade the image into the panel edge for a seamless seam */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)]/70 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* right: all the info, no scroll on normal desktop heights */}
              <div className="flex min-w-0 flex-1 flex-col gap-3.5 overflow-y-auto p-6 sm:p-7">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--c-muted)]">
                    {project.category}
                  </span>
                  <DialogPrimitive.Title className="mt-0.5 text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.02em] text-[var(--c-fg)]">
                    {project.title}
                  </DialogPrimitive.Title>
                  {!study && (
                    <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--c-muted)]">
                      {project.desc}
                    </p>
                  )}
                </div>

                {study && (
                  <>
                    <Section label="El reto">
                      <p className="text-[13.5px] leading-[1.55] text-[var(--c-fg-2)]">
                        {study.challenge}
                      </p>
                    </Section>

                    <Section label="Qué hice">
                      <ul className="flex flex-col gap-1.5">
                        {study.work.map((w, i) => (
                          <li
                            key={i}
                            className="flex gap-2.5 text-[13.5px] leading-[1.5] text-[var(--c-fg-2)]"
                          >
                            <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--tint)/0.5)]" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <Section label="Resultado">
                      <div className="flex flex-wrap gap-1.5">
                        {study.results.map((r, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--tint)/0.03)] px-2.5 py-1.5 text-[12px] leading-[1.35] text-[var(--c-fg-2)]"
                          >
                            <span className="text-emerald-400">✓</span>
                            {r}
                          </span>
                        ))}
                      </div>
                    </Section>

                    {study.testimonial && (
                      <figure className="relative rounded-2xl border border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.04)] p-4">
                        <Quote
                          className="absolute right-3 top-3 h-5 w-5 text-[rgb(var(--tint)/0.18)]"
                          aria-hidden
                        />
                        <blockquote className="pr-6 text-[13px] font-medium italic leading-[1.55] text-[var(--c-fg)]">
                          {study.testimonial.quote}
                        </blockquote>
                        <figcaption className="mt-2 text-[12px] text-[var(--c-muted)]">
                          <span className="font-semibold text-[var(--c-fg-2)]">
                            {study.testimonial.author}
                          </span>{" "}
                          — {study.testimonial.role}
                        </figcaption>
                      </figure>
                    )}
                  </>
                )}

                <Section label="Stack">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="h-auto rounded-full border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.03)] px-2.5 py-1 text-[11px] font-medium text-[var(--c-fg-2)]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Section>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--c-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--c-bg)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Ver en vivo
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* close — floats over the top-right corner */}
              <DialogPrimitive.Close
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--tint)/0.14)] bg-[rgb(var(--c-bg-rgb)/0.6)] text-[var(--c-fg)] backdrop-blur-md transition-colors hover:bg-[rgb(var(--tint)/0.14)]"
                aria-label="Cerrar"
              >
                <X size={16} />
              </DialogPrimitive.Close>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
