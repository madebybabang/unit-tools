# UNIT Studio — Acceptance Criteria

> Definisi jelas kapan MVP dianggap selesai.
> Tanpa kriteria ini, "selesai" jadi soal perasaan, bukan fakta.
> Revisi v1.1.

## Cara pakai

- Setiap item harus **bisa diverifikasi** — ya/tidak, bukan "kayaknya".
- Kalau ada item yang gagal, MVP **belum selesai**.
- Centang setelah benar-benar diuji, bukan setelah dikoding.

## 1. Fondasi teknis

- [ ] Repo Git aktif dengan commit history jelas.
- [ ] Vite project berjalan (`npm run dev` sukses).
- [ ] Build produksi sukses (`npm run build` tanpa error).
- [ ] Static hosting siap (Cloudflare Pages atau setara).
- [ ] Deploy otomatis dari branch `main`.
- [ ] `.gitignore` mencegah `node_modules` dan `dist` ke-commit.
- [ ] `.gitattributes` + `.editorconfig` aktif untuk cross-platform.

## 2. Struktur & navigasi

- [ ] Halaman `/` (landing naungan) bisa diakses.
- [ ] Halaman `/id/` dan `/en/` bisa diakses.
- [ ] Halaman `/id/tools/` dan `/en/tools/` bisa diakses.
- [ ] Header berisi: logo, navigasi, search, language switcher.
- [ ] Footer berisi: link pendukung, kredit UNIT Studio, tahun.
- [ ] Navigasi mobile berfungsi (ringkas, bisa dibuka/tutup).
- [ ] Halaman 404 tampil untuk URL yang tidak ada.
- [ ] Semua halaman punya judul tab yang unik.

## 3. Bilingual

- [ ] Semua halaman tersedia dalam ID dan EN.
- [ ] Ganti bahasa tidak menghilangkan halaman yang sedang dibuka.
- [ ] Preferensi bahasa tersimpan di `localStorage`.
- [ ] Slug URL tidak berubah saat ganti bahasa.
- [ ] Tidak ada teks hardcoded yang bocor ke bahasa lain.

## 4. Enam tool fungsional

### Image Compressor
- [ ] Bisa upload JPG, PNG, WebP.
- [ ] Bisa atur kualitas (misal slider 0.1–1.0).
- [ ] Menampilkan ukuran sebelum & sesudah.
- [ ] Preview gambar hasil kompres.
- [ ] Bisa unduh hasil.
- [ ] Menampilkan error kalau file bukan gambar.
- [ ] Menampilkan error kalau file terlalu besar.

### Image Converter
- [ ] Bisa upload gambar.
- [ ] Bisa pilih format output (PNG, JPG, WebP).
- [ ] Bisa atur kualitas (untuk format lossy).
- [ ] Preview hasil konversi.
- [ ] Bisa unduh hasil.
- [ ] Menampilkan error untuk format yang tidak didukung.

### QR Generator
- [ ] Bisa input URL atau teks.
- [ ] QR muncul otomatis atau setelah klik "Generate".
- [ ] Bisa atur ukuran QR.
- [ ] Bisa unduh QR sebagai PNG.
- [ ] Menampilkan error kalau input kosong.

### JSON Formatter
- [ ] Bisa paste JSON.
- [ ] Bisa format (pretty-print).
- [ ] Bisa minify.
- [ ] Validasi JSON dengan pesan error yang jelas (baris, kolom).
- [ ] Bisa copy hasil.
- [ ] Bisa hapus input.

### Base64 Encoder / Decoder
- [ ] Bisa encode teks ke Base64.
- [ ] Bisa decode Base64 ke teks.
- [ ] Unicode-safe (huruf non-ASCII tidak rusak).
- [ ] Bisa copy hasil.
- [ ] Menampilkan error kalau input Base64 tidak valid.

### Word & Character Counter
- [ ] Hitung jumlah kata.
- [ ] Hitung jumlah karakter (dengan & tanpa spasi).
- [ ] Hitung jumlah kalimat.
- [ ] Hitung jumlah paragraf.
- [ ] Estimasi waktu baca.
- [ ] Update real-time saat mengetik.
- [ ] Bisa clear input.

## 5. UX & states

- [ ] Setiap tool punya indikator loading saat memproses.
- [ ] Setiap tool punya error state yang jelas (bukan `alert()`).
- [ ] Setiap tool punya success state (toast atau feedback visual).
- [ ] Tombol "Download" / "Copy" memberi feedback setelah diklik.
- [ ] Tool tidak bisa dipakai dengan input kosong (disabled atau error).

## 6. Desain & konsistensi

- [ ] Semua halaman pakai design tokens dari `DESIGN_TOKENS.md`.
- [ ] Tidak ada warna hardcoded di luar tokens.
- [ ] Tombol, input, card konsisten di semua tool.
- [ ] Layout mobile-first — diuji di lebar 360px.
- [ ] Layout desktop rapi di lebar ≥1024px.
- [ ] Tidak ada scroll horizontal di mobile.

## 7. SEO

- [ ] Setiap halaman punya `<title>` unik.
- [ ] Setiap halaman punya `<meta name="description">`.
- [ ] Canonical URL ada di setiap halaman.
- [ ] `hreflang` ID ↔ EN terpasang.
- [ ] `sitemap.xml` tersedia dan valid.
- [ ] `robots.txt` tersedia.
- [ ] Open Graph tag ada di setiap halaman tool.
- [ ] Halaman 404 tidak di-index.

## 8. Aksesibilitas

- [ ] Semua tombol bisa diakses lewat keyboard (Tab).
- [ ] Focus state terlihat jelas.
- [ ] Kontras teks minimal 4.5:1.
- [ ] Semua input punya label.
- [ ] Gambar punya `alt` (kecuali dekoratif).
- [ ] Tidak ada pelanggaran kritis di axe DevTools.

## 9. Performa

- [ ] Lighthouse Performance ≥ 90 di desktop.
- [ ] Lighthouse Performance ≥ 80 di mobile.
- [ ] Waktu muat awal < 2,5 detik di koneksi memadai.
- [ ] Tidak ada dependensi berat tanpa alasan.
- [ ] Ukuran JS bundle wajar (< 200KB untuk MVP).

## 10. Pengujian perangkat

- [ ] Diuji di Lenovo T470 (Windows 11).
- [ ] Diuji di Redmi Note 7 (Chrome mobile).
- [ ] Diuji di iPhone 11 (Safari iOS).
- [ ] Diuji di Linux Mint (SSD eksternal).

## 11. Pengujian kasus gagal

- [ ] Upload file gambar rusak → error yang jelas.
- [ ] Upload file gambar sangat besar → error atau warning.
- [ ] JSON invalid → pesan error dengan posisi.
- [ ] Base64 invalid → pesan error.
- [ ] Input kosong → tool tidak crash.

## 12. Dokumentasi

- [ ] `README.md` berisi cara install & run.
- [ ] `docs/` lengkap (brief, scope, IA, sitemap, tokens, kriteria).
- [ ] Setiap tool punya komentar singkat di kode (kalau perlu).
- [ ] Tidak ada file sampah di repo.

## Definisi "MVP Selesai"

MVP dianggap selesai kalau:

1. **Semua checklist di atas tercentang.**
2. **Enam tool benar-benar bisa dipakai** oleh orang lain, bukan cuma pembuat.
3. **Situs sudah online** dan bisa diakses publik.
4. **Tidak ada bug kritis** yang menghalangi penggunaan tool.
5. **Setiap halaman punya metadata SEO** yang benar.

Kalau salah satu dari 5 poin di atas gagal, MVP belum selesai.

## Yang TIDAK diuji di MVP

- Login / akun pengguna.
- Sinkronisasi cloud.
- Transaksi / pembayaran.
- Backend / database.
- Dark mode.
- Subdomain per produk.
- Tool yang belum dibuat (commerce, convert).

Semua di atas masuk fase setelah MVP.