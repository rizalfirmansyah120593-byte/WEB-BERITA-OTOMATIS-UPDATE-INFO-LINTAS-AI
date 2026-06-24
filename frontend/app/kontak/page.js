// frontend/app/kontak/page.js
import Header from '../components/Header';

export const metadata = {
  title: 'Kontak Kami - Info Lintas',
  description: 'Hubungi redaksi Info Lintas untuk keperluan kemitraan, iklan, atau laporan masalah teknis.',
};

export default function Kontak() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans flex flex-col justify-between">
      <div>
        {/* Tetap menampilkan header utama */}
        <Header />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* SISI KIRI: Informasi Kontak */}
            <div className="lg:col-span-1 bg-gray-950 text-white p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="text-2xl font-black tracking-tight mb-2">HUBUNGI KAMI</h2>
                <p className="text-xs text-gray-400 leading-relaxed mb-8">Ada pertanyaan, jalinan kemitraan, atau ingin memasang iklan? Tim kami siap melayani Anda 24/7.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg text-red-500 mt-1">
                      📬
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Redaksi</h4>
                      <p className="text-sm font-semibold text-white">redaksi@InfoLintas.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg text-red-500 mt-1">
                      🏢
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kantor Pusat</h4>
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        Cyber Tower, Lt. 12<br />
                        Kuningan, Jakarta Selatan,<br />
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-500 font-bold mt-12 pt-4 border-t border-white/5">
                InfoLintas SUPPORT SYSTEM
              </div>
            </div>

            {/* SISI KANAN: Form Kontak Interaktif */}
            <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm">
              <h3 className="text-lg font-black text-gray-950 uppercase tracking-tight mb-6 border-b-2 border-red-600 pb-2 inline-block">
                Kirim Pesan Langsung
              </h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama Anda" 
                      className="w-full bg-gray-50 text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat Email</label>
                    <input 
                      type="email" 
                      placeholder="nama@email.com" 
                      className="w-full bg-gray-50 text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subjek / Perihal</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Penawaran Kerja Sama Iklan" 
                    className="w-full bg-gray-50 text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Isi Pesan</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tuliskan detail pesan Anda di sini..." 
                    className="w-full bg-gray-50 text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-red-500 focus:outline-none transition-all font-medium"
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full sm:w-auto bg-gray-950 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}