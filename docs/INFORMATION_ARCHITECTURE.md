# UNIT Tools — Information Architecture

> Struktur navigasi & hierarki halaman.
> Prinsip: pengunjung datang untuk menyelesaikan tugas, bukan mengikuti
> tur museum navigasi.

## Peta hierarki
UNIT Tools
│
├── Global navigation
│ ├── Language switcher (ID / EN)
│ └── Search
│
├── Home
│ ├── Featured tools
│ └── All tools preview
│
├── Browse & search
│ └── /tools/ — direktori lengkap
│ ├── Kategori: Image tools
│ └── Kategori: Utility / Developer tools
│
├── Individual tool page
│ └── Input → Processing → Result → Download / Copy
│
└── Supporting pages
├── About
├── Privacy
├── Contact
└── Not found (404)


## Navigasi utama

| Item | Tujuan | Catatan |
|---|---|---|
| Home | `/id/` atau `/en/` | Titik masuk utama |
| All Tools | `/id/tools/` | Direktori lengkap |
| Categories | Ancor / filter di halaman tools | Bukan halaman terpisah di MVP |
| About | `/id/about/` | Info produk & UNIT Studio |

Pencarian alat dan pengalih bahasa ditempatkan di **header**.
Di perangkat mobile, navigasi diringkas agar area kerja tidak sempit.

## Alur halaman tool

Setiap halaman tool mengikuti alur yang sama:

1. Input → unggah file / tempel teks / isi form

2. Processing → indikator loading, validasi

3. Result → preview, ukuran, atau output teks

4. Action → Download atau Copy


Konsistensi alur ini penting supaya pengguna tidak perlu belajar ulang
setiap kali membuka tool berbeda.

## Komponen global

| Komponen | Fungsi |
|---|---|
| Header | Logo, navigasi utama, search, language switcher |
| Footer | Link pendukung, kredit UNIT Studio, tahun |
| Tool card | Judul, deskripsi singkat, link "Open tool" |
| Search | Cari tool berdasarkan nama/kata kunci |
| Language switcher | Ganti ID ⇄ EN tanpa kehilangan halaman |
| Toast | Notifikasi singkat (sukses, error, copy berhasil) |

## Pencarian

- Cari berdasarkan nama tool, kategori, dan kata kunci.
- Sumber data: **tool registry** (satu daftar metadata).
- Hasil muncul di halaman `/tools/` atau dropdown di header.
- Bilingual: query dicocokkan ke label ID dan EN.

## Pengalih bahasa

- Bahasa aktif tersimpan di URL prefix (`/id/`, `/en/`).
- Ganti bahasa = ganti prefix URL, **bukan** reload halaman kosong.
- Slug URL tetap sama, hanya konten yang berubah.
- Preferensi bahasa disimpan di `localStorage` untuk kunjungan berikutnya.

## Yang TIDAK termasuk IA MVP

- Login / akun pengguna.
- Cloud storage.
- Workspace tim.
- Paket berbayar.
- Dashboard administrasi.
- Halaman kategori terpisah per kategori.
- Blog / changelog.