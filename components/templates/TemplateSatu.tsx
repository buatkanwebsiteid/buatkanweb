"use client";

import { useState } from "react";
import type { TemplateData } from "@/types";
import {
  CheckCircle, ArrowRight, MessageCircle, Star, Shield, Zap,
  Menu, X, Quote, Clock, Award, Users,
  Wrench, Sparkles, Headphones, Settings, Palette, Camera,
  Phone, Mail,
} from "lucide-react";

const TESTIMONIALS = [
  { name: "Budi Santoso", role: "Pemilik Restoran", rating: 5, text: "Pelayanan sangat profesional dan hasilnya memuaskan. Saya sudah merekomendasikan ke banyak rekan bisnis saya." },
  { name: "Siti Rahmawati", role: "Manager Kantor", rating: 5, text: "Respon cepat dan kerjanya rapi. Tim yang sangat bisa diandalkan untuk kebutuhan rutin maupun darurat." },
  { name: "Ahmad Fauzi", role: "Pengusaha UMKM", rating: 4, text: "Harga kompetitif dengan kualitas yang tidak mengecewakan. Sudah berlangganan lebih dari 2 tahun." },
];

const DEFAULT_PLANS = [
  { namaPaket: "Paket Hemat", harga: "150rb", fitur: ["Pengecekan standar", "Perawatan ringan", "Garansi 7 hari", "Konsultasi gratis"], isPopuler: false },
  { namaPaket: "Paket Profesional", harga: "350rb", fitur: ["Pengecekan menyeluruh", "Perawatan lengkap", "Garansi 30 hari", "Prioritas antrian", "Konsultasi gratis"], isPopuler: true },
  { namaPaket: "Paket Premium", harga: "500rb", fitur: ["Full servis komprehensif", "Perawatan premium", "Garansi 60 hari", "Layanan darurat 24/7", "Konsultasi & laporan", "Diskon member 10%"], isPopuler: false },
];

const SERVICE_ICONS = [Wrench, Settings, Sparkles, Headphones, Palette, Camera, Shield, Zap, Award, Clock, Users, CheckCircle];

const CARA_KERJA = [
  { step: "01", title: "Konsultasi", desc: "Hubungi kami via WhatsApp untuk diskusi kebutuhan Anda secara gratis." },
  { step: "02", title: "Pengerjaan", desc: "Tim profesional kami segera mengerjakan sesuai jadwal yang disepakati." },
  { step: "03", title: "Selesai", desc: "Pekerjaan selesai dengan hasil terjamin. Garansi kepuasan pelanggan." },
];

interface Props extends TemplateData {
  forceMobile?: boolean;
}

export default function TemplateSatu(props: Props) {
  const { namaBisnis, tagline, deskripsiPendek, daftarLayanan, nomorWhatsApp, keunggulan, primaryColor, logo, fotoBisnis, portofolio, paketHarga, telepon, email, instagram, x_twitter, tiktok, targetPelanggan, tema, forceMobile } = props;
  const pc = primaryColor || "#4f46e5";
  const isDark = tema === "dark";
  const waLink = `https://wa.me/${nomorWhatsApp}?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Anda...`;
  const [menuOpen, setMenuOpen] = useState(false);

  const isMob = forceMobile === true;
  const isDesk = forceMobile === false;

  const pcBg10 = `${pc}1a`;
  const pcBg20 = `${pc}33`;

  const bg = isDark ? "bg-zinc-950" : "bg-white";
  const bgSoft = isDark ? "bg-zinc-900" : "bg-zinc-50/50";
  const textPrimary = isDark ? "text-zinc-100" : "text-zinc-900";
  const textSecondary = isDark ? "text-zinc-400" : "text-zinc-500";
  const textTertiary = isDark ? "text-zinc-500" : "text-zinc-400";
  const borderColor = isDark ? "border-zinc-800" : "border-zinc-100";
  const borderColorSoft = isDark ? "border-zinc-800/50" : "border-zinc-200";
  const cardBg = isDark ? "bg-zinc-900" : "bg-white";
  const cardBorder = isDark ? "border-zinc-800" : "border-zinc-100";
  const navBg = isDark ? "bg-zinc-950/80" : "bg-white/80";
  const heroGradient = isDark
    ? "bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900"
    : "bg-gradient-to-br from-indigo-50/80 via-white to-slate-50";

  const plans = paketHarga && paketHarga.length > 0 ? paketHarga : DEFAULT_PLANS;
  const photos = fotoBisnis || [];
  const portfolioPhotos = portofolio || [];

  return (
    <div className={`min-h-full ${bg} ${textPrimary} font-sans`}>
      {/* SEO Meta for targetPelanggan */}
      {targetPelanggan && targetPelanggan.length > 0 && (
        <meta name="keywords" content={targetPelanggan.join(", ")} />
      )}
      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl ${navBg} border-b ${borderColor}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4 py-3" : isDesk ? "px-6 py-4" : "px-4 md:px-6 py-3 md:py-4"} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt={namaBisnis} className={`${isMob ? "w-7 h-7" : isDesk ? "w-8 h-8" : "w-7 h-7 md:w-8 md:h-8"} rounded-lg object-cover`} />
            ) : (
              <div className={`${isMob ? "w-7 h-7" : isDesk ? "w-8 h-8" : "w-7 h-7 md:w-8 md:h-8"} rounded-lg flex items-center justify-center`} style={{ backgroundColor: pc }}>
                <span className={`text-white font-bold ${isMob ? "text-xs" : isDesk ? "text-sm" : "text-xs md:text-sm"}`}>{namaBisnis.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <span className={`font-semibold tracking-tight ${textPrimary} ${isMob ? "text-[13px]" : isDesk ? "text-[15px]" : "text-[13px] md:text-[15px]"}`}>{namaBisnis}</span>
          </div>
          {!isMob && (
            <div className={`${isDesk ? "flex" : "hidden md:flex"} items-center gap-6 text-[13px] ${textSecondary} font-medium`}>
              {["Beranda", "Tentang", "Layanan", "Harga", "Testimoni"].map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`} className={`hover:${textPrimary} transition-colors`}>{n}</a>
              ))}
            </div>
          )}
          {!isMob && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={`${isDesk ? "flex" : "hidden md:flex"} text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors items-center gap-1.5`} style={{ backgroundColor: pc }}>
              <MessageCircle className="w-3.5 h-3.5" /> Hubungi Kami
            </a>
          )}
          {(isMob || forceMobile === undefined) && (
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className={`${isDesk ? "hidden" : isMob ? "block" : "md:hidden"} p-1.5 rounded-lg transition-colors`}>
              {menuOpen ? <X className={`w-5 h-5 ${textSecondary}`} /> : <Menu className={`w-5 h-5 ${textSecondary}`} />}
            </button>
          )}
        </div>
        {menuOpen && (isMob || forceMobile === undefined) && (
          <div className={`${isDesk ? "hidden" : isMob ? "block" : "md:hidden"} border-t ${borderColor} ${navBg} backdrop-blur-xl px-4 py-3 space-y-1`}>
            {["Beranda", "Tentang", "Layanan", "Harga", "Testimoni"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenuOpen(false)} className={`block py-2 px-3 text-[13px] ${textSecondary} rounded-lg transition-colors`}>{n}</a>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 mt-2 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg" style={{ backgroundColor: pc }}>
              <MessageCircle className="w-3.5 h-3.5" /> Hubungi Kami
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="beranda" className="relative overflow-hidden min-h-screen flex flex-col">
        <div className={`absolute inset-0 ${heroGradient}`} />
        <div className={`absolute top-20 right-10 ${isMob ? "w-48 h-48" : isDesk ? "w-72 h-72" : "w-48 md:w-72 h-48 md:h-72"} rounded-full blur-3xl`} style={{ backgroundColor: pcBg10 }} />
        <div className={`relative flex-1 flex max-w-6xl mx-auto w-full ${isMob ? "items-start justify-start pt-24 pb-12 px-6" : isDesk ? "items-center justify-center px-6" : "items-start justify-start pt-24 pb-12 px-6 md:items-center md:justify-center md:pt-0 md:pb-0 md:px-6"}`}>
          <div className={`max-w-3xl flex flex-col ${isMob ? "items-start text-left" : isDesk ? "items-center text-center" : "items-start text-left md:items-center md:text-center"}`}>
            <h1 className={`font-bold leading-[1.15] tracking-tight ${textPrimary} ${isMob ? "text-2xl mb-3" : isDesk ? "text-4xl lg:text-5xl mb-5" : "text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-5"}`}>{namaBisnis} — {tagline || deskripsiPendek.split('.')[0]}</h1>
            <p className={`${textSecondary} leading-relaxed max-w-2xl ${isMob ? "text-[13px] mb-6" : isDesk ? "text-base mb-8" : "text-[13px] md:text-base mb-6 md:mb-8"}`}>{deskripsiPendek}</p>
            <div className={`flex gap-2.5 ${isMob ? "flex-col w-full items-start" : isDesk ? "flex-row items-center justify-center gap-3" : "flex-col w-full items-start sm:flex-row sm:w-auto md:items-center md:justify-center gap-2.5 md:gap-3"}`}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={`group text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${isMob ? "px-5 py-2.5 text-[13px] w-full" : isDesk ? "px-6 py-3 text-[14px]" : "px-5 md:px-6 py-2.5 md:py-3 text-[13px] md:text-[14px] w-full sm:w-auto"}`} style={{ backgroundColor: pc, boxShadow: `0 10px 15px -3px ${pcBg20}` }}>
                <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#layanan" className={`font-medium rounded-xl border ${borderColorSoft} ${textSecondary} transition-all text-center ${isMob ? "px-5 py-2.5 text-[13px] w-full" : isDesk ? "px-6 py-3 text-[14px]" : "px-5 md:px-6 py-2.5 md:py-3 text-[13px] md:text-[14px] w-full sm:w-auto"}`}>Lihat Layanan</a>
            </div>
            <div className={`flex flex-wrap items-center border-t ${borderColor} ${isMob ? "gap-4 mt-8 pt-6 justify-start" : isDesk ? "gap-5 mt-10 pt-8 justify-center" : "gap-4 md:gap-5 mt-8 md:mt-10 pt-6 md:pt-8 justify-start md:justify-center"}`}>
              {[
                { icon: Shield, color: "#10b981", label: "Bergaransi Resmi" },
                { icon: Zap, color: "#f59e0b", label: "Respon Cepat" },
                { icon: Star, label: "4.9 / 5 Rating", fill: true },
              ].map((t) => (
                <div key={t.label} className={`flex items-center gap-1.5 ${isMob ? "text-[11px]" : isDesk ? "text-[12px]" : "text-[11px] md:text-[12px]"}`}>
                  <t.icon className={`${isMob ? "w-3.5 h-3.5" : "w-4 h-4"}`} style={{ color: t.fill ? pc : t.color, fill: t.fill ? pc : "none" }} />
                  <span className={textSecondary}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tentang Kami — USP Text + Foto Bisnis Grid ── */}
      <section id="tentang" className={`${bgSoft} ${isMob ? "py-12" : isDesk ? "py-20" : "py-12 md:py-20"}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`${photos.length > 0 && !isMob ? "flex flex-col md:flex-row items-center gap-10" : "text-center max-w-4xl mx-auto"}`}>
            {/* Text Block */}
            <div className={photos.length > 0 && !isMob ? "flex-1" : ""}>
              <p className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: pc }}>Tentang Kami</p>
              <h2 className={`font-bold tracking-tight mb-4 ${textPrimary} ${isMob ? "text-xl" : isDesk ? "text-3xl" : "text-xl md:text-3xl"}`}>Mengapa Memilih {namaBisnis}?</h2>
              <p className={`${textSecondary} leading-relaxed ${isMob ? "text-[13px] mb-8" : isDesk ? "text-[15px] mb-10" : "text-[13px] md:text-[15px] mb-8 md:mb-10"}`}>{keunggulan || deskripsiPendek}</p>
              <div className={`grid grid-cols-2 ${isMob ? "gap-3" : "gap-4"}`}>
                {[
                  { icon: Award, label: "Berpengalaman", desc: "Tenaga ahli tersertifikasi" },
                  { icon: Clock, label: "Tepat Waktu", desc: "Jadwal fleksibel" },
                  { icon: Shield, label: "Bergaransi", desc: "Jaminan kepuasan" },
                  { icon: Users, label: "Terpercaya", desc: "Ratusan pelanggan puas" },
                ].map((item) => (
                  <div key={item.label} className={`flex flex-col items-center gap-2 rounded-xl border ${cardBg} ${cardBorder} ${isMob ? "p-3" : isDesk ? "p-5" : "p-3 md:p-5"}`}>
                    <item.icon className={`flex-shrink-0 ${isMob ? "w-5 h-5" : "w-6 h-6"}`} style={{ color: pc }} />
                    <div className="text-center">
                      <p className={`font-semibold ${textPrimary} ${isMob ? "text-[12px]" : "text-[13px]"}`}>{item.label}</p>
                      <p className={`${textTertiary} ${isMob ? "text-[10px]" : "text-[11px]"}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Foto Bisnis Grid */}
            {photos.length > 0 && (
              <div className={`${isMob ? "mt-8" : "flex-1 max-w-md"}`}>
                {photos.length === 1 ? (
                  <img src={photos[0]} alt="Foto Bisnis" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
                ) : photos.length === 2 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {photos.slice(0, 2).map((p, i) => (
                      <img key={i} src={p} alt={`Foto Bisnis ${i + 1}`} className="w-full h-48 object-cover rounded-xl shadow-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <img src={photos[0]} alt="Foto Bisnis 1" className="col-span-2 w-full h-48 object-cover rounded-xl shadow-lg" />
                    {photos.slice(1, 3).map((p, i) => (
                      <img key={i} src={p} alt={`Foto Bisnis ${i + 2}`} className="w-full h-32 object-cover rounded-xl shadow-lg" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Layanan + Cara Kerja — Full Screen ── */}
      <section id="layanan" className={`${bg} min-h-screen flex flex-col justify-center ${isMob ? "py-12" : isDesk ? "py-16" : "py-12 md:py-16"}`}>
        <div className={`max-w-6xl mx-auto w-full ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`text-center ${isMob ? "mb-8" : isDesk ? "mb-12" : "mb-8 md:mb-12"}`}>
            <p className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: pc }}>Layanan Kami</p>
            <h2 className={`font-bold tracking-tight ${textPrimary} ${isMob ? "text-xl" : isDesk ? "text-3xl" : "text-xl md:text-3xl"}`}>Apa yang Kami Tawarkan</h2>
            <p className={`${textTertiary} text-[13px] mt-2 max-w-lg mx-auto`}>Berbagai layanan profesional untuk memenuhi kebutuhan Anda.</p>
          </div>
          <div className={`flex flex-wrap justify-center ${isMob ? "gap-3" : "gap-5"}`}>
            {daftarLayanan.map((layanan, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
              return (
                <div key={i}
                  className={`group border rounded-2xl transition-all duration-300 hover:shadow-lg ${cardBg} ${cardBorder} ${isMob ? "p-5 w-full" : "p-6"} ${
                    !isMob ? (daftarLayanan.length <= 2 ? "w-full max-w-[380px]" : "w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]") : ""
                  }`}>
                  <div className={`rounded-xl flex items-center justify-center mb-4 transition-colors ${isMob ? "w-10 h-10" : "w-12 h-12"}`} style={{ backgroundColor: pcBg10 }}>
                    <Icon className={`${isMob ? "w-5 h-5" : "w-6 h-6"}`} style={{ color: pc }} />
                  </div>
                  <h3 className={`font-semibold mb-1.5 ${textPrimary} ${isMob ? "text-[14px]" : "text-[15px]"}`}>{layanan}</h3>
                  <p className={`${textTertiary} leading-relaxed ${isMob ? "text-[12px]" : "text-[13px]"}`}>Dikerjakan oleh tenaga ahli berpengalaman dengan standar kualitas terjamin.</p>
                </div>
              );
            })}
          </div>

          {/* Cara Kerja */}
          <div className={`border-t ${borderColor} ${isMob ? "mt-10 pt-10" : isDesk ? "mt-16 pt-14" : "mt-10 md:mt-16 pt-10 md:pt-14"}`}>
            <div className={`text-center ${isMob ? "mb-8" : "mb-10"}`}>
              <h3 className={`font-bold tracking-tight ${textPrimary} ${isMob ? "text-lg" : isDesk ? "text-2xl" : "text-lg md:text-2xl"}`}>Cara Kerja Kami</h3>
              <p className={`${textTertiary} text-[13px] mt-1.5`}>Proses cepat dan mudah dalam 3 langkah.</p>
            </div>
            <div className={`grid ${isMob ? "grid-cols-1 gap-6" : isDesk ? "grid-cols-3 gap-8" : "grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"} max-w-4xl mx-auto`}>
              {CARA_KERJA.map((ck, i) => (
                <div key={i} className="text-center">
                  <div className={`inline-flex items-center justify-center rounded-full font-bold mb-3 ${isMob ? "w-10 h-10 text-[14px]" : "w-12 h-12 text-[16px]"}`} style={{ backgroundColor: pcBg10, color: pc }}>{ck.step}</div>
                  <h4 className={`font-semibold mb-1 ${textPrimary} ${isMob ? "text-[14px]" : "text-[15px]"}`}>{ck.title}</h4>
                  <p className={`${textTertiary} leading-relaxed ${isMob ? "text-[12px]" : "text-[13px]"}`}>{ck.desc}</p>
                  {i < CARA_KERJA.length - 1 && !isMob && (
                    <ArrowRight className={`mx-auto mt-3 ${textTertiary} ${isDesk ? "hidden" : "md:hidden"} w-4 h-4`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing — Dynamic from paketHarga ── */}
      <section id="harga" className={`${bgSoft} ${isMob ? "py-12" : isDesk ? "py-16" : "py-12 md:py-16"}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`text-center ${isMob ? "mb-8" : isDesk ? "mb-12" : "mb-8 md:mb-12"}`}>
            <p className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: pc }}>Harga</p>
            <h2 className={`font-bold tracking-tight ${textPrimary} ${isMob ? "text-xl" : isDesk ? "text-3xl" : "text-xl md:text-3xl"}`}>Pilih Paket yang Sesuai</h2>
            <p className={`${textTertiary} text-[13px] mt-2 max-w-lg mx-auto`}>Harga transparan tanpa biaya tersembunyi.</p>
          </div>
          <div className={`flex flex-wrap ${isMob ? "flex-col gap-6" : isDesk ? "flex-row gap-5" : "flex-col md:flex-row gap-6 md:gap-5"}`}>
            {plans.map((plan, idx) => {
              const isPopular = plan.isPopuler;
              return (
                <div key={idx} className={`relative rounded-2xl border transition-all flex flex-col ${isMob ? "p-5 w-full" : isDesk ? "p-6 flex-1" : "p-5 md:p-6 w-full md:flex-1"} ${isPopular ? "text-white shadow-xl" : `${cardBg} ${cardBorder} hover:shadow-lg`}`}
                  style={isPopular ? { backgroundColor: pc, borderColor: pc, boxShadow: `0 20px 25px -5px ${pcBg20}` } : undefined}>
                  {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">Populer</div>}
                  <p className={`font-semibold mb-1 ${isMob ? "text-[14px]" : "text-[15px]"} ${isPopular ? "text-white" : textPrimary}`}>{plan.namaPaket}</p>
                  <div className="flex items-baseline gap-1 mb-5 mt-2">
                    <span className={`text-[11px] ${isPopular ? "text-white/60" : textTertiary}`}>Rp</span>
                    <span className={`font-bold ${isMob ? "text-2xl" : "text-3xl"} ${isPopular ? "text-white" : textPrimary}`}>{plan.harga}</span>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.fitur.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isPopular ? "text-white/60" : ""}`} style={!isPopular ? { color: pc } : undefined} />
                        <span className={`${isMob ? "text-[12px]" : "text-[13px]"} ${isPopular ? "text-white/80" : textSecondary}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors mt-auto"
                    style={isPopular ? { backgroundColor: "white", color: pc } : { backgroundColor: pc, color: "white" }}>
                    <MessageCircle className="w-3.5 h-3.5" /> Pilih Paket
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials + Portofolio photos ── */}
      <section id="testimoni" className={`${bg} ${isMob ? "py-12" : isDesk ? "py-16" : "py-12 md:py-16"}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`text-center ${isMob ? "mb-8" : isDesk ? "mb-12" : "mb-8 md:mb-12"}`}>
            <p className="text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: pc }}>Testimoni</p>
            <h2 className={`font-bold tracking-tight ${textPrimary} ${isMob ? "text-xl" : isDesk ? "text-3xl" : "text-xl md:text-3xl"}`}>Apa Kata Pelanggan Kami</h2>
          </div>
          <div className={`grid gap-4 ${isMob ? "grid-cols-1" : isDesk ? "grid-cols-3 gap-5" : "grid-cols-1 md:grid-cols-3 md:gap-5"}`}>
            {TESTIMONIALS.map((t, i) => {
              const hasPhoto = portfolioPhotos.length > i && portfolioPhotos[i];
              return (
                <div key={i} className={`${cardBg} border ${cardBorder} rounded-2xl hover:shadow-lg transition-shadow overflow-hidden`}>
                  {hasPhoto && (
                    <img src={portfolioPhotos[i]} alt={`Portofolio ${i + 1}`} className="w-full h-48 object-cover" />
                  )}
                  <div className={isMob ? "p-5" : "p-6"}>
                    <Quote className={`mb-3 ${isMob ? "w-6 h-6" : "w-7 h-7"}`} style={{ color: pcBg20 }} />
                    <p className={`${textSecondary} leading-relaxed mb-4 ${isMob ? "text-[12px]" : "text-[13px]"}`}>&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s < t.rating ? "text-amber-400 fill-amber-400" : isDark ? "text-zinc-700" : "text-zinc-200"}`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className={`rounded-full flex items-center justify-center ${isMob ? "w-8 h-8" : "w-9 h-9"}`} style={{ backgroundColor: pcBg10 }}>
                        <span className="text-[11px] font-bold" style={{ color: pc }}>{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className={`font-semibold ${textPrimary} ${isMob ? "text-[12px]" : "text-[13px]"}`}>{t.name}</p>
                        <p className={`${textTertiary} ${isMob ? "text-[10px]" : "text-[11px]"}`}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`${bgSoft} ${isMob ? "py-12" : isDesk ? "py-16" : "py-12 md:py-16"}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`relative bg-zinc-900 rounded-2xl overflow-hidden ${isMob ? "p-8" : isDesk ? "p-14" : "p-8 md:p-14"}`}>
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full blur-3xl translate-x-20 -translate-y-20" style={{ backgroundColor: `${pc}15` }} />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className={`font-bold text-white tracking-tight ${isMob ? "text-xl mb-3" : isDesk ? "text-3xl mb-4" : "text-xl md:text-3xl mb-3 md:mb-4"}`}>Siap untuk Memulai?</h2>
              <p className={`text-zinc-400 leading-relaxed ${isMob ? "text-[12px] mb-6" : isDesk ? "text-[15px] mb-8" : "text-[12px] md:text-[15px] mb-6 md:mb-8"}`}>Hubungi kami sekarang melalui WhatsApp untuk konsultasi gratis.</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 text-white font-medium rounded-xl transition-all shadow-xl ${isMob ? "px-6 py-3 text-[13px]" : isDesk ? "px-8 py-3.5 text-[14px]" : "px-6 md:px-8 py-3 md:py-3.5 text-[13px] md:text-[14px]"}`}
                style={{ backgroundColor: pc, boxShadow: `0 20px 25px -5px ${pcBg20}` }}>
                <MessageCircle className="w-4 h-4" /> Chat WhatsApp Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t ${borderColor} ${isMob ? "py-8" : isDesk ? "py-12" : "py-8 md:py-12"}`}>
        <div className={`max-w-6xl mx-auto ${isMob ? "px-4" : isDesk ? "px-6" : "px-4 md:px-6"}`}>
          <div className={`grid gap-8 ${isMob ? "grid-cols-1" : isDesk ? "grid-cols-3 gap-10" : "grid-cols-1 md:grid-cols-3 md:gap-10"}`}>
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {logo ? (
                  <img src={logo} alt={namaBisnis} className="w-7 h-7 rounded-lg object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: pc }}>
                    <span className="text-white text-[11px] font-bold">{namaBisnis.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <span className={`font-semibold text-[14px] ${textPrimary}`}>{namaBisnis}</span>
              </div>
              <p className={`${textTertiary} text-[12px] leading-relaxed max-w-xs`}>{deskripsiPendek.length > 120 ? deskripsiPendek.substring(0, 120) + "..." : deskripsiPendek}</p>
            </div>

            {/* Contact */}
            {(nomorWhatsApp || telepon || email) && (
              <div>
                <p className={`font-semibold text-[13px] mb-3 ${textPrimary}`}>Kontak</p>
                <div className="space-y-2">
                  {nomorWhatsApp && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: pc }} /> WhatsApp
                    </a>
                  )}
                  {telepon && (
                    <a href={`tel:${telepon}`} className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: pc }} /> {telepon}
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: pc }} /> {email}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Social */}
            {(instagram || x_twitter || tiktok) && (
              <div>
                <p className={`font-semibold text-[13px] mb-3 ${textPrimary}`}>Sosial Media</p>
                <div className="space-y-2">
                  {instagram && (
                    <a href={`https://instagram.com/${instagram.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: pc }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> {instagram}
                    </a>
                  )}
                  {tiktok && (
                    <a href={`https://tiktok.com/${tiktok.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: pc }}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> {tiktok}
                    </a>
                  )}
                  {x_twitter && (
                    <a href={`https://x.com/${x_twitter.replace(/^@/, '')}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-[12px] ${textSecondary} hover:${textPrimary} transition-colors`}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: pc }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> {x_twitter}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className={`border-t ${borderColor} mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2`}>
            <p className={`${textTertiary} text-[11px]`}>&copy; {new Date().getFullYear()} {namaBisnis}. Hak cipta dilindungi.</p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={`text-[11px] font-medium flex items-center gap-1`} style={{ color: pc }}>
              <MessageCircle className="w-3 h-3" /> Hubungi Kami
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
