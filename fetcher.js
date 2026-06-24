const RSSParser = require('rss-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');

const parser = new RSSParser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure']
    ]
  }
});

mongoose.connect('mongodb://localhost:27017/berita_db')
  .then(() => console.log('🚀 Robot Scraper Berita Lengkap Aktif!'))
  .catch(err => console.error('Database Error:', err));

const BeritaSchema = new mongoose.Schema({
  judul: { type: String, unique: true },
  linkAsli: String,
  ringkasan: String,
  isiLengkap: String, // Tempat menampung teks utuh hasil scraping
  gambar: String,
  tanggal: Date,
  sumber: String,
  kategori: String
});

const Berita = mongoose.model('Berita', BeritaSchema);

const DAFTAR_FEED = [
  { kategori: 'politik', url: 'https://www.antaranews.com/rss/politik.xml' },
  { kategori: 'hukum', url: 'https://www.antaranews.com/rss/hukum.xml' },
  { kategori: 'ekonomi', url: 'https://www.antaranews.com/rss/ekonomi.xml' },
  { kategori: 'metro', url: 'https://www.antaranews.com/rss/metro.xml' },
  { kategori: 'sepakbola', url: 'https://www.antaranews.com/rss/sepakbola.xml' },
  { kategori: 'teknologi', url: 'https://www.antaranews.com/rss/tekno.xml' },
  { kategori: 'humaniora', url: 'https://www.antaranews.com/rss/humaniora.xml' }
];

// FUNGSI PINTAR: Mengambil teks berita utuh langsung dari HTML Antara News
async function ambilTeksLengkap(url) {
  try {
    // Download HTML halaman asli dengan timeout agar tidak menggantung jika server lambat
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 10000 
    });
    
    const $ = cheerio.load(data);
    let kumpulanParagraf = [];

    // Kumpulan Selector HTML yang sering digunakan Antara News untuk membungkus teks artikel utama
    const selectorAntara = [
      '.post-content p', 
      '.text-inner p', 
      'article .entry-content p', 
      '.detail-text p',
      '.content_detail p'
    ];

    // Coba satu per satu selector sampai ada yang berhasil mengambil teks
    for (const selector of selectorAntara) {
      $(selector).each((index, element) => {
        const teks = $(element).text().trim();
        
        // Filter agar kata-kata sampah, iklan, atau link internal "Baca juga" tidak ikut masuk
        if (teks && 
      !teks.toLowerCase().includes('baca juga:') && 
      !teks.toLowerCase().includes('pilihan editor:') &&
      !teks.toLowerCase().includes('adsbygoogle') &&
      !teks.toLowerCase().includes('pewarta:') &&       // 🌟 Membuang baris nama Pewarta
      !teks.toLowerCase().includes('editor:') &&        // 🌟 Membuang baris nama Editor
      !teks.toLowerCase().includes('copyright ©') &&    // 🌟 Membuang baris teks Copyright
      !teks.toLowerCase().includes('dilarang keras') && // 🌟 Membuang baris teks Warning Crawling AI
      teks.length > 10) { 
    kumpulanParagraf.push(teks);
  }
});

      // Jika selector ini berhasil mendapatkan teks, hentikan pencarian selector lain
      if (kumpulanParagraf.length > 0) {
        break;
      }
    }

    const hasilAkhir = kumpulanParagraf.join('\n\n');
    console.log(`📊 Debug Scraper: Berhasil mengambil ${hasilAkhir.length} karakter teks dari web asli.`);
    return hasilAkhir.length > 0 ? hasilAkhir : null;

  } catch (error) {
    console.log(`⚠️ Gagal scrape konten penuh dari: ${url} (Error: ${error.message})`);
    return null;
  }
}

async function scanSatuFeed(feedInfo) {
  try {
    const feed = await parser.parseURL(feedInfo.url);
    let suksesSimpan = 0;

    for (const item of feed.items) {
      try {
        let urlGambar = '';
        if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
          urlGambar = item.mediaContent.$.url;
        } else if (item.enclosure && item.enclosure.url) {
          urlGambar = item.enclosure.url;
        } else {
          urlGambar = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800';
        }

        // Cek dulu apakah berita ini sudah ada di database atau belum
        const sudahAda = await Berita.findOne({ judul: item.title });
        if (sudahAda) continue;

        // JALANKAN SCRAPER: Ambil teks lengkap dari website aslinya langsung
        console.log(`🔍 Membaca konten penuh untuk: ${item.title}`);
        const beritaUtuh = await ambilTeksLengkap(item.link);

        await Berita.create({
          judul: item.title,
          linkAsli: item.link,
          ringkasan: item.contentSnippet || '',
          isiLengkap: beritaUtuh || item.contentSnippet || '', // Jika gagal scrape, pakai cuplikan RSS
          gambar: urlGambar,
          tanggal: new Date(item.pubDate || Date.now()),
          sumber: 'ANTARA News',
          kategori: feedInfo.kategori
        });
        suksesSimpan++;
        
        // Jeda 1 detik per artikel agar server Antara tidak memblokir IP komputer Anda
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        continue;
      }
    }
    if (suksesSimpan > 0) {
      console.log(`🔹 [${feedInfo.kategori.toUpperCase()}] Berhasil mengunduh +${suksesSimpan} berita teks lengkap.`);
    }
  } catch (err) {
    console.error(`❌ Gagal mengambil feed kategori ${feedInfo.kategori}`);
  }
}

async function ambilSemuaBeritaBersamaan() {
  console.log(`\n======================================================`);
  console.log(`⏳ Memulai Sinkronisasi Teks Lengkap Massal...`);
  console.log(`======================================================`);
  
  await Promise.all(DAFTAR_FEED.map(feed => scanSatuFeed(feed)));
  
  console.log(`✨ Sukses! Semua berita baru tersimpan utuh.`);
}

cron.schedule('*/20 * * * *', () => {
  ambilSemuaBeritaBersamaan();
});

ambilSemuaBeritaBersamaan();