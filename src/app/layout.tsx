import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { I18nProvider } from "@/lib/i18n";

// Only the weights/styles actually used in the UI are requested, so the
// browser downloads far fewer font files. Poppins: 400–800 normal (no 300, no
// italic — every italic accent uses Playfair). Playfair: italic 500 only.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
});

const description =
  "Construyo interfaces limpias y experiencias que se sienten bien. Portafolio de Evan Morales, desarrollador Frontend / Full-Stack.";

export const metadata: Metadata = {
  metadataBase: new URL("https://evnbox.com"),
  title: "Evan Morales — Full-Stack Developer",
  description,
  keywords: [
    "Evan Morales",
    "desarrollador",
    "frontend",
    "full-stack",
    "Next.js",
    "React",
    "TypeScript",
    "portafolio",
    "Torreón",
    "Coahuila",
    "remoto",
    "México",
  ],
  authors: [{ name: "Evan Morales", url: "https://github.com/EvanDavidMS" }],
  creator: "Evan Morales",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Evan Morales",
    title: "Evan Morales — Full-Stack Developer",
    description,
    // TODO: agregar la imagen OG (1200×630) cuando el logo "EM" esté listo:
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "Evan Morales — Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan Morales — Full-Stack Developer",
    description,
    // images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(poppins.variable, playfair.variable, "font-sans", "dark")}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground">
        {/* Apply the stored theme before paint (default dark) — no FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.remove('dark')}}catch(e){}" +
              // Pause the home page's entrance animations before first paint so
              // they play on the loader reveal (the Preloader removes this; the
              // timeout is a safety net if it never mounts).
              "try{if(location.pathname==='/'){document.documentElement.classList.add('is-loading');setTimeout(function(){document.documentElement.classList.remove('is-loading')},6000)}}catch(e){}",
          }}
        />
        <SmoothScroll />
        <CustomCursor />
        <I18nProvider>
          <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
