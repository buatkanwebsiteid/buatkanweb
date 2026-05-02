"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { TemplateData, FormData, PaketHarga } from "@/types";
import TemplateSatu from "@/components/templates/TemplateSatu";
import { SearchableCombobox } from "@/components/ui/SearchableCombobox";
import { AutocompleteInput } from "@/components/ui/AutocompleteInput";
import { AutocompleteTagInput } from "@/components/ui/TagInput";
import {
  Monitor, Smartphone, Loader2, Globe,
  ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, Eye, PenLine,
  Building2, Phone, AlignLeft, Award, MapPin, Target, Palette,
  Upload, ImagePlus, ExternalLink, Sun, Moon, Check, X, Pipette,
  Plus, Trash2, DollarSign, Camera, ChevronUp, ChevronDown, Star,
  Mail, AtSign, Hash, Type,
} from "lucide-react";

/* ═══ CONSTANTS ═══ */
const KATEGORI_SUGGESTIONS = [
  "Servis AC", "Fotografer & Videografer", "Katering", "Bengkel Mobil & Motor",
  "Klinik Kesehatan", "Konsultan Keuangan", "Jasa Pembersihan", "Agensi Kreatif",
];
const LAYANAN_SUGGESTIONS = [
  { items: ["Konsultasi Gratis", "Servis Rutin", "Instalasi Baru", "Perbaikan & Reparasi", "Perawatan Berkala", "Home Visit / Panggilan", "Custom Order", "Desain & Branding", "Fotografi Produk", "Videografi", "Catering & Snack Box", "Deep Cleaning", "Training / Pelatihan", "Pengiriman & Instalasi", "Paket Langganan"] },
];
const TARGET_SUGGESTIONS = [
  { category: "Usia", items: ["Remaja (15\u201320)", "Dewasa Muda (21\u201330)", "Dewasa (31\u201345)", "Paruh Baya (46\u201360)", "Lansia (60+)"] },
  { category: "Keluarga", items: ["Keluarga Muda", "Pasangan Baru Menikah", "Orang Tua", "Lajang"] },
  { category: "Pekerjaan", items: ["Karyawan Swasta", "PNS / ASN", "Profesional", "Wirausaha", "Mahasiswa", "Ibu Rumah Tangga", "Freelancer"] },
  { category: "Bisnis", items: ["Pemilik UMKM", "Perusahaan Besar", "Startup", "Instansi Pemerintah", "Organisasi / Komunitas"] },
  { category: "Daya Beli", items: ["Kelas Eksklusif", "Kelas Menengah", "Kelas Ekonomis"] },
  { category: "Gaya Hidup", items: ["Pecinta Teknologi", "Peduli Kesehatan", "Penggemar Kuliner", "Pecinta Seni & Kreatif", "Traveler"] },
];
const STEP_INFO = [
  { label: "Profil Dasar", icon: Building2 },
  { label: "Detail Bisnis", icon: Target },
  { label: "Visual & Aset", icon: Palette },
];
const NUANSA_OPTIONS = [
  { value: "dark" as const, label: "Dark Mode", desc: "Elegan & Mewah", icon: Moon, preview: "bg-zinc-900 border-zinc-700" },
  { value: "light" as const, label: "Light Mode", desc: "Bersih & Terang", icon: Sun, preview: "bg-white border-zinc-200" },
];
const INITIAL_FORM: FormData = {
  namaBisnis: "", tagline: "", kategoriJasa: "", lokasi: "", nomorWhatsApp: "",
  telepon: "", email: "", instagram: "", x_twitter: "", tiktok: "",
  keunggulan: "", layananSpesifik: [], targetPelanggan: [], paketHarga: [],
  tema: "", primaryColor: "#4f46e5", logo: "", fotoBisnis: [], portofolio: [],
};
const inputClass = "w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-[13px] text-zinc-100 placeholder:text-zinc-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-200";
const EMPTY_PAKET: PaketHarga = { namaPaket: "", harga: "", fitur: [], isPopuler: false };

export default function DashboardPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [templateData, setTemplateData] = useState<TemplateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [mobilePanel, setMobilePanel] = useState<"form" | "preview">("form");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const fotoBisnisInputRef = useRef<HTMLInputElement>(null);
  const portofolioInputRef = useRef<HTMLInputElement>(null);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }, []
  );

  const canProceed = (): boolean => {
    if (step === 0) return !!(formData.namaBisnis.trim() && formData.kategoriJasa.trim() && formData.lokasi && formData.nomorWhatsApp.trim());
    if (step === 1) return !!(formData.layananSpesifik.length > 0 && formData.keunggulan.trim() && formData.targetPelanggan.length > 0);
    if (step === 2) return !!formData.tema;
    return false;
  };

  /* ── File Upload Handlers ── */
  const handleLogoSelect = (file: File) => {
    if (formData.logo) URL.revokeObjectURL(formData.logo);
    updateField("logo", URL.createObjectURL(file));
  };
  const handleLogoRemove = () => {
    if (formData.logo) URL.revokeObjectURL(formData.logo);
    updateField("logo", "");
  };
  const handlePhotosSelect = (files: FileList, field: "fotoBisnis" | "portofolio") => {
    const newUrls = Array.from(files).map((f) => URL.createObjectURL(f));
    updateField(field, [...formData[field], ...newUrls]);
  };
  const handlePhotoRemove = (index: number, field: "fotoBisnis" | "portofolio") => {
    URL.revokeObjectURL(formData[field][index]);
    updateField(field, formData[field].filter((_, i) => i !== index));
  };
  const handleDrop = (e: React.DragEvent, type: "logo" | "fotoBisnis" | "portofolio") => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files.length) return;
    if (type === "logo") handleLogoSelect(files[0]);
    else handlePhotosSelect(files, type);
  };

  /* ── Paket Harga Handlers ── */
  const addPaket = () => updateField("paketHarga", [...formData.paketHarga, { ...EMPTY_PAKET }]);
  const removePaket = (index: number) => updateField("paketHarga", formData.paketHarga.filter((_, i) => i !== index));
  const updatePaket = (index: number, key: keyof PaketHarga, value: string | string[] | boolean) => {
    const updated = formData.paketHarga.map((p, i) => i === index ? { ...p, [key]: value } : p);
    updateField("paketHarga", updated);
  };
  const movePaketUp = (index: number) => {
    if (index === 0) return;
    const arr = [...formData.paketHarga];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    updateField("paketHarga", arr);
  };
  const movePaketDown = (index: number) => {
    if (index >= formData.paketHarga.length - 1) return;
    const arr = [...formData.paketHarga];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    updateField("paketHarga", arr);
  };
  const togglePopuler = (index: number) => {
    const updated = formData.paketHarga.map((p, i) => ({ ...p, isPopuler: i === index ? !p.isPopuler : false }));
    updateField("paketHarga", updated);
  };

  const handleGenerate = async () => {
    if (!canProceed()) return;
    setIsLoading(true); setIsBuilding(true); setError("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Gagal mengenerate website.");
      const data: TemplateData = await res.json();
      data.primaryColor = formData.primaryColor;
      data.logo = formData.logo;
      data.fotoBisnis = formData.fotoBisnis;
      data.portofolio = formData.portofolio;
      data.paketHarga = formData.paketHarga;
      data.telepon = formData.telepon;
      data.email = formData.email;
      data.instagram = formData.instagram;
      data.x_twitter = formData.x_twitter;
      data.tiktok = formData.tiktok;
      data.targetPelanggan = formData.targetPelanggan;
      data.tema = (formData.tema || "light") as "dark" | "light";
      setTemplateData(data);
      // Show building animation for 5 seconds after data is ready
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.");
    } finally { setIsLoading(false); setIsBuilding(false); }
  };

  const handleOpenFullView = () => {
    if (templateData) {
      localStorage.setItem("zp_preview_data", JSON.stringify(templateData));
      window.open("/preview-full", "_blank");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Top Bar */}
      <header className="flex-shrink-0 h-14 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-between px-3 sm:px-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/Logo buatkanweb.webp" alt="BuatkanWeb.id Logo" className="w-7 h-7 rounded-lg object-contain" />
          <span className="font-semibold text-[14px] tracking-tight text-zinc-100">BuatkanWeb.id</span>
        </div>
        {/* Mobile tab toggle */}
        <div className="flex md:hidden items-center bg-zinc-900 border border-zinc-800 rounded-xl p-0.5 gap-0.5">
          <button type="button" onClick={() => setMobilePanel("form")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 cursor-pointer ${mobilePanel === "form" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500"}`}>
            <PenLine className="w-3.5 h-3.5" /> Form
          </button>
          <button type="button" onClick={() => setMobilePanel("preview")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 cursor-pointer ${mobilePanel === "preview" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500"}`}>
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ═══ LEFT PANEL (Form) ═══ */}
        <aside className={`flex-shrink-0 w-full md:max-w-[420px] border-r border-zinc-800/80 bg-zinc-950 flex flex-col overflow-hidden ${mobilePanel === "form" ? "flex" : "hidden"} md:flex`}>
          {/* Step Indicator */}
          <div className="px-5 pt-5 pb-4 border-b border-zinc-800/50">
            <div className="flex items-center gap-1.5 mb-4">
              {STEP_INFO.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step, isDone = i < step;
                return (
                  <div key={i} className="flex items-center gap-1.5 flex-1">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? "bg-indigo-600 shadow-lg shadow-indigo-500/30" : isDone ? "bg-indigo-600/20 border border-indigo-500/30" : "bg-zinc-800/60 border border-zinc-800"}`}>
                      {isDone ? <Check className="w-3 h-3 text-indigo-400" /> : <Icon className={`w-3 h-3 ${isActive ? "text-white" : "text-zinc-600"}`} />}
                    </div>
                    {i < STEP_INFO.length - 1 && <div className={`flex-1 h-px transition-colors duration-300 ${isDone ? "bg-indigo-500/40" : "bg-zinc-800"}`} />}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              {(() => { const StepIcon = STEP_INFO[step].icon; return <StepIcon className="w-4 h-4 text-indigo-400" />; })()}
              <h2 className="font-semibold text-[14px] text-zinc-100">
                Step {step + 1} of 3: <span className="text-zinc-400 font-normal">{STEP_INFO[step].label}</span>
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

            {/* ═══ STEP 1 ═══ */}
            {step === 0 && (
              <>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Building2 className="w-3 h-3" /> Nama Bisnis</label>
                  <input id="input-nama-bisnis" type="text" value={formData.namaBisnis} onChange={(e) => updateField("namaBisnis", e.target.value)} placeholder="contoh: Sejuk Prima AC" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Type className="w-3 h-3" /> Tagline</label>
                  <input id="input-tagline" type="text" value={formData.tagline} onChange={(e) => updateField("tagline", e.target.value)} placeholder="contoh: Solusi AC Terpercaya untuk Kenyamanan Anda" className={inputClass} />
                  <p className="text-zinc-600 text-[11px]">Slogan singkat yang menggambarkan bisnis Anda</p>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Award className="w-3 h-3" /> Kategori Jasa</label>
                  <AutocompleteInput id="input-kategori" value={formData.kategoriJasa} onChange={(v) => updateField("kategoriJasa", v)} suggestions={KATEGORI_SUGGESTIONS} placeholder="contoh: Servis AC" />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><MapPin className="w-3 h-3" /> Lokasi / Area</label>
                  <SearchableCombobox value={formData.lokasi} onChange={(v) => updateField("lokasi", v)} />
                </div>

                {/* Kontak */}
                <div className="space-y-2.5 pt-1">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"><Phone className="w-3 h-3" /> Informasi Kontak</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">WhatsApp</label>
                      <input id="input-whatsapp" type="text" value={formData.nomorWhatsApp} onChange={(e) => updateField("nomorWhatsApp", e.target.value)} placeholder="628xxx" className={`${inputClass} !py-2 !text-[12px]`} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Telepon</label>
                      <input id="input-telepon" type="text" value={formData.telepon} onChange={(e) => updateField("telepon", e.target.value)} placeholder="021-xxxx" className={`${inputClass} !py-2 !text-[12px]`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Email</label>
                    <input id="input-email" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="contoh: info@bisnis.com" className={`${inputClass} !py-2 !text-[12px]`} />
                  </div>
                </div>

                {/* Sosial Media */}
                <div className="space-y-2.5">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider"><AtSign className="w-3 h-3" /> Sosial Media <span className="text-zinc-700 font-normal">(opsional)</span></p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Instagram</label>
                      <input id="input-ig" type="text" value={formData.instagram} onChange={(e) => updateField("instagram", e.target.value)} placeholder="@username" className={`${inputClass} !py-2 !text-[12px]`} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">TikTok</label>
                      <input id="input-tiktok" type="text" value={formData.tiktok} onChange={(e) => updateField("tiktok", e.target.value)} placeholder="@username" className={`${inputClass} !py-2 !text-[12px]`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">X (Twitter)</label>
                    <input id="input-twitter" type="text" value={formData.x_twitter} onChange={(e) => updateField("x_twitter", e.target.value)} placeholder="@username" className={`${inputClass} !py-2 !text-[12px]`} />
                  </div>
                </div>
              </>
            )}

            {/* ═══ STEP 2 ═══ */}
            {step === 1 && (
              <>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><AlignLeft className="w-3 h-3" /> Keunggulan Bisnis</label>
                  <textarea id="input-keunggulan" value={formData.keunggulan} onChange={(e) => updateField("keunggulan", e.target.value)} placeholder="contoh: Berpengalaman 10 tahun, garansi 30 hari, teknisi bersertifikat..." rows={3} className={`${inputClass} resize-none`} />
                  <p className="text-zinc-600 text-[11px]">Tulis keunggulan unik yang membedakan bisnis Anda</p>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Award className="w-3 h-3" /> Layanan Spesifik</label>
                  <AutocompleteTagInput id="input-layanan" tags={formData.layananSpesifik} onChange={(tags) => updateField("layananSpesifik", tags)} suggestions={LAYANAN_SUGGESTIONS} placeholder="contoh: Cuci AC" />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Target className="w-3 h-3" /> Target Pelanggan</label>
                  <AutocompleteTagInput id="input-target" tags={formData.targetPelanggan} onChange={(tags) => updateField("targetPelanggan", tags)} suggestions={TARGET_SUGGESTIONS} placeholder="contoh: Ibu Rumah Tangga" />
                </div>

                {/* ── Paket Harga Builder ── */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><DollarSign className="w-3 h-3" /> Atur Paket & Harga</label>
                    <button type="button" onClick={addPaket} className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                      <Plus className="w-3 h-3" /> Tambah Paket
                    </button>
                  </div>
                  <p className="text-zinc-600 text-[11px] -mt-1">Opsional. Jika kosong, template akan menggunakan paket bawaan.</p>

                  {formData.paketHarga.map((paket, idx) => (
                    <div key={idx} className={`border rounded-xl p-4 space-y-3 transition-all ${paket.isPopuler ? "bg-indigo-950/40 border-indigo-500/30" : "bg-zinc-900/80 border-zinc-800"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Paket {idx + 1}</span>
                        <div className="flex items-center gap-0.5">
                          <button type="button" onClick={() => movePaketUp(idx)} disabled={idx === 0} className="p-1 rounded-md hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer">
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={() => movePaketDown(idx)} disabled={idx === formData.paketHarga.length - 1} className="p-1 rounded-md hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={() => removePaket(idx)} className="p-1 rounded-md hover:bg-red-900/30 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer ml-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <input type="text" value={paket.namaPaket} onChange={(e) => updatePaket(idx, "namaPaket", e.target.value)}
                        placeholder="contoh: Paket Hemat" className={`${inputClass} !py-2 !text-[12px]`} />
                      <input type="text" value={paket.harga} onChange={(e) => updatePaket(idx, "harga", e.target.value)}
                        placeholder="contoh: 150rb" className={`${inputClass} !py-2 !text-[12px]`} />
                      <div>
                        <p className="text-zinc-500 text-[10px] mb-1.5 uppercase tracking-wider font-medium">Fitur Paket</p>
                        <div className="flex flex-wrap gap-1.5 items-center min-h-[36px] bg-zinc-900/60 border border-zinc-800 rounded-lg px-2.5 py-1.5">
                          {paket.fitur.map((f, fi) => (
                            <span key={fi} className="inline-flex items-center gap-1 bg-indigo-600/20 text-indigo-300 text-[10px] font-medium px-2 py-0.5 rounded-md border border-indigo-500/20">
                              {f}
                              <button type="button" onClick={() => updatePaket(idx, "fitur", paket.fitur.filter((_, i) => i !== fi))} className="hover:text-indigo-100 cursor-pointer">
                                <X className="w-2 h-2" />
                              </button>
                            </span>
                          ))}
                          <input type="text" placeholder="Ketik fitur + Enter"
                            className="flex-1 min-w-[100px] bg-transparent text-[11px] text-zinc-100 placeholder:text-zinc-600 placeholder:italic focus:outline-none py-0.5"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val && !paket.fitur.includes(val)) {
                                  updatePaket(idx, "fitur", [...paket.fitur, val]);
                                  (e.target as HTMLInputElement).value = "";
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                      {/* Populer Toggle */}
                      <button type="button" onClick={() => togglePopuler(idx)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${paket.isPopuler
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                          : "bg-zinc-800/40 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                          }`}>
                        <Star className={`w-3 h-3 ${paket.isPopuler ? "fill-amber-400" : ""}`} />
                        {paket.isPopuler ? "Paket Populer ✓" : "Jadikan Paket Populer"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ═══ STEP 3 ═══ */}
            {step === 2 && (
              <>
                {/* Theme */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Palette className="w-3 h-3" /> Nuansa Desain</label>
                  <div className="grid grid-cols-2 gap-3">
                    {NUANSA_OPTIONS.map((opt) => {
                      const Icon = opt.icon; const isSelected = formData.tema === opt.value;
                      return (
                        <button key={opt.value} type="button" onClick={() => updateField("tema", opt.value)}
                          className={`group flex flex-col items-center gap-2.5 p-5 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected ? "bg-indigo-600/10 border-indigo-500/40 shadow-lg shadow-indigo-500/5" : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"}`}>
                          <div className={`w-12 h-12 rounded-xl border ${opt.preview} transition-all`} />
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-0.5">
                              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-400" : "text-zinc-500"}`} />
                              <p className={`text-[13px] font-semibold ${isSelected ? "text-indigo-300" : "text-zinc-200"}`}>{opt.label}</p>
                            </div>
                            <p className="text-[11px] text-zinc-500">{opt.desc}</p>
                          </div>
                          {isSelected && <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Picker */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Pipette className="w-3 h-3" /> Preferensi Warna</label>
                  <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl border-2 border-zinc-700 overflow-hidden cursor-pointer shadow-lg" style={{ backgroundColor: formData.primaryColor }}>
                        <input type="color" value={formData.primaryColor} onChange={(e) => updateField("primaryColor", e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] text-zinc-200 font-medium">Warna Utama</p>
                      <p className="text-[12px] text-zinc-500 font-mono">{formData.primaryColor.toUpperCase()}</p>
                    </div>
                    <div className="ml-auto flex gap-1.5">
                      {["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((c) => (
                        <button key={c} type="button" onClick={() => updateField("primaryColor", c)}
                          className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${formData.primaryColor === c ? "border-white scale-110" : "border-zinc-700 hover:border-zinc-500"}`}
                          style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><ImagePlus className="w-3 h-3" /> Logo Bisnis</label>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) handleLogoSelect(e.target.files[0]); e.target.value = ""; }} />
                  {formData.logo ? (
                    <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-xl p-3">
                      <img src={formData.logo} alt="Logo preview" className="w-14 h-14 rounded-lg object-cover border border-zinc-700" />
                      <div className="flex-1">
                        <p className="text-[13px] text-zinc-300 font-medium">Logo telah diupload</p>
                        <p className="text-[11px] text-zinc-600">Klik × untuk mengganti</p>
                      </div>
                      <button type="button" onClick={handleLogoRemove} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-900/30 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div onClick={() => logoInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "logo")}
                      className="border-2 border-dashed border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group cursor-pointer">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-2 group-hover:bg-zinc-700/80 transition-colors">
                          <ImagePlus className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                        </div>
                        <p className="text-[12px] text-zinc-300 font-medium mb-0.5">Logo Bisnis</p>
                        <p className="text-[10px] text-zinc-600">Seret atau <span className="text-indigo-400">klik untuk upload</span></p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Foto Bisnis Upload */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Camera className="w-3 h-3" /> Foto Bisnis</label>
                  <p className="text-zinc-600 text-[10px] -mt-1">Suasana kerja, toko, atau tim Anda</p>
                  <input ref={fotoBisnisInputRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={(e) => { if (e.target.files) handlePhotosSelect(e.target.files, "fotoBisnis"); e.target.value = ""; }} />
                  <div onClick={() => fotoBisnisInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "fotoBisnis")}
                    className="border-2 border-dashed border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-2 group-hover:bg-zinc-700/80 transition-colors">
                        <Camera className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                      </div>
                      <p className="text-[12px] text-zinc-300 font-medium mb-0.5">Foto Bisnis</p>
                      <p className="text-[10px] text-zinc-600">Seret atau <span className="text-indigo-400">klik untuk upload</span></p>
                    </div>
                  </div>
                  {formData.fotoBisnis.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {formData.fotoBisnis.map((url, i) => (
                        <div key={i} className="relative group/thumb">
                          <img src={url} alt={`Foto Bisnis ${i + 1}`} className="w-full aspect-square rounded-lg object-cover border border-zinc-800" />
                          <button type="button" onClick={(e) => { e.stopPropagation(); handlePhotoRemove(i, "fotoBisnis"); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity cursor-pointer shadow-lg">
                            <X className="w-2.5 h-2.5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Portofolio Upload */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 uppercase tracking-wider"><Upload className="w-3 h-3" /> Foto Portofolio</label>
                  <p className="text-zinc-600 text-[10px] -mt-1">Hasil karya atau proyek yang sudah selesai</p>
                  <input ref={portofolioInputRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={(e) => { if (e.target.files) handlePhotosSelect(e.target.files, "portofolio"); e.target.value = ""; }} />
                  <div onClick={() => portofolioInputRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, "portofolio")}
                    className="border-2 border-dashed border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-2 group-hover:bg-zinc-700/80 transition-colors">
                        <Upload className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                      </div>
                      <p className="text-[12px] text-zinc-300 font-medium mb-0.5">Foto Portofolio</p>
                      <p className="text-[10px] text-zinc-600">Seret atau <span className="text-indigo-400">klik untuk upload</span></p>
                    </div>
                  </div>
                  {formData.portofolio.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {formData.portofolio.map((url, i) => (
                        <div key={i} className="relative group/thumb">
                          <img src={url} alt={`Portfolio ${i + 1}`} className="w-full aspect-square rounded-lg object-cover border border-zinc-800" />
                          <button type="button" onClick={(e) => { e.stopPropagation(); handlePhotoRemove(i, "portofolio"); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity cursor-pointer shadow-lg">
                            <X className="w-2.5 h-2.5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {error && <div className="bg-red-900/20 border border-red-800/30 rounded-xl px-4 py-3 text-red-400 text-[12px]">{error}</div>}
          </div>

          {/* Navigation */}
          <div className="px-5 py-4 border-t border-zinc-800/50 flex gap-2.5">
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-zinc-800 text-zinc-400 text-[13px] font-medium hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200 cursor-pointer">
                <ChevronLeft className="w-3.5 h-3.5" /> Kembali
              </button>
            )}
            {step < 2 ? (
              <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className={`flex-1 flex items-center justify-center gap-1.5 font-medium text-[13px] py-3 rounded-xl transition-all duration-200 cursor-pointer ${canProceed() ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20" : "bg-zinc-800 text-zinc-100 opacity-40 cursor-not-allowed"}`}>
                Lanjut <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button id="btn-generate" type="button" onClick={handleGenerate} disabled={!canProceed() || isLoading} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium text-[13px] py-3.5 rounded-xl hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-600/20 disabled:shadow-none cursor-pointer">
                {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sedang memproses...</>) : ("Generate Website")}
              </button>
            )}
          </div>
        </aside>

        {/* ═══ RIGHT PANEL (Preview) ═══ */}
        <main className={`flex-1 bg-zinc-900/50 flex flex-col overflow-hidden p-3 sm:p-5 ${mobilePanel === "preview" ? "flex" : "hidden"} md:flex`}>
          {/* Desktop-only preview controls */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-between mb-3">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-0.5">
              <button type="button" onClick={() => setViewMode("desktop")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 cursor-pointer ${viewMode === "desktop" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button type="button" onClick={() => setViewMode("mobile")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 cursor-pointer ${viewMode === "mobile" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
            <button type="button" onClick={handleOpenFullView} disabled={!templateData} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
              <ExternalLink className="w-3.5 h-3.5" /> Buka Full View
            </button>
          </div>
          {/* Mobile-only: simple toolbar */}
          <div className="flex md:hidden items-center justify-between mb-2">
            <span className="text-[12px] text-zinc-500 font-medium">Preview Website</span>
            <button type="button" onClick={handleOpenFullView} disabled={!templateData} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
              <ExternalLink className="w-3 h-3" /> Full View
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            {/* ── Desktop-only: Desktop/Mobile slide toggle ── */}
            <div className={`hidden md:block absolute inset-0 transition-all duration-500 ease-in-out ${viewMode === "desktop" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="w-full h-full flex flex-col bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl relative">
                <div className="flex-shrink-0 h-10 bg-zinc-900 border-b border-zinc-800/80 flex items-center px-4 gap-3">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-zinc-700" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-700" /><div className="w-2.5 h-2.5 rounded-full bg-zinc-700" /></div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 bg-zinc-800/80 rounded-lg px-3 py-1 max-w-xs w-full">
                      <Globe className="w-3 h-3 text-zinc-500 flex-shrink-0" />
                      <span className="text-zinc-500 text-[11px] truncate">{templateData ? `${templateData.namaBisnis.toLowerCase().replace(/\s+/g, "-")}.buatkanweb.id` : "preview.buatkanweb.id"}</span>
                    </div>
                  </div>
                  <div className="w-[52px]" />
                </div>
                <div className={`flex-1 overflow-y-auto ${templateData?.tema === "dark" ? "bg-zinc-950" : "bg-white"}`}>{templateData ? <TemplateSatu {...templateData} forceMobile={false} /> : <EmptyState />}</div>
                {isBuilding && <BuildingOverlay />}
              </div>
            </div>
            <div className={`hidden md:block absolute inset-0 transition-all duration-500 ease-in-out ${viewMode === "mobile" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
              <div className="h-full flex items-center justify-center p-4">
                <div className={`relative w-[393px] h-[852px] max-h-full shrink-0 border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/40 flex flex-col ${templateData?.tema === "dark" ? "bg-zinc-950" : "bg-white"}`}>
                  <div className={`flex-shrink-0 flex justify-center pt-3 pb-1 z-10 ${templateData?.tema === "dark" ? "bg-zinc-950" : "bg-white"}`}>
                    <div className="w-[126px] h-[37px] bg-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700 mr-2" /><div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </div>
                  </div>
                  <div className="h-full w-full overflow-y-auto">{templateData ? <TemplateSatu {...templateData} forceMobile={true} /> : <EmptyState />}</div>
                  <div className={`flex-shrink-0 flex justify-center py-2 ${templateData?.tema === "dark" ? "bg-zinc-950" : "bg-white"}`}><div className={`w-32 h-1 rounded-full ${templateData?.tema === "dark" ? "bg-zinc-700" : "bg-zinc-300"}`} /></div>
                  {isBuilding && <BuildingOverlay />}
                </div>
              </div>
            </div>
            {/* ── Mobile-only: direct inline preview (no device frame) ── */}
            <div className="md:hidden w-full h-full flex flex-col rounded-xl border border-zinc-800 overflow-hidden relative">
              <div className={`flex-1 overflow-y-auto ${templateData?.tema === "dark" ? "bg-zinc-950" : "bg-white"}`}>
                {templateData ? <TemplateSatu {...templateData} forceMobile={true} /> : <EmptyState />}
              </div>
              {isBuilding && <BuildingOverlay />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center mb-5"><Monitor className="w-7 h-7 text-zinc-300" /></div>
      <h3 className="text-zinc-400 text-[16px] font-semibold mb-2">Preview Website Anda</h3>
      <p className="text-zinc-300 text-[13px] max-w-sm leading-relaxed mb-6">Isi formulir konfigurasi di panel sebelah kiri, lalu klik <span className="text-indigo-400 font-medium">Generate Website</span> untuk merakit landing page secara otomatis.</p>
      <div className="flex items-center gap-2 text-zinc-300 text-[12px]"><ArrowLeft className="w-3.5 h-3.5" /><span>Isi form di samping untuk memulai</span></div>
    </div>
  );
}

function BuildingOverlay() {
  const [progress, setProgress] = useState(0);
  const steps = [
    "Menyusun struktur halaman...",
    "Memasang konten bisnis...",
    "Menerapkan desain visual...",
    "Mengatur tata letak...",
    "Finishing akhir...",
  ];
  const currentStepIndex = Math.min(Math.floor(progress / 20), steps.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 transition-opacity duration-300">
      <div className="flex flex-col items-center gap-5 max-w-xs">
        {/* Progress bar */}
        <div className="w-56 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-zinc-400 text-[13px] font-medium text-center">{steps[currentStepIndex]}</p>
        <span className="text-zinc-600 text-[11px]">{progress}%</span>
      </div>
    </div>
  );
}
