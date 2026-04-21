import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import TrustBar from "@/app/components/sections/TrustBar";
import FeaturedProducts from "@/app/components/sections/FeaturedProducts";
import WhyChooseUs from "@/app/components/sections/WhyChooseUs";
import Bestsellers from "@/app/components/sections/Bestsellers";
import Testimonials from "@/app/components/sections/Testimonials";
import FinalCTA from "@/app/components/sections/FinalCTA";
import PerfumeAds from "@/app/components/sections/PerfumeAds";

// "@/" es un atajo configurado en Next.js que apunta a la raíz del proyecto.

export default function Home() {
  return (
    <> {/* "<> ... </>" Fragmento:React exige que una función devuelva un solo elemento padre
        Como el Navbar, el Main y el Footer estan al mismo nivel se usa esta "etiqueta invisible" para agruparlos */}
      <Navbar />
      <main>
        <Hero />
        <PerfumeAds />
        {/*<TrustBar />*/}
        {/*<FeaturedProducts />*/}
        {/*<WhyChooseUs />*/}
        {/*<Bestsellers />*/}
        {/*<Testimonials />*/}
        {/*<FinalCTA />*/}
      </main>
      <Footer />
    </>
  );
}

//aca se ensamblan y organizan el orden de las secciones de la pagina principal, se pueden agregar o quitar secciones segun se necesite. 