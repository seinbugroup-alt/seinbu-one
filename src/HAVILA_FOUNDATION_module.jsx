import { useState } from "react";

const C = {
  bg:     "#0A0118",
  card:   "#110228",
  border: "#2D0B6B",
  primary:"#9333EA",
  light:  "#C084FC",
  gold:   "#D4A827",
  pink:   "#EC4899",
  green:  "#4ADE80",
  text:   "#F3E8FF",
  sub:    "#7C3A9B",
  muted:  "#4A1A6B",
};

const GCV = 188_495_400;
const fmt = (n,d=0) => new Intl.NumberFormat("fr-FR",{maximumFractionDigits:d}).format(n);
const toPi = (fcfa,d=6) => (fcfa/GCV).toFixed(d);

const T = {
  fr: {
    tabs:        ["Accueil","Donner"],
    title:       "FONDATION HAVILA",
    subtitle:    "Éducation · Santé · Action Sociale",
    phase:       "Active",
    mission:     "Notre Mission",
    missionText: "HAVILA est la conscience sociale de SEINBU GROUP. Fondée en mémoire d'une vie chère, elle agit pour les familles ivoiriennes vulnérables à travers l'éducation, la santé et le désendettement.",
    collected:   "Dons Pi collectés",
    wallet:      "Wallet Pi public",
    allocation:  "AFFECTATION DES FONDS 2026",
    sources:     "SOURCES DE FINANCEMENT",
    transparency:"3% de chaque transaction Pi dans l'écosystème SEINBU → HAVILA",
    donateTitle: "Faire un Don en Pi",
    donateSub:   "Chaque Pi compte. Votre don est transparent et traçable sur Stellar.",
    suggested:   "MONTANTS SUGGÉRÉS",
    custom:      "Montant libre (π)",
    customPh:    "Ex: 0.5",
    method:      "MÉTHODE DE PAIEMENT",
    methodPi:    "Pi Network",
    methodSbc:   "SBC Coin",
    equiv:       "Équivalent",
    confirm:     "Confirmer le don → FINTECH",
    confirmed:   "Don confirmé ! Merci.",
    confirmedSub:"Votre générosité aide les familles ivoiriennes.",
    newDon:      "Faire un autre don",
    impact:      "Votre impact",
    impactItems: ["1 enfant scolarisé / an","1 consultation médicale","1 famille désendettée"],
  },
  en: {
    tabs:        ["Home","Donate"],
    title:       "HAVILA FOUNDATION",
    subtitle:    "Education · Health · Social Action",
    phase:       "Active",
    mission:     "Our Mission",
    missionText: "HAVILA is the social conscience of SEINBU GROUP. Founded in memory of a cherished life, it acts for vulnerable Ivorian families through education, health and debt relief.",
    collected:   "Pi donations collected",
    wallet:      "Public Pi wallet",
    allocation:  "2026 FUND ALLOCATION",
    sources:     "FUNDING SOURCES",
    transparency:"3% of every Pi transaction in the SEINBU ecosystem → HAVILA",
    donateTitle: "Donate in Pi",
    donateSub:   "Every Pi counts. Your donation is transparent and traceable on Stellar.",
    suggested:   "SUGGESTED AMOUNTS",
    custom:      "Custom amount (π)",
    customPh:    "E.g. 0.5",
    method:      "PAYMENT METHOD",
    methodPi:    "Pi Network",
    methodSbc:   "SBC Coin",
    equiv:       "Equivalent",
    confirm:     "Confirm donation → FINTECH",
    confirmed:   "Donation confirmed! Thank you.",
    confirmedSub:"Your generosity helps Ivorian families.",
    newDon:      "Make another donation",
    impact:      "Your impact",
    impactItems: ["1 child schooled / year","1 medical consultation","1 family debt-freed"],
  },
};

const PROGRAMS = [
  {name:"HAVILA ROSE",  pct:40, budget:"28 M FCFA", emoji:"🎗️", color:"#EC4899"},
  {name:"HAVILA ÉCOLE", pct:35, budget:"25 M FCFA", emoji:"📚", color:"#A855F7"},
  {name:"HAVILA SOCIAL",pct:20, budget:"14 M FCFA", emoji:"🤝", color:"#D4A827"},
  {name:"Fonctionnement",pct:5, budget:"3 M FCFA",  emoji:"⚙️", color:"#6B7280"},
];

const SOURCES = [
  {label:"5% profits SEINBU GROUP",    val:"15 M",  color:"#9333EA"},
  {label:"Micro-dons Pi Network",       val:"5 M",   color:"#D4A827"},
  {label:"Institutions internationales",val:"20 M",  color:"#4ADE80"},
  {label:"Mécénat entreprises",         val:"10 M",  color:"#2DD4BF"},
  {label:"Contributions fondateur",     val:"10 M",  color:"#C084FC"},
  {label:"Événements caritatifs",       val:"5 M",   color:"#F59E0B"},
  {label:"Diaspora & legs",             val:"5 M",   color:"#818CF8"},
];

const PALIERS = [0.01, 0.05, 0.1, 0.5, 1];

export default function HavilaFoundation({ lang = "fr" }) {
  const t = T[lang] || T.fr;
  const [tab,       setTab]       = useState("home");
  const [amount,    setAmount]    = useState(0.1);
  const [customAmt, setCustomAmt] = useState("");
  const [method,    setMethod]    = useState("pi");
  const [confirmed, setConfirmed] = useState(false);

  const donAmount = customAmt ? parseFloat(customAmt)||0 : amount;
  const donFCFA   = donAmount * GCV;

  const TABS = [
    {id:"home",   label:t.tabs[0], icon:"🏠"},
    {id:"donate", label:t.tabs[1], icon:"💜"},
  ];

  return (
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,
      fontFamily:"system-ui,sans-serif",paddingBottom:80}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#1a0840,#0A0118)",
        borderBottom:`1px solid ${C.border}`,padding:"14px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,overflow:"hidden"}}>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' rx='10' fill='%239333EA'/%3E%3Ctext x='22' y='30' text-anchor='middle' font-size='22'%3E🎗️%3C/text%3E%3C/svg%3E"
            style={{width:"100%",height:"100%"}} alt="HAVILA"/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:800}}>{t.title}</div>
          <div style={{fontSize:9,color:C.sub}}>{t.subtitle}</div>
        </div>
        <div style={{background:`${C.green}22`,border:`1px solid ${C.green}44`,
          borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.green}}>
          ● {t.phase}
        </div>
      </div>

      {/* Home */}
      {tab==="home"&&(
        <div style={{padding:16}}>

          {/* Mission */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,
            borderRadius:14,padding:16,marginBottom:14}}>
            <div style={{fontSize:10,color:C.light,fontWeight:700,
              letterSpacing:1,marginBottom:8}}>{t.mission.toUpperCase()}</div>
            <div style={{fontSize:11,color:C.text,lineHeight:1.6}}>{t.missionText}</div>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <div style={{background:C.card,border:`1px solid ${C.border}`,
              borderRadius:12,padding:14}}>
              <div style={{fontSize:9,color:C.sub,marginBottom:6}}>{t.collected}</div>
              <div style={{fontSize:22,fontWeight:900,color:C.gold}}>0.3714 π</div>
              <div style={{fontSize:9,color:C.sub}}>≈ 70 M FCFA</div>
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,
              borderRadius:12,padding:14}}>
              <div style={{fontSize:9,color:C.sub,marginBottom:6}}>{t.wallet}</div>
              <div style={{fontSize:11,fontWeight:700,color:C.light,
                wordBreak:"break-all"}}>GDGU2I...PQUI</div>
            </div>
          </div>

          {/* Allocation */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,
            borderRadius:14,padding:16,marginBottom:14}}>
            <div style={{fontSize:9,color:C.light,fontWeight:700,
              letterSpacing:2,marginBottom:14}}>{t.allocation}</div>
            {PROGRAMS.map(p=>(
              <div key={p.name} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:11,fontWeight:700}}>
                    {p.emoji} {p.name}
                  </span>
                  <span style={{fontSize:11,fontWeight:800,color:p.color}}>
                    {p.pct}% · {p.budget}
                  </span>
                </div>
                <div style={{background:"#1a0840",borderRadius:3,height:5}}>
                  <div style={{width:`${p.pct}%`,height:"100%",
                    background:p.color,borderRadius:3}}/>
                </div>
              </div>
            ))}
          </div>

          {/* Sources */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,
            borderRadius:14,padding:16,marginBottom:14}}>
            <div style={{fontSize:9,color:C.light,fontWeight:700,
              letterSpacing:2,marginBottom:12}}>{t.sources}</div>
            {SOURCES.map(s=>(
              <div key={s.label} style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:8,fontSize:11}}>
                <span style={{color:C.text}}>{s.label}</span>
                <span style={{fontWeight:800,color:s.color}}>{s.val} FCFA</span>
              </div>
            ))}
            <div style={{fontSize:9,color:C.sub,marginTop:8,fontStyle:"italic",
              borderTop:`1px solid ${C.border}`,paddingTop:8}}>
              {t.transparency}
            </div>
          </div>

          {/* CTA */}
          <div onClick={()=>setTab("donate")}
            style={{background:`linear-gradient(135deg,${C.primary},${C.pink})`,
              borderRadius:14,padding:"14px 0",textAlign:"center",
              fontWeight:800,fontSize:14,cursor:"pointer"}}>
            💜 {t.tabs[1]}
          </div>
        </div>
      )}

      {/* Donner */}
      {tab==="donate"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:4}}>{t.donateTitle}</div>
          <div style={{fontSize:10,color:C.sub,marginBottom:20}}>{t.donateSub}</div>

          {confirmed?(
            <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,
              borderRadius:16,padding:24,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12}}>💜</div>
              <div style={{fontSize:16,fontWeight:800,marginBottom:8}}>{t.confirmed}</div>
              <div style={{fontSize:11,color:C.sub,marginBottom:20}}>{t.confirmedSub}</div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,
                borderRadius:12,padding:12,marginBottom:16}}>
                <div style={{fontSize:10,color:C.sub,marginBottom:6}}>{t.impact}</div>
                {t.impactItems.map((item,i)=>(
                  <div key={i} style={{fontSize:10,marginBottom:4}}>
                    ✅ {item}
                  </div>
                ))}
              </div>
              <div onClick={()=>{setConfirmed(false);setCustomAmt("");}}
                style={{background:C.primary,borderRadius:10,padding:"10px 0",
                  fontWeight:800,cursor:"pointer"}}>{t.newDon}</div>
            </div>
          ):(
            <>
              {/* Paliers */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:10}}>{t.suggested}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
                {PALIERS.map(p=>(
                  <div key={p} onClick={()=>{setAmount(p);setCustomAmt("");}}
                    style={{flex:"1 1 auto",padding:"10px 0",textAlign:"center",
                      borderRadius:10,border:`1px solid ${amount===p&&!customAmt?C.primary:C.border}`,
                      background:amount===p&&!customAmt?`${C.primary}22`:C.card,
                      cursor:"pointer",fontWeight:800}}>
                    <div style={{fontSize:13,color:C.gold}}>{p} π</div>
                    <div style={{fontSize:8,color:C.sub}}>≈ {fmt(p*GCV)} FCFA</div>
                  </div>
                ))}
              </div>

              {/* Montant libre */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:6}}>{t.custom.toUpperCase()}</div>
              <input type="number" value={customAmt}
                onChange={e=>setCustomAmt(e.target.value)}
                placeholder={t.customPh}
                style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,
                  borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,
                  boxSizing:"border-box",marginBottom:16,outline:"none"}}/>

              {/* Équivalent */}
              <div style={{background:C.card,border:`1px solid ${C.border}`,
                borderRadius:12,padding:14,marginBottom:16,
                display:"flex",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontSize:22,fontWeight:900,color:C.gold}}>
                    {donAmount} π
                  </div>
                  <div style={{fontSize:9,color:C.sub}}>{t.equiv}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:16,fontWeight:800,color:C.light}}>
                    {fmt(donFCFA)} FCFA
                  </div>
                  <div style={{fontSize:9,color:C.sub}}>
                    {fmt(donFCFA/10)} SBC
                  </div>
                </div>
              </div>

              {/* Méthode */}
              <div style={{fontSize:9,color:C.sub,fontWeight:700,
                letterSpacing:1,marginBottom:8}}>{t.method}</div>
              <div style={{display:"flex",gap:8,marginBottom:20}}>
                {[
                  {id:"pi", label:t.methodPi,  icon:"π"},
                  {id:"sbc",label:t.methodSbc, icon:"S"},
                ].map(m=>(
                  <div key={m.id} onClick={()=>setMethod(m.id)}
                    style={{flex:1,padding:"12px 0",textAlign:"center",
                      borderRadius:12,border:`1px solid ${method===m.id?C.gold:C.border}`,
                      background:method===m.id?`${C.gold}22`:C.card,
                      cursor:"pointer",fontWeight:800}}>
                    <div style={{fontSize:20,color:method===m.id?C.gold:C.sub}}>{m.icon}</div>
                    <div style={{fontSize:10,marginTop:4}}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div onClick={()=>donAmount>0&&setConfirmed(true)}
                style={{background:donAmount>0?`linear-gradient(135deg,${C.primary},${C.pink})`:`${C.muted}`,
                  borderRadius:12,padding:"14px 0",textAlign:"center",
                  fontWeight:800,fontSize:13,cursor:"pointer"}}>
                {t.confirm}
              </div>
            </>
          )}
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
            <div style={{fontSize:9,fontWeight:700,
              color:tab===tb.id?C.light:C.sub}}>{tb.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
