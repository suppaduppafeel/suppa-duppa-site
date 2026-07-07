import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { products } from "./data/products";
import { themeColors } from "./data/themeColors";

export default function App() {
  const [activeColor, setActiveColor] = useState(themeColors[0].name);
  const selected = useMemo(() => themeColors.find((c) => c.name === activeColor) || themeColors[0], [activeColor]);
  return <main className="site" style={{ "--siteGradient": selected.gradient, "--glowA": selected.glowA, "--glowB": selected.glowB, "--seaGradient": selected.sea }}>
    <div className="ambient one"/><div className="ambient two"/><div className="overlay"/><div className="ocean-wash"/>
    <div className="container"><Navbar themes={themeColors} activeColor={activeColor} setActiveColor={setActiveColor}/><Hero/>
      <section className="section-head"><span>Summer Drop</span><h2>Beach-ready pieces with the official SuppaDuppa energy.</h2><p>Hats, tanks, crops, hoodies, and stickers — all connected to your Shopify store.</p></section>
      <section className="products" id="drop">{products.map((p) => <ProductCard key={p.id} product={p} selected={selected}/>)}</section>
      <Footer/>
    </div>
  </main>;
}
