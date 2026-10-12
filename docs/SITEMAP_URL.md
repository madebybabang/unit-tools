# UNIT Studio — Sitemap & URL Structure

> Struktur URL harus jelas dari awal karena UNIT Studio mengandalkan
> halaman yang bisa ditemukan lewat Google.
> Setiap alat punya alamat sendiri, bukan cuma modal dari homepage.
> Revisi v1.1: menyesuaikan dengan struktur naungan + kategori.

## Aturan dasar

1. Setiap halaman tool punya **judul, deskripsi, dan metadata SEO sendiri**.
2. Gunakan **hreflang** untuk menghubungkan versi ID dan EN.
3. Sediakan **sitemap.xml**, **canonical URL**, dan **halaman 404**.
4. **Slug URL tidak diterjemahkan** saat pengguna ganti bahasa.
   Pertahankan halaman yang sama, ubah kontennya.
5. Hindari halaman kosong hanya demi mengejar kata kunci.
6. Semua URL pakai **trailing slash** untuk konsistensi.
7. Huruf kecil semua, pakai tanda hubung (`-`), tanpa underscore.
8. Slug URL **tidak mengandung kategori** (biar gampang dipindah kategori).

## Struktur URL

### Landing naungan
/
/id/
/en/


### UNIT Tools (payung)
/id/tools/
/en/tools/

Direktori lengkap, pencarian, kategori, filter.

### Image tools
/id/tools/image-compressor/
/en/tools/image-compressor/

/id/tools/image-converter/
/en/tools/image-converter/


### Dev tools
/id/tools/json-formatter/
/en/tools/json-formatter/

/id/tools/base64/
/en/tools/base64/


### Text tools
/id/tools/word-counter/
/en/tools/word-counter/


### Utility tools
/id/tools/qr-generator/
/en/tools/qr-generator/


### Slot kategori (belum diisi)
/id/tools/commerce/ ← slot
/en/tools/commerce/

/id/tools/convert/ ← slot
/en/tools/convert/


### Halaman pendukung
/id/about/ · /en/about/
/id/privacy/ · /en/privacy/
/id/contact/ · /en/contact/
/id/404 · /en/404


### File teknis
/sitemap.xml
/robots.txt
/manifest.webmanifest
/favicon.svg


## Matriks halaman

| Halaman | Path (ID) | Path (EN) | SEO | Prioritas |
|---|---|---|---|---|
| Landing naungan | `/id/` | `/en/` | Ya | Tinggi |
| UNIT Tools | `/id/tools/` | `/en/tools/` | Ya | Tinggi |
| Image Compressor | `/id/tools/image-compressor/` | `/en/tools/image-compressor/` | Ya | Tinggi |
| Image Converter | `/id/tools/image-converter/` | `/en/tools/image-converter/` | Ya | Tinggi |
| JSON Formatter | `/id/tools/json-formatter/` | `/en/tools/json-formatter/` | Ya | Tinggi |
| Base64 | `/id/tools/base64/` | `/en/tools/base64/` | Ya | Sedang |
| Word Counter | `/id/tools/word-counter/` | `/en/tools/word-counter/` | Ya | Sedang |
| QR Generator | `/id/tools/qr-generator/` | `/en/tools/qr-generator/` | Ya | Sedang |
| About | `/id/about/` | `/en/about/` | Ya | Rendah |
| Privacy | `/id/privacy/` | `/en/privacy/` | Ya | Rendah |
| Contact | `/id/contact/` | `/en/contact/` | Ya | Rendah |
| 404 | `/id/404` | `/en/404` | No-index | — |

## Aturan kategori di URL

Kategori **tidak muncul** di slug URL tool.

Contoh:
- JSON Formatter (`category: dev`) tetap di `/tools/json-formatter/`
- Bukan di `/tools/dev/json-formatter/`

**Alasan:**
- Kalau tool pindah kategori, URL gak berubah
- URL lebih pendek & bersih
- Kategori cukup jadi filter di `/tools/`

Kategori tetap ada di halaman direktori sebagai **filter query**:
/id/tools/?category=dev
/id/tools/?category=image


## Aturan bahasa & hreflang

Setiap halaman wajib punya:

```html
<link rel="canonical" href="https://unitstudio.dev/id/tools/json-formatter/">
<link rel="alternate" hreflang="id" href="https://unitstudio.dev/id/tools/json-formatter/">
<link rel="alternate" hreflang="en" href="https://unitstudio.dev/en/tools/json-formatter/">
<link rel="alternate" hreflang="x-default" href="https://unitstudio.dev/en/tools/json-formatter/">


Perilaku redirect
Kondisi	                                    Aksi
Kunjungan ke /	                            Deteksi bahasa browser, redirect ke /id/ atau /en/
Halaman tidak ditemukan	                    Tampilkan 404 bilingual dengan link balik ke home
Tool dipindah/di-rename	                    Redirect 301 ke URL baru
Bahasa tidak didukung di URL	            Fallback ke /en/
Akses /tools/ tanpa prefix bahasa	        Redirect ke /id/tools/ atau /en/tools/

Metadata SEO per halaman tool
Setiap halaman tool wajib punya:

<title> unik — nama tool + "UNIT Studio"

<meta name="description"> — 120–160 karakter, sesuai bahasa

Open Graph: og:title, og:description, og:type, og:url, og:image

Twitter card: summary_large_image

Canonical + hreflang (lihat atas)

Structured data WebApplication (opsional, untuk tool populer)


Catatan implementasi

Slug tidak berubah ketika bahasa berganti.

URL stabil dan bisa dibuka langsung (bukan hash routing).

Semua URL dimasukkan ke sitemap.xml saat build.

robots.txt mengizinkan indexing semua halaman kecuali /404.

Rencana domain: unitstudio.dev. Ganti kalau sudah fix.

Simpan.

## Commit

```bash
git add docs/SITEMAP_URL.md