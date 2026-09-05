# ARMORA — Carry a Place.

Landing page satu halaman untuk concept brand pocket fragrance ARMORA. Dibangun dengan React, TypeScript, Vite, CSS tokens, Lucide, serta beberapa komponen aksesibel Base UI/shadcn. Bahasa Indonesia menjadi default; preferensi ID/EN disimpan di browser.

## Menjalankan website

Gunakan Node.js **22.13+** (atau versi LTS yang lebih baru) dan npm.

```bash
npm install
npm run dev
```

Buka **http://127.0.0.1:5173/**. Server memakai port tetap agar alamat preview konsisten. Jika port ini sudah dipakai aplikasi lain, tutup aplikasi tersebut atau ubah `server.port` di `vite.config.ts`.

```bash
npm run lint     # Lint, aksesibilitas statis, dan pemeriksaan tipe
npm test         # Logika form, konten bilingual, rekomendasi, dan render halaman
npm run build    # Pemeriksaan TypeScript + build produksi ke dist/
npm run preview  # Preview hasil build
npm run format   # Rapikan source
```

## Isi landing page

- Hero dengan visual konsep botol 5 ml, silicone case, dan keychain.
- Product idea, tiga concept scent, detail case, serta empat format produk.
- Scent story, cara penggunaan, dan lifestyle everyday carry.
- Scent finder berbasis empat mood, tanpa AI atau backend.
- Modal aroma, CTA yang mengisi pilihan aroma di form, mobile menu, ID/EN.
- First Drop dalam pengembangan, form minat, teaser QR/NFC, dan kontak.

Tidak ada checkout, pembayaran, akun pelanggan, keranjang, atau inventori pada versi ini. Tidak ada tanggal rilis, harga, formula parfum final, akun sosial aktif, atau bukti sosial yang dibuat-buat.

## Struktur proyek

```text
src/
  assets/
    products/             # Render konsep produk dalam WebP
    visuals/              # Visual lifestyle dalam WebP
  components/             # Brand, Navbar, LanguageSwitch, ScentDialog
  sections/               # Section landing page
  data/
    media.ts              # Satu tempat pemetaan gambar
    products.ts           # Starter Kit, Refill, Case Only, Discovery Set
    scents.ts             # Identitas aroma, cerita ID/EN, rekomendasi mood
    translations.ts       # translations.id dan translations.en
    site.ts               # Nama brand, tagline, link sosial
  hooks/                  # Bahasa dan dukungan opsional WebMCP
  services/leadService.ts  # Validasi, local storage, dan adapter HTTP
  styles/
    tokens.css            # Warna, font, spacing, radius, shadow, motion
    global.css            # Layout, komponen, dan breakpoint responsif
  App.tsx                 # Urutan section dan shared scent selection
  main.tsx                # Entry React dan import font/style
components/ui/            # Primitive UI aksesibel yang digunakan
lib/utils.ts              # Helper className primitive
public/                   # Favicon, og.png, robots.txt
index.html                # Metadata, title, social preview
tests/                    # Tes logika dan server render
.openai/hosting.json       # Konfigurasi Sites, static output dist/
docs/                     # Prompt gambar, catatan validasi dan keputusan
```

## Mengganti identitas visual

**Logo / wordmark:** edit `src/components/Brand.tsx`. Wordmark saat ini menggunakan teks agar ringan. Untuk logo final, simpan SVG atau WebP ke `src/assets/`, import di komponen tersebut, lalu gunakan `<img alt="ARMORA" />`. Ubah juga teks wordmark mobile di `Navbar.tsx`, favicon `public/favicon.svg`, social card `public/og.png`, dan metadata `index.html` bila dibutuhkan.

**Warna:** edit `src/styles/tokens.css`. Mulai dari `--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, dan `--color-muted`. Token surface khusus serta warna concept scent juga ada di sana. Transparansi dan garis di stylesheet diturunkan dari tokens memakai `color-mix()`. Gambar raster tidak berubah warna otomatis; ganti aset bila palette final berbeda. Warna theme browser ada di `index.html`; favicon dan social card merupakan aset tersendiri.

**Font:** edit `--font-body`, `--font-display`, dan `--font-editorial` di `tokens.css`. Manrope Variable saat ini di-host lokal melalui paket `@fontsource-variable/manrope`, di-import di `main.tsx`. Untuk font baru, tambahkan file/font package beserta lisensinya, import atau definisikan `@font-face`, lalu ubah token. Font editorial saat ini Georgia agar tidak memerlukan download tambahan.

**Product image:** ganti file WebP dengan nama yang sama, atau ubah import di `src/data/media.ts`:

| Aset           | Lokasi                                      |
| -------------- | ------------------------------------------- |
| Hero           | `src/assets/products/armora-hero.webp`      |
| Case / refill  | `src/assets/products/armora-case.webp`      |
| CANOPY         | `src/assets/products/armora-canopy.webp`    |
| CONCRETE       | `src/assets/products/armora-concrete.webp`  |
| AFTERGLOW      | `src/assets/products/armora-afterglow.webp` |
| Everyday carry | `src/assets/visuals/armora-everyday.webp`   |

Gunakan square untuk product stills, landscape untuk lifestyle. Pertahankan ruang di sekitar produk untuk crop mobile. Aset bisa diganti menjadi AVIF dengan menyesuaikan import. Ukuran tampilan dikendalikan stylesheet; perbarui atribut `width`/`height` jika rasio aset berubah. Hero diprioritaskan, gambar bawah halaman memakai lazy loading. Semua visual saat ini dihasilkan dengan built-in imagegen sebagai render konsep, bukan foto produk final. Prompt lengkap tersimpan di `docs/`.

## Mengubah konten

**Scent data:** edit `src/data/scents.ts`. `idCopy` dan `enCopy` berisi cerita dan mood, `character` berisi arah aroma. Pertahankan label Concept Scent sampai produk dan formula benar-benar siap. Ubah `moodRecommendations` untuk hubungan Fresh/Cool/Warm/Calm. Saat menambah scent baru, perluas tipe `ScentId` dan pemetaan gambar di `media.ts`.

**Produk / harga:** edit `src/data/products.ts`. Empat format memiliki ID stabil dan `price: null`. Harga sengaja tidak ditampilkan. Jika nanti digunakan, beri tipe harga yang sesuai, simpan seluruh harga di data ini, dan render dengan `Intl.NumberFormat`.

**Translation:** edit `translations.id` dan `translations.en` di `src/data/translations.ts`. Struktur dan key harus sama. Tes akan mendeteksi key yang hilang. Headline campaign dan nama produk sengaja konsisten antarbahasa. Switching tidak reload dan mencoba mempertahankan posisi section. Preferensi bahasa disimpan dengan key `armora-language`; jika storage diblokir, switching tetap bekerja selama halaman terbuka.

**Social media:** isi `src/data/site.ts` dengan URL Instagram/TikTok asli dan alamat email sebenarnya. Nilai `null` menampilkan “Segera hadir / Coming soon” tanpa tautan palsu. Contoh format data: Instagram dan TikTok berupa URL HTTPS penuh; email berupa alamat email saja, tanpa `mailto:`. Komponen footer menambahkan `mailto:` secara otomatis.

**Urutan section:** edit `src/App.tsx`. Navigasi menggunakan anchor ID asli, bukan URL detail palsu.

## Form minat: mode lokal yang jujur

Default `VITE_LEAD_ENDPOINT` kosong. Form memvalidasi nama, email, aroma, dan panjang pesan; menunjukkan loading; lalu menyimpan **satu record terakhir** di `localStorage` dengan key `armora-interest`.

- Tidak ada request server, pengiriman email, atau pendaftaran mailing list pada mode ini.
- Pesan sebelum dan setelah penyimpanan menyatakan keterbatasan tersebut.
- Data berada di browser/perangkat pengunjung; pemilik brand tidak otomatis menerima leads.
- Tombol “Hapus data lokal” menghapus record minat, tanpa menghapus preferensi bahasa.
- Jika storage ditolak atau penuh, tampil pesan error dan bukan success palsu.
- Pengiriman ulang mengganti record lokal sebelumnya.

Untuk menghubungkan backend:

1. Salin `.env.example` menjadi `.env.local`.
2. Isi `VITE_LEAD_ENDPOINT` dengan endpoint POST JSON yang sudah siap.
3. Sesuaikan adapter di `src/services/leadService.ts` dengan kontrak backend, Formspree, Firebase, atau Supabase yang dipilih.
4. Restart dev server; untuk hosting, build ulang karena variabel Vite ditanam saat build.

Adapter mengirim `{ name, email, scent, message }` yang telah dinormalisasi. Respons HTTP 2xx berarti berhasil; HTTP error, timeout 12 detik, dan network error ditampilkan sebagai kegagalan. Kegagalan remote tidak diam-diam dialihkan menjadi success lokal. Backend wajib memvalidasi ulang data dan mengatur origin/CORS yang tepat; tambahkan perlindungan spam serta kebijakan retensi sesuai kebutuhan sebelum menerima data pelanggan nyata. Variabel `VITE_*` bersifat publik: **jangan isi private key atau kredensial rahasia**.

## Pengembangan e-commerce berikutnya

Pertahankan landing page sebagai halaman pengenalan, lalu tambahkan route collection/product berdasarkan ID di `scents.ts` dan `products.ts`. Integrasi API dapat ditempatkan di `src/services/`, misalnya `catalogService.ts` dan `cartService.ts`. Cart UI dapat ditambahkan di `src/components/` setelah katalog, SKU, stok, dan harga final tersedia.

Checkout, perhitungan harga tepercaya, order, payment verification, dan inventory harus dikelola server/provider commerce saat fase tersebut benar-benar dimulai. Saat ini tidak ada placeholder checkout atau cart yang menyesatkan.

Untuk QR, gunakan URL detail produk yang stabil setelah routenya tersedia. Teaser QR/NFC saat ini hanya roadmap; tidak ada NFC API, tag scanning, atau klaim packaging interaktif yang telah tersedia.

## Aksesibilitas dan verifikasi

HTML semantik, label form, error per field, focus-visible, skip link, kontrol keyboard melalui primitive dialog, target sentuh, dan `prefers-reduced-motion` disediakan. Layout menggunakan breakpoint mobile/tablet/desktop tanpa width layar tetap.

`npm test` memeriksa 12 kasus logika serta render halaman ID/EN, keunikan ID, anchor navigation, field form, dan label concept. Build melakukan typecheck dan lint mencakup aturan aksesibilitas statis.

Browser terhubung tidak tersedia pada sesi implementasi, jadi pemeriksaan visual, touch, focus trap, scroll restoration, dan overflow pada browser nyata belum diverifikasi. Checklist manual yang masih perlu dijalankan tersedia di `docs/validation.md`. Jangan menyamakan server render dengan uji interaksi browser.

Dukungan opsional WebMCP menambahkan `select_armora_mood` hanya jika browser memiliki `document.modelContext`. Tool memakai aksi/state scent finder yang sama, memvalidasi input, tidak menangani data pribadi, dan dibersihkan saat komponen unmount. Browser yang tidak mendukung tetap mendapat seluruh fitur normal. Kontrak WebMCP belum diverifikasi pada konteks browser yang mendukung.

## Hosting

`npm run build` menghasilkan website statis di `dist/`. Konfigurasi `.openai/hosting.json` menggunakan direktori tersebut. Proyek juga dapat di-host di layanan static hosting yang mendukung Vite. Jika domain berubah, perbarui URL absolut Open Graph dan X di `index.html`.

Preview Sites disiapkan dengan akses privat pemilik; jangan menganggap URL tersebut sebagai peluncuran publik brand. Untuk versi publik, pastikan endpoint leads dan akun kontak nyata sudah siap jika ingin menerima pendaftaran.
