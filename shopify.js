import logo from "../assets/suppaduppa-logo.png";
import { ALL_PRODUCTS_URL, CART_URL, CONTACT_EMAIL } from "../config/shopify";
export default function Footer(){return <footer className="footer" id="contact"><div><img src={logo} alt="SuppaDuppa"/><p>Stay SuppaDuppa — catch the summer drop and keep the wave going.</p></div><div><a href={ALL_PRODUCTS_URL}>Shop all</a><a href={CART_URL}>View cart</a><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a></div></footer>}
