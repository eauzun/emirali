export type Lang = 'en' | 'tr';
export type Copy = Record<Lang, string>;
export const bi = (en: string, tr: string): Copy => ({ en, tr });

export const text = {
  navProjects: bi('Projects', 'Projeler'), navEvents: bi('Events', 'Etkinlikler'), navAbout: bi('About', 'Hakkımda'),
  contact: bi('Let’s talk', 'İletişim'), skip: bi('Skip to content', 'İçeriğe geç'), menu: bi('Open navigation', 'Menüyü aç'), closeMenu: bi('Close navigation', 'Menüyü kapat'),
  role: bi('Software developer / Systems & security', 'Yazılım geliştirici / Sistemler ve güvenlik'),
  heroOne: bi('From bits.', 'Bitlerden.'), heroTwo: bi('To impact.', 'Etkiye.'),
  intro: bi('I’m Emirali. I build close to the machine — and bring people together around what comes next.', 'Ben Emirali. Donanıma yakın yazılımlar geliştiriyor, sıradaki fikri hayata geçirmek için insanları bir araya getiriyorum.'),
  explore: bi('Explore my work', 'Projelerimi keşfet'), resume: bi('View résumé', 'Özgeçmişi görüntüle'),
  canvasLabel: bi('An interactive field of rotating blue particles', 'Dönen mavi parçacıklardan oluşan etkileşimli grafik'),
  interactive: bi('MOVE TO EXPLORE', 'FAREYLE KEŞFET'), canvasName: bi('THE CURIOSITY FIELD', 'MERAK ALANI'),
  disciplines: bi('Low-level thinking. Real-world making.', 'Sistemin derinliğinden gerçek dünyaya.'),
  scroll: bi('SCROLL TO DISCOVER', 'KEŞFETMEK İÇİN KAYDIR'),
  selected: bi('01 / SELECTED WORK', '01 / SEÇİLİ ÇALIŞMALAR'),
  projectHeadline: bi('Under the hood.', 'Sistemin derininde.'),
  projectIntro: bi('From kernel interfaces to a shell of my own. A closer look at the things I build.', 'Çekirdek arayüzlerinden kendi kabuğuma. Geliştirdiğim projelere yakından bakış.'),
  details: bi('Explore project', 'Projeyi incele'), code: bi('Source code', 'Kaynak kodu'),
  core: bi('THE FOUNDATIONS', 'TEMEL ÇALIŞMALAR'), coreIntro: bi('Small components. Serious fundamentals.', 'Küçük bileşenler. Sağlam temeller.'),
  all: bi('All', 'Tümü'), systems: bi('Systems', 'Sistemler'), algorithms: bi('Algorithms', 'Algoritmalar'), graphics: bi('Graphics', 'Grafik'),
  noResults: bi('No projects match this filter.', 'Bu filtreye uyan proje bulunamadı.'),
  repoTitle: bi('The complete repository index.', 'Tüm depolar, tek bir yerde.'),
  repoBody: bi('Experiments, coursework, tools and Web3. The full public GitHub collection.', 'Deneyler, eğitim projeleri, araçlar ve Web3. GitHub’daki tüm herkese açık depolar.'),
  repos: bi('public repositories', 'herkese açık depo'), repoOpen: bi('Open repository index', 'Depo dizinini aç'), repoClose: bi('Close repository index', 'Depo dizinini kapat'),
  repoSearch: bi('Find a repository…', 'Depo ara…'), allLanguages: bi('All languages', 'Tüm diller'), original: bi('Original', 'Özgün'), fork: bi('Fork', 'Çatallanmış'),
  repoEmpty: bi('No matching repositories. Try another search.', 'Eşleşen depo yok. Başka bir arama deneyin.'),
  repoSnapshot: bi('GitHub snapshot', 'GitHub kaydı'), repoName: bi('Repository', 'Depo'), repoLanguage: bi('Language', 'Dil'), repoType: bi('Type', 'Tür'),
  eventsLabel: bi('02 / BEYOND THE SCREEN', '02 / EKRANIN ÖTESİNDE'), eventsTitle: bi('Out in the world.', 'Gerçek dünyada.'),
  eventsIntro: bi('Building is a team sport. A few moments from the communities, stages and challenges I’m part of.', 'Üretmek bir ekip işi. Parçası olduğum topluluklardan, sahnelerden ve yarışmalardan bazı anlar.'),
  gallery: bi('Open gallery', 'Galeriyi aç'), photos: bi('photos', 'fotoğraf'), moments: bi('FIELD NOTES', 'SAHADAN NOTLAR'),
  year: bi('YEAR', 'YIL'), achievement: bi('RECOGNITION', 'BAŞARI'), roleLabel: bi('ROLE', 'ROL'),
  aboutLabel: bi('03 / THE PERSON BEHIND THE CODE', '03 / KODUN ARDINDAKİ KİŞİ'),
  aboutTitle: bi('Curious by nature.\nHands-on by choice.', 'Doğamda merak.\nTercihim üretmek.'),
  aboutP1: bi('I’m a Linux-focused developer with a strong interest in what happens beneath the interface: processes, memory, networks and the hardware that makes it all possible.', 'Linux odaklı bir geliştiriciyim. Arayüzün arkasında olanlar ilgimi çekiyor: süreçler, bellek, ağlar ve tüm bunları mümkün kılan donanım.'),
  aboutP2: bi('My work spans C and C++ system programming, embedded Linux and cybersecurity. Alongside my studies at 42 Türkiye and Istanbul University, I turn that curiosity into practical projects and community work.', 'Çalışmalarım C ve C++ ile sistem programlama, gömülü Linux ve siber güvenliği kapsıyor. 42 Türkiye ve İstanbul Üniversitesi’ndeki eğitimimle birlikte bu merakı projelere ve topluluk çalışmalarına dönüştürüyorum.'),
  aboutP3: bi('Hardware taught me to look closely. Systems programming taught me to ask why. Working with communities taught me that the best ideas get better when they’re shared.', 'Donanım bana dikkatle bakmayı, sistem programlama nedenini sorgulamayı öğretti. Topluluklarla çalışmak ise fikirlerin paylaşıldıkça geliştiğini gösterdi.'),
  stack: bi('MY TOOLKIT', 'ARAÇ ÇANTAM'), education: bi('LEARNING, ALWAYS', 'ÖĞRENMEYE DEVAM'),
  computerScience: bi('Computer Science · Ongoing', 'Bilgisayar Bilimleri · Devam ediyor'), programming: bi('Computer Programming · Ongoing', 'Bilgisayar Programcılığı · Devam ediyor'),
  hardware: bi('Hardware & technical support', 'Donanım ve teknik destek'), hardwareBody: bi('Sancak Computer Ltd. · Part-time', 'Sancak Computer Ltd. · Yarı zamanlı'),
  credentials: bi('Selected credentials', 'Seçili sertifikalar'),
  ctaEyebrow: bi('GOOD THINGS START WITH A CONVERSATION', 'İYİ FİKİRLER BİR SOHBETLE BAŞLAR'),
  ctaOne: bi('What’s', 'Sırada'), ctaTwo: bi('next?', 'ne var?'),
  ctaBody: bi('A systems challenge, a new idea or a community worth building. I’d love to hear about it.', 'Bir sistem problemi, yeni bir fikir veya birlikte büyüteceğimiz bir topluluk. Konuşalım.'),
  email: bi('Email me', 'E-posta gönder'), copy: bi('Copy email', 'E-postayı kopyala'), copied: bi('Email copied', 'E-posta kopyalandı'), copyFailed: bi('Please copy: eauzun@proton.me', 'Lütfen kopyalayın: eauzun@proton.me'),
  backTop: bi('Back to top', 'Başa dön'), footerNote: bi('Built with curiosity.', 'Merakla üretildi.'), close: bi('Close', 'Kapat'), previous: bi('Previous', 'Önceki'), next: bi('Next', 'Sonraki'),
  keyPoints: bi('Inside the project', 'Projenin içinde'), tech: bi('Built with', 'Teknolojiler'), repoLink: bi('View on GitHub', 'GitHub’da görüntüle'),
  motionOff: bi('Pause animations', 'Animasyonları durdur'), motionOn: bi('Play animations', 'Animasyonları oynat'),
  metaDescription: bi('Emirali Uzun — software developer working across C/C++, Linux, embedded systems and cybersecurity. Explore projects, hackathons and community leadership.', 'Emirali Uzun — C/C++, Linux, gömülü sistemler ve siber güvenlik odaklı yazılım geliştirici. Projeler, hackathonlar ve topluluk çalışmaları.'),
};

export type Project = {
  id: string; title: string; eyebrow: Copy; description: Copy; details: Copy; category: 'systems' | 'algorithms' | 'graphics';
  tags: string[]; repo: string | null; points: Copy[]; visual: string;
};

export const projects: Project[] = [
  {
    id:'jetson', title:'Jetson Camera Driver', eyebrow:bi('EMBEDDED LINUX / KERNEL', 'GÖMÜLÜ LINUX / ÇEKİRDEK'),
    description:bi('Connecting a Sony IMX678 sensor to the NVIDIA Jetson Orin Nano. Right at the hardware boundary.', 'Sony IMX678 sensörünü NVIDIA Jetson Orin Nano ile buluşturan, donanım sınırında bir sürücü projesi.'),
    details:bi('A Linux camera-driver project combining V4L2, TegraCam and Device Tree integration, with a separate userspace autofocus tool. The repository includes sensor mode tables and board integration work.', 'V4L2, TegraCam ve Device Tree entegrasyonunu, kullanıcı alanında çalışan ayrı bir otomatik odaklama aracıyla birleştiren Linux kamera sürücüsü projesi. Depoda sensör mod tabloları ve kart entegrasyon çalışmaları bulunuyor.'),
    category:'systems',tags:['C','V4L2','MIPI CSI-2','Zig'],repo:'Jetson_Cam_Driver_Dev',visual:'sensor',
    points:[bi('V4L2 subdevice and TegraCam integration', 'V4L2 alt cihazı ve TegraCam entegrasyonu'),bi('Device Tree overlay for sensor and focus actuator', 'Sensör ve odaklama aktüatörü için Device Tree overlay'),bi('1080p60, 480p60 and 4K30 mode tables; userspace autofocus', '1080p60, 480p60 ve 4K30 mod tabloları; kullanıcı alanında otomatik odaklama')]
  },
  {
    id:'minishell',title:'Minishell',eyebrow:bi('SYSTEM PROGRAMMING / UNIX','SİSTEM PROGRAMLAMA / UNIX'),
    description:bi('A Bash-like shell, written in C. From the first token to the last child process.', 'C ile yazılmış Bash benzeri bir kabuk. İlk token’dan son alt sürece kadar.'),
    details:bi('An interactive shell built around a lexer, expander, parser and executor. It brings together process control, signals, redirection and careful memory management.', 'Lexer, expander, parser ve executor bileşenleri etrafında geliştirilen etkileşimli bir kabuk. Süreç kontrolü, sinyaller, yönlendirme ve dikkatli bellek yönetimini bir araya getiriyor.'),
    category:'systems',tags:['C','UNIX','Readline','Signals'],repo:'MiniShell',visual:'terminal',
    points:[bi('Pipelines, redirections and here-documents','Pipe, yönlendirme ve here-document desteği'),bi('Environment expansion and single/double-quote parsing','Ortam değişkenleri ve tek/çift tırnak ayrıştırma'),bi('Built-in commands, process management and signal handling','Yerleşik komutlar, süreç yönetimi ve sinyal işleme')]
  },
  {
    id:'gonemap',title:'GoNeMap',eyebrow:bi('NETWORKING / SECURITY','AĞ / GÜVENLİK'),
    description:bi('A lightweight TCP port scanner in Go. Making network services visible.', 'Go ile geliştirilmiş hafif bir TCP port tarayıcısı. Ağ servislerini görünür kılıyor.'),
    details:bi('A small network tool using TCP connect scanning and the Go standard library. An adjustable timeout and extensible port map keep the implementation simple and focused.', 'TCP connect taraması ve Go standart kütüphanesini kullanan küçük bir ağ aracı. Ayarlanabilir zaman aşımı ve genişletilebilir port listesiyle sade, odaklı bir uygulama.'),
    category:'systems',tags:['Go','TCP/IP','Networking'],repo:'GoNeMap',visual:'network',
    points:[bi('TCP connections through net.DialTimeout','net.DialTimeout üzerinden TCP bağlantıları'),bi('Configurable timeout and common-port mapping','Ayarlanabilir zaman aşımı ve yaygın port eşleştirmeleri'),bi('Standard library implementation','Standart kütüphane ile geliştirme')]
  },
  {id:'philosophers',title:'Philosophers',eyebrow:bi('CONCURRENCY','EŞZAMANLILIK'),description:bi('The dining philosophers problem, explored through threads and mutexes.','Thread ve mutex ile ele alınan yemek yiyen filozoflar problemi.'),details:bi('A C implementation of the dining philosophers problem, exploring shared resources, synchronization and concurrent execution.','Paylaşılan kaynaklar, senkronizasyon ve eşzamanlı çalışmayı ele alan, C ile yazılmış yemek yiyen filozoflar problemi.'),category:'systems',tags:['C','pthread','Mutex'],repo:'Philosophers',visual:'threads',points:[bi('Thread lifecycle management','Thread yaşam döngüsü yönetimi'),bi('Shared-resource synchronization with mutexes','Mutex ile paylaşılan kaynakların senkronizasyonu')]},
  {id:'push-swap',title:'push_swap',eyebrow:bi('ALGORITHMS','ALGORİTMALAR'),description:bi('Radix sorting with two stacks and a constrained set of operations.','İki yığın ve sınırlı işlem kümesiyle radix sıralama.'),details:bi('A sorting project that turns a sequence of integers into ordered output using two stacks and a limited instruction set.','Tamsayı dizilerini iki yığın ve sınırlı bir komut kümesiyle sıralayan algoritma projesi.'),category:'algorithms',tags:['C','Radix','Stacks'],repo:'push_swap',visual:'sort',points:[bi('Radix-based sorting strategy','Radix tabanlı sıralama stratejisi'),bi('Two-stack state and operation management','İki yığının durum ve işlem yönetimi')]},
  {id:'so-long',title:'so_long',eyebrow:bi('GRAPHICS / GAME','GRAFİK / OYUN'),description:bi('A 2D game in C, built with the MiniLibX graphics library.','MiniLibX grafik kütüphanesiyle C dilinde geliştirilmiş 2B oyun.'),details:bi('A graphics project bringing together a 2D game loop, user input and rendering in C using MiniLibX. Published in the microgame repository.','C ve MiniLibX ile 2B oyun döngüsü, kullanıcı girdisi ve çizim işlemlerini bir araya getiren grafik projesi. microgame deposunda yayımlanıyor.'),category:'graphics',tags:['C','MiniLibX','2D'],repo:'microgame',visual:'game',points:[bi('2D rendering with MiniLibX','MiniLibX ile 2B çizim'),bi('Game-state and input handling','Oyun durumu ve girdi yönetimi')]},
  {id:'libft',title:'libft',eyebrow:bi('C FOUNDATIONS','C TEMELLERİ'),description:bi('A personal C library, built one memory and string function at a time.','Bellek ve string fonksiyonlarıyla adım adım geliştirilen kişisel C kütüphanesi.'),details:bi('A custom implementation of core C library functions, focusing on strings, memory operations and reusable building blocks.','String, bellek işlemleri ve tekrar kullanılabilir bileşenlere odaklanan temel C kütüphane fonksiyonlarının özel uygulaması.'),category:'systems',tags:['C','Memory','Strings'],repo:'my_libc',visual:'library',points:[bi('Custom string and memory functions','Özel string ve bellek fonksiyonları'),bi('Reusable static-library foundation','Tekrar kullanılabilir statik kütüphane temeli')]},
  {id:'minitalk',title:'Minitalk',eyebrow:bi('INTER-PROCESS COMMUNICATION','SÜREÇLER ARASI İLETİŞİM'),description:bi('Client–server messaging through UNIX signals.','UNIX sinyalleriyle istemci–sunucu mesajlaşması.'),details:bi('A client and server exchanging messages through UNIX signals, with dynamically managed message storage.','UNIX sinyalleriyle mesaj alışverişi yapan, mesaj belleğini dinamik yöneten istemci ve sunucu.'),category:'systems',tags:['C','Signals','IPC'],repo:'Minitalk',visual:'signals',points:[bi('Signal-based client–server communication','Sinyal tabanlı istemci–sunucu iletişimi'),bi('Dynamic memory and message reconstruction','Dinamik bellek ve mesajın yeniden oluşturulması')]},
  {id:'printf',title:'ft_printf',eyebrow:bi('C FOUNDATIONS','C TEMELLERİ'),description:bi('A compact printf implementation with variadic arguments.','Değişken sayıda argümanla çalışan kompakt printf uygulaması.'),details:bi('A custom formatted-output function in C using variadic arguments and format parsing.','Değişken sayıda argüman ve biçim ayrıştırma kullanan, C dilinde özel biçimlendirilmiş çıktı fonksiyonu.'),category:'systems',tags:['C','va_arg','Formatting'],repo:'my_printf',visual:'format',points:[bi('Variadic argument processing','Değişken sayıda argüman işleme'),bi('Formatted output conversion','Biçimlendirilmiş çıktı dönüşümü')]},
  {id:'gnl',title:'get_next_line',eyebrow:bi('FILE I/O','DOSYA GİRDİ/ÇIKTI'),description:bi('Reading a file, one carefully managed line at a time.','Bir dosyayı, belleği dikkatle yöneterek satır satır okumak.'),details:bi('A line-reading function that handles buffered file input and memory management in C.','C dilinde tamponlanmış dosya girdisini ve bellek yönetimini ele alan satır okuma fonksiyonu.'),category:'systems',tags:['C','File I/O','Buffers'],repo:'get_next_line',visual:'lines',points:[bi('Buffered file-descriptor reads','Dosya tanımlayıcısından tamponlanmış okuma'),bi('Line-by-line output and memory handling','Satır satır çıktı ve bellek yönetimi')]},
  {id:'nixos',title:'configuration.nix',eyebrow:bi('LINUX / ENVIRONMENT','LINUX / ÇALIŞMA ORTAMI'),description:bi('A personal NixOS environment, tuned for low-level development.','Düşük seviyeli geliştirmeye göre düzenlenmiş kişisel NixOS ortamı.'),details:bi('A custom NixOS configuration for an AMD-based development environment, with system configuration, kernel parameters and developer tooling.','AMD tabanlı bir geliştirme ortamı için sistem ayarları, çekirdek parametreleri ve geliştirici araçlarını içeren özel NixOS yapılandırması.'),category:'systems',tags:['Nix','Linux','AMD'],repo:'my_nix_configuration.nix',visual:'config',points:[bi('Declarative system configuration','Bildirimsel sistem yapılandırması'),bi('Development tooling and kernel settings','Geliştirici araçları ve çekirdek ayarları')]}
];

export const events = [
  {id:'spaceapps',short:'NASA Space Apps',title:'NASA Space Apps\nChallenge',years:'2025 / 2026',accent:'#2f69ff',
    label:bi('COMMUNITY & LEADERSHIP','TOPLULUK VE LİDERLİK'),
    summary:bi('From telling the story to leading the mission. Growing a local community around a global challenge.', 'Hikâyeyi anlatmaktan organizasyonu yönetmeye. Küresel bir yarışmanın etrafında yerel bir topluluk büyütmek.'),
    achievements:[{date:'2025',title:bi('Brand & Marketing Director','Marka ve Pazarlama Direktörü'),body:bi('Brand communication, event promotion and community engagement.','Marka iletişimi, etkinlik tanıtımı ve topluluk etkileşimi.')},{date:'2026',title:bi('Top Performer · Local Lead','Top Performer · Local Lead'),body:bi('Selected as a Top Performer and appointed to local leadership.','Top Performer seçimi ve yerel liderlik görevi.')}],
    images:[{src:'spaceapps-stage',alt:bi('Project presentation at NASA Space Apps Challenge 2025','NASA Space Apps Challenge 2025 proje sunumu'),position:'center 56%'},{src:'spaceapps-community',alt:bi('Group photograph at NASA Space Apps Challenge 2025','NASA Space Apps Challenge 2025 toplu fotoğrafı'),position:'center 52%'}],
    photoNote:bi('PHOTOGRAPHS / 2025','FOTOĞRAFLAR / 2025')},
  {id:'teknofest',short:'TEKNOFEST',title:'Below the surface.\nBeyond the ordinary.',years:'2026',accent:'#e7ff6b',
    label:bi('ROBOTICS & TEAMWORK','ROBOTİK VE EKİP ÇALIŞMASI'),
    summary:bi('TEKNOFEST Mavi Vatan. A team effort at the intersection of hardware, software and autonomous underwater systems.','TEKNOFEST Mavi Vatan. Donanım, yazılım ve otonom su altı sistemlerinin kesişiminde bir ekip çalışması.'),
    achievements:[{date:'AUV',title:bi('Advanced Category Finalist','İleri Düzey Finalisti'),body:bi('Team finalist in the Unmanned Underwater Systems Competition.','İnsansız Su Altı Sistemleri Yarışması’nda takım olarak finalistlik.')},{date:'TEAM',title:bi('Mechanical team member','Mekanik ekip üyesi'),body:bi('Hands-on contribution to the underwater vehicle team.','Su altı aracı ekibinde uygulamalı çalışmalar.')}],
    images:[{src:'teknofest-vehicle',alt:bi('Underwater vehicle presentation at TEKNOFEST Mavi Vatan','TEKNOFEST Mavi Vatan’da su altı aracı sunumu'),position:'center 53%'},{src:'teknofest-team',alt:bi('The underwater vehicle team at TEKNOFEST Mavi Vatan','TEKNOFEST Mavi Vatan’da su altı aracı ekibi'),position:'center 57%'}],
    photoNote:bi('TEKNOFEST / MAVI VATAN','TEKNOFEST / MAVİ VATAN')},
  {id:'sui',short:'Sui × 42',title:'Code meets\ncommunity.',years:'2025',accent:'#8bd8ff',
    label:bi('WEB3 & COMMUNITY','WEB3 VE TOPLULUK'),
    summary:bi('42 Türkiye × Sui Hackfest. Building, sharing and connecting through the Sui ecosystem.','42 Türkiye × Sui Hackfest. Sui ekosisteminde geliştirmek, paylaşmak ve bağ kurmak.'),
    achievements:[{date:'AWARD',title:bi('Best Community Impact','Best Community Impact'),body:bi('Recognized with the Best Community Impact award at 42 Türkiye × Sui Hackfest.','42 Türkiye × Sui Hackfest’te En İyi Topluluk Etkisi ödülü.')},{date:'SUI',title:bi('Ideas, out loud.','Fikirler, sahnede.'),body:bi('Sharing ideas and participating in the builder community.','Fikir paylaşımı ve geliştirici topluluğuna katılım.')}],
    images:[{src:'sui-stage',alt:bi('Speaking on stage at the Sui and 42 Türkiye event','Sui ve 42 Türkiye etkinliğinde sahne konuşması'),position:'center 35%'},{src:'sui-audience',alt:bi('Participants at the Sui and 42 Türkiye event','Sui ve 42 Türkiye etkinliğinde katılımcılar'),position:'center 40%'}],
    photoNote:bi('42 TÜRKİYE × SUI / 2025','42 TÜRKİYE × SUI / 2025')}
];

export const eventTitles: Record<string,Copy> = {
  spaceapps:bi('NASA Space Apps\nChallenge','NASA Space Apps\nChallenge'),
  teknofest:bi('Below the surface.\nBeyond the ordinary.','Yüzeyin altında.\nSınırların ötesinde.'),
  sui:bi('Code meets\ncommunity.','Kod ve topluluk\nbir arada.')
};

export const toolkit = [
  {name:bi('Languages','Diller'),items:['C','C++','Go','Rust','Python','Shell','Nix']},
  {name:bi('Systems','Sistemler'),items:['Linux','Debian','Arch','NixOS','Red Hat']},
  {name:bi('Infrastructure','Altyapı'),items:['Docker','QEMU','Git','VirtualBox','Kubernetes']},
  {name:bi('Close to the metal','Donanıma yakın'),items:['V4L2','Device Tree','pthread','UNIX signals','MIPI CSI-2']}
];
