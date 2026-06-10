import { useState, useRef } from "react";

const C = {
  bg:"#0A0118", card:"#110228", card2:"#1a0840",
  border:"#2D1060", primary:"#7C3AED", light:"#A855F7",
  gold:"#D4A827", green:"#4ADE80", red:"#EF4444",
  text:"#F3E8FF", sub:"#6B4FA0", muted:"#3D1A6A",
};

const GCV      = 188_495_400;
const SBC_RATE = 10;
const PI_SBC   = GCV / SBC_RATE;

const fmt  = (n,d=0) => new Intl.NumberFormat("fr-FR",{maximumFractionDigits:d}).format(n);
const toPi = (fcfa)  => (fcfa/GCV).toFixed(7);

const T = {
  fr:{
    tabs:["Dashboard","Convertir","Staking","Mobile","Paiements","Historique"],
    sbcBal:"SOLDE SBC COIN", piBal:"SOLDE PI NETWORK", estVal:"Valeur estimée",
    rates:"TAUX EN TEMPS RÉEL",
    stakingLbl:"SBC en staking", gainsLbl:"Gains ce mois", palierOR:"Palier OR",
    piAvail:"Pi disponibles", txLbl:"Transactions", thisMonth:"Ce mois",
    sendTitle:"Envoyer SBC", sendSub:"Transfert P2P · 0 frais entre membres SEINBU",
    recipient:"DESTINATAIRE", recipientPh:"Username Pi ou adresse Stellar",
    orScanQR:"ou scanner le QR du destinataire",
    scanBtn:"📷 Scanner QR",
    amount:"MONTANT (SBC)", contacts:"MES CONTACTS",
    addContact:"+ Ajouter", saveContact:"Enregistrer",
    contactName:"Nom", noContacts:"Aucun contact",
    confirmSend:"Confirmer le transfert",
    receiveTitle:"Recevoir SBC", receiveSub:"Partagez votre QR ou adresse",
    myAddr:"MON ADRESSE STELLAR", myUser:"MON USERNAME Pi",
    copyAddr:"Copier l'adresse", copied:"Copié !",
    convertTitle:"Convertir", poolTitle:"PIONEER EXCHANGE POOL",
    poolBurn:"Disponibles · Burn 0.5% / tx", youReceive:"VOUS RECEVREZ (SBC)",
    convertBtn:"Convertir Pi → SBC", burnLbl:"Burn",
    stakingTitle:"Staking SBC", myStaking:"MON STAKING ACTUEL",
    duration:"Durée", minReq:"Min.", apy:"APY", stakeBtn:"Staker",
    gainEst:"Gain estimé", in:"en",
    mobileTitle:"Mobile Money", recharge:"Recharger", payWith:"PAYER AVEC",
    payTitle:"Paiements", pending:"EN ATTENTE",
    approve:"Approuver", reject:"Refuser",
    histTitle:"Historique",
    cancel:"Annuler", confirm:"Confirmer",
    authReq:"Authentification requise",
    approved:"Approuvés",
  },
  en:{
    tabs:["Dashboard","Convert","Staking","Mobile","Payments","History"],
    sbcBal:"SBC COIN BALANCE", piBal:"PI NETWORK BALANCE", estVal:"Estimated value",
    rates:"LIVE RATES",
    stakingLbl:"SBC in staking", gainsLbl:"Monthly gains", palierOR:"GOLD tier",
    piAvail:"Pi available", txLbl:"Transactions", thisMonth:"This month",
    sendTitle:"Send SBC", sendSub:"P2P transfer · 0 fees between SEINBU members",
    recipient:"RECIPIENT", recipientPh:"Pi username or Stellar address",
    orScanQR:"or scan recipient's QR code",
    scanBtn:"📷 Scan QR",
    amount:"AMOUNT (SBC)", contacts:"MY CONTACTS",
    addContact:"+ Add", saveContact:"Save",
    contactName:"Name", noContacts:"No contacts",
    confirmSend:"Confirm transfer",
    receiveTitle:"Receive SBC", receiveSub:"Share your QR code or address",
    myAddr:"MY STELLAR ADDRESS", myUser:"MY Pi USERNAME",
    copyAddr:"Copy address", copied:"Copied!",
    convertTitle:"Convert", poolTitle:"PIONEER EXCHANGE POOL",
    poolBurn:"Available · Burn 0.5% / tx", youReceive:"YOU WILL RECEIVE (SBC)",
    convertBtn:"Convert Pi → SBC", burnLbl:"Burn",
    stakingTitle:"SBC Staking", myStaking:"MY CURRENT STAKING",
    duration:"Duration", minReq:"Min.", apy:"APY", stakeBtn:"Stake",
    gainEst:"Estimated gain", in:"in",
    mobileTitle:"Mobile Money", recharge:"Top-up", payWith:"PAY WITH",
    payTitle:"Payments", pending:"PENDING",
    approve:"Approve", reject:"Reject",
    histTitle:"History",
    cancel:"Cancel", confirm:"Confirm",
    authReq:"Authentication required",
    approved:"Approved",
  },
};

const TIERS = [
  {id:"bronze", apy:5,  days:30,  min:100,       color:"#CD7F32", emoji:"🥉"},
  {id:"argent", apy:8,  days:90,  min:1_000,     color:"#94A3B8", emoji:"🥈"},
  {id:"or",     apy:12, days:180, min:10_000,     color:"#D4A827", emoji:"🥇"},
  {id:"platine",apy:18, days:365, min:100_000,    color:"#E2E8F0", emoji:"💎"},
  {id:"diamant",apy:25, days:730, min:1_000_000,  color:"#A78BFA", emoji:"👑"},
];

const PALIERS_FR = ["BRONZE","ARGENT","OR","PLATINE","DIAMANT"];
const PALIERS_EN = ["BRONZE","SILVER","GOLD","PLATINUM","DIAMOND"];

const MM = [
  {id:"orange",name:"Orange Money",color:"#FF6B00",icon:"🟠"},
  {id:"mtn",   name:"MTN MoMo",    color:"#FFCB05",icon:"🟡"},
  {id:"wave",  name:"Wave",        color:"#009FE3",icon:"🔵"},
  {id:"moov",  name:"Moov Money",  color:"#00A651",icon:"🟢"},
];

const PENDING_TX = [
  {id:"PAY-001",desc:"TELECOM Forfait Weekly",   amt:"0.000016 π",fcfa:"3 000"},
  {id:"PAY-002",desc:"NUTRITECH Abonnement",     amt:"0.000027 π",fcfa:"5 000"},
  {id:"PAY-003",desc:"ANI Riz ANI × 2",          amt:"0.000212 π",fcfa:"40 000"},
];

const SBCLogo = ({size=40}) => (
  <svg width={size} height={size} viewBox="0 0 500 500">
    <defs>
      <radialGradient id="r1" cx="33%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ffe8a0"/><stop offset="100%" stopColor="#3a2000"/>
      </radialGradient>
      <radialGradient id="r2" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#1e0840"/><stop offset="100%" stopColor="#06011a"/>
      </radialGradient>
      <radialGradient id="r3" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#c8920a"/><stop offset="100%" stopColor="#2e1e00"/>
      </radialGradient>
      <linearGradient id="lg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffe880"/><stop offset="100%" stopColor="#c8920a"/>
      </linearGradient>
    </defs>
    <circle cx="250" cy="250" r="196" fill="url(#r1)"/>
    <circle cx="250" cy="250" r="182" fill="url(#r2)"/>
    <circle cx="250" cy="250" r="158" fill="none" stroke="#d4a017" strokeWidth="1.8" opacity=".65"/>
    <circle cx="250" cy="250" r="100" fill="none" stroke="#d4a017" strokeWidth="1.4" opacity=".5"/>
    <circle cx="250" cy="250" r="46"  fill="url(#r3)"/>
    <circle cx="250" cy="250" r="46"  fill="none" stroke="#ffe066" strokeWidth="1.5" opacity=".7"/>
    <text x="250" y="258" textAnchor="middle" fontFamily="'Trebuchet MS',sans-serif"
      fontSize="20" fontWeight="900" fill="url(#lg)">SBC</text>
    <circle cx="250" cy="250" r="182" fill="none" stroke="#d4a017" strokeWidth="2.5" opacity=".75"/>
  </svg>
);

// ══ COMPOSANT PRINCIPAL ═══════════════════════════════════════
export default function SeinbuFintech({ lang = "fr", piUser = null }) {
  const t = T[lang] || T.fr;

  const [tab,          setTab]         = useState("dashboard");
  const [overlay,      setOverlay]     = useState(null); // "send"|"receive"|null

  // Envoyer
  const [sendTo,       setSendTo]      = useState("");
  const [sendAmt,      setSendAmt]     = useState("");
  const [contacts,     setContacts]    = useState(
    () => { try { return JSON.parse(localStorage.getItem("seinbu_contacts")||"[]"); } catch{return [];} }
  );
  const [showNewCtact, setShowNewCtact]= useState(false);
  const [newCtName,    setNewCtName]   = useState("");
  const [sendDone,     setSendDone]    = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scanning,     setScanning]    = useState(false);
  const [scanError,    setScanError]   = useState("");
  const scanFileRef = useRef(null);

  const handleScanFile = async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    setScanError("");
    try {
      if(!window.jsQR) {
        await new Promise((res,rej)=>{
          const s=document.createElement("script");
          s.src="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js";
          s.onload=res; s.onerror=rej;
          document.head.appendChild(s);
        });
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        const data = ctx.getImageData(0,0,canvas.width,canvas.height);
        const code = window.jsQR(data.data,data.width,data.height);
        URL.revokeObjectURL(url);
        if(code){
          const match = code.data.match(/seinbu:\/\/pay\?to=@([^&]+)/);
          setSendTo(match?match[1]:code.data);
          setScanning(false);
        } else {
          setScanError(lang==="en"?"No QR code found in image":"Aucun QR code trouvé dans l'image");
        }
      };
      img.src = url;
    } catch(e){
      setScanError(lang==="en"?"Scan error":"Erreur de scan");
    }
    setScanning(false);
  };

  // Recevoir
  const [copied,       setCopied]      = useState(false);
  const STELLAR_ADDR = "GDMRBR5TVMJLTQLGU3ZD4SBZY57Q2EZASCJQVV5YLPJSA26QCPQLGUOE";
  const PI_USER      = "pioneer_seinbu";
  const qrData = piUser ? `seinbu://pay?to=@${piUser.username}&token=SBC&network=pi` : STELLAR_ADDR;
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&margin=10`;
  // Fallback Google Charts
  const qrFallback = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(qrData)}&choe=UTF-8`;

  // Convertir
  const [cvType,       setCvType]      = useState("pi");
  const [piIn,         setPiIn]        = useState("");
  const [fcfaIn,       setFcfaIn]      = useState("");
  const sbcOut = cvType==="pi"
    ? parseFloat(piIn||0)*PI_SBC
    : parseFloat(fcfaIn||0)/SBC_RATE;

  // Staking
  const [selTier,      setSelTier]     = useState(null);
  const [stakeAmt,     setStakeAmt]    = useState("");

  // Mobile
  const [mmOp,         setMmOp]        = useState("orange");
  const [mmAmt,        setMmAmt]       = useState(null);
  const [mmMethod,     setMmMethod]    = useState("sbc");

  // Paiements
  const [confirmPay,   setConfirmPay]  = useState(null);
  const [approvedPays, setApprovedPays]= useState([]);
  const [rejectedPays, setRejectedPays]= useState([]);

  // ── Helpers ─────────────────────────────────────────────────
  const saveContact = () => {
    if (!sendTo||!newCtName) return;
    const nc = [...contacts,{name:newCtName,address:sendTo,init:newCtName[0].toUpperCase()}];
    setContacts(nc);
    localStorage.setItem("seinbu_contacts",JSON.stringify(nc));
    setShowNewCtact(false); setNewCtName("");
  };
  const copyAddr = () => {
    navigator.clipboard.writeText(STELLAR_ADDR).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };
  const doApprove = (id) => {
    if (window.seinbuAuth) {
      window.seinbuAuth(()=>{ setApprovedPays(p=>[...p,id]); setConfirmPay(null); });
    } else {
      setApprovedPays(p=>[...p,id]); setConfirmPay(null);
    }
  };

  const Card = ({children,style={}}) => (
    <div style={{background:C.card,border:`1px solid ${C.border}`,
      borderRadius:14,padding:14,marginBottom:10,...style}}>{children}</div>
  );
  const Lbl = ({children}) => (
    <div style={{fontSize:9,color:C.sub,fontWeight:700,letterSpacing:2,marginBottom:6}}>
      {children}
    </div>
  );
  const Input = ({value,onChange,placeholder,type="text",style={}}) => (
    <input value={value} onChange={onChange} placeholder={placeholder} type={type}
      style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,
        borderRadius:10,padding:"10px 14px",color:C.text,fontSize:12,
        boxSizing:"border-box",marginBottom:12,outline:"none",...style}}/>
  );

  const TABS = [
    {id:"dashboard",label:t.tabs[0],icon:"📊"},
    {id:"convert",  label:t.tabs[1],icon:"🔄"},
    {id:"staking",  label:t.tabs[2],icon:"📈"},
    {id:"mobile",   label:t.tabs[3],icon:"📱"},
    {id:"payments", label:t.tabs[4],icon:"✅"},
    {id:"history",  label:t.tabs[5],icon:"📋"},
  ];

  return (
    <div style={{background:C.bg,minHeight:"100dvh",color:C.text,
      fontFamily:"system-ui,sans-serif",paddingBottom:80}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.card},${C.bg})`,
        borderBottom:`1px solid ${C.border}`,padding:"14px 16px",
        display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:10,
          background:`linear-gradient(135deg,${C.primary},${C.light})`,
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💳</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:800}}>SEINBU FINTECH</div>
          <div style={{fontSize:9,color:C.sub}}>
            {lang==="en"?"Digital Finance · SBC Coin · Mobile Money"
              :"Finance Numérique · SBC Coin · Mobile Money"}
          </div>
        </div>
        <div style={{background:`${C.primary}22`,border:`1px solid ${C.primary}`,
          borderRadius:8,padding:"4px 10px",fontSize:9,fontWeight:700,color:C.light}}>
          Testnet
        </div>
      </div>

      {/* ══ OVERLAY ENVOYER ══════════════════════════════════════ */}
      {overlay==="send"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",
          zIndex:500,overflowY:"auto"}}>
          <div style={{padding:"20px 16px",maxWidth:420,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800}}>{t.sendTitle}</div>
              <div onClick={()=>{setOverlay(null);setSendDone(false);}}
                style={{fontSize:22,cursor:"pointer",color:C.sub}}>✕</div>
            </div>
            <div style={{fontSize:10,color:C.sub,marginBottom:16}}>{t.sendSub}</div>

            {sendDone?(
              <Card style={{textAlign:"center",padding:24}}>
                <div style={{fontSize:40,marginBottom:12}}>✅</div>
                <div style={{fontSize:15,fontWeight:800,marginBottom:8}}>
                  {lang==="en"?"Transfer confirmed!":"Transfert confirmé !"}
                </div>
                <div style={{fontSize:11,color:C.sub,marginBottom:16}}>
                  {fmt(parseFloat(sendAmt||0))} SBC → {sendTo}
                </div>
                <div onClick={()=>{setSendDone(false);setSendTo("");setSendAmt("");}}
                  style={{background:C.primary,borderRadius:10,padding:"10px 0",
                    fontWeight:800,cursor:"pointer"}}>
                  {lang==="en"?"New transfer":"Nouveau transfert"}
                </div>
              </Card>
            ):(
              <>
                {/* Contacts */}
                {contacts.length>0&&(
                  <Card>
                    <Lbl>{t.contacts}</Lbl>
                    <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
                      {contacts.map(ct=>(
                        <div key={ct.address} onClick={()=>setSendTo(ct.address)}
                          style={{flexShrink:0,textAlign:"center",cursor:"pointer"}}>
                          <div style={{width:42,height:42,borderRadius:"50%",
                            background:sendTo===ct.address?C.primary:C.card2,
                            border:`2px solid ${sendTo===ct.address?C.light:C.border}`,
                            display:"flex",alignItems:"center",justifyContent:"center",
                            fontSize:18,fontWeight:800,margin:"0 auto 4px"}}>
                            {ct.init}
                          </div>
                          <div style={{fontSize:8,color:C.sub,maxWidth:52,
                            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {ct.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Destinataire + QR scanner */}
                <Lbl>{t.recipient}</Lbl>
                <div style={{position:"relative",marginBottom:4}}>
                  <Input value={sendTo} onChange={e=>setSendTo(e.target.value)}
                    placeholder={t.recipientPh} style={{marginBottom:0,paddingRight:80}}/>
                  <div onClick={()=>{ setScanError(""); if(scanFileRef.current) scanFileRef.current.click(); }}
                    style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",
                      background:C.primary,borderRadius:6,padding:"4px 8px",
                      fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                    {t.scanBtn}
                  </div>
                </div>
                <div style={{fontSize:9,color:C.muted,marginBottom:12}}>{t.orScanQR}</div>
                {scanError&&<div style={{fontSize:9,color:"#F87171",marginBottom:8}}>{scanError}</div>}
                <input ref={scanFileRef} type="file" accept="image/*" capture="environment"
                  style={{display:"none"}} onChange={handleScanFile}/>

                {sendTo&&(
                  <div onClick={()=>setShowNewCtact(!showNewCtact)}
                    style={{fontSize:10,color:C.light,cursor:"pointer",
                      marginBottom:12,fontWeight:700}}>
                    ＋ {t.saveContact} {lang==="en"?"as contact":"comme contact"}
                  </div>
                )}
                {showNewCtact&&(
                  <Card style={{marginBottom:12}}>
                    <Lbl>{t.contactName.toUpperCase()}</Lbl>
                    <Input value={newCtName} onChange={e=>setNewCtName(e.target.value)}
                      placeholder={t.contactName}/>
                    <div onClick={saveContact}
                      style={{background:C.primary,borderRadius:8,padding:"8px 0",
                        textAlign:"center",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {t.saveContact}
                    </div>
                  </Card>
                )}

                {/* Montant */}
                <Lbl>{t.amount}</Lbl>
                <Input type="number" value={sendAmt}
                  onChange={e=>setSendAmt(e.target.value)} placeholder="0"/>
                {sendAmt&&(
                  <div style={{fontSize:10,color:C.sub,marginBottom:14}}>
                    ≈ {fmt(parseFloat(sendAmt||0)*SBC_RATE)} FCFA
                    · 0 {lang==="en"?"fees":"frais"}
                  </div>
                )}

                <div onClick={()=>{
                  if(!sendTo||!sendAmt) return;
                  if(window.seinbuAuth) window.seinbuAuth(()=>setSendDone(true));
                  else setSendDone(true);
                }} style={{background:sendTo&&sendAmt?C.primary:C.muted,
                  borderRadius:12,padding:"14px 0",textAlign:"center",
                  fontWeight:800,fontSize:13,cursor:"pointer"}}>
                  🔐 {t.confirmSend}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══ OVERLAY RECEVOIR ═══════════════════════════════════ */}
      {overlay==="receive"&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",
          zIndex:500,overflowY:"auto"}}>
          <div style={{padding:"20px 16px",maxWidth:420,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800}}>{t.receiveTitle}</div>
              <div onClick={()=>setOverlay(null)}
                style={{fontSize:22,cursor:"pointer",color:C.sub}}>✕</div>
            </div>
            <div style={{fontSize:10,color:C.sub,marginBottom:20}}>{t.receiveSub}</div>

            <Card style={{textAlign:"center",padding:20}}>
              <div style={{position:"relative",width:200,height:200,margin:"0 auto 12px"}}>
                <img src={qrUrl} alt="QR SEINBU"
                  style={{width:200,height:200,borderRadius:12,display:"block",
                    background:"#fff",padding:4}}
                  onError={e=>{
                    if(e.target.src!==qrFallback) e.target.src=qrFallback;
                    else e.target.style.display="none";
                  }}/>
                <div style={{position:"absolute",top:"50%",left:"50%",
                  transform:"translate(-50%,-50%)",
                  background:"#fff",borderRadius:"50%",
                  width:44,height:44,display:"flex",
                  alignItems:"center",justifyContent:"center",
                  boxShadow:"0 0 0 3px #fff"}}>
                  <svg width="28" height="28" viewBox="0 0 500 500"><defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d4a017"/><stop offset="100%" stopColor="#f0c040"/></linearGradient></defs><circle cx="250" cy="250" r="245" fill="#1a1a2e" stroke="url(#sg2)" strokeWidth="18"/><text x="250" y="310" textAnchor="middle" fontSize="200" fontWeight="900" fill="url(#sg2)" fontFamily="system-ui">S</text></svg>
                </div>
              </div>
              <div style={{fontSize:9,color:C.sub}}>
                {lang==="en"?"Scan to send SBC":"Scanner pour recevoir SBC"}
              </div>
            </Card>

            <Card>
              <Lbl>{t.myAddr}</Lbl>
              <div style={{fontSize:10,fontWeight:700,color:C.light,
                wordBreak:"break-all",marginBottom:10,lineHeight:1.5}}>
                {STELLAR_ADDR}
              </div>
              <div onClick={copyAddr}
                style={{background:copied?C.green:C.primary,borderRadius:8,
                  padding:"9px 0",textAlign:"center",fontSize:11,fontWeight:700,
                  cursor:"pointer",transition:"background .2s"}}>
                {copied?`✅ ${t.copied}`:t.copyAddr}
              </div>
            </Card>

            <Card>
              <Lbl>{t.myUser}</Lbl>
              <div style={{fontSize:18,fontWeight:800,color:C.gold}}>
                π @{PI_USER}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ══ MODAL CONFIRMATION PAIEMENT ════════════════════════ */}
      {confirmPay&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",
          display:"flex",alignItems:"center",justifyContent:"center",zIndex:600}}>
          <div style={{background:C.card,border:`1px solid ${C.primary}`,
            borderRadius:20,padding:24,width:280,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:10}}>🔐</div>
            <div style={{fontSize:14,fontWeight:800,marginBottom:6}}>{t.authReq}</div>
            <div style={{fontSize:11,color:C.sub,marginBottom:20}}>
              {PENDING_TX.find(p=>p.id===confirmPay)?.desc}
            </div>
            <div style={{display:"flex",gap:8}}>
              <div onClick={()=>setConfirmPay(null)}
                style={{flex:1,padding:"10px 0",textAlign:"center",
                  background:"rgba(255,255,255,.08)",borderRadius:8,
                  fontSize:11,fontWeight:700,cursor:"pointer"}}>
                {t.cancel}
              </div>
              <div onClick={()=>doApprove(confirmPay)}
                style={{flex:2,padding:"10px 0",textAlign:"center",
                  background:C.primary,borderRadius:8,
                  fontSize:11,fontWeight:700,cursor:"pointer"}}>
                🔐 {t.confirm}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ DASHBOARD ════════════════════════════════════════ */}
      {tab==="dashboard"&&(
        <div style={{padding:16}}>

          {/* Carte SBC */}
          <div style={{background:`linear-gradient(135deg,${C.primary}88,${C.card})`,
            border:`1px solid ${C.primary}`,borderRadius:16,
            padding:"18px 20px",marginBottom:10}}>
            <div style={{fontSize:9,color:C.light,fontWeight:700,
              letterSpacing:2,marginBottom:6}}>{t.sbcBal}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <SBCLogo size={34}/>
              <div style={{fontSize:28,fontWeight:900}}>
                {fmt(25_000_000)} <span style={{fontSize:13}}>SBC</span>
              </div>
            </div>
            <div style={{fontSize:12,opacity:.8,marginBottom:14}}>
              ≈ {fmt(25_000_000*SBC_RATE)} FCFA
            </div>
            <div style={{display:"flex",gap:8}}>
              {[
                {label:lang==="en"?"Send":"Envoyer",     fn:()=>setOverlay("send")},
                {label:lang==="en"?"Receive":"Recevoir", fn:()=>setOverlay("receive")},
                {label:lang==="en"?"Exchange":"Échanger",fn:()=>setTab("convert")},
              ].map(btn=>(
                <div key={btn.label} onClick={btn.fn}
                  style={{flex:1,background:"rgba(255,255,255,.15)",
                    borderRadius:8,padding:"7px 4px",textAlign:"center",
                    fontSize:10,fontWeight:700,cursor:"pointer"}}>
                  {btn.label}
                </div>
              ))}
            </div>
          </div>

          {/* Carte Pi */}
          <div style={{background:"linear-gradient(135deg,#1a1200,#2a1e00)",
            border:"1px solid #D4A82766",borderRadius:16,padding:"14px 20px",
            marginBottom:10,display:"flex",justifyContent:"space-between",
            alignItems:"center"}}>
            <div>
              <div style={{fontSize:9,color:C.gold,fontWeight:700,
                letterSpacing:2,marginBottom:4}}>{t.piBal}</div>
              <div style={{fontSize:24,fontWeight:900,color:C.gold}}>
                1 247,83 <span style={{fontSize:13}}>π</span>
              </div>
              <div style={{fontSize:10,opacity:.7,marginTop:2}}>
                ≈ {fmt(1247.83*GCV)} FCFA
              </div>
            </div>
            <div style={{width:44,height:44,borderRadius:"50%",
              background:"linear-gradient(135deg,#D4A827,#8B6914)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:20,fontWeight:900,color:"#fff"}}>π</div>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[
              {icon:"📈",val:fmt(10_000_000),unit:"SBC",label:t.stakingLbl,sub:t.palierOR,color:C.gold},
              {icon:"💰",val:`+${fmt(1_200_000)}`,unit:"SBC",label:t.gainsLbl,sub:"12% APY",color:C.green},
              {icon:"π", val:"1 247,83",unit:"π",label:t.piAvail,sub:"≈ 235 Mds FCFA",color:C.gold},
              {icon:"📋",val:"4",unit:"",label:t.txLbl,sub:t.thisMonth,color:C.light},
            ].map(s=>(
              <Card key={s.label}>
                <div style={{fontSize:16}}>{s.icon}</div>
                <div style={{fontSize:17,fontWeight:900,color:s.color,marginTop:4}}>
                  {s.val} <span style={{fontSize:10}}>{s.unit}</span>
                </div>
                <div style={{fontSize:8,color:C.sub,marginTop:2}}>{s.label}</div>
                <div style={{fontSize:8,color:C.muted}}>{s.sub}</div>
              </Card>
            ))}
          </div>

          {/* Taux */}
          <Card>
            <Lbl>{t.rates}</Lbl>
            {[
              {lbl:"1 SBC",val:`= ${SBC_RATE} FCFA`,color:C.primary},
              {lbl:"1 π",  val:`= ${fmt(GCV)} FCFA`, color:C.gold},
              {lbl:"1 π",  val:`= ${fmt(PI_SBC)} SBC`,color:C.light},
            ].map(r=>(
              <div key={r.lbl+r.val} style={{display:"flex",
                justifyContent:"space-between",padding:"6px 0",
                borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:11,fontWeight:700}}>{r.lbl}</span>
                <span style={{fontSize:11,fontWeight:700,color:r.color}}>{r.val}</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ══ CONVERTIR ══════════════════════════════════════════ */}
      {tab==="convert"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.convertTitle}</div>

          <div style={{background:"linear-gradient(135deg,#1e0840,#2D1060)",
            border:"1px solid #D4A82744",borderRadius:14,padding:14,
            marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <SBCLogo size={48}/>
            <div>
              <div style={{fontSize:9,color:C.gold,fontWeight:700,
                letterSpacing:2,marginBottom:4}}>{t.poolTitle}</div>
              <div style={{fontSize:18,fontWeight:900,color:"#f5d980"}}>1 500 M SBC</div>
              <div style={{fontSize:10,color:C.sub}}>{t.poolBurn}</div>
            </div>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {[{id:"pi",lbl:"Pi → SBC"},{id:"fcfa",lbl:"FCFA → SBC"}].map(o=>(
              <div key={o.id} onClick={()=>setCvType(o.id)}
                style={{flex:1,padding:"9px 0",textAlign:"center",borderRadius:10,
                  border:`1px solid ${cvType===o.id?C.primary:C.border}`,
                  background:cvType===o.id?`${C.primary}22`:C.card,
                  fontSize:11,fontWeight:700,cursor:"pointer"}}>
                {o.lbl}
              </div>
            ))}
          </div>

          <Lbl>{cvType==="pi"
            ? (lang==="en"?"AMOUNT (π)":"MONTANT (π)")
            : "MONTANT (FCFA)"}</Lbl>
          <Input type="number"
            value={cvType==="pi"?piIn:fcfaIn}
            onChange={e=>cvType==="pi"?setPiIn(e.target.value):setFcfaIn(e.target.value)}
            placeholder="0"/>

          <Card>
            <Lbl>{t.youReceive}</Lbl>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <SBCLogo size={32}/>
              <div style={{fontSize:24,fontWeight:900,color:C.light}}>
                {fmt(sbcOut,2)} <span style={{fontSize:13}}>SBC</span>
              </div>
            </div>
            <div style={{fontSize:10,color:C.sub}}>
              ≈ {fmt(sbcOut*SBC_RATE)} FCFA ·{" "}
              <span style={{color:C.red}}>
                {t.burnLbl} : {fmt(sbcOut*0.005,2)} SBC
              </span>
            </div>
          </Card>

          <div onClick={()=>window.seinbuAuth?window.seinbuAuth(()=>{}):null}
            style={{background:C.primary,borderRadius:12,padding:"13px 0",
              textAlign:"center",fontWeight:800,fontSize:13,cursor:"pointer"}}>
            🔐 {t.convertBtn}
          </div>
        </div>
      )}

      {/* ══ STAKING ════════════════════════════════════════════ */}
      {tab==="staking"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:12}}>{t.stakingTitle}</div>

          <Card style={{background:"linear-gradient(135deg,#1a1200,#2a1e00)",
            border:"1px solid #D4A82744"}}>
            <Lbl>{t.myStaking}</Lbl>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:18,fontWeight:900,color:C.gold}}>
                  {fmt(10_000_000)} SBC
                </div>
                <div style={{fontSize:9,color:C.sub}}>{t.palierOR} · 12% APY</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:700,color:C.green}}>
                  +{fmt(1_200_000)} SBC
                </div>
                <div style={{fontSize:9,color:C.sub}}>{t.gainsLbl}</div>
              </div>
            </div>
          </Card>

          {TIERS.map((tier,idx)=>(
            <div key={tier.id}
              onClick={()=>setSelTier(selTier===tier.id?null:tier.id)}
              style={{background:selTier===tier.id?`${tier.color}22`:C.card,
                border:`1px solid ${selTier===tier.id?tier.color:C.border}`,
                borderRadius:14,padding:14,marginBottom:8,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:22}}>{tier.emoji}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:tier.color}}>
                      {lang==="en"?PALIERS_EN[idx]:PALIERS_FR[idx]}
                    </div>
                    <div style={{fontSize:9,color:C.sub}}>
                      {t.duration} {tier.days}j
                    </div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,fontWeight:900,color:tier.color}}>
                    {tier.apy}% {t.apy}
                  </div>
                  <div style={{fontSize:9,color:C.sub}}>
                    {t.minReq} {fmt(tier.min)} SBC
                  </div>
                  <div style={{fontSize:8,color:C.muted}}>
                    = {fmt(tier.min*SBC_RATE)} FCFA
                  </div>
                </div>
              </div>

              {selTier===tier.id&&(
                <div style={{marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:12}}>
                  <Input type="number" value={stakeAmt}
                    onChange={e=>setStakeAmt(e.target.value)}
                    placeholder={fmt(tier.min)+" SBC"}
                    style={{border:`1px solid ${tier.color}`}}/>
                  {stakeAmt&&(
                    <div style={{fontSize:10,color:C.sub,marginBottom:10}}>
                      {t.gainEst} :{" "}
                      <span style={{color:C.green,fontWeight:700}}>
                        +{fmt(parseFloat(stakeAmt||0)*(tier.apy/100)*(tier.days/365),0)} SBC
                      </span>
                      {" "}{t.in} {tier.days}j
                      {" "}· {fmt(parseFloat(stakeAmt||0)*(tier.apy/100)*(tier.days/365)*SBC_RATE,0)} FCFA
                    </div>
                  )}
                  <div style={{background:tier.color,borderRadius:8,padding:"9px 0",
                    textAlign:"center",fontSize:11,fontWeight:800,
                    cursor:"pointer",color:"#000"}}>
                    {tier.emoji} {t.stakeBtn}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ══ MOBILE ═════════════════════════════════════════════ */}
      {tab==="mobile"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:16}}>{t.mobileTitle}</div>

          <Lbl>{lang==="en"?"OPERATOR":"OPÉRATEUR"}</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            {MM.map(p=>(
              <div key={p.id} onClick={()=>setMmOp(p.id)}
                style={{background:mmOp===p.id?`${p.color}22`:C.card,
                  border:`2px solid ${mmOp===p.id?p.color:C.border}`,
                  borderRadius:12,padding:"12px 8px",textAlign:"center",cursor:"pointer"}}>
                <div style={{fontSize:22}}>{p.icon}</div>
                <div style={{fontSize:11,fontWeight:700,marginTop:4}}>{p.name}</div>
              </div>
            ))}
          </div>

          <Lbl>{lang==="en"?"AMOUNT":"MONTANT"}</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:14}}>
            {[500,1000,2000,5000,10000,20000].map(a=>(
              <div key={a} onClick={()=>setMmAmt(a)}
                style={{background:mmAmt===a?`${C.primary}22`:C.card,
                  border:`1px solid ${mmAmt===a?C.primary:C.border}`,
                  borderRadius:10,padding:"10px 4px",textAlign:"center",cursor:"pointer"}}>
                <div style={{fontSize:12,fontWeight:800}}>{fmt(a)}</div>
                <div style={{fontSize:8,color:C.sub}}>FCFA</div>
                <div style={{fontSize:8,color:C.gold}}>{toPi(a)} π</div>
              </div>
            ))}
          </div>

          <Lbl>{t.payWith}</Lbl>
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[{id:"pi",lbl:"π Pi",c:C.gold},{id:"sbc",lbl:<><SBCLogo size={16}/>SBC</>,c:C.light}].map(m=>(
              <div key={m.id} onClick={()=>setMmMethod(m.id)}
                style={{flex:1,padding:"11px 0",textAlign:"center",borderRadius:12,
                  border:`1px solid ${mmMethod===m.id?m.c:C.border}`,
                  background:mmMethod===m.id?`${m.c}22`:C.card,
                  cursor:"pointer",fontWeight:800,color:m.c}}>
                {m.lbl}
              </div>
            ))}
          </div>

          <div style={{background:C.primary,borderRadius:12,padding:"13px 0",
            textAlign:"center",fontWeight:800,fontSize:13,cursor:"pointer"}}>
            🔐 {t.recharge}
          </div>
        </div>
      )}

      {/* ══ PAIEMENTS ══════════════════════════════════════════ */}
      {tab==="payments"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:12}}>{t.payTitle}</div>

          <Lbl>{t.pending}</Lbl>
          {PENDING_TX
            .filter(p=>!approvedPays.includes(p.id)&&!rejectedPays.includes(p.id))
            .map(tx=>(
              <Card key={tx.id}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:11,fontWeight:700}}>{tx.desc}</div>
                  <div style={{fontSize:9,padding:"2px 8px",borderRadius:6,
                    background:"rgba(245,158,11,.1)",color:"#F59E0B",fontWeight:700}}>
                    {lang==="en"?"Pending":"En attente"}
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:900,color:C.gold}}>{tx.amt}</div>
                    <div style={{fontSize:9,color:C.sub}}>≈ {tx.fcfa} FCFA</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <div onClick={()=>setRejectedPays(p=>[...p,tx.id])}
                      style={{padding:"7px 12px",borderRadius:8,fontSize:10,
                        fontWeight:700,background:"rgba(239,68,68,.15)",
                        color:C.red,cursor:"pointer"}}>
                      {t.reject}
                    </div>
                    <div onClick={()=>setConfirmPay(tx.id)}
                      style={{padding:"7px 12px",borderRadius:8,fontSize:10,
                        fontWeight:700,background:C.primary,cursor:"pointer"}}>
                      🔐 {t.approve}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

          {PENDING_TX.filter(p=>!approvedPays.includes(p.id)&&!rejectedPays.includes(p.id)).length===0&&(
            <div style={{textAlign:"center",color:C.sub,padding:30,fontSize:11}}>
              {lang==="en"?"No pending payments":"Aucun paiement en attente"}
            </div>
          )}

          {approvedPays.length>0&&(
            <>
              <Lbl style={{marginTop:8}}>{t.approved.toUpperCase()}</Lbl>
              {PENDING_TX.filter(p=>approvedPays.includes(p.id)).map(tx=>(
                <Card key={tx.id} style={{opacity:.6}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontSize:11}}>{tx.desc}</span>
                    <span style={{color:C.green,fontWeight:700}}>✅</span>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      )}

      {/* ══ HISTORIQUE ═════════════════════════════════════════ */}
      {tab==="history"&&(
        <div style={{padding:16}}>
          <div style={{fontSize:16,fontWeight:800,marginBottom:12}}>{t.histTitle}</div>
          {[
            {id:"TXN001",type:"buy",   amt:"5 000 000", cur:"SBC",date:"06/06",ok:true},
            {id:"TXN002",type:"stake", amt:"10 000 000",cur:"SBC",date:"05/06",ok:true},
            {id:"TXN003",type:"send",  amt:"0.5",       cur:"Pi", date:"04/06",ok:true},
            {id:"TXN004",type:"buy",   amt:"2 500 000", cur:"SBC",date:"03/06",ok:false},
          ].map(tx=>(
            <Card key={tx.id}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:34,height:34,borderRadius:"50%",
                    background:`${tx.ok?C.green:C.gold}22`,
                    display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:14}}>
                    {tx.type==="buy"?"🛒":tx.type==="stake"?"📈":tx.type==="send"?"📤":"🔄"}
                  </div>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,textTransform:"capitalize"}}>
                      {tx.type}
                    </div>
                    <div style={{fontSize:9,color:C.sub}}>{tx.id} · {tx.date}</div>
                  </div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,fontWeight:800,
                    color:tx.cur==="SBC"?C.light:C.gold}}>
                    {tx.amt} {tx.cur}
                  </div>
                  <div style={{fontSize:9,color:tx.ok?C.green:C.gold}}>
                    {tx.ok
                      ?(lang==="en"?"Confirmed":"Confirmé")
                      :(lang==="en"?"Pending":"En attente")}
                  </div>
                </div>
              </div>
            </Card>
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
            <div style={{fontSize:16}}>{tb.icon}</div>
            <div style={{fontSize:8,fontWeight:700,
              color:tab===tb.id?C.light:C.sub}}>{tb.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
