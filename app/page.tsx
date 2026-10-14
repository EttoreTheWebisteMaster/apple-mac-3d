import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductViewer from "./components/ProductViewer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
    </main>
  );
}
