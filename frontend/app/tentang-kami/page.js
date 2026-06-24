// frontend/app/tentang-kami/page.js
import Header from '../components/Header';

export const metadata = {
  title: 'Tentang Kami - Info Lintas',
  description: 'Mengenal lebih dekat dengan Info Lintas, portal berita digital modern terpercaya.',
};

export default function TentangKami() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans flex flex-col justify-between">
      <div>
        {/* Tetap menampilkan header utama */}
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-gray-200/80 shadow-sm space-y-8">
            
            <div className="border-b-4 border-red-600 pb-4">
              <h1 className="text-3xl font-black text-gray-950 tracking-tight">TENTANG KAMI</h1>
              <p className="text-sm text-red-600 font-bold uppercase tracking-wider mt-1">Info Lintas — Aktual, Tajam, & Terintegrasi</p>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                Selamat datang di <strong>Info Lintas</strong>, platform agregator berita digital generasi baru yang didesain untuk memberikan informasi tercepat, akurat, dan terpercaya langsung ke perangkat Anda. 
              </p>
              <p>
                Di era di mana informasi bergerak dalam hitungan detik, kami memahami pentingnya keabsahan sebuah berita. Oleh karena itu, Info Lintas hadir dengan sistem <strong>Live Auto-Sync</strong> pintar yang mengumpulkan, mengorganisasi, dan menyajikan berita-berita utama dari berbagai sektor krusial seperti Politik, Hukum, Ekonomi, Metro, Sepakbola, hingga Teknologi secara *real-time*.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h3 className="font-black text-gray-950 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> Visi Kami
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Menjadi Info atau pusat jaringan informasi digital utama yang mempertemukan pembaca dengan berita yang kredibel, objektif, dan mencerahkan kehidupan berbangsa.
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h3 className="font-black text-gray-950 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span> Misi Kami
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Menyajikan berita dengan tata letak yang bersih, akses pencarian yang instan, serta mengutamakan kenyamanan membaca tanpa distorsi informasi yang membingungkan.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 text-center text-xs text-gray-400 font-medium">
              Info Lintas Group © 2026. Semua Hak Dilindungi Undang-Undang.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}