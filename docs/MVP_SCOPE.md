# UNIT Studio — MVP Scope

> Batas jelas apa yang masuk MVP dan apa yang tidak.
> Tujuan: mencegah proyek melebar sebelum terbukti dipakai.
> Revisi v1.1: menyesuaikan dengan struktur naungan UNIT Studio.

## Definisi MVP

MVP UNIT Studio adalah rilis pertama yang:

- Menghadirkan **UNIT Tools** sebagai produk aktif di bawah naungan.
- Memiliki **6 tool fungsional** (bukan tombol pajangan).
- Bisa dipakai **tanpa akun**.
- Berjalan **sebagian besar di browser** pengguna.
- Tersedia dalam **2 bahasa** (Indonesia + Inggris).
- Memiliki **halaman per tool** yang bisa ditemukan lewat Google.
- Di-host secara **statis** tanpa backend.
- Memiliki **struktur kategori** yang siap menampung tool berikutnya.

## Yang Masuk MVP

### Produk

| Produk | Status di MVP |
|---|---|
| UNIT Tools | Aktif — berisi 6 tool |
| UNIT Dev | Slot disiapkan, belum diisi |
| UNIT Commerce | Slot disiapkan, belum diisi |

### Kategori (di dalam UNIT Tools)

| Kategori | Isi MVP |
|---|---|
| Image | Image Compressor, Image Converter |
| Text | Word & Character Counter |
| Dev | JSON Formatter, Base64 Encoder/Decoder |
| Utility | QR Generator |
| Commerce | Slot disiapkan, belum diisi |
| Convert | Slot disiapkan, belum diisi |

### Tool (6)

| # | Tool | Kategori | Fungsi inti |
|---|---|---|---|
| 1 | Image Compressor | Image | Kompres JPG/PNG/WebP, kontrol kualitas, preview before/after |
| 2 | Image Converter | Image | Konversi format gambar yang didukung browser |
| 3 | QR Generator | Utility | Buat QR dari URL/teks, unduh hasil |
| 4 | JSON Formatter | Dev | Format, validasi, rapikan JSON, pesan error jelas |
| 5 | Base64 Encoder/Decoder | Dev | Encode & decode teks, Unicode-safe |
| 6 | Word & Character Counter | Text | Hitung kata, karakter, kalimat, estimasi waktu baca |

### Fitur non-tool

- Landing naungan di `/` (tentang UNIT Studio).
- Homepage UNIT Tools di `/tools/`.
- Direktori tool dengan pencarian, kategori, filter.
- Pengalih bahasa (ID/EN) di header.
- Navigasi utama: Home, All Tools, Categories, About.
- Halaman pendukung: About, Privacy, Contact, 404.
- Metadata SEO per halaman (title, description, canonical, hreflang).
- Sitemap XML + robots.txt.
- Loading / error / success states di setiap tool.
- Unduhan atau copy hasil di setiap tool.

### Kualitas

- Responsif mobile-first.
- Aksesibilitas dasar (keyboard, ARIA, kontras).
- Tidak ada animasi berat atau dependensi berlebihan.

## Yang TIDAK Masuk MVP

Fitur yang sengaja ditunda:

- Login & akun pengguna.
- Sinkronisasi cloud / riwayat lintas perangkat.
- Upload file ke server.
- Paket berbayar / langganan.
- Workspace tim.
- Dashboard administrasi.
- AI tools berbayar.
- PDF tools.
- Image resizer, UUID generator, timestamp converter, color converter.
- Backend & database.
- Subdomain per produk (masih pakai subfolder).
- Landing page per produk selain UNIT Tools.
- Tool e-commerce (masih slot kosong).

## Setelah MVP

Kandidat fitur berdasarkan kebutuhan pengunjung:

### Perluasan UNIT Tools

1. PDF tools (merge, split, compress).
2. Image resizer.
3. UUID generator.
4. Timestamp converter.
5. Color converter.
6. Regex tester.
7. Diff checker.
8. SQL formatter.

### UNIT Commerce (slot)

1. Generator SKU produk.
2. Kalkulator margin & markup.
3. Barcode generator.
4. Batch image compress untuk katalog.
5. Kalkulator ongkir sederhana.
6. Generator deskripsi produk.

### UNIT Dev (slot)

1. API tester sederhana.
2. JWT decoder.
3. Hash generator (MD5, SHA-1, SHA-256).
4. Cron expression parser.
5. YAML ↔ JSON converter.

## Aturan perubahan scope

Setiap penambahan fitur harus menjawab:

1. Apakah ini menyelesaikan masalah nyata yang sering muncul?
2. Apakah bisa dijalankan tanpa backend?
3. Apakah menambah beban maintenance yang wajar?
4. Apakah ada bukti (data/feedback) yang mendukung?
5. Apakah masuk kategori yang sudah ada, atau perlu kategori baru?

Kalau minimal 2 jawabannya "tidak", tunda.

## Aturan kenaikan produk

Sebuah sub-produk (misal UNIT Commerce) baru boleh dipromosikan
dari "slot" menjadi "aktif" kalau:

- Minimal 3 tool siap dan fungsional.
- Ada kategori yang jelas di information architecture.
- Ada minimal 1 tool yang benar-benar dipakai orang lain selain pembuat.
- Sudah ada halaman landing sendiri di `/tools/<kategori>/` atau subfolder produk.