# Mindora Borobob - Frontend

Repository ini berisi bagian frontend aplikasi **Mindora Borobob** yang dibuat
menggunakan React dan Vite.

## Persiapan

Pastikan sudah terpasang:

- Node.js versi 18 atau lebih baru
- npm
- Git

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan di terminal, biasanya:

```text
http://localhost:5173
```

## Perintah yang Tersedia

```bash
npm run dev       # Menjalankan server development
npm run build     # Membuat build untuk production
npm run preview   # Melihat hasil build secara lokal
npm run lint      # Memeriksa masalah pada kode
```

## Struktur Folder

```text
src/
├── assets/                 # Gambar, ikon, dan font
├── components/
│   ├── common/             # Komponen UI yang dapat digunakan ulang
│   └── layout/             # Header, sidebar, dan footer
├── features/
│   ├── auth/               # Fitur autentikasi
│   ├── dashboard/          # Fitur dashboard dan materi
│   ├── diagnostic/         # Fitur kuis diagnostik
│   └── profile/            # Fitur profil pengguna
├── pages/                  # Komponen halaman utama
├── routes/                 # Pengaturan routing
├── services/               # Konfigurasi API
└── store/                  # State management global
```



## Catatan

- Jangan mengubah pekerjaan anggota lain tanpa berdiskusi terlebih dahulu.
- Komponen yang dipakai di beberapa halaman sebaiknya diletakkan di
  `src/components`.
- Kode yang khusus untuk satu fitur sebaiknya diletakkan di folder fitur
  terkait di dalam `src/features`.
