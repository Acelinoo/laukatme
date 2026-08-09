export interface Product {
  id: string;
  name: string;
  category: "Ikan Utuh" | "Udang" | "Kerang" | "Cumi" | "Fillet";
  pricePerKg: number;
  displayPriceText: string;
  originalPriceText?: string;
  discountBadge?: string;
  image: string;
  isCatchOfDay?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  minWeightGram: number;
  note?: string;
  portionEstimate: string;
  availableCutOptions: string[];
}

export const SHRIMP_CUT_OPTIONS = [
  "Utuh Segar Kepala & Kulit (Gratis)",
  "Kupas Kepala Saja (Gratis)",
  "Kupas Kulit & Buang Urat Kotoran (Gratis)",
];

export const SQUID_CUT_OPTIONS = [
  "Utuh Bersih Tinta & Tulang Lunak (Gratis)",
  "Potong Ring Cumi Sedang (Gratis)",
  "Potong Ring Cumi Kecil (Gratis)",
];

export const FISH_CUT_OPTIONS = [
  "Utuh Bersih Sisik, Insang, & Isi Perut (Gratis)",
  "Potong Steak / Irisan Melintang (Gratis)",
  "Belah Dua Kipas / Olahan Bakar (Gratis)",
];

export const TENGGIRI_CUT_OPTIONS = [
  "Utuh Bersih Sisik & Insang (Gratis)",
  "Potong Steak / Irisan (Gratis)",
  "Giling Halus Bahan Pempek / Otak-Otak / Bakso (Gratis)",
];

export const FILLET_CUT_OPTIONS = [
  "Fillet Utuh Bersih Tanpa Duri (Gratis)",
  "Potong Dadu / Bite Size (Gratis)",
  "Potong Irisan Steak Fillet (Gratis)",
];

export const CLAM_CUT_OPTIONS = [
  "Utuh Segar Cuci Bersih Muara (Gratis)",
  "Rebus Setengah Matang (Gratis)",
];

export const INITIAL_PRODUCTS: Product[] = [
  // UDANG
  {
    id: "p1",
    name: "Udang Vaname Kecil",
    category: "Udang",
    pricePerKg: 55000,
    displayPriceText: "Rp 55.000 / kg",
    image: "/images/udang%20vuname%20kecil.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Isi ± 200 pcs per kg. Manis alami & segar.",
    portionEstimate: "🍽️ 1 kg cukup untuk 4-5 porsi keluarga",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p2",
    name: "Udang Vaname Sedang (M)",
    category: "Udang",
    pricePerKg: 80000,
    displayPriceText: "Rp 80.000 / kg",
    image: "/images/udang%20vuname%20sedang.webp",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    isBestSeller: true,
    note: "Ukuran medium pas untuk olahan asam manis atau mentega.",
    portionEstimate: "🍽️ 1 kg cukup untuk 3-4 porsi keluarga",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p3",
    name: "Udang Vaname Besar (L)",
    category: "Udang",
    pricePerKg: 100000,
    displayPriceText: "Rp 100.000 / kg",
    originalPriceText: "Rp 115.000",
    discountBadge: "Hemat 13%",
    image: "/images/udang%20vuname%20besar.webp",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    isBestSeller: true,
    note: "Ukuran besar padat berisi. Sangat populer untuk udang bakar.",
    portionEstimate: "🍽️ 1 kg cukup untuk 3-4 porsi besar",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p4",
    name: "Udang Kupas",
    category: "Udang",
    pricePerKg: 110000,
    displayPriceText: "Rp 110.000 / kg",
    image: "/images/udang%20vuname%20sedang.webp",
    inStock: true,
    minWeightGram: 250,
    note: "Praktis tanpa kulit, bersih siap langsung masak.",
    portionEstimate: "🍽️ 1 kg cukup untuk 5-6 porsi tumis",
    availableCutOptions: [
      "Bersih Bersih Siap Masak (Gratis)",
      "Buang Urat Kotoran Punggung (Gratis)",
    ],
  },

  // CUMI
  {
    id: "p5",
    name: "Cumi-Cumi Segar (1 kg)",
    category: "Cumi",
    pricePerKg: 75000,
    displayPriceText: "Rp 75.000 / kg",
    originalPriceText: "Rp 85.000",
    discountBadge: "Promo Diskon",
    image: "/images/cumi.webp",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    isBestSeller: true,
    note: "Bisa dipotong ring sedang / kecil (Gratis). Daging kenyal & segar.",
    portionEstimate: "🍽️ 1 kg cukup untuk 4-5 porsi olahan ring",
    availableCutOptions: SQUID_CUT_OPTIONS,
  },

  // FILLET
  {
    id: "p6",
    name: "Kakap Fillet",
    category: "Fillet",
    pricePerKg: 70000,
    displayPriceText: "Rp 70.000 / kg",
    image: "/images/ikan%20kakap%20fillet.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Daging kakap bersih tanpa tulang & tanpa duri.",
    portionEstimate: "🍽️ 1 kg cukup untuk 4-5 porsi fillet steak",
    availableCutOptions: FILLET_CUT_OPTIONS,
  },
  {
    id: "p7",
    name: "Patin Fillet",
    category: "Fillet",
    pricePerKg: 45000,
    displayPriceText: "Rp 45.000 / kg",
    image: "/images/ikan%20patin%20fillet.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Daging patin bersih siap goreng krispi atau sup.",
    portionEstimate: "🍽️ 1 kg cukup untuk 4-5 porsi goreng krispi",
    availableCutOptions: FILLET_CUT_OPTIONS,
  },

  // IKAN UTUH
  {
    id: "p8",
    name: "Gurame Hidup",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "/images/ikan%20gurame.webp",
    inStock: true,
    minWeightGram: 700,
    isCatchOfDay: true,
    note: "Ikan gurame dalam keadaan hidup. Bersih sisik & insang gratis.",
    portionEstimate: "🍽️ 1 kg berisi 1-2 ekor (3-4 porsi bakar/terbang)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p9",
    name: "Tenggiri Super",
    category: "Ikan Utuh",
    pricePerKg: 85000,
    displayPriceText: "Rp 80.000 - 90.000 / kg",
    originalPriceText: "Rp 100.000",
    discountBadge: "Best Seller",
    image: "/images/ikan%20tenggiri%20super.webp",
    inStock: true,
    minWeightGram: 500,
    isBestSeller: true,
    note: "Kualitas super. Dapat digiling halus (Bahan Pempek / Otak-otak).",
    portionEstimate: "🍽️ 1 kg giling cukup untuk 40-50 pcs pempek",
    availableCutOptions: TENGGIRI_CUT_OPTIONS,
  },
  {
    id: "p10",
    name: "Tenggiri Biasa",
    category: "Ikan Utuh",
    pricePerKg: 62500,
    displayPriceText: "Rp 60.000 - 65.000 / kg",
    image: "/images/ikan%20tenggiri%20biasa.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Dapat digiling (Bahan olahan bakso / siomay).",
    portionEstimate: "🍽️ 1 kg giling cukup untuk 30-40 pcs siomay",
    availableCutOptions: TENGGIRI_CUT_OPTIONS,
  },
  {
    id: "p11",
    name: "Teri Nasi",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "/images/ikan%20nasi%20teri.webp",
    inStock: true,
    minWeightGram: 250,
    note: "Teri nasi segar halus pilihan.",
    portionEstimate: "🍽️ 1 kg cukup untuk 6-8 porsi rempeyek / tumisan",
    availableCutOptions: ["Bersih Cuci Tiriskan (Gratis)"],
  },
  {
    id: "p12",
    name: "Patin Daging",
    category: "Ikan Utuh",
    pricePerKg: 30000,
    displayPriceText: "Rp 30.000 / kg",
    image: "/images/ikan%20patin%20daging.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Ikan patin segar potongan / utuh.",
    portionEstimate: "🍽️ 1 kg berisi 2-3 ekor (4-5 porsi sup)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p13",
    name: "Ikan Kembung",
    category: "Ikan Utuh",
    pricePerKg: 45000,
    displayPriceText: "Rp 45.000 / kg",
    image: "/images/ikan%20kembung.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Isi ± 11 ekor per kg. Gurih kaya gizi.",
    portionEstimate: "🍽️ 1 kg berisi ± 11 ekor (5-6 porsi makan)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p14",
    name: "Ikan Banjar",
    category: "Ikan Utuh",
    pricePerKg: 40000,
    displayPriceText: "Rp 40.000 / kg",
    image: "/images/ikan%20kembung.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Ikan banjar kembung manis gurih.",
    portionEstimate: "🍽️ 1 kg berisi ± 10 ekor (4-5 porsi)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p15",
    name: "Bawal Putih",
    category: "Ikan Utuh",
    pricePerKg: 180000,
    displayPriceText: "Rp 180.000 / kg",
    originalPriceText: "Rp 200.000",
    discountBadge: "Diskon 10%",
    image: "/images/ikan%20bawal%20putih.webp",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    isBestSeller: true,
    note: "Isi 3 - 4 ekor per kg. Kelas restoran & kualitas istimewa.",
    portionEstimate: "🍽️ 1 kg berisi 3-4 ekor (4 porsi spesial)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p16",
    name: "Bawal Hitam",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "/images/ikan%20bawal%20merah.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Bawal hitam segar cocok untuk bakar & tauco.",
    portionEstimate: "🍽️ 1 kg berisi 3-4 ekor (3-4 porsi bakar)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p17",
    name: "Ikan Nila",
    category: "Ikan Utuh",
    pricePerKg: 32500,
    displayPriceText: "Rp 30.000 - 35.000 / kg",
    image: "/images/ikan%20nila.webp",
    inStock: true,
    minWeightGram: 500,
    note: "Isi 3 - 5 ekor per kg. Segar gurih enak digoreng krispi.",
    portionEstimate: "🍽️ 1 kg berisi 3-5 ekor (4-5 porsi goreng)",
    availableCutOptions: FISH_CUT_OPTIONS,
  },

  // KERANG
  {
    id: "p18",
    name: "Kerang Dara Kecil",
    category: "Kerang",
    pricePerKg: 27500,
    displayPriceText: "Rp 25.000 - 30.000 / kg",
    image: "/images/kerang%20dara%20kecil.webp",
    inStock: true,
    minWeightGram: 1000,
    note: "Kerang dara segar muara ukuran kecil.",
    portionEstimate: "🍽️ 1 kg cukup untuk 2-3 porsi rebus muara",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
  {
    id: "p19",
    name: "Kerang Dara Sedang",
    category: "Kerang",
    pricePerKg: 32500,
    displayPriceText: "Rp 30.000 - 35.000 / kg",
    image: "/images/kerang%20dara%20sedang.webp",
    inStock: true,
    minWeightGram: 1000,
    note: "Kerang dara segar muara ukuran sedang.",
    portionEstimate: "🍽️ 1 kg cukup untuk 2-3 porsi saus padang",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
  {
    id: "p20",
    name: "Kerang Dara Besar",
    category: "Kerang",
    pricePerKg: 37500,
    displayPriceText: "Rp 35.000 - 40.000 / kg",
    image: "/images/kerang%20dara%20besar.webp",
    inStock: true,
    minWeightGram: 1000,
    isCatchOfDay: true,
    note: "Kerang dara segar muara ukuran besar padat.",
    portionEstimate: "🍽️ 1 kg cukup untuk 2-3 porsi rebus besar",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
];

const STORAGE_KEY = "laukatme_products_v2";

export function loadStoredProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // ENSURE CUMI IMAGE PATH IS ALWAYS PROPERLY FORMATTED
      return parsed.map((item: Product) => {
        if (item.id === "p5" || item.name.toLowerCase().includes("cumi")) {
          return {
            ...item,
            image: item.image || "/images/cumi.webp",
          };
        }
        return item;
      });
    }
  } catch (err) {
    console.error("Error reading stored products", err);
  }
  return INITIAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event("laukatme_products_updated"));
  } catch (err) {
    console.error("Error saving products to storage", err);
  }
}
