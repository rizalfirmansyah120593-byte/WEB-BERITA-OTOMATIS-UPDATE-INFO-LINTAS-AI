// frontend/app/components/Header.js
export default function Header({ kategoriAktif = '', kataKunciCari = '' }) {
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-20 gap-4">
          
          {/* Logo */}
          <a href="/" className="text-2xl font-black tracking-tight text-gray-950 flex items-center shrink-0">
            <span>Info</span><span className="text-red-600">Lintas</span>
          </a>

          {/* FORM SEARCH BAR */}
          <form action="/" method="GET" className="w-full sm:max-w-md flex items-center relative">
            {kategoriAktif && <input type="hidden" name="kategori" value={kategoriAktif} />}
            <input
              type="text"
              name="q"
              defaultValue={kataKunciCari}
              placeholder="Cari berita hangat hari ini..."
              className="w-full bg-gray-100 text-sm pl-4 pr-10 py-2 rounded-lg border border-transparent focus:bg-white focus:border-red-500 focus:outline-none transition-all placeholder-gray-400 font-medium text-gray-800"
            />
            <button type="submit" className="absolute right-3 text-gray-400 hover:text-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </button>
          </form>

          {/* Live Badge */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 text-[10px] font-black uppercase text-gray-500 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Auto-Sync
          </div>
        </div>

        {/* LINK MENU UTAMA */}
        <div className="flex gap-6 overflow-x-auto pb-3 text-xs font-black uppercase tracking-wider text-gray-600 border-t border-gray-50 pt-3 scrollbar-none">
          {semuaKategori.map((menu) => {
            const isActive = kategoriAktif === menu.id;
            return (
              <a 
                key={menu.id} 
                href={menu.id === 'terkini' ? '/' : `/?kategori=${menu.id}`} 
                className={`pb-1 transition-colors whitespace-nowrap ${isActive ? 'text-red-600 border-b-2 border-red-600 font-black' : 'hover:text-red-600'}`}
              >
                {menu.id === 'terkini' ? 'Home' : menu.nama}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}