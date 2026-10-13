# UNIT Studio — Design Tokens

> Fondasi visual UNIT Studio & UNIT Tools.
> Arah: light minimal, aksen violet, bilingual-ready.
> Revisi v1.1.

## Prinsip visual

1. **Light minimal** — latar terang, kontras cukup, ruang lega.
2. **Aksen violet secukupnya** — dipakai untuk CTA, link, state aktif.
3. **Hierarki tipografi jelas** — ukuran & berat font membedakan peran.
4. **Konsisten lintas tool** — token sama di semua halaman.
5. **Aksesibel** — kontras minimal WCAG AA (4.5:1 untuk teks).

## Warna

### Brand

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-brand-50` | `#f5f3ff` | Background halus |
| `--color-brand-100` | `#ede9fe` | Hover ringan |
| `--color-brand-200` | `#ddd6fe` | Border aktif |
| `--color-brand-300` | `#c4b5fd` | Disabled |
| `--color-brand-400` | `#a78bfa` | Aksen sekunder |
| `--color-brand-500` | `#8b5cf6` | **Aksen utama (violet)** |
| `--color-brand-600` | `#7c3aed` | Hover CTA |
| `--color-brand-700` | `#6d28d9` | Active CTA |
| `--color-brand-800` | `#5b21b6` | Teks di background terang |
| `--color-brand-900` | `#4c1d95` | Heading khusus |

### Netral

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-bg` | `#ffffff` | Background utama |
| `--color-bg-subtle` | `#fafafa` | Background sekunder |
| `--color-surface` | `#ffffff` | Card, panel |
| `--color-border` | `#e5e7eb` | Border default |
| `--color-border-strong` | `#d1d5db` | Border tegas |
| `--color-text` | `#111827` | Teks utama |
| `--color-text-muted` | `#6b7280` | Teks sekunder |
| `--color-text-subtle` | `#9ca3af` | Placeholder, hint |

### Status

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-success` | `#10b981` | Sukses |
| `--color-warning` | `#f59e0b` | Peringatan |
| `--color-error` | `#ef4444` | Error |
| `--color-info` | `#3b82f6` | Info |

## Tipografi

### Font family

| Token | Nilai |
|---|---|
| `--font-sans` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| `--font-mono` | `ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` |

Belum pakai webfont eksternal di MVP — sistem font lebih cepat.

### Ukuran

| Token | Nilai | Pemakaian |
|---|---|---|
| `--text-xs` | `0.75rem` (12px) | Label kecil, hint |
| `--text-sm` | `0.875rem` (14px) | Body sekunder |
| `--text-base` | `1rem` (16px) | Body utama |
| `--text-lg` | `1.125rem` (18px) | Sub-heading |
| `--text-xl` | `1.25rem` (20px) | Heading kecil |
| `--text-2xl` | `1.5rem` (24px) | Heading sedang |
| `--text-3xl` | `1.875rem` (30px) | Heading besar |
| `--text-4xl` | `2.25rem` (36px) | Hero mobile |
| `--text-5xl` | `3rem` (48px) | Hero desktop |

### Berat

| Token | Nilai |
|---|---|
| `--font-normal` | `400` |
| `--font-medium` | `500` |
| `--font-semibold` | `600` |
| `--font-bold` | `700` |

### Line height

| Token | Nilai |
|---|---|
| `--leading-tight` | `1.25` |
| `--leading-normal` | `1.5` |
| `--leading-relaxed` | `1.75` |

## Spacing

Skala 4px:

| Token | Nilai |
|---|---|
| `--space-1` | `0.25rem` (4px) |
| `--space-2` | `0.5rem` (8px) |
| `--space-3` | `0.75rem` (12px) |
| `--space-4` | `1rem` (16px) |
| `--space-5` | `1.25rem` (20px) |
| `--space-6` | `1.5rem` (24px) |
| `--space-8` | `2rem` (32px) |
| `--space-10` | `2.5rem` (40px) |
| `--space-12` | `3rem` (48px) |
| `--space-16` | `4rem` (64px) |
| `--space-20` | `5rem` (80px) |

## Radius

| Token | Nilai | Pemakaian |
|---|---|---|
| `--radius-sm` | `0.25rem` (4px) | Input kecil, badge |
| `--radius-md` | `0.375rem` (6px) | Button, input |
| `--radius-lg` | `0.5rem` (8px) | Card |
| `--radius-xl` | `0.75rem` (12px) | Panel besar |
| `--radius-full` | `9999px` | Pill, avatar |

## Shadow

| Token | Nilai |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` |

Minimalis — hindari shadow berlebihan.

## Border

| Token | Nilai |
|---|---|
| `--border-width` | `1px` |
| `--border-color` | `var(--color-border)` |

## Transition

| Token | Nilai |
|---|---|
| `--transition-fast` | `120ms ease` |
| `--transition-base` | `200ms ease` |
| `--transition-slow` | `300ms ease` |

## Z-index

| Token | Nilai |
|---|---|
| `--z-base` | `0` |
| `--z-dropdown` | `100` |
| `--z-sticky` | `200` |
| `--z-modal` | `300` |
| `--z-toast` | `400` |

## Breakpoint

| Token | Nilai | Target |
|---|---|---|
| `--bp-sm` | `640px` | Mobile besar |
| `--bp-md` | `768px` | Tablet |
| `--bp-lg` | `1024px` | Desktop |
| `--bp-xl` | `1280px` | Desktop besar |

## Aturan pemakaian

1. **Selalu pakai token**, jangan hardcode nilai.
2. Warna aksen violet hanya untuk CTA, link, dan state aktif.
3. Jangan tambah warna baru tanpa alasan kuat.
4. Shadow minim — utamakan border tipis.
5. Kontras teks minimal 4.5:1 terhadap background.
6. Token disimpan di `src/styles/tokens.css` saat implementasi.

## Catatan

- Dokumen ini **konsep**, bukan file CSS final.
- Saat implementasi, token akan ditulis dalam `:root { ... }`.
- Dark mode belum masuk MVP — bisa ditambah nanti.