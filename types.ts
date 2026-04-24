export interface PaketHarga {
  namaPaket: string;
  harga: string;
  fitur: string[];
  isPopuler: boolean;
}

export interface FormData {
  // Step 1 — Profil Dasar
  namaBisnis: string;
  tagline: string;
  kategoriJasa: string;
  lokasi: string;
  nomorWhatsApp: string;
  telepon: string;
  email: string;
  instagram: string;
  x_twitter: string;
  tiktok: string;
  // Step 2 — Detail Bisnis
  keunggulan: string;
  layananSpesifik: string[];
  targetPelanggan: string[];
  paketHarga: PaketHarga[];
  // Step 3 — Visual & Aset
  tema: "dark" | "light" | "";
  primaryColor: string;
  logo: string;
  fotoBisnis: string[];
  portofolio: string[];
}

export interface TemplateData {
  namaBisnis: string;
  tagline: string;
  deskripsiPendek: string;
  daftarLayanan: string[];
  nomorWhatsApp: string;
  telepon: string;
  email: string;
  instagram: string;
  x_twitter: string;
  tiktok: string;
  keunggulan: string;
  primaryColor: string;
  logo: string;
  fotoBisnis: string[];
  portofolio: string[];
  paketHarga: PaketHarga[];
  targetPelanggan: string[];
  tema: "dark" | "light";
}
