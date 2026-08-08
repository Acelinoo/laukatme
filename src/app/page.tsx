"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Sparkles,
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
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "Ikan Utuh" | "Udang" | "Kerang" | "Cumi" | "Fillet";
  pricePerKg: number;
  displayPriceText: string;
  image: string;
  isCatchOfDay?: boolean;
  inStock: boolean;
  minWeightGram: number;
  note?: string;
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
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Isi ± 200 pcs per kg. Manis alami & segar.",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p2",
    name: "Udang Vaname Sedang (M)",
    category: "Udang",
    pricePerKg: 80000,
    displayPriceText: "Rp 80.000 / kg",
    image: "https://images.unsplash.com/photo-1559742811-822863c46c83?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    note: "Ukuran medium pas untuk olahan asam manis atau mentega.",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p3",
    name: "Udang Vaname Besar (L)",
    category: "Udang",
    pricePerKg: 100000,
    displayPriceText: "Rp 100.000 / kg",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    note: "Ukuran besar padat berisi. Sangat populer untuk udang bakar.",
    availableCutOptions: SHRIMP_CUT_OPTIONS,
  },
  {
    id: "p4",
    name: "Udang Kupas",
    category: "Udang",
    pricePerKg: 110000,
    displayPriceText: "Rp 110.000 / kg",
    image: "https://images.unsplash.com/photo-1559742811-822863c46c83?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 250,
    note: "Praktis tanpa kulit, bersih siap langsung masak.",
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
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    note: "Bisa dipotong ring sedang / kecil (Gratis). Daging kenyal & segar.",
    availableCutOptions: SQUID_CUT_OPTIONS,
  },

  // FILLET
  {
    id: "p6",
    name: "Kakap Fillet",
    category: "Fillet",
    pricePerKg: 70000,
    displayPriceText: "Rp 70.000 / kg",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Daging kakap bersih tanpa tulang & tanpa duri.",
    availableCutOptions: FILLET_CUT_OPTIONS,
  },
  {
    id: "p7",
    name: "Patin Fillet",
    category: "Fillet",
    pricePerKg: 45000,
    displayPriceText: "Rp 45.000 / kg",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Daging patin bersih siap goreng krispi atau sup.",
    availableCutOptions: FILLET_CUT_OPTIONS,
  },

  // IKAN UTUH
  {
    id: "p8",
    name: "Gurame Hidup",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 700,
    isCatchOfDay: true,
    note: "Ikan gurame dalam keadaan hidup. Bersih sisik & insang gratis.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p9",
    name: "Tenggiri Super",
    category: "Ikan Utuh",
    pricePerKg: 85000,
    displayPriceText: "Rp 80.000 - 90.000 / kg",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Kualitas super. Dapat digiling halus (Bahan Pempek / Otak-otak).",
    availableCutOptions: TENGGIRI_CUT_OPTIONS,
  },
  {
    id: "p10",
    name: "Tenggiri Biasa",
    category: "Ikan Utuh",
    pricePerKg: 62500,
    displayPriceText: "Rp 60.000 - 65.000 / kg",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Dapat digiling (Bahan olahan bakso / siomay).",
    availableCutOptions: TENGGIRI_CUT_OPTIONS,
  },
  {
    id: "p11",
    name: "Teri Nasi",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 250,
    note: "Teri nasi segar halus pilihan.",
    availableCutOptions: ["Bersih Cuci Tiriskan (Gratis)"],
  },
  {
    id: "p12",
    name: "Patin Daging",
    category: "Ikan Utuh",
    pricePerKg: 30000,
    displayPriceText: "Rp 30.000 / kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Ikan patin segar potongan / utuh.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p13",
    name: "Ikan Kembung",
    category: "Ikan Utuh",
    pricePerKg: 45000,
    displayPriceText: "Rp 45.000 / kg",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Isi ± 11 ekor per kg. Gurih kaya gizi.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p14",
    name: "Ikan Banjar",
    category: "Ikan Utuh",
    pricePerKg: 40000,
    displayPriceText: "Rp 40.000 / kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Ikan banjar kembung manis gurih.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p15",
    name: "Bawal Putih",
    category: "Ikan Utuh",
    pricePerKg: 180000,
    displayPriceText: "Rp 180.000 / kg",
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    isCatchOfDay: true,
    note: "Isi 3 - 4 ekor per kg. Kelas restoran & kualitas istimewa.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p16",
    name: "Bawal Hitam",
    category: "Ikan Utuh",
    pricePerKg: 65000,
    displayPriceText: "Rp 65.000 / kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Bawal hitam segar cocok untuk bakar & tauco.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },
  {
    id: "p17",
    name: "Ikan Nila",
    category: "Ikan Utuh",
    pricePerKg: 32500,
    displayPriceText: "Rp 30.000 - 35.000 / kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 500,
    note: "Isi 3 - 5 ekor per kg. Segar gurih enak digoreng krispi.",
    availableCutOptions: FISH_CUT_OPTIONS,
  },

  // KERANG
  {
    id: "p18",
    name: "Kerang Dara Kecil",
    category: "Kerang",
    pricePerKg: 27500,
    displayPriceText: "Rp 25.000 - 30.000 / kg",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 1000,
    note: "Kerang dara segar muara ukuran kecil.",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
  {
    id: "p19",
    name: "Kerang Dara Sedang",
    category: "Kerang",
    pricePerKg: 32500,
    displayPriceText: "Rp 30.000 - 35.000 / kg",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 1000,
    note: "Kerang dara segar muara ukuran sedang.",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
  {
    id: "p20",
    name: "Kerang Dara Besar",
    category: "Kerang",
    pricePerKg: 37500,
    displayPriceText: "Rp 35.000 - 40.000 / kg",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    minWeightGram: 1000,
    isCatchOfDay: true,
    note: "Kerang dara segar muara ukuran besar padat.",
    availableCutOptions: CLAM_CUT_OPTIONS,
  },
];

export default function Home() {
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

  const generateWhatsAppURL = () => {
    if (cart.length === 0) return "#";
    const adminPhone = "6289667782004"; // WA Admin resmi Lauk at Me By Umma

    let message = `*HALO LAUK AT ME BY UMMA — PESANAN SEAFOOD SEGAR*\n\n`;
    message += `*Detail Pemesan:*\n`;
    message += `• Nama: ${customerName || "-"}\n`;
    message += `• Alamat: ${customerAddress || "-"}\n`;
    message += `• Opsi Pengiriman: ${courierOption}\n\n`;

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
    message += `_Catatan: Total pasti akan dikonfirmasi Admin via WA setelah timbangan fisik presisi dilakukan._`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#332219] antialiased font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#332219] text-[#FAF6F0] text-xs font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
        <span>
          Lauk at Me By Umma — Seafood Mentah Segar & Kustom Sesuai Jenis Seafood! Hubungi WA: 089667782004
        </span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E2ECE7] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Lauk at Me By Umma Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#4E6B5D] shadow-sm"
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
              className="hidden md:flex items-center gap-2 bg-[#EBF2EE] text-[#4E6B5D] px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#4E6B5D] hover:text-white transition-all border border-[#E2ECE7]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>089667782004</span>
            </a>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative flex items-center gap-2 bg-[#FFFFFF] border border-[#E2ECE7] hover:border-[#4E6B5D] px-4 py-2.5 rounded-lg shadow-sm text-xs font-bold text-[#332219] transition-all"
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

      {/* 3. HERO SECTION WITH LOGO BRANDING */}
      <section className="relative overflow-hidden pt-10 pb-14 px-4 border-b border-[#E2ECE7] bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EE] text-[#4E6B5D] text-xs font-bold mb-4 border border-[#E2ECE7]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Menu & Price List Resmi Lauk at Me By Umma</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#332219] leading-[1.2] mb-4 font-display">
              Pilihan Seafood Segar Pesisir, Praktis Siap Olah Dapur
            </h1>

            <p className="text-sm sm:text-base text-[#523A2D] leading-relaxed mb-6 max-w-xl">
              Melayani penjualan udang vaname, cumi, gurame, bawal, fillet, dan kerang dara segar.
              Lengkap dengan fasilitas <strong className="text-[#332219]">kustomisasi potongan spesifik</strong> (potong ring cumi, kupas udang, fillet, atau giling tenggiri).
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#katalog"
                className="bg-[#4E6B5D] hover:bg-[#3B5447] text-white font-semibold px-6 py-3.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>Lihat Menu & Harga ({PRODUCTS.length} Item)</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A6254]">
                <ShieldCheck className="w-4 h-4 text-[#166534]" />
                <span>WA Admin: 089667782004</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2ECE7] shadow-md max-w-xs text-center">
              <img
                src="/logo.png"
                alt="Logo Lauk at Me By Umma"
                className="w-44 h-44 mx-auto rounded-full object-cover border-4 border-[#4E6B5D] mb-3 shadow-inner"
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
          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm flex items-center gap-3.5">
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

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#332219]">Timbangan Akurat</h4>
              <p className="text-[11px] text-[#7A6254]">
                Perhitungan estimasi otomatis berbasis gramasi/kg.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2ECE7] shadow-sm flex items-center gap-3.5">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
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
              Pilih produk dan tentukan gramasi yang Anda butuhkan (Harga per Kg).
            </p>
          </div>

          {/* CATEGORY FILTER BAR */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-[#7A6254] shrink-0 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-[#4E6B5D] text-white shadow-sm"
                    : "bg-[#FFFFFF] text-[#523A2D] border border-[#E2ECE7] hover:border-[#4E6B5D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF] rounded-xl border border-[#E2ECE7] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#F4F9F6]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if remote url fails
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  {product.isCatchOfDay && (
                    <span className="absolute top-3 left-3 bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      Catch of the Day
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

                  {product.note && (
                    <p className="text-xs text-[#7A6254] mb-3 leading-relaxed bg-[#FAF6F0] p-2 rounded-lg border border-[#E2ECE7]">
                      💡 {product.note}
                    </p>
                  )}

                  <div className="flex items-baseline gap-1 pt-2 border-t border-[#E2ECE7] mt-3">
                    <span className="text-lg font-bold text-[#332219]">
                      {product.displayPriceText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => openCustomizeModal(product)}
                  className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] text-white text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Pilih Berat & Jenis Potongan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MODAL CUSTOMIZATION (CATEGORY SPECIFIC CUT OPTIONS) */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 text-[#7A6254] hover:text-[#332219] p-1 rounded-lg hover:bg-[#FAF6F0]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={selectedProductForModal.image}
                alt={selectedProductForModal.name}
                className="w-14 h-14 rounded-lg object-cover border border-[#E2ECE7] shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div>
                <h3 className="text-base font-bold text-[#332219]">
                  {selectedProductForModal.name}
                </h3>
                <span className="text-xs text-[#4E6B5D] font-bold">
                  {selectedProductForModal.displayPriceText}
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
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE]"
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
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CUT OPTION SELECTOR (SPECIFIC TO THIS PRODUCT) */}
            <div className="mb-6">
              <label className="text-xs font-bold text-[#332219] block mb-2">
                2. Spesifikasi Jenis Potongan ({selectedProductForModal.category})
              </label>
              <div className="space-y-2">
                {selectedProductForModal.availableCutOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setModalCut(option)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
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
              className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] text-white font-semibold text-xs sm:text-sm py-3 rounded-lg transition-all shadow-sm"
            >
              Masukkan ke Pesanan Saya
            </button>
          </div>
        </div>
      )}

      {/* 7. CHECKOUT DRAWER / MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex justify-end">
          <div className="bg-[#FFFFFF] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2ECE7] mb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#4E6B5D]" />
                  <div>
                    <h2 className="text-base font-bold text-[#332219]">
                      Daftar Pesanan Lauk at Me
                    </h2>
                    <span className="text-[11px] text-[#7A6254]">
                      Pemesanan Langsung via WA Admin: 089667782004
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-[#7A6254] hover:text-[#332219] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
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
                        className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E2ECE7] flex items-start justify-between gap-3"
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
                      <label className="flex items-center justify-between p-3 rounded-lg border border-[#E2ECE7] bg-[#FFFDF9] cursor-pointer text-xs">
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

                      <label className="flex items-center justify-between p-3 rounded-lg border border-[#E2ECE7] bg-[#FFFDF9] cursor-pointer text-xs">
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
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Alamat Lengkap Pengiriman"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white"
                      />
                    </div>
                    <div>
                      <select
                        value={courierOption}
                        onChange={(e) => setCourierOption(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white"
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

            {/* CHECKOUT BUTTON */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#E2ECE7]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#7A6254]">Estimasi Total Biaya:</span>
                  <span className="text-base sm:text-lg font-bold text-[#332219]">
                    Rp {calculateSubtotal().toLocaleString("id-ID")}
                  </span>
                </div>

                <a
                  href={generateWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Kirim Pesanan Ke WA (089667782004)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <footer className="bg-[#332219] text-[#FAF6F0] py-10 px-4 border-t border-[#523A2D] mt-16">
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
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">
              Toko online seafood mentah dan segar. Melayani pembelian udang, cumi, bawal, gurame, fillet, dan kerang dara dengan kustomisasi potongan gratis.
            </p>
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
