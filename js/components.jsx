/* Page sections: nav, hero, trust, directions, prices, footer. */

const RUBc = n => n.toLocaleString('ru-RU') + ' ₽';

/* ---------------- NAV ---------------- */
function Nav({ onBook, onMenu }){
  const [menu, setMenu] = useState(null);
  const cur = NAV.find(n=>n.k===menu);
  return (
    <header className="nav" onMouseLeave={()=>setMenu(null)}>
      <div className="wrap">
        <a className="brand" href="#top">
          <img src="assets/obp-emblem.png" alt="Эмблема ОБП"/>
          <span className="bt">
            <b>ОБП</b>
            <span>Управление делами Президента РФ</span>
          </span>
        </a>
        <nav className="mainnav">
          {NAV.map(n=>(
            <span key={n.k} className={'navlink'+(menu===n.k?' open':'')} onMouseEnter={()=>setMenu(n.k)}>
              {n.k} <Icon name="chevron" size={14} className="caret"/>
            </span>
          ))}
          <a className="navlink" href="#price">Прейскурант</a>
        </nav>
        <div className="nav-actions">
          <div className="nav-phone">
            <b>+7 (495) 982-10-90</b>
            <span>Ежедневно, круглосуточно</span>
          </div>
          <a className="btn btn--ghost btn--sm" href="https://lk.kremlinmed.ru" target="_blank" rel="noreferrer">Личный кабинет</a>
          <button className="btn btn--gold btn--sm" onClick={()=>onBook(null,'analyses')}>Записаться</button>
          <button className="menubtn" onClick={onMenu} aria-label="Меню"><Icon name="menu" size={22}/></button>
        </div>
      </div>
      {cur && (
        <div className="mega" onMouseLeave={()=>setMenu(null)}>
          <div className="wrap">
            {cur.cols.map(col=>(
              <div key={col.h}>
                <h4>{col.h}</h4>
                <ul>
                  {col.items.map(it=>(
                    <li key={it}><a href="#" onClick={e=>e.preventDefault()}>{it}<span className="ar"><Icon name="arrow" size={15} stroke={2}/></span></a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mega-feature">
              <Icon name="spark" size={24} style={{color:'var(--gold-deep)'}}/>
              <div style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:21,marginTop:'auto',lineHeight:1.15}}>Не знаете, к кому записаться?</div>
              <p className="muted" style={{fontSize:13.5,margin:'8px 0 16px'}}>Подберём специалиста и программу обследования за один звонок.</p>
              <button className="btn btn--ink btn--sm" onClick={()=>onBook(null,'doctors')}>Подобрать приём</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO + quick book ---------------- */
function QuickBook({ onBook }){
  const [q, setQ] = useState('');
  const [sel, setSel] = useState({});
  const pop = useMemo(()=>ANALYSES.filter(a=>a.pop).slice(0,4),[]);
  const list = useMemo(()=>{
    const f=q.trim().toLowerCase();
    if(!f) return pop;
    return ANALYSES.filter(a=>a.nm.toLowerCase().includes(f)).slice(0,5);
  },[q,pop]);
  const items = Object.values(sel);
  const total = items.reduce((s,x)=>s+x.price,0);
  const toggle = it => setSel(c=>{ const n={...c}; if(n[it.id]) delete n[it.id]; else n[it.id]=it; return n; });
  return (
    <div className="qbook rise" style={{animationDelay:'.1s'}}>
      <div className="qbook-top">
        <span className="t">Быстрая запись на анализы</span>
        <span className="badge">2 минуты</span>
      </div>
      <div className="qsearch">
        <Icon name="search" size={20} style={{color:'var(--gold-deep)'}}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Какой анализ нужен? Напр. «витамин D»"/>
      </div>
      <div className="qb-suggest">
        <div className="lab">{q?'Найдено':'Чаще всего выбирают'}</div>
        {list.length===0 && <div className="qb-row"><span className="muted" style={{fontSize:14}}>Ничего не найдено — откройте полный каталог.</span></div>}
        {list.map(it=>{
          const on=!!sel[it.id];
          return (
            <div className="qb-row" key={it.id}>
              <span className="nm">{it.nm}</span>
              <span className="pr">{RUBc(it.price)}</span>
              <button className={'qb-add'+(on?' added':'')} onClick={()=>toggle(it)} aria-label="Добавить">
                <Icon name={on?'check':'plus'} size={16} stroke={2.2}/>
              </button>
            </div>
          );
        })}
      </div>
      <div className="qbook-foot">
        <div className="total">
          {items.length>0 ? `${items.length} в заявке` : 'Выберите анализы'}
          <b>{RUBc(total)}</b>
        </div>
        <button className="btn btn--gold" onClick={()=>onBook(items,'analyses')}>
          {items.length>0 ? 'Перейти к оплате' : 'Открыть каталог'} <Icon name="arrow" size={17} stroke={2}/>
        </button>
      </div>
    </div>
  );
}

function Hero({ onBook }){
  return (
    <section className="hero" id="top">
      <div className="hero-glow"></div>
      <div className="wrap">
        <div className="rise">
          <div className="hero-eyebrow">
            <span className="kicker-line"></span>
            <span className="eyebrow">Объединённая больница с поликлиникой</span>
          </div>
          <h1>Сдать анализы и&nbsp;записаться к&nbsp;врачу — <em>за пару минут</em></h1>
          <p className="hero-sub">Клиника Управления делами Президента РФ на Мичуринском проспекте. Выбор услуг, время и оплата — онлайн, без очередей и звонков.</p>
          <div className="hero-cta">
            <button className="btn btn--gold btn--lg" onClick={()=>onBook(null,'analyses')}>
              <Icon name="flask" size={19}/> Записаться на анализы
            </button>
            <button className="btn btn--ghost btn--lg" onClick={()=>onBook(null,'doctors')}>
              <Icon name="stethoscope" size={19}/> Приём врача
            </button>
          </div>
          <div className="hero-chips">
            <a className="chip" href="https://lk.kremlinmed.ru" target="_blank" rel="noreferrer"><Icon name="doc" size={16}/> Результаты анализов</a>
            <button className="chip" onClick={()=>onBook(null,'analyses')}><Icon name="home" size={16}/> Вызов на дом</button>
            <a className="chip" href="#price"><Icon name="card" size={16}/> Прейскурант</a>
          </div>
        </div>
        <QuickBook onBook={onBook}/>
      </div>
    </section>
  );
}

/* ---------------- TRUST band ---------------- */
function Trust(){
  const stats = [
    { n:'50+', e:'', c:'лет в системе кремлёвской медицины' },
    { n:'320', e:'', c:'врачей и научных сотрудников' },
    { n:'40', e:'+', c:'медицинских специальностей' },
    { n:'24/7', e:'', c:'неотложная помощь и стационар' },
  ];
  return (
    <div className="trust">
      <div className="wrap">
        {stats.map((s,i)=>(
          <div className="t" key={i}>
            <div className="n num">{s.n}<em>{s.e}</em></div>
            <div className="c">{s.c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- DIRECTIONS ---------------- */
function Directions({ onBook }){
  return (
    <section className="section" id="directions">
      <div className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">Направления</span>
            <h2>Вся медицина — в одном здании</h2>
            <p>От первичной консультации до операции и восстановления. Выберите направление или сразу запишитесь на нужную услугу.</p>
          </div>
          <button className="linkbtn" onClick={()=>onBook(null,'doctors')}>Все услуги <span><Icon name="arrow" size={16} stroke={2}/></span></button>
        </div>
        <div className="dir-grid">
          {DIRECTIONS.map((d,i)=>(
            <article className="dir" key={i} onClick={()=>onBook(null, d.t==='Поликлиника'||d.t==='Чек-апы'?'doctors':'analyses')}>
              <span className="go"><Icon name="upright" size={20} stroke={1.8}/></span>
              <div className="ico"><Icon name={d.ic} size={24}/></div>
              <h3>{d.t}</h3>
              <p>{d.d}</p>
              <span className="cnt">{d.cnt}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICE teaser ---------------- */
function PriceTeaser({ onBook }){
  const pop = ANALYSES.filter(a=>['oak','bio','vitd','ttg','lip','psa'].includes(a.id));
  return (
    <section className="section section--soft" id="price">
      <div className="wrap">
        <div className="sec-head">
          <div className="l">
            <span className="eyebrow">Прейскурант</span>
            <h2>Прозрачные цены на анализы</h2>
            <p>Стоимость известна заранее — добавьте нужное и оплатите онлайн. Срок готовности указан для каждого исследования.</p>
          </div>
          <button className="linkbtn" onClick={()=>onBook(null,'analyses')}>Весь каталог <span><Icon name="arrow" size={16} stroke={2}/></span></button>
        </div>
        <div className="price-wrap">
          <div className="pricelist">
            {pop.map(it=>(
              <div className="prow" key={it.id}>
                <div className="info">
                  <div className="nm">{it.nm}</div>
                  <div className="meta">{it.meta}</div>
                </div>
                <div className="price">{it.price.toLocaleString('ru-RU')} <small>₽</small></div>
                <button className="addbtn" onClick={()=>onBook([it],'analyses')}>
                  <Icon name="plus" size={15} stroke={2}/> Добавить
                </button>
              </div>
            ))}
          </div>
          <div className="price-side">
            <div className="panel">
              <h3>Комплексный чек-ап за один визит</h3>
              <p>Программа обследования организма: анализы, УЗИ и консультация терапевта в течение 2–3 часов.</p>
              {['Готовый набор исследований','Заключение врача в тот же день','Результаты в личном кабинете'].map(f=>(
                <div className="feat" key={f}><Icon name="check" size={18} stroke={2}/> {f}</div>
              ))}
              <button className="btn btn--gold btn--block" style={{marginTop:24}} onClick={()=>onBook(null,'doctors')}>Выбрать программу</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ASSURANCE strip ---------------- */
function Assurance(){
  const items = [
    { ic:'shield', t:'Кремлёвский стандарт', d:'Протоколы и оснащение медицины Управления делами Президента РФ.' },
    { ic:'doc', t:'Результаты онлайн', d:'Анализы и заключения приходят в личный кабинет и на e-mail.' },
    { ic:'clock', t:'Без очередей', d:'Запись по времени — вас примут в назначенный интервал.' },
    { ic:'home', t:'Выезд на дом', d:'Забор анализов и осмотр врача на дому по Москве и области.' },
  ];
  return (
    <section className="section" style={{paddingBottom:0}}>
      <div className="wrap">
        <div className="assure">
          {items.map((a,i)=>(
            <div className="a" key={i}>
              <div className="ic"><Icon name={a.ic} size={26}/></div>
              <h4>{a.t}</h4>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
function CtaBand({ onBook }){
  return (
    <section className="section">
      <div className="wrap">
        <div className="ctaband">
          <div className="glow"></div>
          <h2>Запишитесь на анализы прямо сейчас</h2>
          <p>Выберите исследования, удобное время и оплатите онлайн. Весь путь занимает около двух минут.</p>
          <div className="row">
            <button className="btn btn--gold btn--lg" onClick={()=>onBook(null,'analyses')}><Icon name="flask" size={19}/> Записаться на анализы</button>
            <a className="btn btn--lg" href="tel:+74959821090" style={{background:'rgba(255,255,255,.08)',color:'#f1e9d8',border:'1px solid rgba(255,255,255,.18)'}}><Icon name="phone" size={18}/> +7 (495) 982-10-90</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer(){
  const socials=[['vk','ВКонтакте'],['tg','Telegram'],['yt','YouTube'],['dzen','Дзен']];
  return (
    <footer className="footer" id="contacts">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="assets/obp-logo-full.png" alt="Объединённая больница с поликлиникой УДП РФ"/>
            <p>ФГБУ «Объединённая больница с поликлиникой» Управления делами Президента Российской Федерации.</p>
            <div className="socials">
              {socials.map(([k,t])=>(
                <a key={k} href="#" onClick={e=>e.preventDefault()} aria-label={t} title={t}><Icon name={k} size={20}/></a>
              ))}
            </div>
          </div>
          <div className="footcol">
            <h5>Пациентам</h5>
            <ul>
              <li><a href="#price">Прейскурант</a></li>
              <li><a href="https://lk.kremlinmed.ru" target="_blank" rel="noreferrer">Личный кабинет</a></li>
              <li><a href="#">Результаты анализов</a></li>
              <li><a href="#">Подготовка к исследованиям</a></li>
              <li><a href="#">Платные услуги</a></li>
              <li><a href="#">Отзывы</a></li>
            </ul>
          </div>
          <div className="footcol">
            <h5>Клиника</h5>
            <ul>
              <li><a href="#directions">Направления</a></li>
              <li><a href="#">О больнице</a></li>
              <li><a href="#">Лицензии</a></li>
              <li><a href="#">Документы</a></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Страховым компаниям</a></li>
            </ul>
          </div>
          <div className="footcol foot-contact">
            <h5>Контакты</h5>
            <div className="ln"><span className="muted">Справочная, круглосуточно</span><b>+7 (495) 982-10-90</b></div>
            <div className="ln" style={{display:'flex',gap:10}}><Icon name="mappin" size={18} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/><span>г. Москва, Мичуринский проспект, д. 6</span></div>
            <div className="ln" style={{display:'flex',gap:10}}><Icon name="mail" size={18} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/><span>info@fgu-obp.ru</span></div>
            <div className="ln" style={{display:'flex',gap:10}}><Icon name="clock" size={18} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/><span>Поликлиника: Пн–Пт 8:00–20:00, Сб 9:00–15:00</span></div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="cp">© {new Date().getFullYear()} ФГБУ «ОБП» УДП РФ. Все права защищены.</span>
          <div className="lks">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Согласие на обработку ПДн</a>
            <a href="#">Правовая информация</a>
            <a href="#">Карта сайта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Mobile drawer ---------------- */
function MobileDrawer({ open, onClose, onBook }){
  if(!open) return null;
  return (
    <div className="mdrawer" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="panel">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <span className="eyebrow">Меню</span>
          <button className="bk-close" onClick={onClose} style={{width:40,height:40}}><Icon name="x" size={19}/></button>
        </div>
        {['Поликлиника','Диагностика','Анализы','Стационар','Прейскурант','Контакты'].map(k=>(
          <a key={k} className="mlink" href={k==='Прейскурант'?'#price':k==='Контакты'?'#contacts':'#directions'} onClick={onClose}>{k}</a>
        ))}
        <button className="btn btn--gold btn--block" style={{marginTop:20}} onClick={()=>{ onClose(); onBook(null,'analyses'); }}>Записаться на анализы</button>
        <a className="btn btn--ghost btn--block" style={{marginTop:10}} href="https://lk.kremlinmed.ru" target="_blank" rel="noreferrer">Личный кабинет</a>
        <div style={{marginTop:22,textAlign:'center'}}>
          <a href="tel:+74959821090" style={{fontWeight:700,fontSize:18}}>+7 (495) 982-10-90</a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Trust, Directions, PriceTeaser, Assurance, CtaBand, Footer, MobileDrawer });
