/* Portal screens: Dashboard, Labs, Booking, Passes, Profile */

function StatusPill({ status }){
  if(status==='ready') return <span className="pill pill--ok"><Icon name="check" size={13} stroke={2.4}/> Готов</span>;
  if(status==='wait') return <span className="pill pill--wait"><Icon name="clock" size={13}/> В работе</span>;
  return <span className="pill pill--ink">{status}</span>;
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ go, cars }){
  const lab3 = LAB_ANALYSES.slice(0,3);
  const st3 = STUDIES.slice(0,3);
  const car = cars[cars.length-1];
  return (
    <div className="content-wrap rise">
      <div className="dash-hero">
        <div className="glow"></div>
        <div className="eyebrow">Личный кабинет</div>
        <h2>Здравствуйте, {PATIENT.short}</h2>
        <p>Два результата готовы, ближайший приём — 9 июня. Всё под рукой: анализы, запись и пропуск.</p>
        <div className="row">
          <button className="btn btn--gold" onClick={()=>go('booking')}><Icon name="calendar" size={18}/> Записаться на приём</button>
          <button className="btn btn--soft" onClick={()=>go('labs')}><Icon name="flask" size={18}/> Мои результаты</button>
        </div>
      </div>

      <div className="grid-2" style={{marginBottom:20}}>
        {/* Analyses */}
        <div className="card card-pad">
          <div className="card-head">
            <h4>Последние анализы</h4>
            <button className="linkbtn" onClick={()=>go('labs')}>Все <span><Icon name="arrow" size={15} stroke={2}/></span></button>
          </div>
          {lab3.map(a=>(
            <div className="lrow" key={a.id}>
              <div className="ic"><Icon name="drop" size={20}/></div>
              <div className="lr-main">
                <div className="lr-nm">{a.nm}</div>
                <div className="lr-meta">{a.date} · {a.cat}</div>
              </div>
              <div className="lr-right"><StatusPill status={a.status}/></div>
            </div>
          ))}
        </div>
        {/* Studies */}
        <div className="card card-pad">
          <div className="card-head">
            <h4>Исследования</h4>
            <button className="linkbtn" onClick={()=>go('labs')}>Все <span><Icon name="arrow" size={15} stroke={2}/></span></button>
          </div>
          {st3.map(s=>(
            <div className="lrow" key={s.id}>
              <div className="ic"><Icon name={s.icon} size={20}/></div>
              <div className="lr-main">
                <div className="lr-nm">{s.nm}</div>
                <div className="lr-meta">{s.date} · {s.doc}</div>
              </div>
              <div className="lr-right"><StatusPill status={s.status}/></div>
            </div>
          ))}
        </div>
      </div>

      {/* latest pass */}
      <div className="sec2"><div><h3>Действующий пропуск</h3><div className="sub">Покажите QR-код на входе в здание</div></div>
        <button className="linkbtn" onClick={()=>go('passes')}>Управление <span><Icon name="arrow" size={15} stroke={2}/></span></button></div>
      <div className="pass">
        <div className="glow"></div>
        <div className="pt"><span className="lbl">Электронный пропуск</span><span className="st pill pill--new" style={{background:'rgba(208,189,148,.16)',color:'var(--gold-hi)'}}>Действует до 31.12.2026</span></div>
        <div className="pbody">
          <div className="qr"><QR value={PATIENT.card+'|pass'} size={118}/></div>
          <div className="pinfo">
            <div className="nm">{PATIENT.name}</div>
            <div className="meta">Карта пациента <b>№ {PATIENT.card}</b><br/>Тип: <b>Постоянный · въезд на территорию</b></div>
            {car && (
              <div className="pcars" style={{marginTop:14,paddingTop:14}}>
                <div className="ttl">Автомобиль на пропуске</div>
                <span className="car-chip"><span className="plate">{car.plate}</span> {car.brand} {car.model}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- LABS ---------- */
function Labs({ toast }){
  const [tab,setTab]=useState('analyses');
  const data = tab==='analyses'?LAB_ANALYSES:STUDIES;
  return (
    <div className="content-wrap rise">
      <div className="seg" style={{display:'inline-flex',background:'var(--surface-2)',borderRadius:'var(--r-full)',padding:4,gap:4,marginBottom:22}}>
        <button onClick={()=>setTab('analyses')} style={segBtn(tab==='analyses')}>Анализы</button>
        <button onClick={()=>setTab('studies')} style={segBtn(tab==='studies')}>Исследования</button>
      </div>
      <div className="card card-pad">
        {data.map(item=>(
          <div className="lrow" key={item.id}>
            <div className="ic"><Icon name={tab==='analyses'?'drop':(item.icon||'scan')} size={20}/></div>
            <div className="lr-main">
              <div className="lr-nm">{item.nm}</div>
              <div className="lr-meta">{item.date} · {tab==='analyses'?item.cat:item.doc}</div>
            </div>
            <div className="lr-right">
              {tab==='analyses' && item.status==='ready' && <span className="lr-val" style={{color: item.val==='норма'?'var(--green)':(item.val==='погранично'?'var(--amber)':'var(--ink)')}}>{item.val}</span>}
              <StatusPill status={item.status}/>
              {item.status==='ready' && <button className="icbtn" style={{width:40,height:40}} title="Скачать PDF" onClick={()=>toast('Результат загружается…')}><Icon name="download" size={18}/></button>}
            </div>
          </div>
        ))}
      </div>
      <p className="muted" style={{fontSize:13,marginTop:16,textAlign:'center'}}>Готовые результаты доступны для скачивания в PDF и отправляются на {PATIENT.email}</p>
    </div>
  );
}
function segBtn(on){ return { border:'none',background:on?'var(--canvas)':'transparent',padding:'10px 20px',borderRadius:'var(--r-full)',fontSize:14,fontWeight:600,color:on?'var(--ink)':'var(--muted)',cursor:'pointer',boxShadow:on?'var(--shadow-1)':'none',transition:'.18s' }; }

/* ---------- BOOKING with schedule grid ---------- */
function Booking({ toast }){
  const [doc,setDoc]=useState(null);
  const [sel,setSel]=useState(null); // {day,time}
  const [busy] = useState(()=>{ const b={}; [ '0-10:00','1-09:00','1-11:00','2-15:00','3-10:00','4-12:00','5-09:00','0-16:00','3-16:00' ].forEach(k=>b[k]=1); return b; });
  const days = useMemo(()=>nextWorkDays(6),[]);
  const confirm=()=>{ const d=days[sel.day]; toast(`Записаны: ${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}, ${sel.time}`); setSel(null); setDoc(null); };

  return (
    <div className="content-wrap rise">
      {APPTS.length>0 && (
        <div style={{marginBottom:26}}>
          <div className="sec2"><div><h3>Ближайшие приёмы</h3></div></div>
          <div className="grid-2">
            {APPTS.map(a=>(
              <div className="appt" key={a.id}>
                <div className="date"><div className="d">{a.d}</div><div className="m">{a.m}</div></div>
                <div className="a-main"><div className="a-nm">{a.nm}</div><div className="a-meta">{a.meta}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sec2"><div><h3>Новая запись</h3><div className="sub">Выберите специалиста и время в сетке расписания</div></div></div>
      <div className="doc-list" style={{marginBottom:22}}>
        {DOCTORS.map(d=>(
          <button className={'doc'+(doc&&doc.id===d.id?' on':'')} key={d.id} onClick={()=>{ setDoc(d); setSel(null); }}>
            <div className="av">{d.av}</div>
            <div className="d-main"><div className="d-nm">{d.nm}</div><div className="d-spec">{d.spec}</div><div className="d-meta">{d.meta}</div></div>
            <Icon name="chevron" size={20} cls="d-go"/>
          </button>
        ))}
      </div>

      {doc && (
        <div className="card card-pad rise">
          <div className="card-head" style={{marginBottom:14}}>
            <h4>Расписание · {doc.spec}</h4>
            <span className="muted" style={{fontSize:13}}>{doc.nm.split(' ').slice(0,2).join(' ')}</span>
          </div>
          <div className="sched-scroll scroll-thin">
            <div className="sched-grid">
              <div className="corner"></div>
              {days.map((d,i)=>(<div className="sched-day" key={i}><div className="dow">{DOW[d.getDay()]}</div><div className="dn">{d.getDate()}</div><div className="mo">{MON[d.getMonth()]}</div></div>))}
              {TIMES.map(t=>(
                <React.Fragment key={t}>
                  <div className="sched-time">{t}</div>
                  {days.map((d,di)=>{
                    const key=di+'-'+t; const isBusy=!!busy[key]; const on=sel&&sel.day===di&&sel.time===t;
                    return <button key={key} className={'slot2'+(on?' on':'')+(isBusy?' busy':'')} disabled={isBusy} onClick={()=>setSel({day:di,time:t})}>{isBusy?'—':t}</button>;
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginTop:20,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:180}}>
              {sel ? (
                <div style={{fontSize:14}}><span className="muted">Выбрано: </span><b>{DOW[days[sel.day].getDay()]}, {days[sel.day].getDate()} {MON[days[sel.day].getMonth()]} · {sel.time}</b></div>
              ) : <span className="muted" style={{fontSize:14}}>Выберите свободное время в сетке</span>}
            </div>
            <button className="btn btn--gold" disabled={!sel} onClick={confirm}>Записаться <Icon name="arrow" size={17} stroke={2}/></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- PASSES + add car ---------- */
function Passes({ cars, setCars, toast }){
  const [open,setOpen]=useState(false);
  return (
    <div className="content-wrap rise">
      <div className="grid-2" style={{alignItems:'start'}}>
        <div className="pass">
          <div className="glow"></div>
          <div className="pt"><span className="lbl">Электронный пропуск</span><span className="st" style={{fontSize:11,color:'var(--gold-hi)'}}>Действует до 31.12.2026</span></div>
          <div className="pbody">
            <div className="qr"><QR value={PATIENT.card+'|main'} size={132}/></div>
            <div className="pinfo">
              <div className="nm">{PATIENT.name}</div>
              <div className="meta">Карта пациента <b>№ {PATIENT.card}</b><br/>Постоянный · въезд на территорию</div>
            </div>
          </div>
          <div className="pcars">
            <div className="ttl">Автомобили на пропуске · {cars.length}</div>
            {cars.length===0 && <div style={{fontSize:13,color:'#a59c88'}}>Автомобиль не добавлен</div>}
            {cars.map(c=>(
              <span className="car-chip" key={c.id}>
                <span className="plate">{c.plate}</span> {c.brand} {c.model}
                <button onClick={()=>{ setCars(cars.filter(x=>x.id!==c.id)); toast('Автомобиль удалён'); }} style={{border:'none',background:'none',color:'#a59c88',cursor:'pointer',display:'flex',padding:0,marginLeft:2}}><Icon name="x" size={15}/></button>
              </span>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head"><h4>Доступ и автомобили</h4></div>
          <div className="kv">
            <div className="k"><span className="key">Тип пропуска</span><span className="val">Постоянный</span></div>
            <div className="k"><span className="key">Зона</span><span className="val">Территория · Поликлиника</span></div>
            <div className="k"><span className="key">Парковка</span><span className="val">Гостевая, 4 часа</span></div>
            <div className="k"><span className="key">Действует до</span><span className="val">31.12.2026</span></div>
          </div>
          <button className="btn btn--gold btn--block" style={{marginTop:18}} onClick={()=>setOpen(true)}><Icon name="plus" size={18} stroke={2}/> Добавить автомобиль</button>
          <p className="muted" style={{fontSize:12.5,marginTop:14,textAlign:'center'}}>Добавьте до 2 автомобилей для въезда на территорию больницы</p>
        </div>
      </div>
      {open && <AddCarModal onClose={()=>setOpen(false)} onAdd={(c)=>{ setCars([...cars,{...c,id:Date.now()}]); setOpen(false); toast('Автомобиль добавлен к пропуску'); }} disabled={cars.length>=2}/>}
    </div>
  );
}

function AddCarModal({ onClose, onAdd, disabled }){
  const [plate,setPlate]=useState(''); const [brand,setBrand]=useState(''); const [model,setModel]=useState('');
  const [err,setErr]=useState({});
  const fmtPlate=(v)=>v.toUpperCase().replace(/[^А-ЯA-Z0-9 ]/g,'').slice(0,12);
  const submit=()=>{ const er={}; if(plate.replace(/\s/g,'').length<6) er.plate='Укажите госномер'; if(!brand.trim()) er.brand='Укажите марку'; setErr(er); if(Object.keys(er).length===0) onAdd({plate,brand,model:model||''}); };
  return (
    <div className="ov" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="m-head"><span className="t">Добавить автомобиль</span><button className="mclose" onClick={onClose}><Icon name="x" size={20}/></button></div>
        <div className="m-body">
          {disabled ? <div className="empty">Достигнут лимит автомобилей на пропуске (2).</div> : (
            <>
              <div className="field"><label>Государственный номер</label><input className={err.plate?'err':''} value={plate} onChange={e=>setPlate(fmtPlate(e.target.value))} placeholder="А 000 АА 199" style={{textTransform:'uppercase',fontVariantNumeric:'tabular-nums',fontWeight:600}}/>{err.plate && <div className="msg">{err.plate}</div>}</div>
              <div className="field-row">
                <div className="field"><label>Марка</label><input className={err.brand?'err':''} value={brand} onChange={e=>setBrand(e.target.value)} placeholder="Mercedes-Benz"/>{err.brand && <div className="msg">{err.brand}</div>}</div>
                <div className="field"><label>Модель <span className="muted" style={{fontWeight:400}}>— необяз.</span></label><input value={model} onChange={e=>setModel(e.target.value)} placeholder="E-class"/></div>
              </div>
              <div style={{display:'flex',gap:11,alignItems:'flex-start',padding:'13px 15px',background:'var(--surface)',borderRadius:'var(--r-sm)'}}>
                <Icon name="shield" size={19} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:1}}/>
                <p className="muted" style={{margin:0,fontSize:12.5,lineHeight:1.5}}>Номер проверяется службой безопасности. Въезд откроется после согласования (обычно в течение часа).</p>
              </div>
            </>
          )}
        </div>
        {!disabled && <div className="m-foot"><button className="btn btn--ghost" onClick={onClose}>Отмена</button><button className="btn btn--gold" onClick={submit}>Добавить</button></div>}
      </div>
    </div>
  );
}

/* ---------- PROFILE ---------- */
function Profile({ toast }){
  return (
    <div className="content-wrap rise">
      <div className="prof-head">
        <div className="av">{PATIENT.initials}</div>
        <div>
          <div className="ph-nm serif">{PATIENT.name}</div>
          <div className="ph-sub">Карта пациента № {PATIENT.card} · {PATIENT.birth}</div>
        </div>
        <button className="btn btn--ghost btn--sm" style={{marginLeft:'auto'}} onClick={()=>toast('Редактирование профиля')}><Icon name="edit" size={16}/> Изменить</button>
      </div>
      <div className="grid-2" style={{alignItems:'start'}}>
        <div className="card card-pad">
          <div className="card-head"><h4>Контактные данные</h4></div>
          <div className="kv">
            <div className="k"><span className="key"><Icon name="phone" size={15} style={{verticalAlign:'-2px',marginRight:7,color:'var(--gold-deep)'}}/>Телефон</span><span className="val">{PATIENT.phone}</span></div>
            <div className="k"><span className="key"><Icon name="mail" size={15} style={{verticalAlign:'-2px',marginRight:7,color:'var(--gold-deep)'}}/>E-mail</span><span className="val">{PATIENT.email}</span></div>
            <div className="k"><span className="key"><Icon name="mappin" size={15} style={{verticalAlign:'-2px',marginRight:7,color:'var(--gold-deep)'}}/>Прикрепление</span><span className="val" style={{maxWidth:'60%'}}>{PATIENT.attached}</span></div>
            <div className="k"><span className="key"><Icon name="user" size={15} style={{verticalAlign:'-2px',marginRight:7,color:'var(--gold-deep)'}}/>Лечащий врач</span><span className="val">{PATIENT.doctor}</span></div>
          </div>
        </div>
        <div className="card card-pad">
          <div className="card-head"><h4>Документы</h4></div>
          <div className="kv">
            <div className="k"><span className="key">Дата рождения</span><span className="val">{PATIENT.birth}</span></div>
            <div className="k"><span className="key">Полис ОМС/ДМС</span><span className="val num">{PATIENT.policy}</span></div>
            <div className="k"><span className="key">СНИЛС</span><span className="val num">{PATIENT.snils}</span></div>
            <div className="k"><span className="key">Карта пациента</span><span className="val num">№ {PATIENT.card}</span></div>
          </div>
        </div>
      </div>
      <div className="card card-pad" style={{marginTop:20}}>
        <div className="card-head"><h4>Безопасность</h4></div>
        <div className="kv">
          <div className="k"><span className="key">Пароль</span><button className="linkbtn" onClick={()=>toast('Смена пароля')}>Изменить пароль</button></div>
          <div className="k"><span className="key">Вход по SMS-коду</span><span className="pill pill--ok">Включён</span></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{ Dashboard, Labs, Booking, Passes, Profile });
