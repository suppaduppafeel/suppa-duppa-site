import logo from "../assets/suppaduppa-logo.png";
import { CART_URL, COLLECTION_URL } from "../config/shopify";
export default function Hero(){return <section className="hero" id="home">
 <div className="hero-copy"><span className="pill"><span/> Summer drop is live</span><h1>How You Feelin&apos;?</h1><p className="hero-lead">Step into the SuppaDuppa world — ocean breeze, bright color, pink panther confidence, and beach-ready drip.</p><div className="actions"><a className="btn primary" href={COLLECTION_URL}>Shop Summer Drop</a><a className="btn ghost" href={CART_URL}>View Cart</a></div><div className="stats"><b>17</b><span>Live cards</span><b>9</b><span>Hat styles</span><b>100%</b><span>Summer mood</span></div></div>
 <div className="hero-stage"><div className="sun"><img src={logo} alt="SuppaDuppa logo"/></div><div className="bubble b1"/><div className="bubble b2"/><div className="bubble b3"/><div className="wave w1"/><div className="wave w2"/><div className="wave w3"/><div className="hero-tag">SuppaDuppa Tide</div></div>
 </section>}
