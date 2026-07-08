import logo from "../assets/suppaduppa-logo.png";
import { ALL_PRODUCTS_URL, CART_URL, COLLECTION_URL, CONTACT_EMAIL, INSTAGRAM_URL, SOCIAL_URL } from "../config/shopify";
import { CameraIcon, MailIcon, MusicIcon } from "./Icons";

export default function Navbar({ themes, activeColor, setActiveColor }) {
  const activeIndex = Math.max(themes.findIndex((theme) => theme.name === activeColor), 0);

  return (
    <header className="nav-wrap">
      <div className="nav">
        <a href="#home" className="brand" aria-label="SuppaDuppa home">
          <img src={logo} alt="SuppaDuppa" />
          <span>SuppaDuppa</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#drop">Shop</a>
          <a href={COLLECTION_URL}>Summer Drop</a>
          <a href={ALL_PRODUCTS_URL}>All Products</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <label className="theme-slider" title="Color mood slider">
            <span className="slider-name">{themes[activeIndex]?.name}</span>
            <input
              type="range"
              min="0"
              max={themes.length - 1}
              value={activeIndex}
              onChange={(event) => setActiveColor(themes[Number(event.target.value)].name)}
              aria-label="Change SuppaDuppa color mood"
            />
            <span className="slider-swatches" aria-hidden="true">
              {themes.map((theme) => (
                <i key={theme.name} style={{ backgroundImage: theme.gradient }} />
              ))}
            </span>
          </label>

          <a href={`mailto:${CONTACT_EMAIL}`} className="icon" aria-label="Email"><MailIcon /></a>
          <a href={INSTAGRAM_URL} className="icon" aria-label="Instagram"><CameraIcon /></a>
          <a href={SOCIAL_URL} className="icon" aria-label="Social"><MusicIcon /></a>
          <a className="cart" href={CART_URL}>🛒 Cart</a>
        </div>
      </div>
    </header>
  );
}
