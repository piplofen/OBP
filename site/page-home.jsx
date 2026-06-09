/* Главная — home page composition */
function StarDoctors(){
  const top = DOCTORS.filter(d=>d.top);
  return (
    <section className="section section--soft">
      <div className="wrap">
        <SectionHead eyebrow="Наши врачи" title="Специалисты, которым доверяют"
          text="Профессора и кандидаты медицинских наук с десятилетиями практики и научной работы."
          link="Все врачи" onLink={()=>location.href='vrachi.html'}/>
        <div className="doc-grid">
          {top.map(d=>(
            <a className="doccard" key={d.id} href={'vrach.html?id='+d.id}>
              <div className="photo"><div className="ph-init">{d.init}</div></div>
              <div className="dc-body">
                <div className="dc-spec">{d.spec}</div>
                <div className="dc-nm">{d.nm}</div>
                <div className="dc-meta"><span>{d.deg}</span><span>Стаж {d.exp} · каб. {d.cab}</span></div>
                <div className="dc-foot">
                  <span className="dc-price">{d.price.toLocaleString('ru-RU')} <small>₽ приём</small></span>
                  <Icon name="upright" size={18} style={{color:'var(--gold-deep)'}}/>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home(){
  return (
    <Page current="О больнице">
      {/* HERO */}
      <section className="hero">
        <div className="glow"></div>
        <div className="wrap rise">
          <div className="hero-eyebrow"><span className="kicker-line"></span><span className="eyebrow">Кремлёвская медицина с 1965 года</span></div>
          <h1>Медицина, достойная <em>вашего</em> доверия</h1>
          <p className="lead">Объединённая больница с поликлиникой Управления делами Президента РФ. Полный цикл помощи, персональное ведение и безусловная конфиденциальность.</p>
          <div className="hero-cta">
            <button className="btn btn--gold btn--lg" onClick={()=>CB.open('')}>Перезвоните мне</button>
            <a className="btn btn--soft btn--lg" href="napravleniya.html">Направления клиники</a>
          </div>
          <div className="hero-meta">
            <div className="m"><div className="n">60<em>+</em></div><div className="c">лет в системе кремлёвской медицины</div></div>
            <div className="m"><div className="n">320</div><div className="c">врачей и научных сотрудников</div></div>
            <div className="m"><div className="n">40<em>+</em></div><div className="c">медицинских специальностей</div></div>
            <div className="m"><div className="n">24/7</div><div className="c">неотложная помощь и стационар</div></div>
          </div>
        </div>
      </section>

      {/* VALUES — confidentiality & service */}
      <section className="section section--ink">
        <div className="wrap">
          <div className="values">
            {[['lock','Конфиденциальность','Защищённое ведение, отдельный вход и приватные палаты. Ваши данные остаются только вашими.'],
              ['crown','Персональный сервис','Личный врач-куратор сопровождает вас на каждом этапе — от записи до восстановления.'],
              ['award','Кремлёвский стандарт','Протоколы, оснащение и кадры медицины Управления делами Президента РФ.'],
              ['clock','Без очередей','Приём строго по времени и приоритетная запись на диагностику и к специалистам.']].map(([ic,t,d])=>(
              <div className="v" key={t}><div className="ic"><Icon name={ic} size={26}/></div><h4>{t}</h4><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Направления" title="Вся медицина — в одном здании"
            text="От первичной консультации до операции и восстановления. Выберите направление или оставьте заявку на подбор."
            link="Все направления" onLink={()=>location.href='napravleniya.html'}/>
          <div className="dir-grid">
            {DIRECTIONS.map(d=>(
              <a className="dir" key={d.id} href={d.href}>
                <span className="go"><Icon name="upright" size={20} stroke={1.8}/></span>
                <div className="ico"><Icon name={d.ic} size={24}/></div>
                <h3>{d.t}</h3><p>{d.d}</p>
                <span className="cnt">{d.cnt}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <StarDoctors/>

      {/* ABOUT teaser / quote */}
      <section className="section">
        <div className="wrap">
          <div className="split split--center">
            <div>
              <span className="eyebrow">О больнице</span>
              <h2 className="serif" style={{fontWeight:500,fontSize:'clamp(28px,3.4vw,42px)',lineHeight:1.08,letterSpacing:'-.01em',margin:'14px 0 0'}}>Более полувека заботимся о здоровье первых лиц страны</h2>
              <div className="prose" style={{marginTop:22}}>
                <p>Объединённая больница с поликлиникой ведёт свою историю с 1965 года. Сегодня это многопрофильный медицинский центр полного цикла: поликлиника, диагностика, стационар и реабилитация под одной крышей.</p>
                <p>Мы сочетаем академическую школу кремлёвской медицины с современными технологиями и уровнем сервиса, к которому привыкли наши пациенты.</p>
              </div>
              <a className="btn btn--ghost" style={{marginTop:26}} href="about.html">Подробнее о клинике <Icon name="arrow" size={17} stroke={2}/></a>
            </div>
            <div className="quote">
              <p>«Мы не просто лечим — мы сопровождаем человека и его семью годами, зная всю историю здоровья и сохраняя полную конфиденциальность».</p>
              <div className="by">Главный врач клиники</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs teaser */}
      <section className="section section--soft">
        <div className="wrap">
          <SectionHead eyebrow="Программы" title="Чек-апы и персональные программы"
            text="Комплексное обследование за один визит или личный врач на год — с приоритетным доступом ко всем услугам клиники."
            link="Все программы" onLink={()=>location.href='programmy.html'}/>
          <div className="prog-grid">
            {PROGRAMS.map((p,i)=>(
              <div className={'prog'+(p.feature?' feat':'')} key={i}>
                <span className="p-tag">{p.tag}</span>
                <h3>{p.nm}</h3>
                <p className="p-desc">{p.desc}</p>
                <ul className="p-feat">{p.feat.map(f=>(<li key={f}><Icon name="check" size={17} stroke={2}/> {f}</li>))}</ul>
                <div className="p-price"><span className="u">от</span><span className="v">{p.price.toLocaleString('ru-RU')} ₽</span></div>
                <button className={'btn btn--block '+(p.feature?'btn--gold':'btn--ghost')} onClick={()=>CB.open(p.nm)}>Оставить заявку</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand/>
    </Page>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<Home/>);
