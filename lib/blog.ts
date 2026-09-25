import { asset } from "./asset";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string }
  | { type: "media"; images: { src: string; alt: string; caption: string }[] };

export type BlogPost = {
  slug: string;
  index: string;
  label: string;
  title: string;
  lede: string;
  cover: string;
  coverAlt: string;
  blocks: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "caring-for-your-liver",
    index: "01",
    label: "Article 01 · Herbal wellness",
    title: "A cooling daily cup, one ritual at a time",
    lede: "A closer look at the six-herb Cà Gai Leo Rau Má blend and the everyday habits that go with it.",
    cover: asset("/images/blog/caring-for-your-liver/cover.webp"),
    coverAlt: "Vietnamese highland herbs for Cà Gai Leo Rau Má TDG Tea",
    blocks: [
      {
        type: "p",
        text: "Cà Gai Leo - Rau Má is one of the blends Vietnamese households have kept in the kitchen for generations — a cooling, slightly bitter cup for hot days and heavy meals.",
      },
      {
        type: "p",
        text: "This journal is about the cup itself: which herbs go in, how the blend tastes, and how people drink it day to day. It is not a health programme, and nothing here is a medical claim.",
      },
      { type: "h2", text: "The Art of Blending: The Power from 6 Precious Herbs" },
      {
        type: "p",
        text: "Six herbs, dried and blended. That is the whole formula.",
      },
      {
        type: "ul",
        items: [
          "Cà Gai Leo (Solanum procumbens) — traditionally drunk in Vietnam as a cooling everyday herb. Slightly bitter, it is the backbone of this blend.",
          "Rau Má (Gotu Kola / Centella asiatica) — a familiar cooling green, used here for a fresher cup rather than a heavy decoction.",
          "An Xoa (Helicteres hirsuta) — a supporting herb in the traditional mix, adding a dry, woody note.",
          "Xạ Đen — included for its place in highland herbal tradition and a deeper colour in the liquor.",
          "Kim Ngân Đằng (Honeysuckle vine) — a light, floral-herbal edge that keeps the cup from tasting only bitter.",
          "Cỏ Ngọt (Stevia) — a natural, calorie-free sweetness so the blend drinks easily without added sugar.",
        ],
      },
      {
        type: "media",
        images: [
          {
            src: asset("/images/blog/caring-for-your-liver/herbs.webp"),
            alt: "Natural herbs used in the Cà Gai Leo Rau Má blend",
            caption: "Six natural herbs, traditionally blended for a balanced daily cup.",
          },
          {
            src: asset("/images/blog/caring-for-your-liver/cup.webp"),
            alt: "A warm cup of herbal tea",
            caption: "A warm tea ritual that fits naturally into the day.",
          },
        ],
      },
      { type: "h2", text: "The Daily Tea Ritual" },
      {
        type: "p",
        text: "A daily cup is a small habit, not a health programme.",
      },
      {
        type: "ul",
        items: [
          "Dosage: 2–3 tea bags daily, brewed with 500ml of boiling water (90–100°C) and steeped for 5 minutes.",
          "When: warm after breakfast, or as small sips through the day instead of something sweet.",
        ],
      },
      {
        type: "p",
        text: "Kept as a daily cup for a few weeks, it is simply a cooling ritual — not a medical programme and not a substitute for clinical care.",
      },
      {
        type: "p",
        text: "If a cup does not sit well with you, drink less of it or stop. That is the only signal worth reading here.",
      },
      {
        type: "p",
        text: "If you are pregnant, nursing, giving tea to a young child, or take prescription medicine, ask a clinician before making it a daily habit.",
      },
      {
        type: "p",
        text: "The rest of the day still counts: eat something green, sleep, move a little. A cup of tea sits inside a week — it does not replace one.",
      },
    ],
  },
  {
    slug: "six-natural-herbs",
    index: "02",
    label: "Article 02 · TDG Tea guide",
    title: "What is actually in the bag: six herbs, explained",
    lede: "Where each plant comes from, how it tastes, and what it contributes to the blend.",
    cover: asset("/images/blog/six-natural-herbs/cover.webp"),
    coverAlt: "Sustainable herb gardens for TDG Tea",
    blocks: [
      {
        type: "p",
        text: "Late nights, takeout, and stress are ordinary parts of a modern week. Plenty of people want a simple drink they can make at home rather than another routine to keep up with — which is what a herbal blend in a teabag is for.",
      },
      { type: "h2", text: "What People Mean by a “Cooling” Cup" },
      {
        type: "p",
        text: "In Vietnamese herbal tradition, some plants are described as cooling and some as warming. It is a way of talking about taste and how a cup sits with you — not a clinical category:",
      },
      {
        type: "ul",
        items: [
          "Cà Gai Leo — slightly bitter, the backbone of the blend and the plant the blend is named for.",
          "Rau Má (Gotu Kola) — mild, fresh, and green; it softens the bitterness.",
          "An Xoa, Xạ Đen — dry, woody notes that give the liquor depth and colour.",
          "Kim Ngân Đằng — a light floral edge.",
          "Cỏ Ngọt (Stevia) — natural sweetness, so no sugar is needed.",
        ],
      },
      {
        type: "p",
        text: "That is the vocabulary we use. It describes flavour and tradition — not an effect on any organ or condition.",
      },
      {
        type: "p",
        text: "The blend is simply dried herbs in a bag. What it offers is a cup you can look forward to, a reason to pause, and a habit that fits into a normal week.",
      },
      {
        type: "p",
        text: "When the body lacks the conditions to balance itself, common signs may appear — such as internal heat, prolonged fatigue, breakouts, dull skin, itchiness, poor appetite, or general discomfort. This is why many choose to integrate gentle herbal drinks into their daily routine to support the body’s well-being right from the root.",
      },
      { type: "h2", text: "Six herbs, one daily cup" },
      {
        type: "p",
        text: "Trà Cà Gai Leo Rau Má is a traditional Vietnamese herbal tea. It is blended for a cooling, everyday cup — not as a treatment, and not as a substitute for clinical care. The herbs below are the plants in the bag, described the way a tea maker would talk about them.",
      },
      {
        type: "p",
        text: "Each plant has a role in flavour and in the folk tradition the blend comes from. Together they make a cup you can drink daily. That is the whole claim.",
      },
      {
        type: "ul",
        items: [
          "Cà gai leo — the namesake herb: slightly bitter, the backbone of the liquor.",
          "Rau má — a familiar cooling green that keeps the cup fresh rather than heavy.",
          "An xoa — a dry, woody supporting note in the traditional mix.",
          "Xạ đen — a darker highland herb that deepens colour in the cup.",
          "Kim ngân đằng — honeysuckle vine, a lighter floral-herbal edge.",
          "Cỏ ngọt — stevia, so the blend drinks easily without added sugar.",
        ],
      },
      {
        type: "media",
        images: [
          {
            src: asset("/images/blog/six-natural-herbs/pouch.webp"),
            alt: "TDG Cà Gai Leo Rau Má tea packaging",
            caption: "TDG’s herbal tea ritual, grounded in Vietnamese ingredients.",
          },
          {
            src: asset("/images/blog/six-natural-herbs/ingredients.webp"),
            alt: "Natural herbal ingredients for TDG Tea",
            caption: "The six ingredients work together as a considered blend.",
          },
        ],
      },
      { type: "h2", text: "How this cup fits a week" },
      {
        type: "ul",
        items: [
          "A cooling herbal tea for days that run late, spicy, or heavy.",
          "Built from herbs Vietnamese households already know, not from a clinical formula.",
          "Light enough to drink warm in the morning or poured over ice later.",
          "No added sugar — sweetness comes only from stevia.",
        ],
      },
      {
        type: "note",
        text: "TDG Tea is a traditional herbal tea sold as food. It is not a medicine and does not replace medical treatment.",
      },
      { type: "h2", text: "Who tends to keep this blend around" },
      {
        type: "p",
        text: "People who want a cooling daily cup, especially after rich meals or long weeks — not as a treatment plan.",
      },
      {
        type: "ul",
        items: [
          "Anyone who likes a slightly bitter, cooling Vietnamese herbal tea.",
          "People who eat spicy or oily food and want a lighter drink alongside it.",
          "Late workers looking for a caffeine-free cup during the day.",
          "Anyone building a simple, repeatable tea habit rather than a supplement stack.",
        ],
      },
      { type: "h2", text: "Daily Tea Ritual" },
      {
        type: "ul",
        items: [
          "Brew 1 tea bag with roughly 500ml of boiling water (90–100°C) and steep for about 5 minutes.",
          "Use 2–3 tea bags daily.",
          "For a milder, lighter infusion, brew 2–3 tea bags in a 1-liter bottle to sip intermittently throughout the day.",
          "Optimal timing: Morning (about 30 minutes after breakfast) or during the day as small warm sips. Avoid drinking close to bedtime to prevent nighttime urination.",
        ],
      },
      {
        type: "p",
        text: "This versatility makes the product suitable whether you prefer a formal seated tea session or taking a thermos to the office.",
      },
      {
        type: "media",
        images: [
          {
            src: asset("/images/blog/six-natural-herbs/ingredients-2.webp"),
            alt: "Herbal ingredients prepared for a TDG Tea blend",
            caption: "From ingredient selection to a steady daily ritual.",
          },
        ],
      },
      { type: "h2", text: "Give the ritual a few weeks" },
      {
        type: "p",
        text: "This is a tea habit, not a course of treatment. Taste, and whether you look forward to the cup, are the only outcomes we talk about.",
      },
      {
        type: "ul",
        items: [
          "The first days are about finding a brew you like — stronger in a mug, or lighter in a bottle.",
          "After a couple of weeks it is simply whether the ritual stuck.",
          "There is no timeline for a health result, because this is food, not medicine.",
        ],
      },
      {
        type: "p",
        text: "Keep the bag in the kitchen, brew it when you would otherwise reach for a sweet drink, and stop if it does not agree with you.",
      },
      { type: "h2", text: "Who should ask first" },
      {
        type: "p",
        text: "This is food, not a supplement protocol. If you are pregnant, nursing, giving tea to a young child, or take prescription medicine, ask a clinician before making it a daily habit. Stop if a blend does not agree with you.",
      },
      { type: "h3", text: "How we keep the bags" },
      {
        type: "ul",
        items: [
          "Store sealed, cool, and dry.",
          "Tea is not a stand-in for drinking less, sleeping more, or seeing a doctor.",
          "If you take medicine, treat this as you would any other food and ask your clinician if unsure.",
        ],
      },
      { type: "h2", text: "The rest of the day still counts" },
      {
        type: "p",
        text: "A cup of tea sits inside a week — it does not replace one:",
      },
      {
        type: "ul",
        items: [
          "Eat lighter, prioritizing green vegetables, whole grains, and lean proteins.",
          "Limit deep-fried foods, sweets, and overly salty items.",
          "Stay well-hydrated throughout the day.",
          "Sleep earlier, aiming to be asleep before 11 PM.",
          "Reduce stress through walking, yoga, deep breathing, or light meditation.",
          "Undergo routine health check-ups when needed.",
        ],
      },
      {
        type: "p",
        text: "Herbal tea is an integral part of a better living journey, not a substitute for a healthy daily lifestyle.",
      },
      { type: "h2", text: "Why Choose Products from TDG Tea?" },
      {
        type: "p",
        text: "TDG Tea is built around a simple idea: Vietnamese herbs, packed as tea, drunk as a daily cup. We do not sell a medical theory. We sell blends you can brew.",
      },
      {
        type: "p",
        text: "This provides peace of mind for daily consumption, especially for those looking to replace sugary soft drinks or overly strong coffee.",
      },
      { type: "h2", text: "A Cup of Tea — An Act of Self-Love" },
      {
        type: "p",
        text: "Trà Cà Gai Leo Rau Má is a six-herb cup — cà gai leo, rau má, an xoa, kim ngân đằng, xạ đen, and cỏ ngọt — for anyone who wants a cooling Vietnamese tea in the week, not a programme.",
      },
      {
        type: "p",
        text: "A daily cup of tea may not create immediate, dramatic changes, but it is a gentle way to care for yourself starting from the smallest daily habits.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
