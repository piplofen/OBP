/* Interior pages, group 2: Vrachi (filter), Vrach (profile), Tseny */

function VrachiPage(){
  const [spec,setSpec]=useState('all');
  const [q,setQ]=useState('');
  const specs = useMemo(()=>{ const m={}; DOCTORS.forEach(d=>m[d.spec]=1); return Object.keys(m); },[]);
  const list = useMemo(()=>{
    return DOCTORS.filter(d=>(spec==='all'||d.spec===spec) && (!q.trim()||d.nm.toLowerCase().includes(q.toLowerCase())||d.spec.toLowerCase().includes(q.toLowerCase())));
  },[spec,q]);
  return (
    <Page current="Врачи">
      <PageHead crumbs={[['Врачи']]} eyebrow="Специалисты"
        title="Врачи, которым <em>доверяют</em>"
        lead="Профессора и кандидаты медицинских наук с десятилетиями практики. Выберите специалиста или оставьте заявку на подбор."/>
      <section className="section" style={{paddingTop:48}}>
        <div className="wrap">
          <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:18,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,height:48,border:'1px solid var(--hairline-strong)',borderRadius:'var(--r-sm)',padding:'0 14px',flex:'1 1 280px',maxWidth:360}}>
              <Icon name="search" size={19} style={{color:'var(--muted)'}}/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Поиск по имени или специальности" style={{border:'none',outline:'none',flex:1,fontSize:15,fontFamily:'inherit',background:'transparent'}}/>
            </div>
            <span className="muted" style={{fontSize:13,marginLeft:'auto'}}>Найдено: {list.length}</span>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:30}}>
            <button className={'chip'+(spec==='all'?' on':'')} onClick={()=>setSpec('all')}>Все специалисты</button>
            {specs.map(s=>(<button key={s} className={'chip'+(spec===s?' on':'')} onClick={()=>setSpec(s)}>{s}</button>))}
          </div>
          <div className="doc-grid">
            {list.map(d=>(
              <a className="doccard" key={d.id} href={'vrach.html?id='+d.id}>
                <div className="photo"><div className="ph-init">{d.init}</div></div>
                <div className="dc-body">
                  <div className="dc-spec">{d.spec}</div><div className="dc-nm">{d.nm}</div>
                  <div className="dc-meta"><span>{d.deg}</span><span>Стаж {d.exp} · каб. {d.cab}</span></div>
                  <div className="dc-foot"><span className="dc-price">{d.price.toLocaleString('ru-RU')} <small>₽ приём</small></span><Icon name="upright" size={18} style={{color:'var(--gold-deep)'}}/></div>
                </div>
              </a>
            ))}
          </div>
          {list.length===0 && <div className="center muted" style={{padding:'40px 0'}}>Никого не нашлось — измените фильтр или запрос.</div>}
        </div>
      </section>
      <CtaBand title="Не знаете, к кому записаться?" text="Оставьте заявку — врач-куратор подберёт специалиста под вашу ситуацию." subject="Подбор специалиста"/>
    </Page>
  );
}

function VrachPage(){
  const id = new URLSearchParams(location.search).get('id') || 'petrov';
  const d = DOCTORS.find(x=>x.id===id) || DOCTORS[0];
  const dep = DEPARTMENTS.find(x=>x.id===d.dep);
  return (
    <Page current="Врачи">
      <PageHead crumbs={[['Врачи','vrachi.html'],[d.nm.split(' ').slice(0,2).join(' ')]]}/>
      <section className="section" style={{paddingTop:0,marginTop:-20}}>
        <div className="wrap">
          <div className="split">
            <div>
              <div className="card" style={{overflow:'hidden'}}>
                <div style={{aspectRatio:'1/1',background:'var(--gold-grad-soft)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:120,color:'var(--gold)'}}>{d.init}</span>
                </div>
              </div>
              <div className="card" style={{padding:'22px 24px',marginTop:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
                  <span className="muted" style={{fontSize:13}}>Первичный приём</span>
                  <span className="serif" style={{fontWeight:700,fontSize:26}}>{d.price.toLocaleString('ru-RU')} ₽</span>
                </div>
                <button className="btn btn--gold btn--block btn--lg" style={{marginTop:10}} onClick={()=>CB.open(d.nm)}>Записаться на приём</button>
                <div className="conf-note" style={{marginTop:14}}><Icon name="lock" size={18}/><p>Запись и ведение — строго конфиденциально.</p></div>
              </div>
            </div>
            <div>
              <span className="eyebrow">{d.spec}{dep?' · '+dep.t:''}</span>
              <h1 className="serif" style={{fontWeight:500,fontSize:'clamp(32px,4vw,48px)',lineHeight:1.06,letterSpacing:'-.01em',margin:'14px 0 0'}}>{d.nm}</h1>
              <div style={{display:'flex',gap:10,flexWrap:'wrap',margin:'18px 0 4px'}}>
                <span className="pill pill--gold">{d.deg}</span>
                <span className="pill pill--ink">Стаж {d.exp}</span>
                <span className="pill pill--ink">Кабинет {d.cab}</span>
              </div>
              <div className="prose" style={{marginTop:22}}>
                <p>{d.bio}</p>
                <h3>Направления работы</h3>
                <p>Первичная и повторная консультация, разработка плана обследования и лечения, ведение пациента и сопровождение на смежных этапах помощи в клинике.</p>
              </div>
              <div className="card" style={{padding:'22px 24px',marginTop:24}}>
                <h4 className="serif" style={{fontWeight:600,fontSize:19,marginBottom:8}}>Образование и квалификация</h4>
                {['Высшее медицинское образование','Учёная степень: '+d.deg,'Категория: высшая','Регулярное повышение квалификации'].map(t=>(
                  <div key={t} style={{display:'flex',gap:11,alignItems:'flex-start',padding:'10px 0',borderTop:'1px solid var(--hairline)',fontSize:14}}><Icon name="check" size={17} stroke={2} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/> {t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand subject={d.nm}/>
    </Page>
  );
}

function TsenyPage(){
  const [open,setOpen]=useState(PRICES.map((_,i)=>i));
  return (
    <Page current="Услуги и цены">
      <PageHead crumbs={[['Услуги и цены']]} eyebrow="Прейскурант"
        title="Услуги и <em>цены</em>"
        lead="Прозрачная стоимость без скрытых платежей. Точную смету по вашей ситуации составит врач-куратор."
        actions={<button className="btn btn--gold" onClick={()=>CB.open('Расчёт стоимости')}>Рассчитать стоимость</button>}/>
      <section className="section">
        <div className="wrap wrap-narrow" style={{margin:'0 auto'}}>
          <div className="pricelist">
            {PRICES.map((g,gi)=>(
              <div key={g.cat}>
                <div className="price-cat" style={{paddingTop:gi===0?22:28}}>{g.cat}</div>
                {g.items.map((it,i)=>(
                  <div className="prow" key={i}>
                    <div className="info"><div className="nm">{it.nm}</div><div className="meta">{it.meta}</div></div>
                    <div className="price">{it.price.toLocaleString('ru-RU')} <small>₽</small></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="muted center" style={{fontSize:13,marginTop:18}}>Цены указаны в рублях и не являются публичной офертой. Действующий прейскурант уточняйте у администратора.</p>
          <div className="card" style={{padding:'26px 28px',marginTop:26,display:'flex',gap:18,alignItems:'center',flexWrap:'wrap'}}>
            <div style={{flex:'1 1 280px'}}>
              <h4 className="serif" style={{fontWeight:600,fontSize:22,marginBottom:6}}>ДМС и корпоративное обслуживание</h4>
              <p className="muted" style={{margin:0,fontSize:14.5}}>Работаем с ведущими страховыми компаниями. Возможны индивидуальные и семейные программы.</p>
            </div>
            <button className="btn btn--gold" onClick={()=>CB.open('ДМС / корпоративное обслуживание')}>Обсудить условия</button>
          </div>
        </div>
      </section>
      <CtaBand/>
    </Page>
  );
}

Object.assign(window,{ VrachiPage, VrachPage, TsenyPage });
