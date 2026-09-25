import { asset } from "./asset";

export type Ingredient = {
  vn: string;
  en: string;
};

export type Product = {
  slug: string;
  key: string;
  index: string;
  name: string;
  nameAscii: string;
  shortName: string;
  shortNameAscii: string;
  category: string;
  label: string;
  price: string;
  unit: string;
  bestSeller?: boolean;
  summary: string;
  tagline: string;
  image: string;
  lifestyleImage: string;
  sceneImage: string;
  benefitsImage: string;
  detailImage: string;
  tastingNotes: string[];
  ingredients: Ingredient[];
  benefits: string[];
  audience: string;
  note?: string;
  meta: string[];
};

export const products: Product[] = [
  {
    slug: "ca-gai-leo",
    key: "solanum",
    index: "01",
    name: "Trà Cà Gai Leo Rau Má TDG",
    nameAscii: "Tra Ca Gai Leo Rau Ma TDG",
    shortName: "Cà Gai Leo Rau Má",
    shortNameAscii: "Ca Gai Leo Rau Ma",
    category: "Restore / daily cooling",
    label: "Cooling daily ritual",
    price: "$25",
    unit: "per box",
    bestSeller: true,
    summary:
      "A cooling, grounded herbal blend for days when you want to feel lighter, clearer and restored.",
    tagline: "A cooling herbal blend for days when you want to feel lighter and restored.",
    image: asset("/images/products/ca-gai-leo/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/ca-gai-leo/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/ca-gai-leo/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/ca-gai-leo/benefits.webp?v=11"),
    detailImage: asset("/images/products/ca-gai-leo/detail.jpg?v=4"),
    tastingNotes: ["Clean herbal aroma", "Cooling finish", "Light natural sweetness"],
    ingredients: [
      { vn: "Cà gai leo", en: "Solanum procumbens" },
      { vn: "Rau má", en: "Centella / Pennywort" },
      { vn: "An xoa", en: "Helicteres hirsuta" },
      { vn: "Kim ngân đằng", en: "Honeysuckle stem" },
      { vn: "Xạ đen", en: "Ehretia asperula" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A cooling cup traditionally enjoyed when the day feels heavy or overheated.",
      "Pairs with a slower morning or a pause after rich, spicy meals.",
      "Naturally caffeine-free and sweetened only with stevia.",
    ],
    audience:
      "Night owls, people who eat rich or spicy food, and anyone who wants a cooling daily tea.",
    meta: ["Cooling blend", "Morning ritual", "Vietnamese herbs"],
  },
  {
    slug: "dinh-lang",
    key: "polyscias",
    index: "02",
    name: "Trà Đinh Lăng Lạc Tiên TDG",
    nameAscii: "Tra Dinh Lang Lac Tien TDG",
    shortName: "Đinh Lăng Lạc Tiên",
    shortNameAscii: "Dinh Lang Lac Tien",
    category: "Evening / soft & floral",
    label: "Evening cup",
    price: "$25",
    unit: "per box",
    bestSeller: true,
    summary:
      "A gentle evening infusion with a soft, rounded finish — a quiet cup before bed.",
    tagline: "A soft evening cup with a light, calming aroma.",
    image: asset("/images/products/dinh-lang/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/dinh-lang/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/dinh-lang/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/dinh-lang/benefits.webp?v=11"),
    detailImage: asset("/images/products/dinh-lang/detail.jpg?v=4"),
    tastingNotes: ["Soft floral aroma", "Rounded herbal body", "Gentle finish"],
    ingredients: [
      { vn: "Đinh lăng (roots, stems & leaves)", en: "Polyscias fruticosa" },
      { vn: "Lạc tiên", en: "Passionflower" },
      { vn: "Tâm sen", en: "Lotus plumule" },
      { vn: "Chè vằng", en: "Jasminum subtriplinerve" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A quiet evening cup for the hour before you put the day down.",
      "Soft floral-herbal notes that suit a slower night-time ritual.",
      "Naturally caffeine-free and sweetened only with stevia.",
    ],
    audience:
      "People who want a calmer evening drink after a long or restless day.",
    meta: ["Evening blend", "Calm ritual", "Herbal infusion"],
  },
  {
    slug: "giao-co-lam",
    key: "gynostemma",
    index: "03",
    name: "Trà Giảo Cổ Lam Sương Sáo TDG",
    nameAscii: "Tra Giao Co Lam Suong Sao TDG",
    shortName: "Giảo Cổ Lam Sương Sáo",
    shortNameAscii: "Giao Co Lam Suong Sao",
    category: "Daily balance / everyday cup",
    label: "Everyday balance",
    price: "$25",
    unit: "per box",
    summary:
      "A bright herbal cup with a naturally clean finish — an easy everyday pour.",
    tagline: "A bright, grounded blend for a steady everyday cup.",
    image: asset("/images/products/giao-co-lam/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/giao-co-lam/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/giao-co-lam/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/giao-co-lam/benefits.webp?v=11"),
    detailImage: asset("/images/products/giao-co-lam/detail.jpg?v=4"),
    tastingNotes: ["Bright green herbs", "Clean mineral edge", "Fresh finish"],
    ingredients: [
      { vn: "Giảo cổ lam", en: "Gynostemma pentaphyllum" },
      { vn: "Sương sáo", en: "Chinese mesona / Black grass jelly" },
      { vn: "Lá sen", en: "Lotus leaves" },
      { vn: "Xạ đen", en: "Ehretia asperula" },
      { vn: "Kim ngân", en: "Honeysuckle" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A clean, bright cup that sits easily in a weekday ritual.",
      "Light herbal finish — drink warm or over ice.",
      "Naturally caffeine-free and sweetened only with stevia.",
    ],
    audience:
      "Anyone looking for a simple daily herbal tea with a clean finish.",
    note: "Traditional herbal tea. Not a treatment for blood pressure or cholesterol.",
    meta: ["Daily blend", "Clean finish", "Natural herbs"],
  },
  {
    slug: "bup-oi",
    key: "guava",
    index: "04",
    name: "Trà Búp Ổi Thìa Canh TDG",
    nameAscii: "Tra Bup Oi Thia Canh TDG",
    shortName: "Búp Ổi Thìa Canh",
    shortNameAscii: "Bup Oi Thia Canh",
    category: "Daily balance / after meals",
    label: "Light daily cup",
    price: "$25",
    unit: "per box",
    summary:
      "A light, refreshing blend for a balanced daily ritual, with a clean finish that pairs easily with meals.",
    tagline: "A clean daily cup that sits lightly after meals.",
    image: asset("/images/products/bup-oi/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/bup-oi/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/bup-oi/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/bup-oi/benefits.webp?v=11"),
    detailImage: asset("/images/products/bup-oi/detail.jpg?v=4"),
    tastingNotes: ["Fresh leafy aroma", "Subtle sweetness", "Crisp finish"],
    ingredients: [
      { vn: "Búp ổi", en: "Young guava leaves / buds" },
      { vn: "Dây thìa canh", en: "Gymnema sylvestre" },
      { vn: "Lá khổ qua", en: "Bitter melon leaves" },
      { vn: "Lá dâu tằm", en: "Mulberry leaves" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A light, refreshing cup often enjoyed with or after a meal.",
      "Clean herbal finish with a hint of stevia — no added sugar.",
      "100% natural herbs, packed as a traditional tea bag.",
    ],
    audience:
      "Anyone who wants a light herbal tea as part of a weekday meal ritual.",
    meta: ["Daily blend", "Light finish", "Meal friendly"],
  },
  {
    slug: "gung-dang-sam",
    key: "ginger",
    index: "05",
    name: "Trà Gừng Đẳng Sâm TDG",
    nameAscii: "Tra Gung Dang Sam TDG",
    shortName: "Gừng Đẳng Sâm",
    shortNameAscii: "Gung Dang Sam",
    category: "Restore / warmth",
    label: "Warmth & spice",
    price: "$25",
    unit: "per box",
    summary:
      "A warming, aromatic cup for slow mornings — ginger-forward with a long, gentle finish.",
    tagline: "A warming blend for slow mornings and a settled cup.",
    image: asset("/images/products/gung-dang-sam/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/gung-dang-sam/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/gung-dang-sam/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/gung-dang-sam/benefits.webp?v=11"),
    detailImage: asset("/images/products/gung-dang-sam/detail.jpg?v=4"),
    tastingNotes: ["Warm ginger spice", "Rounded root aroma", "Long gentle finish"],
    ingredients: [
      { vn: "Gừng", en: "Ginger" },
      { vn: "Đẳng sâm", en: "Codonopsis / Poor man's ginseng" },
      { vn: "Hồng sâm", en: "Red ginseng" },
      { vn: "Hoa cúc", en: "Chamomile / Chrysanthemum" },
      { vn: "Quế", en: "Cinnamon" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A warming, aromatic cup for cooler mornings and slower starts.",
      "Ginger and cinnamon notes that sit well after a meal.",
      "Naturally caffeine-free and sweetened only with stevia.",
    ],
    audience:
      "People who prefer a warming herbal tea, especially in cooler weather.",
    meta: ["Warming blend", "Morning ritual", "Aromatic herbs"],
  },
  {
    slug: "tia-to",
    key: "perilla",
    index: "06",
    name: "Trà Tía Tô Tầm Bóp TDG",
    nameAscii: "Tra Tia To Tam Bop TDG",
    shortName: "Tía Tô Tầm Bóp",
    shortNameAscii: "Tia To Tam Bop",
    category: "Daily balance / herb-forward",
    label: "Herb-forward daily cup",
    price: "$25",
    unit: "per box",
    summary:
      "A herb-forward blend for everyday movement, designed to bring comfort and a clean, earthy finish.",
    tagline: "A herb-forward cup with a clean, earthy finish for everyday drinking.",
    image: asset("/images/products/tia-to/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/tia-to/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/tia-to/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/tia-to/benefits.webp?v=11"),
    detailImage: asset("/images/products/tia-to/detail.jpg?v=4"),
    tastingNotes: ["Aromatic perilla", "Earthy herb body", "Dry clean finish"],
    ingredients: [
      { vn: "Tía tô", en: "Perilla leaves" },
      { vn: "Tầm bóp", en: "Cutleaf groundcherry / Physalis angulata" },
      { vn: "Hy thiêm", en: "Siegesbeckia orientalis" },
      { vn: "Thiên niên kiện", en: "Homalomena occulta" },
      { vn: "Lá lốt", en: "Wild betel leaf" },
      { vn: "Dây gắm", en: "Gnetum montanum" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "A herb-forward cup with an earthy finish, made for everyday drinking.",
      "Traditionally blended perilla and accompanying Vietnamese herbs.",
      "Naturally caffeine-free and sweetened only with stevia.",
    ],
    audience:
      "Anyone who prefers a more herbal, earthy tea as part of a daily stretch or walk.",
    meta: ["Daily blend", "Earthy finish", "Natural herbs"],
  },
];

export const featuredPair = [products[0], products[1]] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const brewSteps = [
  {
    number: "01 / WATER",
    title: "Use freshly boiled water",
    body: "Pour 250 ml of hot water over one tea bag and allow the blend to open fully.",
  },
  {
    number: "02 / TIME",
    title: "Steep for five to seven minutes",
    body: "Adjust the time to taste. Enjoy warm, or pour over ice for a lighter finish.",
  },
  {
    number: "03 / RHYTHM",
    title: "Make it part of your rhythm",
    body: "Follow the serving guidance for your chosen blend and pair it with a quiet pause.",
  },
];
