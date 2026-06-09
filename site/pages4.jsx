/* Interior pages, group 4: Novosti, Kontakty, Patsientam */

function NovostiPage(){
  const [cat,setCat]=useState('Все');
  const cats=useMemo(()=>{ const m={}; NEWS.forEach(n=>m[n.cat]=1); return ['Все',...Object.keys(m)]; },[]);
  const list=NEWS.filter(n=>cat==='Все'||n.cat===cat);
  const [feat,...rest]=list;
  return (
    <Page current="О больнице">
      <PageHead crumbs={[['Новости']]} eyebrow="Новости и статьи"
        title="Новости <em>клиники</em>"
        lead="События, технологии и рекомендации врачей. О том, как мы развиваемся и заботимся о здоровье пациентов."/>
      <section className="section" style={{paddingTop:48}}>
        <div className="wrap">
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:30}}>
            {cats.map(c=>(<button key={c} className={'chip'+(cat===c?' on':'')} onClick={()=>setCat(c)}>{c}</button>))}
          </div>
          {feat && (
            <a className="card" href="#" onClick={e=>e.preventDefault()} style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',overflow:'hidden',marginBottom:24,cursor:'pointer'}}>
              <div style={{aspectRatio:'16/10',background:'var(--surface-2)',backgroundImage:'url(https://picsum.photos/seed/obpnews/800/500)',backgroundSize:'cover',backgroundPosition:'center'}}></div>
              <div style={{padding:'34px 36px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <span className="pill pill--gold" style={{alignSelf:'flex-start'}}>{feat.cat}</span>
                <div className="nc-date" style={{marginTop:14}}>{feat.date}</div>
                <h2 className="serif" style={{fontWeight:600,fontSize:'clamp(24px,2.6vw,32px)',lineHeight:1.12,margin:'8px 0 0'}}>{feat.ttl}</h2>
                <p className="muted" style={{margin:'12px 0 0',fontSize:15}}>{feat.ex}</p>
                <span className="linkbtn" style={{marginTop:18}}>Читать <span><Icon name="arrow" size={15} stroke={2}/></span></span>
              </div>
            </a>
          )}
          <div className="news-grid">
            {rest.map((n,i)=>(
              <a className="newscard" key={i} href="#" onClick={e=>e.preventDefault()}>
                <div className="nc-top" style={{backgroundImage:`url(https://picsum.photos/seed/obp${i}/600/340)`,backgroundSize:'cover',backgroundPosition:'center'}}>
                  <span className="nc-cat"><span className="pill pill--gold">{n.cat}</span></span>
                </div>
                <div className="nc-body">
                  <div className="nc-date">{n.date}</div>
                  <div className="nc-ttl">{n.ttl}</div>
                  <div className="nc-ex">{n.ex}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand/>
    </Page>
  );
}

function KontaktyPage(){
  return (
    <Page current="Контакты">
      <PageHead crumbs={[['Контакты']]} eyebrow="Как нас найти"
        title="Контакты и <em>проезд</em>"
        lead="Мы на Мичуринском проспекте. Запишитесь заранее — администратор встретит и проводит вас."/>
      <section className="section" style={{paddingTop:40}}>
        <div className="wrap">
          <div className="split">
            <div>
              <div className="card" style={{overflow:'hidden'}}>
                <iframe title="Карта" style={{width:'100%',height:380,border:0,display:'block',filter:'grayscale(.2) contrast(1.02)'}}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=37.47%2C55.69%2C37.52%2C55.71&layer=mapnik&marker=55.7%2C37.49"></iframe>
              </div>
              <p className="muted" style={{fontSize:13,marginTop:12,textAlign:'center'}}>Бесплатная парковка для пациентов на территории. Въезд по предварительной заявке.</p>
            </div>
            <div>
              <div className="card" style={{padding:'28px 30px'}}>
                <h4 className="serif" style={{fontWeight:600,fontSize:23,marginBottom:18}}>Справочная и запись</h4>
                {[['phone','Телефон, круглосуточно','+7 (495) 982-10-90'],['mail','Электронная почта','info@fgu-obp.ru'],['mappin','Адрес','г. Москва, Мичуринский проспект, д. 6'],['clock','Часы работы','Поликлиника: Пн–Пт 8:00–20:00, Сб 9:00–15:00. Стационар — круглосуточно']].map(([ic,l,v])=>(
                  <div key={l} style={{display:'flex',gap:13,padding:'14px 0',borderTop:'1px solid var(--hairline)'}}>
                    <Icon name={ic} size={20} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/>
                    <div><div className="muted" style={{fontSize:12.5}}>{l}</div><div style={{fontWeight:600,fontSize:15,marginTop:2}}>{v}</div></div>
                  </div>
                ))}
                <button className="btn btn--gold btn--block btn--lg" style={{marginTop:18}} onClick={()=>CB.open('')}>Перезвоните мне</button>
                <div className="conf-note" style={{marginTop:14}}><Icon name="lock" size={18}/><p>Все обращения обрабатываются конфиденциально.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

function PatsientamPage(){
  const faqs=[
    ['Как записаться на приём?','Оставьте заявку «Перезвоните мне» или позвоните в справочную. Куратор подберёт специалиста и удобное время. После первого визита для вас откроется личный кабинет.'],
    ['Что взять с собой на первый визит?','Документ, удостоверяющий личность, и при наличии — результаты предыдущих обследований и полис ДМС.'],
    ['Работаете ли вы по ДМС?','Да, мы сотрудничаем с ведущими страховыми компаниями. Уточните вашу программу у администратора или оставьте заявку.'],
    ['Как обеспечивается конфиденциальность?','Приватные зоны приёма, защищённое ведение медицинских данных, согласование любых посещений и отдельные палаты в стационаре.'],
    ['Как подготовиться к анализам?','Большинство анализов крови сдаются натощак с 8:00 до 11:00. Подробные памятки по подготовке выдаёт администратор и присылает в личный кабинет.'],
  ];
  const [open,setOpen]=useState(0);
  return (
    <Page current="О больнице">
      <PageHead crumbs={[['Пациентам']]} eyebrow="Пациентам"
        title="Полезная <em>информация</em>"
        lead="Документы, подготовка к визиту, условия по ДМС и ответы на частые вопросы. Если что-то осталось неясным — оставьте заявку."/>
      <section className="section" style={{paddingTop:48}}>
        <div className="wrap">
          <div className="split">
            <div>
              <SectionHead eyebrow="Памятки" title="Документы и подготовка"/>
              <div className="dir-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
                {[['doc','Документы для визита','Что взять с собой на первый приём.'],
                  ['flask','Подготовка к анализам','Как правильно сдавать кровь и другие анализы.'],
                  ['scan','Подготовка к МРТ/КТ','Рекомендации перед лучевой диагностикой.'],
                  ['shield','ОМС, ДМС и оплата','Условия обслуживания и страховые программы.']].map(([ic,t,d])=>(
                  <div className="dir" key={t} style={{cursor:'default'}}>
                    <div className="ico"><Icon name={ic} size={24}/></div>
                    <h3 style={{fontSize:20}}>{t}</h3><p>{d}</p>
                  </div>
                ))}
              </div>
              <div className="card" style={{padding:'24px 26px',marginTop:20,display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                <Icon name="user" size={26} style={{color:'var(--gold-deep)'}}/>
                <div style={{flex:'1 1 220px'}}>
                  <div style={{fontWeight:700,fontSize:16}}>Личный кабинет пациента</div>
                  <div className="muted" style={{fontSize:14}}>Результаты, запись и пропуска — в одном месте.</div>
                </div>
                <a className="btn btn--ghost" href="Личный кабинет.html">Открыть кабинет</a>
              </div>
            </div>
            <div>
              <SectionHead eyebrow="FAQ" title="Частые вопросы"/>
              <div className="card" style={{overflow:'hidden'}}>
                {faqs.map(([q,a],i)=>(
                  <div key={i} style={{borderTop:i?'1px solid var(--hairline)':'none'}}>
                    <button onClick={()=>setOpen(open===i?-1:i)} style={{width:'100%',display:'flex',gap:14,alignItems:'center',justifyContent:'space-between',padding:'18px 22px',background:'none',border:'none',cursor:'pointer',textAlign:'left'}}>
                      <span style={{fontWeight:600,fontSize:15.5}}>{q}</span>
                      <Icon name="chevron" size={18} style={{color:'var(--gold-deep)',flexShrink:0,transform:open===i?'rotate(180deg)':'none',transition:'.2s'}}/>
                    </button>
                    {open===i && <div style={{padding:'0 22px 20px',fontSize:14.5,color:'var(--ink-soft)',lineHeight:1.6}}>{a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title="Остались вопросы?" text="Оставьте заявку — куратор перезвонит и всё подробно объяснит."/>
    </Page>
  );
}

Object.assign(window,{ NovostiPage, KontaktyPage, PatsientamPage });
