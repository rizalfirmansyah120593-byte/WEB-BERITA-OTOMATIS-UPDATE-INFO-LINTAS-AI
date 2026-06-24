<div align="center">

<img src="[https://capsule-render.vercel.app/render?type=waving&color=auto&height=220&section=header&text=](https://capsule-render.vercel.app/render?type=waving&color=auto&height=220&section=header&text=)🚀%20Info%20Lintas&subtitle=Portal%20Berita%20Otomatis%20%7C%20Next.js%20%26%20Mongoose&fontSize=40&fontAlignY=40&animation=fadeIn" width="100%" />

<p>
  <img src="[https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=nextdotjs&logoColor=white](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=nextdotjs&logoColor=white)" alt="Next.js" />
  <img src="[https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)" alt="MongoDB" />
  <img src="[https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)" alt="Tailwind" />
  <img src="[https://img.shields.io/badge/Render-Force_Dynamic-red?style=for-the-badge](https://img.shields.io/badge/Render-Force_Dynamic-red?style=for-the-badge)" alt="Dynamic" />
  <img src="[https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)" alt="Status" />
</p>

---

<p align="center">
  <b>Info Lintas</b> adalah aplikasi web portal berita multi-kategori berperforma tinggi yang dibangun di atas framework <b>Next.js (App Router)</b>. Aplikasi ini memanfaatkan arsitektur <i>Server Components</i> untuk kecepatan pemuatan halaman maksimal, penanganan database dinamis lewat <b>Mongoose</b>, serta komponen slider interaktif otomatis berbasis Tailwind v4 tanpa mengorbankan performa SEO.
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
| **Styling** | Tailwind CSS v4.0 | Utilitas konfigurasi berbasis `@theme` CSS langsung tanpa berkas config JS |
| **State Handling** | Native URL Params | Manajemen perpindahan halaman tanpa memicu re-render aplikasi total |

---

## 🏗️ Struktur Pembuatan Proyek (Step-by-Step)

Jika Anda ingin membangun atau merekonstruksi ulang proyek ini dari nol, ikuti langkah-langkah teknis berikut yang sudah dipisah per berkas:

### 1. Inisialisasi Environment & Install Mongoose
Jalankan perintah ini di terminal Anda untuk membuat kerangka dasar proyek Next.js baru dan memasang library Mongoose:

```bash
npx create-next-app@latest info-lintas --js --tailwind --app --src-dir=false
cd info-lintas
npm install mongoose

## ⭐ Support

If you enjoy this project and want to support the development, you can scan the QR code below:

<img src="./public/qrcode.png" alt="Donasi via Saweria" width="200" />

Atau klik link ini: [**Donasi via Saweria**](https://saweria.co/RizalFirmansyah)

---
