# UNIT Studio — Checklist MVP

> Daftar kerja ringkas untuk fase MVP.
> Turunan dari `IMPLEMENTATION_ORDER.md` dan `ACCEPTANCE_CRITERIA.md`.
> Update status setiap kali ada item selesai.
> Revisi v1.1.

## Cara pakai

- `[ ]` belum dikerjakan
- `[~]` sedang dikerjakan
- `[x]` selesai & terverifikasi
- Jangan tandai `[x]` sebelum diuji.
- Update file ini setiap selesai satu tugas.

---

## Fase 0 — Persiapan (0/5)

- [ ] 0.1 Setup Vite + Vanilla JS
- [ ] 0.2 Setup struktur folder (`src/`, `public/`, `docs/`)
- [ ] 0.3 Setup Git + remote (sudah, repo aktif)
- [ ] 0.4 Buat `tokens.css` dari `DESIGN_TOKENS.md`
- [ ] 0.5 Setup static hosting (Cloudflare Pages)

## Fase 1 — Fondasi aplikasi (0/7)

- [ ] 1.1 `router.js` — routing berbasis URL
- [ ] 1.2 `i18n.js` — sistem bahasa ID/EN
- [ ] 1.3 `tool-registry.js` — metadata semua tool
- [ ] 1.4 `main-layout.js` + `tool-layout.js`
- [ ] 1.5 Header (logo, nav, search, language switcher)
- [ ] 1.6 Footer
- [ ] 1.7 `toast.js` — notifikasi

## Fase 2 — Halaman statis (0/7)

- [ ] 2.1 Landing naungan `/`
- [ ] 2.2 Homepage UNIT Tools `/id/tools/`
- [ ] 2.3 Direktori tool dengan search
- [ ] 2.4 Halaman About
- [ ] 2.5 Halaman Privacy
- [ ] 2.6 Halaman Contact
- [ ] 2.7 Halaman 404 bilingual

## Fase 3 — Tool mudah (0/3)

- [ ] 3.1 Word & Character Counter
- [ ] 3.2 JSON Formatter
- [ ] 3.3 Base64 Encoder/Decoder

## Fase 4 — Tool visual (0/3)

- [ ] 4.1 QR Generator
- [ ] 4.2 Image Converter
- [ ] 4.3 Image Compressor

## Fase 5 — Polish & SEO (0/6)

- [ ] 5.1 Metadata SEO per halaman
- [ ] 5.2 `hreflang` ID ↔ EN
- [ ] 5.3 `sitemap.xml` + `robots.txt`
- [ ] 5.4 Canonical URL
- [ ] 5.5 Lighthouse audit ≥ 90 desktop
- [ ] 5.6 axe DevTools — tidak ada pelanggaran kritis

## Fase 6 — Pengujian (0/5)

- [ ] 6.1 Uji fungsional di Lenovo T470
- [ ] 6.2 Uji mobile di Redmi Note 7
- [ ] 6.3 Uji Safari/iOS di iPhone 11
- [ ] 6.4 Uji Linux di SSD eksternal
- [ ] 6.5 Uji kasus gagal (file rusak, JSON invalid, Base64 invalid)

## Fase 7 — Deploy & evaluasi (0/5)

- [ ] 7.1 Deploy final
- [ ] 7.2 Pasang Google Search Console
- [ ] 7.3 Pasang analitik privacy-friendly
- [ ] 7.4 Umumkan ke komunitas
- [ ] 7.5 Evaluasi data 2 minggu

---

## Checklist dokumen fondasi (8/8)

- [x] `PRODUCT_BRIEF.md`
- [x] `MVP_SCOPE.md`
- [x] `INFORMATION_ARCHITECTURE.md`
- [x] `SITEMAP_URL.md`
- [x] `DESIGN_TOKENS.md`
- [x] `ACCEPTANCE_CRITERIA.md`
- [x] `IMPLEMENTATION_ORDER.md`
- [x] `CHECKLIST_MVP.md` ← file ini

## Checklist tool (0/6)

- [ ] Image Compressor
- [ ] Image Converter
- [ ] QR Generator
- [ ] JSON Formatter
- [ ] Base64 Encoder/Decoder
- [ ] Word & Character Counter

## Checklist halaman (0/12)

- [ ] Landing naungan `/`
- [ ] Homepage UNIT Tools `/id/`
- [ ] Direktori `/id/tools/`
- [ ] Image Compressor
- [ ] Image Converter
- [ ] QR Generator
- [ ] JSON Formatter
- [ ] Base64
- [ ] Word Counter
- [ ] About
- [ ] Privacy
- [ ] Contact
- [ ] 404

---

## Progress keseluruhan

| Fase | Selesai | Total |
|---|---|---|
| 0 — Persiapan | 0 | 5 |
| 1 — Fondasi | 0 | 7 |
| 2 — Halaman statis | 0 | 7 |
| 3 — Tool mudah | 0 | 3 |
| 4 — Tool visual | 0 | 3 |
| 5 — Polish & SEO | 0 | 6 |
| 6 — Pengujian | 0 | 5 |
| 7 — Deploy | 0 | 5 |
| **Total** | **0** | **41** |

Dokumen fondasi: **8/8 selesai** ✅

## Aturan update

- Update checklist ini **setiap selesai satu tugas**.
- Kalau ada tugas baru, tambahkan ke fase yang sesuai.
- Kalau tugas dibatalkan, tandai dengan `~~coret~~` dan alasan singkat.
- Jangan biarkan checklist ini basi — ini sumber kebenaran progres.

## Definisi MVP selesai

MVP selesai kalau **semua item di atas tercentang** dan
**semua checklist di `ACCEPTANCE_CRITERIA.md` terpenuhi**.

Kalau ragu, baca `ACCEPTANCE_CRITERIA.md` → bagian "Definisi MVP Selesai".