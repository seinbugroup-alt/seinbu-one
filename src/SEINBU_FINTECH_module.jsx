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
  sbcBalance:  450,
  piBalance:   1247.83,
  sbcRate:     10,        // FCFA par SBC
  piGCV:       314159,    // USD par Pi × 600 = FCFA
  txns: [
    { id:"TXN001", type:"buy",   amount:100,  currency:"SBC", date:"06/06/2026", status:"ok" },
    { id:"TXN002", type:"stake", amount:200,  currency:"SBC", date:"05/06/2026", status:"ok" },
    { id:"TXN003", type:"send",  amount:0.5,  currency:"Pi",  date:"04/06/2026", status:"ok" },
    { id:"TXN004", type:"buy",   amount:150,  currency:"SBC", date:"03/06/2026", status:"pending" },
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
export default function SeinbuFintech() {
  const [tab, setTab] = useState("dashboard");
  const [convFrom, setConvFrom] = useState("pi");
  const [convAmount, setConvAmount] = useState("");
  const [mmMethod, setMmMethod] = useState("orange");

  const sbcFromPi = convFrom === "pi"
    ? (parseFloat(convAmount)||0) * MOCK.piGCV / MOCK.sbcRate
    : (parseFloat(convAmount)||0) / MOCK.sbcRate;

  const tabs = [
    { id:"dashboard", label:"Dashboard", icon:"📊" },
    { id:"convert",   label:"Convertir", icon:"🔄" },
    { id:"staking",   label:"Staking",   icon:"📈" },
    { id:"mobile",    label:"Mobile",    icon:"📱" },
    { id:"history",   label:"Historique",icon:"📋" },
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
        <img src="data:image/png;base64,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b968du1aIcQHP/jB0tLSRC0xtNre3t5t27YdO3asp6cnGAwWFhYWFxc3NTVNnDhReQmNNyiEuPnmm6urq7W3jJ72HD9+/Nlnnx0zZsyKFSui1jM4OPjb3/62oKDgIx/5SNSaXS7Xhz/84cLCwqinPP7442fOnBFCXH311WPHjtX/LqIWc7lcfr+/srJy8uTJ06ZNi1S8oj5Qta6uri1btpw4caKvr8/tdpeUlIwdO3bOnDn5+fnqxcy9X+3Gazh8+PDmzZvPnDnj9Xqrq6tnzZrV1NSk/ZS4L+1yufLz82tqambPnj1mzBj1MnG3Rux69HSGpO+3pKTkoYceStr4pUuXvvHGG7W1tTfccIP68f379//lL38RQnzoQx8qLi5WN/LBBx8UQtxxxx0ejyfyeNRnWlpaOnbs2NmzZ6s/U509RyTeXN3d3c8880xvb+/ChQsZvIblGCJEbjt79uzu3bv1L79nz56oGymudvfu3Y899tg777zT0dExPDwcDAZ7enpaW1vXrVv3zDPP6G+YNqNvU79wOLx3796oB0+dOqWkKynrHxoaam1tXbNmzauvvpp0+W3btj3++OM7d+7s7u4OBALDw8MdHR2bNm167LHHTpw4IaVJJmzfvv2FF15oa2sbHh7u7+8/evToqlWruru7TawqHA4PDAwcPXr0ueee2759u4k1pK8zxCorK/P5fKdOnQoEAurHW1tblRstLS3qx9vb24PBYG1trTpdxX6mp0+f3rhx42OPPRZZTyyjPaezs/Opp57q7e1dvHgx6QrZgAoWsoX21/e4fD5fMBjcuHHj1KlTo77Qx9Xe3t7Z2VlfX9/e3r5nz55Ee2H9q92/f/8rr7wihGhubp41a1ZNTY3X6+3v7+/r6zt69GhbW5t6YRNv0Gh7jCouLna73Xv27Jk7d676cSV9NjQ0RB0+he53EVksFAr19fVt3779nXfe2b1797x588rLyxM9a+/evW+88YYQYtKkSbNnz66srAyFQm1tbRs2bDh58uTzzz9/4403VlZWGn6fBhsfa8OGDUKI+fPnz5492+v1tra2btu2zdD8M/UG6erqWr9+/aFDh9auXTt58mS/369/PYY6g/b7jarFPvrooz09PbfddltUObOuru7YsWMnT55sbGyMPNjS0lJTU9PV1dXa2jp58mT140KI+vr6yCPan+mqVatu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"
          style={{ width: 44, height: 44, borderRadius: 10, objectFit: "contain" }}
          alt="SEINBU FINTECH"/>
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
              {["Envoyer","Recevoir","Échanger"].map(a => (
                <div key={a} style={{
                  flex: 1, background: "rgba(255,255,255,.15)",
                  borderRadius: 8, padding: "6px 4px",
                  textAlign: "center", fontSize: 10, fontWeight: 700,
                  cursor: "pointer",
                }}>{a}</div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label:"SBC en staking", value:"200 SBC", sub:"Palier ARGENT", icon:"📈", color:C.primary },
              { label:"Gains ce mois", value:"+20 SBC", sub:"Rendement 10%", icon:"💰", color:C.green },
              { label:"Pi disponibles", value:`${fmt(MOCK.piBalance,2)} π`, sub:"≈ 235 Mds FCFA", icon:"π", color:C.gold },
              { label:"Transactions", value:"4", sub:"Ce mois", icon:"📋", color:C.light },
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
              TAUX EN TEMPS RÉEL
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
            🔄 Convertir
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
