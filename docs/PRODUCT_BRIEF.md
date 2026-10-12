# UNIT Studio — Product Brief

> UNIT Studio · Product Specification v1.1 · Oktober 2026
> Revisi: menambahkan struktur naungan (UNIT Studio) dan visi multi-produk.

## Ringkasan

**UNIT Studio** adalah naungan untuk serangkaian produk digital yang
ringan, cepat, dan bisa langsung digunakan. Produk pertama di bawahnya
adalah **UNIT Tools** — platform utilitas web yang bilingual, gratis,
dan privacy-first.

Visi jangka panjang: UNIT Studio menaungi beberapa produk yang saling
terhubung namun tetap modular, masing-masing menyelesaikan kategori
masalah yang jelas.

| Atribut | Nilai |
|---|---|
| Naungan | UNIT Studio |
| Produk aktif | UNIT Tools |
| Produk disiapkan | UNIT Dev, UNIT Commerce |
| Domain naungan | unitstudio.dev (rencana) |
| Target platform | Responsive web + PWA-ready |
| Model bisnis | Gratis untuk MVP |
| Bahasa | Indonesia / English |
| Arah visual | Light minimal, aksen violet |
| Model produk | Hybrid (umum + developer + commerce) |

## Struktur naungan
UNIT Studio
│
└── unitstudio.dev
├── / → landing naungan
├── /tools/ → UNIT Tools (payung)
│ ├── /image/
│ ├── /text/
│ ├── /dev/
│ ├── /commerce/ ← slot, isi nanti
│ └── /convert/
├── /about/
├── /privacy/
└── /contact/


## Masalah yang diselesaikan

Pengguna sering harus membuka situs berbeda untuk mengompres gambar,
membuat QR, memformat JSON, menghitung teks, atau menyiapkan aset
e-commerce. UNIT Studio menyatukan kebutuhan tersebut di bawah satu
naungan dengan antarmuka yang konsisten.

## Target pengguna

- **Pengguna umum** — kompres gambar, konversi format, buat QR, hitung teks.
- **Developer dan pelajar** — format JSON, encoding/decoding Base64.
- **Kreator dan pekerja digital** — menyiapkan aset dan data dengan cepat.
- **Pelaku e-commerce** (post-MVP) — generator SKU, kalkulator margin, dsb.

## Prinsip produk

1. **No account required.** Alat inti bisa langsung digunakan.
2. **Privacy first.** Pemrosesan dilakukan di browser jika memungkinkan.
3. **Fast by default.** Tidak ada animasi berat atau dependensi berlebihan.
4. **Bilingual from day one.** Bahasa dapat diganti tanpa kehilangan halaman.
5. **Useful, not bloated.** Setiap alat harus punya tujuan yang jelas.
6. **Modular by design.** Produk di bawah naungan bisa tumbuh sendiri-sendiri.

## Ukuran keberhasilan awal

Target internal untuk evaluasi, bukan proyeksi trafik.

| Metrik | Target MVP |
|---|---|
| Produk aktif di naungan | 1 (UNIT Tools) |
| Tool yang benar-benar berfungsi | 6 |
| Halaman utama dan halaman tool | 7+ |
| Akun untuk memakai tool | Tidak perlu |
| Waktu muat awal | Diupayakan < 2,5 detik |
| Tool berhasil digunakan | Diukur via pengujian + metrik agregat |
| Bahasa antarmuka | 2 |

## Tool MVP (di bawah UNIT Tools)

1. Image Compressor
2. Image Converter
3. QR Generator
4. JSON Formatter
5. Base64 Encoder / Decoder
6. Word & Character Counter

## Roadmap singkat

- **Fase 1 — MVP:** 6 tool, kategori dasar, bilingual, static hosting.
- **Fase 2 — Perluasan UNIT Tools:** tambah tool dev & commerce.
- **Fase 3 — Produk baru:** UNIT Dev, UNIT Commerce sebagai sub-produk.
- **Fase 4 — Backend opsional:** auth, riwayat, transaksi (hanya jika perlu).

## Non-goals (tidak masuk MVP)

Login, akun pengguna, cloud storage, workspace tim, paket berbayar,
dashboard administrasi, backend, database, subdomain per produk.