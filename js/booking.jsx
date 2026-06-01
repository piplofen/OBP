/* Booking + payment slide-over — the core patient path:
   choose services → time → details → pay → confirmation. */

const { useState, useMemo, useEffect, useRef } = React;

const RUB = n => n.toLocaleString('ru-RU') + ' ₽';
const DOW = ['вс','пн','вт','ср','чт','пт','сб'];
const MON = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];

function nextDays(count){
  const out = []; const d = new Date();
  while(out.length < count){
    d.setDate(d.getDate() + 1);
    if(d.getDay() !== 0) out.push(new Date(d)); // skip Sundays
  }
  return out;
}
const SLOTS = [
  {t:'08:00'},{t:'08:30'},{t:'09:00'},{t:'09:30',off:true},
  {t:'10:00'},{t:'10:30'},{t:'11:30',off:true},{t:'12:30'},
];

function Stepper({ step }){
  const labels = ['Услуги','Время','Данные','Оплата'];
  return (
    <div className="bk-steps">
      {labels.map((l,i)=>{
        const n = i+1;
        const cls = n===step ? 'active' : (n<step ? 'done' : '');
        return (
          <div key={l} className={'bk-step '+cls}>
            <span className="dot">{n<step ? <Icon name="check" size={13} stroke={2.2}/> : n}</span>
            <span className="lbl">{l}</span>
          </div>
        );
      })}
    </div>
  );
}

function Catalog({ mode, setMode, cart, toggle }){
  const [q, setQ] = useState('');
  const source = mode==='analyses' ? ANALYSES : DOCTORS;
  const list = useMemo(()=>{
    const f = q.trim().toLowerCase();
    return f ? source.filter(x=>x.nm.toLowerCase().includes(f) || x.cat.toLowerCase().includes(f)) : source;
  },[q,source]);
  const groups = useMemo(()=>{
    const m = {}; list.forEach(x=>{ (m[x.cat] = m[x.cat]||[]).push(x); }); return m;
  },[list]);

  return (
    <div>
      <div className="seg" role="tablist">
        <button className={mode==='analyses'?'on':''} onClick={()=>setMode('analyses')}>Анализы</button>
        <button className={mode==='doctors'?'on':''} onClick={()=>setMode('doctors')}>Приём врача</button>
      </div>
      <div className="cat-search">
        <Icon name="search" size={19} style={{color:'var(--muted)'}}/>
        <input value={q} onChange={e=>setQ(e.target.value)}
          placeholder={mode==='analyses' ? 'Найти анализ — напр. «витамин D»' : 'Найти врача или услугу'} />
      </div>
      {Object.keys(groups).length===0 && (
        <div className="empty-cart">Ничего не найдено. Уточните запрос.</div>
      )}
      {Object.entries(groups).map(([cat, items])=>(
        <div key={cat}>
          <div className="cat-cat">{cat}</div>
          {items.map(it=>{
            const on = !!cart[it.id];
            return (
              <div className="cat-item" key={it.id}>
                <div className="ci-main">
                  <div className="ci-nm">{it.nm}</div>
                  <div className="ci-meta">
                    <span>{it.meta}</span>
                    {it.pop && <span className="tag">Популярное</span>}
                  </div>
                </div>
                <div className="ci-right">
                  <div className="ci-price">{RUB(it.price)}</div>
                  <button className={'addbtn'+(on?' on':'')} onClick={()=>toggle(it)}>
                    <Icon name={on?'check':'plus'} size={15} stroke={2}/>
                    {on?'В заявке':'Добавить'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TimeStep({ mode, cart, removeId, atHome, setAtHome, day, setDay, slot, setSlot }){
  const days = useMemo(()=>nextDays(5),[]);
  const items = Object.values(cart);
  const total = items.reduce((s,x)=>s+x.price,0);
  return (
    <div>
      <div className="review-box">
        <div className="rb-h">{mode==='analyses'?'Выбранные анализы':'Выбранные услуги'} · {items.length}</div>
        {items.map(it=>(
          <div className="cline" key={it.id}>
            <span className="cl-nm">{it.nm}</span>
            <span className="cl-pr">{RUB(it.price)}</span>
            <button className="cl-x" onClick={()=>removeId(it.id)} aria-label="Убрать"><Icon name="x" size={14} stroke={2}/></button>
          </div>
        ))}
        <div className="review-total"><span className="k">Итого</span><span className="v">{RUB(total)}</span></div>
      </div>

      {mode==='analyses' && (
        <>
          <div className="cat-cat" style={{marginTop:4}}>Где сдать</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:8}}>
            <button className={'pay-opt'+(!atHome?' on':'')} style={{margin:0}} onClick={()=>setAtHome(false)}>
              <span className="radio"></span>
              <span className="po-main"><span className="po-t">В клинике</span><span className="po-s">Мичуринский пр-т, 6</span></span>
            </button>
            <button className={'pay-opt'+(atHome?' on':'')} style={{margin:0}} onClick={()=>setAtHome(true)}>
              <span className="radio"></span>
              <span className="po-main"><span className="po-t">Выезд на дом</span><span className="po-s">+1 500 ₽ к заказу</span></span>
            </button>
          </div>
        </>
      )}

      <div className="cat-cat">Дата</div>
      <div className="day-grid">
        {days.map((d,i)=>{
          const on = day===i;
          return (
            <button key={i} className={'day'+(on?' on':'')} onClick={()=>setDay(i)}>
              <span className="dow">{DOW[d.getDay()]}</span>
              <span className="dn">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      <div className="cat-cat">{mode==='analyses'?'Время забора':'Время приёма'}</div>
      <div className="slot-grid">
        {SLOTS.map(s=>(
          <button key={s.t} className={'slot'+(slot===s.t?' on':'')} disabled={s.off} onClick={()=>setSlot(s.t)}>{s.t}</button>
        ))}
      </div>
      <p className="muted" style={{fontSize:13,marginTop:14}}>
        {mode==='analyses'
          ? 'Натощак, с 8:00 до 11:00. Результаты придут в личный кабинет и на e-mail.'
          : 'Приём ведётся по предварительной записи. Возьмите паспорт и полис.'}
      </p>
    </div>
  );
}

function emptyForm(){ return { name:'', phone:'', email:'', birth:'' }; }

function DetailsStep({ form, setForm, errors }){
  const upd = (k,v)=>setForm(f=>({...f,[k]:v}));
  const phoneMask = v => {
    let d = v.replace(/\D/g,''); if(d.startsWith('8')) d='7'+d.slice(1); if(!d.startsWith('7')) d='7'+d; d=d.slice(0,11);
    let r='+7'; if(d.length>1) r+=' ('+d.slice(1,4); if(d.length>=4) r+=') '+d.slice(4,7); if(d.length>=7) r+='-'+d.slice(7,9); if(d.length>=9) r+='-'+d.slice(9,11);
    return r;
  };
  return (
    <div>
      <div className="field">
        <label>Фамилия, имя и отчество</label>
        <input className={errors.name?'err':''} value={form.name} onChange={e=>upd('name',e.target.value)} placeholder="Иванова Мария Сергеевна"/>
        {errors.name && <div className="msg">{errors.name}</div>}
      </div>
      <div className="field-row">
        <div className="field">
          <label>Телефон</label>
          <input className={errors.phone?'err':''} value={form.phone} inputMode="tel"
            onChange={e=>upd('phone',phoneMask(e.target.value))} placeholder="+7 (___) ___-__-__"/>
          {errors.phone && <div className="msg">{errors.phone}</div>}
        </div>
        <div className="field">
          <label>Дата рождения</label>
          <input className={errors.birth?'err':''} value={form.birth} inputMode="numeric"
            onChange={e=>{ let d=e.target.value.replace(/\D/g,'').slice(0,8); let r=d.slice(0,2); if(d.length>=3)r+='.'+d.slice(2,4); if(d.length>=5)r+='.'+d.slice(4,8); upd('birth',r); }}
            placeholder="дд.мм.гггг"/>
          {errors.birth && <div className="msg">{errors.birth}</div>}
        </div>
      </div>
      <div className="field">
        <label>E-mail <span className="muted" style={{fontWeight:400}}>— для результатов и чека</span></label>
        <input className={errors.email?'err':''} value={form.email} inputMode="email" onChange={e=>upd('email',e.target.value)} placeholder="mariya@example.ru"/>
        {errors.email && <div className="msg">{errors.email}</div>}
      </div>
      <div style={{display:'flex',gap:11,alignItems:'flex-start',marginTop:8,padding:'14px 16px',background:'var(--surface)',borderRadius:'var(--r-sm)'}}>
        <Icon name="shield" size={20} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:1}}/>
        <p className="muted" style={{margin:0,fontSize:13,lineHeight:1.5}}>Данные передаются по защищённому соединению и используются только для оформления записи.</p>
      </div>
    </div>
  );
}

function PayStep({ mode, cart, atHome, day, slot, form, pay, setPay, agree, setAgree, paying }){
  const days = useMemo(()=>nextDays(5),[]);
  const d = days[day];
  const items = Object.values(cart);
  const sub = items.reduce((s,x)=>s+x.price,0);
  const homeFee = (mode==='analyses' && atHome) ? 1500 : 0;
  const total = sub + homeFee;
  const dateStr = d ? `${d.getDate()} ${MON[d.getMonth()]}, ${slot}` : '—';
  const methods = [
    { k:'card', t:'Банковской картой', s:'Visa · Mastercard · МИР', ic:'card' },
    { k:'sbp', t:'СБП по QR-коду', s:'Перевод по Системе быстрых платежей', ic:'spark' },
    { k:'clinic', t:'Оплата в клинике', s:'Картой или наличными при визите', ic:'mappin' },
  ];
  return (
    <div>
      <div className="review-box">
        <div className="rb-h">Заявка</div>
        {items.map(it=>(
          <div className="review-line" key={it.id}><span className="k">{it.nm}</span><span className="v">{RUB(it.price)}</span></div>
        ))}
        {homeFee>0 && <div className="review-line"><span className="k">Выезд на дом</span><span className="v">{RUB(homeFee)}</span></div>}
        <div className="review-total"><span className="k">К оплате</span><span className="v">{RUB(total)}</span></div>
      </div>
      <div className="review-box">
        <div className="rb-h">Детали визита</div>
        <div className="review-line"><span className="k">{mode==='analyses'?'Дата забора':'Дата приёма'}</span><span className="v">{dateStr}</span></div>
        <div className="review-line"><span className="k">Место</span><span className="v">{(mode==='analyses'&&atHome)?'Выезд на дом':'Мичуринский пр-т, 6'}</span></div>
        <div className="review-line"><span className="k">Пациент</span><span className="v">{form.name||'—'}</span></div>
        <div className="review-line"><span className="k">Телефон</span><span className="v">{form.phone||'—'}</span></div>
      </div>

      <div className="cat-cat">Способ оплаты</div>
      {methods.map(m=>(
        <button key={m.k} className={'pay-opt'+(pay===m.k?' on':'')} onClick={()=>setPay(m.k)} disabled={paying}>
          <span className="radio"></span>
          <span className="po-main"><span className="po-t">{m.t}</span><span className="po-s">{m.s}</span></span>
          <Icon name={m.ic} size={22} style={{color:'var(--gold-deep)'}}/>
        </button>
      ))}

      <label style={{display:'flex',gap:11,alignItems:'flex-start',marginTop:14,cursor:'pointer'}}>
        <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} style={{marginTop:3,width:18,height:18,accentColor:'#7c6a4a'}}/>
        <span className="muted" style={{fontSize:13,lineHeight:1.5}}>Согласен с условиями оказания услуг и обработкой персональных данных.</span>
      </label>
      {paying && <div className="payload"><i></i></div>}
    </div>
  );
}

function SuccessStep({ mode, total, form, onClose }){
  const code = useMemo(()=>'ОБП-'+Math.floor(100000+Math.random()*899999),[]);
  return (
    <div className="bk-success">
      <div className="check"><Icon name="check" size={42} stroke={2.4} style={{color:'var(--on-gold)'}}/></div>
      <h3>Заявка оформлена</h3>
      <p>{mode==='analyses'?'Мы ждём вас на заборе анализов.':'Мы ждём вас на приёме.'} Подтверждение отправлено{form.email?` на ${form.email}`:''} и в личный кабинет.</p>
      <div className="bk-ticket">
        <div className="qr"></div>
        <div>
          <div className="muted" style={{fontSize:12,letterSpacing:'.04em'}}>Номер заявки</div>
          <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:26,letterSpacing:'.01em'}}>{code}</div>
          <div className="muted" style={{fontSize:13,marginTop:4}}>Оплачено · {RUB(total)}</div>
        </div>
      </div>
      <div style={{display:'flex',gap:12,justifyContent:'center'}}>
        <a className="btn btn--ghost" href="#" onClick={e=>e.preventDefault()}>В личный кабинет</a>
        <button className="btn btn--gold" onClick={onClose}>Готово</button>
      </div>
    </div>
  );
}

function BookingFlow({ open, onClose, seed, seedMode }){
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('analyses');
  const [cart, setCart] = useState({});
  const [atHome, setAtHome] = useState(false);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});
  const [pay, setPay] = useState('card');
  const [agree, setAgree] = useState(false);
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  // seed from hero quick-book
  useEffect(()=>{
    if(open){
      if(seedMode) setMode(seedMode);
      if(seed && seed.length){
        const c={}; seed.forEach(it=>c[it.id]=it); setCart(c);
      }
    }
  },[open]);

  useEffect(()=>{ if(bodyRef.current) bodyRef.current.scrollTop=0; },[step]);
  useEffect(()=>{
    const h = e => { if(e.key==='Escape' && !paying) onClose(); };
    if(open) window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  },[open,paying]);

  if(!open) return null;

  const items = Object.values(cart);
  const sub = items.reduce((s,x)=>s+x.price,0);
  const homeFee = (mode==='analyses'&&atHome)?1500:0;
  const total = sub + homeFee;

  const toggle = it => setCart(c=>{ const n={...c}; if(n[it.id]) delete n[it.id]; else n[it.id]=it; return n; });
  const removeId = id => setCart(c=>{ const n={...c}; delete n[id]; return n; });

  const reset = ()=>{ setStep(1); setCart({}); setSlot(null); setDay(0); setAtHome(false); setForm(emptyForm()); setErrors({}); setAgree(false); setPay('card'); setDone(false); setMode('analyses'); };
  const close = ()=>{ onClose(); setTimeout(reset, 300); };

  const validate = ()=>{
    const e={};
    if(form.name.trim().split(/\s+/).length < 2) e.name='Укажите фамилию и имя полностью';
    if(form.phone.replace(/\D/g,'').length < 11) e.phone='Введите корректный номер';
    if(form.birth.replace(/\D/g,'').length < 8) e.birth='дд.мм.гггг';
    if(form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email='Проверьте адрес';
    setErrors(e); return Object.keys(e).length===0;
  };

  const next = ()=>{
    if(step===1 && items.length===0) return;
    if(step===2 && !slot) return;
    if(step===3 && !validate()) return;
    setStep(s=>s+1);
  };
  const back = ()=> step>1 ? setStep(s=>s-1) : close();

  const doPay = ()=>{
    if(!agree) return;
    if(pay==='clinic'){ setDone(true); return; }
    setPaying(true);
    setTimeout(()=>{ setPaying(false); setDone(true); }, 1700);
  };

  const titleMap = {1:'Выбор услуг',2:'Дата и время',3:'Данные пациента',4:'Оплата'};

  return (
    <div className="bk-overlay" onMouseDown={e=>{ if(e.target===e.currentTarget && !paying) close(); }}>
      <div className="bk-panel" role="dialog" aria-modal="true">
        <div className="bk-head">
          <div className="ttl">
            <div className="s">{mode==='analyses'?'Запись на анализы':'Запись на приём'}</div>
            <div className="t">{done ? 'Готово' : titleMap[step]}</div>
          </div>
          <button className="bk-close" onClick={close} aria-label="Закрыть"><Icon name="x" size={20} stroke={1.9}/></button>
        </div>

        {!done && <Stepper step={step}/>}

        <div className="bk-body scroll-thin" ref={bodyRef}>
          {done ? (
            <SuccessStep mode={mode} total={total} form={form} onClose={close}/>
          ) : step===1 ? (
            <Catalog mode={mode} setMode={m=>{ setMode(m); setCart({}); setSlot(null); }} cart={cart} toggle={toggle}/>
          ) : step===2 ? (
            <TimeStep mode={mode} cart={cart} removeId={removeId} atHome={atHome} setAtHome={setAtHome}
              day={day} setDay={setDay} slot={slot} setSlot={setSlot}/>
          ) : step===3 ? (
            <DetailsStep form={form} setForm={setForm} errors={errors}/>
          ) : (
            <PayStep mode={mode} cart={cart} atHome={atHome} day={day} slot={slot} form={form}
              pay={pay} setPay={setPay} agree={agree} setAgree={setAgree} paying={paying}/>
          )}
        </div>

        {!done && (
          <div className="bk-foot">
            {step>1 && (
              <button className="btn btn--ghost btn--sm" onClick={back} disabled={paying} style={{height:50,paddingInline:16}}>
                <Icon name="arrow" size={16} stroke={2} style={{transform:'scaleX(-1)'}}/> Назад
              </button>
            )}
            <div className="sum">
              <div className="l">{step===4?'К оплате':'Сумма'}</div>
              <div className="v">{RUB(total)}</div>
            </div>
            {step<4 ? (
              <button className="btn btn--gold" onClick={next} disabled={(step===1&&items.length===0)||(step===2&&!slot)}>
                Далее <Icon name="arrow" size={17} stroke={2}/>
              </button>
            ) : (
              <button className="btn btn--gold" onClick={doPay} disabled={!agree||paying}>
                {paying ? 'Оплата…' : (pay==='clinic' ? 'Оформить' : `Оплатить ${RUB(total)}`)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { BookingFlow });
