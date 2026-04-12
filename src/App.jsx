import React, { useMemo, useState } from "react";
import "./styles.css";
import logo from "./assets/suppa-duppa-logo.png";

const hatColors = [
  { name: "Sunset Coral", gradient: "linear-gradient(135deg, #ffb089 0%, #ff6ea8 55%, #ff5e7a 100%)", accent: "Coral Heat" },
  { name: "Ocean Aqua", gradient: "linear-gradient(135deg, #9be7ff 0%, #50cfff 55%, #2491ff 100%)", accent: "Cool Splash" },
  { name: "Palm Lime", gradient: "linear-gradient(135deg, #d7ff8a 0%, #7be97d 55%, #38c172 100%)", accent: "Fresh Energy" },
  { name: "Sand Cream", gradient: "linear-gradient(135deg, #fff1c4 0%, #ffe29a 55%, #ffd199 100%)", accent: "Soft Shore" },
];

const products = [
  { name: "Suppa Duppa Beach Snapback", type: "Hat", vibe: "Easy, bright, all-day beach energy.", price: "$34", color: "Sunset Coral" },
  { name: "Wave Runner Tank", type: "Tank Top", vibe: "Built for hot sand, cold drinks, and golden hour.", price: "$29", color: "Ocean Aqua" },
  { name: "Palm Drift Tank", type: "Tank Top", vibe: "Lightweight summer feel with playful color pop.", price: "$29", color: "Palm Lime" },
  { name: "Shoreline Snapback", type: "Hat", vibe: "Clean neutral look for beach walks and sunset fits.", price: "$34", color: "Sand Cream" },
];

function ProductMock({ item, selected }) {
  const isHat = item.type === "Hat";
  return (
    <div className="product-card">
      <div className="product-visual" style={{ background: selected.gradient }}>
        <div className="accent-pill">{selected.accent}</div>
        {isHat ? (
          <div className="mock-hat">
            <div className="hat-crown" />
            <div className="hat-brim" />
            <img className="mock-logo mock-logo-hat" src={logo} alt="Suppa Duppa logo" />
          </div>
        ) : (
          <div className="mock-tank">
            <div className="tank-neck" />
            <img className="mock-logo mock-logo-tank" src={logo} alt="Suppa Duppa logo" />
          </div>
        )}
        <div className="color-pill">{item.color}</div>
      </div>

      <div className="product-copy">
        <div className="product-top">
          <div>
            <p className="eyebrow">{item.type}</p>
            <h3>{item.name}</h3>
          </div>
          <div className="price-tag">{item.price}</div>
        </div>
        <p className="muted">{item.vibe}</p>
        <button className="dark-button">Shop this vibe</button>
      </div>
    </div>
  );
}

function MockupShowcase() {
  return (
    <div className="mockup-grid">
      <div className="card large-card">
        <div className="split-preview">
          <div className="beach-panel">
            <div className="pill white-pill">Hero logo preview</div>
            <div className="logo-stage">
              <img src={logo} alt="Suppa Duppa logo" className="hero-logo-preview" />
            </div>
            <p className="muted">
              This shows how the real Suppa Duppa logo hits on the homepage with a sunny beach backdrop and playful summer energy.
            </p>
          </div>

          <div className="pink-panel">
            <div className="pill white-pill aqua-text">Lifestyle mockup</div>
            <div className="hat-preview-stage">
              <div className="mock-hat large-hat">
                <div className="hat-crown" />
                <div className="hat-brim" />
                <img className="mock-logo mock-logo-hat" src={logo} alt="Suppa Duppa hat logo" />
              </div>
            </div>

            <div className="inner-card">
              <h3>Suppa Duppa Snapback</h3>
              <p className="muted">Quick mockup preview for how the logo can sit on hats inside the store before product photos are added.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card side-card">
        <p className="eyebrow">Tank mockup</p>
        <div className="tank-panel">
          <div className="mock-tank large-tank">
            <div className="tank-neck" />
            <img className="mock-logo mock-logo-tank" src={logo} alt="Suppa Duppa tank logo" />
          </div>
        </div>
        <p className="muted">Preview of the logo placed on a tank top product card for the summer collection section.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeColor, setActiveColor] = useState(hatColors[0].name);
  const selected = useMemo(() => hatColors.find((color) => color.name === activeColor) ?? hatColors[0], [activeColor]);

  return (
    <div className="site-shell">
      <section className="hero-shell">
        <div className="content-wrap hero-grid">
          <div className="hero-copy">
            <div className="pill white-pill">Summer drop is live</div>

            <div className="logo-card">
              <img src={logo} alt="Suppa Duppa" className="main-logo" />
            </div>

            <h1>
              Beach-ready hats and tanks with pure <span>summer mood</span>.
            </h1>

            <p className="hero-text">
              Suppa Duppa feels like walking barefoot on warm sand, catching ocean breeze, and pulling up in bright colors that make the whole day feel lighter.
            </p>

            <div className="hero-actions">
              <button className="dark-button">Shop the collection</button>
              <button className="light-button">View summer colors</button>
            </div>

            <div className="stats-grid">
              <div className="stat-card"><div className="stat-big">4</div><div className="muted">Colorways ready</div></div>
              <div className="stat-card"><div className="stat-big">2</div><div className="muted">Summer staples</div></div>
              <div className="stat-card"><div className="stat-big">100%</div><div className="muted">Beach vibe energy</div></div>
            </div>
          </div>

          <div className="picker-card">
            <div className="picker-head">
              <div>
                <p className="eyebrow">Color picker</p>
                <h2>Choose your beach tone</h2>
              </div>
              <div className="sun-icon">☀</div>
            </div>

            <div className="chip-row">
              {hatColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={activeColor === color.name ? "chip active" : "chip"}
                  onClick={() => setActiveColor(color.name)}
                >
                  {color.name}
                </button>
              ))}
            </div>

            <div className="featured-look" style={{ background: selected.gradient }}>
              <div className="featured-card">
                <p className="white-eyebrow">Featured look</p>

                <div className="mini-grid">
                  <div className="mini-card">
                    <div className="mock-hat mini-hat">
                      <div className="hat-crown" />
                      <div className="hat-brim" />
                      <img className="mock-logo mock-logo-hat" src={logo} alt="Suppa Duppa hat" />
                    </div>
                    <p className="mini-label">Hat</p>
                  </div>

                  <div className="mini-card">
                    <div className="mock-tank mini-tank">
                      <div className="tank-neck" />
                      <img className="mock-logo mock-logo-tank" src={logo} alt="Suppa Duppa tank" />
                    </div>
                    <p className="mini-label">Tank</p>
                  </div>
                </div>

                <p className="featured-note">{selected.name} makes the whole fit feel fresh, playful, and made for the shoreline.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap section-space">
        <div className="section-head">
          <div>
            <p className="eyebrow">Summer collection</p>
            <h2>Different color hats and tank tops</h2>
          </div>
          <p className="section-text">
            A bright mix of clean neutrals, ocean blues, tropical greens, and sunset tones so every piece feels like vacation mode.
          </p>
        </div>

        <MockupShowcase />

        <div className="products-grid">
          {products.map((item) => <ProductMock key={item.name} item={item} selected={selected} />)}
        </div>
      </section>

      <section className="content-wrap footer-space">
        <div className="footer-grid">
          <div className="story-card">
            <p className="eyebrow aqua-text">Store mood</p>
            <h2>Walk the sand. Catch the light. Wear the feeling.</h2>
            <p className="hero-text dark-text">
              The whole site is built around a beach-day feeling — airy space, sun-washed colors, playful energy, and product cards that feel easy to shop on phone or desktop.
            </p>

            <div className="tag-row">
              {["Beach launch banner", "Color-ready product grid", "Mobile-friendly layout", "Summer brand storytelling"].map((tag) => (
                <span className="tag-pill" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="signup-card">
            <p className="eyebrow light-blue">Email sign-up</p>
            <h2>Get first access to new colors and beach drops.</h2>

            <div className="signup-form">
              <input type="email" placeholder="Email address" />
              <button className="white-button">Join the Suppa Duppa list</button>
            </div>

            <p className="signup-note">Bright fits, summer drops, and fresh beach energy straight to your inbox.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
