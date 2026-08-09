"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
  Filter,
  CheckCircle2,
  PhoneCall,
  Scale,
  Scissors,
  Plus,
  Minus,
  X,
  MessageCircle,
  Clock,
  CalendarOff,
  Copy,
  Check,
  Award,
  PackageCheck,
  CreditCard,
  QrCode,
  Building2,
  FileText,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import AnimatedList from "@/components/AnimatedList";

interface Product {
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

// SPECIFIC CUT OPTIONS PER CATEGORY / TYPE
const SHRIMP_CUT_OPTIONS = [
  "Utuh Segar Kepala & Kulit (Gratis)",
  "Kupas Kepala Saja (Gratis)",
  "Kupas Kulit & Buang Urat Kotoran (Gratis)",
];

const SQUID_CUT_OPTIONS = [
  "Utuh Bersih Tinta & Tulang Lunak (Gratis)",
  "Potong Ring Cumi Sedang (Gratis)",
  "Potong Ring Cumi Kecil (Gratis)",
];

const FISH_CUT_OPTIONS = [
  "Utuh Bersih Sisik, Insang, & Isi Perut (Gratis)",
  "Potong Steak / Irisan Melintang (Gratis)",
  "Belah Dua Kipas / Olahan Bakar (Gratis)",
];

const TENGGIRI_CUT_OPTIONS = [
  "Utuh Bersih Sisik & Insang (Gratis)",
  "Potong Steak / Irisan (Gratis)",
  "Giling Halus Bahan Pempek / Otak-Otak / Bakso (Gratis)",
];

const FILLET_CUT_OPTIONS = [
  "Fillet Utuh Bersih Tanpa Duri (Gratis)",
  "Potong Dadu / Bite Size (Gratis)",
  "Potong Irisan Steak Fillet (Gratis)",
];

const CLAM_CUT_OPTIONS = [
  "Utuh Segar Cuci Bersih Muara (Gratis)",
  "Rebus Setengah Matang (Gratis)",
];

const PRODUCTS: Product[] = [
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

export default function Home() {
  // LOADING SCREEN STATES
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);
  const [isLoadingExiting, setIsLoadingExiting] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [cart, setCart] = useState<{ product: Product; weightGram: number; cutOption: string }[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [modalWeight, setModalWeight] = useState<number>(1000);
  const [modalCut, setModalCut] = useState<string>("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [includeIceGel, setIncludeIceGel] = useState<boolean>(true);
  const [includeVacuum, setIncludeVacuum] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [courierOption, setCourierOption] = useState<string>("Instant (Gojek/Grab)");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // IMAGE LIGHTBOX POPUP STATE
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // PAYMENT MODAL & ORDER PROCESSING STAGE STATES
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"BCA" | "QRIS">("BCA");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [isAccountCopied, setIsAccountCopied] = useState<boolean>(false);
  const [orderProcessingStage, setOrderProcessingStage] = useState<number>(0);

  // INITIAL LOADING SCREEN TIMER
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsLoadingExiting(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsLoadingVisible(false);
    }, 2650);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const categories = ["Semua", "Ikan Utuh", "Udang", "Cumi", "Kerang", "Fillet"];

  const filteredProducts =
    selectedCategory === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const openCustomizeModal = (product: Product) => {
    setSelectedProductForModal(product);
    setModalWeight(product.minWeightGram);
    setModalCut(product.availableCutOptions[0] || "Utuh Bersih (Gratis)");
  };

  const handleAddToCart = () => {
    if (!selectedProductForModal) return;
    setCart((prev) => [
      ...prev,
      {
        product: selectedProductForModal,
        weightGram: modalWeight,
        cutOption: modalCut,
      },
    ]);
    setSelectedProductForModal(null);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    const itemsTotal = cart.reduce(
      (sum, item) => sum + (item.product.pricePerKg * item.weightGram) / 1000,
      0
    );
    const iceGelCost = includeIceGel ? 5000 : 0;
    const vacuumCost = includeVacuum ? 8000 : 0;
    return itemsTotal + iceGelCost + vacuumCost;
  };

  const buildOrderSummaryText = () => {
    if (cart.length === 0) return "";
    let message = `*HALO LAUK AT ME BY UMMA — PESANAN SEAFOOD SEGAR*\n\n`;
    message += `📌 *Sistem Pemesanan:* Pre-Order H-1 (Order sebelum 18:00 WIB | Minggu OFF)\n\n`;
    message += `*Detail Pemesan:*\n`;
    message += `• Nama: ${customerName || "-"}\n`;
    message += `• Alamat: ${customerAddress || "-"}\n`;
    message += `• Opsi Pengiriman: ${courierOption}\n\n`;

    message += `*Metode Pembayaran Selected:*\n`;
    message += `• Pembayaran: ${
      selectedPaymentMethod === "BCA"
        ? "Transfer Bank BCA (No. Rek: 810-551-3964 a.n Lauk at Me)"
        : "QRIS All Payment (Scan QR Code)"
    }\n`;
    if (specialNotes) {
      message += `• Catatan Khusus: ${specialNotes}\n`;
    }
    message += `\n`;

    message += `*Daftar Pesanan Seafood:*\n`;
    cart.forEach((item, index) => {
      const itemPrice = (item.product.pricePerKg * item.weightGram) / 1000;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Jumlah/Berat: ${item.weightGram} gram (${(item.weightGram / 1000).toFixed(2)} kg)\n`;
      message += `   - Spesifikasi Potongan: ${item.cutOption}\n`;
      message += `   - Estimasi Harga: Rp ${itemPrice.toLocaleString("id-ID")}\n\n`;
    });

    message += `*Opsi Kemasan Ekstra:*\n`;
    message += `• Ice Gel Ekstra: ${includeIceGel ? "Ya (+Rp 5.000)" : "Tidak"}\n`;
    message += `• Kemasan Vakum: ${includeVacuum ? "Ya (+Rp 8.000)" : "Tidak"}\n\n`;

    message += `*Estimasi Total Biaya:* Rp ${calculateSubtotal().toLocaleString("id-ID")}\n\n`;
    message += `_Catatan: Pengiriman dilakukan H-1 (Senin-Sabtu). Total pasti dikonfirmasi Admin via WA setelah timbangan fisik presisi._`;
    return message;
  };

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText("8105513964");
      setIsAccountCopied(true);
      setTimeout(() => setIsAccountCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account number", err);
    }
  };

  const handleCopyOrderSummary = async () => {
    const text = buildOrderSummaryText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy order text", err);
    }
  };

  const handleProceedOrderWithAnimation = () => {
    if (cart.length === 0) return;
    setOrderProcessingStage(1);

    setTimeout(() => {
      setOrderProcessingStage(2);
    }, 900);

    setTimeout(() => {
      setOrderProcessingStage(3);
    }, 1800);

    setTimeout(() => {
      const text = buildOrderSummaryText();
      const adminPhone = "6289667782004";
      const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
      setOrderProcessingStage(0);
      setIsPaymentModalOpen(false);
      setIsCheckoutOpen(false);
      window.open(waUrl, "_blank");
    }, 2700);
  };

  const renderProductCard = (product: Product, index: number) => (
    <div
      key={product.id}
      style={{ animationDelay: `${Math.min(index * 65, 450)}ms` }}
      className="bg-[#FFFFFF] rounded-xl border border-[#E2ECE7] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full anim-slide-up"
    >
      <div>
        {/* PRODUCT IMAGE WITH WEBP OPTIMIZATION & LAZY LOADING */}
        <div
          onClick={() => setPreviewProduct(product)}
          className="relative h-52 overflow-hidden bg-[#F4F9F6] group cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />

          {/* HOVER ZOOM ICON OVERLAY */}
          <div className="absolute inset-0 bg-[#332219]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="bg-[#FFFFFF]/90 backdrop-blur-sm text-[#332219] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <ZoomIn className="w-4 h-4 text-[#4E6B5D]" />
              <span>Lihat Foto Dekat</span>
            </span>
          </div>

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.isCatchOfDay && (
              <span className="bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                Catch of the Day
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-[#166534] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                <Award className="w-3 h-3" /> Best Seller
              </span>
            )}
          </div>

          {product.discountBadge && (
            <span className="absolute top-3 right-3 bg-[#991B1B] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
              {product.discountBadge}
            </span>
          )}

          <span className="absolute bottom-3 right-3 bg-[#FFFFFF]/95 backdrop-blur-sm text-[#166534] text-[11px] font-semibold px-2.5 py-0.5 rounded border border-[#E2ECE7]">
            Tersedia
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#6C8276] uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#332219] mb-1">
            {product.name}
          </h3>

          {/* PORTION ESTIMATE */}
          <div className="text-[11px] font-semibold text-[#4E6B5D] mb-2 bg-[#EBF2EE] px-2.5 py-1 rounded-md inline-block">
            {product.portionEstimate}
          </div>

          {product.note && (
            <p className="text-xs text-[#7A6254] mb-3 leading-relaxed bg-[#FAF6F0] p-2 rounded-lg border border-[#E2ECE7]">
              💡 {product.note}
            </p>
          )}

          {/* HARGA CORET / DISCOUNT DISPLAY */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-[#E2ECE7] mt-3">
            <span className="text-lg font-bold text-[#332219]">
              {product.displayPriceText}
            </span>
            {product.originalPriceText && (
              <span className="text-xs text-[#7A6254] line-through">
                {product.originalPriceText}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={() => openCustomizeModal(product)}
          className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] active:scale-98 text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
        >
          <Scissors className="w-3.5 h-3.5" />
          <span>Pilih Berat & Jenis Potongan</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#332219] antialiased font-sans transition-colors duration-200 relative">
      {/* ==========================================================================
         0. INITIAL LOADING SCREEN WITH FADE-IN ON OPEN & SLIDE UP / FADE OUT ON EXIT
         ========================================================================== */}
      {isLoadingVisible && (
        <div
          className={`fixed inset-0 z-50 bg-[#FAF6F0] flex flex-col items-center justify-center p-6 text-center shadow-2xl ${
            isLoadingExiting
              ? "loading-overlay-exiting"
              : "loading-overlay-active animate-in fade-in zoom-in-95 duration-400"
          }`}
        >
          <div className="relative mb-6">
            <div className="absolute -inset-3 bg-[#4E6B5D]/20 rounded-full blur-xl animate-pulse"></div>
            <img
              src="/logo.png"
              alt="Lauk at Me Logo Loading"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#4E6B5D] relative shadow-lg animate-in zoom-in-90 duration-500"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#332219] tracking-tight font-display mb-1">
            Selamat datang di Laukatme
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#4E6B5D] tracking-wide mb-6">
            By Umma
          </p>

          <div className="w-48 bg-[#E2ECE7] h-1.5 rounded-full overflow-hidden relative">
            <div className="bg-[#4E6B5D] h-full rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#332219] text-[#FAF6F0] text-xs font-semibold py-2.5 px-4 text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1 shadow-sm anim-slide-down">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Pre-Order H-1 (Batas Order 18:00 WIB)</span>
        </div>
        <span className="hidden sm:inline text-[#7A6254]">•</span>
        <div className="flex items-center gap-1.5 text-[#F2ECE1]">
          <CalendarOff className="w-3.5 h-3.5 text-[#991B1B]" />
          <span>Hari Minggu OFF / Libur</span>
        </div>
        <span className="hidden sm:inline text-[#7A6254]">•</span>
        <div className="flex items-center gap-1 text-[#D97706] font-bold">
          <span>WA: 089667782004</span>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E2ECE7] shadow-sm transition-all duration-200 anim-slide-down anim-delay-150">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/logo.png"
              alt="Lauk at Me By Umma Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#4E6B5D] shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div>
              <span className="text-xl font-bold tracking-tight text-[#332219] font-display block leading-none">
                Lauk at Me
              </span>
              <span className="text-[12px] text-[#4E6B5D] font-semibold tracking-wide">
                By Umma
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/6289667782004"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#EBF2EE] text-[#4E6B5D] px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#4E6B5D] hover:text-white transition-all duration-200 border border-[#E2ECE7]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>089667782004</span>
            </a>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative flex items-center gap-2 bg-[#FFFFFF] border border-[#E2ECE7] hover:border-[#4E6B5D] active:scale-95 px-4 py-2.5 rounded-lg shadow-sm text-xs font-bold text-[#332219] transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4 text-[#4E6B5D]" />
              <span className="hidden sm:inline">Pesanan Saya</span>
              {cart.length > 0 && (
                <span className="bg-[#4E6B5D] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-14 px-4 border-b border-[#E2ECE7] bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 anim-slide-left anim-delay-250">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#4E6B5D] text-[11px] font-bold border border-[#E2ECE7]">
                <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Pemesanan H-1 (Batas 18:00 WIB)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#991B1B] text-[11px] font-bold border border-[#E2ECE7]">
                <CalendarOff className="w-3.5 h-3.5" />
                <span>Minggu OFF / Libur</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#332219] leading-[1.2] mb-4 font-display">
              Pilihan Seafood Segar Pesisir, Praktis Siap Olah Dapur
            </h1>

            <p className="text-sm sm:text-base text-[#523A2D] leading-relaxed mb-6 max-w-xl">
              Melayani penjualan udang vaname, cumi, gurame, bawal, fillet, dan kerang dara segar.
              Sistem <strong className="text-[#332219]">Pre-Order H-1</strong> (Pesan sebelum jam 18:00 WIB, dikirim besok pagi). Hari Minggu toko libur.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#katalog"
                className="bg-[#4E6B5D] hover:bg-[#3B5447] active:scale-95 text-white font-semibold px-6 py-3.5 rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-sm flex items-center gap-2"
              >
                <span>Lihat Menu & Harga ({PRODUCTS.length} Item)</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6289667782004"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFFFFF] border border-[#E2ECE7] hover:border-[#4E6B5D] text-[#332219] font-semibold px-5 py-3.5 rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-sm flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#166534]" />
                <span>WA Admin: 089667782004</span>
              </a>
            </div>

            {/* REACT BITS <CountUp /> STAT BADGE */}
            <div className="inline-flex items-center gap-3 bg-[#FFFFFF] px-4 py-2.5 rounded-xl border border-[#E2ECE7] shadow-sm anim-zoom-in anim-delay-400">
              <div className="p-2 rounded-lg bg-[#EBF2EE] text-[#4E6B5D]">
                <PackageCheck className="w-4.5 h-4.5 text-[#4E6B5D]" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#332219] flex items-center gap-1.5 font-display">
                <CountUp
                  from={0}
                  to={10000}
                  separator="."
                  duration={2.5}
                  className="font-bold text-[#4E6B5D]"
                />
                <span>+ Orderan Terlayani Sejak 2023</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center anim-slide-right anim-delay-300">
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2ECE7] shadow-md max-w-xs text-center hover:shadow-lg transition-shadow duration-200">
              <img
                src="/logo.png"
                alt="Logo Lauk at Me By Umma"
                className="w-44 h-44 mx-auto rounded-full object-cover border-4 border-[#4E6B5D] mb-3 shadow-inner hover:scale-105 transition-transform duration-200"
              />
              <h3 className="text-base font-bold text-[#332219]">Lauk at Me</h3>
              <p className="text-xs text-[#4E6B5D] font-semibold mb-2">By Umma</p>
              <p className="text-[11px] text-[#7A6254] leading-normal">
                Penyedia Bahan Seafood Mentah & Segar Kualitas Terjamin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE HIGHLIGHTS */}
      <section className="py-8 px-4 bg-[#FFFDF9] border-b border-[#E2ECE7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm hover:shadow transition-shadow duration-200 flex items-center gap-3.5 anim-slide-up anim-delay-200">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#332219]">Kustom Potongan Spesifik</h4>
              <p className="text-[11px] text-[#7A6254]">
                Potongan disesuaikan jenis seafood (kupas udang, ring cumi, dll).
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm hover:shadow transition-shadow duration-200 flex items-center gap-3.5 anim-slide-up anim-delay-350">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#332219]">Pemesanan H-1 (Batas 18:00 WIB)</h4>
              <p className="text-[11px] text-[#7A6254]">
                Pesan hari ini sebelum jam 18:00 WIB, dikirim besok. Minggu OFF.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm hover:shadow transition-shadow duration-200 flex items-center gap-3.5 anim-slide-up anim-delay-500">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#332219]">Order WA Fast Response</h4>
              <p className="text-[11px] text-[#7A6254]">
                Pesan terformat otomatis dikirim ke 089667782004.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT CATALOG SECTION */}
      <section id="katalog" className="py-14 px-4 max-w-6xl mx-auto w-full flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 anim-slide-down anim-delay-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#4E6B5D] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Daftar Price List Resmi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#332219] tracking-tight font-display">
              Menu Seafood Lauk at Me By Umma
            </h2>
            <p className="text-xs text-[#7A6254] mt-1">
              Pilih produk dan tentukan gramasi yang Anda butuhkan (Klik gambar untuk zoom detail foto).
            </p>
          </div>

          {/* CATEGORY FILTER BAR */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#7A6254] shrink-0 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#4E6B5D] text-white shadow-sm scale-105"
                    : "bg-[#FFFFFF] text-[#523A2D] border border-[#E2ECE7] hover:border-[#4E6B5D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW: REACT BITS <AnimatedList /> COMPONENT */}
        <div className="block md:hidden">
          <AnimatedList
            items={filteredProducts}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={false}
            renderItem={(product, idx) => renderProductCard(product, idx)}
          />
        </div>

        {/* DESKTOP VIEW: STAGGERED ENTRANCE GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => renderProductCard(product, idx))}
        </div>
      </section>

      {/* 6. IMAGE LIGHTBOX / PREVIEW MODAL WITH SMOOTH ZOOM ANIMATION */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 bg-[#332219]/70 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-250 anim-zoom-in">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-lg w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-3 right-3 text-[#7A6254] hover:text-[#332219] p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md z-10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden mb-4 bg-[#FAF6F0] border border-[#E2ECE7]">
              <img
                src={previewProduct.image}
                alt={previewProduct.name}
                className="w-full h-full object-cover anim-zoom-in"
              />
              {previewProduct.discountBadge && (
                <span className="absolute top-3 left-3 bg-[#991B1B] text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  {previewProduct.discountBadge}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[11px] font-bold text-[#4E6B5D] uppercase tracking-wider block">
                  {previewProduct.category}
                </span>
                <h3 className="text-lg font-bold text-[#332219]">
                  {previewProduct.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#332219] block">
                  {previewProduct.displayPriceText}
                </span>
                {previewProduct.originalPriceText && (
                  <span className="text-xs text-[#7A6254] line-through block">
                    {previewProduct.originalPriceText}
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs text-[#7A6254] mb-4 bg-[#FAF6F0] p-2.5 rounded-lg border border-[#E2ECE7]">
              {previewProduct.portionEstimate} • {previewProduct.note}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const prod = previewProduct;
                  setPreviewProduct(null);
                  openCustomizeModal(prod);
                }}
                className="flex-1 bg-[#4E6B5D] hover:bg-[#3B5447] active:scale-98 text-white font-semibold text-xs py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Scissors className="w-4 h-4" />
                <span>Pilih Berat & Jenis Potongan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL CUSTOMIZATION */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-md w-full p-6 shadow-xl relative anim-zoom-in">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 text-[#7A6254] hover:text-[#332219] p-1 rounded-lg hover:bg-[#FAF6F0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={selectedProductForModal.image}
                alt={selectedProductForModal.name}
                className="w-16 h-16 rounded-lg object-cover border border-[#E2ECE7] shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-[#332219]">
                  {selectedProductForModal.name}
                </h3>
                <span className="text-xs text-[#4E6B5D] font-bold">
                  {selectedProductForModal.displayPriceText}
                </span>
                <span className="text-[11px] text-[#7A6254] block mt-0.5">
                  {selectedProductForModal.portionEstimate}
                </span>
              </div>
            </div>

            {/* WEIGHT SELECTOR */}
            <div className="mb-5">
              <label className="text-xs font-bold text-[#332219] block mb-2">
                1. Pilih Berat Pesanan (Gram / Kg)
              </label>
              <div className="flex items-center gap-3 bg-[#FAF6F0] p-2 rounded-xl border border-[#E2ECE7]">
                <button
                  onClick={() => setModalWeight((w) => Math.max(250, w - 250))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE] active:scale-95 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-lg font-bold text-[#332219] block">
                    {modalWeight} gram
                  </span>
                  <span className="text-[11px] text-[#7A6254]">
                    ({(modalWeight / 1000).toFixed(2)} kg)
                  </span>
                </div>
                <button
                  onClick={() => setModalWeight((w) => w + 250)}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE] active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CUT OPTION SELECTOR */}
            <div className="mb-6">
              <label className="text-xs font-bold text-[#332219] block mb-2">
                2. Spesifikasi Jenis Potongan ({selectedProductForModal.category})
              </label>
              <div className="space-y-2">
                {selectedProductForModal.availableCutOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setModalCut(option)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-all duration-150 flex items-center justify-between ${
                      modalCut === option
                        ? "border-[#4E6B5D] bg-[#EBF2EE] text-[#4E6B5D] font-bold"
                        : "border-[#E2ECE7] bg-white text-[#523A2D] hover:border-[#4E6B5D]"
                    }`}
                  >
                    <span>{option}</span>
                    {modalCut === option && (
                      <CheckCircle2 className="w-4 h-4 text-[#4E6B5D] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-[#FAF6F0] p-3.5 rounded-xl border border-[#E2ECE7] mb-5 flex items-center justify-between">
              <span className="text-xs text-[#7A6254]">Estimasi Harga Item:</span>
              <span className="text-base font-bold text-[#332219]">
                Rp {((selectedProductForModal.pricePerKg * modalWeight) / 1000).toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] active:scale-98 text-white font-semibold text-xs sm:text-sm py-3 rounded-lg transition-all duration-200 shadow-sm"
            >
              Masukkan ke Pesanan Saya
            </button>
          </div>
        </div>
      )}

      {/* 8. CHECKOUT DRAWER */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex justify-end transition-opacity duration-200">
          <div className="bg-[#FFFFFF] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto anim-slide-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2ECE7] mb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#4E6B5D]" />
                  <div>
                    <h2 className="text-base font-bold text-[#332219]">
                      Daftar Pesanan Lauk at Me
                    </h2>
                    <span className="text-[11px] text-[#7A6254]">
                      WA Admin: 089667782004
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-[#7A6254] hover:text-[#332219] p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* H-1 & SUNDAY OFF DISCLAIMER */}
              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E2ECE7] mb-4 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#332219] font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ketentuan Pre-Order H-1</span>
                </div>
                <p className="text-[11px] text-[#7A6254] leading-relaxed">
                  Batas order jam 18:00 WIB untuk dikirim besok. <strong>Hari Minggu Toko OFF / Libur</strong>.
                </p>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-[#6C8276]/30 mx-auto mb-3" />
                  <p className="text-xs font-bold text-[#332219] mb-1">
                    Pesanan Anda Masih Kosong
                  </p>
                  <p className="text-[11px] text-[#7A6254]">
                    Silakan pilih seafood segar dari katalog di sebelah kiri.
                  </p>
                </div>
              ) : (
                <>
                  {/* CART ITEMS LIST */}
                  <div className="space-y-3 mb-6">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E2ECE7] flex items-start justify-between gap-3 hover:border-[#4E6B5D] transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-[#332219]">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-[#7A6254] block">
                            Berat: {item.weightGram}g ({(item.weightGram / 1000).toFixed(2)} kg)
                          </span>
                          <span className="text-[11px] text-[#4E6B5D] font-medium block">
                            Potongan: {item.cutOption}
                          </span>
                          <span className="text-xs font-bold text-[#332219] mt-1 block">
                            Rp {((item.product.pricePerKg * item.weightGram) / 1000).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-[#991B1B] text-xs font-semibold hover:underline p-1"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* EXTRA PACKAGING OPTIONS */}
                  <div className="mb-5 pt-3 border-t border-[#E2ECE7]">
                    <h3 className="text-xs font-bold text-[#332219] mb-2.5">
                      Opsi Kemasan Tambahan
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-[#E2ECE7] bg-[#FFFDF9] cursor-pointer text-xs hover:border-[#4E6B5D] transition-colors">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={includeIceGel}
                            onChange={(e) => setIncludeIceGel(e.target.checked)}
                            className="rounded text-[#4E6B5D]"
                          />
                          <span className="text-[#332219] font-medium">Ice Gel Ekstra</span>
                        </div>
                        <span className="text-[#7A6254]">+Rp 5.000</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-lg border border-[#E2ECE7] bg-[#FFFDF9] cursor-pointer text-xs hover:border-[#4E6B5D] transition-colors">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={includeVacuum}
                            onChange={(e) => setIncludeVacuum(e.target.checked)}
                            className="rounded text-[#4E6B5D]"
                          />
                          <span className="text-[#332219] font-medium">Kemasan Vakum Kedap</span>
                        </div>
                        <span className="text-[#7A6254]">+Rp 8.000</span>
                      </label>
                    </div>
                  </div>

                  {/* CUSTOMER INFO FORM */}
                  <div className="mb-5 pt-3 border-t border-[#E2ECE7] space-y-3">
                    <h3 className="text-xs font-bold text-[#332219] mb-1">
                      Data Pengiriman Pelanggan
                    </h3>
                    <div>
                      <input
                        type="text"
                        placeholder="Nama Pemesan"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Alamat Lengkap Pengiriman"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <select
                        value={courierOption}
                        onChange={(e) => setCourierOption(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white transition-colors"
                      >
                        <option value="Instant (Gojek/Grab)">Kurir Instant (Gojek / Grab)</option>
                        <option value="Same Day (Pagi Hari)">Kurir Same Day (Pagi Hari)</option>
                        <option value="Ambil Langsung di Toko">Ambil Langsung di Toko</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CHECKOUT BUTTONS */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#E2ECE7] space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#7A6254]">Estimasi Total Biaya:</span>
                  <span className="text-base sm:text-lg font-bold text-[#332219]">
                    Rp {calculateSubtotal().toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-[#166534] hover:bg-[#14532d] active:scale-98 text-white font-bold text-sm py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Beli Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopyOrderSummary}
                  className="w-full bg-[#FFFFFF] hover:bg-[#FAF6F0] border border-[#E2ECE7] text-[#523A2D] font-semibold text-xs py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#166534]" />
                      <span className="text-[#166534]">Ringkasan Pesanan Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#7A6254]" />
                      <span>Salin Ringkasan Pesanan</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. PAYMENT METHOD POPUP */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#332219]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 anim-zoom-in">
            {orderProcessingStage === 0 && (
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute top-4 right-4 text-[#7A6254] hover:text-[#332219] p-1 rounded-lg hover:bg-[#FAF6F0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {orderProcessingStage > 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-[#E2ECE7] border-t-[#4E6B5D] animate-spin flex items-center justify-center"></div>
                  <ShoppingBag className="w-6 h-6 text-[#4E6B5D] absolute inset-0 m-auto" />
                </div>

                <div className="space-y-1">
                  {orderProcessingStage === 1 && (
                    <h3 className="text-base font-bold text-[#332219] animate-pulse">
                      📝 Merekam pesanan...
                    </h3>
                  )}
                  {orderProcessingStage === 2 && (
                    <h3 className="text-base font-bold text-[#332219] animate-pulse">
                      📦 Membuat pesanan...
                    </h3>
                  )}
                  {orderProcessingStage === 3 && (
                    <h3 className="text-base font-bold text-[#166534] animate-pulse">
                      📲 Membuka WhatsApp...
                    </h3>
                  )}
                  <p className="text-xs text-[#7A6254]">
                    Mohon tunggu sebentar, Anda akan diarahkan ke WhatsApp Admin.
                  </p>
                </div>

                <div className="w-full max-w-xs bg-[#E2ECE7] h-2 rounded-full overflow-hidden mt-4">
                  <div
                    className="bg-[#4E6B5D] h-full transition-all duration-500 ease-out"
                    style={{
                      width:
                        orderProcessingStage === 1
                          ? "35%"
                          : orderProcessingStage === 2
                          ? "70%"
                          : "100%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2ECE7]">
                  <CreditCard className="w-5 h-5 text-[#4E6B5D]" />
                  <div>
                    <h3 className="text-base font-bold text-[#332219]">
                      Detail & Metode Pembayaran
                    </h3>
                    <span className="text-xs text-[#7A6254]">
                      Konfirmasi pesanan dan pilih opsi pembayaran Anda
                    </span>
                  </div>
                </div>

                <div className="mb-5 bg-[#FAF6F0] p-4 rounded-xl border border-[#E2ECE7] space-y-2">
                  <h4 className="text-xs font-bold text-[#332219] uppercase tracking-wider flex items-center justify-between">
                    <span>Ringkasan Item Pesanan ({cart.length})</span>
                    <span className="text-[#4E6B5D] font-bold">
                      Total: Rp {calculateSubtotal().toLocaleString("id-ID")}
                    </span>
                  </h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-none border-t border-[#E2ECE7] pt-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="text-xs flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#332219]">{item.product.name}</span>
                          <span className="text-[11px] text-[#7A6254] block">
                            {item.weightGram}g • {item.cutOption}
                          </span>
                        </div>
                        <span className="font-bold text-[#332219]">
                          Rp {(((item.product.pricePerKg * item.weightGram) / 1000)).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-bold text-[#332219] block mb-2">
                    Pilih Metode Pembayaran:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod("BCA")}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selectedPaymentMethod === "BCA"
                          ? "border-[#4E6B5D] bg-[#EBF2EE] text-[#4E6B5D] font-bold shadow-sm"
                          : "border-[#E2ECE7] bg-white text-[#523A2D] hover:border-[#4E6B5D]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Building2 className="w-4 h-4 text-[#4E6B5D]" />
                        {selectedPaymentMethod === "BCA" && (
                          <CheckCircle2 className="w-4 h-4 text-[#4E6B5D]" />
                        )}
                      </div>
                      <span className="text-xs font-bold">Transfer BCA</span>
                      <span className="text-[10px] text-[#7A6254] font-normal">810-551-3964</span>
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("QRIS")}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selectedPaymentMethod === "QRIS"
                          ? "border-[#4E6B5D] bg-[#EBF2EE] text-[#4E6B5D] font-bold shadow-sm"
                          : "border-[#E2ECE7] bg-white text-[#523A2D] hover:border-[#4E6B5D]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <QrCode className="w-4 h-4 text-[#4E6B5D]" />
                        {selectedPaymentMethod === "QRIS" && (
                          <CheckCircle2 className="w-4 h-4 text-[#4E6B5D]" />
                        )}
                      </div>
                      <span className="text-xs font-bold">QRIS All Payment</span>
                      <span className="text-[10px] text-[#7A6254] font-normal">Scan Kode QR</span>
                    </button>
                  </div>
                </div>

                <div className="mb-5 bg-[#FFFDF9] p-4 rounded-xl border border-[#E2ECE7]">
                  {selectedPaymentMethod === "BCA" ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#332219]">Bank BCA</span>
                        <span className="text-[11px] text-[#4E6B5D] font-semibold">
                          a.n Lauk at Me / Umma
                        </span>
                      </div>
                      <div className="bg-[#FAF6F0] p-3 rounded-lg border border-[#E2ECE7] flex items-center justify-between">
                        <span className="text-base font-mono font-bold text-[#332219]">
                          810-551-3964
                        </span>
                        <button
                          onClick={handleCopyAccount}
                          className="bg-[#FFFFFF] border border-[#E2ECE7] hover:border-[#4E6B5D] text-[#332219] text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition-all"
                        >
                          {isAccountCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#166534]" />
                              <span className="text-[#166534]">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#7A6254]" />
                              <span>Salin Rekening</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="text-xs font-bold text-[#332219] block mb-2">
                        Scan QRIS (Gopay / OVO / Dana / ShopeePay / BCA Mobile)
                      </span>
                      <div className="bg-white p-3 rounded-xl border border-[#E2ECE7] inline-block shadow-sm">
                        <svg className="w-40 h-40 mx-auto" viewBox="0 0 200 200">
                          <rect width="200" height="200" fill="#ffffff" rx="8" />
                          <path d="M10 10 h60 v60 h-60 z" fill="#000000" />
                          <path d="M20 20 h40 v40 h-40 z" fill="#ffffff" />
                          <path d="M30 30 h20 v20 h-20 z" fill="#000000" />
                          <path d="M130 10 h60 v60 h-60 z" fill="#000000" />
                          <path d="M140 20 h40 v40 h-40 z" fill="#ffffff" />
                          <path d="M150 30 h20 v20 h-20 z" fill="#000000" />
                          <path d="M10 130 h60 v60 h-60 z" fill="#000000" />
                          <path d="M20 140 h40 v40 h-40 z" fill="#ffffff" />
                          <path d="M30 150 h20 v20 h-20 z" fill="#000000" />
                          <rect x="90" y="20" width="20" height="40" fill="#000000" />
                          <rect x="20" y="90" width="40" height="20" fill="#000000" />
                          <rect x="90" y="90" width="40" height="40" fill="#000000" />
                          <rect x="140" y="90" width="40" height="20" fill="#000000" />
                          <rect x="90" y="140" width="20" height="40" fill="#000000" />
                          <rect x="140" y="140" width="40" height="40" fill="#000000" />
                          <text x="100" y="105" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">QRIS</text>
                        </svg>
                      </div>
                      <span className="text-[11px] text-[#7A6254] block mt-2 font-medium">
                        Lauk at Me — QRIS Resmi
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold text-[#332219] block mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#4E6B5D]" />
                    <span>Catatan Khusus Pesanan (Opsional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Minta diantar sebelum jam 10 pagi, atau bungkus pisah"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white"
                  />
                </div>

                <button
                  onClick={handleProceedOrderWithAnimation}
                  className="w-full bg-[#166534] hover:bg-[#14532d] active:scale-98 text-white font-bold text-sm py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Konfirmasi & Pesan via WA</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 10. FOOTER */}
      <footer className="bg-[#332219] text-[#FAF6F0] py-10 px-4 border-t border-[#523A2D] mt-16 anim-slide-up anim-delay-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo.png"
                alt="Lauk at Me Logo Footer"
                className="w-8 h-8 rounded-full border border-[#4E6B5D] object-cover"
              />
              <span className="text-base font-bold font-display">Lauk at Me By Umma</span>
            </div>
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed mb-3">
              Toko online seafood mentah dan segar. Melayani pembelian udang, cumi, bawal, gurame, fillet, dan kerang dara dengan kustomisasi potongan gratis.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#FAF6F0]/10 px-3 py-1.5 rounded-lg text-[11px] text-[#D97706] font-semibold border border-[#523A2D]">
              <Clock className="w-3.5 h-3.5" />
              <span>Pre-Order H-1 (Batas 18:00 WIB) | Minggu OFF</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#FAF6F0] uppercase tracking-wider mb-3">
              Hubungi Admin WhatsApp
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 mb-2">
              Nomor Pemesanan & Pertanyaan Stok:
            </p>
            <a
              href="https://wa.me/6289667782004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D97706] hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>089667782004 (WhatsApp)</span>
            </a>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#FAF6F0] uppercase tracking-wider mb-3">
              Portal Manajemen (/admin)
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 mb-3">
              Halaman tersembunyi pengelolaan produk & upload foto.
            </p>
            <a
              href="/admin"
              className="inline-block text-xs font-semibold text-[#6C8276] hover:text-white underline"
            >
              Akses Portal Admin →
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 mt-8 border-t border-[#523A2D] text-center text-[11px] text-[#FAF6F0]/50">
          © {new Date().getFullYear()} Lauk at Me By Umma. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
}
