import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ShowCase from "./components/Showcase";
import Preformance from "./components/Preformance";
import Features from "./components/Features";
import Highlight from "./components/Highlights";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ProductViewer/>
      <ShowCase/>
      <Preformance/>
      <Features/>
      <Highlight/>
      <Footer/>
    </main>
  );
}
