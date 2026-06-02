/* Icons, QR generator, and mock patient data for the portal. */
const { useState, useMemo, useEffect, useRef } = React;

const LK_ICONS = {
  home:'<path d="M4 11.5 12 5l8 6.5"/><path d="M5.5 10.2V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8.8"/>',
  flask:'<path d="M9 3h6M10 3v6.5L5.2 17.4A2 2 0 0 0 6.9 20.5h10.2a2 2 0 0 0 1.7-3.1L14 9.5V3"/><path d="M7.5 14h9"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  qr:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2M20 14v6M14 20h6M18 17v.01"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  scan:'<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><path d="M7 12h10"/>',
  drop:'<path d="M12 3.5c3.5 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.5-6 6-10Z"/>',
  pulse:'<path d="M2 12h4l2-6 4 12 2.5-7 1.5 3h6"/>',
  doc:'<path d="M7 3h7l4 4v14H7zM14 3v4h4"/><path d="M10 13h5M10 16.5h5"/>',
  download:'<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 20h14"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron:'<path d="m9 6 6 6-6 6"/>',
  check:'<path d="M5 12.5 10 17.5 19.5 7"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  bell:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  logout:'<path d="M9 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3M16 16l4-4-4-4M20 12H9"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.4 5.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3.3 4M6.3 6.3A16 16 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 3-.5"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  mappin:'<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  car:'<path d="M5 16.5V19a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1v-2.5M19 16.5V19a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1v-2.5"/><path d="M3 16.5v-3.2a2 2 0 0 1 .4-1.2l1.8-2.6A3 3 0 0 1 7.6 8h8.8a3 3 0 0 1 2.4 1.5l1.8 2.6a2 2 0 0 1 .4 1.2v3.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M6.5 13.5h.01M17.5 13.5h.01"/>',
  shield:'<path d="M12 3 5 6v5.5c0 4.3 3 7.5 7 9.5 4-2 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  phone:'<path d="M6.5 4h3l1.4 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 5.5L20 7"/>',
  edit:'<path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.2 4 20Z"/><path d="m14 7 3 3"/>',
  trash:'<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
};
function Icon({ name, size=22, stroke=1.6, style, cls }){
  return React.createElement('svg',{ width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:stroke,strokeLinecap:'round',strokeLinejoin:'round',style,className:cls,dangerouslySetInnerHTML:{__html:LK_ICONS[name]||''}});
}

/* Deterministic QR-style SVG from a seed string */
function QR({ value='ОБП', size=132 }){
  const N=25;
  const cells = useMemo(()=>{
    let h=2166136261>>>0;
    for(const ch of value){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619)>>>0; }
    const rng=()=>{ h^=h<<13; h>>>=0; h^=h>>17; h^=h<<5; h>>>=0; return h/4294967296; };
    const finder=(r,c)=>{ const box=(R,C)=>r>=R&&r<R+7&&c>=C&&c<C+7; return box(0,0)||box(0,N-7)||box(N-7,0); };
    const finderFill=(r,c)=>{ const f=(R,C)=>{ const rr=r-R,cc=c-C; if(rr<0||rr>6||cc<0||cc>6) return null; return rr===0||rr===6||cc===0||cc===6||(rr>=2&&rr<=4&&cc>=2&&cc<=4); }; return f(0,0)??f(0,N-7)??f(N-7,0); };
    const sep=(r,c)=>{ const box=(R,C)=>r>=R-1&&r<=R+7&&c>=C-1&&c<=C+7; return box(0,0)||box(0,N-7)||box(N-7,0); };
    const out=[];
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){
      if(finder(r,c)){ if(finderFill(r,c)) out.push([r,c]); continue; }
      if(sep(r,c)) continue;
      if(rng()<0.46) out.push([r,c]);
    }
    return out;
  },[value]);
  const m = size/N;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
      {cells.map(([r,c],i)=>(<rect key={i} x={(c*m).toFixed(2)} y={(r*m).toFixed(2)} width={m.toFixed(2)} height={m.toFixed(2)} fill="#1a1813"/>))}
    </svg>
  );
}

const PATIENT = {
  name:'Иванова Мария Сергеевна', short:'Мария Сергеевна', initials:'МИ',
  birth:'14.03.1985', phone:'+7 (916) 482-21-09', email:'m.ivanova@example.ru',
  policy:'7712 № 4490 1183 0025', card:'А-204517', snils:'112-233-445 09',
  attached:'Поликлиника №1, Мичуринский пр-т, 6', doctor:'Соколова Е. В., терапевт',
};

const LAB_ANALYSES = [
  { id:'oak', nm:'Общий анализ крови (5-diff)', date:'28 мая 2026', status:'ready', val:'норма', cat:'Гематология' },
  { id:'vitd', nm:'Витамин D, 25-ОН', date:'28 мая 2026', status:'ready', val:'32 нг/мл', cat:'Витамины' },
  { id:'ttg', nm:'ТТГ (тиреотропный гормон)', date:'21 мая 2026', status:'ready', val:'2,1 мЕд/л', cat:'Гормоны' },
  { id:'lip', nm:'Липидный профиль', date:'21 мая 2026', status:'ready', val:'погранично', cat:'Биохимия' },
  { id:'fer', nm:'Ферритин', date:'2 июн 2026', status:'wait', val:'в работе', cat:'Биохимия' },
  { id:'glu', nm:'Глюкоза венозная', date:'2 июн 2026', status:'wait', val:'в работе', cat:'Биохимия' },
];
const STUDIES = [
  { id:'echo', nm:'Эхокардиография (УЗИ сердца)', date:'26 мая 2026', status:'ready', doc:'Петров А. Н.', icon:'pulse' },
  { id:'uziabd', nm:'УЗИ органов брюшной полости', date:'19 мая 2026', status:'ready', doc:'Лебедева О. И.', icon:'scan' },
  { id:'mrt', nm:'МРТ шейного отдела позвоночника', date:'30 мая 2026', status:'ready', doc:'Орлов Д. С.', icon:'scan' },
  { id:'ekg', nm:'ЭКГ с расшифровкой', date:'4 июн 2026', status:'wait', doc:'—', icon:'pulse' },
];
const APPTS = [
  { id:1, d:'9', m:'июн', nm:'Кардиолог, к.м.н. Петров А. Н.', meta:'Вт, 10:30 · Каб. 312 · Поликлиника' },
  { id:2, d:'16', m:'июн', nm:'Эндокринолог Соколова Е. В.', meta:'Вт, 09:00 · Каб. 204 · Поликлиника' },
];
const DOCTORS = [
  { id:'card', nm:'Петров Андрей Николаевич', spec:'Кардиолог, к.м.н.', meta:'Стаж 22 года · Каб. 312', av:'ПА' },
  { id:'ther', nm:'Соколова Елена Викторовна', spec:'Терапевт', meta:'Стаж 18 лет · Каб. 204', av:'СЕ' },
  { id:'endo', nm:'Морозова Ирина Павловна', spec:'Эндокринолог', meta:'Стаж 15 лет · Каб. 207', av:'МИ' },
  { id:'neur', nm:'Орлов Дмитрий Сергеевич', spec:'Невролог', meta:'Стаж 20 лет · Каб. 410', av:'ОД' },
];
const CARS_INIT = [
  { id:1, plate:'А 482 МР 199', brand:'Mercedes-Benz', model:'E-class' },
];

const DOW=['вс','пн','вт','ср','чт','пт','сб'];
const MON=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
function nextWorkDays(n){ const out=[]; const d=new Date(2026,5,2); while(out.length<n){ d.setDate(d.getDate()+1); if(d.getDay()!==0) out.push(new Date(d)); } return out; }
const TIMES=['09:00','10:00','11:00','12:00','15:00','16:00'];

Object.assign(window,{ Icon, QR, PATIENT, LAB_ANALYSES, STUDIES, APPTS, DOCTORS, CARS_INIT, DOW, MON, nextWorkDays, TIMES });
