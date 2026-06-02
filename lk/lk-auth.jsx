/* Login + forgot-password flow */
const { useState:useStateA } = React;

function Login({ onLogin, goForgot }){
  const [login,setLogin]=useState('m.ivanova@example.ru');
  const [pw,setPw]=useState('');
  const [show,setShow]=useState(false);
  const [err,setErr]=useState({});
  const [remember,setRemember]=useState(true);

  const submit=(e)=>{
    e&&e.preventDefault();
    const er={};
    if(!login.trim()) er.login='Введите телефон или e-mail';
    if(pw.length<4) er.pw='Введите пароль';
    setErr(er);
    if(Object.keys(er).length===0) onLogin();
  };
  return (
    <div className="auth">
      <div className="auth-brand">
        <div className="glow"></div>
        <div className="top">
          <img src="assets/obp-emblem.png" alt="ОБП"/>
          <div><b>ОБП</b><span>Управление делами Президента РФ</span></div>
        </div>
        <div className="mid">
          <h1>Ваше здоровье — <em>под наблюдением</em></h1>
          <p>Личный кабинет пациента Объединённой больницы с поликлиникой. Результаты, запись и пропуска — в одном месте.</p>
          <div className="feat">
            {[['flask','Результаты анализов и исследований онлайн'],['calendar','Запись к врачу по сетке расписания'],['qr','Электронный пропуск с QR-кодом']].map(([ic,t])=>(
              <div className="f" key={ic}><Icon name={ic} size={20}/> {t}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-form">
        <form className="auth-card rise" onSubmit={submit}>
          <div className="auth-mobile-top">
            <img src="assets/obp-emblem.png" alt="ОБП"/>
            <div><b>ОБП</b><span>Личный кабинет</span></div>
          </div>
          <div className="ac-head">
            <h2>Вход в кабинет</h2>
            <p>Войдите, чтобы увидеть результаты и записаться на приём</p>
          </div>
          <div className="field">
            <label>Телефон или e-mail</label>
            <input className={err.login?'err':''} value={login} onChange={e=>setLogin(e.target.value)} placeholder="+7 (___) ___-__-__"/>
            {err.login && <div className="msg">{err.login}</div>}
          </div>
          <div className="field">
            <label>Пароль</label>
            <div style={{position:'relative',display:'flex',alignItems:'center'}}>
              <input className={err.pw?'err':''} type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Ваш пароль"/>
              <button type="button" className="eye" onClick={()=>setShow(s=>!s)} aria-label="Показать пароль"><Icon name={show?'eyeoff':'eye'} size={20}/></button>
            </div>
            {err.pw && <div className="msg">{err.pw}</div>}
          </div>
          <div className="auth-row">
            <label className="checkrow"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Запомнить меня</label>
            <span className="linkbtn" onClick={goForgot}>Забыли пароль?</span>
          </div>
          <button className="btn btn--gold btn--block btn--lg" type="submit">Войти</button>
          <div className="auth-foot">Впервые здесь? <a onClick={onLogin}>Зарегистрироваться по телефону</a></div>
        </form>
      </div>
    </div>
  );
}

function Forgot({ goBack }){
  const [step,setStep]=useState(1); // 1 contact, 2 code, 3 newpw, 4 done
  const [contact,setContact]=useState('');
  const [code,setCode]=useState(['','','','']);
  const [pw,setPw]=useState(''); const [pw2,setPw2]=useState('');
  const [err,setErr]=useState({});
  const refs=[useRef(),useRef(),useRef(),useRef()];

  const sendCode=(e)=>{ e&&e.preventDefault(); if(!contact.trim()){ setErr({c:'Укажите телефон или e-mail'}); return; } setErr({}); setStep(2); setTimeout(()=>refs[0].current&&refs[0].current.focus(),60); };
  const onCode=(i,v)=>{ v=v.replace(/\D/g,'').slice(-1); const n=[...code]; n[i]=v; setCode(n); if(v&&i<3) refs[i+1].current.focus(); };
  const verify=()=>{ if(code.join('').length<4){ setErr({k:'Введите 4 цифры'}); return; } setErr({}); setStep(3); };
  const reset=(e)=>{ e&&e.preventDefault(); const er={}; if(pw.length<6) er.p='Минимум 6 символов'; if(pw!==pw2) er.p2='Пароли не совпадают'; setErr(er); if(Object.keys(er).length===0) setStep(4); };

  return (
    <div className="auth">
      <div className="auth-brand">
        <div className="glow"></div>
        <div className="top">
          <img src="assets/obp-emblem.png" alt="ОБП"/>
          <div><b>ОБП</b><span>Управление делами Президента РФ</span></div>
        </div>
        <div className="mid">
          <h1>Восстановление <em>доступа</em></h1>
          <p>Мы поможем вернуть доступ к кабинету за пару шагов — по телефону или электронной почте.</p>
        </div>
      </div>
      <div className="auth-form">
        <div className="auth-card rise">
          <div className="auth-mobile-top">
            <img src="assets/obp-emblem.png" alt="ОБП"/>
            <div><b>ОБП</b><span>Восстановление доступа</span></div>
          </div>
          <span className="linkbtn" style={{marginBottom:18}} onClick={goBack}><Icon name="arrow" size={16} style={{transform:'scaleX(-1)'}}/> Назад ко входу</span>

          {step===1 && (
            <form onSubmit={sendCode}>
              <div className="ac-head"><h2>Забыли пароль?</h2><p>Введите телефон или e-mail — пришлём код для сброса</p></div>
              <div className="field">
                <label>Телефон или e-mail</label>
                <input className={err.c?'err':''} value={contact} onChange={e=>setContact(e.target.value)} placeholder="+7 (___) ___-__-__"/>
                {err.c && <div className="msg">{err.c}</div>}
              </div>
              <button className="btn btn--gold btn--block btn--lg" type="submit">Отправить код</button>
            </form>
          )}

          {step===2 && (
            <div>
              <div className="ac-head"><h2>Введите код</h2><p>Мы отправили 4-значный код на {contact||'ваш контакт'}</p></div>
              <div style={{display:'flex',gap:12,justifyContent:'space-between',margin:'4px 0 18px'}}>
                {code.map((v,i)=>(
                  <input key={i} ref={refs[i]} value={v} onChange={e=>onCode(i,e.target.value)} inputMode="numeric" maxLength="1"
                    style={{width:'100%',height:64,textAlign:'center',fontSize:26,fontWeight:700,border:'1px solid var(--hairline-strong)',borderRadius:'var(--r-sm)',fontFamily:'var(--font-display)'}}/>
                ))}
              </div>
              {err.k && <div className="msg" style={{marginBottom:12}}>{err.k}</div>}
              <button className="btn btn--gold btn--block btn--lg" onClick={verify}>Подтвердить</button>
              <div className="auth-foot">Не пришёл код? <a onClick={()=>{}}>Отправить снова</a></div>
            </div>
          )}

          {step===3 && (
            <form onSubmit={reset}>
              <div className="ac-head"><h2>Новый пароль</h2><p>Придумайте надёжный пароль для входа</p></div>
              <div className="field"><label>Новый пароль</label><input className={err.p?'err':''} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Минимум 6 символов"/>{err.p && <div className="msg">{err.p}</div>}</div>
              <div className="field"><label>Повторите пароль</label><input className={err.p2?'err':''} type="password" value={pw2} onChange={e=>setPw2(e.target.value)} placeholder="Ещё раз"/>{err.p2 && <div className="msg">{err.p2}</div>}</div>
              <button className="btn btn--gold btn--block btn--lg" type="submit">Сохранить пароль</button>
            </form>
          )}

          {step===4 && (
            <div style={{textAlign:'center',padding:'18px 0'}}>
              <div style={{width:80,height:80,borderRadius:'50%',background:'var(--gold-grad)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 22px',boxShadow:'0 12px 30px rgba(138,117,80,.32)'}}><Icon name="check" size={40} stroke={2.4} style={{color:'var(--on-gold)'}}/></div>
              <h2 className="serif" style={{fontWeight:600,fontSize:30,margin:'0 0 8px'}}>Пароль обновлён</h2>
              <p className="muted" style={{margin:'0 0 24px'}}>Теперь вы можете войти в кабинет с новым паролем.</p>
              <button className="btn btn--gold btn--block btn--lg" onClick={goBack}>Войти в кабинет</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window,{ Login, Forgot });
