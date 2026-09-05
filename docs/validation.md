# Catatan validasi ARMORA

## Sudah diperiksa otomatis

- `npm install` berhasil; proyek menggunakan React + Vite + TypeScript.
- `npm run build`: typecheck dan static production build.
- `npm run lint`: pemeriksaan tipe, correctness, dan aksesibilitas statis.
- `npm test`: 12 tes logika; normalisasi dan validasi form, kesalahan storage, penghapusan satu record, respons HTTP, kegagalan jaringan, semua mapping mood, kelengkapan konten ID/EN, dan sentralisasi warna.
- Server render kedua bahasa: semua section ada, tepat satu h1, ID unik, anchor mempunyai target, empat field form ada, dan konsep produk dilabeli.
- Dev server lokal merespons HTTP 200. Entry dan aset berasal dari workspace.
- Semua product images sudah WebP, diimpor dari `src/data/media.ts`. Hero sekitar 54 kB; tiga gambar koleksi sekitar 23 kB per gambar.
- Built-in imagegen dipakai untuk semua visual konsep; produk dan lettering sudah diperiksa pada aset oleh pembuat aset.
- Metadata khusus ARMORA beserta social card. Tidak ada halaman detail, akun sosial, atau link checkout palsu.

## Batas verifikasi sesi

Browser terhubung tidak tersedia. Tidak ada klaim pengujian visual atau interaksi pada browser nyata. Server render tidak memeriksa layout, CSS, touch, tab focus, maupun localStorage browser. WebMCP juga belum diverifikasi dalam konteks browser yang mendukung `document.modelContext`.

## Checklist manual browser

Gunakan viewport 320, 375, 768, 1024, dan 1440 px. Ini daftar pemeriksaan yang belum dilakukan, bukan laporan lulus.

- Pastikan tidak ada horizontal overflow; produk dan keychain terlihat dalam crop gambar.
- Navigasi sticky, anchor scroll, mobile menu, Escape, focus trap, dan focus return bekerja.
- Ganti ID/EN di tengah halaman; section dan input form tetap terjaga.
- Buka ketiga detail aroma dengan pointer dan keyboard; tutup via tombol dan Escape.
- Pilih Fresh/Cool/Warm/Calm; lihat CANOPY/CONCRETE/AFTERGLOW/CANOPY.
- Pilih CTA di detail aroma dan pastikan preferred scent terisi di form.
- Kirim field kosong dan email salah; pastikan focus berpindah ke field pertama yang salah.
- Kirim input valid; lihat loading lalu pesan local-only, bukan klaim mailing list.
- Klik Hapus data lokal; periksa record `armora-interest` hilang.
- Simulasikan storage diblokir/penuh dan endpoint offline untuk memeriksa error UI.
- Aktifkan reduced motion dan navigasi seluruh halaman tanpa mouse.
- Jika mengganti domain atau menjadikan Site publik, periksa social preview pada akses yang dituju.

## Keputusan implementasi

- Static Vite SPA tanpa framework server karena seluruh kebutuhan tahap pertama bersifat client-side.
- Native anchor untuk section; modal aksesibel untuk detail, bukan route palsu.
- Caption visual konsep, label Concept Scent, serta status development ditampilkan secara konsisten.
- Warna dan skala design system berada di `tokens.css`; asset mapping dan data terpisah dari layout.
- Bahasa disimpan sebagai preferensi lokal. Minat pengunjung juga eksplisit lokal, sampai endpoint dihubungkan.
- Tidak ada harga, social proof, klaim performa parfum, atau tanggal rilis yang tidak tersedia dari brief.
