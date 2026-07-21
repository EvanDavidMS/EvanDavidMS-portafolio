import Preloader from "@/components/Preloader";
import ResponsiveBackground from "@/components/ResponsiveBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Preloader />
      <ResponsiveBackground />
      {/* grain texture over the waves — plain overlay (no mix-blend) so it
          doesn't force a full-viewport re-blend on every scroll frame */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
        }}
      />
      {/* fade the bottom of the viewport to the page bg so the wavy field
          resolves cleanly at the base instead of showing busy ribbons */}
      <div className="fixed inset-x-0 bottom-0 z-0 h-[42vh] pointer-events-none bg-gradient-to-b from-transparent to-[var(--c-bg)]" />
      {/* progressive blur strip so content softly blurs behind the floating navbar */}
      <ProgressiveBlur
        position="top"
        height="13%"
        className="fixed z-40"
        blurLevels={[1, 6, 18]}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <BackToTop />
      <Footer />
    </div>
  );
}
