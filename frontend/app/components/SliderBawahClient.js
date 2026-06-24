// frontend/app/components/SliderBawahClient.js
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import CSS bawaan Swiper
import 'swiper/css';

export default function SliderBawahClient({ beritaBawah }) {
  return (
    <div className="border-t border-gray-100 pt-5 w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16} // Jarak gap-4 sesuai gaya Tailwind asli kamu
        slidesPerView={1}  // Tampilan mobile default 1 kolom
        loop={true}        // Terus berjalan memutar (infinite loop)
        autoplay={{
          delay: 3000,                  // Bergeser otomatis setiap 3 detik
          disableOnInteraction: false,  // Tidak berhenti meluncur meski disentuh user
        }}
        breakpoints={{
          // Ketika lebar layar laptop / desktop (sama seperti sm:grid-cols-3)
          640: {
            slidesPerView: 3, // Menampilkan 3 judul artikel sekaligus bersamaan
          }
        }}
        className="w-full"
      >
        {beritaBawah.map((berita) => (
          <SwiperSlide key={berita._id}>
            <a 
              href={`/berita/${berita._id}`}
              className="group flex flex-col bg-gray-50/30 p-2 rounded-lg border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all h-full"
            >
              <div className="w-full h-32 bg-gray-200 rounded-md overflow-hidden mb-2">
                <img 
                  src={berita.gambar} 
                  alt={berita.judul} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <h5 className="text-xs font-bold text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                {berita.judul}
              </h5>
              <span className="text-[9px] font-bold text-gray-400 uppercase mt-auto">
                {new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}