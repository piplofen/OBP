/* Shared shell: icons, header, footer, callback modal, helpers.
   Every page loads this after React + data. */
const { useState, useMemo, useEffect, useRef, useCallback } = React;

const ICONS = {
  stethoscope:'<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H3.5M13 3h1.5"/><path d="M9 16v1a4 4 0 0 0 8 0v-1"/><circle cx="18.5" cy="14" r="2"/>',
  scan:'<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M7 12h10"/>',
  bed:'<path d="M3 7v12M3 13h18v6M21 19v-4a3 3 0 0 0-3-3H10v4"/><circle cx="6.5" cy="10.5" r="1.6"/>',
  pulse:'<path d="M2 12h4l2-6 4 12 2.5-7 1.5 3h6"/>',
  shield:'<path d="M12 3 5 6v5.5c0 4.3 3 7.5 7 9.5 4-2 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  crown:'<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z"/><path d="M5 20h14"/>',
  brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1V4.5A2.5 2.5 0 0 0 9 4Z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 4 3 3 0 0 1-5 1"/>',
  drop:'<path d="M12 3.5c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10Z"/>',
  activity:'<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  flask:'<path d="M9 3h6M10 3v6.5L5.2 17.4A2 2 0 0 0 6.9 20.5h10.2a2 2 0 0 0 1.7-3.1L14 9.5V3"/><path d="M7.5 14h9"/>',
  heart:'<path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"/>',
  bone:'<path d="M7 21a2.5 2.5 0 0 1-2-4 2.5 2.5 0 0 1 1-4l8-8a2.5 2.5 0 0 1 4-1 2.5 2.5 0 0 1 1 4l-8 8a2.5 2.5 0 0 1-4 1Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  ear:'<path d="M6 10a6 6 0 1 1 12 0c0 3-2 4-3.5 5.5S12 18 12 20a2.5 2.5 0 0 1-5 0M9 9a3 3 0 0 1 5 2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  upright:'<path d="M7 17 17 7M8 7h9v9"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  chevR:'<path d="m9 6 6 6-6 6"/>',
  check:'<path d="M5 12.5 10 17.5 19.5 7"/>',
  phone:'<path d="M6.5 4h3l1.4 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 5.5L20 7"/>',
  mappin:'<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  doc:'<path d="M7 3h7l4 4v14H7zM14 3v4h4"/><path d="M10 13h5M10 16.5h5"/>',
  lock:'<rect x="4.5" y="10" width="15" height="10" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  award:'<circle cx="12" cy="9" r="6"/><path d="m9 14-1.5 7L12 18l4.5 3L15 14"/>',
  cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  vk:'<path d="M4.5 7.5c.4 5 3 8.5 7.3 8.5h.5v-2.9c1.4.1 2.4 1.2 2.9 2.9h2.6c-.5-2-1.6-3.2-3-3.7 1.3-.6 2.5-1.9 3-3.8h-2.4c-.5 1.6-1.6 2.7-2.6 2.8V7.5h-2.6v3.7C9 11 7.7 9.3 7.3 7.5z"/>',
  tg:'<path d="m4 12 16-6.5-2.5 14-4.8-3.6L10 19l-.4-4.3 7.4-6.7-9 5.6z"/>',
};
function Icon({ name, size=22, stroke=1.6, style, cls }){
  const filled = (name==='vk'||name==='tg');
  return React.createElement('svg',{ width:size,height:size,viewBox:'0 0 24 24',fill:filled?'currentColor':'none',stroke:filled?'none':'currentColor',strokeWidth:stroke,strokeLinecap:'round',strokeLinejoin:'round',style,className:cls,dangerouslySetInnerHTML:{__html:ICONS[name]||''}});
}
const RUB = n => n.toLocaleString('ru-RU')+' ₽';

/* ---------- Callback context (single modal per page) ---------- */
const CB = { open:()=>{} };
function useCallbackModal(){
  const [state,setState]=useState({ open:false, subject:'' });
  CB.open = (subject)=>setState({ open:true, subject:subject||'' });
  return { state, open:(s)=>setState({open:true,subject:s||''}), close:()=>setState(s=>({...s,open:false})) };
}

/* ---------- Header ---------- */
function Header({ current }){
  const [menu,setMenu]=useState(null);
  const [drawer,setDrawer]=useState(false);
  const cur = NAV_MENU.find(n=>n.k===menu);
  return (
    <React.Fragment>
      <div className="topbar">
        <div className="wrap">
          <div className="tb-left">
            <a href="kontakty.html"><Icon name="mappin" size={14}/> Мичуринский проспект, 6</a>
            <span className="dotsep"></span>
            <a href="tel:+74959821090"><Icon name="phone" size={13}/> +7 (495) 982-10-90</a>
          </div>
          <div className="tb-right">
            <a href="patsientam.html"><Icon name="doc" size={14}/> Пациентам</a>
            <a href="Личный кабинет.html"><Icon name="user" size={14}/> Личный кабинет</a>
          </div>
        </div>
      </div>
      <header className="nav" onMouseLeave={()=>setMenu(null)}>
        <div className="wrap">
          <a className="brand" href="index.html">
            <img src="assets/obp-emblem.png" alt="Эмблема ОБП"/>
            <span className="bt"><b>ОБП</b><span>Управление делами Президента РФ</span></span>
          </a>
          <nav className="mainnav">
            {NAV_MENU.map(n=>(
              <a key={n.k} href={n.href} className={'navlink'+(menu===n.k?' open':'')+(current===n.k?' navlink--active':'')}
                 onMouseEnter={()=>setMenu(n.k)} onFocus={()=>setMenu(n.k)}>
                {n.k} <Icon name="chevron" size={14} cls="caret"/>
              </a>
            ))}
            <a className={'navlink'+(current==='Контакты'?' navlink--active':'')} href="kontakty.html">Контакты</a>
          </nav>
          <div className="nav-actions">
            <div className="nav-phone"><b>+7 (495) 982-10-90</b><span>Ежедневно, круглосуточно</span></div>
            <button className="btn btn--gold btn--sm" onClick={()=>CB.open('')}>Перезвоните мне</button>
            <button className="menubtn" onClick={()=>setDrawer(true)} aria-label="Меню"><Icon name="menu" size={22}/></button>
          </div>
        </div>
        {cur && (
          <div className="mega" onMouseLeave={()=>setMenu(null)}>
            <div className="wrap">
              {cur.cols.map(col=>(
                <div key={col.h}>
                  <h4>{col.h}</h4>
                  <ul>{col.items.map(([t,href])=>(<li key={t}><a href={href}>{t}<span className="ar"><Icon name="arrow" size={15} stroke={2}/></span></a></li>))}</ul>
                </div>
              ))}
              <div className="mega-feature">
                <Icon name="spark" size={24} style={{color:'var(--gold-deep)'}}/>
                <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:21,marginTop:'auto',lineHeight:1.15}}>Не знаете, к кому обратиться?</div>
                <p className="muted" style={{fontSize:13.5,margin:'8px 0 16px'}}>Оставьте заявку — врач-куратор подберёт специалиста и программу.</p>
                <button className="btn btn--ink btn--sm" onClick={()=>CB.open('Подбор специалиста')}>Оставить заявку</button>
              </div>
            </div>
          </div>
        )}
      </header>
      {drawer && <MobileDrawer onClose={()=>setDrawer(false)}/>}
    </React.Fragment>
  );
}

function MobileDrawer({ onClose }){
  const links = [
    ['Главная','index.html'],['О больнице','about.html'],['Направления','napravleniya.html'],
    ['Врачи','vrachi.html'],['Услуги и цены','tseny.html'],['Программы и чек-апы','programmy.html'],
    ['Стационар','statsionar.html'],['Диагностика','diagnostika.html'],['Новости','novosti.html'],
    ['Пациентам','patsientam.html'],['Контакты','kontakty.html'],
  ];
  return (
    <div className="mdrawer" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="panel">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <span className="eyebrow">Меню</span>
          <button className="mclose" onClick={onClose} style={{width:40,height:40}}><Icon name="x" size={19}/></button>
        </div>
        {links.map(([t,href])=>(<a key={t} className="mlink" href={href}>{t}</a>))}
        <button className="btn btn--gold btn--block" style={{marginTop:20}} onClick={()=>{ onClose(); CB.open(''); }}>Перезвоните мне</button>
        <a className="btn btn--ghost btn--block" style={{marginTop:10}} href="Личный кабинет.html">Личный кабинет</a>
        <div style={{marginTop:22,textAlign:'center'}}><a href="tel:+74959821090" style={{fontWeight:700,fontSize:18}}>+7 (495) 982-10-90</a></div>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer(){
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="assets/obp-logo-full.png" alt="Объединённая больница с поликлиникой УДП РФ"/>
            <p>ФГБУ «Объединённая больница с поликлиникой» Управления делами Президента Российской Федерации.</p>
            <div className="socials">
              <a href="#" onClick={e=>e.preventDefault()} aria-label="ВКонтакте"><Icon name="vk" size={20}/></a>
              <a href="#" onClick={e=>e.preventDefault()} aria-label="Telegram"><Icon name="tg" size={20}/></a>
            </div>
          </div>
          <div className="footcol">
            <h5>Клиника</h5>
            <ul>
              <li><a href="about.html">О больнице</a></li>
              <li><a href="napravleniya.html">Направления</a></li>
              <li><a href="vrachi.html">Врачи</a></li>
              <li><a href="statsionar.html">Стационар</a></li>
              <li><a href="novosti.html">Новости</a></li>
            </ul>
          </div>
          <div className="footcol">
            <h5>Пациентам</h5>
            <ul>
              <li><a href="tseny.html">Услуги и цены</a></li>
              <li><a href="programmy.html">Программы и чек-апы</a></li>
              <li><a href="diagnostika.html">Диагностика</a></li>
              <li><a href="patsientam.html">Документы и подготовка</a></li>
              <li><a href="Личный кабинет.html">Личный кабинет</a></li>
            </ul>
          </div>
          <div className="footcol foot-contact">
            <h5>Контакты</h5>
            <div className="ln"><Icon name="phone" size={18}/><span className="muted" style={{lineHeight:1.3}}>Справочная, круглосуточно<b>+7 (495) 982-10-90</b></span></div>
            <div className="ln"><Icon name="mappin" size={18}/><span>г. Москва, Мичуринский проспект, д. 6</span></div>
            <div className="ln"><Icon name="mail" size={18}/><span>info@fgu-obp.ru</span></div>
            <button className="btn btn--gold btn--sm" style={{marginTop:4}} onClick={()=>CB.open('')}>Перезвоните мне</button>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="cp">© {new Date().getFullYear()} ФГБУ «ОБП» УДП РФ. Все права защищены.</span>
          <div className="lks">
            <a href="patsientam.html">Политика конфиденциальности</a>
            <a href="patsientam.html">Согласие на обработку ПДн</a>
            <a href="patsientam.html">Правовая информация</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Callback modal ---------- */
function CallbackModal({ state, close }){
  const [form,setForm]=useState({ name:'', phone:'', time:'Как можно скорее' });
  const [err,setErr]=useState({});
  const [done,setDone]=useState(false);
  useEffect(()=>{ if(state.open){ setDone(false); setErr({}); setForm({name:'',phone:'',time:'Как можно скорее'}); } },[state.open]);
  useEffect(()=>{
    const h=e=>{ if(e.key==='Escape') close(); };
    if(state.open) window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  },[state.open]);
  if(!state.open) return null;
  const phoneMask = v => { let d=v.replace(/\D/g,''); if(d.startsWith('8'))d='7'+d.slice(1); if(!d.startsWith('7'))d='7'+d; d=d.slice(0,11); let r='+7'; if(d.length>1)r+=' ('+d.slice(1,4); if(d.length>=4)r+=') '+d.slice(4,7); if(d.length>=7)r+='-'+d.slice(7,9); if(d.length>=9)r+='-'+d.slice(9,11); return r; };
  const submit = ()=>{
    const e={};
    if(form.name.trim().length<2) e.name='Укажите ваше имя';
    if(form.phone.replace(/\D/g,'').length<11) e.phone='Введите корректный номер';
    setErr(e); if(Object.keys(e).length===0) setDone(true);
  };
  return (
    <div className="ov" onMouseDown={e=>{ if(e.target===e.currentTarget) close(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        {done ? (
          <div className="m-body"><div className="cb-success">
            <div className="check"><Icon name="check" size={40} stroke={2.4} style={{color:'var(--on-gold)'}}/></div>
            <h3>Заявка принята</h3>
            <p>Мы перезвоним вам в ближайшее время, подберём специалиста и запишем на приём. После первого визита для вас откроется личный кабинет.</p>
            <button className="btn btn--gold" style={{marginTop:24}} onClick={close}>Понятно</button>
          </div></div>
        ) : (
          <React.Fragment>
            <div className="m-head">
              <div className="t">
                <div className="s">{state.subject ? state.subject : 'Запись на приём'}</div>
                <h3>Перезвоните мне</h3>
              </div>
              <button className="mclose" onClick={close} aria-label="Закрыть"><Icon name="x" size={20}/></button>
            </div>
            <div className="m-body">
              <p className="muted" style={{marginTop:0,marginBottom:18,fontSize:14.5}}>Оставьте имя и телефон — врач-куратор перезвонит, ответит на вопросы и подберёт удобное время.</p>
              <div className="field">
                <label>Как к вам обращаться</label>
                <input className={err.name?'err':''} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Имя и отчество"/>
                {err.name && <div className="msg">{err.name}</div>}
              </div>
              <div className="field">
                <label>Телефон</label>
                <input className={err.phone?'err':''} inputMode="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:phoneMask(e.target.value)}))} placeholder="+7 (___) ___-__-__"/>
                {err.phone && <div className="msg">{err.phone}</div>}
              </div>
              <div className="field">
                <label>Когда удобно принять звонок</label>
                <select value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}>
                  <option>Как можно скорее</option><option>Сегодня, в первой половине дня</option>
                  <option>Сегодня, во второй половине дня</option><option>Завтра</option>
                </select>
              </div>
              <button className="btn btn--gold btn--block btn--lg" onClick={submit}>Отправить заявку</button>
              <div className="conf-note" style={{marginTop:14}}>
                <Icon name="lock" size={18}/>
                <p>Мы гарантируем полную конфиденциальность. Данные передаются по защищённому соединению и используются только для записи.</p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ---------- Small shared pieces ---------- */
function PageHead({ crumbs, eyebrow, title, lead, actions }){
  return (
    <section className="pagehead">
      <div className="glow"></div>
      <div className="wrap rise">
        <div className="crumbs">
          <a href="index.html">Главная</a>
          {(crumbs||[]).map((c,i)=>(
            <React.Fragment key={i}>
              <span className="sep">·</span>
              {c[1] ? <a href={c[1]}>{c[0]}</a> : <span style={{color:'var(--ink-soft)'}}>{c[0]}</span>}
            </React.Fragment>
          ))}
        </div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 style={{marginTop:eyebrow?14:0}} dangerouslySetInnerHTML={{__html:title}}></h1>
        {lead && <p className="lead">{lead}</p>}
        {actions && <div className="ph-actions">{actions}</div>}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text, link, onLink, dark }){
  return (
    <div className="sec-head">
      <div className="l">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && <button className="linkbtn" onClick={onLink}>{link} <span><Icon name="arrow" size={16} stroke={2}/></span></button>}
    </div>
  );
}

function CtaBand({ title, text, subject }){
  return (
    <section className="section">
      <div className="wrap">
        <div className="ctaband">
          <div className="glow"></div>
          <h2>{title||'Запишитесь на приём — мы перезвоним'}</h2>
          <p>{text||'Оставьте заявку, и врач-куратор свяжется с вами, ответит на вопросы и подберёт удобное время визита.'}</p>
          <div className="row">
            <button className="btn btn--gold btn--lg" onClick={()=>CB.open(subject||'')}>Перезвоните мне</button>
            <a className="btn btn--soft btn--lg" href="tel:+74959821090"><Icon name="phone" size={18}/> +7 (495) 982-10-90</a>
          </div>
          <div className="conf"><Icon name="lock" size={15}/> Полная конфиденциальность · звонок в течение 15 минут</div>
        </div>
      </div>
    </section>
  );
}

/* Page bootstrap: renders Header + content + CtaBand? + Footer + modal */
function Page({ current, children }){
  const cb = useCallbackModal();
  return (
    <React.Fragment>
      <Header current={current}/>
      {children}
      <Footer/>
      <CallbackModal state={cb.state} close={cb.close}/>
    </React.Fragment>
  );
}

Object.assign(window,{ Icon, RUB, CB, Header, Footer, CallbackModal, SectionHead, CtaBand, Page, useCallbackModal, PageHead });
