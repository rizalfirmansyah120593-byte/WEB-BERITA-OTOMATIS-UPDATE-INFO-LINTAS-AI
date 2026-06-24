// frontend/app/page.js
import mongoose from 'mongoose';
import SliderBawahClient from './components/SliderBawahClient'; 

export const dynamic = 'force-dynamic';

// 🌟 STRATEGI AMAN: Definisikan Schema Berita di luar agar bisa dipakai bersama
const BeritaSchema = new mongoose.Schema({
  judul: String,
  ringkasan: String,
  gambar: String,
  tanggal: Date,
  kategori: String,
  sumber: String
});

// Fungsi inisialisasi model yang aman untuk Next.js (Server Components)
  const dapatkanModelBerita = () => {
  return mongoose.models.Berita || mongoose.model('Berita', BeritaSchema);
};

// 🌟 FUNGSI AMBIL DATA DENGAN FITUR SEARCH & KATEGORI
async function ambilBeritaPerKategori(kategoriKey, kataKunci = '', page = 1, limit = 7) {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/berita_db');
  }

  // Memanggil fungsi inisialisasi model yang aman
  const Berita = dapatkanModelBerita();

  const skip = (page - 1) * limit;
  let filter = {};
  
  if (kategoriKey) {
    filter.kategori = { $regex: new RegExp(`^${kategoriKey}$`, 'i') };
  }
  
  if (kataKunci) {
    filter.$or = [
      { judul: { $regex: new RegExp(kataKunci, 'i') } },
      { ringkasan: { $regex: new RegExp(kataKunci, 'i') } }
    ];
  }

  const [data, totalData] = await Promise.all([
    Berita.find(filter).sort({ tanggal: -1 }).skip(skip).limit(limit).lean(),
    Berita.countDocuments(filter)
  ]);

  return {
    data,
    totalHalaman: Math.ceil(totalData / limit) || 1,
    halamanSekarang: page
  };
}

// 🌟 FUNGSI HEADLINE (SEKARANG SUDAH AMAN DARI MISSINGSCHEMAERROR)
async function ambilBeritaHeadline() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/berita_db');
  }
  
  // FIX: Menggunakan fungsi inisialisasi model yang sama agar schema-nya terdaftar
  const Berita = dapatkanModelBerita();
  
  return await Berita.find({}).sort({ tanggal: -1 }).limit(2).lean();
}

// ... Sisa kode komponen HalamanUtama ke bawah tetap sama 100% tanpa perubahan

export default async function HalamanUtama({ searchParams }) {
  const params = await searchParams;
  const kategoriAktif = params.kategori || '';
  const kataKunciSearch = params.q || ''; // 🌟 Menangkap parameter '?q=...' dari url search bar

  const headlineBerita = await ambilBeritaHeadline();
  const headlineAtas = headlineBerita[0] || null;
  const headlineTengah = headlineBerita[1] || null;

  const semuaKategori = [
    { id: 'terkini', nama: 'Terbaru & Terkini', key: '' },
    { id: 'politik', nama: 'Politik', key: 'politik' },
    { id: 'hukum', nama: 'Hukum', key: 'hukum' },
    { id: 'ekonomi', nama: 'Ekonomi', key: 'ekonomi' },
    { id: 'metro', nama: 'Metro', key: 'metro' },
    { id: 'sepakbola', nama: 'Sepakbola', key: 'sepakbola' },
    { id: 'teknologi', nama: 'Teknologi', key: 'teknologi' },
    { id: 'humaniora', nama: 'Humaniora', key: 'humaniora' },
  ];

  // Jika user sedang mencari (search aktif), langsung fokuskan layout ke semua kategori yang relevan dengan keyword
  const daftarBlokKategori = kategoriAktif 
    ? semuaKategori.filter(k => k.id === kategoriAktif)
    : semuaKategori;

  // 🌟 PERBAIKAN STRUKTUR MAP & FETCH DATA PER BLOK KATEGORI
  const isiBlokKonten = await Promise.all(
    (daftarBlokKategori || []).map(async (kat) => {
      const pageKhusus = parseInt(params[`page_${kat.id}`]) || 1;
      
      // Memasukkan kataKunciSearch ke dalam fungsi fetch data
      const hasil = await ambilBeritaPerKategori(kat.key, kataKunciSearch, pageKhusus, 7);
      
      return {
        ...kat,
        berita: hasil.data,
        totalHalaman: hasil.totalHalaman,
        halamanSekarang: hasil.halamanSekarang
      };
    })
  );

  // Memeriksa apakah ada hasil berita dari seluruh blok kategori
  const apakahAdaBeritaDitemukan = isiBlokKonten.some(blok => blok.berita.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans flex flex-col justify-between">
      
      <div>
        {/* HEADER NAVBAR */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* BARIS UTAMA HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:h-20 sm:py-0">
              <a href="/" className="text-2xl font-black tracking-tight text-gray-950 flex items-center flex-shrink-0">
                <span>Info</span><span className="text-red-600">Lintas</span>
              </a>
              
              {/* 🌟 FITUR SEARCH BAR BARU */}
              <form action="/" method="GET" className="w-full sm:max-w-md flex items-center relative">
                {kategoriAktif && <input type="hidden" name="kategori" value={kategoriAktif} />}
                
                <input 
                  type="text" 
                  name="q"
                  defaultValue={kataKunciSearch}
                  placeholder={kategoriAktif ? `Cari berita di kategori ${kategoriAktif}...` : "Cari berita hangat hari ini..."}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-red-500 font-medium transition-all"
                />
                <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                  🔍
                </div>
                {kataKunciSearch && (
                  <a href={kategoriAktif ? `/?kategori=${kategoriAktif}` : '/'} className="absolute right-3 text-xs font-bold text-gray-400 hover:text-red-500">
                    ✕
                  </a>
                )}
              </form>

              <div className="hidden md:flex items-center gap-2 bg-gray-100 text-[10px] font-black uppercase text-gray-500 px-3 py-1.5 rounded-full flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Auto-Sync
              </div>
            </div>
            
            {/* MENU NAVIGASI KATEGORI */}
            <div className="flex gap-6 overflow-x-auto pb-3 text-xs font-black uppercase tracking-wider text-gray-600 border-t border-gray-50 pt-3 scrollbar-none">
              {semuaKategori.map((menu) => {
                const isActive = kategoriAktif === menu.id || (menu.id === 'terkini' && !kategoriAktif);
                const queryUrl = new URLSearchParams();
                if (menu.id !== 'terkini') queryUrl.set('kategori', menu.id);
                if (kataKunciSearch) queryUrl.set('q', kataKunciSearch);
                const linkTujuan = queryUrl.toString() ? `/?${queryUrl.toString()}` : '/';

                return (
                  <a 
                    key={menu.id} 
                    href={linkTujuan} 
                    className={`pb-1 transition-colors whitespace-nowrap ${isActive ? 'text-red-600 border-b-2 border-red-600 font-black' : 'hover:text-red-600'}`}
                  >
                    {menu.id === 'terkini' ? 'Home' : menu.nama}
                  </a>
                );
              })}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          
          {/* TAMPILAN STATUS JIKA SEDANG MENCARI SESUATU */}
          {kataKunciSearch && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm font-semibold text-red-900 flex justify-between items-center">
              <span>
                Menampilkan hasil pencarian untuk kata kunci: <strong className="underline font-black">"{kataKunciSearch}"</strong>
                {kategoriAktif && <span> di kategori <span className="uppercase">{kategoriAktif}</span></span>}
              </span>
              <a href={kategoriAktif ? `/?kategori=${kategoriAktif}` : '/'} className="text-xs bg-red-600 text-white font-bold px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors">
                Reset Pencarian
              </a>
            </div>
          )}

          {/* HEADLINE JUMBO GLOBAL ATAS */}
          {!kataKunciSearch && !kategoriAktif && headlineAtas && (
            <a 
              href={`/berita/${headlineAtas._id.toString()}`}
              className="group flex flex-col lg:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all mb-4"
            >
              <div className="w-full lg:w-3/5 h-64 sm:h-96 bg-gray-100 overflow-hidden relative">
                <img src={headlineAtas.gambar} alt={headlineAtas.judul} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-red-600 text-xs font-black uppercase text-white px-3 py-1 rounded shadow-md">🔥 POPULER</span>
              </div>
              <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-2">{headlineAtas.kategori}</span>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-gray-950 leading-tight group-hover:text-red-600 transition-colors mb-4 line-clamp-4">{headlineAtas.judul}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{headlineAtas.ringkasan}</p>
                </div>
                <div className="text-xs font-bold text-gray-400 border-t border-gray-100 pt-4 mt-6 flex justify-between">
                  <span>{headlineAtas.sumber}</span>
                  <span>{new Date(headlineAtas.tanggal).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                </div>
              </div>
            </a>
          )}

          {/* JIKA BERITA SAMA SEKALI TIDAK DITEMUKAN */}
          {!apakahAdaBeritaDitemukan && (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-xl mx-auto space-y-4">
              <span className="text-5xl block">📭</span>
              <h3 className="text-lg font-black text-gray-950">Berita Tidak Ditemukan</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Maaf, kata kunci <strong className="text-gray-800">"{kataKunciSearch}"</strong> tidak cocok dengan artikel apa pun di database kami. Coba cari kata kunci lainnya.
              </p>
            </div>
          )}

          {/* LOOP LIST KATEGORI */}
          {isiBlokKonten.map((blok, index) => {
            if (blok.berita.length === 0) return null;

            const artikelTerbaruBesar = blok.berita[0];
            const listArtikelKecil = blok.berita.slice(1, 4);
            const gridArtikelBawah = blok.berita.slice(4, 7);

            // SERIALISASI KILAT DATA MONGOOSE (_id & tanggal) AGAR BISA DIKIRIM KE CLIENT SLIDER SECARA AMAN
            const gridArtikelBawahSerial = gridArtikelBawah.map(item => ({
              _id: item._id.toString(),
              judul: item.judul,
              gambar: item.gambar,
              tanggal: item.tanggal instanceof Date ? item.tanggal.toISOString() : item.tanggal,
              kategori: item.kategori,
              sumber: item.sumber,
              ringkasan: item.ringkasan
            }));

            return (
              <div key={blok.id} className="space-y-6">
                <section id={`section_${blok.id}`} className="scroll-mt-24 bg-white p-6 rounded-xl border border-gray-200/70 shadow-sm">
                  
                  {/* HEADLINE JUDUL KATEGORI */}
                  <div className="border-b-4 border-red-600 mb-6 pb-2 flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <span className="bg-red-600 w-2.5 h-6 block"></span>
                      <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-gray-950">{blok.nama}</h2>
                    </div>
                    
                    {/* NAVIGASI PAGINATION */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 mr-2">Hal {blok.halamanSekarang}/{blok.totalHalaman}</span>
                      <a
                        href={`?${new URLSearchParams({ ...params, [`page_${blok.id}`]: Math.max(1, blok.halamanSekarang - 1) }).toString()}#section_${blok.id}`}
                        className={`p-1.5 rounded border text-xs font-bold transition-all ${blok.halamanSekarang > 1 ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100' : 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                      >
                        ◀
                      </a>
                      <a
                        href={`?${new URLSearchParams({ ...params, [`page_${blok.id}`]: Math.min(blok.totalHalaman, blok.halamanSekarang + 1) }).toString()}#section_${blok.id}`}
                        className={`p-1.5 rounded border text-xs font-bold transition-all ${blok.halamanSekarang < blok.totalHalaman ? 'bg-gray-900 border-gray-950 text-white hover:bg-gray-800' : 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                      >
                        ▶
                      </a>
                    </div>
                  </div>

                  {/* LAPISAN BARIS ATAS: 1 BESAR + 3 LIST */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {artikelTerbaruBesar && (
                      <a 
                        href={`/berita/${artikelTerbaruBesar._id.toString()}`}
                        className="lg:col-span-1 group flex flex-col bg-gray-50 rounded-xl border border-gray-200/60 overflow-hidden justify-between p-3 transition-all hover:shadow-sm"
                      >
                        <div className="w-full h-48 sm:h-56 bg-gray-200 rounded-lg overflow-hidden relative">
                          <img src={artikelTerbaruBesar.gambar} alt={artikelTerbaruBesar.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <span className="absolute bottom-3 left-3 bg-red-600 text-[10px] font-black uppercase text-white px-2.5 py-1 rounded shadow-sm">UTAMA</span>
                        </div>
                        <div className="pt-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="text-base font-extrabold text-gray-950 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                              {artikelTerbaruBesar.judul}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                              {artikelTerbaruBesar.ringkasan}
                            </p>
                          </div>
                          <div className="text-[10px] font-bold text-gray-400 flex justify-between items-center border-t border-gray-200/60 pt-2.5">
                            <span className="uppercase text-red-600">{artikelTerbaruBesar.kategori || 'News'}</span>
                            <span>{new Date(artikelTerbaruBesar.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                          </div>
                        </div>
                      </a>
                    )}

                    <div className="lg:col-span-2 flex flex-col gap-3 justify-between">
                      {listArtikelKecil.map((berita) => (
                        <a 
                          key={berita._id.toString()}
                          href={`/berita/${berita._id.toString()}`}
                          className="group flex flex-row bg-gray-50/50 rounded-xl border border-gray-200/40 p-3 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all gap-4 h-[100px] sm:h-[105px]"
                        >
                          <div className="w-24 sm:w-36 h-full bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex flex-col justify-between flex-grow">
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                                {berita.judul}
                              </h4>
                              <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 hidden sm:block">{berita.ringkasan}</p>
                            </div>
                            <div className="text-[9px] font-bold text-gray-400 flex justify-between items-center border-t border-gray-100 pt-1">
                              <span className="uppercase text-gray-500">{berita.kategori || 'News'}</span>
                              <span>{new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* 🌟 LAPISAN BARIS BAWAH: Diubah Menjadi Komponen Slider Berjalan Otomatis Dari Kanan ke Kiri */}
                  {gridArtikelBawahSerial.length > 0 && (
                    <SliderBawahClient beritaBawah={gridArtikelBawahSerial} />
                  )}

                </section>

                {/* HEADLINE GLOBAL TENGAH */}
                {!kataKunciSearch && !kategoriAktif && index === 3 && headlineTengah && (
                  <a 
                    href={`/berita/${headlineTengah._id.toString()}`}
                    className="group flex flex-col lg:flex-row-reverse bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all my-12"
                  >
                    <div className="w-full lg:w-3/5 h-64 sm:h-80 bg-gray-100 overflow-hidden relative">
                      <img src={headlineTengah.gambar} alt={headlineTengah.judul} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" />
                      <span className="absolute top-4 right-4 bg-gray-900 text-xs font-black uppercase text-white px-3 py-1 rounded shadow-md">⭐ REKOMENDASI</span>
                    </div>
                    <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-2">{headlineTengah.kategori}</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 leading-tight group-hover:text-red-600 transition-colors mb-3 line-clamp-3">{headlineTengah.judul}</h2>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">{headlineTengah.ringkasan}</p>
                      </div>
                      <div className="text-xs font-bold text-gray-400 border-t border-gray-100 pt-4 mt-4 flex justify-between">
                        <span>{headlineTengah.sumber}</span>
                        <span>{new Date(headlineTengah.tanggal).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </main>
      </div>

      {/* FOOTER NAVBAR TERINTEGRASI */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-gray-950 font-black">Info<span className="text-red-600">Lintas</span></span>
              <span className="text-gray-300">|</span>
              <span className="font-medium text-gray-400 lowercase">© 2026 Info Lintas Group.</span>
            </div>
            <div className="flex gap-6">
              <a href="/tentang-kami" className="hover:text-red-600 transition-colors">Tentang Kami</a>
              <a href="/kontak" className="hover:text-red-600 transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}