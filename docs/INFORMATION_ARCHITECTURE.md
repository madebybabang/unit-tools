# UNIT Studio — Information Architecture

> Struktur navigasi & hierarki halaman.
> Prinsip: pengunjung datang untuk menyelesaikan tugas, bukan mengikuti
> tur museum navigasi.
> Revisi v1.1: menyesuaikan dengan struktur naungan UNIT Studio.

## Peta hierarki
UNIT Studio (naungan)
│
└── unitstudio.dev
│
├── Global navigation
│ ├── Language switcher (ID / EN)
│ └── Search
│
├── / → Landing naungan (tentang UNIT Studio)
│
├── /tools/ → UNIT Tools (payung)
│ ├── /image/ → kategori
│ ├── /text/ → kategori
│ ├── /dev/ → kategori
│ ├── /utility/ → kategori
│ ├── /commerce/ → slot, isi nanti
│ └── /convert/ → slot, isi nanti
│
├── /about/ → Tentang UNIT Studio
├── /privacy/ → Kebijakan privasi
├── /contact/ → Kontak
└── /404 → Halaman tidak ditemukan


## Navigasi utama

| Item | Tujuan | Catatan |
|---|---|---|
| Home | `/id/` atau `/en/` | Landing naungan UNIT Studio |
| Tools | `/id/tools/` | Homepage UNIT Tools |
| Categories | Filter di halaman tools | Bukan halaman terpisah di MVP |
| About | `/id/about/` | Info naungan + UNIT Studio |

Pencarian alat dan pengalih bahasa ditempatkan di **header**.
Di perangkat mobile, navigasi diringkas agar area kerja tidak sempit.

## Hierarki kategori

Kategori ditampilkan sebagai filter di `/tools/`. Setiap tool punya
`category` di tool registry.

| Kategori | Slug | Status MVP |
|---|---|---|
| Image | `image` | Aktif (2 tool) |
| Text | `text` | Aktif (1 tool) |
| Dev | `dev` | Aktif (2 tool) |
| Utility | `utility` | Aktif (1 tool) |
| Commerce | `commerce` | Slot kosong |
| Convert | `convert` | Slot kosong |

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
- Halaman landing per sub-produk (selain UNIT Tools).
- Blog / changelog.
- Subdomain per produk.