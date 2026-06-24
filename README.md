<div align="center">

<!-- HEADER LOGO ANIMASI -->
<img src="https://capsule-render.vercel.app/render?type=waving&color=auto&height=220&section=header&text=🚀%20Info%20Lintas&subtitle=Portal%20Berita%20Otomatis%20%7C%20Next.js%20%26%20Mongoose&fontSize=40&fontAlignY=40&animation=fadeIn" width="100%" />

<!-- BADGES UTAMA -->
<p>
  <img src="https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Render-Force_Dynamic-red?style=for-the-badge" alt="Dynamic" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge" alt="Status" />
</p>

---

<p align="center">
  <b>Info Lintas</b> adalah aplikasi web portal berita multi-kategori berperforma tinggi yang dibangun di atas framework <b>Next.js (App Router)</b>. Aplikasi ini memanfaatkan arsitektur <i>Server Components</i> untuk kecepatan pemuatan halaman maksimal, penanganan database dinamis lewat <b>Mongoose</b>, serta komponen slider interaktif otomatis tanpa mengorbankan performa SEO.
</p>

</div>

---

## 📸 Preview Tampilan Aplikasi

Berikut adalah galeri screenshot antarmuka dari aplikasi **Info Lintas** yang diambil langsung dari sistem:

<div align="center">

### 🖥️ Beranda / Halaman Utama
<img src="./assets/preview-home.png" alt="Preview Home 1" width="85%" style="border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 10px;" />
<img src="./assets/preview-home2.png" alt="Preview Home 2" width="85%" style="border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;" />

### 📰 Halaman Kategori Politik & Halaman Tentang Kami
<table width="100%">
  <tr>
    <td width="50%" align="center">
      <img src="./assets/preview-politik.png" alt="Preview Politik" width="100%" style="border-radius: 8px; border: 1px solid #e2e8f0;" />
      <br /><i>Kategori Berita Politik</i>
    </td>
    <td width="50%" align="center">
      <img src="./assets/preview-tentang.png" alt="Preview Tentang" width="100%" style="border-radius: 8px; border: 1px solid #e2e8f0;" />
      <br /><i>Halaman Profil / Tentang Kami</i>
    </td>
  </tr>
</table>

</div>

---

## ✨ Fitur Unggulan Sistem

- ⚡ **Hybrid Dynamic Rendering (`force-dynamic`):** Menjamin berita yang disajikan selalu segar dan ditarik langsung dari MongoDB pada setiap request tanpa tertahan cache statis.
- 🔍 **Pencarian Cerdas Multi-Kategori:** Fitur pencarian berbasis ekspresi reguler (*Regex Case-Insensitive*) yang memindai kecocokan kata kunci pada judul sekaligus ringkasan artikel secara simultan.
- 🛠️ **Safe Compilation Architecture:** Helper model tersentralisasi guna mencegah terjadinya `MissingSchemaError` akibat siklus kompilasi ulang otomatis oleh Next.js Turbopack saat *hot-reload*.
- 📑 **State Pagination Terisolasi:** Navigasi halaman yang dikelola per blok kategori melalui URL parameters (`?page_politik=2`), memastikan perpindahan halaman di satu kategori tidak merusak posisi layout kategori lainnya.
- 🎚️ **Slider Client-Side Infinite Scroll:** Komponen slider interaktif pada bagian bawah halaman yang berjalan otomatis secara horizontal dari kanan ke kiri.

---

## 🛠️ Tech Stack & Spesifikasi

| Komponen | Teknologi | Peran / Deskripsi |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Mengelola Server-Side Rendering (SSR) & Optimalisasi Core Web Vitals |
| **Database ORM** | Mongoose / MongoDB | Mengatur skema berita, pencarian regex, dan sorting kronologis |
| **Styling** | Tailwind CSS | Layouting grid modern, utilitas tipografi, dan fleksibilitas responsif |
| **State Handling** | Native URL Params | Manajemen perpindahan halaman tanpa memicu re-render aplikasi total |

---

## 🏗️ Struktur Pembuatan Proyek (Step-by-Step)

### 1. Inisialisasi Environment & Install Mongoose
```bash
npx create-next-app@latest info-lintas --js --tailwind --app --src-dir=false
cd info-lintas
npm install mongoose

theme: {
  extend: {
    animation: {
      marquee: 'marquee 30s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      }
    }
  },
}

'use client';
import React from 'react';

export default function SliderBawahClient({ beritaBawah }) {
  return (
    <div className="w-full overflow-hidden bg-gray-50 py-4 border-t border-b border-gray-200 relative group">
      <div className="flex gap-6 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...beritaBawah, ...beritaBawah].map((item, idx) => (
          <a key={idx} href={`/berita/${item._id}`} className="w-64 flex-shrink-0 bg-white p-3 rounded-lg border border-gray-200 shadow-sm block hover:border-red-500 transition-colors">
            <div className="w-full h-32 bg-gray-200 rounded overflow-hidden">
              <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xs font-bold mt-2 text-gray-950 line-clamp-2 hover:text-red-600 transition-colors">{item.judul}</h4>
          </a>
        ))}
      </div>
    </div>
  );
}

git clone [https://github.com/rizalfirmansyah120593-byte/WEB-BERITA-OTOMATIS-UPDATE-INFO-LINTAS-AI.git](https://github.com/rizalfirmansyah120593-byte/WEB-BERITA-OTOMATIS-UPDATE-INFO-LINTAS-AI.git)

   cd web-berita-otomatis
   npm install

Jalankan MongoDB Lokal:
Pastikan port default database Anda aktif pada string koneksi: mongodb://localhost:27017/berita_db

Jalankan Aplikasi:
npm run dev

Buka http://localhost:3000 di peramban Anda.

   💖 Dukung Pengembangan Proyek
Jika arsitektur kode atau proyek ini bermanfaat bagi proses belajar Anda, berikan dukungan terbaik Anda dengan mentraktir secangkir kopi melalui tautan Saweria di bawah ini: