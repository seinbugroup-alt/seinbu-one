import { useState } from "react";
const C={bg:"#020F0A",card:"#061A0E",border:"#0A3A1A",primary:"#059669",light:"#34D399",gold:"#D4A827",green:"#4ADE80",text:"#ECFDF5",sub:"#1A6B40",muted:"#0A2A14"};
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
const toPi=(f)=>(f/GCV).toFixed(7);
const T={
  fr:{tabs:["Produits","Nutrition IA","Abonnements","Commandes"],title:"SEINBU NUTRITECH",sub:"Nutrition & Santé · Intelligence Artificielle",phase:"Beta",prodsTitle:"Nos Produits",prodsSub:"Qualité certifiée · Paiement Pi ou SBC",addCart:"Ajouter",cart:"Panier",emptyCart:"Panier vide",total:"Total",order:"Commander",ordSub:"Livraison via SEINBU EXPRESS",confirmed:"Commande confirmée !",confirmedSub:"Votre commande est en cours de préparation.",newOrder:"Nouvelle commande",aiTitle:"NutriCell-AI",aiSub:"Posez vos questions sur la nutrition et la santé",aiPh:"Ex: Quels aliments pour l'énergie ?",aiBtn:"Analyser",subsTitle:"Abonnements Santé",monthly:"/ mois",subscribe:"S'abonner",myOrders:"Mes commandes",noOrders:"Aucune commande",inTransit:"En transit",delivered:"Livré",track:"Suivre → EXPRESS"},
  en:{tabs:["Products","AI Nutrition","Subscriptions","Orders"],title:"SEINBU NUTRITECH",sub:"Nutrition & Health · Artificial Intelligence",phase:"Beta",prodsTitle:"Our Products",prodsSub:"Certified quality · Pi or SBC payment",addCart:"Add",cart:"Cart",emptyCart:"Empty cart",total:"Total",order:"Order",ordSub:"Delivery via SEINBU EXPRESS",confirmed:"Order confirmed!",confirmedSub:"Your order is being prepared.",newOrder:"New order",aiTitle:"NutriCell-AI",aiSub:"Ask your nutrition and health questions",aiPh:"E.g. Which foods for energy?",aiBtn:"Analyze",subsTitle:"Health Subscriptions",monthly:"/ month",subscribe:"Subscribe",myOrders:"My orders",noOrders:"No orders",inTransit:"In transit",delivered:"Delivered",track:"Track → EXPRESS"},
};
const PRODUCTS=[
  {id:"p1",emoji:"🌿",nameF:"NutriCell Boost",nameE:"NutriCell Boost",descF:"Complexe vitamines & minéraux · Énergie naturelle",descE:"Vitamins & minerals complex · Natural energy",price:12000,unit:"boîte 30j"},
  {id:"p2",emoji:"🍃",nameF:"Détox Ayurveda",nameE:"Ayurveda Detox",descF:"Plantes ayurvédiques certifiées · Purification",descE:"Certified Ayurvedic plants · Purification",price:8500,unit:"sachet 15j"},
  {id:"p3",emoji:"💧",nameF:"Hydra Pi Pro",nameE:"Hydra Pi Pro",descF:"Électrolytes naturels · Récupération sportive",descE:"Natural electrolytes · Sports recovery",price:6000,unit:"boîte 20j"},
  {id:"p4",emoji:"🫀",nameF:"CardioCell CI",nameE:"CardioCell CI",descF:"Santé cardiovasculaire · Formule africaine",descE:"Cardiovascular health · African formula",price:15000,unit:"boîte 30j"},
];
const SUBS=[
  {id:"s1",name:"STARTER",price:5000,color:"#059669",perks:["Accès produits de base","Suivi nutritionnel","Support email"]},
  {id:"s2",name:"PREMIUM",price:15000,color:"#D4A827",pop:true,perks:["Tous les produits","NutriCell-AI illimité","Livraison gratuite","Support prioritaire"]},
  {id:"s3",name:"VIP",price:35000,color:"#A78BFA",perks:["Pack complet mensuel","Consultation nutritionniste","NutriCell-AI avancé","Livraison express"]},
];
const MOCK_ORDERS=[
  {id:"NTR-2026-001",product:"NutriCell Boost × 2",status:"transit",date:"05/06"},
  {id:"NTR-2026-002",product:"Détox Ayurveda × 1",status:"livré",date:"02/06"},
];
const AI_RESPONSES={
  fr:{"énergie":"Les aliments riches en énergie naturelle : bananes, dattes, noix, œufs, patates douces et légumineuses. Associez-les à NutriCell Boost pour un effet optimal. 🌿","protéines":"Sources de protéines en Côte d'Ivoire : poisson (thiof, chinchard), viandes maigres, œufs, haricots, arachides. Cibles : 0,8g/kg de poids corporel par jour. 💪","default":"Je suis NutriCell-AI, votre assistant nutrition SEINBU. Je peux vous aider sur l'alimentation équilibrée, les compléments naturels et les habitudes santé adaptées à l'Afrique. 🌱"},
  en:{"energy":"Energy-rich foods: bananas, dates, nuts, eggs, sweet potatoes and legumes. Combine with NutriCell Boost for optimal effect. 🌿","protein":"Protein sources in Côte d'Ivoire: fish (thiof, horse mackerel), lean meats, eggs, beans, peanuts. Target: 0.8g/kg body weight per day. 💪","default":"I am NutriCell-AI, your SEINBU nutrition assistant. I can help you with balanced nutrition, natural supplements and healthy habits adapted to Africa. 🌱"},
};
export default function SeinbuNutriTech({lang="fr"}){
  const t=T[lang]||T.fr;
  const[tab,setTab]=useState("products");
  const[cart,setCart]=useState({});
  const[confirmed,setConfirmed]=useState(false);
  const[aiQuery,setAiQuery]=useState("");
  const[aiResponse,setAiResponse]=useState("");
  const[aiLoading,setAiLoading]=useState(false);
  const TABS=[{id:"products",label:t.tabs[0],icon:"🌿"},{id:"ai",label:t.tabs[1],icon:"🤖"},{id:"subs",label:t.tabs[2],icon:"⭐"},{id:"orders",label:t.tabs[3],icon:"📦"}];
  const cartItems=Object.entries(cart).filter(([_,q])=>q>0);
  const cartTotal=cartItems.reduce((s,[id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return s+(p?p.price*q:0);},0);
  const add=id=>setCart(c=>({...c,[id]:(c[id]||0)+1}));
  const sColor=s=>s==="transit"?"#D4A827":s==="livré"?"#4ADE80":"#6B7A9A";
  const sLabel=s=>s==="transit"?t.inTransit:s==="livré"?t.delivered:lang==="en"?"Pending":"En attente";
  const askAI=()=>{
    if(!aiQuery)return;
    setAiLoading(true);
    setTimeout(()=>{
      const responses=AI_RESPONSES[lang]||AI_RESPONSES.fr;
      const key=Object.keys(responses).find(k=>aiQuery.toLowerCase().includes(k))||"default";
      setAiResponse(responses[key]);
      setAiLoading(false);
    },1000);
  };
  const Card=({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>);
  return(
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,fontFamily:"system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,borderBottom:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:`linear-gradient(135deg,${C.primary},${C.light})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🌿</div>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800}}>{t.title}</div><div style={{fontSize:9,color:C.sub}}>{t.sub}</div></div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>{t.phase}</div>
      </div>
      {tab==="products"&&<div style={{padding:16}}>
        <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{t.prodsTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.prodsSub}</div>
        {PRODUCTS.map(p=>(<Card key={p.id}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:26}}>{p.emoji}</span>
              <div>
                <div style={{fontSize:12,fontWeight:800}}>{lang==="en"?p.nameE:p.nameF}</div>
                <div style={{fontSize:9,color:C.sub}}>{lang==="en"?p.descE:p.descF}</div>
                <div style={{display:"flex",gap:6,marginTop:4,alignItems:"baseline"}}>
                  <span style={{fontSize:13,fontWeight:900,color:C.gold}}>{fmt(p.price)} FCFA</span>
                  <span style={{fontSize:8,color:C.sub}}>{toPi(p.price)} π</span>
                </div>
                <div style={{fontSize:8,color:C.muted}}>{p.unit}</div>
              </div>
            </div>
            {cart[p.id]?(<div style={{display:"flex",alignItems:"center",gap:8}}>
              <div onClick={()=>setCart(c=>{const n={...c};if(n[p.id]>1)n[p.id]--;else delete n[p.id];return n;})} style={{width:28,height:28,borderRadius:"50%",background:`${C.primary}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",fontWeight:900}}>−</div>
              <span style={{fontWeight:900,minWidth:18,textAlign:"center"}}>{cart[p.id]}</span>
              <div onClick={()=>add(p.id)} style={{width:28,height:28,borderRadius:"50%",background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",fontWeight:900}}>+</div>
            </div>):(<div onClick={()=>add(p.id)} style={{background:C.primary,borderRadius:8,padding:"7px 12px",fontSize:10,fontWeight:700,cursor:"pointer",flexShrink:0}}>{t.addCart}</div>)}
          </div>
        </Card>))}
        {cartItems.length>0&&<Card style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`}}>
          <div style={{fontSize:11,fontWeight:800,marginBottom:8}}>🛒 {t.cart} ({cartItems.length})</div>
          {cartItems.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return(<div key={id} style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}><span>{p?.emoji} {lang==="en"?p?.nameE:p?.nameF} × {q}</span><span style={{color:C.gold,fontWeight:700}}>{fmt((p?.price||0)*q)} FCFA</span></div>);})}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:900,marginTop:8}}><span>{t.total}</span><span style={{color:C.gold}}>{fmt(cartTotal)} FCFA</span></div>
          {confirmed?(<div style={{textAlign:"center",marginTop:10}}>✅ {t.confirmed}</div>):(<div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>setConfirmed(true));else setConfirmed(true);}} style={{marginTop:10,background:C.primary,borderRadius:10,padding:"9px 0",textAlign:"center",fontWeight:800,fontSize:12,cursor:"pointer"}}>🔐 {t.order}</div>)}
          <div style={{fontSize:9,color:C.sub,textAlign:"center",marginTop:4}}>📦 {t.ordSub}</div>
        </Card>}
      </div>}
      {tab==="ai"&&<div style={{padding:16}}>
        <div style={{fontSize:15,fontWeight:800,marginBottom:4}}>{t.aiTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:16}}>{t.aiSub}</div>
        <div style={{position:"relative",marginBottom:12}}>
          <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder={t.aiPh} style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 50px 10px 14px",color:C.text,fontSize:12,boxSizing:"border-box",outline:"none"}}/>
          <div onClick={askAI} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:C.primary,borderRadius:6,padding:"4px 8px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{t.aiBtn}</div>
        </div>
        {aiLoading&&<Card style={{textAlign:"center",padding:20}}><div style={{fontSize:24}}>🤖</div><div style={{fontSize:11,color:C.sub,marginTop:8}}>{lang==="en"?"Analyzing...":"Analyse en cours..."}</div></Card>}
        {aiResponse&&<Card style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`}}><div style={{fontSize:9,color:C.light,fontWeight:700,letterSpacing:1,marginBottom:8}}>NUTRICELL-AI</div><div style={{fontSize:12,lineHeight:1.6}}>{aiResponse}</div></Card>}
        {!aiResponse&&!aiLoading&&<Card><div style={{fontSize:11,color:C.sub,lineHeight:1.6}}>{lang==="en"?"Ask me about nutrition, health supplements, balanced diets and healthy habits adapted to West Africa.":"Posez-moi des questions sur la nutrition, les compléments de santé, l'alimentation équilibrée et les habitudes saines adaptées à l'Afrique de l'Ouest."}</div></Card>}
      </div>}
      {tab==="subs"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:14}}>{t.subsTitle}</div>
        {SUBS.map(s=>(<Card key={s.id} style={{background:s.pop?`${s.color}22`:C.card,border:`1px solid ${s.pop?s.color:C.border}`}}>
          {s.pop&&<div style={{fontSize:9,background:s.color,color:"#000",borderRadius:4,padding:"2px 8px",display:"inline-block",marginBottom:8,fontWeight:700}}>★ {lang==="en"?"RECOMMENDED":"RECOMMANDÉ"}</div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:16,fontWeight:900,color:s.color}}>{s.name}</div>
            <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:900,color:C.gold}}>{fmt(s.price)} FCFA</div><div style={{fontSize:8,color:C.sub}}>{toPi(s.price)} π{t.monthly}</div></div>
          </div>
          {s.perks.map((p,i)=>(<div key={i} style={{fontSize:10,marginBottom:4,color:C.text}}>✅ {lang==="en"?["Basic products access","Nutritional tracking","Email support","All products","NutriCell-AI unlimited","Free delivery","Priority support","Monthly full pack","Nutritionist consultation","Advanced NutriCell-AI","Express delivery"][SUBS.indexOf(s)*4+i]||p:p}</div>))}
          <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>{});}} style={{marginTop:10,background:s.color,borderRadius:8,padding:"9px 0",textAlign:"center",fontWeight:800,fontSize:11,cursor:"pointer",color:"#000"}}>🔐 {t.subscribe}</div>
        </Card>))}
      </div>}
      {tab==="orders"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>{t.myOrders}</div>
        {MOCK_ORDERS.map(o=>(<Card key={o.id}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontSize:10,color:C.sub}}>{o.id}</div><div style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:6,background:`${sColor(o.status)}22`,color:sColor(o.status)}}>{sLabel(o.status)}</div></div>
          <div style={{fontSize:12,fontWeight:700,marginBottom:6}}>{o.product}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:9,color:C.sub}}>{o.date}</div>{o.status==="transit"&&<div style={{background:`${C.gold}22`,border:`1px solid ${C.gold}44`,borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.gold,cursor:"pointer"}}>{t.track}</div>}</div>
        </Card>))}
      </div>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(<div key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}><div style={{fontSize:16}}>{tb.icon}</div><div style={{fontSize:8,fontWeight:700,color:tab===tb.id?C.light:C.sub}}>{tb.label}</div></div>))}
      </div>
    </div>
  );
}
