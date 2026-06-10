import { useState } from "react";
const C={bg:"#020C1B",card:"#061626",border:"#0A2A4A",primary:"#0891B2",light:"#22D3EE",gold:"#D4A827",green:"#4ADE80",text:"#E0F2FE",sub:"#2A6A8A",muted:"#0A3A5A"};
// eslint-disable-next-line no-unused-vars
const GCV=188_495_400,SBC=10;
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
const toPi=(f)=>(f/GCV).toFixed(6);
const T={
  fr:{tabs:["Crédit","Internet","Appels","Historique"],title:"SEINBU TELECOM",sub:"Recharge · Internet · Appels · 5G CI",phase:"Bêta",operator:"OPÉRATEUR",amount:"MONTANT",payWith:"PAYER AVEC",topup:"Recharger",phone:"NUMÉRO À RECHARGER",phonePh:"Ex: +225 07 12 34 56",popular:"POPULAIRE",plans:"FORFAITS DATA",calls:"FORFAITS APPELS",history:"Historique",dest:"Destination",duration:"Durée",confirmed:"Recharge confirmée !",confirmedSub:"Votre crédit a été envoyé.",newTx:"Nouvelle recharge",cancel:"Annuler"},
  en:{tabs:["Credit","Internet","Calls","History"],title:"SEINBU TELECOM",sub:"Top-up · Internet · Calls · 5G CI",phase:"Beta",operator:"OPERATOR",amount:"AMOUNT",payWith:"PAY WITH",topup:"Top-up",phone:"NUMBER TO TOP-UP",phonePh:"E.g. +225 07 12 34 56",popular:"POPULAR",plans:"DATA PLANS",calls:"CALL PLANS",history:"History",dest:"Destination",duration:"Duration",confirmed:"Top-up confirmed!",confirmedSub:"Your credit has been sent.",newTx:"New top-up",cancel:"Cancel"},
};
const OPS=[{id:"orange",name:"Orange CI",color:"#FF6B00",icon:"🟠"},{id:"mtn",name:"MTN CI",color:"#FFCB05",icon:"🟡"},{id:"moov",name:"Moov Africa",color:"#00A651",icon:"🟢"}];
const RECHARGES=[500,1000,2000,5000,10000,20000];
const DATA=[{id:"d1",name:"Starter",data:"500 Mo",days:1,price:500},{id:"d2",name:"Daily",data:"1 Go",days:1,price:1000},{id:"d3",name:"Weekly",data:"5 Go",days:7,price:3000},{id:"d4",name:"Monthly",data:"20 Go",days:30,price:8000},{id:"d5",name:"Pro",data:"50 Go",days:30,price:15000},{id:"d6",name:"Infinity",data:"∞",days:30,price:25000}];
const CALLS_DATA=[{id:"c1",dest:"Tous réseaux CI",destEn:"All CI networks",min:100,days:30,price:2000},{id:"c2",dest:"Tous réseaux CI",destEn:"All CI networks",min:300,days:30,price:5000},{id:"c3",dest:"Réseau SEINBU",destEn:"SEINBU Network",min:-1,days:30,price:3000},{id:"c4",dest:"UEMOA + France",destEn:"UEMOA + France",min:30,days:30,price:10000}];
export default function SeinbuTelecom({lang="fr"}){
  const t=T[lang]||T.fr;
  const[tab,setTab]=useState("credit");
  const[op,setOp]=useState("orange");
  const[phone,setPhone]=useState("");
  const[amt,setAmt]=useState(null);
  const[method,setMethod]=useState("pi");
  const[done,setDone]=useState(false);
  const[selPlan,setSelPlan]=useState(null);
  const TABS=[{id:"credit",label:t.tabs[0],icon:"📱"},{id:"internet",label:t.tabs[1],icon:"📡"},{id:"calls",label:t.tabs[2],icon:"📞"},{id:"history",label:t.tabs[3],icon:"📋"}];
  const Card=({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>);
  const Lbl=({children})=>(<div style={{fontSize:9,color:C.sub,fontWeight:700,letterSpacing:2,marginBottom:6}}>{children}</div>);
  return(
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,fontFamily:"system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,borderBottom:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:`linear-gradient(135deg,${C.primary},${C.light})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📡</div>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800}}>{t.title}</div><div style={{fontSize:9,color:C.sub}}>{t.sub}</div></div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>{t.phase}</div>
      </div>
      {tab==="credit"&&<div style={{padding:16}}>
        {done?(<Card style={{textAlign:"center",padding:24}}>
          <div style={{fontSize:36,marginBottom:12}}>✅</div>
          <div style={{fontSize:15,fontWeight:800,marginBottom:8}}>{t.confirmed}</div>
          <div style={{fontSize:11,color:C.sub,marginBottom:16}}>{t.confirmedSub}</div>
          <div onClick={()=>{setDone(false);setAmt(null);setPhone("");}} style={{background:C.primary,borderRadius:10,padding:"10px 0",fontWeight:800,cursor:"pointer"}}>{t.newTx}</div>
        </Card>):(
          <>
            <Lbl>{t.operator}</Lbl>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {OPS.map(o=>(<div key={o.id} onClick={()=>setOp(o.id)} style={{background:op===o.id?`${o.color}22`:C.card,border:`2px solid ${op===o.id?o.color:C.border}`,borderRadius:12,padding:"10px 6px",textAlign:"center",cursor:"pointer"}}><div style={{fontSize:20}}>{o.icon}</div><div style={{fontSize:10,fontWeight:700,marginTop:4}}>{o.name}</div></div>))}
            </div>
            <Lbl>{t.phone}</Lbl>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t.phonePh} style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:12,boxSizing:"border-box",marginBottom:14,outline:"none"}}/>
            <Lbl>{t.amount}</Lbl>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:14}}>
              {RECHARGES.map(a=>(<div key={a} onClick={()=>setAmt(a)} style={{background:amt===a?`${C.primary}22`:C.card,border:`1px solid ${amt===a?C.primary:C.border}`,borderRadius:10,padding:"10px 4px",textAlign:"center",cursor:"pointer"}}><div style={{fontSize:12,fontWeight:800}}>{fmt(a)}</div><div style={{fontSize:8,color:C.sub}}>FCFA</div><div style={{fontSize:8,color:C.gold}}>{toPi(a)} π</div></div>))}
            </div>
            <Lbl>{t.payWith}</Lbl>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {[{id:"pi",lbl:"π Pi",c:C.gold},{id:"sbc",lbl:<><SBCIcon/>SBC</>,c:C.light}].map(m=>(<div key={m.id} onClick={()=>setMethod(m.id)} style={{flex:1,padding:"11px 0",textAlign:"center",borderRadius:12,border:`1px solid ${method===m.id?m.c:C.border}`,background:method===m.id?`${m.c}22`:C.card,cursor:"pointer",fontWeight:800,color:m.c}}>{m.lbl}</div>))}
            </div>
            {amt&&<div style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,color:C.sub}}>{lang==="en"?"You pay":"Vous payez"}</span>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:900,color:C.gold}}>{(amt/188495400).toFixed(6)} π</div>
                <div style={{fontSize:10,color:C.light}}>{new Intl.NumberFormat("fr-FR").format(Math.round(amt/10))} SBC</div>
              </div>
            </div>}
            <div onClick={()=>{if(phone&&amt){if(window.seinbuAuth)window.seinbuAuth(()=>setDone(true));else setDone(true);}}} style={{background:phone&&amt?C.primary:C.muted,borderRadius:12,padding:"13px 0",textAlign:"center",fontWeight:800,fontSize:13,cursor:"pointer"}}>🔐 {t.topup}</div>
          </>
        )}
      </div>}
      {tab==="internet"&&<div style={{padding:16}}>
        <Lbl>{t.plans}</Lbl>
        {DATA.map(p=>(<div key={p.id} onClick={()=>setSelPlan(selPlan===p.id?null:p.id)} style={{background:selPlan===p.id?`${C.primary}22`:C.card,border:`1px solid ${selPlan===p.id?C.primary:C.border}`,borderRadius:14,padding:14,marginBottom:8,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:14,fontWeight:800,color:C.light}}>{p.name}</div><div style={{fontSize:11,color:C.sub}}>{p.data} · {p.days}{lang==="en"?"d":"j"}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:900,color:C.gold}}>{fmt(p.price)} FCFA</div><div style={{fontSize:9,color:C.sub}}>{toPi(p.price)} π</div></div>
          </div>
          {selPlan===p.id&&<div onClick={e=>{e.stopPropagation();if(window.seinbuAuth)window.seinbuAuth(()=>setSelPlan(null));else setSelPlan(null);}} style={{marginTop:10,background:C.primary,borderRadius:8,padding:"9px 0",textAlign:"center",fontSize:11,fontWeight:800,cursor:"pointer"}}>🔐 {lang==="en"?"Subscribe":"Souscrire"}</div>}
        </div>))}
      </div>}
      {tab==="calls"&&<div style={{padding:16}}>
        <Lbl>{t.calls}</Lbl>
        {CALLS_DATA.map(p=>(<Card key={p.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:13,fontWeight:800}}>{p.min===-1?lang==="en"?"Unlimited":"Illimité":`${p.min} min`}</div><div style={{fontSize:10,color:C.sub}}>{lang==="en"?p.destEn:p.dest} · {p.days}{lang==="en"?"d":"j"}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:900,color:C.gold}}>{fmt(p.price)} FCFA</div><div style={{fontSize:9,color:C.sub}}>{toPi(p.price)} π</div></div>
          </div>
          <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>{});}} style={{marginTop:8,background:C.primary,borderRadius:8,padding:"7px 0",textAlign:"center",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔐 {lang==="en"?"Subscribe":"Souscrire"}</div>
        </Card>))}
      </div>}
      {tab==="history"&&<div style={{padding:16}}>
        <Lbl>{t.history.toUpperCase()}</Lbl>
        {[{type:"credit",num:"+225 07 12 34 56",amt:"2 000 FCFA",date:"06/06",ok:true},{type:"data",num:"Weekly 5Go",amt:"3 000 FCFA",date:"04/06",ok:true},{type:"calls",num:"300 min",amt:"5 000 FCFA",date:"01/06",ok:true},{type:"credit",num:"+225 05 98 76 54",amt:"1 000 FCFA",date:"30/05",ok:false}].map((tx,i)=>(<Card key={i}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:`${tx.ok?C.green:C.gold}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{tx.type==="credit"?"📱":tx.type==="data"?"📡":"📞"}</div>
              <div><div style={{fontSize:11,fontWeight:700}}>{tx.num}</div><div style={{fontSize:9,color:C.sub}}>{tx.date}</div></div>
            </div>
            <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:800,color:C.gold}}>{tx.amt}</div><div style={{fontSize:9,color:tx.ok?C.green:C.gold}}>{tx.ok?(lang==="en"?"Done":"Effectué"):(lang==="en"?"Pending":"En attente")}</div></div>
          </div>
        </Card>))}
      </div>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(<div key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}><div style={{fontSize:16}}>{tb.icon}</div><div style={{fontSize:8,fontWeight:700,color:tab===tb.id?C.light:C.sub}}>{tb.label}</div></div>))}
      </div>
    </div>
  );
}
