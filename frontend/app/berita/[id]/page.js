// app/berita/[id]/page.js

// Contoh fungsi simulasi fetch data dari API Antara
async function getDetailBerita(id) {
  // const res = await fetch(`https://api-kamu/berita/${id}`, { next: { revalidate: 1200 } }); // auto-sync 20 min
  // return res.json();
}

export default async function DetailBerita({ params }) {
  const { id } = params;
  // const berita = await getDetailBerita(id);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm my-6">
      {/* Tombol Kembali */}
      <span className="text-red-600 font-semibold text-sm cursor-pointer mb-4 block">
        &larr; Kembali ke Beranda
      </span>

      {/* Tag Kategori */}
      <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded uppercase">
        METRO
      </span>

      {/* Judul Berita */}
      <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
        Mengenal nitrous oxide, gas tertawa yang perlu diwaspadai
      </h1>

      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-6">
        <span>Sumber: <strong>ANTARA News</strong></span> &bull; <span>4 Februari 2026</span>
      </div>

      {/* Gambar Artikel */}
      <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Gunakan komponen <Image /> dari next/image untuk optimasi produk */}
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/path-ke-gambar.jpg')" }} />
      </div>

      {/* Isi Artikel */}
      <article className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
        <p>Langkah awal untuk diterima Perguruan Tinggi Negeri...</p>
      </article>

      {/* Tombol Aksi Sumber Asli */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <a 
          href="https://antaranews.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-slate-900 text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-slate-800 transition-colors"
        >
          Baca Artikel Asli di Antara News &nearr;
        </a>
      </div>
    </div>
  );
}