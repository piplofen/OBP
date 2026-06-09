/* Interior pages, group 1: About, Napravleniya, Otdelenie */

function AboutPage(){
  return (
    <Page current="О больнице">
      <PageHead crumbs={[['О больнице']]} eyebrow="О клинике"
        title="Более полувека <em>кремлёвской</em> медицины"
        lead="Объединённая больница с поликлиникой Управления делами Президента РФ — многопрофильный центр полного цикла на Мичуринском проспекте."
        actions={<><button className="btn btn--gold" onClick={()=>CB.open('')}>Перезвоните мне</button><a className="btn btn--ghost" href="napravleniya.html">Направления</a></>}/>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="prose">
              <p className="drop">История больницы началась в 1965 году как части системы лечебно-оздоровительных учреждений, обслуживающих высшие органы государственной власти. За десятилетия клиника выросла в современный многопрофильный центр.</p>
              <p>Сегодня под одной крышей работают поликлиника более чем на 40 специальностей, отделения лучевой и функциональной диагностики, собственная лаборатория полного цикла, хирургический и терапевтический стационар, отделение реабилитации.</p>
              <h3>Миссия</h3>
              <p>Сохранять здоровье наших пациентов на уровне, соответствующем их статусу и ожиданиям: с академической точностью диагностики, безупречным сервисом и абсолютной конфиденциальностью.</p>
            </div>
            <div>
              <div className="quote" style={{marginBottom:28}}>
                <p>«Главная ценность клиники — доверие, которое выстраивается годами. Мы храним его так же бережно, как и здоровье пациента».</p>
                <div className="by">Главный врач клиники</div>
              </div>
              <div className="card" style={{padding:'24px 26px'}}>
                <h4 className="serif" style={{fontWeight:600,fontSize:20,marginBottom:14}}>Лицензии и аккредитации</h4>
                {['Медицинская лицензия ФС','Аккредитация по 40+ профилям','Сертификаты ISO качества сервиса','Допуск к ДМС ведущих страховщиков'].map(t=>(
                  <div key={t} style={{display:'flex',gap:11,alignItems:'flex-start',padding:'9px 0',borderTop:'1px solid var(--hairline)',fontSize:14}}><Icon name="check" size={17} stroke={2} style={{color:'var(--gold-deep)',flexShrink:0,marginTop:2}}/> {t}</div>
                ))}
                <a className="linkbtn" style={{marginTop:14}} href="patsientam.html">Все документы <span><Icon name="arrow" size={15} stroke={2}/></span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="statband">
        <div className="wrap">
          {[['60+','лет клинике'],['320','врачей и учёных'],['40+','специальностей'],['190','коек стационара']].map(([n,c])=>(
            <div className="t" key={c}><div className="n">{n.includes('+')?<>{n.replace('+','')}<em>+</em></>:n}</div><div className="c">{c}</div></div>
          ))}
        </div>
      </div>

      <section className="section section--soft">
        <div className="wrap">
          <SectionHead eyebrow="Почему выбирают нас" title="Доверие, сервис и конфиденциальность"/>
          <div className="values">
            {[['lock','Конфиденциальность','Приватные зоны приёма, защищённое ведение данных, отдельные палаты.'],
              ['crown','Личный врач','Куратор сопровождает на каждом этапе и знает всю вашу историю.'],
              ['award','Кремлёвский стандарт','Кадры и протоколы медицины Управления делами Президента РФ.'],
              ['spark','Технологии','МРТ 3 Тесла, КТ, эндоскопия во сне и лаборатория полного цикла.']].map(([ic,t,d])=>(
              <div className="v" key={t}><div className="ic"><Icon name={ic} size={26}/></div><h4>{t}</h4><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Познакомьтесь с клиникой лично" text="Оставьте заявку — мы организуем визит, ответим на вопросы и подберём программу наблюдения."/>
    </Page>
  );
}

function NapravleniyaPage(){
  return (
    <Page current="Направления">
      <PageHead crumbs={[['Направления']]} eyebrow="Направления и отделения"
        title="Вся медицина — <em>в одном</em> здании"
        lead="Полный цикл помощи: амбулаторный приём, диагностика, стационар и реабилитация. Выберите направление или оставьте заявку на подбор."
        actions={<button className="btn btn--gold" onClick={()=>CB.open('Подбор направления')}>Подобрать специалиста</button>}/>

      <section className="section">
        <div className="wrap">
          <div className="dir-grid">
            {DIRECTIONS.map(d=>(
              <a className="dir" key={d.id} href={d.href}>
                <span className="go"><Icon name="upright" size={20} stroke={1.8}/></span>
                <div className="ico"><Icon name={d.ic} size={24}/></div>
                <h3>{d.t}</h3><p>{d.d}</p><span className="cnt">{d.cnt}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="wrap">
          <SectionHead eyebrow="Поликлиника" title="Отделения и специальности"
            text="Более 40 направлений амбулаторного приёма. Запись через куратора или личный кабинет."/>
          <div className="dir-grid">
            {DEPARTMENTS.map(d=>(
              <a className="dir" key={d.id} href="otdelenie.html">
                <span className="go"><Icon name="upright" size={20} stroke={1.8}/></span>
                <div className="ico"><Icon name={d.ic} size={24}/></div>
                <h3>{d.t}</h3><p>{d.d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand/>
    </Page>
  );
}

function OtdeleniePage(){
  const dep = DEPARTMENTS.find(d=>d.id==='cardio');
  const docs = DOCTORS.filter(d=>d.dep==='cardio');
  return (
    <Page current="Направления">
      <PageHead crumbs={[['Направления','napravleniya.html'],['Кардиология']]} eyebrow="Отделение"
        title="Кардиология"
        lead="Диагностика и лечение заболеваний сердца и сосудов — от профилактического скрининга до сложных интервенционных вмешательств."
        actions={<><button className="btn btn--gold" onClick={()=>CB.open('Кардиология')}>Записаться на приём</button><a className="btn btn--ghost" href="tseny.html">Цены отделения</a></>}/>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="prose">
              <p>Кардиологическое отделение клиники объединяет амбулаторный приём, функциональную диагностику и стационарное лечение. Мы ведём пациентов с гипертонией, ишемической болезнью сердца, нарушениями ритма и после кардиохирургических вмешательств.</p>
              <h3>Что мы делаем</h3>
              <p>Эхокардиография, суточное мониторирование ЭКГ и АД, нагрузочные пробы, коронарография по показаниям. Каждому пациенту составляется индивидуальный план наблюдения.</p>
            </div>
            <div className="card" style={{padding:'26px 28px'}}>
              <h4 className="serif" style={{fontWeight:600,fontSize:21,marginBottom:6}}>Услуги отделения</h4>
              {[['Консультация кардиолога','от 6 500 ₽'],['Эхокардиография','3 400 ₽'],['Холтер ЭКГ, 24 часа','3 800 ₽'],['Нагрузочная проба','4 900 ₽'],['Программа «Здоровое сердце»','от 28 000 ₽']].map(([n,p])=>(
                <div key={n} style={{display:'flex',justifyContent:'space-between',gap:14,padding:'13px 0',borderTop:'1px solid var(--hairline)'}}>
                  <span style={{fontSize:14.5}}>{n}</span><span className="num" style={{fontWeight:700,whiteSpace:'nowrap'}}>{p}</span>
                </div>
              ))}
              <button className="btn btn--gold btn--block" style={{marginTop:18}} onClick={()=>CB.open('Кардиология')}>Оставить заявку</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="wrap">
          <SectionHead eyebrow="Врачи отделения" title="Кардиологи клиники" link="Все врачи" onLink={()=>location.href='vrachi.html'}/>
          <div className="doc-grid">
            {docs.map(d=>(
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
        </div>
      </section>

      <CtaBand subject="Кардиология"/>
    </Page>
  );
}

Object.assign(window,{ AboutPage, NapravleniyaPage, OtdeleniePage });
