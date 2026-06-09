/* Interior pages, group 3: Programmy, Statsionar, Diagnostika */

function ProgrammyPage(){
  return (
    <Page current="Услуги и цены">
      <PageHead crumbs={[['Программы и чек-апы']]} eyebrow="Программы"
        title="Чек-апы и <em>персональные</em> программы"
        lead="Комплексное обследование за один визит или личный врач на год — с приоритетным доступом ко всем услугам клиники."
        actions={<button className="btn btn--gold" onClick={()=>CB.open('Подбор программы')}>Подобрать программу</button>}/>

      <section className="section">
        <div className="wrap">
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

      <section className="section section--soft">
        <div className="wrap">
          <SectionHead eyebrow="Как это работает" title="Один визит — полная картина здоровья"/>
          <div className="dir-grid">
            {[['cal','Заявка и подбор','Оставляете заявку — куратор уточняет задачи и подбирает программу.'],
              ['flask','Обследование','Анализы, диагностика и консультации в один день, без очередей.'],
              ['doc','Заключение','Получаете заключение и персональный план здоровья от врача.'],
              ['user','Сопровождение','Личный кабинет и куратор остаются с вами и после обследования.']].map(([ic,t,d],i)=>(
              <div className="dir" key={t} style={{cursor:'default'}}>
                <div className="ico"><Icon name={ic} size={24}/></div>
                <h3>{i+1}. {t}</h3><p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Подберём программу под вас" text="Оставьте заявку — куратор предложит оптимальный чек-ап или формат наблюдения." subject="Подбор программы"/>
    </Page>
  );
}

function StatsionarPage(){
  return (
    <Page current="Направления">
      <PageHead crumbs={[['Направления','napravleniya.html'],['Стационар']]} eyebrow="Стационар"
        title="Стационар <em>премиум</em>-уровня"
        lead="Комфортабельные палаты, индивидуальный сестринский пост и полная приватность. Хирургия, терапия и кардиология под наблюдением 24/7."
        actions={<><button className="btn btn--gold" onClick={()=>CB.open('Госпитализация')}>Запрос на госпитализацию</button><a className="btn btn--ghost" href="tseny.html">Стоимость пребывания</a></>}/>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="prose">
              <p className="drop">Стационар клиники рассчитан на пациентов, для которых важны не только результат лечения, но и условия пребывания. Палаты оформлены в спокойной гамме, оснащены всем необходимым и обеспечивают полную приватность.</p>
              <p>Каждого пациента ведёт лечащий врач совместно с профильными специалистами. Питание — по индивидуальному меню, посещения — по согласованию, с соблюдением конфиденциальности.</p>
            </div>
            <div className="card" style={{padding:'26px 28px'}}>
              <h4 className="serif" style={{fontWeight:600,fontSize:21,marginBottom:6}}>Размещение</h4>
              {[['Палата повышенной комфортности','от 18 000 ₽/сут'],['Палата-люкс с гостиной','от 32 000 ₽/сут'],['Дневной стационар','от 9 500 ₽']].map(([n,p])=>(
                <div key={n} style={{display:'flex',justifyContent:'space-between',gap:14,padding:'14px 0',borderTop:'1px solid var(--hairline)'}}>
                  <span style={{fontSize:14.5}}>{n}</span><span className="num" style={{fontWeight:700,whiteSpace:'nowrap'}}>{p}</span>
                </div>
              ))}
              <button className="btn btn--gold btn--block" style={{marginTop:18}} onClick={()=>CB.open('Госпитализация')}>Оставить заявку</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap">
          <SectionHead eyebrow="Условия пребывания" title="Комфорт и приватность"/>
          <div className="values">
            {[['bed','Одноместные палаты','Приватность, тишина и индивидуальный сестринский пост.'],
              ['lock','Конфиденциальность','Отдельный вход и согласование любых посещений.'],
              ['crown','Сервис','Индивидуальное меню, бытовые удобства, сопровождение куратора.'],
              ['pulse','Наблюдение 24/7','Круглосуточный мониторинг и дежурная реанимационная бригада.']].map(([ic,t,d])=>(
              <div className="v" key={t}><div className="ic"><Icon name={ic} size={26}/></div><h4>{t}</h4><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand subject="Госпитализация"/>
    </Page>
  );
}

function DiagnostikaPage(){
  const groups = [
    { t:'Лучевая диагностика', items:[['МРТ 3 Тесла','Высокопольный томограф, исследование любой области с заключением.'],['Компьютерная томография','Мультиспиральная КТ, в том числе с контрастированием.'],['Рентген и маммография','Цифровое оборудование с минимальной лучевой нагрузкой.']] },
    { t:'Функциональная диагностика', items:[['УЗИ экспертного класса','Все виды ультразвуковых исследований.'],['Эхокардиография','УЗИ сердца с допплерографией.'],['Холтер ЭКГ и СМАД','Суточное мониторирование ритма и давления.']] },
    { t:'Эндоскопия', items:[['Гастроскопия во сне','С медикаментозной седацией под контролем анестезиолога.'],['Колоноскопия во сне','Комфортное исследование кишечника.'],['Бронхоскопия','Диагностика дыхательных путей.']] },
    { t:'Лаборатория', items:[['Клинические анализы','Кровь, моча, биохимия — результаты в личном кабинете.'],['Гормоны и витамины','Полный спектр эндокринологических исследований.'],['Онкомаркеры','Скрининговые и расширенные профили.']] },
  ];
  return (
    <Page current="Направления">
      <PageHead crumbs={[['Направления','napravleniya.html'],['Диагностика']]} eyebrow="Диагностика"
        title="Точный <em>диагноз</em> — основа лечения"
        lead="МРТ, КТ, УЗИ экспертного класса, эндоскопия во сне и собственная лаборатория полного цикла. Результаты — в личном кабинете."
        actions={<><button className="btn btn--gold" onClick={()=>CB.open('Диагностика')}>Записаться на исследование</button><a className="btn btn--ghost" href="tseny.html">Цены</a></>}/>

      <section className="section">
        <div className="wrap">
          {groups.map((g,gi)=>(
            <div key={g.t} style={{marginBottom:gi<groups.length-1?40:0}}>
              <SectionHead eyebrow={'0'+(gi+1)} title={g.t}/>
              <div className="dir-grid">
                {g.items.map(([t,d])=>(
                  <div className="dir" key={t} style={{cursor:'default'}}>
                    <div className="ico"><Icon name={gi===0?'scan':gi===1?'pulse':gi===2?'activity':'flask'} size={24}/></div>
                    <h3>{t}</h3><p>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Запишитесь на диагностику" text="Оставьте заявку — подскажем, какое исследование нужно, и подберём время." subject="Диагностика"/>
    </Page>
  );
}

Object.assign(window,{ ProgrammyPage, StatsionarPage, DiagnostikaPage });
