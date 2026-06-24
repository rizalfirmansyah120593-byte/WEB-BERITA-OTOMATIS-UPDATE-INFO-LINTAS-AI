// app/layout.js
import "./globals.css";
import Script from "next/script";
// Impor Navbar & Footer jika kamu membuatnya sebagai komponen terpisah
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

export const metadata = {
  title: "InfoLintas - Auto Berita",
  description: "Portal berita sinkronisasi otomatis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Navigasi Utama (Hanya dipanggil sekali di sini) */}
        {/* <Navbar /> */}

        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer Utama (Hanya dipanggil sekali di sini) */}
        {/* <Footer /> */}

        {/* Integrasi Script Iklan / Analytics secara aman */}
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
             Grimm: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }}
        />
      </body>
    </html>
  );
}