import { useEffect, useMemo, useState } from "react";
import { CART_URL, SHOP_BASE } from "../config/shopify";
import ProductMock from "./ProductMock";

function getColorData(productData) {
  const options = Array.isArray(productData?.options) ? productData.options : [];
  const index = options.findIndex((o) => String(o?.name || "").toLowerCase().includes("color"));
  return { index, values: index >= 0 && Array.isArray(options[index]?.values) ? options[index].values : [] };
}
function getVariant(productData, color) {
  const variants = Array.isArray(productData?.variants) ? productData.variants : [];
  const meta = getColorData(productData);
  if (meta.index < 0) return variants.find((v) => v.available) || variants[0] || null;
  const key = `option${meta.index + 1}`;
  return variants.find((v) => v[key] === color && v.available) || variants.find((v) => v[key] === color) || variants.find((v) => v.available) || variants[0] || null;
}
function useProduct(handle) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let stop = false;
    fetch(`${SHOP_BASE}/products/${handle}.js`).then((r) => (r.ok ? r.json() : null)).then((json) => !stop && setData(json)).catch(() => !stop && setData(null));
    return () => { stop = true; };
  }, [handle]);
  return data;
}
export default function ProductCard({ product, selected }) {
  const productData = useProduct(product.handle);
  const colorData = useMemo(() => getColorData(productData), [productData]);
  const [color, setColor] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (colorData.values.length) {
      setColor((current) => colorData.values.includes(current) ? current : colorData.values[0]);
    }
  }, [colorData.values]);

  const variant = useMemo(() => getVariant(productData, color), [productData, color]);
  const image = variant?.featured_image?.src || productData?.featured_image || productData?.images?.[0];
  const price = productData?.price ? `$${(productData.price / 100).toFixed(2)}` : product.price;
  const activeIndex = Math.max(colorData.values.indexOf(color), 0);

  function goToCartFallback() {
    window.location.href = CART_URL;
  }

  async function addToCart() {
    const id = variant?.id;

    // User requested Add to Cart always ends at the Shopify cart page.
    if (!id) {
      goToCartFallback();
      return;
    }

    try {
      await fetch(`${SHOP_BASE}/cart/add.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id, quantity: 1 }),
      });
      window.location.href = CART_URL;
    } catch {
      window.location.href = `${SHOP_BASE}/cart/${id}:1`;
    }
  }

  return (
    <article className="product-card">
      <div className="badge-row">
        <span className="product-badge">{product.badge}</span>
        <button
          type="button"
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label="Save item"
        >
          ♥
        </button>
      </div>

      <div className="product-visual" style={{ "--panelGradient": selected.panel }}>
        <div className="splash-dot one" />
        <div className="splash-dot two" />
        <div className="product-visual-inner">
          {image ? (
            <img className="product-photo" src={image} alt={product.name} loading="lazy" />
          ) : (
            <ProductMock kind={product.render} />
          )}
        </div>
      </div>

      <div className="product-body">
        <div className="product-top">
          <div>
            <div className="product-type">{product.type}</div>
            <h3>{product.name}</h3>
          </div>
          <div className="price">{price}</div>
        </div>

        <p>{product.vibe}</p>

        {colorData.values.length > 1 && (
          <label className="product-color-slider">
            <span>{color}</span>
            <input
              type="range"
              min="0"
              max={colorData.values.length - 1}
              value={activeIndex}
              onChange={(event) => setColor(colorData.values[Number(event.target.value)])}
              aria-label={`${product.name} color`}
            />
          </label>
        )}

        <div className="card-actions">
          <button type="button" className="card-btn" onClick={addToCart}>Add to cart</button>
          <a className="card-secondary" href={product.shopUrl}>View product</a>
        </div>
      </div>
    </article>
  );
}
