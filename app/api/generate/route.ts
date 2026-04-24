import { NextRequest, NextResponse } from "next/server";
import type { TemplateData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { namaBisnis, tagline: userTagline, kategoriJasa, lokasi, keunggulan, nomorWhatsApp, telepon, email, instagram, x_twitter, tiktok, layananSpesifik, targetPelanggan, primaryColor } = body;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lokasiSuffix = lokasi ? ` di ${lokasi}` : "";
    const targetArr: string[] = Array.isArray(targetPelanggan) ? targetPelanggan : [];
    const targetText = targetArr.length > 0 ? ` Melayani: ${targetArr.join(", ")}.` : "";

    const taglineMap: Record<string, string> = {
      "Servis AC": `${namaBisnis} — Solusi AC Terpercaya untuk Kenyamanan Rumah & Kantor Anda${lokasiSuffix}`,
      "Fotografer": `${namaBisnis} — Abadikan Setiap Momen Berharga dengan Sentuhan Profesional${lokasiSuffix}`,
      "Bengkel": `${namaBisnis} — Bengkel Pilihan Utama untuk Kendaraan Anda${lokasiSuffix}`,
      "Katering": `${namaBisnis} — Sajian Lezat & Higienis untuk Setiap Acara Istimewa${lokasiSuffix}`,
      "Cleaning Service": `${namaBisnis} — Kebersihan Premium untuk Hunian & Kantor Anda${lokasiSuffix}`,
      "Klinik": `${namaBisnis} — Layanan Kesehatan Profesional & Terpercaya${lokasiSuffix}`,
    };

    const deskripsiMap: Record<string, string> = {
      "Servis AC": `${namaBisnis} hadir sebagai mitra terpercaya untuk perawatan dan perbaikan AC Anda${lokasiSuffix}. ${keunggulan}. Dengan teknisi bersertifikat dan layanan cepat tanggap, kami memastikan kenyamanan udara di ruangan Anda selalu terjaga optimal.${targetText}`,
      "Fotografer": `${namaBisnis} adalah studio fotografi profesional${lokasiSuffix} yang siap mengabadikan momen penting Anda. ${keunggulan}. Dari foto produk hingga dokumentasi event, kami menghadirkan hasil visual berkelas tinggi.${targetText}`,
      "Bengkel": `${namaBisnis} menyediakan layanan perbaikan dan perawatan kendaraan yang komprehensif${lokasiSuffix}. ${keunggulan}. Didukung mekanik berpengalaman dan peralatan modern.${targetText}`,
      "Katering": `${namaBisnis} menghadirkan layanan katering premium dengan cita rasa autentik${lokasiSuffix}. ${keunggulan}. Dari acara intimate hingga event besar, kami menjamin kualitas terbaik.${targetText}`,
      "Cleaning Service": `${namaBisnis} memberikan layanan kebersihan profesional${lokasiSuffix}. ${keunggulan}. Tim kami menggunakan produk ramah lingkungan untuk hasil bersih sempurna.${targetText}`,
      "Klinik": `${namaBisnis} menyediakan layanan kesehatan profesional${lokasiSuffix}. ${keunggulan}. Didukung tenaga medis bersertifikat dan peralatan modern.${targetText}`,
    };

    const userServices: string[] = Array.isArray(layananSpesifik) ? layananSpesifik : [];
    const layananMap: Record<string, string[]> = {
      "Servis AC": ["Cuci AC Berkala", "Isi Freon & Pengecekan", "Perbaikan Kompresor", "Instalasi AC Baru", "Maintenance Kontrak Bulanan", "Konsultasi Gratis"],
      "Fotografer": ["Foto Produk & Katalog", "Dokumentasi Event", "Foto Prewedding & Wedding", "Foto Profil Profesional", "Video Promosi Singkat", "Editing & Retouching"],
      "Bengkel": ["Tune-Up Mesin", "Servis Rem & Suspensi", "Ganti Oli & Filter", "Spooring & Balancing", "Overhaul Mesin", "Diagnosa Kelistrikan"],
      "Katering": ["Katering Harian Kantor", "Katering Pernikahan", "Nasi Box & Snack Box", "Prasmanan Premium", "Menu Diet & Healthy", "Konsultasi Menu Gratis"],
      "Cleaning Service": ["Deep Cleaning Rumah", "Cleaning Kantor Berkala", "Cuci Sofa & Karpet", "Poles Lantai Marmer", "Pembersihan Post-Renovasi", "Disinfeksi Ruangan"],
      "Klinik": ["Konsultasi Dokter Umum", "Pemeriksaan Laboratorium", "Vaksinasi", "Perawatan Gigi", "Fisioterapi", "Medical Check-Up"],
    };

    const defaultTagline = `${namaBisnis} — Layanan Profesional Terpercaya untuk Anda${lokasiSuffix}`;
    const defaultDeskripsi = `${namaBisnis} adalah penyedia jasa profesional yang berkomitmen memberikan layanan terbaik${lokasiSuffix}. ${keunggulan}.${targetText}`;
    const defaultLayanan = ["Konsultasi Gratis", "Layanan Cepat & Responsif", "Tenaga Ahli Berpengalaman", "Garansi Kepuasan", "Harga Transparan", "Dukungan Purna Jual"];

    const result: TemplateData = {
      namaBisnis: namaBisnis || "Bisnis Anda",
      tagline: userTagline || taglineMap[kategoriJasa] || defaultTagline,
      deskripsiPendek: deskripsiMap[kategoriJasa] || defaultDeskripsi,
      daftarLayanan: userServices.length > 0 ? userServices : (layananMap[kategoriJasa] || defaultLayanan),
      nomorWhatsApp: nomorWhatsApp || "6281234567890",
      telepon: telepon || "",
      email: email || "",
      instagram: instagram || "",
      x_twitter: x_twitter || "",
      tiktok: tiktok || "",
      keunggulan: keunggulan || "",
      primaryColor: primaryColor || "#4f46e5",
      logo: "", // Blob URLs handled client-side
      fotoBisnis: [], // Blob URLs handled client-side
      portofolio: [], // Blob URLs handled client-side
      paketHarga: [], // Handled client-side
      targetPelanggan: Array.isArray(targetPelanggan) ? targetPelanggan : [],
      tema: "light", // Overridden client-side
    };

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses permintaan." }, { status: 500 });
  }
}
