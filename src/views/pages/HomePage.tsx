import { useOutletContext, Link } from "react-router";
import { Hero } from "../components/Hero";
import { InnovativeFeature } from "../components/InnovativeFeature";
import { Categories } from "../components/Categories";
import { BestSellers } from "../components/BestSellers";
import { DiscountedProducts } from "../components/DiscountedProducts";
import { ContactLensCategory } from "../components/ContactLensCategory";

interface OutletContext {
  textSize: number;
}

export function HomePage() {
  const { textSize } = useOutletContext<OutletContext>();
  
  return (
    <main id="inicio">
      <Hero textSize={textSize} />
      <InnovativeFeature textSize={textSize} />
      <Categories textSize={textSize} />
      <BestSellers textSize={textSize} />
      <DiscountedProducts textSize={textSize} />
      <ContactLensCategory textSize={textSize} />
    </main>
  );
}
