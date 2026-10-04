# Emirali Uzun — Portfolio

İngilizce ve Türkçe, Vercel'e hazır kişisel portfolyo. React + TypeScript + Vite.

[Ana sayfa önizlemesi](preview/hero.jpg) · [İletişim önizlemesi](preview/contact.jpg)

## Hızlı kurulum

Node.js 22.12+ kullanın. Proje klasöründe:

```bash
npm ci
npm run dev
```

Üretim derlemesi:

```bash
npm run build
npm run preview
```

`npm run build`, TypeScript kontrolünü çalıştırır ve `dist/` klasörünü oluşturur. `dist/index.html` dosyasını çift tıklamak yerine bir HTTP sunucusu kullanın.

## Vercel'de yayınlama

1. ZIP'i açın. `emirali-portfolio` klasörünün içeriğini bir GitHub deposuna yükleyin.
2. Vercel'de **Add New → Project** üzerinden bu depoyu içe aktarın.
3. **Root Directory**, `package.json` dosyasının bulunduğu klasör olmalı.
4. Ayarları kontrol edip **Deploy** seçin:

| Ayar | Değer |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Environment Variables | Gerekmiyor |

`vercel.json` framework, derleme, çıktı ve temel güvenlik başlıklarını içerir. Vercel, bağlı depoya gönderilen güncellemeleri yeniden derleyebilir.

GitHub'a yüklemeden, kendi bilgisayarınızda proje klasöründen Vercel CLI ile de yayınlayabilirsiniz:

```bash
npx vercel
# Önizlemeyi kontrol ettikten sonra:
npx vercel --prod
```

Resmî yönergeler: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) · [Vercel CLI](https://vercel.com/docs/cli/deploy).

## İçerik

- İngilizce varsayılan dil; üstteki EN/TR düğmeleri gezinme, açıklamalar, proje detayları, etkinlikler ve iletişim metinlerini değiştirir. Dil tercihi tarayıcıda saklanır. Türkçe bağlantı için `?lang=tr`, İngilizceyi zorlamak için `?lang=en` kullanılabilir.
- CV'den 11 proje; ilk üçü görsel vaka kartları, diğerleri filtrelenebilir temel çalışmalar olarak sunulur.
- GitHub'daki 34 herkese açık depo, 3 Ekim 2026 tarihli bir kopyayla listelenir. Arama, programlama dili filtresi ve özgün/fork etiketleri bulunur.
- NASA Space Apps, TEKNOFEST Mavi Vatan ve 42 Türkiye × Sui için toplam 6 fotoğraf; büyütülebilir galeriler.
- NASA: 2025 Brand & Marketing Director; 2026 Top Performer / Local Lead. Sui: Best Community Impact. TEKNOFEST: AUV ileri düzey takım finalistliği.
- E-posta: `eauzun@proton.me`; telefon: `+90 552 289 24 01`. Bağlantılar `mailto:` ve `tel:` kullanır.
- Özgün parçacık animasyonu, hareketi durdurma kontrolü, azaltılmış hareket tercihi, klavye destekli sekmeler ve diyaloglar.
- Yazı tipleri ve fotoğraflar yerel dosyalardır; font CDN'i, analitik, API anahtarı veya veritabanı gerektirmez.

## Düzenleme

| Dosya | İçerik |
| --- | --- |
| `src/data/content.ts` | EN/TR metinler, projeler, etkinlikler ve yetkinlikler |
| `src/data/github.json` | GitHub depo dizini |
| `src/App.tsx` | Bölümler, iletişim bilgileri ve etkileşimler |
| `src/styles.css` | Renkler, tipografi, yerleşim ve mobil kurallar |
| `src/components/ParticleField.tsx` | Etkileşimli ana sayfa grafiği |
| `public/images/` | WebP etkinlik fotoğrafları |
| `public/Emirali-Uzun-CV.pdf` | Gönderilen özgün CV |
| `index.html` | Sayfa başlığı, metadata ve kişi bilgisi |

İletişim bilgilerini değiştirirken `src/App.tsx` ve `index.html` içindeki değerleri birlikte güncelleyin.

CV dosyası değiştirilmeden eklenmiştir. Sitedeki etkinlik metinlerinde konuşmada paylaşılan son bilgiler esas alınmıştır. CV'yi yenilemek için aynı dosya adıyla yeni PDF koyabilirsiniz.

Fotoğraflar gönderilen dosyalardan optimize edilmiştir. Sony RAW dosyası için dosyanın gömülü JPEG önizlemesi kullanılmış, yan duran TEKNOFEST fotoğrafları düzeltilmiştir. Büyük ham dosyalar teslim paketine alınmamıştır.

### GitHub dizinini yenileme

```bash
npm run sync:github
npm run build
```

Komut yalnızca `eauzun` hesabının herkese açık depolarını okur ve sayfalamayı takip eder. Özel depoları çekmez. Site ziyaretlerinde GitHub API çağrısı yapılmaz; güncelleme için bu komutu çalıştırıp yeniden yayınlayın. API isteği başarısız olursa önceki kopya korunur. Projelere ait editoryal EN/TR açıklamalar ayrı tutulur ve bu komutla değişmez.

## Kontroller

- Üretim derlemesi ve TypeScript kontrolü.
- Masaüstü ve 320/390 px mobil yerleşimler, EN/TR içerik geçişi.
- Proje detayları, kategori filtreleri, depo araması ve dil filtresi.
- Etkinlik sekmeleri, fotoğraf galerisi ve Escape/ok tuşları.
- İletişim bağlantıları ve gerçek fotoğrafların yüklenmesi.

Fotoğraflar ve CV, portfolyo sahibi tarafından sağlanmıştır. Kullanılan açık kaynak bağımlılıkların kendi lisansları geçerlidir; font lisansları `THIRD_PARTY_NOTICES.md` dosyasında yer alır.
