import { useState } from "react";
const C={bg:"#0A0808",card:"#160C0C",border:"#3A0A0A",primary:"#DC2626",light:"#FCA5A5",gold:"#D4A827",green:"#4ADE80",text:"#FEF2F2",sub:"#7A2A2A",muted:"#2A0A0A"};
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
const toPi=(f)=>(f/GCV).toFixed(6);
const T={
  fr:{tabs:["KYC Pi","Audit","CERT CI","Certificats"],title:"SEINBU SECURITY",sub:"Cybersécurité · KYC Pi · CERT CI · Conformité BCEAO",status:"Système actif",kycTitle:"Score KYC SEINBU",kycNone:"KYC non initié",kycBtn:"DÉMARRER MON KYC PI",kycSteps:["Connexion Pi SDK","Vérification identité","Selfie biométrique","Validation SEINBU"],auditTitle:"Services d'Audit",auditSub:"Paiement Pi · Devis sur demande",certTitle:"CERT CI — Centre de Veille",certSub:"Veille menaces 24h/24 · Alertes temps réel",certBtn:"S'abonner",certsTitle:"Mes Certificats",noCerts:"Aucun certificat",request:"Demander →",confirm:"Confirmer → FINTECH",confirmed:"Demande envoyée !",confirmedSub:"Notre équipe vous contacte sous 48h.",cancel:"Annuler"},
  en:{tabs:["KYC Pi","Audit","CERT CI","Certificates"],title:"SEINBU SECURITY",sub:"Cybersecurity · KYC Pi · CERT CI · BCEAO Compliance",status:"System active",kycTitle:"SEINBU KYC Score",kycNone:"KYC not initiated",kycBtn:"START MY PI KYC",kycSteps:["Pi SDK Connection","Identity Verification","Biometric Selfie","SEINBU Validation"],auditTitle:"Audit Services",auditSub:"Pi payment · Quote on request",certTitle:"CERT CI — Monitoring Center",certSub:"24/7 threat monitoring · Real-time alerts",certBtn:"Subscribe",certsTitle:"My Certificates",noCerts:"No certificates",request:"Request →",confirm:"Confirm → FINTECH",confirmed:"Request sent!",confirmedSub:"Our team will contact you within 48h.",cancel:"Cancel"},
};
const AUDITS=[
  {icon:"🔐",nameF:"Pentest Web",nameE:"Web Pentest",descF:"Test d'intrusion applications",descE:"Application penetration test",price:250000},
  {icon:"⛓️",nameF:"Audit Blockchain",nameE:"Blockchain Audit",descF:"Smart contracts & Pi SDK",descE:"Smart contracts & Pi SDK",price:500000},
  {icon:"🪪",nameF:"KYC Pi Entreprise",nameE:"Enterprise Pi KYC",descF:"Vérification masse pionniers",descE:"Mass pioneer verification",price:150000},
  {icon:"📋",nameF:"Conformité BCEAO",nameE:"BCEAO Compliance",descF:"Rapport audit réglementaire",descE:"Regulatory audit report",price:800000},
  {icon:"🛡️",nameF:"CERT CI Abonnement",nameE:"CERT CI Subscription",descF:"Veille menaces 24h/24",descE:"24/7 threat monitoring",price:200000},
];
export default function SeinbuSecurity({lang="fr"}){
  const t=T[lang]||T.fr;
  const[tab,setTab]=useState("kyc");
  const[kycStarted,setKycStarted]=useState(false);
  const[kycStep,setKycStep]=useState(0);
// eslint-disable-next-line no-unused-vars
  const[selAudit,setSelAudit]=useState(null);
  const[confirmed,setConfirmed]=useState(false);
  const TABS=[{id:"kyc",label:t.tabs[0],icon:"🪪"},{id:"audit",label:t.tabs[1],icon:"🔍"},{id:"cert",label:t.tabs[2],icon:"🛡️"},{id:"certs",label:t.tabs[3],icon:"📜"}];
  const Card=({children,style={}})=>(<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>);
  const Lbl=({children})=>(<div style={{fontSize:9,color:C.sub,fontWeight:700,letterSpacing:2,marginBottom:6}}>{children}</div>);
  return(
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,fontFamily:"system-ui,sans-serif",paddingBottom:80}}>
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,borderBottom:`1px solid ${C.border}`,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,background:`linear-gradient(135deg,${C.primary},#991B1B)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🔒</div>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800}}>{t.title}</div><div style={{fontSize:9,color:C.sub}}>{t.sub}</div></div>
        <div style={{background:"#16401422",border:"1px solid #16A34A",borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.green}}>● {t.status}</div>
      </div>
      {tab==="kyc"&&<div style={{padding:16}}>
        <Card style={{textAlign:"center",padding:20}}>
          <Lbl>{t.kycTitle}</Lbl>
          {kycStarted?(
            <div>
              <div style={{fontSize:32,fontWeight:900,color:kycStep>=4?C.green:C.gold,marginBottom:8}}>{kycStep>=4?"100%":`${kycStep*25}%`}</div>
              <div style={{background:C.muted,borderRadius:4,height:8,marginBottom:16,overflow:"hidden"}}>
                <div style={{width:`${kycStep*25}%`,height:"100%",background:kycStep>=4?C.green:C.primary,transition:"width .5s",borderRadius:4}}/>
              </div>
              {t.kycSteps.map((step,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,textAlign:"left"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:i<kycStep?C.green:i===kycStep?C.primary:C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{i<kycStep?"✓":i+1}</div>
                <span style={{fontSize:11,color:i<=kycStep?C.text:C.sub}}>{step}</span>
              </div>))}
              {kycStep<4&&<div onClick={()=>setKycStep(s=>Math.min(s+1,4))} style={{marginTop:12,background:C.primary,borderRadius:10,padding:"10px 0",fontWeight:800,fontSize:12,cursor:"pointer"}}>{lang==="en"?"Next step →":"Étape suivante →"}</div>}
              {kycStep>=4&&<div style={{marginTop:12,background:C.green,color:"#000",borderRadius:10,padding:"10px 0",fontWeight:800,fontSize:12}}>✅ KYC {lang==="en"?"Validated":"Validé"}</div>}
            </div>
          ):(
            <>
              <div style={{fontSize:48,marginBottom:8}}>🔓</div>
              <div style={{fontSize:12,color:C.sub,marginBottom:16}}>{t.kycNone}</div>
              <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>setKycStarted(true));else setKycStarted(true);}} style={{background:C.primary,borderRadius:12,padding:"13px 0",fontWeight:800,fontSize:12,cursor:"pointer"}}>🔐 {t.kycBtn}</div>
            </>
          )}
        </Card>
        <Card>
          <div style={{fontSize:10,color:C.sub,lineHeight:1.6}}>{lang==="en"?"SEINBU KYC Pi certifies the identity of Pi Network pioneers for enterprise use. BCEAO compliant.":"Le KYC Pi SEINBU certifie l'identité des pionniers Pi Network pour usage entreprise. Conforme BCEAO."}</div>
        </Card>
      </div>}
      {tab==="audit"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{t.auditTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.auditSub}</div>
        {confirmed?(<Card style={{textAlign:"center",padding:20}}>
          <div style={{fontSize:36,marginBottom:8}}>✅</div>
          <div style={{fontSize:14,fontWeight:800,marginBottom:6}}>{t.confirmed}</div>
          <div style={{fontSize:11,color:C.sub,marginBottom:14}}>{t.confirmedSub}</div>
          <div onClick={()=>{setConfirmed(false);setSelAudit(null);}} style={{background:C.primary,borderRadius:10,padding:"9px 0",fontWeight:800,cursor:"pointer"}}>{lang==="en"?"New request":"Nouvelle demande"}</div>
        </Card>):(
          AUDITS.map(s=>(<Card key={s.icon}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>{s.icon}</span>
                <div><div style={{fontSize:12,fontWeight:800}}>{lang==="en"?s.nameE:s.nameF}</div><div style={{fontSize:9,color:C.sub}}>{lang==="en"?s.descE:s.descF}</div></div>
              </div>
              <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:900,color:C.gold}}>{fmt(s.price)} FCFA</div><div style={{fontSize:9,color:C.sub}}>{toPi(s.price)} π</div><div style={{fontSize:9,color:"#4ADE60"}}>{fmt(s.price/10,0)} SBC</div></div>
            </div>
            <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>setConfirmed(true));else setConfirmed(true);}} style={{background:C.primary,borderRadius:8,padding:"8px 0",textAlign:"center",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔐 {t.request}</div>
          </Card>))
        )}
      </div>}
      {tab==="cert"&&<div style={{padding:16}}>
        <div style={{fontSize:14,fontWeight:800,marginBottom:4}}>{t.certTitle}</div>
        <div style={{fontSize:10,color:C.sub,marginBottom:14}}>{t.certSub}</div>
        <Card style={{background:"linear-gradient(135deg,#1a0808,#2a0a0a)",border:"1px solid #DC262644"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div><div style={{fontSize:14,fontWeight:800,color:C.light}}>CERT CI</div><div style={{fontSize:10,color:C.sub}}>200 000 FCFA / {lang==="en"?"month":"mois"}</div><div style={{fontSize:9,color:C.sub}}>{toPi(200000)} π</div><div style={{fontSize:9,color:"#4ADE60"}}>{fmt(200000/10,0)} SBC</div>
            <div style={{fontSize:36}}>🛡️</div>
          </div>
          {["Surveillance réseau temps réel","Alertes incidents de sécurité","Rapports mensuels","Support prioritaire 24h/7j"].map((f,i)=>(<div key={i} style={{fontSize:10,marginBottom:4}}>✅ {lang==="en"?["Real-time network monitoring","Security incident alerts","Monthly reports","Priority support 24/7"][i]:f}</div>))}
          <div onClick={()=>{if(window.seinbuAuth)window.seinbuAuth(()=>{});}} style={{marginTop:12,background:C.primary,borderRadius:10,padding:"10px 0",textAlign:"center",fontWeight:800,fontSize:12,cursor:"pointer"}}>🔐 {t.certBtn}</div>
        </Card>
      </div>}
      {tab==="certs"&&<div style={{padding:16}}>
        <Lbl>{t.certsTitle.toUpperCase()}</Lbl>
        <div style={{textAlign:"center",color:C.sub,padding:40,fontSize:11}}>{t.noCerts}</div>
      </div>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex"}}>
        {TABS.map(tb=>(<div key={tb.id} onClick={()=>setTab(tb.id)} style={{flex:1,padding:"8px 4px",textAlign:"center",cursor:"pointer",borderTop:tab===tb.id?`2px solid ${C.primary}`:"2px solid transparent"}}><div style={{fontSize:16}}>{tb.icon}</div><div style={{fontSize:8,fontWeight:700,color:tab===tb.id?C.light:C.sub}}>{tb.label}</div></div>))}
      </div>
    </div>
  );
}
