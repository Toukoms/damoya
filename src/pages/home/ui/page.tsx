import { About } from "@widgets/about";
import { ExploreMore } from "@widgets/explore-more";
import { Hero } from "@widgets/hero";
import { HowItWorks } from "@widgets/how-it-works";
import { Testimonials } from "@widgets/testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Testimonials />
      <ExploreMore />
    </>
  );
}
