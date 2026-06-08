import { useT } from "./i18n";
import { useState } from "react";

const C = {
  bg:      "#0F0303",
  card:    "#1A0808",
  border:  "#3D1010",
  primary: "#DC2626",
  light:   "#F87171",
  gold:    "#D4A827",
  green:   "#10B981",
  text:    "#F5E0E0",
  muted:   "#7F1D1D",
  sub:     "#6B2020",
};

const tabs = [
  { id:"kyc",    label:"KYC Pi",   icon:"🪪" },
  { id:"audit",  label:"Audit",    icon:"🔍" },
  { id:"cert",   label:"CERT CI",  icon:"🛡️" },
  { id:"certs",  label:lang==="en"?"Certificates":"Certificats", icon:"📜" },
];

const KYC_STEPS = [
  { id:1, label:"Connexion Pi SDK",         done:true,  icon:"π" },
  { id:2, label:"Vérification identité",    done:true,  icon:"🪪" },
  { id:3, label:"Selfie biométrique",       done:false, icon:"📷" },
  { id:4, label:"Validation SEINBU",        done:false, icon:"✅" },
  { id:5, label:"Certificat KYC délivré",   done:false, icon:"📜" },
];

const ALERTS = [
  { level:"haute",  color:"#DC2626", icon:"🔴", title:"Tentative intrusion",   time:"Il y a 2h",  desc:"Accès non autorisé détecté sur le nœud Abidjan-01" },
  { level:"moyenne",color:"#F97316", icon:"🟠", title:"Certificat expirant",   time:"Dans 3 jours",desc:"Certificat TLS de seinbu-one.vercel.app à renouveler" },
  { level:"info",   color:"#0891B2", icon:"🔵", title:"Audit planifié",        time:"Lundi 09h",  desc:"Audit mensuel BCEAO compliance — durée estimée 4h" },
];

const SERVICES = [
  { icon:"🔐", label:"Pentest Web",          sub:"Test d'intrusion applications", price:"250 000 FCFA", pi:"0.00133" },
  { icon:"⛓️", label:"Audit Blockchain",     sub:"Smart contracts & Pi SDK",      price:"500 000 FCFA", pi:"0.00265" },
  { icon:"🪪", label:"KYC Pi Entreprise",    sub:"Vérification masse pionniers",   price:"150 000 FCFA", pi:"0.00080" },
  { icon:"📋", label:"Conformité BCEAO",     sub:"Rapport audit réglementaire",    price:"800 000 FCFA", pi:"0.00424" },
  { icon:"🛡️", label:"CERT CI Abonnement",  sub:"Veille menaces 24h/24",          price:"200 000 FCFA", pi:"0.00106" },
];

const CERTS = [
  { id:"SEC-2026-001", label:"KYC Pi Pioneer",        date:"01/06/2026", valid:"01/06/2027", status:"valid",   color:"#10B981" },
  { id:"SEC-2026-002", label:"Conformité BCEAO",      date:"15/05/2026", valid:"15/05/2027", status:"valid",   color:"#10B981" },
  { id:"SEC-2025-089", label:"Audit Sécurité Web",    date:"10/11/2025", valid:"10/11/2026", status:"warning", color:"#F97316" },
];

// eslint-disable-next-line no-unused-vars
const fmt = n => new Intl.NumberFormat("fr-FR").format(n);

export default function SeinbuSecurity({ lang = "fr" }) {
  // eslint-disable-next-line no-unused-vars
  const T = useT("security", lang);
  const [tab, setTab] = useState("kyc");
  const [kycStarted, setKycStarted] = useState(false);
  const [currentStep] = useState(2);

  return (
    <div style={{
      background:C.bg, minHeight:"100vh", color:C.text,
      fontFamily:"'Segoe UI',sans-serif", paddingBottom:80,
    }}>

      {/* Header */}
      <div style={{
        background:`linear-gradient(135deg,${C.primary}22,${C.bg})`,
        borderBottom:`1px solid ${C.border}`,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:12,
      }}>
        <div style={{
          width:40, height:40, borderRadius:10,
          background:`linear-gradient(135deg,${C.primary},#991B1B)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
        }}>🔐</div>
        <div>
          <div style={{fontWeight:800, fontSize:16, letterSpacing:1}}>SEINBU SECURITY</div>
          <div style={{fontSize:10, color:C.muted}}>
            Cybersécurité · KYC Pi · CERT CI · Conformité BCEAO
          </div>
        </div>
        <div style={{
          marginLeft:"auto", display:"flex", alignItems:"center", gap:6,
          background:"rgba(16,185,129,.15)", border:"1px solid rgba(16,185,129,.3)",
          borderRadius:20, padding:"4px 12px", fontSize:10, color:"#5DD490",
        }}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#5DD490"}}/>
          Système actif
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display:"flex", background:C.card,
        borderBottom:`1px solid ${C.border}`, padding:"0 4px",
      }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:"11px 4px", textAlign:"center",
            fontSize:9, fontWeight:800, cursor:"pointer",
            borderBottom: tab===t.id ? `2px solid ${C.primary}` : "2px solid transparent",
            color: tab===t.id ? C.light : C.muted,
            transition:"all .15s",
          }}>
            <div style={{fontSize:16, marginBottom:2}}>{t.icon}</div>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{padding:"16px 16px"}}>

        {/* ── KYC Pi ──────────────────────────────────── */}
        {tab === "kyc" && (
          <div>
            {/* Score */}
            <div style={{
              background:`linear-gradient(135deg,#1A0808,#2D0A0A)`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:20, marginBottom:16, textAlign:"center",
            }}>
              <div style={{fontSize:10, color:C.muted, letterSpacing:1, marginBottom:8}}>
                SCORE KYC SEINBU
              </div>
              <div style={{
                fontSize:56, fontWeight:900,
                color: kycStarted ? C.primary : "#3D1010",
              }}>
                {kycStarted ? "72" : "—"}
              </div>
              <div style={{fontSize:11, color:C.muted, marginBottom:12}}>
                {kycStarted ? "En cours de vérification" : "KYC non initié"}
              </div>
              {!kycStarted && (
                <div onClick={() => setKycStarted(true)} style={{
                  background:`linear-gradient(135deg,${C.primary},#991B1B)`,
                  borderRadius:12, padding:"12px 0",
                  fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:1,
                }}>
                  DÉMARRER MON KYC PI
                </div>
              )}
            </div>

            {/* Étapes */}
            <div style={{
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:14, padding:16, marginBottom:16,
            }}>
              <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
                PROCESSUS DE VÉRIFICATION
              </div>
              {KYC_STEPS.map((step, idx) => {
                const isDone = kycStarted && idx < currentStep;
                const isActive = kycStarted && idx === currentStep;
                return (
                  <div key={step.id} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"10px 0",
                    borderBottom: idx < KYC_STEPS.length-1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <div style={{
                      width:32, height:32, borderRadius:"50%",
                      background: isDone ? "rgba(16,185,129,.2)" : isActive ? `${C.primary}22` : "rgba(255,255,255,.04)",
                      border: `2px solid ${isDone ? "#10B981" : isActive ? C.primary : C.border}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:14, fontWeight:800,
                      color: isDone ? "#10B981" : isActive ? C.primary : C.muted,
                    }}>
                      {isDone ? "✓" : step.icon}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{
                        fontSize:12, fontWeight:700,
                        color: isDone ? "#10B981" : isActive ? C.text : C.muted,
                      }}>{step.label}</div>
                    </div>
                    {isActive && (
                      <div style={{
                        background:`${C.primary}22`, color:C.light,
                        fontSize:8, fontWeight:800, padding:"2px 8px",
                        borderRadius:10, letterSpacing:.5,
                      }}>EN COURS</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Infos */}
            <div style={{
              background:`${C.primary}11`, border:`1px solid ${C.primary}33`,
              borderRadius:12, padding:14,
            }}>
              <div style={{fontSize:11, fontWeight:800, color:C.primary, marginBottom:8}}>
                Pourquoi le KYC Pi SEINBU ?
              </div>
              {[
                "Accès aux Pi Bonds et services financiers SEINBU CAPITAL",
                "Conformité BCEAO et réglementations UEMOA",
                "Authentification forte pour les transactions Pi > 10 000 FCFA",
                "Certificat numérique SEINBU valide 1 an",
              ].map((t,i) => (
                <div key={i} style={{fontSize:10, color:C.text, padding:"4px 0",
                  borderBottom:`1px solid ${C.border}`, display:"flex", gap:8}}>
                  <span style={{color:C.primary}}>›</span> {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Audit ──────────────────────────────────── */}
        {tab === "audit" && (
          <div>
            {/* Alertes */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
              🔴 ALERTES ACTIVES
            </div>
            {ALERTS.map((a, i) => (
              <div key={i} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${a.color}`,
                borderRadius:12, padding:"12px 14px", marginBottom:10,
              }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4}}>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}>
                    <span style={{fontSize:14}}>{a.icon}</span>
                    <span style={{fontSize:12, fontWeight:800}}>{a.title}</span>
                  </div>
                  <span style={{fontSize:9, color:C.muted}}>{a.time}</span>
                </div>
                <div style={{fontSize:10, color:C.muted, paddingLeft:22}}>{a.desc}</div>
              </div>
            ))}

            {/* Services */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12, marginTop:20}}>
              🔍 SERVICES D'AUDIT
            </div>
            {SERVICES.map((s, i) => (
              <div key={i} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8,
                display:"flex", alignItems:"center", gap:12,
              }}>
                <div style={{
                  width:38, height:38, borderRadius:10,
                  background:`${C.primary}22`, border:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                }}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:700}}>{s.label}</div>
                  <div style={{fontSize:9, color:C.muted}}>{s.sub}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11, fontWeight:800, color:C.primary}}>{s.price}</div>
                  <div style={{fontSize:8, color:C.gold}}>{s.pi} π</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CERT CI ────────────────────────────────── */}
        {tab === "cert" && (
          <div>
            {/* Présentation */}
            <div style={{
              background:`linear-gradient(135deg,#1A0808,#2D0A0A)`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:20, marginBottom:16, textAlign:"center",
            }}>
              <div style={{fontSize:40, marginBottom:10}}>🛡️</div>
              <div style={{fontSize:18, fontWeight:900, color:C.light, marginBottom:4}}>
                CERT AFRIQUE DE L'OUEST
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:16}}>
                Computer Emergency Response Team · SEINBU SECURITY
              </div>
              <div style={{
                display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap",
              }}>
                {["Premier CERT privé d'AOW", "Surveillance 24h/24", "Réponse < 1h"].map(t => (
                  <span key={t} style={{
                    background:`${C.primary}22`, color:C.light,
                    border:`1px solid ${C.primary}44`,
                    borderRadius:20, padding:"3px 10px", fontSize:9, fontWeight:700,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16}}>
              {[
                ["247", "Incidents traités", C.primary],
                ["< 45 min", "Temps réponse moy.", "#F97316"],
                ["99.7%", "Disponibilité", C.green],
                ["14", "Pays couverts", C.gold],
              ].map(([v, l, col]) => (
                <div key={l} style={{
                  background:C.card, border:`1px solid ${C.border}`,
                  borderRadius:12, padding:"14px 12px", textAlign:"center",
                }}>
                  <div style={{fontSize:18, fontWeight:900, color:col}}>{v}</div>
                  <div style={{fontSize:9, color:C.muted, marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Services CERT */}
            {[
              { icon:"🔎", title:"Veille cyber",          desc:"Surveillance temps réel des menaces ciblant l'UEMOA" },
              { icon:"⚡", title:"Réponse incidents",     desc:"Intervention rapide en cas d'attaque ou compromission" },
              { icon:"📊", title:"Rapports mensuels",     desc:"Tableau de bord sécurité pour décideurs et régulateurs" },
              { icon:"🤝", title:"Coopération ARTCI",     desc:"Partenariat officiel avec l'ARTCI Côte d'Ivoire" },
            ].map((s, i) => (
              <div key={i} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"13px 14px", marginBottom:8,
                display:"flex", gap:12, alignItems:"flex-start",
              }}>
                <span style={{fontSize:22}}>{s.icon}</span>
                <div>
                  <div style={{fontSize:12, fontWeight:700, marginBottom:2}}>{s.title}</div>
                  <div style={{fontSize:10, color:C.muted}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Certificats ────────────────────────────── */}
        {tab === "certs" && (
          <div>
            <div style={{fontSize:11, color:C.muted, marginBottom:16}}>
              Certificats numériques SEINBU SECURITY délivrés à votre entité
            </div>
            {CERTS.map(cert => (
              <div key={cert.id} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${cert.color}`,
                borderRadius:14, padding:16, marginBottom:12,
              }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10}}>
                  <div>
                    <div style={{fontSize:13, fontWeight:800}}>{cert.label}</div>
                    <div style={{
                      fontFamily:"monospace", fontSize:9,
                      color:C.muted, marginTop:3,
                    }}>{cert.id}</div>
                  </div>
                  <span style={{
                    background:`${cert.color}22`, color:cert.color,
                    border:`1px solid ${cert.color}44`,
                    borderRadius:20, padding:"3px 10px", fontSize:9, fontWeight:800,
                  }}>
                    {cert.status === "valid" ? "✓ Valide" : "⚠ À renouveler"}
                  </span>
                </div>
                {[
                  ["Délivré le", cert.date],
                  ["Valide jusqu'au", cert.valid],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display:"flex", justifyContent:"space-between",
                    fontSize:10, padding:"5px 0",
                    borderBottom:`1px solid ${C.border}`,
                  }}>
                    <span style={{color:C.muted}}>{k}</span>
                    <span style={{fontWeight:700}}>{v}</span>
                  </div>
                ))}
                <div style={{
                  marginTop:12, display:"flex", gap:8,
                }}>
                  <div style={{
                    flex:1, background:`${cert.color}15`,
                    border:`1px solid ${cert.color}40`,
                    borderRadius:8, padding:"7px 0",
                    textAlign:"center", fontSize:10, fontWeight:700,
                    color:cert.color, cursor:"pointer",
                  }}>📥 Télécharger</div>
                  <div style={{
                    flex:1, background:"rgba(255,255,255,.04)",
                    border:`1px solid ${C.border}`,
                    borderRadius:8, padding:"7px 0",
                    textAlign:"center", fontSize:10, fontWeight:700,
                    color:C.text, cursor:"pointer",
                  }}>🔗 Partager</div>
                </div>
              </div>
            ))}

            {/* Demander un certificat */}
            <div style={{
              background:`${C.primary}11`, border:`1px solid ${C.primary}33`,
              borderRadius:12, padding:14, marginTop:8,
            }}>
              <div style={{fontSize:11, fontWeight:800, color:C.primary, marginBottom:4}}>
                Nouveau certificat
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                Demandez un certificat de sécurité SEINBU pour votre entité ou projet
              </div>
              <div style={{
                background:`linear-gradient(135deg,${C.primary},#991B1B)`,
                borderRadius:10, padding:"11px 0",
                textAlign:"center", fontSize:12, fontWeight:800,
                cursor:"pointer", letterSpacing:1,
              }}>FAIRE UNE DEMANDE</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
