// Store content. All photos live in /public/images.
// TODO: prices below are placeholders — replace `price` (selling price) and `mrp` with your real prices.

export const SHOP = {
  name: "Aadhik Babu Metals",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // country code + number, no "+" or spaces
  email: "hello@aadhikbabumetals.com",
  address: "12, Big Bazaar Street, Kumbakonam, Tamil Nadu 612001",
  freeShippingAbove: 1499,
};

const img = (name: string) => `/images/${name}.jpg`;

export type Category = { slug: string; name: string; image: string; sub: string[] };

export const categories: Category[] = [
  { slug: "idols", name: "Idols", image: img("murugan-peacock-large"), sub: ["Murugan", "Shiva", "Perumal", "Meenakshi", "Andal", "Siddhar"] },
  { slug: "temple-items", name: "Temple Items", image: img("thiruvasi-arch"), sub: ["Thiruvasi", "Pallakku", "Aruval"] },
  { slug: "deity-ornaments", name: "Deity Ornaments", image: img("deity-crowns"), sub: ["Kireedam", "Necklace"] },
  { slug: "pooja-items", name: "Pooja Items", image: img("valampuri-conch"), sub: ["Conch", "Vel"] },
  { slug: "malas", name: "Malas & Rudraksha", image: img("rudraksha-malas"), sub: ["Rudraksha", "Spatika"] },
  { slug: "gems", name: "Gems & Crystals", image: img("gems-crystals"), sub: ["Bracelet", "Crystal"] },
  { slug: "home-decor", name: "Home Decor", image: img("copper-elephants"), sub: ["Elephant"] },
];

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  tags: ("new" | "best" | "festive")[];
};

export const products: Product[] = [
  { id: 1, name: "Murugan with Peacock Brass Idol (Large)", category: "Idols", price: 8500, mrp: 9800, rating: 4.9, reviews: 42, image: img("murugan-peacock-large"), tags: ["best"] },
  { id: 2, name: "Standing Murugan with Vel", category: "Idols", price: 2400, mrp: 2800, rating: 4.8, reviews: 36, image: img("murugan-standing"), tags: ["best"] },
  { id: 3, name: "Murugan with Peacock Idol (Small)", category: "Idols", price: 1950, mrp: 2300, rating: 4.8, reviews: 28, image: img("murugan-peacock-small"), tags: ["festive"] },
  { id: 4, name: "Murugan Vel Plate Idol", category: "Pooja Items", price: 1250, mrp: 1500, rating: 4.7, reviews: 19, image: img("murugan-vel-plate"), tags: ["new"] },
  { id: 5, name: "Shiva Dhyana Idol", category: "Idols", price: 1650, mrp: 1950, rating: 4.9, reviews: 31, image: img("shiva-seated"), tags: ["festive"] },
  { id: 6, name: "Perumal Standing Idol", category: "Idols", price: 2600, mrp: 3000, rating: 4.8, reviews: 24, image: img("perumal-idol"), tags: ["best"] },
  { id: 7, name: "Meenakshi Amman Idol", category: "Idols", price: 2500, mrp: 2900, rating: 4.9, reviews: 22, image: img("meenakshi-idol"), tags: ["new"] },
  { id: 8, name: "Andal Idol with Parrot", category: "Idols", price: 2500, mrp: 2900, rating: 4.8, reviews: 18, image: img("andal-idol"), tags: ["new"] },
  { id: 9, name: "Siddhar Idol on Peetam", category: "Idols", price: 1150, mrp: 1400, rating: 4.7, reviews: 12, image: img("siddhar-idol"), tags: ["new"] },
  { id: 10, name: "Brass Thiruvasi Prabhai Arch", category: "Temple Items", price: 18500, mrp: 21000, rating: 4.9, reviews: 9, image: img("thiruvasi-arch"), tags: ["festive"] },
  { id: 11, name: "Brass Pallakku with Peacock Handles", category: "Temple Items", price: 9500, mrp: 11000, rating: 4.9, reviews: 14, image: img("brass-pallakku"), tags: ["festive"] },
  { id: 12, name: "Temple Aruval with Bells", category: "Temple Items", price: 3200, mrp: 3700, rating: 4.7, reviews: 11, image: img("aruval-kali"), tags: ["festive"] },
  { id: 13, name: "Deity Kireedam (Crowns)", category: "Deity Ornaments", price: 2500, mrp: 2900, rating: 4.8, reviews: 26, image: img("deity-crowns"), tags: ["festive"] },
  { id: 14, name: "Stone-Studded Deity Necklace", category: "Deity Ornaments", price: 1600, mrp: 1900, rating: 4.8, reviews: 33, image: img("deity-jewellery"), tags: ["best"] },
  { id: 15, name: "Valampuri Conch (Shankh)", category: "Pooja Items", price: 1800, mrp: 2200, rating: 4.9, reviews: 47, image: img("valampuri-conch"), tags: ["best"] },
  { id: 16, name: "Rudraksha & Spatika Malas", category: "Malas & Rudraksha", price: 650, mrp: 800, rating: 4.8, reviews: 64, image: img("rudraksha-malas"), tags: ["best"] },
  { id: 17, name: "Gemstone Bracelets & Crystal Lingam", category: "Gems & Crystals", price: 550, mrp: 700, rating: 4.7, reviews: 38, image: img("gems-crystals"), tags: ["new"] },
  { id: 18, name: "Copper Finish Elephant Pair", category: "Home Decor", price: 6500, mrp: 7500, rating: 4.8, reviews: 16, image: img("copper-elephants"), tags: ["new"] },
];

export const slides = [
  { kicker: "Divine Idols", title: "Brass & panchaloha idols for your pooja room", text: "Murugan, Shiva, Perumal, Meenakshi, Andal and more — finely detailed and finished by hand.", cta: "Shop Idols", query: "Idols", image: img("murugan-peacock-large") },
  { kicker: "Temple Collection", title: "Thiruvasi, pallakku & temple essentials", text: "Grand pieces for temples, festivals and home shrines. Bulk orders welcome.", cta: "Shop Temple Items", query: "Temple Items", image: img("thiruvasi-arch") },
  { kicker: "Visit Our Store", title: "Thousands of pieces under one roof", text: "Walk in to see our full collection, or order on WhatsApp and we'll ship across India.", cta: "Browse Collection", query: "", image: img("shop-interior") },
];

export const promos = [
  { kicker: "Alankaram", title: "Deity Kireedam & Ornaments", text: "Crowns, necklaces and haram for every deity", query: "Deity Ornaments", image: img("deity-crowns") },
  { kicker: "Spiritual Wellness", title: "Malas, Gems & Crystals", text: "Rudraksha, spatika, gemstone bracelets & crystal lingams", query: "Gems", image: img("gems-crystals") },
];

export const aboutImage = img("shop-interior");

export const testimonials = [
  { name: "Priya R.", city: "Chennai", text: "The Murugan idol is heavy, beautifully detailed and arrived well packed. Exactly like the photos." },
  { name: "Senthil K.", city: "Coimbatore", text: "Bought a thiruvasi for our temple festival. Quick WhatsApp support and safe delivery." },
  { name: "Meena S.", city: "Bengaluru", text: "Genuine quality at fair prices. The deity necklaces and kireedam made our alankaram complete." },
];

export const rupee = (n: number) => "₹" + n.toLocaleString("en-IN");
