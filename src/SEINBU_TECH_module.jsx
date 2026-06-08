import { useState } from "react";

const C = {
  bg:"#020818", card:"#060F24", border:"#0F2A5A",
  primary:"#2563EB", light:"#60A5FA", gold:"#D4A827",
  green:"#4ADE80", red:"#EF4444", text:"#E0EAFF",
  sub:"#3A5A8A", muted:"#1A3A6A",
};

const GCV = 188_495_400;
const fmt = (n,d=0) => new Intl.NumberFormat("fr-FR",{maximumFractionDigits:d}).format(n);
const toPi = (fcfa) => (fcfa/GCV).toFixed(6);

const T = {
  fr: {
    tabs:       ["Services","Commander","Mes commandes"],
    title:      "SEINBU TECH",
    sub:        "Technologies · Développement · Innovation · IA",
    servSub:    "Paiement Pi · Certification SEINBU SECURITY",
    from:       "à partir de",
    select:     "Demander →",
    tag:        "CI",
    orderTitle: "Demande de service",
    orderSub:   "Paiement validé dans SEINBU FINTECH",
    selectLbl:  "SERVICE SÉLECTIONNÉ",
    noSelect:   "Sélectionner un service depuis l'onglet Services",
    describe:   "DÉCRIVEZ VOTRE BESOIN",
    describePh: "Décrivez votre projet...",
    contact:    "CONTACT",
    contactPh:  "Email ou WhatsApp",
    confirm:    "Confirmer → FINTECH",
    confirmed:  "Demande envoyée !",
    confirmedSub:"Notre équipe vous contacte sous 24h.",
    newReq:     "Nouvelle demande",
    myOrders:   "Mes commandes",
    noOrders:   "Aucune commande en cours",
    pending:    "En attente",
    inProgress: "En cours",
    delivered:  "Livré",
    track:      "Suivre → EXPRESS",
  },
  en: {
    tabs:       ["Services","Order","My Orders"],
    title:      "SEINBU TECH",
    sub:        "Technology · Development · Innovation · AI",
    servSub:    "Pi payment · SEINBU SECURITY certified",
    from:       "from",
    select:     "Request →",
    tag:        "CI",
    orderTitle: "Service request",
    orderSub:   "Payment validated in SEINBU FINTECH",
    selectLbl:  "SELECTED SERVICE",
    noSelect:   "Select a service from the Services tab",
    describe:   "DESCRIBE YOUR NEED",
    describePh: "Describe your project...",
    contact:    "CONTACT",
    contactPh:  "Email or WhatsApp",
    confirm:    "Confirm → FINTECH",
    confirmed:  "Request sent!",
    confirmedSub:"Our team will contact you within 24h.",
    newReq:     "New request",
    myOrders:   "My orders",
    noOrders:   "No ongoing orders",
    pending:    "Pending",
    inProgress: "In progress",
    delivered:  "Delivered",
    track:      "Track → EXPRESS",
  },
};

const SERVICES = [
  { id:"erp",    icon:"🖥️", nameF:"ERP SEINBU",              nameE:"SEINBU ERP",
    descF:"Gestion intégrée pour PME africaines. Pi-natif, multidevises.",
    descE:"Integrated management for African SMEs. Pi-native, multicurrency.",
    prix:500000, tag:"SaaS" },
  { id:"cloud",  icon:"☁️",  nameF:"Cloud Pi Hébergement",    nameE:"Pi Cloud Hosting",
    descF:"Hébergement sécurisé certifié SEINBU. Paiement Pi mensuel.",
    descE:"SEINBU-certified secure hosting. Monthly Pi payment.",
    prix:50000, tag:"Mensuel" },
  { id:"ia",     icon:"🤖",  nameF:"IA & Analyse de données",  nameE:"AI & Data Analytics",
    descF:"Solutions IA pour agriculture, finance et santé en Afrique.",
    descE:"AI solutions for agriculture, finance and health in Africa.",
    prix:300000, tag:"Projet" },
  { id:"mobile", icon:"📱",  nameF:"Développement Mobile",    nameE:"Mobile Development",
    descF:"Applications Pi-ready pour l'écosystème SEINBU ONE.",
    descE:"Pi-ready apps for the SEINBU ONE ecosystem.",
    prix:800000, tag:"Projet" },
  { id:"kyc",    icon:"🔐",  nameF:"Intégration KYC Pi",      nameE:"Pi KYC Integration",
    descF:"KYC Pi pour vérification de pionniers. Partenariat SECURITY.",
    descE:"Pi KYC for pioneer verification. SECURITY partnership.",
    prix:200000, tag:"Setup" },
  { id:"smart",  icon:"🏠",  nameF:"Smart Home / IoT",        nameE:"Smart Home / IoT",
    descF:"Domotique Pi Network. Gestion énergie solaire tokenisée.",
    descE:"Pi Network home automation. Tokenized solar energy.",
    prix:1500000, tag:"Projet" },
];

const MOCK_ORDERS = [
  { id:"TECH-2026-001", service:"ERP SEINBU",          prix:500000, status:"inProgress", date:"01/06" },
  { id:"TECH-2026-002", service:"Intégration KYC Pi",  prix:200000, status:"pending",    date:"05/06" },
];

export default function SeinbuTech({ lang = "fr" }) {
  const t = T[lang] || T.fr;
  const [tab,       setTab]       = useState("services");
  const [selected,  setSelected]  = useState(null);
  const [describe,  setDescribe]  = useState("");
  const [contact,   setContact]   = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const TABS = [
    { id:"services", label:t.tabs[0], icon:"⚙️" },
    { id:"order",    label:t.tabs[1], icon:"📋" },
    { id:"orders",   label:t.tabs[2], icon:"📦" },
  ];

  const selServ = SERVICES.find(s => s.id === selected);

  const sColor = s => s==="inProgress"?C.gold:s==="delivered"?C.green:C.sub;
  const sLabel = s => s==="inProgress"?t.inProgress:s==="delivered"?t.delivered:t.pending;

  return (
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,
      fontFamily:"system-ui,sans-serif",paddingBottom:80}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#060F24,#020818)",
        borderBottom:`1px solid ${C.border}`,padding:"14px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,
          background:"linear-gradient(135deg,#2563EB,#60A5FA)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>⚡</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:800}}>{t.title}</div>
          <div style={{fontSize:9,color:C.sub}}>{t.sub}</div>
        </div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}44`,
          borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>
          {t.tag}
        </div>
      </div>

      {/* ── Services ── */}
      {tab==="services"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:10,color:C.sub,marginBottom:16}}>{t.servSub}</div>
          {SERVICES.map(s=>(
            <div key={s.id} style={{background:C.card,border:`1px solid ${C.border}`,
              borderRadius:14,padding:16,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:24}}>{s.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:800}}>
                      {lang==="en"?s.nameE:s.nameF}
                    </div>
                    <div style={{fontSize:8,background:`${C.primary}22`,color:C.light,
                      borderRadius:4,padding:"1px 6px",display:"inline-block",marginTop:2}}>
                      {s.tag}
                    </div>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:9,color:C.sub}}>{t.from}</div>
                  <div style={{fontSize:14,fontWeight:900,color:C.gold}}>
                    {fmt(s.prix)} FCFA
                  </div>
                  <div style={{fontSize:9,color:C.sub}}>{toPi(s.prix)} π</div>
                </div>
              </div>
              <div style={{fontSize:10,color:C.sub,lineHeight:1.5,marginBottom:12}}>
                {lang==="en"?s.descE:s.descF}
              </div>
              <div onClick={()=>{ setSelected(s.id); setTab("order"); }}
                style={{background:`linear-gradient(135deg,${C.primary},#1D4ED8)`,
                  borderRadius:8,padding:"9px 0",textAlign:"center",
                  fontWeight:800,fontSize:11,cursor:"pointer"}}>
                {t.select}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Commander ── */}
      {tab==="order"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.orderTitle}</div>
          {confirmed?(
            <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,
              borderRadius:16,padding:24,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12}}>✅</div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:8}}>{t.confirmed}</div>
              <div style={{fontSize:11,color:C.sub,marginBottom:20}}>{t.confirmedSub}</div>
              <div onClick={()=>{setConfirmed(false);setSelected(null);
                setDescribe("");setContact("");setTab("orders");}}
                style={{background:C.primary,borderRadius:10,padding:"10px 0",
                  fontWeight:800,cursor:"pointer"}}>{t.tabs[2]}</div>
            </div>
          ):(
            <>
              {/* Service sélectionné */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:8}}>{t.selectLbl}</div>
              {selServ?(
                <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,
                  borderRadius:12,padding:14,marginBottom:16,
                  display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:22}}>{selServ.icon}</span>
                    <div>
                      <div style={{fontSize:12,fontWeight:800}}>
                        {lang==="en"?selServ.nameE:selServ.nameF}
                      </div>
                      <div style={{fontSize:9,color:C.sub}}>{selServ.tag}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:14,fontWeight:900,color:C.gold}}>
                      {toPi(selServ.prix)} π
                    </div>
                    <div style={{fontSize:9,color:C.sub}}>{fmt(selServ.prix)} FCFA</div>
                  </div>
                </div>
              ):(
                <div style={{background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:12,padding:14,marginBottom:16,textAlign:"center",
                  color:C.sub,fontSize:10}}>
                  {t.noSelect}
                </div>
              )}

              {/* Description */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:6}}>{t.describe}</div>
              <textarea value={describe} onChange={e=>setDescribe(e.target.value)}
                placeholder={t.describePh} rows={4}
                style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:10,padding:"10px 14px",color:C.text,fontSize:11,
                  boxSizing:"border-box",marginBottom:14,outline:"none",
                  resize:"none",fontFamily:"inherit"}}/>

              {/* Contact */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:6}}>{t.contact}</div>
              <input value={contact} onChange={e=>setContact(e.target.value)}
                placeholder={t.contactPh}
                style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:10,padding:"10px 14px",color:C.text,fontSize:12,
                  boxSizing:"border-box",marginBottom:20,outline:"none"}}/>

              <div onClick={()=>selServ&&describe&&contact&&setConfirmed(true)}
                style={{background:selServ&&describe&&contact
                  ?`linear-gradient(135deg,${C.primary},#1D4ED8)`:C.muted,
                  borderRadius:12,padding:"14px 0",textAlign:"center",
                  fontWeight:800,fontSize:13,cursor:"pointer"}}>
                {t.confirm}
              </div>
              <div style={{fontSize:9,color:C.sub,textAlign:"center",marginTop:6}}>
                {t.orderSub}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Mes commandes ── */}
      {tab==="orders"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.myOrders}</div>
          {MOCK_ORDERS.length===0?(
            <div style={{textAlign:"center",color:C.sub,padding:40}}>{t.noOrders}</div>
          ):MOCK_ORDERS.map(o=>(
            <div key={o.id} style={{background:C.card,border:`1px solid ${C.border}`,
              borderRadius:14,padding:14,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{fontSize:10,color:C.sub}}>{o.id}</div>
                <div style={{fontSize:9,fontWeight:700,padding:"2px 8px",
                  borderRadius:6,background:`${sColor(o.status)}22`,
                  color:sColor(o.status)}}>
                  {sLabel(o.status)}
                </div>
              </div>
              <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{o.service}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <span style={{color:C.gold,fontWeight:800}}>{fmt(o.prix)} FCFA</span>
                  <span style={{fontSize:9,color:C.sub,marginLeft:6}}>· {o.date}</span>
                </div>
                <div style={{background:`${C.gold}22`,border:`1px solid ${C.gold}44`,
                  borderRadius:8,padding:"4px 10px",fontSize:9,
                  fontWeight:700,color:C.gold,cursor:"pointer"}}>
                  {t.track}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nav */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,
        background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(
          <div key={tb.id} onClick={()=>setTab(tb.id)}
            style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",
              borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}>
            <div style={{fontSize:18}}>{tb.icon}</div>
            <div style={{fontSize:8,fontWeight:700,
              color:tab===tb.id?C.light:C.sub}}>{tb.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
