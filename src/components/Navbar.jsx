import logo from "../assets/suppaduppa-logo.png";
import { ALL_PRODUCTS_URL, CART_URL, COLLECTION_URL, CONTACT_EMAIL, INSTAGRAM_URL, SOCIAL_URL } from "../config/shopify";
import { CameraIcon, MailIcon, MusicIcon } from "./Icons";
export default function Navbar({ themes, activeColor, setActiveColor }) {
 return <header className="nav-wrap"><div className="nav">
  <a href="#home" className="brand"><img src={logo} alt="SuppaDuppa"/><span>SuppaDuppa</span></a>
  <nav><a href="#home">Home</a><a href="#drop">Shop</a><a href={COLLECTION_URL}>Summer Drop</a><a href={ALL_PRODUCTS_URL}>All Products</a><a href="#contact">Contact</a></nav>
  <div className="nav-actions"><div className="theme-dots">{themes.map(t=><button key={t.name} className={activeColor===t.name?"active":""} style={{backgroundImage:t.gradient}} onClick={()=>setActiveColor(t.name)} title={t.name}/>)}</div><a href={`mailto:${CONTACT_EMAIL}`} className="icon"><MailIcon/></a><a href={INSTAGRAM_URL} className="icon"><CameraIcon/></a><a href={SOCIAL_URL} className="icon"><MusicIcon/></a><a className="cart" href={CART_URL}>🛒 Cart</a></div>
 </div></header>;
}
