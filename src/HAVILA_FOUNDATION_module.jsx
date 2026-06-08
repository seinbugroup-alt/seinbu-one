import { useT } from "./i18n";
import { useState } from "react";

// ── Couleurs HAVILA FOUNDATION ────────────────────────────────────
const C = {
  bg:      "#0A0408",
  card:    "#140810",
  border:  "#3D1228",
  primary: "#BE185D",
  light:   "#F472B6",
  gold:    "#D4A827",
  purple:  "#A855F7",
  sbc:     "#10B981",
  blue:    "#38BDF8",
  text:    "#F5D0E0",
  muted:   "#7C3055",
};

// ── Données mock ──────────────────────────────────────────────────
const MOCK = {
  piGCV:       314159,
  sbcRate:     10,

  ressources2026: 70,   // M FCFA
  beneficiaires:  1240,
  donsPi:         "4 850 π",
  walletPi:       "GBXHK…7M4Q",

  repartition: [
    { prog:"HAVILA ROSE",   pct:40, color:C.primary, emoji:"🎗️", budget:"28 M FCFA" },
    { prog:"HAVILA ÉCOLE",  pct:35, color:"#A855F7",  emoji:"📚", budget:"25 M FCFA" },
    { prog:"HAVILA SOCIAL", pct:20, color:"#D4A827",  emoji:"🤝", budget:"14 M FCFA" },
    { prog:"Fonctionnement",pct:5,  color:C.muted,    emoji:"⚙️", budget:"3 M FCFA"  },
  ],

  sources: [
    { label:"5% profits SEINBU GROUP",   val:"15 M",  color:C.primary },
    { label:"Micro-dons Pi Network",     val:"5 M",   color:C.blue    },
    { label:"Institutions internationales",val:"20 M", color:"#34D399" },
    { label:"Mécénat entreprises",       val:"10 M",  color:C.gold    },
    { label:"Contributions fondateur",   val:"10 M",  color:C.light   },
    { label:"Événements caritatifs",     val:"5 M",   color:"#FB923C" },
    { label:"Diaspora & legs",           val:"5 M",   color:"#A78BFA" },
  ],

  roseActions: [
    { action:"Caravanes dépistage",    detail:"20 villes · 2×/an · mammographies mobiles gratuites", emoji:"🏥" },
    { action:"Prise en charge financière", detail:"Traitement partiel/total pour patientes indigentes", emoji:"💊" },
    { action:"Maison HAVILA Rose",     detail:"Hébergement + soutien psychologique patientes", emoji:"🏡" },
    { action:"Vaccination HPV",        detail:"Jeunes filles 9–14 ans · campagne nationale", emoji:"💉" },
    { action:"Ambassadrices",          detail:"Femmes guéries — porte-voix dans leurs communautés", emoji:"🌸" },
    { action:"Recherche thérapeutique",detail:"SEINBU TECH · cancers tropicaux", emoji:"🔬" },
  ],

  ecoleActions: [
    { action:"Bourses scolaires intégrales", detail:"Frais + fournitures + transport + restauration", emoji:"🎓" },
    { action:"50 bibliothèques HAVILA",      detail:"Zones défavorisées — livres SEINBU ÉDITIONS", emoji:"📖" },
    { action:"Tablettes & accès SEINBU ONE", detail:"Numérique gratuit pour tous les boursiers", emoji:"📱" },
    { action:"Bourses universitaires",       detail:"50 bourses / an — bacheliers méritants", emoji:"🏛️" },
    { action:"École des filles",             detail:"Lutte contre mariages précoces et déscolarisation", emoji:"👧" },
    { action:"Génies HAVILA",                detail:"150 places gratuites / an à l'Académie SEINBU", emoji:"⭐" },
  ],

  socialCibles: [
    { cat:"Femmes chefs de famille",    action:"Microfinance + formation + jardins ANI", emoji:"👩‍👧" },
    { cat:"Enfants de la rue",          action:"Centre d'accueil + scolarisation",       emoji:"🧒"  },
    { cat:"Personnes handicapées",      action:"Emploi SEINBU + accessibilité",          emoji:"♿"  },
    { cat:"Personnes âgées isolées",    action:"Aide alimentaire + soins SEINBU MED",    emoji:"👴"  },
    { cat:"Jeunes sans emploi",         action:"Formation métiers SEINBU + insertion",    emoji:"👷"  },
    { cat:"Victimes de catastrophes",   action:"Aide urgence alimentaire + abri",         emoji:"🆘"  },
  ],

  projections: [
    { an:"2026", total:"70 M",     rose:"28 M",  ecole:"25 M"  },
    { an:"2027", total:"175 M",    rose:"70 M",  ecole:"61 M"  },
    { an:"2028", total:"360 M",    rose:"144 M", ecole:"126 M" },
    { an:"2029", total:"615 M",    rose:"246 M", ecole:"215 M" },
    { an:"2030", total:"1,05 Md",  rose:"420 M", ecole:"368 M" },
  ],
};

const fmt = (n, d = 0) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d }).format(n);

export default function HavilaFoundation({ lang = "fr" }) {
  const T = useT("havila", lang);
  const [tab, setTab]         = useState("dashboard");
  const [donAmount, setDonAmount] = useState("");
  const [donMethod, setDonMethod] = useState("pi");

  const donFCFA  = donMethod === "pi"
    ? (parseFloat(donAmount) || 0) * MOCK.piGCV
    : (parseFloat(donAmount) || 0);
  const donPi = donMethod === "pi"
    ? (parseFloat(donAmount) || 0)
    : (parseFloat(donAmount) || 0) / MOCK.piGCV;

  const tabs = [
    { id:"dashboard", label:"Accueil",   icon:"🏠"  },
    { id:"rose",      label:"Rose",      icon:"🎗️"  },
    { id:"ecole",     label:"École",     icon:"📚"  },
    { id:"social",    label:"Social",    icon:"🤝"  },
    { id:"donner",    label:"Donner",    icon:"💝"  },
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
        background: `linear-gradient(135deg, ${C.primary}33, ${C.bg})`,
        borderBottom: `1px solid ${C.border}`,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>🎗️</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>
            HAVILA FOUNDATION
          </div>
          <div style={{ fontSize: 10, color: C.muted }}>
            Fondation d'Utilité Publique · Abidjan, Côte d'Ivoire
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
        }}>2026</div>
      </div>

      {/* ── DASHBOARD ──────────────────────────────────────── */}
      {tab === "dashboard" && (
        <div style={{ padding: "20px 16px" }}>

          {/* Carte mémorial */}
          <div style={{
            background: `linear-gradient(135deg, #3D0B1E, #1A0510)`,
            border: `1px solid ${C.primary}44`,
            borderRadius: 20, padding: 20, marginBottom: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🌹</div>
            <div style={{
              fontSize: 11, fontStyle: "italic",
              color: C.light, lineHeight: 1.7, marginBottom: 12,
            }}>
              «&nbsp;L'or de ce pays est bon.&nbsp;»
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginBottom: 14 }}>
              Genèse 2:12 — En mémoire de Maman
            </div>
            <div style={{
              fontSize: 12, color: C.text, lineHeight: 1.6,
            }}>
              Née de la douleur d'un fils, HAVILA irrigue les vies
              oubliées par la maladie, la pauvreté et l'exclusion.
            </div>
          </div>

          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label:"Ressources 2026",    value:"70 M FCFA",         icon:"💰", color:C.gold    },
              { label:"Bénéficiaires",      value:fmt(MOCK.beneficiaires), icon:"❤️", color:C.light },
              { label:"Dons Pi collectés",  value:MOCK.donsPi,          icon:"π",  color:C.blue   },
              { label:"Wallet Pi public",   value:MOCK.walletPi,        icon:"🔗", color:C.purple  },
            ].map(s => (
              <div key={s.label} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "14px 12px",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Répartition budgétaire */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 12 }}>
              AFFECTATION DES FONDS 2026
            </div>
            {MOCK.repartition.map(r => (
              <div key={r.prog} style={{ marginBottom: 10 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 11, marginBottom: 3,
                }}>
                  <span>{r.emoji} {r.prog}</span>
                  <span style={{ color: r.color, fontWeight: 800 }}>
                    {r.pct}% · {r.budget}
                  </span>
                </div>
                <div style={{ background: `${C.border}88`, borderRadius: 6, height: 6 }}>
                  <div style={{
                    width: `${r.pct}%`, height: "100%",
                    background: r.color, borderRadius: 6,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sources */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
              SOURCES DE FINANCEMENT 2026
            </div>
            {MOCK.sources.map(s => (
              <div key={s.label} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "5px 0",
                borderBottom: `1px solid ${C.border}`, fontSize: 11,
              }}>
                <span style={{ color: C.text }}>{s.label}</span>
                <span style={{ fontWeight: 800, color: s.color }}>{s.val} FCFA</span>
              </div>
            ))}
            <div style={{
              marginTop: 8, fontSize: 9, color: C.muted,
              fontStyle: "italic",
            }}>
              3% de chaque transaction Pi dans l'écosystème SEINBU → HAVILA
            </div>
          </div>
        </div>
      )}

      {/* ── HAVILA ROSE ────────────────────────────────────── */}
      {tab === "rose" && (
        <div style={{ padding: "20px 16px" }}>

          {/* Titre émotionnel */}
          <div style={{
            background: `linear-gradient(135deg, #3D0B1E, #1A0510)`,
            border: `1px solid ${C.primary}44`,
            borderRadius: 16, padding: 16, marginBottom: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🎗️</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.light }}>
              HAVILA ROSE
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>
              Lutte contre les cancers féminins
            </div>
            <div style={{
              marginTop: 10, fontSize: 10, color: C.text,
              fontStyle: "italic", lineHeight: 1.6,
            }}>
              "Qu'aucune famille ivoirienne ne vive seule face au cancer."
            </div>
          </div>

          {/* Stats cancer */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
              RÉALITÉ EN CÔTE D'IVOIRE
            </div>
            {[
              { stat:"+3 000",   desc:"décès / an — cancer du sein",       color:C.primary },
              { stat:"+2 000",   desc:"décès / an — cancer du col",         color:"#FB923C" },
              { stat:"< 20%",    desc:"taux de dépistage précoce",          color:C.gold    },
              { stat:"> 90%",    desc:"survie si détecté tôt",              color:C.sbc     },
              { stat:"< 30%",    desc:"survie si détecté tardivement",      color:C.muted   },
            ].map(s => (
              <div key={s.stat} style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: "5px 0", borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: s.color, minWidth: 60 }}>
                  {s.stat}
                </span>
                <span style={{ fontSize: 11, color: C.text }}>{s.desc}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
            ACTIONS DU PROGRAMME
          </div>
          {MOCK.roseActions.map(a => (
            <div key={a.action} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 8,
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${C.primary}22`, border: `1px solid ${C.primary}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>{a.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{a.action}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.detail}</div>
              </div>
            </div>
          ))}

          {/* Budget ROSE */}
          <div style={{
            background: `${C.primary}11`, border: `1px solid ${C.primary}33`,
            borderRadius: 12, padding: 12, marginTop: 4,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: C.muted }}>Budget HAVILA ROSE 2026</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.primary, marginTop: 4 }}>
              28 millions FCFA
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
              40% des ressources totales · Financé en π + SBC + dons
            </div>
          </div>
        </div>
      )}

      {/* ── HAVILA ÉCOLE ───────────────────────────────────── */}
      {tab === "ecole" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{
            background: `linear-gradient(135deg, #1E0B3D, #100518)`,
            border: `1px solid ${C.purple}44`,
            borderRadius: 16, padding: 16, marginBottom: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>📚</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#C084FC" }}>
              HAVILA ÉCOLE
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 8, lineHeight: 1.6, fontStyle: "italic" }}>
              "Aucun enfant brillant ne sera laissé de côté par manque d'argent."
            </div>
          </div>

          {MOCK.ecoleActions.map(a => (
            <div key={a.action} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 8,
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${C.purple}22`, border: `1px solid ${C.purple}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>{a.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{a.action}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{a.detail}</div>
              </div>
            </div>
          ))}

          {/* Synergie SEINBU ÉDITIONS */}
          <div style={{
            background: `${C.purple}11`, border: `1px solid ${C.purple}33`,
            borderRadius: 12, padding: 14, marginTop: 6,
          }}>
            <div style={{ fontSize: 11, color: "#C084FC", fontWeight: 700, marginBottom: 8 }}>
              SYNERGIE AVEC SEINBU ÉDITIONS
            </div>
            {[
              "Manuels scolaires SEINBU ÉDITIONS fournis gratuitement aux boursiers",
              "Accès SEINBU ONE éducatif pour tous les bénéficiaires HAVILA ÉCOLE",
              "Connexion SEINBU TELECOM gratuite dans toutes les bibliothèques HAVILA",
              "Formation numérique : 20 tablettes dans chaque espace HAVILA Village",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, marginBottom: 5, fontSize: 11,
              }}>
                <span style={{ color: C.purple, fontWeight: 800 }}>✓</span>
                <span style={{ color: C.text }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: `${C.purple}11`, border: `1px solid ${C.purple}33`,
            borderRadius: 12, padding: 12, marginTop: 10,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 11, color: C.muted }}>Budget HAVILA ÉCOLE 2026</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.purple, marginTop: 4 }}>
              25 millions FCFA
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
              35% des ressources totales
            </div>
          </div>
        </div>
      )}

      {/* ── HAVILA SOCIAL ──────────────────────────────────── */}
      {tab === "social" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{
            background: `linear-gradient(135deg, #2D1A00, #140D00)`,
            border: `1px solid ${C.gold}44`,
            borderRadius: 16, padding: 16, marginBottom: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🤝</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>
              HAVILA SOCIAL
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 8, lineHeight: 1.6, fontStyle: "italic" }}>
              "Restaurer la dignité de chaque être humain."
            </div>
          </div>

          {MOCK.socialCibles.map(s => (
            <div key={s.cat} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 8,
              display: "flex", gap: 10, alignItems: "center",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${C.gold}22`, border: `1px solid ${C.gold}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{s.cat}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.action}</div>
              </div>
            </div>
          ))}

          {/* HAVILA Village */}
          <div style={{
            background: `${C.gold}11`, border: `1px solid ${C.gold}33`,
            borderRadius: 12, padding: 14, marginTop: 6,
          }}>
            <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 10 }}>
              🏘️ HAVILA VILLAGE — Cités de l'espoir
            </div>
            {[
              "Centre médical de proximité : soins primaires gratuits + dépistage",
              "École primaire HAVILA : 200 enfants scolarisés gratuitement",
              "Centre de formation professionnelle : couture, maçonnerie, agriculture ANI",
              "Jardin vivrier communautaire : intrants BioUrin™ ANI gratuits",
              "Espace numérique HAVILA : SEINBU TELECOM + 20 tablettes",
              "Foyer maternel : hébergement femmes en détresse",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, marginBottom: 5, fontSize: 11,
              }}>
                <span style={{ color: C.gold, fontWeight: 800 }}>▸</span>
                <span style={{ color: C.text }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DONNER ─────────────────────────────────────────── */}
      {tab === "donner" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            💝 Soutenir HAVILA
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Chaque don est public · Transparent · Blockchain Pi
          </div>

          {/* Wallet Pi public */}
          <div style={{
            background: `${C.blue}11`, border: `1px solid ${C.blue}33`,
            borderRadius: 12, padding: 14, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontSize: 24 }}>🔗</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.blue }}>
                Wallet Pi HAVILA — Public
              </div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>
                {MOCK.walletPi}
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
                Solde vérifiable en temps réel · Blockchain Pi
              </div>
            </div>
          </div>

          {/* Toggle Pi/SBC */}
          <div style={{
            display: "flex", background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12,
            padding: 4, marginBottom: 16,
          }}>
            {[
              { id:"pi",  label:"Donner en π" },
              { id:"sbc", label:"Donner en SBC" },
            ].map(t => (
              <div key={t.id}
                onClick={() => setDonMethod(t.id)}
                style={{
                  flex: 1, textAlign: "center", padding: "8px 0",
                  borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  background: donMethod === t.id ? C.primary : "transparent",
                  color: donMethod === t.id ? "#fff" : C.muted,
                  transition: "all .2s",
                }}
              >{t.label}</div>
            ))}
          </div>

          {/* Montants rapides */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {(donMethod === "pi" ? ["0.1","0.5","1","5"] : ["100","500","1000","5000"]).map(v => (
              <div key={v}
                onClick={() => setDonAmount(v)}
                style={{
                  flex: 1, textAlign: "center",
                  background: donAmount === v ? C.primary : C.card,
                  border: `1px solid ${donAmount === v ? C.primary : C.border}`,
                  borderRadius: 8, padding: "7px 4px",
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  color: donAmount === v ? "#fff" : C.muted,
                }}
              >{v} {donMethod === "pi" ? "π" : "SBC"}</div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginBottom: 12,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
              MONTANT ({donMethod === "pi" ? "π Pi" : "SBC"})
            </div>
            <input
              type="number"
              value={donAmount}
              onChange={e => setDonAmount(e.target.value)}
              placeholder="0.00"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: C.text, fontSize: 28, fontWeight: 800,
                width: "100%", letterSpacing: -1,
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
            {donAmount && (
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
                ≈ {fmt(donFCFA)} FCFA · {donMethod === "pi" ? `${donPi} π` : `${fmt(donFCFA / MOCK.piGCV, 8)} π`}
              </div>
            )}
          </div>

          {/* Affecter */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 12, marginBottom: 16,
          }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 8 }}>
              AFFECTER MON DON À
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label:"🎗️ ROSE",  color:C.primary },
                { label:"📚 ÉCOLE", color:C.purple  },
                { label:"🤝 SOCIAL",color:C.gold    },
                { label:"💫 Libre", color:C.muted   },
              ].map(a => (
                <div key={a.label} style={{
                  flex: 1, textAlign: "center",
                  background: `${a.color}22`,
                  border: `1px solid ${a.color}44`,
                  borderRadius: 8, padding: "6px 4px",
                  fontSize: 10, fontWeight: 700, cursor: "pointer",
                  color: a.color,
                }}>{a.label}</div>
              ))}
            </div>
          </div>

          {/* CTA Don */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}, #881337)`,
            borderRadius: 12, padding: "14px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1, color: "#fff",
          }}>
            🎗️ ENVOYER MON DON
          </div>

          {/* Round-up */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginTop: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Round-up Pi automatique</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                  Arrondir chaque transaction Pi → HAVILA
                </div>
              </div>
              <div style={{
                width: 44, height: 24, borderRadius: 12,
                background: `${C.primary}44`,
                border: `1px solid ${C.primary}`,
                display: "flex", alignItems: "center",
                padding: "2px 4px",
                cursor: "pointer",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: C.primary,
                  marginLeft: "auto",
                }} />
              </div>
            </div>
          </div>

          {/* NFT caritatif */}
          <div style={{
            background: `${C.purple}11`, border: `1px solid ${C.purple}33`,
            borderRadius: 12, padding: 12, marginTop: 10,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontSize: 28 }}>🏅</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.purple }}>
                NFT Caritatif HAVILA
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>
                Certificat blockchain pour chaque don · Preuve de soutien permanente
              </div>
            </div>
          </div>
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
              borderTop: tab === t.id ? `2px solid ${C.primary}` : "2px solid transparent",
            }}>
            <div style={{ fontSize: 16 }}>{t.icon}</div>
            <div style={{
              fontSize: 8, marginTop: 2,
              color: tab === t.id ? C.light : C.muted,
              fontWeight: tab === t.id ? 700 : 400,
            }}>{t.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
