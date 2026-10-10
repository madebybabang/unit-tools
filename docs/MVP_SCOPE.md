# UNIT Tools — MVP Scope

> Batas jelas apa yang masuk MVP dan apa yang tidak.
> Tujuan: mencegah proyek melebar sebelum terbukti dipakai.

## Definisi MVP

MVP UNIT Tools adalah versi pertama yang:

- Memiliki **6 tool fungsional** (bukan tombol pajangan).
- Bisa dipakai **tanpa akun**.
- Berjalan **sebagian besar di browser** pengguna.
- Tersedia dalam **2 bahasa** (Indonesia + Inggris).
- Memiliki **halaman per tool** yang bisa ditemukan lewat Google.
- Di-host secara **statis** tanpa backend.

## Yang Masuk MVP

### Tool (6)

| # | Tool | Fungsi inti |
|---|---|---|
| 1 | Image Compressor | Kompres JPG/PNG/WebP, kontrol kualitas, preview before/after |
| 2 | Image Converter | Konversi format gambar yang didukung browser |
| 3 | QR Generator | Buat QR dari URL/teks, unduh hasil |
| 4 | JSON Formatter | Format, validasi, rapikan JSON, pesan error jelas |
| 5 | Base64 Encoder/Decoder | Encode & decode teks, Unicode-safe |
| 6 | Word & Character Counter | Hitung kata, karakter, kalimat, estimasi waktu baca |

### Fitur non-tool

- Homepage dengan featured tools + daftar semua tool.
- Direktori `/tools/` dengan pencarian, kategori, filter.
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

## Setelah MVP

Kandidat fitur berdasarkan kebutuhan pengunjung:

1. PDF tools (merge, split, compress).
2. Image resizer.
3. UUID generator.
4. Timestamp converter.
5. Color converter.
6. Alat developer tambahan sesuai data penggunaan.

## Aturan perubahan scope

Setiap penambahan fitur harus menjawab:

1. Apakah ini menyelesaikan masalah nyata yang sering muncul?
2. Apakah bisa dijalankan tanpa backend?
3. Apakah menambah beban maintenance yang wajar?
4. Apakah ada bukti (data/feedback) yang mendukung?

Kalau minimal 2 jawabannya "tidak", tunda.