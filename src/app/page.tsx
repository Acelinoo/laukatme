"use client";

import { useState } from "react";
import {
  Fish,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2,
  PhoneCall,
  Scale,
  Scissors,
  PackageCheck,
  Plus,
  Minus,
  X,
  MessageCircle,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "Ikan Utuh" | "Udang" | "Kerang" | "Cumi" | "Fillet";
  pricePer100g: number;
  image: string;
  isCatchOfDay?: boolean;
  inStock: boolean;
  minWeightGram: number;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Ikan Tenggiri Segar",
    category: "Ikan Utuh",
    pricePer100g: 14500,
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: true,
    inStock: true,
    minWeightGram: 500,
    description: "Tangkapan subuh hari ini. Daging tebal, kenyal, dan gurih cocok untuk pempek atau steak bakar.",
  },
  {
    id: "p2",
    name: "Udang Vaname Size Jumbo",
    category: "Udang",
    pricePer100g: 18000,
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: true,
    inStock: true,
    minWeightGram: 250,
    description: "Udang segar manis alami tanpa bahan pengawet. Cocok untuk goreng mentega atau saus padang.",
  },
  {
    id: "p3",
    name: "Cumi-Cumi Sero Segar",
    category: "Cumi",
    pricePer100g: 16500,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: false,
    inStock: true,
    minWeightGram: 300,
    description: "Tekstur kenyal tidak kenyal ulet. Bebas amis berlebih, siap kustom potong ring gratis.",
  },
  {
    id: "p4",
    name: "Fillet Salmon Premium Grade",
    category: "Fillet",
    pricePer100g: 38000,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: false,
    inStock: true,
    minWeightGram: 200,
    description: "Fillet bersih tanpa tulang dan tanpa sisik. Daging warna oranye segar kaya Omega-3.",
  },
  {
    id: "p5",
    name: "Kerang Dara Pesisir",
    category: "Kerang",
    pricePer100g: 7500,
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: false,
    inStock: true,
    minWeightGram: 500,
    description: "Kerang dara segar dalam keadaan hidup dari muara pesisir pantai lokal.",
  },
  {
    id: "p6",
    name: "Ikan Kakap Merah Pasir",
    category: "Ikan Utuh",
    pricePer100g: 19000,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    isCatchOfDay: true,
    inStock: true,
    minWeightGram: 600,
    description: "Daging putih lembut manis manis. Pilihan nomor satu untuk gulai kepala atau bakar jimbaran.",
  },
];

const CUT_OPTIONS = [
  "Utuh Bersih Sisik & Insang",
  "Potong Steak / Irisan",
  "Fillet Bersih (Tanpa Duri)",
  "Potong Cumi Ring",
  "Giling Halus (Bahan Pempek/Bakso)",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [cart, setCart] = useState<{ product: Product; weightGram: number; cutOption: string }[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [modalWeight, setModalWeight] = useState<number>(500);
  const [modalCut, setModalCut] = useState<string>(CUT_OPTIONS[0]);
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
    setModalCut(CUT_OPTIONS[0]);
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
      (sum, item) => sum + (item.product.pricePer100g * item.weightGram) / 100,
      0
    );
    const iceGelCost = includeIceGel ? 5000 : 0;
    const vacuumCost = includeVacuum ? 8000 : 0;
    return itemsTotal + iceGelCost + vacuumCost;
  };

  const generateWhatsAppURL = () => {
    if (cart.length === 0) return "#";
    const adminPhone = "6281234567890"; // Nomor WhatsApp Admin Laukatme

    let message = `*HALO LAUKATME — PESANAN SEAFOOD SEGAR*\n\n`;
    message += `*Detail Pelanggan:*\n`;
    message += `• Nama: ${customerName || "-"}\n`;
    message += `• Alamat: ${customerAddress || "-"}\n`;
    message += `• Kurir: ${courierOption}\n\n`;

    message += `*Rincian Item Seafood:*\n`;
    cart.forEach((item, index) => {
      const itemPrice = (item.product.pricePer100g * item.weightGram) / 100;
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Berat: ${item.weightGram} gram (${(item.weightGram / 1000).toFixed(1)} kg)\n`;
      message += `   - Potongan Gratis: ${item.cutOption}\n`;
      message += `   - Biaya Estimasi: Rp ${itemPrice.toLocaleString("id-ID")}\n\n`;
    });

    message += `*Opsi Kemasan Ekstra:*\n`;
    message += `• Ice Gel Ekstra: ${includeIceGel ? "Ya (+Rp 5.000)" : "Tidak"}\n`;
    message += `• Kemasan Vakum: ${includeVacuum ? "Ya (+Rp 8.000)" : "Tidak"}\n\n`;

    message += `*Estimasi Total Biaya:* Rp ${calculateSubtotal().toLocaleString("id-ID")}\n\n`;
    message += `_Catatan: Total pasti akan dikonfirmasi Admin via WA setelah timbangan fisik presisi dilakukan._`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#332219] antialiased">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#332219] text-[#FAF6F0] text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
        <span>
          Tangkapan Hari Ini — Garansi Segar Bebas Amis & Kustomisasi Potongan Bebas Biaya!
        </span>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E2ECE7] transition-all">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4E6B5D] text-white flex items-center justify-center shadow-sm">
              <Fish className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#332219] font-display block leading-none">
                Laukatme
              </span>
              <span className="text-[11px] text-[#7A6254] font-medium tracking-wide">
                Fresh Coastal Seafood
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="relative flex items-center gap-2.5 bg-[#FFFFFF] border border-[#E2ECE7] hover:border-[#4E6B5D] px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold text-[#332219] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#4E6B5D]" />
              <span className="hidden sm:inline">Keranjang Pesanan</span>
              {cart.length > 0 && (
                <span className="bg-[#4E6B5D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 border-b border-[#E2ECE7] bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EE] text-[#4E6B5D] text-xs font-semibold mb-5 border border-[#E2ECE7]">
              <WavesIcon className="w-3.5 h-3.5" />
              <span>Nuansa Pesisir Pantai Warm & Fresh</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#332219] leading-[1.2] mb-5 font-display">
              Seafood Segar Tangkapan Nelayan, Siap Olah Dapur Anda
            </h1>
            <p className="text-base text-[#523A2D] leading-relaxed mb-8 max-w-xl">
              Pilih ikan, udang, dan cumi segar langsung dari tangkapan harian.
              Nikmati fasilitas <strong className="text-[#332219]">kustomisasi potongan gratis</strong> dan checkout serba praktis langsung ke WhatsApp.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#katalog"
                className="bg-[#4E6B5D] hover:bg-[#3B5447] text-white font-semibold px-6 py-3.5 rounded-lg text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>Eksplor Katalog Seafood</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs font-medium text-[#7A6254]">
                <ShieldCheck className="w-4 h-4 text-[#166534]" />
                <span>Jaminan Timbangan Transparan</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E2ECE7] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80"
                alt="Seafood Segar Laukatme"
                className="w-full h-72 sm:h-80 object-cover rounded-xl"
              />
              <div className="mt-4 p-3 bg-[#F4F9F6] rounded-lg border border-[#E2ECE7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center font-bold text-xs">
                    🔥
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#332219] block">
                      Catch of the Day
                    </span>
                    <span className="text-[11px] text-[#7A6254]">
                      Tenggiri & Kakap Pasir Segar Baru Tiba
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#4E6B5D] bg-[#FFFFFF] px-2.5 py-1 rounded border border-[#E2ECE7]">
                  Tersedia 15 kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION FEATURES */}
      <section className="py-12 px-4 bg-[#FFFDF9] border-b border-[#E2ECE7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2ECE7] shadow-sm flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D]">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#332219] mb-1">
                Kustom Potongan Gratis
              </h3>
              <p className="text-xs text-[#7A6254] leading-relaxed">
                Minta potong steak, cumi ring, atau giling halus tanpa biaya tambahan.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2ECE7] shadow-sm flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#332219] mb-1">
                Kalkulator Harga Dinamis
              </h3>
              <p className="text-xs text-[#7A6254] leading-relaxed">
                Pilih berat per gramasi dengan estimasi total harga otomatis transparan.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2ECE7] shadow-sm flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#EBF2EE] text-[#4E6B5D]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#332219] mb-1">
                Direct WhatsApp Checkout
              </h3>
              <p className="text-xs text-[#7A6254] leading-relaxed">
                Formulir langsung terformat rapi dan terhubung cepat dengan WhatsApp Admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT CATALOG SECTION */}
      <section id="katalog" className="py-16 px-4 max-w-6xl mx-auto w-full flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#332219] tracking-tight font-display mb-2">
              Katalog Seafood Pilihan
            </h2>
            <p className="text-sm text-[#7A6254]">
              Pilih produk laut segar hari ini dan sesuaikan potongannya sesuai selera olahan Anda.
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
                  />
                  {product.isCatchOfDay && (
                    <span className="absolute top-3 left-3 bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      Catch of the Day
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-sm text-[#166534] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#E2ECE7]">
                    Tersedia
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-semibold text-[#6C8276] uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-[#332219] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#7A6254] line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-[#E2ECE7]">
                    <span className="text-lg font-bold text-[#332219]">
                      Rp {product.pricePer100g.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-[#7A6254]">/ 100 gram</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => openCustomizeModal(product)}
                  className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] text-white text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Pilih Berat & Kustom Potongan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MODAL CUSTOMIZATION */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 text-[#7A6254] hover:text-[#332219] p-1 rounded-lg hover:bg-[#FAF6F0]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedProductForModal.image}
                alt={selectedProductForModal.name}
                className="w-14 h-14 rounded-lg object-cover border border-[#E2ECE7]"
              />
              <div>
                <h3 className="text-base font-bold text-[#332219]">
                  {selectedProductForModal.name}
                </h3>
                <span className="text-xs text-[#7A6254]">
                  Rp {selectedProductForModal.pricePer100g.toLocaleString("id-ID")} / 100g
                </span>
              </div>
            </div>

            {/* WEIGHT SELECTOR */}
            <div className="mb-5">
              <label className="text-xs font-bold text-[#332219] block mb-2">
                1. Tentukan Berat (Gram)
              </label>
              <div className="flex items-center gap-3 bg-[#FAF6F0] p-2 rounded-xl border border-[#E2ECE7]">
                <button
                  onClick={() => setModalWeight((w) => Math.max(100, w - 100))}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-lg font-bold text-[#332219] block">
                    {modalWeight} gram
                  </span>
                  <span className="text-[11px] text-[#7A6254]">
                    ({(modalWeight / 1000).toFixed(1)} kg)
                  </span>
                </div>
                <button
                  onClick={() => setModalWeight((w) => w + 100)}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E2ECE7] text-[#332219] font-bold flex items-center justify-center hover:bg-[#EBF2EE]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CUT OPTION SELECTOR */}
            <div className="mb-6">
              <label className="text-xs font-bold text-[#332219] block mb-2">
                2. Spesifikasi Jenis Potongan (Gratis)
              </label>
              <div className="space-y-2">
                {CUT_OPTIONS.map((option) => (
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
                      <CheckCircle2 className="w-4 h-4 text-[#4E6B5D]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-[#FAF6F0] p-3.5 rounded-xl border border-[#E2ECE7] mb-5 flex items-center justify-between">
              <span className="text-xs text-[#7A6254]">Estimasi Harga Item:</span>
              <span className="text-base font-bold text-[#332219]">
                Rp {((selectedProductForModal.pricePer100g * modalWeight) / 100).toLocaleString("id-ID")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] text-white font-semibold text-sm py-3 rounded-lg transition-all shadow-sm"
            >
              Masukkan ke Keranjang Pesanan
            </button>
          </div>
        </div>
      )}

      {/* 7. CHECKOUT DRAWER / MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-[#332219]/40 backdrop-blur-sm flex justify-end">
          <div className="bg-[#FFFFFF] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2ECE7] mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#4E6B5D]" />
                  <h2 className="text-lg font-bold text-[#332219]">
                    Keranjang & Checkout WA
                  </h2>
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
                  <Fish className="w-12 h-12 text-[#6C8276]/40 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-[#332219] mb-1">
                    Keranjang Pesanan Kosong
                  </p>
                  <p className="text-xs text-[#7A6254]">
                    Silakan pilih seafood dari katalog untuk memulai pemesanan.
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
                            Berat: {item.weightGram}g • {item.cutOption}
                          </span>
                          <span className="text-xs font-semibold text-[#4E6B5D] mt-1 block">
                            Rp {((item.product.pricePer100g * item.weightGram) / 100).toLocaleString("id-ID")}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-[#991B1B] text-xs hover:underline p-1"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* EXTRA PACKAGING OPTIONS */}
                  <div className="mb-6 pt-4 border-t border-[#E2ECE7]">
                    <h3 className="text-xs font-bold text-[#332219] mb-3">
                      Opsi Kemasan Ekstra
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
                  <div className="mb-6 pt-4 border-t border-[#E2ECE7] space-y-3">
                    <h3 className="text-xs font-bold text-[#332219] mb-1">
                      Detail Pengiriman Pelanggan
                    </h3>
                    <div>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Alamat Pengiriman Lengkap"
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
                        <option value="Ambil Langsung di Toko">Ambil Langsung ke Toko</option>
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
                  <span className="text-xs text-[#7A6254]">Estimasi Total:</span>
                  <span className="text-lg font-bold text-[#332219]">
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
                  <span>Kirim Pesanan via WhatsApp Admin</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <footer className="bg-[#332219] text-[#FAF6F0] py-12 px-4 border-t border-[#523A2D] mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Fish className="w-5 h-5 text-[#6C8276]" />
              <span className="text-lg font-bold font-display">Laukatme</span>
            </div>
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">
              Platform belanja seafood segar mentah langsung dari nelayan lokal. Garansi kesegaran dan kustom potongan tanpa biaya tambahan.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#FAF6F0] uppercase tracking-wider mb-3">
              Kategori Seafood
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6F0]/70">
              <li>Ikan Utuh Segar</li>
              <li>Udang Vaname & Windu</li>
              <li>Cumi-Cumi Sero</li>
              <li>Fillet Premium</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#FAF6F0] uppercase tracking-wider mb-3">
              Akses Admin
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 mb-3">
              Kelola stok dan unggah produk baru melalui portal manajemen tersembunyi.
            </p>
            <a
              href="/admin"
              className="inline-block text-xs font-semibold text-[#6C8276] hover:text-white underline"
            >
              Masuk Portal Admin (/admin) →
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-[#523A2D] text-center text-xs text-[#FAF6F0]/50">
          © {new Date().getFullYear()} Laukatme Seafood. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
}

function WavesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}
