import { useT } from "./i18n";
import { useState } from "react";

// ── Couleurs SEINBU FINTECH ───────────────────────────────────────
const C = {
  bg:       "#0A0118",
  card:     "#110228",
  border:   "#2D1060",
  primary:  "#7C3AED",
  light:    "#A855F7",
  gold:     "#D4A827",
  green:    "#10B981",
  red:      "#EF4444",
  text:     "#E2D9F3",
  muted:    "#6B4FA0",
};

// ── Données mock ──────────────────────────────────────────────────
const MOCK = {
  sbcBalance:   25000000,
  piBalance:   1247.83,
  sbcRate:     10,        // FCFA par SBC
  piGCV:      188495400,    // USD par Pi × 600 = FCFA
  txns: [
    { id:"TXN001", type:"buy",   amount:5000000,  currency:"SBC", date:"06/06/2026", status:"ok" },
    { id:"TXN002", type:"stake", amount:10000000,  currency:"SBC", date:"05/06/2026", status:"ok" },
    { id:"TXN003", type:"send",  amount:0.5,  currency:"Pi",  date:"04/06/2026", status:"ok" },
    { id:"TXN004", type:"buy",   amount:2500000,  currency:"SBC", date:"03/06/2026", status:"pending" },
  ],
  staking: [
    { tier:"BRONZE",  rate:"5%",  duration:"30j",  minSBC:100,  color:"#CD7F32" },
    { tier:"ARGENT",  rate:"10%", duration:"90j",  minSBC:500,  color:"#A8A9AD" },
    { tier:"OR",      rate:"15%", duration:"180j", minSBC:1000, color:"#D4A827" },
    { tier:"DIAMANT", rate:"25%", duration:"730j", minSBC:5000, color:"#B9F2FF" },
  ],
};

const fmt = (n, decimals=0) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: decimals }).format(n);


// ── Logo SBC orbital ──────────────────────────────────────────────
const SBCLogo = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sl_rim" cx="33%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ffe8a0"/><stop offset="35%" stopColor="#d4a017"/>
        <stop offset="100%" stopColor="#3a2000"/>
      </radialGradient>
      <radialGradient id="sl_face" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#1e0840"/><stop offset="100%" stopColor="#06011a"/>
      </radialGradient>
      <radialGradient id="sl_sph" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#c8920a"/><stop offset="100%" stopColor="#2e1e00"/>
      </radialGradient>
      <radialGradient id="sl_glow" cx="35%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.28"/>
        <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="sl_sbc" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffe880"/><stop offset="100%" stopColor="#c8920a"/>
      </linearGradient>
      <clipPath id="sl_clip"><circle cx="250" cy="250" r="170"/></clipPath>
    </defs>
    <circle cx="250" cy="250" r="196" fill="url(#sl_rim)"/>
    <circle cx="250" cy="250" r="182" fill="url(#sl_face)"/>
    <g clipPath="url(#sl_clip)">
      <g transform="translate(250,250)" opacity="0.5">
        {[168,148,128,108,88,68].map((rx, i) => (
          <ellipse key={i} rx={rx} ry={rx * 0.46} fill="none"
            stroke="#d4a017" strokeWidth="0.7" transform="rotate(-12)"/>
        ))}
      </g>
      <g transform="translate(250,250)" opacity="0.4">
        {[162,138,114,90,66].map((r, i) => (
          <circle key={i} r={r} fill="none" stroke="#d4a017" strokeWidth="0.6"/>
        ))}
      </g>
      <g transform="translate(250,250)">
        <circle r="158" fill="none" stroke="#d4a017" strokeWidth="1.8" opacity="0.65"/>
        <circle r="100" fill="none" stroke="#d4a017" strokeWidth="1.4" opacity="0.5"/>
      </g>
      <g fill="#d4a017">
        <circle cx="250" cy="92"  r="3.2" opacity="0.8"/>
        <circle cx="250" cy="408" r="3.2" opacity="0.8"/>
        <circle cx="92"  cy="250" r="3.2" opacity="0.8"/>
        <circle cx="408" cy="250" r="3.2" opacity="0.8"/>
      </g>
    </g>
    <circle cx="250" cy="250" r="50" fill="#1a0830" opacity="0.9"/>
    <circle cx="250" cy="250" r="46" fill="url(#sl_sph)"/>
    <circle cx="250" cy="250" r="46" fill="url(#sl_glow)"/>
    <circle cx="250" cy="250" r="46" fill="none" stroke="#ffe066" strokeWidth="1.5" opacity="0.7"/>
    <text x="250" y="258" textAnchor="middle"
      fontFamily="'Trebuchet MS',sans-serif" fontSize="20" fontWeight="900"
      fill="url(#sl_sbc)">SBC</text>
    <circle cx="250" cy="250" r="182" fill="none" stroke="#d4a017" strokeWidth="2.5" opacity="0.75"/>
  </svg>
);
export default function SeinbuFintech({ lang = "fr" }) {
  const T = useT("fintech", lang);
  const [tab, setTab] = useState("dashboard");
  const [pendingAction, setPendingAction] = useState(null);
  const [authPending,  setAuthPending]  = useState(null); // tx en attente d'auth
  const [convFrom, setConvFrom] = useState("pi");
  const [convAmount, setConvAmount] = useState("");
  const [mmMethod, setMmMethod] = useState("orange");

  const sbcFromPi = convFrom === "pi"
    ? (parseFloat(convAmount)||0) * MOCK.piGCV / MOCK.sbcRate
    : (parseFloat(convAmount)||0) / MOCK.sbcRate;

  const TABS_LABELS = T.tabs || ["Dashboard","Convertir","Staking","Mobile","Historique"];
  const PAY_LABEL = lang==="en" ? "Payments" : "Paiements";
  const tabs = [
    { id:"dashboard", label:TABS_LABELS[0], icon:"📊" },
    { id:"convert",   label:TABS_LABELS[1], icon:"🔄" },
    { id:"staking",   label:TABS_LABELS[2], icon:"📈" },
    { id:"mobile",    label:TABS_LABELS[3], icon:"📱" },
    { id:"history",   label:TABS_LABELS[4], icon:"📋" },
    { id:"payments",  label:PAY_LABEL,      icon:"✅" },
  ];

  const mmProviders = [
    { id:"orange", name:"Orange Money", color:"#FF6B00", icon:"🟠" },
    { id:"mtn",    name:"MTN MoMo",     color:"#FFCB05", icon:"🟡" },
    { id:"wave",   name:"Wave",         color:"#009FE3", icon:"🔵" },
    { id:"moov",   name:"Moov Money",   color:"#00A651", icon:"🟢" },
  ];

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      color: C.text,
      fontFamily: "'Segoe UI', sans-serif",
      paddingBottom: 80,
    }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}22, ${C.bg})`,
        borderBottom: `1px solid ${C.border}`,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>💳</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>
            SEINBU FINTECH
          </div>
          <div style={{ fontSize: 10, color: C.muted }}>
            Finance Numérique · SBC Coin · Mobile Money
          </div>
        </div>
        <div style={{
          marginLeft: "auto",
          background: `${C.primary}22`,
          border: `1px solid ${C.primary}`,
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 11,
          color: C.light,
        }}>Testnet</div>
      </div>

      {/* ── Dashboard ──────────────────────────────────────── */}
      {tab === "dashboard" && (
        <div style={{ padding: "20px 16px" }}>

          {/* Carte SBC */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}CC, #4C1D95)`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 120, height: 120, borderRadius: "50%",
              background: "rgba(255,255,255,.05)",
            }} />
            <div style={{ fontSize: 11, opacity: .7, marginBottom: 6 }}>
              SOLDE SBC COIN
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
              {fmt(MOCK.sbcBalance)} <span style={{ fontSize: 18 }}>SBC</span>
            </div>
            <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>
              ≈ {fmt(MOCK.sbcBalance * MOCK.sbcRate)} FCFA
            </div>
            <div style={{
              display: "flex", gap: 8, marginTop: 16,
            }}>
              {[...[["Envoyer","send","payments"],["Recevoir","receive","payments"],["Échanger","exchange","convert"]]].map(a => (
                <div key={a} style={{
                  flex: 1, background: "rgba(255,255,255,.15)",
                  borderRadius: 8, padding: "6px 4px",
                  textAlign: "center", fontSize: 10, fontWeight: 700,
                  cursor: "pointer",
                }}>{a}</div>
              ))}
            </div>

          {/* ── Solde Pi ── */}
          <div style={{
            background: "linear-gradient(135deg,#1a1200,#2a1e00)",
            border: "1px solid #D4A82766",
            borderRadius: 16, padding: "16px 20px", marginBottom: 16,
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <div style={{ fontSize: 9, color:"#D4A827", fontWeight:700,
                letterSpacing:2, marginBottom:4 }}>
                {lang==="en"?"PI NETWORK BALANCE":"SOLDE PI NETWORK"}
              </div>
              <div style={{ fontSize: 28, fontWeight:900, color:"#D4A827" }}>
                {fmt(MOCK.piBalance,2)} <span style={{fontSize:16}}>π</span>
              </div>
              <div style={{ fontSize:12, opacity:.7, marginTop:4 }}>
                ≈ {fmt(MOCK.piBalance * MOCK.piGCV)} FCFA
              </div>
            </div>
            <div style={{
              width:48, height:48, borderRadius:"50%",
              background:"linear-gradient(135deg,#D4A827,#8B6914)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, fontWeight:900, color:"#fff",
            }}>π</div>
          </div>

          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label:T.stakingLabel||"SBC en staking", value:"10 000 000 SBC", sub:lang==="en"?"SILVER tier":lang==="en"?"GOLD tier":"Palier OR", icon:"📈", color:C.primary },
              { label:T.gainsLabel||"Gains ce mois", value:"+1 200 000 SBC", sub:lang==="en"?"10% yield":"Rendement 12%", icon:"💰", color:C.green },
              { label:T.piAvailable||"Pi disponibles", value:`${fmt(MOCK.piBalance,2)} π`, sub:"≈ 235 Mds FCFA", icon:"π", color:C.gold },
              { label:"Transactions", value:"4", sub:T.thisMonth||lang==="en"?"This month":"Ce mois", icon:"📋", color:C.light },
            ].map(s => (
              <div key={s.label} style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "14px 12px",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 9, color: C.muted }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Taux */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, fontWeight: 700 }}>
              {lang==="en"?"LIVE RATES":"TAUX EN TEMPS RÉEL"}
            </div>
            {[
              { label:"1 SBC", value:"10 FCFA", color:C.primary },
              { label:"1 π",   value:`${fmt(MOCK.piGCV)} FCFA`, color:C.gold },
              { label:"1 π",   value:`${fmt(MOCK.piGCV/MOCK.sbcRate)} SBC`, color:C.light },
            ].map(r => (
              <div key={r.label} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "6px 0",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{r.label}</span>
                <span style={{ fontSize: 12, color: r.color, fontWeight: 700 }}>= {r.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Convertir ──────────────────────────────────────── */}
      {tab === "convert" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
            🔄 "Convertir"
          </div>

          {/* Bannière Pioneer Exchange Pool */}
          <div style={{
            background: `linear-gradient(135deg, #1e0840, #2D1060)`,
            border: `1px solid #D4A82744`,
            borderRadius: 14, padding: 14, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <SBCLogo size={56}/>
            <div>
              <div style={{ fontSize: 9, color: "#D4A827", fontWeight: 700,
                letterSpacing: 2, marginBottom: 4 }}>PIONEER EXCHANGE POOL</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#f5d980" }}>
                1 500 M SBC
              </div>
              <div style={{ fontSize: 10, color: "#6B4FA0" }}>
                Disponibles · Burn 0.5% / tx
              </div>
            </div>
          </div>

          {/* Toggle */}
          <div style={{
            display: "flex", background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12,
            padding: 4, marginBottom: 20,
          }}>
            {[
              { id:"pi",   label:"Pi → SBC" },
              { id:"fcfa", label:"FCFA → SBC" },
            ].map(t => (
              <div key={t.id}
                onClick={() => setConvFrom(t.id)}
                style={{
                  flex: 1, textAlign: "center", padding: "8px 0",
                  borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  background: convFrom === t.id ? C.primary : "transparent",
                  color: convFrom === t.id ? "#fff" : C.muted,
                  transition: "all .2s",
                }}
              >{t.label}</div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 16, marginBottom: 12,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
              MONTANT ({convFrom === "pi" ? "π" : "FCFA"})
            </div>
            <input
              type="number"
              value={convAmount}
              onChange={e => setConvAmount(e.target.value)}
              placeholder="0.00"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: C.text, fontSize: 28, fontWeight: 800,
                width: "100%", letterSpacing: -1,
              }}
            />
          </div>

          {/* Flèche */}
          <div style={{ textAlign: "center", fontSize: 20, margin: "8px 0" }}>⬇️</div>

          {/* Résultat */}
          <div style={{
            background: `${C.primary}22`,
            border: `1px solid ${C.primary}`,
            borderRadius: 12, padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
              VOUS RECEVREZ (SBC)
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SBCLogo size={40}/>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.light }}>
                {fmt(sbcFromPi, 2)} <span style={{ fontSize: 16 }}>SBC</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
              ≈ {fmt(sbcFromPi * MOCK.sbcRate)} FCFA
            </div>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
            borderRadius: 12, padding: "14px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1,
          }}>
            CONVERTIR MAINTENANT
          </div>
        </div>
      )}

      {/* ── Staking ────────────────────────────────────────── */}
      {tab === "staking" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            📈 Staking SBC
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Stakez vos SBC et gagnez des rendements jusqu'à 25%/an
          </div>

          {MOCK.staking.map(s => (
            <div key={s.tier} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 16, marginBottom: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${s.color}33`,
                    border: `2px solid ${s.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: s.color,
                  }}>{s.tier[0]}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: s.color }}>
                      {s.tier}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      Min. {fmt(s.minSBC)} SBC · {s.duration}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>
                    {s.rate}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted }}>/ an</div>
                </div>
              </div>
              <div style={{
                marginTop: 12,
                background: `${s.color}22`,
                border: `1px solid ${s.color}44`,
                borderRadius: 8, padding: "8px 12px",
                textAlign: "center", fontSize: 12, fontWeight: 700,
                color: s.color, cursor: "pointer",
              }}>
                Staker maintenant →
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Mobile Money ───────────────────────────────────── */}
      {tab === "mobile" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            📱 Mobile Money
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Rechargez ou retirez via Mobile Money CI
          </div>

          {/* Providers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {mmProviders.map(p => (
              <div key={p.id}
                onClick={() => setMmMethod(p.id)}
                style={{
                  background: mmMethod === p.id ? `${p.color}22` : C.card,
                  border: `2px solid ${mmMethod === p.id ? p.color : C.border}`,
                  borderRadius: 12, padding: "14px 10px",
                  textAlign: "center", cursor: "pointer",
                  transition: "all .2s",
                }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{p.name}</div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 16, marginBottom: 12,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
              NUMÉRO {mmProviders.find(p=>p.id===mmMethod)?.name.toUpperCase()}
            </div>
            <input
              placeholder="+225 07 XX XX XX"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: C.text, fontSize: 20, fontWeight: 700, width: "100%",
              }}
            />
          </div>

          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
              MONTANT (FCFA)
            </div>
            <input
              type="number"
              placeholder="5 000"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: C.text, fontSize: 20, fontWeight: 700, width: "100%",
              }}
            />
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
            borderRadius: 12, padding: "14px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1, marginBottom: 10,
          }}>
            RECHARGER EN SBC
          </div>
          <div style={{
            border: `2px solid ${C.primary}`,
            borderRadius: 12, padding: "12px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1, color: C.light,
          }}>
            RETIRER EN MOBILE MONEY
          </div>
        </div>
      )}

      {/* ── Historique ─────────────────────────────────────── */}
      {tab === "history" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>
            📋 Historique
          </div>
          {MOCK.txns.map(t => (
            <div key={t.id} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 10,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: t.type==="buy" ? `${C.green}22` : t.type==="stake" ? `${C.primary}22` : `${C.gold}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>
                {t.type==="buy"?"💰":t.type==="stake"?"📈":"📤"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  {t.type==="buy"?"Achat SBC":t.type==="stake"?"Staking":"Envoi Pi"}
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{t.date} · {t.id}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize: 14, fontWeight: 800,
                  color: t.type==="send" ? C.red : C.green,
                }}>
                  {t.type==="send"?"-":"+"}{t.amount} {t.currency}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  color: t.status==="ok" ? C.green : C.gold,
                }}>
                  {t.status==="ok"?"✓ Confirmé":"⏳ En attente"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* ── Paiements ──────────────────────────────────────── */}
      {tab === "payments" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:16 }}>
            ✅ {lang==="en"?"Payments":"Paiements"}
          </div>

          {/* Action en cours */}
          {pendingAction && (
            <div style={{
              background:"linear-gradient(135deg,#1e0840,#2D1060)",
              border:"1px solid #7C3AED",
              borderRadius:14, padding:16, marginBottom:20,
            }}>
              <div style={{fontSize:10,color:"#A855F7",fontWeight:700,
                letterSpacing:2,marginBottom:8}}>
                {pendingAction==="send"
                  ? (lang==="en"?"SEND SBC":"ENVOYER SBC")
                  : (lang==="en"?"RECEIVE SBC":"RECEVOIR SBC")}
              </div>
              {pendingAction==="send" && (
                <div>
                  <div style={{fontSize:11,color:"#ccc",marginBottom:10}}>
                    {lang==="en"?"Recipient address":"Adresse destinataire"}
                  </div>
                  <input placeholder={lang==="en"?"Stellar address or username":"Adresse Stellar ou username"}
                    style={{width:"100%",background:"#1a0830",border:"1px solid #7C3AED",
                      borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:11,
                      boxSizing:"border-box"}}/>
                  <div style={{fontSize:11,color:"#ccc",margin:"10px 0 6px"}}>
                    {lang==="en"?"Amount (SBC)":"Montant (SBC)"}
                  </div>
                  <input type="number" placeholder="0.00"
                    style={{width:"100%",background:"#1a0830",border:"1px solid #7C3AED",
                      borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:11,
                      boxSizing:"border-box"}}/>
                </div>
              )}
              {pendingAction==="receive" && (
                <div style={{textAlign:"center",padding:"10px 0"}}>
                  <div style={{
                    width:120,height:120,margin:"0 auto 12px",
                    background:"#fff",borderRadius:12,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:10,color:"#000",padding:8,
                  }}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:8,marginBottom:4}}>QR CODE</div>
                      <div style={{fontSize:7,wordBreak:"break-all",color:"#333"}}>
                        GDMRBR5TV...QLGUOE
                      </div>
                    </div>
                  </div>
                  <div style={{fontSize:9,color:"#A855F7"}}>
                    SEINBU FINTECH · Distribution Account
                  </div>
                </div>
              )}
              <div style={{display:"flex",gap:8,marginTop:14}}>
                <div onClick={()=>setPendingAction(null)}
                  style={{flex:1,padding:"10px 0",textAlign:"center",
                    background:"rgba(255,255,255,.1)",borderRadius:8,
                    fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  {lang==="en"?"Cancel":"Annuler"}
                </div>
                <div style={{flex:2,padding:"10px 0",textAlign:"center",
                  background:"#7C3AED",borderRadius:8,
                  fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  {lang==="en"?"Confirm":"Confirmer"}
                </div>
              </div>
            </div>
          )}

          {/* Transactions en attente */}
          <div style={{fontSize:10,color:"#6B4FA0",fontWeight:700,
            letterSpacing:1,marginBottom:10}}>
            {lang==="en"?"PENDING TRANSACTIONS":"TRANSACTIONS EN ATTENTE"}
          </div>
          {[
            {id:"PAY-001",desc:lang==="en"?"TELECOM Weekly plan":"TELECOM Forfait Weekly",
              amount:"0.000016 π",fcfa:"3 000",status:"pending"},
            {id:"PAY-002",desc:lang==="en"?"NUTRITECH subscription":"NUTRITECH Abonnement",
              amount:"0.000027 π",fcfa:"5 000",status:"pending"},
          ].map(tx => (
            <div key={tx.id} style={{
              background:"#110228",border:"1px solid #D4A82744",
              borderRadius:12,padding:14,marginBottom:10,
            }}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:11,fontWeight:700}}>{tx.desc}</div>
                <div style={{fontSize:9,color:"#F59E0B",background:"rgba(245,158,11,.1)",
                  borderRadius:6,padding:"2px 8px",fontWeight:700}}>
                  {lang==="en"?"Pending":"En attente"}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:900,color:"#D4A827"}}>
                    {tx.amount}
                  </div>
                  <div style={{fontSize:9,color:"#6B4FA0"}}>≈ {tx.fcfa} FCFA</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <div style={{padding:"6px 12px",borderRadius:8,fontSize:10,
                    fontWeight:700,background:"rgba(239,68,68,.15)",
                    color:"#EF4444",cursor:"pointer"}}>
                    {lang==="en"?"Reject":"Refuser"}
                  </div>
                  <div style={{padding:"6px 12px",borderRadius:8,fontSize:10,
                    fontWeight:700,background:"#7C3AED",cursor:"pointer"}}>
                    {authPending===tx.id
                    ? "⏳"
                    : (lang==="en"?"Approve":"Approuver")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ── Bottom Nav ─────────────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: C.card,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
      }}>
        {tabs.map(t => (
          <div key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "10px 0",
              textAlign: "center", cursor: "pointer",
              borderTop: tab===t.id ? `2px solid ${C.primary}` : "2px solid transparent",
            }}>
            <div style={{ fontSize: 16 }}>{t.icon}</div>
            <div style={{
              fontSize: 8, marginTop: 2,
              color: tab===t.id ? C.primary : C.muted,
              fontWeight: tab===t.id ? 700 : 400,
            }}>{t.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
