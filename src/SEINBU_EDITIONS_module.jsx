import { useState } from "react";
const C={bg:"#1A0E00",card:"#261500",border:"#4A2800",primary:"#D97706",light:"#FBD38D",gold:"#D4A827",green:"#4ADE80",text:"#FFFBEB",sub:"#8A5A00",muted:"#3A2000"};
// eslint-disable-next-line no-unused-vars
const GCV=188_495_400,SBC=10;
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
const toPi=(f)=>(f/GCV).toFixed(6);
const T={
  fr:{tabs:["Librairie","E-Books","EdTech","Commandes"],title:"SEINBU ÉDITIONS",sub:"Édition · Culture africaine · EdTech · KAALLEYD",phase:"GCV π",all:"Tous",finance:"Finance",personal:"Personnel",gov:"Gouvernance",free:"Gratuit",buy:"Acheter en Pi",price:"PRIX",addCart:"Ajouter",cart:"Panier",emptyCart:"Panier vide",total:"Total",order:"Commander",ordSub:"Livraison via SEINBU EXPRESS",confirmed:"Commande confirmée !",confirmedSub:"Vous recevrez votre livre sous 48h.",newOrder:"Nouvelle commande",myOrders:"Mes commandes",noOrders:"Aucune commande",inTransit:"En transit",delivered:"Livré",track:"Suivre → EXPRESS",courses:"Formations",enroll:"S'inscrire"},
  en:{tabs:["Bookshop","E-Books","EdTech","Orders"],title:"SEINBU ÉDITIONS",sub:"Publishing · African culture · EdTech · KAALLEYD",phase:"GCV π",all:"All",finance:"Finance",personal:"Personal",gov:"Governance",free:"Free",buy:"Buy with Pi",price:"PRICE",addCart:"Add",cart:"Cart",emptyCart:"Empty cart",total:"Total",order:"Order",ordSub:"Delivery via SEINBU EXPRESS",confirmed:"Order confirmed!",confirmedSub:"You will receive your book within 48h.",newOrder:"New order",myOrders:"My orders",noOrders:"No orders",inTransit:"In transit",delivered:"Delivered",track:"Track → EXPRESS",courses:"Courses",enroll:"Enroll"},
};
const BOOKS=[
  {id:"b1",titleF:"Pi Network, les banques et la régulation",titleE:"Pi Network, banks and regulation",author:"KAALLEYD",pages:"180p",langs:"FR/EN",priceFCFA:15000,free:false,tag:"finance",best:true},
  {id:"b2",titleF:"40 Jours pour briser les chaînes",titleE:"40 Days to Break the Chains",author:"KAALLEYD",pages:"120p",langs:"FR/EN",priceFCFA:10000,free:false,tag:"personal",best:false},
  {id:"b3",titleF:"Le Roc et la Source",titleE:"The Rock and the Source",author:"KAALLEYD",pages:"210p",langs:"FR",priceFCFA:18000,free:false,tag:"gov",best:false},
  {id:"b4",titleF:"SEINBU COIN (SBC) — Whitepaper v1.3",titleE:"SEINBU COIN (SBC) — Whitepaper v1.3",author:"SEINBU GROUP SA",pages:"64p",langs:"FR/EN",priceFCFA:0,free:true,tag:"finance",best:false},
];
const COURSES=[
  {id:"c1",icon:"🔗",titleF:"Blockchain pour Entrepreneurs CI",titleE:"Blockchain for CI Entrepreneurs",level:"Intermediate",hours:"6h",students:830,price:5000},
  {id:"c2",icon:"📊",titleF:"Tokenomics & SBC Coin",titleE:"Tokenomics & SBC Coin",level:"Advanced",hours:"3h",students:420,price:8000},
  {id:"c3",icon:"✍️",titleF:"Écriture & Publication en Afrique",titleE:"Writing & Publishing in Africa",level:"Beginner",hours:"5h",students:560,price:6000},
  {id:"c4",icon:"🌍",titleF:"Gouvernance Africaine Moderne",titleE:"Modern African Governance",level:"Intermediate",hours:"8h",students:290,price:10000},
];
const MOCK_ORDERS=[
  {id:"EDI-2026-001",title:"Pi Network, les banques...",status:"transit",date:"05/06"},
  {id:"EDI-2026-002",title:"40 Jours pour briser...",status:"livré",date:"02/06"},
];
export default function SeinbuEditions({lang="fr"}){
  const t=T[lang]||T.fr;
  const[tab,setTab]=useState("books");
  const[filter,setFilter]=useState("all");
  const[cart,setCart]=useState({});
  const[confirmed,setConfirmed]=useState(false);
  const TABS=[{id:"books",label:t.tabs[0],icon:"📚"},{id:"ebooks",label:t.tabs[1],icon:"📱"},{id:"edtech",label:t.tabs[2],icon:"🎓"},{id:"orders",label:t.tabs[3],icon:"📦"}];
  const FILTERS=[{id:"all",lbl:t.all},{id:"finance",lbl:t.finance},{id:"personal",lbl:t.personal},{id:"gov",lbl:t.gov},{id:"free",lbl:t.free}];
  const filtered=BOOKS.filter(b=>filter==="all"||(filter==="free"?b.free:b.tag===filter));
  const cartItems=Object.entries(cart).filter(([_,q])=>q>0);
  const cartTotal=cartItems.reduce((s,[id,q])=>{const b=BOOKS.find(x=>x.id===id);return s+(b&&!b.free?b.priceFCFA*q:0);},0);
  const add=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const sColor=s=>s==="transit"?"#D4A827":s==="livré"?"#4ADE80":"#6B7A9A";
  const sLabel=s=>s==="transit"?t.inTransit:s==="livré"?t.delivered:lang==="en"?"Pending":"En attente";
  const Card=({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>);
  return(
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,fontFamily:"system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,borderBottom:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:`linear-gradient(135deg,${C.primary},#92400E)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>📚</div>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800}}>{t.title}</div><div style={{fontSize:9,color:C.sub}}>{t.sub}</div></div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>{t.phase}</div>
      </div>
      {tab==="books"&&<div style={{padding:16}}>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:12}}>
          {FILTERS.map(f=>(<div key={f.id} onClick={()=>setFilter(f.id)} style={{flexShrink:0,padding:"6px 12px",borderRadius:20,background:filter===f.id?C.primary:C.card,border:`1px solid ${filter===f.id?C.primary:C.border}`,fontSize:10,fontWeight:700,cursor:"pointer",color:filter===f.id?"#fff":C.sub}}>{f.lbl}</div>))}
        </div>
        {filtered.map(b=>(<Card key={b.id}>
          <div style={{display:"flex",gap:10}}>
            <div style={{width:50,height:66,borderRadius:6,background:C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>📖</div>
            <div style={{flex:1}}>
              {b.best&&<div style={{fontSize:8,background:C.gold,color:"#000",borderRadius:4,padding:"1px 6px",display:"inline-block",marginBottom:4,fontWeight:700}}>★ BEST-SELLER</div>}
              <div style={{fontSize:12,fontWeight:800,lineHeight:1.3,marginBottom:4}}>{lang==="en"?b.titleE:b.titleF}</div>
              <div style={{fontSize:9,color:C.sub}}>{b.author} · {b.pages} · {b.langs}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                <div>
                  {b.free?<span style={{color:C.green,fontWeight:800,fontSize:12}}>{t.free}</span>:<span style={{color:C.gold,fontWeight:900,fontSize:13}}>{fmt(b.priceFCFA)} FCFA</span>}
                  {!b.free&&<div style={{fontSize:8,color:C.sub}}>{toPi(b.priceFCFA)} π</div><div style={{fontSize:7,color:"#A855F7"}}>{fmt(b.priceFCFA*188495400/10,0)} SBC<div style={{fontSize:7,color:"#A855F7"}}>{fmt(b.priceFCFA*188495400/10,0)} SBC</div></div>}
                </div>
                <div onClick={()=>{if(!b.free)add(b.id);}} style={{background:b.free?C.green:C.primary,borderRadius:8,padding:"6px 12px",fontSize:10,fontWeight:700,cursor:"pointer",color:b.free?"#000":"#fff"}}>{b.free?lang==="en"?"Download":"Télécharger":t.addCart}</div>
              </div>
            </div>
          </div>
        </Card>))}
        {cartItems.length>0&&<div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,borderRadius:14,padding:14}}>
          <div style={{fontSize:11,fontWeight:800,marginBottom:10}}>🛒 {t.cart} ({cartItems.length})</div>
          {cartItems.map(([id,q])=>{const b=BOOKS.find(x=>x.id===id);return(<div key={id} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span>{lang==="en"?b?.titleE:b?.titleF} × {q}</span><span style={{color:C.gold,fontWeight:700}}>{fmt((b?.priceFCFA||0)*q)} FCFA</span></div>);})}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:900,marginTop:8}}><span>{t.total}</span><span style={{color:C.gold}}>{fmt(cartTotal)} FCFA</span></div>
          {confirmed?(<div style={{marginTop:10,textAlign:"center"}}><div style={{fontSize:18,marginBottom:4}}>✅</div><div style={{fontSize:12,fontWeight:800}}>{t.confirmed}</div><div style={{fontSize:10,color:C.sub}}>{t.confirmedSub}</div></div>):(<div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>setConfirmed(true));else setConfirmed(true);}} style={{marginTop:10,background:C.primary,borderRadius:10,padding:"10px 0",textAlign:"center",fontWeight:800,fontSize:12,cursor:"pointer"}}>🔐 {t.order}</div>)}
          <div style={{fontSize:9,color:C.sub,textAlign:"center",marginTop:4}}>📦 {t.ordSub}</div>
        </div>}
      </div>}
      {tab==="ebooks"&&<div style={{padding:16}}>
        {BOOKS.map(b=>(<Card key={b.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:12,fontWeight:800}}>{lang==="en"?b.titleE:b.titleF}</div><div style={{fontSize:9,color:C.sub}}>{b.author} · PDF · {b.langs}</div></div>
            <div style={{background:b.free?C.green:C.primary,borderRadius:8,padding:"6px 12px",fontSize:10,fontWeight:700,cursor:"pointer",color:b.free?"#000":"#fff",flexShrink:0,marginLeft:8}}>{b.free?lang==="en"?"Free":"Gratuit":fmt(b.priceFCFA)+" FCFA"}</div>
          </div>
        </Card>))}
      </div>}
      {tab==="edtech"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>{t.courses}</div>
        {COURSES.map(c=>(<Card key={c.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{display:"flex",gap:10}}>
              <span style={{fontSize:24}}>{c.icon}</span>
              <div><div style={{fontSize:12,fontWeight:800}}>{lang==="en"?c.titleE:c.titleF}</div><div style={{fontSize:9,color:C.sub}}>{c.level} · {c.hours} · {fmt(c.students)} {lang==="en"?"students":"étudiants"}</div></div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}><div style={{fontSize:13,fontWeight:900,color:C.gold}}>{fmt(c.price)} FCFA</div><div style={{fontSize:8,color:C.sub}}>{toPi(c.price)} π</div><div style={{fontSize:7,color:"#A855F7"}}>{fmt(c.price*188495400/10,0)} SBC<div style={{fontSize:7,color:"#A855F7"}}>{fmt(c.price*188495400/10,0)} SBC</div></div>
          </div>
          <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>{});}} style={{background:C.primary,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔐 {t.enroll}</div>
        </Card>))}
      </div>}
      {tab==="orders"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>{t.myOrders}</div>
        {MOCK_ORDERS.length===0?(<div style={{textAlign:"center",color:C.sub,padding:30}}>{t.noOrders}</div>):MOCK_ORDERS.map(o=>(<Card key={o.id}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontSize:10,color:C.sub}}>{o.id}</div><div style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:6,background:`${sColor(o.status)}22`,color:sColor(o.status)}}>{sLabel(o.status)}</div></div>
          <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>{o.title}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:9,color:C.sub}}>{o.date}</div>
            {o.status==="transit"&&<div style={{background:`${C.gold}22`,border:`1px solid ${C.gold}44`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.gold,cursor:"pointer"}}>{t.track}</div>}
          </div>
        </Card>))}
      </div>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(<div key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}><div style={{fontSize:16}}>{tb.icon}</div><div style={{fontSize:8,fontWeight:700,color:tab===tb.id?C.light:C.sub}}>{tb.label}</div></div>))}
      </div>
    </div>
  );
}
