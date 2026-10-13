# UNIT Studio — Implementation Order

> Urutan pengerjaan MVP supaya tidak melebar.
> Prinsip: rencanakan secukupnya, bangun secepatnya, lalu uji.
> Revisi v1.1.

## Prinsip

1. **Fondasi dulu, fitur kemudian.**
2. **Tool mudah dulu, tool visual kemudian.**
3. **Satu tool selesai penuh** (fungsional + error state + SEO) sebelum pindah.
4. **Commit kecil-kecil**, jangan satu commit besar berisi 20 file.
5. **Uji di dua perangkat** (laptop + HP) setiap selesai satu tool.

## Fase 0 — Persiapan

Estimasi: 1–2 hari

| # | Tugas | Output |
|---|---|---|
| 0.1 | Setup Vite + Vanilla JS | `npm run dev` jalan |
| 0.2 | Setup struktur folder | `src/`, `public/`, `docs/` |
| 0.3 | Setup Git + remote | Push pertama sukses |
| 0.4 | Buat `tokens.css` dari `DESIGN_TOKENS.md` | Token siap dipakai |
| 0.5 | Setup static hosting (Cloudflare Pages) | Deploy kosong sukses |

**Selesai kalau:** halaman kosong bisa diakses online.

## Fase 1 — Fondasi aplikasi

Estimasi: 2–3 hari

| # | Tugas | Output |
|---|---|---|
| 1.1 | `router.js` — routing berbasis URL | URL stabil, bisa dibuka langsung |
| 1.2 | `i18n.js` — sistem bahasa ID/EN | Ganti bahasa tanpa reload |
| 1.3 | `tool-registry.js` — metadata semua tool | Sumber data pencarian & kategori |
| 1.4 | `main-layout.js` + `tool-layout.js` | Layout konsisten |
| 1.5 | Header (logo, nav, search, language switcher) | Navigasi jalan |
| 1.6 | Footer | Link pendukung |
| 1.7 | `toast.js` — notifikasi | Feedback visual |

**Selesai kalau:** navigasi antar halaman jalan, bahasa bisa diganti.

## Fase 2 — Halaman statis

Estimasi: 1–2 hari

| # | Tugas | Output |
|---|---|---|
| 2.1 | Landing naungan `/` | Halaman tentang UNIT Studio |
| 2.2 | Homepage UNIT Tools `/id/tools/` | Featured tools + daftar |
| 2.3 | Direktori tool dengan search | Cari tool by nama/kategori |
| 2.4 | Halaman About | Info naungan |
| 2.5 | Halaman Privacy | Kebijakan privasi |
| 2.6 | Halaman Contact | Form / info kontak |
| 2.7 | Halaman 404 | Not found bilingual |

**Selesai kalau:** semua halaman bisa dibuka, search jalan.

## Fase 3 — Tool mudah

Estimasi: 3–4 hari

| # | Tool | Kenapa dulu |
|---|---|---|
| 3.1 | Word & Character Counter | Murni teks, gak butuh API browser khusus |
| 3.2 | JSON Formatter | Uji validasi + error state |
| 3.3 | Base64 Encoder/Decoder | Uji Unicode handling |

**Selesai kalau:** tiga tool berfungsi penuh + error state + copy button.

## Fase 4 — Tool visual

Estimasi: 4–6 hari

| # | Tool | Kenapa belakangan |
|---|---|---|
| 4.1 | QR Generator | Butuh library eksternal kecil |
| 4.2 | Image Converter | Butuh Canvas API |
| 4.3 | Image Compressor | Butuh Canvas + kualitas + preview |

**Selesai kalau:** tiga tool berfungsi penuh + download + preview.

## Fase 5 — Polish & SEO

Estimasi: 2–3 hari

| # | Tugas | Output |
|---|---|---|
| 5.1 | Metadata SEO per halaman | Title, description, OG |
| 5.2 | `hreflang` ID ↔ EN | Link antar bahasa |
| 5.3 | `sitemap.xml` + `robots.txt` | File SEO |
| 5.4 | Canonical URL | Duplikasi dicegah |
| 5.5 | Lighthouse audit | Skor ≥ 90 desktop |
| 5.6 | axe DevTools audit | Tidak ada pelanggaran kritis |

**Selesai kalau:** semua halaman punya metadata SEO & aksesibel.

## Fase 6 — Pengujian

Estimasi: 1–2 hari

| # | Tugas | Perangkat |
|---|---|---|
| 6.1 | Uji fungsional semua tool | Lenovo T470 |
| 6.2 | Uji mobile | Redmi Note 7 |
| 6.3 | Uji Safari/iOS | iPhone 11 |
| 6.4 | Uji Linux | SSD eksternal |
| 6.5 | Uji kasus gagal | File rusak, JSON invalid, Base64 invalid |

**Selesai kalau:** semua checklist di `ACCEPTANCE_CRITERIA.md` tercentang.

## Fase 7 — Deploy & evaluasi

Estimasi: 1 hari + monitoring

| # | Tugas | Output |
|---|---|---|
| 7.1 | Deploy final | Situs online |
| 7.2 | Pasang Google Search Console | Indexing |
| 7.3 | Pasang analitik privacy-friendly | Metrik agregat |
| 7.4 | Umumkan ke komunitas | Trafik awal |
| 7.5 | Evaluasi data 2 minggu | Tentukan fitur berikutnya |

**Selesai kalau:** situs online, terindeks, ada data penggunaan.

## Total estimasi

| Fase | Hari |
|---|---|
| 0 — Persiapan | 1–2 |
| 1 — Fondasi | 2–3 |
| 2 — Halaman statis | 1–2 |
| 3 — Tool mudah | 3–4 |
| 4 — Tool visual | 4–6 |
| 5 — Polish & SEO | 2–3 |
| 6 — Pengujian | 1–2 |
| 7 — Deploy | 1 |
| **Total** | **15–23 hari** |

Realistis kalau dikerjakan sambil santai: **3–4 minggu**.

## Aturan commit

- Satu commit = satu perubahan logis.
- Format pesan: `<tipe>: <deskripsi singkat>`.
- Tipe: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`.
- Contoh: `feat: add word counter tool`, `fix: handle empty json input`.

## Aturan urutan

1. **Jangan lompat fase.** Fondasi dulu.
2. **Jangan bangun tool visual sebelum tool mudah selesai.**
3. **Jangan tambah tool baru sebelum 6 tool MVP selesai.**
4. **Jangan sentuh backend** — belum perlu.
5. **Jangan sentuh desain ulang** setelah Fase 5 dimulai.

## Yang ditunda setelah MVP

- PDF tools.
- Image resizer.
- UUID generator.
- Timestamp converter.
- Color converter.
- UNIT Dev & UNIT Commerce (slot kategori).
- Backend & akun.
- Dark mode.

Semua di atas **tidak boleh disentuh** sebelum MVP selesai.