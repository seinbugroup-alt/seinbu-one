import { useT } from "./i18n";
import { useState } from "react";

const C = {
  bg:      "#020E1A",
  card:    "#071829",
  border:  "#0C3050",
  primary: "#0891B2",
  light:   "#22D3EE",
  gold:    "#D4A827",
  green:   "#10B981",
  red:     "#EF4444",
  text:    "#D0EEF7",
  muted:   "#3A7A9A",
};

// Opérateurs réseau téléphonique CI (GSM/4G/5G)
// Wave retiré : service de paiement uniquement, pas opérateur réseau
const OPERATORS = [
  { id:"orange", name:"Orange CI",   color:"#FF6B00", icon:"🟠", prefix:"+225 07/08/09" },
  { id:"mtn",    name:"MTN CI",      color:"#FFCB05", icon:"🟡", prefix:"+225 05/06/25" },
  { id:"moov",   name:"Moov Africa", color:"#00A651", icon:"🟢", prefix:"+225 01/02/70" },
];

const CREDIT_PACKS = [
  { amount:500,   pi:3e-06, label:"500 FCFA",   popular:false },
  { amount:1000,  pi:5e-06, label:"1 000 FCFA", popular:false },
  { amount:2000,  pi:1.1e-05, label:"2 000 FCFA", popular:true  },
  { amount:5000,  pi:2.7e-05, label:"5 000 FCFA", popular:false },
  { amount:10000, pi:5.3e-05, label:"10 000 FCFA",popular:false },
  { amount:20000, pi:0.000106, label:"20 000 FCFA",popular:false },
];

const DATA_PACKS = [
  { id:"d1",  name:"Starter",    data:"500 Mo",  duration:"24h",  price:500,   pi:3e-06, color:"#3B82F6",  icon:"📶", features:["Réseaux sociaux","WhatsApp","Navigation"] },
  { id:"d2",  name:"Daily",      data:"1 Go",    duration:"24h",  price:1000,  pi:5e-06, color:"#8B5CF6",  icon:"⚡", features:["Streaming SD","Appels VoIP","Email"] },
  { id:"d3",  name:"Weekly",     data:"5 Go",    duration:"7j",   price:3000,  pi:1.6e-05, color:"#0891B2",  icon:"📡", features:["Streaming HD","Téléchargements","Gaming"] },
  { id:"d4",  name:"Monthly",    data:"20 Go",   duration:"30j",  price:8000,  pi:4.2e-05, color:"#059669",  icon:"🌐", features:["Ultra HD","Cloud backup","Hotspot"] },
  { id:"d5",  name:"Pro",        data:"50 Go",   duration:"30j",  price:15000, pi:8e-05, color:"#D97706",  icon:"🚀", features:["Illimité réseaux","Hotspot 10 appareils","5G prioritaire"] },
  { id:"d6",  name:"Infinity",   data:"Illimité",duration:"30j",  price:25000, pi:0.000133, color:"#DC2626",  icon:"♾️", features:["Vraiment illimité","5G max","Roaming UEMOA"] },
];

const CALL_PACKS = [
  { id:"c1", name:"100 min",  dest:"Tous réseaux CI",  duration:"30j", price:2000,  pi:1.1e-05, icon:"📞" },
  { id:"c2", name:"300 min",  dest:"Tous réseaux CI",  duration:"30j", price:5000,  pi:2.7e-05, icon:"📞" },
  { id:"c3", name:"Illimité", dest:"Réseau SEINBU",    duration:"30j", price:3000,  pi:1.6e-05, icon:"🔊" },
  { id:"c4", name:"Intl 30 min", dest:"UEMOA + France",duration:"30j", price:10000, pi:5.3e-05, icon:"🌍" },
];

const fmt = (n, d=0) => new Intl.NumberFormat("fr-FR",{maximumFractionDigits:d}).format(n);

export default function SeinbuTelecom({ lang = "fr" }) {
  // eslint-disable-next-line no-unused-vars
  const T = useT("telecom", lang);
  const [tab, setTab]         = useState("recharge");
  const [operator, setOp]     = useState("orange");
  const [phone, setPhone]     = useState("");
  const [selectedPack, setSP] = useState(null);
  const [payMethod, setPM]    = useState("pi");
  const [confirmed, setConf]  = useState(false);

  const op = OPERATORS.find(o => o.id === operator);

  const tabs = [
    { id:"recharge", label:"Crédit", icon:"📱" },
    { id:"data",     label:"Internet", icon:"📶" },
    { id:"calls",    label:lang==="en"?"Calls":"Appels", icon:"📞" },
    { id:"history",  label:(lang==="en"?"History":"Historique"), icon:"📋" },
  ];

  if (confirmed) return (
    <div style={{
      background: C.bg, minHeight:"100vh", color:C.text,
      fontFamily:"'Segoe UI',sans-serif",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", padding:30,
    }}>
      <div style={{ fontSize:60, marginBottom:16 }}>✅</div>
      <div style={{ fontSize:22, fontWeight:900, marginBottom:8, textAlign:"center" }}>
        Recharge réussie !
      </div>
      <div style={{ fontSize:13, color:C.muted, textAlign:"center", marginBottom:24 }}>
        {phone} a été rechargé avec succès
      </div>
      <div style={{
        background:C.card, border:`1px solid ${C.border}`,
        borderRadius:14, padding:20, width:"100%", marginBottom:24,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, fontSize:12 }}>Numéro</span>
          <span style={{ fontWeight:700, fontSize:12 }}>{phone}</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, fontSize:12 }}>Opérateur</span>
          <span style={{ fontWeight:700, fontSize:12 }}>{op?.name}</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0" }}>
          <span style={{ color:C.muted, fontSize:12 }}>Référence</span>
          <span style={{ fontWeight:700, fontSize:12, color:C.primary }}>
            TEL-{Date.now().toString().slice(-8)}
          </span>
        </div>
      </div>
      <div
        onClick={() => { setConf(false); setPhone(""); setSP(null); }}
        style={{
          background:`linear-gradient(135deg, ${C.primary}, ${C.light})`,
          borderRadius:12, padding:"14px 40px",
          fontSize:14, fontWeight:800, cursor:"pointer", letterSpacing:1,
        }}
      >NOUVELLE RECHARGE</div>
    </div>
  );

  return (
    <div style={{
      background: C.bg, minHeight:"100vh",
      color: C.text, fontFamily:"'Segoe UI',sans-serif",
      paddingBottom: 80,
    }}>

      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg, ${C.primary}22, ${C.bg})`,
        borderBottom:`1px solid ${C.border}`,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:12,
      }}>
        <div style={{
          width:40, height:40, borderRadius:10,
          background:`linear-gradient(135deg, ${C.primary}, ${C.light})`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
        }}>📡</div>
        <div>
          <div style={{ fontWeight:800, fontSize:16, letterSpacing:1 }}>SEINBU TELECOM</div>
          <div style={{ fontSize:10, color:C.muted }}>Recharge · Internet · Appels · 5G CI</div>
        </div>
        <div style={{
          marginLeft:"auto", background:`${C.primary}22`,
          border:`1px solid ${C.primary}`, borderRadius:20,
          padding:"4px 12px", fontSize:11, color:C.light,
        }}>Bêta</div>
      </div>

      {/* ── Recharge crédit ─────────────────────────────── */}
      {tab === "recharge" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>
            📱 Recharge crédit
          </div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>
            Rechargez n'importe quel numéro CI en Pi ou SBC
          </div>

          {/* Choix opérateur */}
          <div style={{ fontSize:10, color:C.muted, marginBottom:8, fontWeight:700 }}>
            OPÉRATEUR
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            {OPERATORS.map(o => (
              <div key={o.id} onClick={() => setOp(o.id)} style={{
                background: operator===o.id ? `${o.color}22` : C.card,
                border:`2px solid ${operator===o.id ? o.color : C.border}`,
                borderRadius:10, padding:"10px 8px",
                display:"flex", alignItems:"center", gap:8, cursor:"pointer",
              }}>
                <span style={{ fontSize:20 }}>{o.icon}</span>
                <div>
                  <div style={{ fontSize:11, fontWeight:700 }}>{o.name}</div>
                  <div style={{ fontSize:8, color:C.muted }}>{o.prefix}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Numéro */}
          <div style={{ fontSize:10, color:C.muted, marginBottom:6, fontWeight:700 }}>
            NUMÉRO À RECHARGER
          </div>
          <div style={{
            background:C.card, border:`1px solid ${operator ? OPERATORS.find(o=>o.id===operator)?.color+"44" : C.border}`,
            borderRadius:12, padding:"12px 16px", marginBottom:16,
            display:"flex", alignItems:"center", gap:10,
          }}>
            <span style={{ fontSize:16 }}>{op?.icon}</span>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder={op?.prefix || "+225 XX XX XX XX"}
              style={{
                background:"transparent", border:"none", outline:"none",
                color:C.text, fontSize:18, fontWeight:700, flex:1,
              }}
            />
          </div>

          {/* Montants */}
          <div style={{ fontSize:10, color:C.muted, marginBottom:8, fontWeight:700 }}>
            CHOISISSEZ UN MONTANT
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
            {CREDIT_PACKS.map(p => (
              <div key={p.amount} onClick={() => setSP(p)} style={{
                background: selectedPack?.amount===p.amount ? `${C.primary}33` : C.card,
                border:`2px solid ${selectedPack?.amount===p.amount ? C.primary : C.border}`,
                borderRadius:10, padding:"10px 6px",
                textAlign:"center", cursor:"pointer", position:"relative",
              }}>
                {p.popular && (
                  <div style={{
                    position:"absolute", top:-6, left:"50%",
                    transform:"translateX(-50%)",
                    background:C.gold, color:"#000",
                    fontSize:7, fontWeight:900, padding:"2px 6px",
                    borderRadius:4, letterSpacing:.5,
                  }}>POPULAIRE</div>
                )}
                <div style={{ fontSize:13, fontWeight:800 }}>{p.label}</div>
                <div style={{ fontSize:8, color:C.muted, marginTop:2 }}>
                  {p.pi.toFixed(6)} π
                </div>
              </div>
            ))}
          </div>

          {/* Méthode paiement */}
          <div style={{ fontSize:10, color:C.muted, marginBottom:8, fontWeight:700 }}>
            PAYER AVEC
          </div>
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {[
              { id:"pi",  label:"Pi Network", icon:"π",  color:C.gold },
              { id:"sbc", label:"SBC Coin",   icon:"S",  color:C.primary },
            ].map(m => (
              <div key={m.id} onClick={() => setPM(m.id)} style={{
                flex:1, background: payMethod===m.id ? `${m.color}22` : C.card,
                border:`2px solid ${payMethod===m.id ? m.color : C.border}`,
                borderRadius:10, padding:"10px 0",
                textAlign:"center", cursor:"pointer",
              }}>
                <div style={{ fontSize:18, fontWeight:900, color:m.color }}>{m.icon}</div>
                <div style={{ fontSize:10, fontWeight:700, marginTop:2 }}>{m.label}</div>
                {selectedPack && (
                  <div style={{ fontSize:8, color:C.muted, marginTop:1 }}>
                    {m.id==="pi"
                      ? `${selectedPack.pi.toFixed(6)} π`
                      : `${fmt(selectedPack.amount / 10)} SBC`}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Récap */}
          {selectedPack && phone && (
            <div style={{
              background:`${C.primary}11`, border:`1px solid ${C.primary}44`,
              borderRadius:12, padding:14, marginBottom:16,
            }}>
              <div style={{ fontSize:11, fontWeight:700, marginBottom:8, color:C.light }}>
                RÉCAPITULATIF
              </div>
              {[
                ["Numéro", phone],
                ["Opérateur", op?.name],
                ["Montant", selectedPack.label],
                ["Paiement", payMethod==="pi" ? `${selectedPack.pi.toFixed(6)} π` : `${fmt(selectedPack.amount/10)} SBC`],
              ].map(([k,v]) => (
                <div key={k} style={{
                  display:"flex", justifyContent:"space-between",
                  fontSize:11, padding:"3px 0",
                  borderBottom:`1px solid ${C.border}`,
                }}>
                  <span style={{ color:C.muted }}>{k}</span>
                  <span style={{ fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={() => selectedPack && phone && setConf(true)}
            style={{
              background: selectedPack && phone
                ? `linear-gradient(135deg, ${C.primary}, ${C.light})`
                : C.card,
              borderRadius:12, padding:"14px 0",
              textAlign:"center", fontSize:14, fontWeight:800,
              cursor: selectedPack && phone ? "pointer" : "default",
              color: selectedPack && phone ? "#fff" : C.muted,
              letterSpacing:1,
              opacity: selectedPack && phone ? 1 : .5,
            }}
          >
            RECHARGER MAINTENANT
          </div>
        </div>
      )}

      {/* ── Internet ─────────────────────────────────────── */}
      {tab === "data" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>
            📶 Forfaits Internet
          </div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>
            Forfaits 4G/5G SEINBU TELECOM — payables en Pi ou SBC
          </div>

          {/* Sélection opérateur */}
          <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto" }}>
            {OPERATORS.map(o => (
              <div key={o.id} onClick={() => setOp(o.id)} style={{
                background: operator===o.id ? `${o.color}22` : C.card,
                border:`2px solid ${operator===o.id ? o.color : C.border}`,
                borderRadius:20, padding:"6px 14px",
                fontSize:11, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap",
                flexShrink:0,
              }}>{o.icon} {o.name}</div>
            ))}
          </div>

          {DATA_PACKS.map(p => (
            <div key={p.id} onClick={() => setSP(p)} style={{
              background: selectedPack?.id===p.id ? `${p.color}22` : C.card,
              border:`2px solid ${selectedPack?.id===p.id ? p.color : C.border}`,
              borderRadius:14, padding:14, marginBottom:10, cursor:"pointer",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{
                    width:40, height:40, borderRadius:10,
                    background:`${p.color}33`, border:`2px solid ${p.color}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                  }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:14 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{p.duration}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:20, fontWeight:900, color:p.color }}>{p.data}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{fmt(p.price)} FCFA</div>
                  <div style={{ fontSize:9, color:C.gold }}>{p.pi.toFixed(6)} π</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {p.features.map(f => (
                  <span key={f} style={{
                    background:`${p.color}22`, color:p.color,
                    borderRadius:20, padding:"2px 8px", fontSize:9, fontWeight:700,
                  }}>✓ {f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Appels ───────────────────────────────────────── */}
      {tab === "calls" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>
            📞 Forfaits Appels
          </div>
          <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>
            Appels illimités sur tous réseaux CI
          </div>

          {CALL_PACKS.map(p => (
            <div key={p.id} onClick={() => setSP(p)} style={{
              background: selectedPack?.id===p.id ? `${C.primary}22` : C.card,
              border:`2px solid ${selectedPack?.id===p.id ? C.primary : C.border}`,
              borderRadius:14, padding:16, marginBottom:10, cursor:"pointer",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{
                    width:44, height:44, borderRadius:12,
                    background:`${C.primary}33`, border:`2px solid ${C.primary}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
                  }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:15 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:C.muted }}>{p.dest}</div>
                    <div style={{ fontSize:9, color:C.muted }}>{p.duration}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:16, fontWeight:900, color:C.primary }}>
                    {fmt(p.price)} FCFA
                  </div>
                  <div style={{ fontSize:9, color:C.gold }}>{p.pi.toFixed(6)} π</div>
                </div>
              </div>
            </div>
          ))}

          {selectedPack && (
            <div style={{
              marginTop:8,
              background:`linear-gradient(135deg, ${C.primary}, ${C.light})`,
              borderRadius:12, padding:"14px 0",
              textAlign:"center", fontSize:14, fontWeight:800,
              cursor:"pointer", letterSpacing:1,
            }}>
              ACTIVER — {selectedPack.name}
            </div>
          )}
        </div>
      )}

      {/* ── Historique ───────────────────────────────────── */}
      {tab === "history" && (
        <div style={{ padding:"20px 16px" }}>
          <div style={{ fontSize:16, fontWeight:800, marginBottom:16 }}>
            📋 Historique
          </div>
          {[
            { type:"recharge", num:"+225 07 12 34 56", amount:"2 000 FCFA", date:"06/06", status:"ok", icon:"📱" },
            { type:"data",     num:"Forfait Weekly 5Go",amount:"3 000 FCFA", date:"04/06", status:"ok", icon:"📶" },
            { type:"calls",    num:"300 min Tous réseaux",amount:"5 000 FCFA",date:"01/06",status:"ok",icon:"📞" },
            { type:"recharge", num:"+225 05 98 76 54", amount:"1 000 FCFA", date:"30/05", status:"pending", icon:"📱" },
          ].map((t,i) => (
            <div key={i} style={{
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:12, padding:"12px 14px", marginBottom:10,
              display:"flex", alignItems:"center", gap:12,
            }}>
              <div style={{
                width:36, height:36, borderRadius:10,
                background:`${C.primary}22`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
              }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700 }}>{t.num}</div>
                <div style={{ fontSize:9, color:C.muted }}>
                  {t.date} · #{(Math.random()*100000|0).toString().padStart(6,"0")}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:800, color:C.primary }}>
                  {t.amount}
                </div>
                <div style={{
                  fontSize:9, fontWeight:700,
                  color: t.status==="ok" ? C.green : C.gold,
                }}>
                  {t.status==="ok" ? "✓ Confirmé" : "⏳ En attente"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        background:C.card, borderTop:`1px solid ${C.border}`,
        display:"flex",
      }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:"10px 0", textAlign:"center", cursor:"pointer",
            borderTop: tab===t.id ? `2px solid ${C.primary}` : "2px solid transparent",
          }}>
            <div style={{ fontSize:16 }}>{t.icon}</div>
            <div style={{
              fontSize:8, marginTop:2,
              color: tab===t.id ? C.primary : C.muted,
              fontWeight: tab===t.id ? 700 : 400,
            }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
