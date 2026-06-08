import { useState } from "react";

// eslint-disable-next-line no-unused-vars
const C = {
  bg:      "#030D05",
  card:    "#081A0A",
  card2:   "#0D2410",
  border:  "#1A4A20",
  primary: "#2D8B3A",
  light:   "#4ADE60",
  gold:    "#D4A827",
  muted:   "#3A6B40",
  text:    "#E8F5E9",
  sub:     "#6B9B70",
};

const GCV = 188_495_400;
const fmt = (n, d = 0) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d }).format(n);
const toPi = (fcfa) => (fcfa / GCV).toFixed(7);

const T = {
  fr: {
    tabs:        ["Dashboard","Marché Pi","Commander","Mes commandes"],
    subtitle:    "Agriculture Nouvelle Ivoirienne · Filiale N°2",
    pilot:       "Phase Pilote",
    area:        "SUPERFICIE ENGAGÉE",
    target:      "objectif pilote",
    reached:     "de l'objectif atteint",
    farmers:     "planteurs actifs",
    cultures:    "CULTURES PILOTES",
    stock:       "Stock",
    revenue:     "CA consolidé FCFA · 3 cultures",
    havila:      "Fonds HAVILA · de chaque vente",
    pioneers:    "Pionniers Pi · Clients potentiels",
    marketTitle: "Marché Pi ANI",
    marketSub:   "Produits agricoles certifiés · Paiement Pi ou SBC",
    available:   "disponible",
    limited:     "limité",
    addCart:     "Ajouter",
    cart:        "Panier",
    emptyCart:   "Panier vide",
    total:       "Total",
    goToOrder:   "Commander →",
    orderTitle:  "Nouvelle commande",
    address:     "ADRESSE DE LIVRAISON",
    addressPh:   "Quartier, Ville, Côte d'Ivoire",
    delivery:    "Livraison via SEINBU EXPRESS",
    orderSub:    "Paiement validé dans SEINBU FINTECH",
    confirm:     "Confirmer → FINTECH",
    confirmed:   "Commande confirmée !",
    confirmedSub:"Redirigé vers FINTECH pour paiement",
    viewOrders:  "Voir mes commandes",
    myOrders:    "Mes commandes",
    noOrders:    "Aucune commande en cours",
    inTransit:   "En transit",
    delivered:   "Livré",
    pending:     "En attente",
    track:       "Suivre → EXPRESS",
  },
  en: {
    tabs:        ["Dashboard","Pi Market","Order","My Orders"],
    subtitle:    "New Ivorian Agriculture · Subsidiary N°2",
    pilot:       "Pilot Phase",
    area:        "AREA ENGAGED",
    target:      "pilot target",
    reached:     "of target reached",
    farmers:     "active farmers",
    cultures:    "PILOT CROPS",
    stock:       "Stock",
    revenue:     "Consolidated revenue · 3 crops",
    havila:      "HAVILA Fund · from each sale",
    pioneers:    "Pi Pioneers · Potential clients",
    marketTitle: "ANI Pi Market",
    marketSub:   "Certified agricultural products · Pi or SBC payment",
    available:   "available",
    limited:     "limited",
    addCart:     "Add",
    cart:        "Cart",
    emptyCart:   "Empty cart",
    total:       "Total",
    goToOrder:   "Order →",
    orderTitle:  "New order",
    address:     "DELIVERY ADDRESS",
    addressPh:   "District, City, Côte d'Ivoire",
    delivery:    "Delivery via SEINBU EXPRESS",
    orderSub:    "Payment validated in SEINBU FINTECH",
    confirm:     "Confirm → FINTECH",
    confirmed:   "Order confirmed!",
    confirmedSub:"Redirected to FINTECH for payment",
    viewOrders:  "View my orders",
    myOrders:    "My orders",
    noOrders:    "No ongoing orders",
    inTransit:   "In transit",
    delivered:   "Delivered",
    pending:     "Pending",
    track:       "Track → EXPRESS",
  },
};

const PRODUCTS = [
  { id:"riz",     emoji:"🍚", name:"Riz ANI — 25kg",        prix:20000, stock:"disponible" },
  { id:"manioc",  emoji:"🌿", name:"Manioc frais — 10kg",   prix:3000,  stock:"disponible" },
  { id:"banane",  emoji:"🍌", name:"Banane Plantain — 5kg", prix:2500,  stock:"disponible" },
  { id:"biourin", emoji:"♻️", name:"BioUrin™ — Bidon 20L",  prix:12000, stock:"limité"     },
  { id:"huile",   emoji:"🌴", name:"Huile de palme — 5L",   prix:9500,  stock:"disponible" },
];

const MOCK_ORDERS = [
  { id:"ANI-2026-001", product:"Riz ANI — 25kg",      qty:2, total:40000, status:"transit", date:"05/06" },
  { id:"ANI-2026-002", product:"Huile de palme — 5L", qty:3, total:28500, status:"livré",   date:"02/06" },
];

export default function SeinbuANI({ lang = "fr" }) {
  const t = T[lang] || T.fr;
  const [tab,     setTab]     = useState("dashboard");
  const [cart,    setCart]    = useState({});
  const [address, setAddress] = useState("");
  const [ordered, setOrdered] = useState(false);

  const TABS = [
    { id:"dashboard", label:t.tabs[0], icon:"📊" },
    { id:"market",    label:t.tabs[1], icon:"🛒" },
    { id:"order",     label:t.tabs[2], icon:"📝" },
    { id:"orders",    label:t.tabs[3], icon:"📦" },
  ];

  const addToCart    = id => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
  const removeFromCart = id => setCart(c => {
    const n={...c}; if(n[id]>1) n[id]--; else delete n[id]; return n;
  });
  const cartItems = Object.entries(cart).filter(([_,q])=>q>0);
  const cartTotal = cartItems.reduce((s,[id,q])=>{
    const p=PRODUCTS.find(x=>x.id===id); return s+(p?p.prix*q:0);
  },0);

  const sColor = s => s==="transit"?"#D4A827":s==="livré"?"#4ADE60":"#6B9B70";
  const sLabel = s => s==="transit"?t.inTransit:s==="livré"?t.delivered:t.pending;

  return (
    <div style={{background:"#030D05",minHeight:"100dvh",color:"#E8F5E9",
      fontFamily:"system-ui,sans-serif",paddingBottom:80}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#081A0A,#030D05)",
        borderBottom:"1px solid #1A4A20",padding:"14px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,
          background:"linear-gradient(135deg,#2D8B3A,#4ADE60)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🌾</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:800}}>SEINBU ANI</div>
          <div style={{fontSize:9,color:"#6B9B70"}}>{t.subtitle}</div>
        </div>
        <div style={{background:"#2D8B3A22",border:"1px solid #2D8B3A",
          borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:"#4ADE60"}}>
          {t.pilot}
        </div>
      </div>

      {/* Dashboard */}
      {tab==="dashboard"&&(
        <div style={{padding:16}}>
          <div style={{background:"linear-gradient(135deg,#2D8B3A33,#081A0A)",
            border:"1px solid #1A4A2044",borderRadius:16,padding:16,marginBottom:14}}>
            <div style={{fontSize:9,color:"#4ADE60",fontWeight:700,
              letterSpacing:2,marginBottom:8}}>{t.area}</div>
            <div style={{fontSize:32,fontWeight:900}}>
              2 310 <span style={{fontSize:16}}>ha</span>
            </div>
            <div style={{fontSize:11,color:"#6B9B70",marginBottom:10}}>
              sur 3 000 ha {t.target}
            </div>
            <div style={{background:"#1A4A20",borderRadius:4,height:6,
              overflow:"hidden",marginBottom:6}}>
              <div style={{width:"77%",height:"100%",
                background:"linear-gradient(90deg,#2D8B3A,#4ADE60)",borderRadius:4}}/>
            </div>
            <div style={{fontSize:10,color:"#6B9B70"}}>
              77% {t.reached} · 2 847 {t.farmers}
            </div>
          </div>

          <div style={{fontSize:9,color:"#3A6B40",fontWeight:700,
            letterSpacing:2,marginBottom:10}}>{t.cultures}</div>
          {[
            {emoji:"🍚",name:"Riz Paddy",ha:"820 ha",rdt:"4,8 t/ha",
              ca:"708 M FCFA",stock:"3 936 t",color:"#D4A827"},
            {emoji:"🌿",name:"Manioc",ha:"790 ha",rdt:"19,5 t/ha",
              ca:"847 M FCFA",stock:"15 405 t",color:"#4ADE60"},
            {emoji:"🍌",name:"Banane Plantain",ha:"700 ha",rdt:"16 t/ha",
              ca:"1,12 Md FCFA",stock:"11 200 t",color:"#FB923C"},
          ].map(c=>(
            <div key={c.name} style={{background:"#081A0A",border:"1px solid #1A4A20",
              borderRadius:12,padding:"12px 14px",marginBottom:8,
              display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{c.emoji}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700}}>{c.name}</div>
                  <div style={{fontSize:9,color:"#6B9B70"}}>{c.ha} · {c.rdt}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:12,fontWeight:800,color:c.color}}>{c.ca}</div>
                <div style={{fontSize:9,color:"#6B9B70"}}>{t.stock} : {c.stock}</div>
              </div>
            </div>
          ))}

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:6}}>
            {[
              {icon:"💰",val:"2,67 Mds",unit:"FCFA",label:t.revenue,   color:"#D4A827"},
              {icon:"♻️",val:"124 500", unit:"L",   label:"BioUrin™",  color:"#2DD4BF"},
              {icon:"❤️",val:"3%",      unit:"",    label:t.havila,    color:"#EC4899"},
              {icon:"π", val:"200 K+",  unit:"",    label:t.pioneers,  color:"#2D8B3A"},
            ].map(s=>(
              <div key={s.label} style={{background:"#081A0A",
                border:"1px solid #1A4A20",borderRadius:12,padding:12}}>
                <div style={{fontSize:18}}>{s.icon}</div>
                <div style={{fontSize:20,fontWeight:900,color:s.color,marginTop:4}}>
                  {s.val} <span style={{fontSize:11}}>{s.unit}</span>
                </div>
                <div style={{fontSize:8,color:"#6B9B70",marginTop:2,lineHeight:1.3}}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marché Pi */}
      {tab==="market"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:4}}>{t.marketTitle}</div>
          <div style={{fontSize:10,color:"#6B9B70",marginBottom:16}}>{t.marketSub}</div>

          {PRODUCTS.map(p=>(
            <div key={p.id} style={{background:"#081A0A",border:"1px solid #1A4A20",
              borderRadius:14,padding:14,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:28}}>{p.emoji}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700}}>{p.name}</div>
                    <div style={{display:"flex",gap:6,marginTop:3,alignItems:"baseline"}}>
                      <span style={{fontSize:14,fontWeight:900,color:"#D4A827"}}>
                        {fmt(p.prix)} FCFA
                      </span>
                      <span style={{fontSize:9,color:"#6B9B70"}}>{toPi(p.prix)} π</span>
                    </div>
                    <div style={{fontSize:8,marginTop:2,
                      color:p.stock==="limité"?"#D4A827":"#6B9B70"}}>
                      ● {lang==="en"?(p.stock==="limité"?t.limited:t.available):p.stock}
                    </div>
                  </div>
                </div>
                {cart[p.id]?(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div onClick={()=>removeFromCart(p.id)}
                      style={{width:28,height:28,borderRadius:"50%",
                        background:"#2D8B3A33",display:"flex",alignItems:"center",
                        justifyContent:"center",fontSize:18,cursor:"pointer",fontWeight:900}}>−</div>
                    <span style={{fontWeight:900,minWidth:18,textAlign:"center"}}>
                      {cart[p.id]}
                    </span>
                    <div onClick={()=>addToCart(p.id)}
                      style={{width:28,height:28,borderRadius:"50%",
                        background:"#2D8B3A",display:"flex",alignItems:"center",
                        justifyContent:"center",fontSize:18,cursor:"pointer",fontWeight:900}}>+</div>
                  </div>
                ):(
                  <div onClick={()=>addToCart(p.id)}
                    style={{background:"#2D8B3A",borderRadius:8,
                      padding:"7px 14px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                    {t.addCart}
                  </div>
                )}
              </div>
            </div>
          ))}

          {cartItems.length>0&&(
            <div style={{background:"#2D8B3A22",border:"1px solid #2D8B3A",
              borderRadius:14,padding:14,marginTop:8}}>
              <div style={{fontSize:11,fontWeight:800,marginBottom:10}}>
                🛒 {t.cart} ({cartItems.length})
              </div>
              {cartItems.map(([id,qty])=>{
                const p=PRODUCTS.find(x=>x.id===id);
                return(
                  <div key={id} style={{display:"flex",justifyContent:"space-between",
                    fontSize:10,marginBottom:4}}>
                    <span>{p?.emoji} {p?.name} × {qty}</span>
                    <span style={{color:"#D4A827",fontWeight:700}}>
                      {fmt(p?p.prix*qty:0)} FCFA
                    </span>
                  </div>
                );
              })}
              <div style={{borderTop:"1px solid #1A4A20",marginTop:8,paddingTop:8,
                display:"flex",justifyContent:"space-between",fontWeight:900}}>
                <span>{t.total}</span>
                <span style={{color:"#D4A827"}}>{fmt(cartTotal)} FCFA</span>
              </div>
              <div onClick={()=>setTab("order")}
                style={{background:"#2D8B3A",borderRadius:10,padding:"10px 0",
                  textAlign:"center",fontWeight:800,fontSize:12,
                  marginTop:10,cursor:"pointer"}}>
                {t.goToOrder}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Commander */}
      {tab==="order"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.orderTitle}</div>
          {ordered?(
            <div style={{background:"#2D8B3A22",border:"1px solid #2D8B3A",
              borderRadius:16,padding:24,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12}}>✅</div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:8}}>{t.confirmed}</div>
              <div style={{fontSize:11,color:"#6B9B70",marginBottom:16}}>{t.confirmedSub}</div>
              <div onClick={()=>{setOrdered(false);setCart({});setTab("orders");}}
                style={{background:"#2D8B3A",borderRadius:10,padding:"10px 0",
                  fontWeight:800,cursor:"pointer"}}>{t.viewOrders}</div>
            </div>
          ):(
            <>
              <div style={{background:"#081A0A",border:"1px solid #1A4A20",
                borderRadius:14,padding:14,marginBottom:14}}>
                {cartItems.length===0?(
                  <div style={{textAlign:"center",color:"#6B9B70",padding:16}}>
                    {t.emptyCart} —{" "}
                    <span onClick={()=>setTab("market")}
                      style={{color:"#4ADE60",cursor:"pointer",textDecoration:"underline"}}>
                      {lang==="en"?"Go to market":"Aller au marché"}
                    </span>
                  </div>
                ):cartItems.map(([id,qty])=>{
                  const p=PRODUCTS.find(x=>x.id===id);
                  return(
                    <div key={id} style={{display:"flex",justifyContent:"space-between",
                      marginBottom:8,fontSize:11}}>
                      <span>{p?.emoji} {p?.name} × {qty}</span>
                      <span style={{color:"#D4A827",fontWeight:700}}>
                        {fmt(p?p.prix*qty:0)} FCFA
                      </span>
                    </div>
                  );
                })}
                {cartItems.length>0&&(
                  <div style={{borderTop:"1px solid #1A4A20",paddingTop:8,
                    display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:13}}>
                    <span>{t.total}</span>
                    <div style={{textAlign:"right"}}>
                      <div style={{color:"#D4A827"}}>{fmt(cartTotal)} FCFA</div>
                      <div style={{fontSize:9,color:"#6B9B70"}}>≈ {toPi(cartTotal)} π</div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{fontSize:10,color:"#6B9B70",fontWeight:700,
                marginBottom:6,letterSpacing:1}}>{t.address}</div>
              <input value={address} onChange={e=>setAddress(e.target.value)}
                placeholder={t.addressPh}
                style={{width:"100%",background:"#081A0A",border:"1px solid #1A4A20",
                  borderRadius:10,padding:"10px 14px",color:"#E8F5E9",fontSize:12,
                  boxSizing:"border-box",marginBottom:8,outline:"none"}}/>
              <div style={{fontSize:9,color:"#6B9B70",marginBottom:16}}>
                📦 {t.delivery}
              </div>
              <div onClick={()=>cartItems.length>0&&address&&setOrdered(true)}
                style={{background:cartItems.length>0&&address?"#2D8B3A":"#1A4A20",
                  borderRadius:12,padding:"14px 0",textAlign:"center",
                  fontWeight:800,fontSize:13,cursor:"pointer"}}>
                {t.confirm}
              </div>
              <div style={{fontSize:9,color:"#6B9B70",textAlign:"center",marginTop:6}}>
                {t.orderSub}
              </div>
            </>
          )}
        </div>
      )}

      {/* Mes commandes */}
      {tab==="orders"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.myOrders}</div>
          {MOCK_ORDERS.map(o=>(
            <div key={o.id} style={{background:"#081A0A",border:"1px solid #1A4A20",
              borderRadius:14,padding:14,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{fontSize:10,color:"#6B9B70"}}>{o.id}</div>
                <div style={{fontSize:9,fontWeight:700,padding:"2px 8px",
                  borderRadius:6,background:`${sColor(o.status)}22`,
                  color:sColor(o.status)}}>
                  {sLabel(o.status)}
                </div>
              </div>
              <div style={{fontSize:12,fontWeight:700,marginBottom:4}}>
                {o.product} × {o.qty}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <span style={{color:"#D4A827",fontWeight:800}}>{fmt(o.total)} FCFA</span>
                  <span style={{fontSize:9,color:"#6B9B70",marginLeft:6}}>· {o.date}</span>
                </div>
                {o.status==="transit"&&(
                  <div style={{background:"#D4A82722",border:"1px solid #D4A82744",
                    borderRadius:8,padding:"4px 10px",fontSize:9,
                    fontWeight:700,color:"#D4A827",cursor:"pointer"}}>
                    {t.track}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,
        background:"#081A0A",borderTop:"1px solid #1A4A20",display:"flex"}}>
        {TABS.map(tb=>(
          <div key={tb.id} onClick={()=>setTab(tb.id)}
            style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",
              borderTop:tab===tb.id?"2px solid #2D8B3A":"2px solid transparent"}}>
            <div style={{fontSize:16}}>{tb.icon}</div>
            <div style={{fontSize:8,fontWeight:700,
              color:tab===tb.id?"#4ADE60":"#6B9B70"}}>{tb.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
