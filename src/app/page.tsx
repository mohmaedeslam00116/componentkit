import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { ComponentGallery } from "@/components/sections/ComponentGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>

        <AnimatedSection>
          <Features />
        </AnimatedSection>

        <AnimatedSection>
          <ComponentGallery />
        </AnimatedSection>

        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <section id="get-started" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to build faster?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start using @shadowskit/ui today. Free, open source, and production-ready.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" asChild>
                  <a href="#components">Browse Components</a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                Or install via npm:{" "}
                <code className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
                  npx @shadowskit/ui init
                </code>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
