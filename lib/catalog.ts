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
    category: "Restore / liver & cooling",
    label: "Liver detox & cooling",
    price: "$25",
    unit: "per box",
    bestSeller: true,
    summary:
      "A cooling, grounded herbal blend for days when you want to feel lighter, clearer and restored.",
    tagline: "A cooling herbal blend for liver support, detoxification and refreshed energy.",
    image: asset("/images/products/ca-gai-leo/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/ca-gai-leo/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/ca-gai-leo/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/ca-gai-leo/benefits.webp?v=11"),
    detailImage: asset("/images/products/ca-gai-leo/detail.jpg?v=4"),
    ingredients: [
      { vn: "Cà gai leo", en: "Solanum procumbens" },
      { vn: "Rau má", en: "Centella / Pennywort" },
      { vn: "An xoa", en: "Helicteres hirsuta" },
      { vn: "Kim ngân đằng", en: "Honeysuckle stem" },
      { vn: "Xạ đen", en: "Ehretia asperula" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "Supports liver cooling, aids detoxification, and promotes overall liver health.",
      "Helps relieve fatigue and sluggishness; minimizes internal heat and acne breakouts.",
      "Aids digestion, stimulates appetite, and supports post-alcohol recovery and bodily detoxification.",
    ],
    audience:
      "Night owls, individuals who frequently consume alcohol or spicy, oily foods, and those with elevated liver enzymes.",
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
    category: "Calm / sleep & relaxation",
    label: "Sleep & relaxation",
    price: "$25",
    unit: "per box",
    summary:
      "A gentle evening infusion that helps quiet the mind and create a softer transition into rest.",
    tagline: "A soft evening infusion that helps quiet the mind and support restorative sleep.",
    image: asset("/images/products/dinh-lang/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/dinh-lang/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/dinh-lang/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/dinh-lang/benefits.webp?v=11"),
    detailImage: asset("/images/products/dinh-lang/detail.jpg?v=4"),
    ingredients: [
      { vn: "Đinh lăng (roots, stems & leaves)", en: "Polyscias fruticosa" },
      { vn: "Lạc tiên", en: "Passionflower" },
      { vn: "Tâm sen", en: "Lotus plumule" },
      { vn: "Chè vằng", en: "Jasminum subtriplinerve" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "Relaxes the nervous system, supports sleep quality, and helps you fall asleep faster and deeper.",
      "Aids in physical recovery, revitalizes energy, and relieves bodily exhaustion after illness or stressful work.",
      "Acts as a mild diuretic to support natural internal cleansing.",
    ],
    audience:
      "People suffering from insomnia, restless sleep, high stress, or nervous exhaustion.",
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
    category: "Daily balance / cardiovascular",
    label: "Heart & balance",
    price: "$25",
    unit: "per box",
    summary:
      "A bright herbal cup with a naturally clean finish, made to support steady circulation and daily balance.",
    tagline: "A bright, grounded blend for circulation and steady everyday balance.",
    image: asset("/images/products/giao-co-lam/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/giao-co-lam/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/giao-co-lam/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/giao-co-lam/benefits.webp?v=11"),
    detailImage: asset("/images/products/giao-co-lam/detail.jpg?v=4"),
    ingredients: [
      { vn: "Giảo cổ lam", en: "Gynostemma pentaphyllum" },
      { vn: "Sương sáo", en: "Chinese mesona / Black grass jelly" },
      { vn: "Lá sen", en: "Lotus leaves" },
      { vn: "Xạ đen", en: "Ehretia asperula" },
      { vn: "Kim ngân", en: "Honeysuckle" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "Supports blood circulation, helps balance and stabilize blood pressure, and protects cardiovascular health.",
      "Enhances cerebral blood flow, easing headaches, dizziness, and lightheadedness.",
      "Boosts endurance and helps relieve everyday stress.",
    ],
    audience:
      "Individuals with high blood pressure, high blood lipid/cholesterol levels, and the elderly seeking better cerebral circulation.",
    note: "Not recommended for individuals with low blood pressure.",
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
    category: "Daily balance / blood sugar",
    label: "Sugar & digestion",
    price: "$25",
    unit: "per box",
    summary:
      "A light, refreshing blend for a balanced daily ritual, with a clean finish that pairs easily with meals.",
    tagline: "A clean daily cup for healthy blood sugar balance, digestion and lightness.",
    image: asset("/images/products/bup-oi/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/bup-oi/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/bup-oi/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/bup-oi/benefits.webp?v=11"),
    detailImage: asset("/images/products/bup-oi/detail.jpg?v=4"),
    ingredients: [
      { vn: "Búp ổi", en: "Young guava leaves / buds" },
      { vn: "Dây thìa canh", en: "Gymnema sylvestre" },
      { vn: "Lá khổ qua", en: "Bitter melon leaves" },
      { vn: "Lá dâu tằm", en: "Mulberry leaves" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "Supports healthy blood sugar regulation, aids glucose metabolism, and promotes metabolic balance.",
      "Maintains a healthy digestive tract and assists in healthy weight management.",
      "Purifies the body, aiding in the relief of numbness in extremities caused by poor circulation or elevated blood sugar.",
    ],
    audience:
      "People with diabetes or pre-diabetes, those watching their blood sugar levels, and individuals aiming to maintain a healthy physique.",
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
    category: "Restore / immunity & warmth",
    label: "Warmth & immunity",
    price: "$25",
    unit: "per box",
    summary:
      "A warming, aromatic cup for slow mornings, settled digestion and a little extra support through the day.",
    tagline: "A warming blend to soothe digestion, support immunity and settle the body.",
    image: asset("/images/products/gung-dang-sam/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/gung-dang-sam/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/gung-dang-sam/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/gung-dang-sam/benefits.webp?v=11"),
    detailImage: asset("/images/products/gung-dang-sam/detail.jpg?v=4"),
    ingredients: [
      { vn: "Gừng", en: "Ginger" },
      { vn: "Đẳng sâm", en: "Codonopsis / Poor man's ginseng" },
      { vn: "Hồng sâm", en: "Red ginseng" },
      { vn: "Hoa cúc", en: "Chamomile / Chrysanthemum" },
      { vn: "Quế", en: "Cinnamon" },
      { vn: "Cỏ ngọt", en: "Stevia" },
    ],
    benefits: [
      "Warms the body, soothes the stomach and spleen, improves digestion, and relieves bloating and indigestion.",
      "Naturally boosts immune resistance, vital energy, and stamina.",
      "Helps alleviate feelings of nausea and motion sickness during travel.",
    ],
    audience:
      "People with a cold body constitution (frequently cold hands and feet), poor digestion, and women needing internal warmth during menstrual periods.",
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
    category: "Daily balance / joint & bone",
    label: "Joint & bone health",
    price: "$25",
    unit: "per box",
    summary:
      "A herb-forward blend for everyday movement, designed to bring comfort and a clean, earthy finish.",
    tagline: "A herb-forward cup for joints, bones and a more comfortable daily rhythm.",
    image: asset("/images/products/tia-to/packshot.jpg?v=7"),
    lifestyleImage: asset("/images/products/tia-to/lifestyle.jpg?v=4"),
    sceneImage: asset("/images/products/tia-to/scene.jpg?v=5"),
    benefitsImage: asset("/images/products/tia-to/benefits.webp?v=11"),
    detailImage: asset("/images/products/tia-to/detail.jpg?v=4"),
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
      "Supports joint and bone health, enhances physical mobility and flexibility, and eases joint stiffness and aches.",
      "Promotes the elimination of excess uric acid, aiding deep bodily purification from within.",
    ],
    audience:
      "Individuals experiencing joint and bone discomfort, people with high uric acid levels, athletes, and the elderly.",
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
