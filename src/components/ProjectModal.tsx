"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X, ArrowUpRight, Quote } from "lucide-react";

import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { getLenis } from "@/lib/lenis";
import { useI18n, pick } from "@/lib/i18n";
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
      <h4 className="mb-2 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--c-faint)]">
        <span className="h-px w-4 bg-[rgb(var(--tint)/0.25)]" />
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
  const { t, lang } = useI18n();
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
            "fixed inset-0 z-[100] bg-black/75 backdrop-blur-md",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] w-[calc(100%-1.5rem)] max-w-[960px]",
            "max-h-[90dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden",
            "flex flex-col md:flex-row",
            "rounded-[26px] border border-[rgb(var(--tint)/0.12)] bg-[var(--c-bg)]",
            "shadow-[0_40px_120px_-24px_rgba(0,0,0,0.8)] focus:outline-none",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-3 data-[state=open]:duration-300",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
        >
          {project && (
            <>
              {/* left: image (full height on desktop, banner on mobile) */}
              <div className="relative aspect-[16/10] shrink-0 bg-[var(--c-surf)] md:aspect-auto md:w-[43%]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  // load immediately when the modal opens (lazy-loading doesn't
                  // reliably trigger for an image revealed inside a dialog)
                  priority
                  sizes="(min-width: 768px) 43vw, 100vw"
                  className="object-cover object-top"
                />
                {/* fade the image into the panel edge for a seamless seam */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-bg)] via-[var(--c-bg)]/10 to-transparent md:bg-gradient-to-r md:from-[var(--c-bg)] md:via-transparent" />

                {/* category chip over the image */}
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-[rgb(var(--tint)/0.14)] bg-[rgb(var(--c-bg-rgb)/0.55)] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--c-fg-2)] backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* right: scrollable content. min-h-0 is what lets this flex child
                  actually scroll on mobile (without it the flex item refuses to
                  shrink below its content → nothing scrolls). */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-4 overflow-y-auto overscroll-contain p-6 pb-4 sm:p-7 sm:pb-4">
                  <div>
                    <DialogPrimitive.Title className="text-[clamp(21px,2.6vw,28px)] font-semibold tracking-[-0.02em] text-[var(--c-fg)]">
                      {project.title}
                    </DialogPrimitive.Title>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--c-muted)]">
                      {pick(project.desc, lang)}
                    </p>
                  </div>

                  {study && (
                    <>
                      <div className="h-px bg-[rgb(var(--tint)/0.08)]" />

                      <Section label={t.modal.challenge}>
                        <p className="text-[13.5px] leading-[1.6] text-[var(--c-fg-2)]">
                          {pick(study.challenge, lang)}
                        </p>
                      </Section>

                      <Section label={t.modal.work}>
                        <ul className="flex flex-col gap-2">
                          {study.work.map((w, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 text-[13.5px] leading-[1.5] text-[var(--c-fg-2)]"
                            >
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--tint)/0.45)]" />
                              {pick(w, lang)}
                            </li>
                          ))}
                        </ul>
                      </Section>

                      <Section label={t.modal.result}>
                        <div className="flex flex-wrap gap-1.5">
                          {study.results.map((r, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1.5 text-[12px] leading-[1.35] text-[var(--c-fg-2)]"
                            >
                              <span className="text-emerald-400">✓</span>
                              {pick(r, lang)}
                            </span>
                          ))}
                        </div>
                      </Section>

                      {study.testimonial && (
                        <figure className="relative overflow-hidden rounded-2xl border border-[rgb(var(--tint)/0.1)] bg-gradient-to-br from-[rgb(var(--tint)/0.06)] to-[rgb(var(--tint)/0.015)] p-5">
                          <Quote
                            className="absolute right-3.5 top-3.5 h-6 w-6 text-[rgb(var(--tint)/0.16)]"
                            aria-hidden
                          />
                          <blockquote className="pr-6 text-[13.5px] font-medium italic leading-[1.6] text-[var(--c-fg)]">
                            “{pick(study.testimonial.quote, lang)}”
                          </blockquote>
                          <figcaption className="mt-3.5 flex items-center gap-2.5">
                            <span
                              aria-hidden
                              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgb(var(--tint)/0.14)] bg-[rgb(var(--tint)/0.06)] text-[12px] font-semibold text-[var(--c-fg)]"
                            >
                              {study.testimonial.author.trim().charAt(0)}
                            </span>
                            <span className="flex min-w-0 flex-col leading-tight">
                              <span className="text-[12.5px] font-semibold text-[var(--c-fg-2)]">
                                {study.testimonial.author}
                              </span>
                              <span className="text-[11.5px] text-[var(--c-muted)]">
                                {pick(study.testimonial.role, lang)}
                              </span>
                            </span>
                          </figcaption>
                        </figure>
                      )}
                    </>
                  )}

                  <Section label={t.modal.stack}>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="h-auto rounded-full border-[rgb(var(--tint)/0.1)] bg-[rgb(var(--tint)/0.03)] px-2.5 py-1 text-[11px] font-medium text-[var(--c-fg-2)]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Section>
                </div>

                {/* sticky action bar — always reachable, even mid-scroll */}
                <div className="shrink-0 border-t border-[rgb(var(--tint)/0.08)] bg-[rgb(var(--c-bg-rgb)/0.85)] p-4 backdrop-blur-md sm:px-7 sm:py-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--c-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--c-bg)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {t.modal.viewLive}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* close — floats over the top-right corner */}
              <DialogPrimitive.Close
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-[rgb(var(--tint)/0.14)] bg-[rgb(var(--c-bg-rgb)/0.6)] text-[var(--c-fg)] backdrop-blur-md transition-colors hover:bg-[rgb(var(--tint)/0.14)]"
                aria-label={t.modal.close}
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
