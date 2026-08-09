"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Package,
  Award,
  Clock,
  Sparkles,
  ArrowLeft,
  X,
  Check,
  Building2,
  Save,
  RefreshCw,
  SlidersHorizontal,
  Store,
} from "lucide-react";

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

const INITIAL_PRODUCTS: Product[] = [
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
    availableCutOptions: [
      "Utuh Segar Kepala & Kulit (Gratis)",
      "Kupas Kepala Saja (Gratis)",
      "Kupas Kulit & Buang Urat Kotoran (Gratis)",
    ],
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
    availableCutOptions: [
      "Utuh Segar Kepala & Kulit (Gratis)",
      "Kupas Kepala Saja (Gratis)",
      "Kupas Kulit & Buang Urat Kotoran (Gratis)",
    ],
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
    availableCutOptions: [
      "Utuh Segar Kepala & Kulit (Gratis)",
      "Kupas Kepala Saja (Gratis)",
      "Kupas Kulit & Buang Urat Kotoran (Gratis)",
    ],
  },
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
    availableCutOptions: [
      "Utuh Bersih Tinta & Tulang Lunak (Gratis)",
      "Potong Ring Cumi Sedang (Gratis)",
      "Potong Ring Cumi Kecil (Gratis)",
    ],
  },
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
    availableCutOptions: [
      "Utuh Bersih Sisik, Insang, & Isi Perut (Gratis)",
      "Potong Steak / Irisan Melintang (Gratis)",
      "Belah Dua Kipas / Olahan Bakar (Gratis)",
    ],
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
    availableCutOptions: [
      "Utuh Bersih Sisik & Insang (Gratis)",
      "Potong Steak / Irisan (Gratis)",
      "Giling Halus Bahan Pempek / Otak-Otak / Bakso (Gratis)",
    ],
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
    availableCutOptions: [
      "Utuh Bersih Sisik, Insang, & Isi Perut (Gratis)",
      "Potong Steak / Irisan Melintang (Gratis)",
      "Belah Dua Kipas / Olahan Bakar (Gratis)",
    ],
  },
];

const DEFAULT_PASSCODE = "umma123";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const [isPreorderOpen, setIsPreorderOpen] = useState<boolean>(true);

  // PRODUCT EDIT / ADD MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // FORM FIELDS
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<Product["category"]>("Ikan Utuh");
  const [formPrice, setFormPrice] = useState<number>(50000);
  const [formDisplayPriceText, setFormDisplayPriceText] = useState("Rp 50.000 / kg");
  const [formOriginalPriceText, setFormOriginalPriceText] = useState("");
  const [formDiscountBadge, setFormDiscountBadge] = useState("");
  const [formImage, setFormImage] = useState("/images/udang%20vuname%20sedang.webp");
  const [formInStock, setFormInStock] = useState(true);
  const [formCatchOfDay, setFormCatchOfDay] = useState(false);
  const [formBestSeller, setFormBestSeller] = useState(false);
  const [formPortionEstimate, setFormPortionEstimate] = useState("🍽️ 1 kg cukup untuk 3-4 porsi");
  const [formNote, setFormNote] = useState("");
  const [formCutOptions, setFormCutOptions] = useState<string>("Utuh Bersih (Gratis)\nPotong Steak (Gratis)");

  const [notification, setNotification] = useState<string | null>(null);

  // CHECK LOCAL STORAGE FOR SAVED SESSION
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("laukatme_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DEFAULT_PASSCODE || passwordInput === "laukatme2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("laukatme_admin_auth", "true");
      setAuthError("");
      setPasswordInput("");
    } else {
      setAuthError("Password salah! Silakan coba lagi. (Hint: umma123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("laukatme_admin_auth");
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Ikan Utuh");
    setFormPrice(60000);
    setFormDisplayPriceText("Rp 60.000 / kg");
    setFormOriginalPriceText("");
    setFormDiscountBadge("");
    setFormImage("/images/udang%20vuname%20sedang.webp");
    setFormInStock(true);
    setFormCatchOfDay(false);
    setFormBestSeller(false);
    setFormPortionEstimate("🍽️ 1 kg cukup untuk 3-4 porsi");
    setFormNote("Produk mentah segar pilihan");
    setFormCutOptions("Utuh Bersih Sisik & Insang (Gratis)\nPotong Steak (Gratis)");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.pricePerKg);
    setFormDisplayPriceText(product.displayPriceText);
    setFormOriginalPriceText(product.originalPriceText || "");
    setFormDiscountBadge(product.discountBadge || "");
    setFormImage(product.image);
    setFormInStock(product.inStock);
    setFormCatchOfDay(!!product.isCatchOfDay);
    setFormBestSeller(!!product.isBestSeller);
    setFormPortionEstimate(product.portionEstimate || "");
    setFormNote(product.note || "");
    setFormCutOptions(product.availableCutOptions.join("\n"));
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const cuts = formCutOptions
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (editingProduct) {
      // UPDATE EXISTING
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                category: formCategory,
                pricePerKg: Number(formPrice),
                displayPriceText: formDisplayPriceText,
                originalPriceText: formOriginalPriceText || undefined,
                discountBadge: formDiscountBadge || undefined,
                image: formImage,
                inStock: formInStock,
                isCatchOfDay: formCatchOfDay,
                isBestSeller: formBestSeller,
                portionEstimate: formPortionEstimate,
                note: formNote,
                availableCutOptions: cuts.length > 0 ? cuts : ["Utuh Bersih (Gratis)"],
              }
            : p
        )
      );
      triggerNotification(`✓ Produk "${formName}" berhasil diperbarui!`);
    } else {
      // CREATE NEW
      const newProduct: Product = {
        id: `p_${Date.now()}`,
        name: formName,
        category: formCategory,
        pricePerKg: Number(formPrice),
        displayPriceText: formDisplayPriceText,
        originalPriceText: formOriginalPriceText || undefined,
        discountBadge: formDiscountBadge || undefined,
        image: formImage,
        inStock: formInStock,
        isCatchOfDay: formCatchOfDay,
        isBestSeller: formBestSeller,
        minWeightGram: 500,
        portionEstimate: formPortionEstimate,
        note: formNote,
        availableCutOptions: cuts.length > 0 ? cuts : ["Utuh Bersih (Gratis)"],
      };
      setProducts((prev) => [newProduct, ...prev]);
      triggerNotification(`✓ Produk baru "${formName}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  const toggleStockStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = !p.inStock;
          triggerNotification(
            `Stok "${p.name}" diubah jadi ${updated ? "TERSEDIA" : "HABIS"}`
          );
          return { ...p, inStock: updated };
        }
        return p;
      })
    );
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      triggerNotification(`✓ Produk "${productName}" berhasil dihapus.`);
    }
  };

  const categories = ["Semua", "Ikan Utuh", "Udang", "Cumi", "Kerang", "Fillet"];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Semua" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ==========================================================================
  // 1. LOGIN PASSWORD LOCK SCREEN
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-4 antialiased text-[#332219]">
        <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl relative anim-zoom-in">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
              <Image
                src="/logo.png"
                alt="Lauk at Me Admin Logo"
                width={80}
                height={80}
                quality={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#4E6B5D] shadow-md mx-auto"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#4E6B5D] text-white p-1.5 rounded-full shadow">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#332219] font-display">
              Portal Admin Laukatme
            </h1>
            <p className="text-xs text-[#523A2D] mt-1 font-semibold">
              By Umma — Pengelolaan Katalog & Stok Seafood
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="adminPassword"
                className="text-xs font-bold text-[#332219] block mb-1.5"
              >
                Masukkan Password Akses Admin:
              </label>
              <div className="relative">
                <input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password admin..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E2ECE7] text-sm text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan / sembunyikan password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#523A2D] hover:text-[#332219] p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-xs font-bold text-[#991B1B] bg-[#FEE2E2] p-2.5 rounded-lg border border-[#FCA5A5]">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#4E6B5D] hover:bg-[#3B5447] active:scale-98 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Masuk Portal Admin</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E2ECE7] text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4E6B5D] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama Toko</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#332219] antialiased flex flex-col">
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#166534] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 border border-white/20">
          <Sparkles className="w-4 h-4 text-[#D97706]" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="bg-[#FFFFFF] border-b border-[#E2ECE7] sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Lauk at Me Admin Logo"
              width={48}
              height={48}
              quality={80}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#4E6B5D] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#332219] font-display">
                  Dashboard Admin
                </span>
                <span className="bg-[#EBF2EE] text-[#4E6B5D] text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2ECE7]">
                  Portal Terkelola
                </span>
              </div>
              <span className="text-xs text-[#523A2D] font-semibold">
                Lauk at Me By Umma
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 bg-[#FAF6F0] hover:bg-[#EBF2EE] text-[#332219] border border-[#E2ECE7] text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
            >
              <Store className="w-4 h-4 text-[#4E6B5D]" />
              <span>Lihat Website Toko</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-xs font-bold px-3.5 py-2 rounded-lg transition-colors border border-[#FCA5A5]"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2ECE7] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#523A2D] uppercase tracking-wider block mb-1">
                Total Produk Seafood
              </span>
              <span className="text-2xl font-bold text-[#332219]">
                {products.length} Item
              </span>
            </div>
            <div className="p-3 bg-[#EBF2EE] text-[#4E6B5D] rounded-xl">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2ECE7] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#523A2D] uppercase tracking-wider block mb-1">
                Stok Tersedia
              </span>
              <span className="text-2xl font-bold text-[#166534]">
                {products.filter((p) => p.inStock).length} Item
              </span>
            </div>
            <div className="p-3 bg-[#DCFCE7] text-[#166534] rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2ECE7] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#523A2D] uppercase tracking-wider block mb-1">
                Catch of the Day
              </span>
              <span className="text-2xl font-bold text-[#D97706]">
                {products.filter((p) => p.isCatchOfDay).length} Item
              </span>
            </div>
            <div className="p-3 bg-[#FEF3C7] text-[#D97706] rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2ECE7] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#523A2D] uppercase tracking-wider block mb-1">
                Status Toko
              </span>
              <button
                type="button"
                onClick={() => {
                  const updated = !isPreorderOpen;
                  setIsPreorderOpen(updated);
                  triggerNotification(
                    `Status Pre-Order Toko diubah jadi ${
                      updated ? "BUKA" : "LIBUR"
                    }`
                  );
                }}
                className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors mt-1 ${
                  isPreorderOpen
                    ? "bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]"
                    : "bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isPreorderOpen ? "Pre-Order BUKA" : "Toko LIBUR"}</span>
              </button>
            </div>
            <div className="p-3 bg-[#FAF6F0] text-[#332219] rounded-xl border border-[#E2ECE7]">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: SEARCH, FILTER, AND ADD NEW PRODUCT */}
        <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2ECE7] shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#523A2D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
              />
            </div>

            {/* CATEGORY FILTER */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <SlidersHorizontal className="w-4 h-4 text-[#523A2D] shrink-0 mr-1 hidden lg:block" />
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#4E6B5D] text-white"
                      : "bg-[#FAF6F0] text-[#523A2D] hover:bg-[#EBF2EE]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="w-full md:w-auto bg-[#4E6B5D] hover:bg-[#3B5447] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Seafood Baru</span>
          </button>
        </div>

        {/* PRODUCTS MANAGEMENT TABLE */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2ECE7] shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#E2ECE7] flex items-center justify-between bg-[#FFFDF9]">
            <h2 className="text-sm font-bold text-[#332219] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4E6B5D]" />
              <span>Daftar Katalog Produk Seafood ({filteredProducts.length})</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 p-4">
              <Package className="w-12 h-12 text-[#523A2D]/30 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#332219]">
                Tidak Ada Produk Ditentukan
              </p>
              <p className="text-xs text-[#523A2D] mt-1">
                Coba ubah kata kunci pencarian atau filter kategori di atas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#332219]">
                <thead className="bg-[#FAF6F0] text-[#523A2D] font-bold border-b border-[#E2ECE7] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Produk</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Harga / kg</th>
                    <th className="py-3.5 px-4">Lencana Status</th>
                    <th className="py-3.5 px-4">Status Stok</th>
                    <th className="py-3.5 px-4 text-right">Aksi Manajemen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECE7]">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            quality={75}
                            className="w-12 h-12 rounded-lg object-cover border border-[#E2ECE7] shrink-0"
                          />
                          <div>
                            <span className="font-bold text-[#332219] block text-xs">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-[#523A2D] block">
                              {product.portionEstimate}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="bg-[#EBF2EE] text-[#4E6B5D] font-bold px-2.5 py-1 rounded-md text-[11px] border border-[#E2ECE7]">
                          {product.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#332219]">
                          {product.displayPriceText}
                        </span>
                        {product.originalPriceText && (
                          <span className="text-[10px] text-[#523A2D] line-through block">
                            {product.originalPriceText}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1">
                          {product.isCatchOfDay && (
                            <span className="bg-[#FEF3C7] text-[#D97706] font-bold px-2 py-0.5 rounded text-[10px]">
                              Catch of Day
                            </span>
                          )}
                          {product.isBestSeller && (
                            <span className="bg-[#DCFCE7] text-[#166534] font-bold px-2 py-0.5 rounded text-[10px]">
                              Best Seller
                            </span>
                          )}
                          {product.discountBadge && (
                            <span className="bg-[#FEE2E2] text-[#991B1B] font-bold px-2 py-0.5 rounded text-[10px]">
                              {product.discountBadge}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleStockStatus(product.id)}
                          aria-label={`Ubah status stok ${product.name}`}
                          className={`px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1 transition-all ${
                            product.inStock
                              ? "bg-[#DCFCE7] text-[#166534] hover:bg-[#bbf7d0]"
                              : "bg-[#FEE2E2] text-[#991B1B] hover:bg-[#fca5a5]"
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Tersedia</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Habis</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            aria-label={`Edit ${product.name}`}
                            className="p-2 text-[#4E6B5D] hover:bg-[#EBF2EE] rounded-lg transition-colors border border-[#E2ECE7]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            aria-label={`Hapus ${product.name}`}
                            className="p-2 text-[#991B1B] hover:bg-[#FEE2E2] rounded-lg transition-colors border border-[#FCA5A5]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* EDIT / ADD PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#332219]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border border-[#E2ECE7] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 anim-zoom-in">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Tutup form modal produk"
              className="absolute top-4 right-4 text-[#523A2D] hover:text-[#332219] p-1 rounded-lg hover:bg-[#FAF6F0]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-[#332219] mb-4 pb-3 border-b border-[#E2ECE7]">
              {editingProduct ? "Edit Detail Produk Seafood" : "Tambah Produk Seafood Baru"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#332219] block mb-1">
                  Nama Produk Seafood
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Udang Galah Super"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#332219] block mb-1">
                    Kategori Seafood
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Product["category"])}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                  >
                    <option value="Ikan Utuh">Ikan Utuh</option>
                    <option value="Udang">Udang</option>
                    <option value="Cumi">Cumi</option>
                    <option value="Kerang">Kerang</option>
                    <option value="Fillet">Fillet</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#332219] block mb-1">
                    Harga per kg (Angka Rp)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="80000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#332219] block mb-1">
                    Teks Tampilan Harga
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rp 80.000 / kg"
                    value={formDisplayPriceText}
                    onChange={(e) => setFormDisplayPriceText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#332219] block mb-1">
                    Lencana Diskon (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Diskon 10% / Promo"
                    value={formDiscountBadge}
                    onChange={(e) => setFormDiscountBadge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#332219] block mb-1">
                  URL / Path Gambar WebP
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/udang%20vuname%20sedang.webp"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#332219] block mb-1">
                  Estimasi Porsi
                </label>
                <input
                  type="text"
                  placeholder="🍽️ 1 kg cukup untuk 3-4 porsi"
                  value={formPortionEstimate}
                  onChange={(e) => setFormPortionEstimate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#332219] block mb-1">
                  Pilihan Potongan Gratis (Satu per baris)
                </label>
                <textarea
                  rows={3}
                  placeholder="Utuh Bersih Sisik & Insang (Gratis)&#10;Potong Steak (Gratis)"
                  value={formCutOptions}
                  onChange={(e) => setFormCutOptions(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2ECE7] text-xs text-[#332219] focus:outline-none focus:border-[#4E6B5D] bg-[#FAF6F0]"
                />
              </div>

              {/* TOGGLES */}
              <div className="flex flex-wrap items-center gap-4 bg-[#FAF6F0] p-3 rounded-xl border border-[#E2ECE7]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#332219]">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="rounded text-[#4E6B5D]"
                  />
                  <span>Stok Tersedia</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#D97706]">
                  <input
                    type="checkbox"
                    checked={formCatchOfDay}
                    onChange={(e) => setFormCatchOfDay(e.target.checked)}
                    className="rounded text-[#D97706]"
                  />
                  <span>Catch of the Day</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#166534]">
                  <input
                    type="checkbox"
                    checked={formBestSeller}
                    onChange={(e) => setFormBestSeller(e.target.checked)}
                    className="rounded text-[#166534]"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-[#FAF6F0] hover:bg-[#EBF2EE] text-[#523A2D] text-xs font-semibold py-3 rounded-xl transition-colors border border-[#E2ECE7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#4E6B5D] hover:bg-[#3B5447] text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
