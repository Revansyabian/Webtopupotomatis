// Ini adalah pekerja layanan dengan pengalaman offline gabungan (Halaman offline + Salinan halaman offline)

const CACHE = "halaman-offline-pwabuilder";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// TODO: ganti yang berikut dengan halaman fallback offline yang benar, misalnya: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "Yang Harus Dilakukan-ganti-nama-ini.html";

self.addEventListener("pesan", (peristiwa) => {
  jika (data.peristiwa dan jenis.data.peristiwa === "LEWATI_MENUNGGU") {
    sendiri.lewatiMenunggu();
  }
});

self.addEventListener('instal', async (peristiwa) => {
  acara.tunggusampai(
    cache.buka(CACHE)
      .lalu((cache) => cache.tambahkan(offlineFallbackPage))
  );
});

jika (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.aktifkan();
}

kotak kerja.perutean.daftarRute(
  new RegExp('/*'),
  kotak kerja baru.strategi.StaleWhileRevalidate({
    nama cache: CACHE
  })
);

self.addEventListener('fetch', (peristiwa) => {
  jika (event.request.mode === 'navigate') {
    acara.respondDengan((async () => {
      mencoba {
        const preloadResp = tunggu event.preloadResponse;

        jika (preloadResp) {
          kembalikan preloadResp;
        }

        const networkResp = tunggu pengambilan(permintaan.acara);
        kembalikan networkResp;
      } tangkap (kesalahan) {

        const cache = tunggu cache.buka(CACHE);
        const cachedResp = tunggu cache.match(offlineFallbackPage);
        kembalikan cachedResp;
      }
    })());
  }
});