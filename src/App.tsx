import { useEffect, useMemo, useRef, useState } from 'react';
import { AudioLines, Braces, Check, CheckCheck, Code2, Copy as CopyIcon, Cpu, Download, Github, Layers, Mail, Menu, Pause, Phone, Play, Plus, Search, X } from 'lucide-react';
import { events, eventTitles, projects, text, toolkit } from './data/content';
import type { Copy, Lang, Project } from './data/content';
import repositorySnapshot from './data/github.json';
import ParticleField from './components/ParticleField';

type ModalState = { kind: 'project'; project: Project } | { kind: 'gallery'; event: number; index: number } | null;
const githubBase = 'https://github.com/eauzun';
const languageColors: Record<string,string> = { C:'#9aa6ff','C++':'#ed82c9',TypeScript:'#5d9eff',Go:'#5ee0ed',Rust:'#e5a77f',Nix:'#8cc7ff',Shell:'#c6e585',Move:'#91cbd7',Python:'#f1d467' };
const localizedTags: Record<string,string> = { Memory:'Bellek',Strings:'String işlemleri',Signals:'Sinyaller',Networking:'Ağ',Stacks:'Yığınlar',Formatting:'Biçimlendirme','File I/O':'Dosya G/Ç',Buffers:'Tamponlar' };

function Visual({ kind, lang }: { kind:string; lang:Lang }) {
  if(kind==='sensor') return <div className="sensor-visual" aria-hidden="true">
    <div className="visual-topline"><span>IMX678 / JETSON ORIN NANO</span><span>01</span></div>
    <div className="sensor-diagram"><div className="sensor-array">{Array.from({length:100},(_,i)=><i key={i} style={{'--cell':i%9,'--delay':`${(i%11)*.12}s`} as React.CSSProperties}/>)}</div><div className="sensor-trace"><i/><i/><i/><i/><i/></div><div className="sensor-endpoint"><Cpu size={42} strokeWidth={1}/><span>V4L2</span></div></div>
    <div className="signal-stages"><span>IMX678</span><span>MIPI CSI-2</span><span>LINUX</span></div>
    <div className="visual-bottomline"><span>{lang==='en'?'SENSOR TO SYSTEM':'SENSÖRDEN SİSTEME'}</span><span>C / ZIG</span></div>
  </div>;
  if(kind==='terminal') return <div className="terminal-visual" aria-hidden="true">
    <div className="terminal-top"><div><i/><i/><i/></div><span>minishell — C / UNIX</span></div>
    <div className="terminal-code"><p><span>~/minishell</span> <b> $ </b> ./minishell</p><p className="terminal-comment"># {lang==='en'?'a shell, from the ground up':'temelden geliştirilen bir kabuk'}</p><p><b> $ </b> echo <em>"hello, world"</em> | cat</p><p className="terminal-output">hello, world</p><p><b> $ </b><i className="terminal-caret"/></p></div>
    <div className="terminal-stages"><span>lexer</span><i/><span>parser</span><i/><span>executor</span></div>
    <span className="visual-caption">{lang==='en'?'EXAMPLE SESSION':'ÖRNEK OTURUM'}</span>
  </div>;
  return <div className="network-visual" aria-hidden="true">
    <div className="visual-topline"><span>TCP / CONNECT</span><span>03</span></div>
    <svg viewBox="0 0 500 250" className="network-svg">
      <defs><radialGradient id="net-glow"><stop stopColor="#2563ff" stopOpacity=".3"/><stop offset="1" stopColor="#2563ff" stopOpacity="0"/></radialGradient></defs>
      <circle cx="250" cy="130" r="117" fill="url(#net-glow)"/>
      <g fill="none" stroke="#274268"><circle cx="250" cy="130" r="95" strokeDasharray="2 8"/><circle cx="250" cy="130" r="64" strokeDasharray="2 7"/><path d="M250 130L106 72M250 130L397 57M250 130L395 191M250 130L131 218"/></g>
      <g fill="#10274c" stroke="#477bff"><circle cx="250" cy="130" r="30"/><circle cx="106" cy="72" r="18"/><circle cx="397" cy="57" r="18"/><circle cx="395" cy="191" r="18"/><circle cx="131" cy="218" r="13"/></g>
      <g fill="#d0deff" fontFamily="monospace" fontSize="11" textAnchor="middle"><text x="250" y="134">HOST</text><text x="106" y="76">22</text><text x="397" y="61">80</text><text x="395" y="195">443</text></g>
      <circle className="network-ping" cx="250" cy="130" r="30" fill="none" stroke="#6799ff"/>
    </svg>
    <div className="visual-bottomline"><span>net.DialTimeout</span><span>GO / TCP</span></div>
  </div>;
}

function App() {
  const [lang,setLang] = useState<Lang>(()=>{
    const requested=new URLSearchParams(window.location.search).get('lang');
    if(requested==='en'||requested==='tr')return requested;
    try{return localStorage.getItem('eu-language')==='tr'?'tr':'en';}catch{return 'en';}
  });
  const [paused,setPaused] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menuOpen,setMenuOpen] = useState(false);
  const [activeSection,setActiveSection] = useState('');
  const [filter,setFilter] = useState('all');
  const [repoOpen,setRepoOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [repoLanguage,setRepoLanguage] = useState('all');
  const [eventIndex,setEventIndex] = useState(0);
  const [modal,setModal] = useState<ModalState>(null);
  const [copyStatus,setCopyStatus] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const eventButtons=useRef<(HTMLButtonElement|null)[]>([]);
  const copyTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const t=(copy:Copy)=>copy[lang];
  const tag=(s:string)=>lang==='tr'?(localizedTags[s]||s):s;
  const featured=projects.slice(0,3);
  const filtered=projects.slice(3).filter(p=>filter==='all'||p.category===filter);
  const currentEvent=events[eventIndex];
  const isModalOpen=modal!==null;
  const repositories=repositorySnapshot.repositories;
  const repoLanguages=useMemo(()=>[...new Set(repositories.map(r=>r.language))].sort(),[repositories]);
  const matchingRepos=useMemo(()=>repositories.filter(r=>r.name.toLowerCase().includes(query.toLowerCase().trim())&&(repoLanguage==='all'||r.language===repoLanguage)),[query,repoLanguage,repositories]);

  useEffect(()=>{
    document.documentElement.lang=lang;
    document.title=lang==='en'?'Emirali Uzun — Systems, Software & Community':'Emirali Uzun — Sistemler, Yazılım ve Topluluk';
    document.querySelector('meta[name="description"]')?.setAttribute('content',text.metaDescription[lang]);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',text.metaDescription[lang]);
    try{localStorage.setItem('eu-language',lang);}catch{/* Storage is optional. */}
    const url=new URL(window.location.href);if(lang==='tr')url.searchParams.set('lang','tr');else url.searchParams.delete('lang');
    window.history.replaceState(null,'',url);
  },[lang]);
  useEffect(()=>{document.documentElement.dataset.motion=paused?'paused':'running';},[paused]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const navigation=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActiveSection(entry.target.id);}),{rootMargin:'-15% 0px -55% 0px'});
    document.querySelectorAll('main > section[id]').forEach(el=>navigation.observe(el));
    return()=>{observer.disconnect();navigation.disconnect();if(copyTimer.current)clearTimeout(copyTimer.current);};
  },[]);
  useEffect(()=>{
    const element=dialog.current;if(!element)return;
    if(isModalOpen){if(!element.open)element.showModal();document.body.style.overflow='hidden';}
    else {if(element.open)element.close();document.body.style.overflow='';}
    return()=>{document.body.style.overflow='';};
  },[isModalOpen]);
  useEffect(()=>{
    if(modal?.kind!=='gallery')return;
    const key=(e:KeyboardEvent)=>{
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();setModal(m=>m?.kind==='gallery'?{...m,index:(m.index+(e.key==='ArrowRight'?1:-1)+events[m.event].images.length)%events[m.event].images.length}:m);
      }
    };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
  },[modal]);
  async function copyEmail(){
    try{await navigator.clipboard.writeText('eauzun@proton.me');setCopyStatus('success');}
    catch{setCopyStatus('failure');}
    if(copyTimer.current)clearTimeout(copyTimer.current);copyTimer.current=setTimeout(()=>setCopyStatus(''),3500);
  }
  const openGallery=(index:number)=>setModal({kind:'gallery',event:eventIndex,index});
  const changePhoto=(direction:number)=>setModal(m=>m?.kind==='gallery'?{...m,index:(m.index+direction+events[m.event].images.length)%events[m.event].images.length}:m);
  const selectEvent=(index:number)=>setEventIndex(index);

  return <>
    <a href="#main" className="skip-link">{t(text.skip)}</a>
    <header className="site-header">
      <div className="nav-container">
        <a href="#home" className="wordmark" aria-label="Emirali Uzun"><span className="monogram">eu<span>_</span></span><span>EMIRALI<br/>UZUN</span></a>
        <nav className="desktop-nav" aria-label={lang==='en'?'Main navigation':'Ana menü'}>{[['projects',text.navProjects],['events',text.navEvents],['about',text.navAbout]].map(([id,label])=><a key={id as string} href={`#${id}`} className={activeSection===id?'active':''}>{t(label as Copy)}</a>)}</nav>
        <div className="nav-right">
          <div className="language-switch" aria-label={lang==='en'?'Language':'Dil'}><button onClick={()=>setLang('en')} aria-pressed={lang==='en'} lang="en">EN</button><span>/</span><button onClick={()=>setLang('tr')} aria-pressed={lang==='tr'} lang="tr">TR</button></div>
          <a className="nav-contact" href="#contact">{t(text.contact)}<span className="contact-dot"/></a>
          <button className="menu-button icon-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label={t(menuOpen?text.closeMenu:text.menu)} aria-expanded={menuOpen} aria-controls="mobile-nav">{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
        </div>
      </div>
      {menuOpen&&<nav id="mobile-nav" className="mobile-nav">{[['projects',text.navProjects],['events',text.navEvents],['about',text.navAbout],['contact',text.contact]].map(([id,label])=><a key={id as string} onClick={()=>setMenuOpen(false)} href={`#${id}`}>{t(label as Copy)}</a>)}</nav>}
    </header>
    <main id="main">
      <section id="home" className="hero">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="hero-art"><ParticleField paused={paused} label={t(text.canvasLabel)}/><div className="orbit-label"><span className="crosshair">+</span><span>{t(text.canvasName)}</span><span>001</span></div><div className="orbit-controls"><span>{t(text.interactive)}</span><button className="icon-button" onClick={()=>setPaused(!paused)} aria-label={t(paused?text.motionOn:text.motionOff)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div></div>
        <div className="hero-content wrap">
          <div className="eyebrow hero-eyebrow"><span className="tiny-cross">✳</span>{t(text.role)}</div>
          <h1><span>{t(text.heroOne)}</span><span className="blue-text">{t(text.heroTwo)}</span></h1>
          <p className="hero-intro">{t(text.intro)}</p>
          <div className="hero-actions"><a className="button button-blue" href="#projects">{t(text.explore)}<Code2 size={18}/></a><a className="text-link" href="/Emirali-Uzun-CV.pdf" target="_blank" rel="noreferrer">{t(text.resume)}<Download size={16}/></a></div>
          <div className="hero-ident"><div className="mini-photos"><img src="/images/sui-stage.webp" alt=""/><img src="/images/teknofest-vehicle.webp" alt=""/><img src="/images/spaceapps-stage.webp" alt=""/></div><span>C / C++ / LINUX<br/><b>{t(text.disciplines)}</b></span></div>
        </div>
        <div className="hero-bottom wrap"><span className="scroll-cue"><i/>{t(text.scroll)}</span><span>42 TÜRKİYE <i>×</i> NASA SPACE APPS <i>×</i> SUI</span><span className="hero-year">{lang==='en'?'PORTFOLIO':'PORTFOLYO'} / 2026</span></div>
      </section>

      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1].map(i=><div className="ticker-group" key={i}>{(lang==='en'?['SYSTEMS','SECURITY','OPEN SOURCE','COMMUNITY']:['SİSTEMLER','GÜVENLİK','AÇIK KAYNAK','TOPLULUK']).map(word=><span key={word}>{word}<span className="ticker-star">✳</span></span>)}</div>)}</div></div>

      <section id="projects" className="projects-section section wrap">
        <div className="section-heading reveal"><div><p className="eyebrow">{t(text.selected)}</p><h2>{t(text.projectHeadline)}</h2></div><p className="section-description">{t(text.projectIntro)}</p></div>
        <div className="featured-grid">
          {featured.map((project,i)=><article key={project.id} className={`featured-card featured-${project.visual} reveal`}>
            <button className="project-visual-button" onClick={()=>setModal({kind:'project',project})} aria-label={`${t(text.details)}: ${project.title}`}><Visual kind={project.visual} lang={lang}/><span className="visual-open"><Plus size={20}/></span></button>
            <div className="featured-copy"><div className="project-eyebrow"><span>{t(project.eyebrow)}</span><span>0{i+1}</span></div><h3>{project.title}</h3><p>{t(project.description)}</p><div className="project-card-bottom"><div className="tags">{project.tags.slice(0,3).map(item=><span key={item}>{tag(item)}</span>)}</div><button className="project-open" onClick={()=>setModal({kind:'project',project})} aria-label={`${t(text.details)}: ${project.title}`}><Plus size={22}/></button></div></div>
          </article>)}
        </div>
        <div className="core-heading reveal"><div><p className="eyebrow">{t(text.core)}</p><h3>{t(text.coreIntro)}</h3></div><div className="filters" aria-label={lang==='en'?'Project category':'Proje kategorisi'}>{(['all','systems','algorithms','graphics'] as const).map(category=><button key={category} onClick={()=>setFilter(category)} aria-pressed={filter===category}>{t(text[category])}</button>)}</div></div>
        <div className="core-grid" aria-live="polite">{filtered.map(project=><button key={project.id} className="core-card" onClick={()=>setModal({kind:'project',project})}><div className="core-top"><span className="core-icon">{project.category==='algorithms'?<Layers size={23}/>:project.id==='philosophers'?<AudioLines size={23}/>:project.category==='graphics'?<Braces size={23}/>:<Code2 size={23}/>}</span><span className="core-number">{String(projects.findIndex(p=>p.id===project.id)+1).padStart(2,'0')}</span></div><span className="core-title">{project.title}</span><span className="core-desc">{t(project.description)}</span><span className="core-bottom"><span>{project.tags.slice(0,2).map(tag).join(' / ')}</span><Plus size={17}/></span></button>)}{filtered.length===0&&<p>{t(text.noResults)}</p>}</div>
        <div className="repo-section reveal"><div className="repo-banner"><div className="repo-banner-icon"><Github size={28}/></div><div><h3>{t(text.repoTitle)}</h3><p>{t(text.repoBody)}</p></div><button className="repo-toggle" onClick={()=>setRepoOpen(!repoOpen)} aria-expanded={repoOpen} aria-controls="repository-index"><span><b>{repositories.length}</b> {t(text.repos)}</span>{repoOpen?<X size={20}/>:<Plus size={20}/>}<span className="sr-only">{t(repoOpen?text.repoClose:text.repoOpen)}</span></button></div>
          {repoOpen&&<div id="repository-index" className="repo-index"><div className="repo-search-row"><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t(text.repoSearch)} aria-label={t(text.repoSearch)}/></label><select value={repoLanguage} onChange={e=>setRepoLanguage(e.target.value)} aria-label={t(text.repoLanguage)}><option value="all">{t(text.allLanguages)}</option>{repoLanguages.map(l=><option value={l} key={l}>{l}</option>)}</select></div><div className="repo-table-head"><span>{t(text.repoName)}</span><span>{t(text.repoLanguage)}</span><span>{t(text.repoType)}</span></div><div className="repo-list" aria-live="polite">{matchingRepos.map(repo=><a href={repo.url} target="_blank" rel="noreferrer" key={repo.name} className="repo-row"><span className="repo-name"><Code2 size={16}/>{repo.name}</span><span className="repo-lang"><i style={{background:languageColors[repo.language]||'#888'}}/>{repo.language}</span><span className="repo-kind">{t(repo.fork?text.fork:text.original)}</span></a>)}{!matchingRepos.length&&<p className="empty-state">{t(text.repoEmpty)}</p>}</div><div className="repo-footnote"><span>{matchingRepos.length} / {repositories.length}</span><span>{t(text.repoSnapshot)} · {new Intl.DateTimeFormat(lang==='en'?'en-GB':'tr-TR',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(repositorySnapshot.syncedAt+'T00:00:00Z'))}</span><a href={githubBase+'?tab=repositories'} target="_blank" rel="noreferrer">GitHub <Github size={14}/></a></div></div>}
        </div>
      </section>

      <section id="events" className="events-section section">
        <div className="wrap"><div className="section-heading reveal"><div><p className="eyebrow">{t(text.eventsLabel)}</p><h2>{t(text.eventsTitle)}</h2></div><p className="section-description">{t(text.eventsIntro)}</p></div>
          <div className="event-tabs" role="tablist" aria-label={t(text.navEvents)}>{events.map((event,i)=><button key={event.id} ref={el=>{eventButtons.current[i]=el;}} id={`event-tab-${i}`} role="tab" aria-selected={eventIndex===i} tabIndex={eventIndex===i?0:-1} aria-controls="event-panel" onClick={()=>selectEvent(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%events.length;else if(e.key==='ArrowLeft')next=(i+events.length-1)%events.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=events.length-1;else return;e.preventDefault();selectEvent(next);eventButtons.current[next]?.focus();}}><span>0{i+1}</span>{event.short}<span className="tab-year">{event.years}</span></button>)}</div>
          <div id="event-panel" role="tabpanel" aria-labelledby={`event-tab-${eventIndex}`} className="event-panel" style={{'--event-accent':currentEvent.accent} as React.CSSProperties}>
            <div className="event-photo-column"><button className={`event-main-photo event-photo-${currentEvent.id}`} onClick={()=>openGallery(0)} aria-label={`${t(text.gallery)}: ${currentEvent.short}`}><img key={currentEvent.images[0].src} src={`/images/${currentEvent.images[0].src}.webp`} alt={t(currentEvent.images[0].alt)} style={{objectPosition:currentEvent.images[0].position}} loading="lazy"/><div className="photo-corner"><span>{t(currentEvent.photoNote)}</span><span className="photo-expand"><Plus size={22}/></span></div></button><button className="event-secondary-photo" onClick={()=>openGallery(1)} aria-label={`${t(text.gallery)}: ${t(currentEvent.images[1].alt)}`}><img src={`/images/${currentEvent.images[1].src}.webp`} alt={t(currentEvent.images[1].alt)} style={{objectPosition:currentEvent.images[1].position}} loading="lazy"/><span>02 / 02 <Plus size={18}/></span></button></div>
            <div className="event-story"><p className="eyebrow event-eyebrow">{t(currentEvent.label)}</p><h3>{t(eventTitles[currentEvent.id])}</h3><p className="event-summary">{t(currentEvent.summary)}</p><div className="event-milestones">{currentEvent.achievements.map(item=><div className="event-milestone" key={item.date}><span className="milestone-date">{lang==='tr'?(item.date==='TEAM'?'EKİP':item.date==='AWARD'?'ÖDÜL':item.date):item.date}</span><div><h4>{t(item.title)}</h4><p>{t(item.body)}</p></div></div>)}</div><button className="event-gallery-button" onClick={()=>openGallery(0)}>{t(text.gallery)}<span>02 {t(text.photos)} <Plus size={16}/></span></button></div>
          </div>
          <div className="events-bottom"><span>{t(text.moments)} / 2025—2026</span><span>NASA SPACE APPS · TEKNOFEST · SUI</span></div>
        </div>
      </section>

      <section id="about" className="about-section section wrap">
        <p className="eyebrow reveal">{t(text.aboutLabel)}</p>
        <div className="about-grid"><div className="about-image-block reveal"><div className="about-image"><img src="/images/sui-stage.webp" alt={t(events[2].images[0].alt)} loading="lazy"/><span className="about-photo-label">EMIRALI UZUN / eauzun</span></div><div className="about-image-footer"><span>42 TÜRKİYE × SUI</span><span>2025</span></div><div className="about-name" aria-hidden="true">{lang==='en'?'ALWAYS':'HER ZAMAN'}<br/><span>{lang==='en'?'CURIOUS.':'MERAKLI.'}</span></div></div>
          <div className="about-copy reveal"><h2>{t(text.aboutTitle)}</h2><p>{t(text.aboutP1)}</p><p>{t(text.aboutP2)}</p><p className="about-note">{t(text.aboutP3)}</p><a className="text-link" href="/Emirali-Uzun-CV.pdf" target="_blank" rel="noreferrer">{t(text.resume)}<Download size={16}/></a><div className="education"><p className="eyebrow">{t(text.education)}</p><div><span>42 Türkiye</span><span>{t(text.computerScience)}</span></div><div><span>{lang==='en'?'Istanbul University':'İstanbul Üniversitesi'}</span><span>{t(text.programming)}</span></div><div><span>{t(text.hardware)}</span><span>{t(text.hardwareBody)}</span></div></div></div></div>
        <div className="toolkit reveal"><p className="eyebrow">{t(text.stack)}</p><div className="toolkit-grid">{toolkit.map((group,i)=><div className="toolkit-group" key={i}><span className="toolkit-number">0{i+1}</span><h3>{t(group.name)}</h3><div>{group.items.map(item=><span key={item}>{lang==='tr'&&item==='UNIX signals'?'UNIX sinyalleri':item}</span>)}</div></div>)}</div></div>
        <details className="credentials reveal"><summary>{t(text.credentials)}<Plus size={18}/></summary><div className="credential-grid"><div><span>2025</span><p>{lang==='en'?'Network Security':'Ağ Güvenliği'}</p><small>Cyber Anatolia</small></div><div><span>2024</span><p>{lang==='en'?'Low-Level Hacking & Binary Exploiting':'Düşük Seviyeli Hacking ve Binary Exploiting'}</p><small>Cyber Clubs Union</small></div><div><span>2024</span><p>{lang==='en'?'Cybersecurity Fundamentals':'Siber Güvenlik Temelleri'}</p><small>IBM</small></div><div><span>UAV-1</span><p>{lang==='en'?'Sport / Amateur Pilot License':'Sportif / Amatör Pilot Lisansı'}</p><small>{lang==='en'?'Turkish Civil Aviation Authority':'Sivil Havacılık Genel Müdürlüğü'}</small></div></div></details>
      </section>

      <section id="contact" className="contact-section"><div className="wrap"><div className="contact-top"><p className="eyebrow">{t(text.ctaEyebrow)}</p><span className="contact-asterisk" aria-hidden="true">✳</span></div><div className="contact-main"><h2>{t(text.ctaOne)}<br/><span>{t(text.ctaTwo)}</span></h2><div className="contact-content"><p>{t(text.ctaBody)}</p><a className="email-link" href="mailto:eauzun@proton.me">eauzun@proton.me</a><a className="phone-link" href="tel:+905522892401" aria-label={lang==='en'?'Call Emirali: +90 552 289 24 01':'Emirali’yi ara: +90 552 289 24 01'}><Phone size={18} aria-hidden="true"/>+90 552 289 24 01</a><div className="contact-actions"><a className="button button-white" href="mailto:eauzun@proton.me">{t(text.email)}<Mail size={18}/></a><button className="copy-button" onClick={copyEmail} aria-label={t(text.copy)}>{copyStatus==='success'?<Check size={19}/>:<CopyIcon size={19}/>}</button><a className="copy-button" href={githubBase} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a></div><div className="copy-status" role="status">{copyStatus==='success'?t(text.copied):copyStatus==='failure'?t(text.copyFailed):''}</div></div></div></div></section>
    </main>
    <footer className="site-footer wrap"><a href="#home" className="footer-mark">eu_</a><p>© {new Date().getFullYear()} Emirali Uzun. <span>{t(text.footerNote)}</span></p><a href="#home">{t(text.backTop)}</a></footer>

    <dialog ref={dialog} className={`modal ${modal?.kind==='gallery'?'gallery-modal':'project-modal'}`} onClose={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)setModal(null);}} aria-labelledby="modal-title">
      {modal&&<div className="modal-shell"><div className="modal-top"><span className="eyebrow">{modal.kind==='project'?t(modal.project.eyebrow):events[modal.event].short}</span><button autoFocus className="modal-close" onClick={()=>setModal(null)} aria-label={t(text.close)}><span>{t(text.close)}</span><X size={22}/></button></div>
        {modal.kind==='project'?<><div className="modal-project-header"><span className="modal-project-index">{String(projects.findIndex(p=>p.id===modal.project.id)+1).padStart(2,'0')}</span><h2 id="modal-title">{modal.project.title}</h2><p>{t(modal.project.details)}</p></div><div className="modal-project-body"><p className="eyebrow">{t(text.keyPoints)}</p><ul>{modal.project.points.map((point,i)=><li key={i}><CheckCheck size={18}/>{t(point)}</li>)}</ul><p className="eyebrow modal-tech-label">{t(text.tech)}</p><div className="tags">{modal.project.tags.map(item=><span key={item}>{tag(item)}</span>)}</div>{modal.project.repo?<a className="button button-blue" href={`${githubBase}/${modal.project.repo}`} target="_blank" rel="noreferrer">{t(text.repoLink)}<Github size={18}/></a>:<p className="source-note">{lang==='en'?'Included in my résumé. A separate public repository is not linked.':'Özgeçmişimde yer alan proje. Ayrı bir herkese açık depo bağlantısı bulunmuyor.'}</p>}</div></>:<><h2 id="modal-title" className="sr-only">{t(events[modal.event].images[modal.index].alt)}</h2><div className="gallery-image"><img src={`/images/${events[modal.event].images[modal.index].src}.webp`} alt={t(events[modal.event].images[modal.index].alt)}/></div><div className="gallery-bottom"><button onClick={()=>changePhoto(-1)}>{t(text.previous)}</button><p>{modal.index+1} / {events[modal.event].images.length}<span>{t(events[modal.event].images[modal.index].alt)}</span></p><button onClick={()=>changePhoto(1)}>{t(text.next)}</button></div></>}
      </div>}
    </dialog>
  </>;
}

export default App;
