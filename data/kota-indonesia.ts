/** Comprehensive list of Indonesian cities (Kota & Kabupaten) */
export const KOTA_INDONESIA: string[] = [
  // DKI Jakarta
  "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur",
  // Jawa Barat
  "Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Tasikmalaya", "Sukabumi", "Cirebon", "Garut", "Karawang",
  "Subang", "Purwakarta", "Cianjur", "Kuningan", "Majalengka", "Sumedang", "Indramayu", "Pangandaran",
  // Jawa Tengah
  "Semarang", "Solo", "Surakarta", "Pekalongan", "Tegal", "Magelang", "Salatiga", "Kudus", "Jepara",
  "Klaten", "Purwokerto", "Cilacap", "Brebes", "Demak", "Kendal", "Boyolali", "Sragen", "Karanganyar",
  "Wonogiri", "Blora", "Rembang", "Pati", "Pemalang", "Banjarnegara", "Purbalingga", "Kebumen", "Wonosobo",
  // DI Yogyakarta
  "Yogyakarta", "Sleman", "Bantul", "Gunungkidul", "Kulon Progo",
  // Jawa Timur
  "Surabaya", "Malang", "Sidoarjo", "Gresik", "Mojokerto", "Kediri", "Blitar", "Madiun", "Jember",
  "Banyuwangi", "Probolinggo", "Pasuruan", "Lumajang", "Tulungagung", "Trenggalek", "Ponorogo", "Ngawi",
  "Magetan", "Pacitan", "Lamongan", "Tuban", "Bojonegoro", "Nganjuk", "Situbondo", "Bondowoso",
  "Bangkalan", "Sampang", "Pamekasan", "Sumenep",
  // Banten
  "Tangerang", "Tangerang Selatan", "Serang", "Cilegon", "Pandeglang", "Lebak",
  // Sumatera Utara
  "Medan", "Binjai", "Pematang Siantar", "Tebing Tinggi", "Tanjung Balai", "Padang Sidempuan",
  "Deli Serdang", "Langkat", "Simalungun", "Karo", "Dairi", "Tobasa", "Samosir", "Nias",
  // Sumatera Barat
  "Padang", "Bukittinggi", "Payakumbuh", "Solok", "Sawahlunto", "Pariaman",
  "Agam", "Tanah Datar", "Pasaman", "Pesisir Selatan",
  // Riau
  "Pekanbaru", "Dumai", "Kampar", "Bengkalis", "Siak", "Rokan Hulu", "Rokan Hilir", "Indragiri Hulu",
  // Kepulauan Riau
  "Batam", "Tanjung Pinang", "Bintan", "Karimun", "Lingga",
  // Jambi
  "Jambi", "Sungai Penuh", "Muaro Jambi", "Bungo", "Merangin", "Tebo",
  // Sumatera Selatan
  "Palembang", "Prabumulih", "Lubuklinggau", "Pagar Alam", "Banyuasin", "Ogan Ilir", "Muara Enim",
  // Bengkulu
  "Bengkulu", "Rejang Lebong", "Kaur", "Seluma",
  // Lampung
  "Bandar Lampung", "Metro", "Lampung Selatan", "Lampung Tengah", "Lampung Utara",
  "Pesawaran", "Pringsewu", "Way Kanan", "Tulang Bawang",
  // Bangka Belitung
  "Pangkal Pinang", "Bangka", "Belitung", "Bangka Tengah",
  // Aceh
  "Banda Aceh", "Lhokseumawe", "Langsa", "Sabang", "Aceh Besar", "Aceh Utara", "Aceh Timur",
  // Kalimantan Barat
  "Pontianak", "Singkawang", "Sambas", "Ketapang", "Sintang", "Sanggau", "Kubu Raya",
  // Kalimantan Tengah
  "Palangka Raya", "Kotawaringin Barat", "Kotawaringin Timur", "Kapuas", "Barito Utara",
  // Kalimantan Selatan
  "Banjarmasin", "Banjarbaru", "Banjar", "Tanah Laut", "Hulu Sungai Selatan", "Tabalong",
  // Kalimantan Timur
  "Samarinda", "Balikpapan", "Bontang", "Kutai Kartanegara", "Berau", "Paser",
  // Kalimantan Utara
  "Tarakan", "Nunukan", "Malinau", "Bulungan",
  // Sulawesi Selatan
  "Makassar", "Parepare", "Palopo", "Maros", "Gowa", "Bone", "Wajo", "Sidrap",
  "Pinrang", "Enrekang", "Toraja Utara", "Tana Toraja", "Luwu", "Bulukumba",
  // Sulawesi Tenggara
  "Kendari", "Baubau", "Kolaka", "Konawe", "Muna", "Wakatobi",
  // Sulawesi Tengah
  "Palu", "Donggala", "Parigi Moutong", "Poso", "Toli-Toli", "Banggai",
  // Sulawesi Utara
  "Manado", "Bitung", "Tomohon", "Kotamobagu", "Minahasa", "Sangihe",
  // Gorontalo
  "Gorontalo", "Bone Bolango", "Pohuwato",
  // Sulawesi Barat
  "Mamuju", "Majene", "Polewali Mandar",
  // Bali
  "Denpasar", "Badung", "Gianyar", "Tabanan", "Klungkung", "Karangasem", "Buleleng", "Bangli", "Jembrana",
  // NTB
  "Mataram", "Lombok Barat", "Lombok Tengah", "Lombok Timur", "Sumbawa", "Bima", "Dompu",
  // NTT
  "Kupang", "Ende", "Flores Timur", "Manggarai", "Sumba Barat", "Sikka", "Ngada",
  // Maluku
  "Ambon", "Tual", "Maluku Tengah", "Seram Bagian Barat",
  // Maluku Utara
  "Ternate", "Tidore", "Halmahera Utara", "Halmahera Selatan",
  // Papua
  "Jayapura", "Merauke", "Sorong", "Manokwari", "Timika", "Nabire", "Biak", "Fakfak",
];
