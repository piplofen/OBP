/* App shell: auth gate, sidebar, topbar, mobile bottom-tabs + drawer */

const NAV_ITEMS = [
  { k:'home', label:'Главная', icon:'home' },
  { k:'labs', label:'Исследования и анализы', icon:'flask', badge:2 },
  { k:'booking', label:'Запись на приём', icon:'calendar' },
  { k:'passes', label:'Пропуска', icon:'qr' },
  { k:'profile', label:'Профиль', icon:'user' },
];
const PAGE_TITLE = {
  home:['Личный кабинет','Главная'],
  labs:['Медкарта','Исследования и анализы'],
  booking:['Запись','Запись на приём'],
  passes:['Доступ','Пропуска'],
  profile:['Аккаунт','Профиль пациента'],
};

function Toast({ msg }){
  if(!msg) return null;
  return <div className="toast"><Icon name="check" size={18} stroke={2.3}/> {msg}</div>;
}

function Shell(){
  const [route,setRoute]=useState('home');
  const [cars,setCars]=useState(CARS_INIT);
  const [toastMsg,setToastMsg]=useState(null);
  const [drawer,setDrawer]=useState(false);
  const tRef=useRef(null);
  const toast=(m)=>{ setToastMsg(m); clearTimeout(tRef.current); tRef.current=setTimeout(()=>setToastMsg(null),2600); };
  const go=(r)=>{ setRoute(r); setDrawer(false); window.scrollTo(0,0); };

  const [bc,title]=PAGE_TITLE[route];

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sb-brand">
          <img src="assets/obp-emblem.png" alt="ОБП"/>
          <div><b>ОБП</b><span>Личный кабинет</span></div>
        </div>
        <nav className="sb-nav">
          {NAV_ITEMS.map(n=>(
            <button key={n.k} className={'sb-link'+(route===n.k?' on':'')} onClick={()=>go(n.k)}>
              <Icon name={n.icon} size={20}/> {n.label}
              {n.badge && <span className="bdg">{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="sb-user">
            <div className="av">{PATIENT.initials}</div>
            <div style={{minWidth:0}}><div className="nm">{PATIENT.short}</div><div className="sub">№ {PATIENT.card}</div></div>
            <button className="sb-logout" title="Выйти" onClick={()=>window.__logout()}><Icon name="logout" size={18}/></button>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar2">
          <button className="icbtn menubtn2" onClick={()=>setDrawer(true)} aria-label="Меню"><Icon name="menu" size={22}/></button>
          <div className="pg"><div className="bc">{bc}</div><h1>{title}</h1></div>
          <div className="tb-actions">
            <button className="icbtn" title="Уведомления" onClick={()=>toast('Новых уведомлений нет')}><Icon name="bell" size={20}/><span className="dot"></span></button>
            <button className="icbtn" title="Выйти" onClick={()=>window.__logout()}><Icon name="logout" size={20}/></button>
          </div>
        </header>
        <main className="content">
          {route==='home' && <Dashboard go={go} cars={cars}/>}
          {route==='labs' && <Labs toast={toast}/>}
          {route==='booking' && <Booking toast={toast}/>}
          {route==='passes' && <Passes cars={cars} setCars={setCars} toast={toast}/>}
          {route==='profile' && <Profile toast={toast}/>}
        </main>
      </div>

      {/* mobile bottom tabs */}
      <nav className="tabbar">
        {NAV_ITEMS.map(n=>(
          <button key={n.k} className={'tab'+(route===n.k?' on':'')} onClick={()=>go(n.k)}>
            <span className="ti"><Icon name={n.icon} size={22}/></span>
            {n.k==='labs'?'Медкарта':n.k==='booking'?'Запись':n.label}
          </button>
        ))}
      </nav>

      {drawer && (
        <div className="mob-menu" onMouseDown={e=>{ if(e.target===e.currentTarget) setDrawer(false); }}>
          <div className="panel">
            <div className="sb-brand"><img src="assets/obp-emblem.png" alt="ОБП"/><div><b>ОБП</b><span>Личный кабинет</span></div></div>
            <nav className="sb-nav">
              {NAV_ITEMS.map(n=>(
                <button key={n.k} className={'sb-link'+(route===n.k?' on':'')} onClick={()=>go(n.k)}><Icon name={n.icon} size={20}/> {n.label}{n.badge && <span className="bdg">{n.badge}</span>}</button>
              ))}
            </nav>
            <div className="sb-foot"><div className="sb-user"><div className="av">{PATIENT.initials}</div><div style={{minWidth:0}}><div className="nm">{PATIENT.short}</div><div className="sub">№ {PATIENT.card}</div></div><button className="sb-logout" onClick={()=>window.__logout()}><Icon name="logout" size={18}/></button></div></div>
          </div>
        </div>
      )}

      <Toast msg={toastMsg}/>
    </div>
  );
}

function App(){
  const [view,setView]=useState('login'); // login | forgot | app
  window.__logout=()=>setView('login');
  if(view==='app') return <Shell/>;
  if(view==='forgot') return <Forgot goBack={()=>setView('login')}/>;
  return <Login onLogin={()=>setView('app')} goForgot={()=>setView('forgot')}/>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
