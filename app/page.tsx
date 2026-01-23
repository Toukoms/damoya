import {
  About,
  ExploreMore,
  Hero,
  HowItWorks,
  Testimonials,
} from "@/src/shared/layout";

export default function HomePage() {
  return (
    <div className="space-y-20">
      <Hero />
      <About />
      <HowItWorks />
      <Testimonials />
      <ExploreMore />
    </div>
  );
}
