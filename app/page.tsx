"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
  User,
  X,
  Youtube,
} from "lucide-react";
import { SHOP, aboutImage, categories, products, promos, rupee, slides, testimonials, type Product } from "./data";

type Tab = "new" | "best" | "festive";
const TABS: { key: Tab; label: string }[] = [
  { key: "new", label: "New Arrivals" },
  { key: "best", label: "Best Sellers" },
  { key: "festive", label: "Festive Specials" },
];

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("new");
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const cartItems = Object.entries(cart).map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id))!, qty }));
  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const subtotal = cartItems.reduce((n, i) => n + i.qty * i.product.price, 0);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return products.filter((p) => (p.name + " " + p.category).toLowerCase().includes(q));
    return products.filter((p) => p.tags.includes(tab));
  }, [query, tab]);

  const addToCart = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    setToast(`${p.name} added to cart`);
  };
  const setQty = (id: number, qty: number) =>
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  const toggleWish = (id: number) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const checkoutUrl = () => {
    const lines = cartItems.map((i) => `• ${i.product.name} x ${i.qty} = ${rupee(i.qty * i.product.price)}`);
    const msg = `Hello ${SHOP.name}, I would like to order:\n${lines.join("\n")}\n\nTotal: ${rupee(subtotal)}`;
    return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const goShop = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contact">
            <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`}><Phone size={13} /> {SHOP.phone}</a>
            <a href={`mailto:${SHOP.email}`} className="hide-sm"><Mail size={13} /> {SHOP.email}</a>
          </div>
          <p>Free shipping on orders above {rupee(SHOP.freeShippingAbove)} across India</p>
          <div className="topbar-social hide-sm">
            <a href="#" aria-label="Facebook"><Facebook size={14} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={14} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={14} /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn show-md" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
          <a href="#" className="logo">
            <img className="logo-mark" src="/logo.png" alt="Aadhik Babu Metals logo" />
            <span><strong>Aadhik Babu</strong><small>METALS · SINCE 1987</small></span>
          </a>
          <form className="search" onSubmit={(e) => { e.preventDefault(); goShop(); }}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for idols, thiruvasi, malas, ornaments..." />
            <button type="submit" aria-label="Search"><Search size={18} /></button>
          </form>
          <div className="header-actions">
            <a href="#" className="icon-btn hide-sm" aria-label="Account"><User size={21} /></a>
            <button className="icon-btn" aria-label="Wishlist"><Heart size={21} />{wishlist.length > 0 && <span className="count">{wishlist.length}</span>}</button>
            <button className="icon-btn cart-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={21} />{cartCount > 0 && <span className="count">{cartCount}</span>}
              <span className="cart-total hide-sm">{rupee(subtotal)}</span>
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav className={menuOpen ? "nav open" : "nav"}>
          <div className="nav-head show-md">
            <strong>Shop by Category</strong>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={22} /></button>
          </div>
          <ul className="container nav-list">
            <li><a href="#" onClick={() => setMenuOpen(false)}>Home</a></li>
            {categories.map((c) => (
              <li key={c.slug} className="has-sub">
                <button onClick={() => setOpenSub(openSub === c.slug ? null : c.slug)}>
                  {c.name} <ChevronDown size={14} />
                </button>
                <ul className={openSub === c.slug ? "sub show" : "sub"}>
                  {c.sub.map((s) => (
                    <li key={s}><a href="#shop" onClick={() => { setQuery(s); setMenuOpen(false); }}>{s}</a></li>
                  ))}
                </ul>
              </li>
            ))}
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
        {menuOpen && <div className="backdrop show-md" onClick={() => setMenuOpen(false)} />}
      </header>

      <main>
        {/* Hero slider */}
        <section className="hero">
          {slides.map((s, i) => (
            "banner" in s && s.banner ? (
              <div key={i} className={i === slide ? "slide banner active" : "slide banner"} style={{ "--bg": `url(${s.image})` } as React.CSSProperties}>
                <img src={s.image} alt={s.title} />
                <button className="btn" onClick={() => { setQuery(s.query); goShop(); }}>{s.cta}</button>
              </div>
            ) : (
              <div key={i} className={i === slide ? "slide active" : "slide"} style={{ backgroundImage: `url(${s.image})` }}>
                <div className="container slide-content">
                  <span className="kicker">{s.kicker}</span>
                  <h1>{s.title}</h1>
                  <p>{s.text}</p>
                  <button className="btn" onClick={() => { setQuery(s.query); goShop(); }}>{s.cta}</button>
                </div>
              </div>
            )
          ))}
          <button className="hero-arrow left" aria-label="Previous slide" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}><ChevronLeft /></button>
          <button className="hero-arrow right" aria-label="Next slide" onClick={() => setSlide((slide + 1) % slides.length)}><ChevronRight /></button>
          <div className="dots">{slides.map((_, i) => <button key={i} aria-label={`Slide ${i + 1}`} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} />)}</div>
        </section>

        {/* Features */}
        <section className="features container">
          <div><Truck /><span><strong>Free Shipping</strong>Above {rupee(SHOP.freeShippingAbove)}</span></div>
          <div><BadgeCheck /><span><strong>Pure Brass</strong>Authentic & handcrafted</span></div>
          <div><ShieldCheck /><span><strong>Secure Payment</strong>UPI, cards & COD</span></div>
          <div><RotateCcw /><span><strong>Easy Returns</strong>7-day replacement</span></div>
        </section>

        {/* Category circles */}
        <section className="container section">
          <h2 className="title">Shop by Category</h2>
          <div className="cat-row">
            {categories.map((c) => (
              <a key={c.slug} href="#shop" className="cat" onClick={() => setQuery(c.name)}>
                <span className="cat-img"><img src={c.image} alt={c.name} /></span>
                <span>{c.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="container section" id="shop">
          <h2 className="title">{query ? `Results for “${query}”` : "Our Collection"}</h2>
          {query ? (
            <div className="tabs"><button className="active" onClick={() => setQuery("")}>Clear search <X size={14} /></button></div>
          ) : (
            <div className="tabs">{TABS.map((t) => <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>)}</div>
          )}
          {shown.length === 0 ? (
            <p className="empty">No products found. Try another search or <a href={`https://wa.me/${SHOP.whatsapp}`}>ask us on WhatsApp</a>.</p>
          ) : (
            <div className="grid">
              {shown.map((p) => {
                const off = Math.round((1 - p.price / p.mrp) * 100);
                const wished = wishlist.includes(p.id);
                return (
                  <article key={p.id} className="card">
                    <div className="card-img">
                      <img src={p.image} alt={p.name} loading="lazy" />
                      <span className="badge">-{off}%</span>
                      <button className={wished ? "wish on" : "wish"} aria-label="Add to wishlist" onClick={() => toggleWish(p.id)}>
                        <Heart size={17} fill={wished ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="card-body">
                      <small>{p.category}</small>
                      <h3>{p.name}</h3>
                      <div className="rating"><Star size={13} fill="currentColor" /> {p.rating} <span>({p.reviews})</span></div>
                      <div className="price"><strong>{rupee(p.price)}</strong><del>{rupee(p.mrp)}</del></div>
                      <button className="btn btn-block" onClick={() => addToCart(p)}><ShoppingCart size={16} /> Add to Cart</button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Promo banners */}
        <section className="container promos">
          {promos.map((p) => (
            <div key={p.title} className="promo" style={{ backgroundImage: `url(${p.image})` }}>
              <span className="kicker">{p.kicker}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <button className="btn btn-light" onClick={() => { setQuery(p.query); goShop(); }}>Shop Now</button>
            </div>
          ))}
        </section>

        {/* About */}
        <section className="about">
          <div className="container about-inner">
            <img src={aboutImage} alt="Inside the Aadhik Babu Metals store" />
            <div>
              <span className="kicker">About Us</span>
              <h2>Brass, copper &amp; panchaloha treasures since 1987</h2>
              <p>
                {SHOP.name} brings you authentic idols, temple items, deity ornaments and pooja
                essentials made by traditional artisans. Every piece is checked for weight, finish and purity before it
                is packed with care and shipped to your home.
              </p>
              <ul>
                <li><BadgeCheck size={18} /> 100% genuine brass, copper & panchalogam</li>
                <li><BadgeCheck size={18} /> Bulk & temple orders welcome</li>
                <li><BadgeCheck size={18} /> Custom engraving for gifting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container section">
          <h2 className="title">What Our Customers Say</h2>
          <div className="reviews">
            {testimonials.map((t) => (
              <blockquote key={t.name}>
                <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                <p>“{t.text}”</p>
                <footer><strong>{t.name}</strong> · {t.city}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <a href="#" className="logo light"><img className="logo-mark" src="/logo.png" alt="Aadhik Babu Metals logo" /><span><strong>Aadhik Babu</strong><small>METALS · SINCE 1987</small></span></a>
            <p>Your trusted destination for handcrafted idols, temple items and pooja essentials.</p>
            <div className="topbar-social">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>
          <div>
            <h4>Categories</h4>
            <ul>{categories.map((c) => <li key={c.slug}><a href="#shop" onClick={() => setQuery(c.name)}>{c.name}</a></li>)}</ul>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return & Refund</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="contact">
              <li><MapPin size={16} /> <span>{SHOP.name}<br />{SHOP.address.map((line) => <span key={line}>{line}<br /></span>)}</span></li>
              {SHOP.phones.map((p) => (
                <li key={p}><Phone size={16} /> <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a></li>
              ))}
              <li><MessageCircle size={16} /> <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">{SHOP.whatsappDisplay} (WhatsApp)</a></li>
              <li><Mail size={16} /> <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} {SHOP.name}. All rights reserved.</div>
      </footer>

      {/* Cart drawer */}
      <div className={cartOpen ? "drawer-wrap open" : "drawer-wrap"}>
        <div className="backdrop" onClick={() => setCartOpen(false)} />
        <aside className="drawer" aria-label="Shopping cart">
          <div className="drawer-head">
            <h3>Your Cart ({cartCount})</h3>
            <button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}><X size={22} /></button>
          </div>
          {cartItems.length === 0 ? (
            <div className="drawer-empty"><ShoppingCart size={42} /><p>Your cart is empty</p><button className="btn" onClick={() => { setCartOpen(false); goShop(); }}>Continue Shopping</button></div>
          ) : (
            <>
              <ul className="drawer-items">
                {cartItems.map(({ product: p, qty }) => (
                  <li key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div>
                      <strong>{p.name}</strong>
                      <span>{rupee(p.price)}</span>
                      <div className="qty">
                        <button aria-label="Decrease" onClick={() => setQty(p.id, qty - 1)}><Minus size={14} /></button>
                        <span>{qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(p.id, qty + 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                    <button className="icon-btn" aria-label="Remove" onClick={() => setQty(p.id, 0)}><Trash2 size={17} /></button>
                  </li>
                ))}
              </ul>
              <div className="drawer-foot">
                {subtotal < SHOP.freeShippingAbove
                  ? <p className="ship-note">Add {rupee(SHOP.freeShippingAbove - subtotal)} more for free shipping</p>
                  : <p className="ship-note ok">You get free shipping!</p>}
                <div className="subtotal"><span>Subtotal</span><strong>{rupee(subtotal)}</strong></div>
                <a className="btn btn-block btn-wa" href={checkoutUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order on WhatsApp</a>
              </div>
            </>
          )}
        </aside>
      </div>

      <a className="wa-float" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={28} /></a>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
