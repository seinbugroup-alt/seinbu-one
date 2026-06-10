import { useState } from "react";
const C={bg:"#080C14",card:"#0E1624",border:"#1A2A44",primary:"#3B82F6",light:"#93C5FD",gold:"#D4A827",green:"#4ADE80",orange:"#F97316",text:"#EFF6FF",sub:"#3A5A8A",muted:"#0E2040"};
const GCV=188_495_400;
// eslint-disable-next-line no-unused-vars
const SBCIcon = () => (
  <svg width="18" height="18" viewBox="0 0 500 500" style={{display:"inline-block",verticalAlign:"middle",marginRight:4}}>
    <defs>
      <radialGradient id="si1" cx="33%" cy="28%" r="72%"><stop offset="0%" stopColor="#ffe8a0"/><stop offset="100%" stopColor="#3a2000"/></radialGradient>
      <radialGradient id="si2" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#1e0840"/><stop offset="100%" stopColor="#06011a"/></radialGradient>
      <radialGradient id="si3" cx="38%" cy="32%" r="65%"><stop offset="0%" stopColor="#c8920a"/><stop offset="100%" stopColor="#2e1e00"/></radialGradient>
      <linearGradient id="sig" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ffe880"/><stop offset="100%" stopColor="#c8920a"/></linearGradient>
    </defs>
    <circle cx="250" cy="250" r="196" fill="url(#si1)"/>
    <circle cx="250" cy="250" r="182" fill="url(#si2)"/>
    <circle cx="250" cy="250" r="158" fill="none" stroke="#d4a017" strokeWidth="1.8" opacity=".65"/>
    <circle cx="250" cy="250" r="46" fill="url(#si3)"/>
    <circle cx="250" cy="250" r="46" fill="none" stroke="#ffe066" strokeWidth="1.5" opacity=".7"/>
    <text x="250" y="258" textAnchor="middle" fontFamily="'Trebuchet MS',sans-serif" fontSize="20" fontWeight="900" fill="url(#sig)">SBC</text>
    <circle cx="250" cy="250" r="182" fill="none" stroke="#d4a017" strokeWidth="2.5" opacity=".75"/>
  </svg>
);

const fmt=(n,d=0)=>new Intl.NumberFormat("fr-FR",{maximumFractionDigits:d}).format(n);
const toPi=(f,d=6)=>(f/GCV).toFixed(d);
const T={
  fr:{tabs:["Vue d'ensemble","DRIVE","MARINE","Énergie"],title:"SEINBU INDUSTRIE",sub:"DRIVE · MARINE · RAIL · Énergie · BTP · Agro-industrie",phase:"CI",overTitle:"Secteurs Industriels",budget:"Budget total",horizon:"Horizon",progress:"Avancement",reserve:"Réserver",confirmed:"Réservation confirmée !",confirmedSub:"Notre équipe vous contacte sous 24h.",newRes:"Nouvelle réservation",cancel:"Annuler",driveTitle:"SEINBU DRIVE",driveSub:"Véhicules électriques · Côte d'Ivoire · Paiement Pi GCV",marineTitle:"SEINBU MARINE",marineSub:"Transport fluvial & maritime · Blockchain Pi",energyTitle:"SEINBU ÉNERGIE",energySub:"Solaire · Hydro · Bioénergie · Tokens SBC",route:"Trajet",departure:"Départ",arrival:"Arrivée",duration:"Durée",bookTicket:"Réserver → FINTECH",available:"Disponible",limited:"Limité",planning:"Planification"},
  en:{tabs:["Overview","DRIVE","MARINE","Energy"],title:"SEINBU INDUSTRIE",sub:"DRIVE · MARINE · RAIL · Energy · Construction · Agro-industry",phase:"CI",overTitle:"Industrial Sectors",budget:"Total budget",horizon:"Horizon",progress:"Progress",reserve:"Reserve",confirmed:"Reservation confirmed!",confirmedSub:"Our team will contact you within 24h.",newRes:"New reservation",cancel:"Cancel",driveTitle:"SEINBU DRIVE",driveSub:"Electric vehicles · Côte d'Ivoire · Pi GCV payment",marineTitle:"SEINBU MARINE",marineSub:"River & maritime transport · Pi Blockchain",energyTitle:"SEINBU ÉNERGIE",energySub:"Solar · Hydro · Bioenergy · SBC Tokens",route:"Route",departure:"Departure",arrival:"Arrival",duration:"Duration",bookTicket:"Book → FINTECH",available:"Available",limited:"Limited",planning:"Planning"},
};
const SECTORS=[
  {id:"drive",emoji:"🚗",nameF:"SEINBU DRIVE",nameE:"SEINBU DRIVE",descF:"Premier VE africain conçu en CI",descE:"First African EV designed in CI",budget:"18M",pct:30,color:"#22C55E"},
  {id:"marine",emoji:"🚢",nameF:"SEINBU MARINE",nameE:"SEINBU MARINE",descF:"Transport fluvial & maritime",descE:"River & maritime transport",budget:"25M",pct:15,color:"#0891B2"},
  {id:"rail",emoji:"🚂",nameF:"SEINBU RAIL",nameE:"SEINBU RAIL",descF:"Fret ferroviaire UEMOA",descE:"UEMOA rail freight",budget:"2.5M",pct:5,color:"#F59E0B"},
  {id:"energy",emoji:"⚡",nameF:"SEINBU ÉNERGIE",nameE:"SEINBU ENERGY",descF:"Solaire · Hydro · Bioénergie",descE:"Solar · Hydro · Bioenergy",budget:"45M",pct:25,color:"#F97316"},
  {id:"btp",emoji:"🏗️",nameF:"BTP INDUSTRIE",nameE:"BTP INDUSTRIE",descF:"Construction & génie civil",descE:"Construction & civil engineering",budget:"35M",pct:20,color:"#8B5CF6"},
  {id:"agro",emoji:"🌾",nameF:"AGRO-INDUSTRIE",nameE:"AGRO-INDUSTRIE",descF:"Transformation riz bio & cacao",descE:"Organic rice & cocoa processing",budget:"12M",pct:45,color:"#D4A827"},
];
const MARINE_ROUTES=[
  {id:"r1",from:"Abidjan",to:"San-Pédro",dur:"4h",price:8000,stock:"disponible"},
  {id:"r2",from:"Abidjan",to:"Grand-Bassam",dur:"45min",price:2000,stock:"disponible"},
  {id:"r3",from:"Abidjan",to:"Assinie",dur:"1h30",price:3500,stock:"disponible"},
  {id:"r4",from:"Abidjan",to:"Sassandra",dur:"6h",price:12000,stock:"limité"},
];
const EV_MODELS=[
  {id:"e1",emoji:"🚗",nameF:"DRIVE City",nameE:"DRIVE City",range:"280km",price:18_000_000,stock:"disponible"},
  {id:"e2",emoji:"🚕",nameF:"DRIVE SUV",nameE:"DRIVE SUV",range:"420km",price:25_000_000,stock:"disponible"},
  {id:"e3",emoji:"🚌",nameF:"DRIVE Bus",nameE:"DRIVE Bus",range:"350km",price:45_000_000,stock:"limité"},
];
export default function SeinbuIndustrie({lang="fr"}){
  const t=T[lang]||T.fr;
  const[tab,setTab]=useState("overview");
  const[selRoute,setSelRoute]=useState(null);
// eslint-disable-next-line no-unused-vars
  const[selEV,setSelEV]=useState(null);
  const[confirmed,setConfirmed]=useState(false);
  const TABS=[{id:"overview",label:t.tabs[0],icon:"📊"},{id:"drive",label:t.tabs[1],icon:"🚗"},{id:"marine",label:t.tabs[2],icon:"⚓"},{id:"energy",label:t.tabs[3],icon:"⚡"}];
  const Card=({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>);
  const Lbl=({children})=>(<div style={{fontSize:9,color:C.sub,fontWeight:700,letterSpacing:2,marginBottom:6}}>{children}</div>);
  const stockColor=s=>s==="disponible"||s==="available"?C.green:C.gold;
  const stockLabel=s=>s==="disponible"?(lang==="en"?t.available:s):s==="limité"?(lang==="en"?t.limited:s):lang==="en"?t.planning:"Planification";
  return(
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,fontFamily:"system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,borderBottom:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:`linear-gradient(135deg,${C.primary},#1D4ED8)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏭</div>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800}}>{t.title}</div><div style={{fontSize:9,color:C.sub}}>{t.sub}</div></div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>{t.phase}</div>
      </div>
      {tab==="overview"&&<div style={{padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[{val:"6",label:lang==="en"?"Sectors":"Secteurs",color:C.light},{val:"63,6 Mds",label:"FCFA",color:C.gold},{val:"2026-35",label:t.horizon,color:C.green}].map(s=>(<Card key={s.label} style={{textAlign:"center",padding:"12px 8px"}}><div style={{fontSize:18,fontWeight:900,color:s.color}}>{s.val}</div><div style={{fontSize:8,color:C.sub,marginTop:2}}>{s.label}</div></Card>))}
        </div>
        <Lbl>{t.overTitle.toUpperCase()}</Lbl>
        {SECTORS.map(s=>(<Card key={s.id} style={{cursor:"pointer"}} onClick={()=>["drive","marine","energy"].includes(s.id)&&setTab(s.id)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>{s.emoji}</span><div><div style={{fontSize:12,fontWeight:800}}>{lang==="en"?s.nameE:s.nameF}</div><div style={{fontSize:9,color:C.sub}}>{lang==="en"?s.descE:s.descF}</div></div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:800,color:s.color}}>{s.pct}%</div><div style={{fontSize:8,color:C.sub}}>{s.budget} FCFA</div></div>
          </div>
          <div style={{background:C.muted,borderRadius:3,height:5}}><div style={{width:`${s.pct}%`,height:"100%",background:s.color,borderRadius:3}}/></div>
        </Card>))}
      </div>}
      {tab==="drive"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{t.driveTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.driveSub}</div>
        {confirmed?(<Card style={{textAlign:"center",padding:20}}><div style={{fontSize:36,marginBottom:8}}>✅</div><div style={{fontSize:14,fontWeight:800,marginBottom:6}}>{t.confirmed}</div><div style={{fontSize:11,color:C.sub,marginBottom:14}}>{t.confirmedSub}</div><div onClick={()=>{setConfirmed(false);setSelEV(null);}} style={{background:C.primary,borderRadius:10,padding:"9px 0",fontWeight:800,cursor:"pointer"}}>{t.newRes}</div></Card>):(
          EV_MODELS.map(v=>(<Card key={v.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:28}}>{v.emoji}</span><div><div style={{fontSize:13,fontWeight:800}}>{lang==="en"?v.nameE:v.nameF}</div><div style={{fontSize:10,color:C.sub}}>{lang==="en"?"Range":"Autonomie"} : {v.range}</div><div style={{fontSize:8,color:stockColor(v.stock)}}>{stockLabel(v.stock)}</div></div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:900,color:C.gold}}>{fmt(v.price)} FCFA</div><div style={{fontSize:9,color:C.sub}}>{toPi(v.price,4)} π</div><div style={{fontSize:7,color:"#A855F7"}}>{fmt(v.price*188495400/10,0)} SBC<div style={{fontSize:7,color:"#A855F7"}}>{fmt(v.price,4*188495400/10,0)} SBC</div></div>
            </div>
            <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>setConfirmed(true));else setConfirmed(true);}} style={{background:C.primary,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔐 {t.reserve}</div>
          </Card>))
        )}
      </div>}
      {tab==="marine"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{t.marineTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.marineSub}</div>
        {MARINE_ROUTES.map(r=>(<Card key={r.id} style={{background:selRoute===r.id?`${C.primary}22`:C.card,border:`1px solid ${selRoute===r.id?C.primary:C.border}`,cursor:"pointer"}} onClick={()=>setSelRoute(selRoute===r.id?null:r.id)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:12,fontWeight:800}}>🚢 {r.from} → {r.to}</div><div style={{fontSize:9,color:C.sub}}>{t.duration} : {r.dur} · <span style={{color:stockColor(r.stock)}}>{stockLabel(r.stock)}</span></div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:900,color:C.gold}}>{fmt(r.price)} FCFA</div><div style={{fontSize:9,color:C.sub}}>{toPi(r.price)} π</div><div style={{fontSize:7,color:"#A855F7"}}>{fmt(r.price*188495400/10,0)} SBC<div style={{fontSize:7,color:"#A855F7"}}>{fmt(r.price*188495400/10,0)} SBC</div></div>
          </div>
          {selRoute===r.id&&<div onClick={e=>{e.stopPropagation();if(window.seinbuAuth)window.seinbuAuth(()=>setSelRoute(null));else setSelRoute(null);}} style={{marginTop:10,background:C.primary,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔐 {t.bookTicket}</div>}
        </Card>))}
      </div>}
      {tab==="energy"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{t.energyTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.energySub}</div>
        {[{emoji:"☀️",nameF:"Solaire Pi",nameE:"Pi Solar",descF:"Microgrids tokenisés · Chaque kWh = SBC",descE:"Tokenized microgrids · Each kWh = SBC",pct:45,color:C.gold},{emoji:"💧",nameF:"Hydro CI",nameE:"Hydro CI",descF:"Barrages fluviaux · Production propre",descE:"River dams · Clean production",pct:30,color:C.primary},{emoji:"🌱",nameF:"Bioénergie",nameE:"Bioenergy",descF:"Déchets agricoles → électricité",descE:"Agricultural waste → electricity",pct:25,color:C.green}].map(e=>(<Card key={e.nameF}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:24}}>{e.emoji}</span><div><div style={{fontSize:13,fontWeight:800,color:e.color}}>{lang==="en"?e.nameE:e.nameF}</div><div style={{fontSize:9,color:C.sub}}>{lang==="en"?e.descE:e.descF}</div></div></div><div style={{fontSize:14,fontWeight:900,color:e.color}}>{e.pct}%</div></div>
          <div style={{background:C.muted,borderRadius:3,height:5}}><div style={{width:`${e.pct}%`,height:"100%",background:e.color,borderRadius:3}}/></div>
        </Card>))}
        <Card style={{background:`${C.orange}22`,border:`1px solid ${C.orange}44`}}>
          <div style={{fontSize:11,fontWeight:800,color:C.orange,marginBottom:6}}>+284 SBC</div>
          <div style={{fontSize:10,color:C.sub}}>{lang==="en"?"≈ 2 840 FCFA · Tokenized solar surplus":"≈ 2 840 FCFA · Surplus solaire tokenisé automatiquement"}</div>
        </Card>
      </div>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(<div key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}><div style={{fontSize:16}}>{tb.icon}</div><div style={{fontSize:8,fontWeight:700,color:tab===tb.id?C.light:C.sub}}>{tb.label}</div></div>))}
      </div>
    </div>
  );
}
