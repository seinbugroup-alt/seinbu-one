import { useT } from "./i18n";
import { useState } from "react";

// ── Couleurs SEINBU ANI ───────────────────────────────────────────
const C = {
  bg:       "#030D04",
  card:     "#071409",
  border:   "#1A3D1E",
  primary:  "#1B8A2A",
  light:    "#4ADE60",
  gold:     "#D4A827",
  earth:    "#8B5E3C",
  blue:     "#38BDF8",
  red:      "#EF4444",
  text:     "#D6EDD8",
  muted:    "#4A7A4E",
};

// ── Données mock ──────────────────────────────────────────────────
const MOCK = {
  planteurs:   2847,
  hectares:    2310,
  targetHa:    3000,
  biourinL:    124500,
  piGCV: 188495400,
  productions: [
    { culture:"Riz Paddy",       emoji:"🍚", ha:820,  rendement:"4,8 t/ha", stock:"3 936 t", ca:"708 M FCFA",  color:"#D4A827" },
    { culture:"Manioc",          emoji:"🌿", ha:790,  rendement:"19,5 t/ha",stock:"15 405 t",ca:"847 M FCFA",  color:"#4ADE60" },
    { culture:"Banane Plantain", emoji:"🍌", ha:700,  rendement:"16 t/ha",  stock:"11 200 t",ca:"1,12 Md FCFA",color:"#FB923C" },
  ],
  planteursList: [
    { id:"PLT-001", nom:"Konan Yao",    culture:"Riz",    ha:2, statut:"actif",   revenus:"420 000 FCFA" },
    { id:"PLT-002", nom:"Diomandé Ali", culture:"Manioc", ha:3, statut:"actif",   revenus:"630 000 FCFA" },
    { id:"PLT-003", nom:"Bamba Fatim",  culture:"Banane", ha:1, statut:"actif",   revenus:"385 000 FCFA" },
    { id:"PLT-004", nom:"Kouassi Jean", culture:"Cacao",  ha:4, statut:"pending", revenus:"En attente"   },
  ],
  biourinStats: [
    { label:"Volume collecté",    value:"124 500 L",  icon:"💧", color:"#38BDF8" },
    { label:"Planteurs servis",   value:"2 847",      icon:"👨‍🌾", color:"#4ADE60" },
    { label:"Économie intrants",  value:"142 M FCFA", icon:"💰", color:"#D4A827" },
    { label:"Ventes externes",    value:"8,1 M FCFA", icon:"📦", color:"#FB923C" },
  ],
  marche: [
    { produit:"Riz ANI — 25kg",        emoji:"🍚", prix:"1 250 FCFA",  piPrice:"6.6e-06 π", stock:"disponible" },
    { produit:"Manioc frais — 10kg",   emoji:"🌿", prix:"400 FCFA",    piPrice:"2.1e-06 π",stock:"disponible" },
    { produit:"Banane Plantain — 5kg", emoji:"🍌", prix:"550 FCFA",    piPrice:"2.9e-06 π",stock:"disponible" },
    { produit:"BioUrin™ — Bidon 20L",  emoji:"♻️", prix:"2 000 FCFA",  piPrice:"1.06e-05 π",stock:"limité"     },
    { produit:"Huile de palme — 5L",   emoji:"🌴", prix:"3 500 FCFA",  piPrice:"1.86e-05 π",stock:"disponible" },
  ],
  projets: [
    { nom:"Pilote Riz",            phase:"Phase 3 — Suivi",      avancement:72, couleur:"#D4A827" },
    { nom:"Pilote Manioc",         phase:"Phase 3 — Suivi",      avancement:65, couleur:"#4ADE60" },
    { nom:"Pilote Banane Plantain",phase:"Phase 2 — Plantation", avancement:48, couleur:"#FB923C" },
    { nom:"Mercy BioUrin™ Pilot",  phase:"Phase 1 — Collecte",   avancement:31, couleur:"#38BDF8" },
    { nom:"Élevage Avicole",       phase:"Phase 0 — Étude",      avancement:10, couleur:"#A78BFA" },
    { nom:"Pisciculture (Kossou)", phase:"Phase 0 — Étude",      avancement:8,  couleur:"#34D399" },
  ],
};

const fmt = (n, d = 0) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d }).format(n);

export default function SeinbuANI({ lang = "fr" }) {
  // eslint-disable-next-line no-unused-vars
  const T = useT("ani", lang);
  const [tab, setTab]           = useState("dashboard");
  const [selectedPlt, setSelectedPlt] = useState(null);

  const pct = Math.round((MOCK.hectares / MOCK.targetHa) * 100);

  const tabs = [
    { id:"dashboard", label:"Dashboard", icon:"📊" },
    { id:"planteurs", label:"Planteurs", icon:"👨‍🌾" },
    { id:"biourin",   label:"BioUrin™",  icon:"♻️"  },
    { id:"marche",    label:"Marché Pi", icon:"🛒"  },
    { id:"projets",   label:"Projets",   icon:"🌱"  },
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
        }}>🌾</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>
            SEINBU ANI
          </div>
          <div style={{ fontSize: 10, color: C.muted }}>
            Agriculture Nouvelle Ivoirienne · Filiale N°2
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
        }}>Phase Pilote</div>
      </div>

      {/* ── DASHBOARD ──────────────────────────────────────── */}
      {tab === "dashboard" && (
        <div style={{ padding: "20px 16px" }}>

          {/* Carte principale */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}CC, #064E10)`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 140, height: 140, borderRadius: "50%",
              background: "rgba(255,255,255,.04)",
            }} />
            <div style={{ fontSize: 11, opacity: .75, marginBottom: 4 }}>
              SUPERFICIE ENGAGÉE
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1 }}>
              {fmt(MOCK.hectares)} <span style={{ fontSize: 18 }}>ha</span>
            </div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>
              sur {fmt(MOCK.targetHa)} ha objectif pilote
            </div>
            {/* Barre de progression */}
            <div style={{
              marginTop: 14,
              background: "rgba(0,0,0,.3)",
              borderRadius: 10, height: 8,
            }}>
              <div style={{
                width: `${pct}%`, height: "100%",
                background: `linear-gradient(90deg, ${C.light}, ${C.gold})`,
                borderRadius: 10,
                transition: "width .6s",
              }} />
            </div>
            <div style={{ fontSize: 10, opacity: .7, marginTop: 4 }}>
              {pct}% de l'objectif atteint · {fmt(MOCK.planteurs)} planteurs actifs
            </div>
          </div>

          {/* 3 cultures */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 8 }}>
              CULTURES PILOTES
            </div>
            {MOCK.productions.map(p => (
              <div key={p.culture} style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${p.color}22`,
                  border: `2px solid ${p.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>{p.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{p.culture}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>
                    {fmt(p.ha)} ha · {p.rendement}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: p.color }}>
                    {p.ca}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted }}>Stock : {p.stock}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats globales */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label:"CA consolidé",   value:"2,67 Mds",  sub:"FCFA · 3 cultures",  icon:"💰", color:C.gold    },
              { label:"BioUrin™ prod.", value:"124 500 L", sub:"Volume collecté",     icon:"♻️", color:C.blue    },
              { label:"Fonds HAVILA",   value:"3%",        sub:"De chaque vente ANI", icon:"❤️", color:"#F472B6" },
              { label:"Pionniers Pi",   value:"200 K+",    sub:"Clients potentiels",  icon:"π",  color:C.primary },
            ].map(s => (
              <div key={s.label} style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "14px 12px",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 9, color: C.muted }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PLANTEURS ──────────────────────────────────────── */}
      {tab === "planteurs" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            👨‍🌾 Réseau Planteurs
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            {fmt(MOCK.planteurs)} partenaires actifs · Modèle gagnant-gagnant
          </div>

          {/* Modèle partage */}
          <div style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 12 }}>
              RÉPARTITION DES REVENUS DE VENTE
            </div>
            {[
              { part:"ANI (intrants + logistique)",  pct:60, color:C.primary  },
              { part:"Planteur (sa production)",     pct:35, color:C.gold     },
              { part:"Fonds HAVILA (solidarité)",    pct:3,  color:"#F472B6"  },
              { part:"R&D semences améliorées",      pct:2,  color:C.blue     },
            ].map(r => (
              <div key={r.part} style={{ marginBottom: 8 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 11, marginBottom: 3,
                }}>
                  <span>{r.part}</span>
                  <span style={{ color: r.color, fontWeight: 800 }}>{r.pct}%</span>
                </div>
                <div style={{
                  background: `${C.border}88`,
                  borderRadius: 6, height: 6,
                }}>
                  <div style={{
                    width: `${r.pct}%`, height: "100%",
                    background: r.color, borderRadius: 6,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Liste planteurs */}
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 8 }}>
            PLANTEURS ENREGISTRÉS
          </div>
          {MOCK.planteursList.map(p => (
            <div key={p.id}
              onClick={() => setSelectedPlt(selectedPlt === p.id ? null : p.id)}
              style={{
                background: selectedPlt === p.id ? `${C.primary}22` : C.card,
                border: `1px solid ${selectedPlt === p.id ? C.primary : C.border}`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 10,
                cursor: "pointer",
                transition: "all .2s",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: `${C.primary}33`,
                  border: `2px solid ${C.primary}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 800, color: C.light,
                }}>
                  {p.nom.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.nom}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>
                    {p.id} · {p.culture} · {p.ha} ha
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: 9, fontWeight: 700,
                    color: p.statut === "actif" ? C.light : C.gold,
                    background: p.statut === "actif" ? `${C.light}22` : `${C.gold}22`,
                    border: `1px solid ${p.statut === "actif" ? C.light : C.gold}`,
                    borderRadius: 20, padding: "2px 8px",
                  }}>
                    {p.statut === "actif" ? "✓ Actif" : "⏳ Pending"}
                  </div>
                </div>
              </div>
              {selectedPlt === p.id && (
                <div style={{
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: `1px solid ${C.border}`,
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
                }}>
                  {[
                    { label:"Revenus estimés", value:p.revenus, color:C.gold  },
                    { label:"Surface",          value:`${p.ha} ha`,     color:C.light },
                    { label:"Culture",          value:p.culture,        color:"#FB923C"},
                    { label:"BioUrin™",         value:"Fourni ANI",     color:C.blue  },
                  ].map(d => (
                    <div key={d.label} style={{
                      background: C.bg, borderRadius: 8, padding: "8px 10px",
                    }}>
                      <div style={{ fontSize: 9, color: C.muted }}>{d.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: d.color, marginTop: 2 }}>
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Bouton rejoindre */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
            borderRadius: 12, padding: "14px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1, marginTop: 8,
            color: "#fff",
          }}>
            + DEVENIR PLANTEUR PARTENAIRE
          </div>
        </div>
      )}

      {/* ── BIOURIN™ ───────────────────────────────────────── */}
      {tab === "biourin" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            ♻️ Mercy BioUrin™
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Engrais organique urinaire · Innovation exclusive ANI
          </div>

          {/* Badge */}
          <div style={{
            background: `linear-gradient(135deg, #0D3B1F, #164E2C)`,
            border: `1px solid ${C.light}44`,
            borderRadius: 16, padding: 18, marginBottom: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.light }}>
              Économie Circulaire
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>
              L'urine humaine contient 80% de l'azote,{"\n"}50% du phosphore et 90% du potassium
            </div>
            <div style={{
              display: "flex", justifyContent: "center", gap: 16, marginTop: 14,
            }}>
              {["N 80%", "P 50%", "K 90%"].map(e => (
                <div key={e} style={{
                  background: `${C.primary}33`,
                  border: `1px solid ${C.primary}`,
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 11, fontWeight: 800, color: C.light,
                }}>{e}</div>
              ))}
            </div>
          </div>

          {/* Stats BioUrin */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {MOCK.biourinStats.map(s => (
              <div key={s.label} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "14px 12px",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Processus */}
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
            PROCESSUS DE PRODUCTION
          </div>
          {[
            { n:1, titre:"Collecte",       desc:"Urinoirs écologiques · marchés, universités, espaces publics", icon:"🚽" },
            { n:2, titre:"Stockage 30j",   desc:"Cuves HDPE scellées · hygiénisation naturelle + capteurs IoT",  icon:"🛢️" },
            { n:3, titre:"Traitement",     desc:"Filtration + pasteurisation + stabilisation pH",                 icon:"⚗️" },
            { n:4, titre:"Enrichissement", desc:"Micro-éléments naturels · compost + déchets élevage",           icon:"🧪" },
            { n:5, titre:"Analyse",        desc:"Contrôle qualité labo : NPK + absence pathogènes",              icon:"🔬" },
            { n:6, titre:"Distribution",   desc:"Gratuit planteurs ANI · 100–150 FCFA/L ventes externes",        icon:"🚛" },
          ].map(e => (
            <div key={e.n} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              marginBottom: 12,
            }}>
              <div style={{
                minWidth: 32, height: 32, borderRadius: "50%",
                background: `${C.primary}33`,
                border: `2px solid ${C.primary}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: C.light,
              }}>{e.n}</div>
              <div style={{
                flex: 1, background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>
                  {e.icon} {e.titre}
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MARCHÉ PI ──────────────────────────────────────── */}
      {tab === "marche" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🛒 Marché Pi ANI
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Produits ANI listés sur Pi Network · 16M+ pionniers
          </div>

          {/* Banner Pi */}
          <div style={{
            background: `linear-gradient(135deg, #7C3AED22, #1B8A2A22)`,
            border: `1px solid #7C3AED44`,
            borderRadius: 12, padding: 14, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontSize: 28 }}>π</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 12 }}>Paiement en Pi uniquement</div>
              <div style={{ fontSize: 10, color: C.muted }}>
                1 π = {fmt(MOCK.piGCV)} FCFA · GCV de référence
              </div>
            </div>
          </div>

          {/* Produits */}
          {MOCK.marche.map(p => (
            <div key={p.produit} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${C.primary}22`,
                border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{p.produit}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                  {p.piPrice}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>
                  {p.prix}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700, marginTop: 3,
                  color: p.stock === "disponible" ? C.light : "#FB923C",
                  background: p.stock === "disponible" ? `${C.light}22` : "#FB923C22",
                  border: `1px solid ${p.stock === "disponible" ? C.light : "#FB923C"}`,
                  borderRadius: 20, padding: "1px 7px", display: "inline-block",
                }}>
                  {p.stock === "disponible" ? "✓ Dispo" : "⚠️ Limité"}
                </div>
              </div>
            </div>
          ))}

          {/* Traçabilité Pi */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginTop: 6,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 8 }}>
              TRAÇABILITÉ BLOCKCHAIN PI
            </div>
            {[
              "Certification d'origine Côte d'Ivoire enregistrée sur Pi",
              "Chaque lot de production horodaté et traçable",
              "Labellisation ANI premium accessible aux acheteurs Pi",
              "Fonds agricoles d'investissement Pi en développement",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "flex-start",
                marginBottom: 6, fontSize: 11, color: C.text,
              }}>
                <span style={{ color: C.light, fontWeight: 800 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PROJETS ────────────────────────────────────────── */}
      {tab === "projets" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🌱 Projets en cours
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Suivi des programmes pilotes ANI
          </div>

          {MOCK.projets.map(p => (
            <div key={p.nom} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 16, marginBottom: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{p.nom}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{p.phase}</div>
                </div>
                <div style={{
                  fontSize: 20, fontWeight: 900, color: p.couleur,
                }}>
                  {p.avancement}%
                </div>
              </div>
              <div style={{
                background: `${C.border}88`,
                borderRadius: 6, height: 8,
              }}>
                <div style={{
                  width: `${p.avancement}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${p.couleur}99, ${p.couleur})`,
                  borderRadius: 6,
                  transition: "width .6s",
                }} />
              </div>
            </div>
          ))}

          {/* Vision 2030 */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}22, #0A2E10)`,
            border: `1px solid ${C.primary}44`,
            borderRadius: 14, padding: 16, marginTop: 4,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.light, marginBottom: 10 }}>
              🎯 Vision ANI 2030
            </div>
            {[
              { label:"Planteurs partenaires",  cible:"10 000+ / culture",  icon:"👨‍🌾" },
              { label:"Superficie totale",       cible:"30 000 ha",          icon:"🗺️"  },
              { label:"Autosuffisance riz CI",   cible:"Contribution 20%",   icon:"🍚"  },
              { label:"BioUrin™ — CA externe",   cible:"25 Mds FCFA / an",   icon:"♻️"  },
              { label:"Export Pi Network",       cible:"5 pays UEMOA",       icon:"π"   },
            ].map(v => (
              <div key={v.label} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: `1px solid ${C.border}`,
                fontSize: 11,
              }}>
                <span>{v.icon} {v.label}</span>
                <span style={{ color: C.gold, fontWeight: 800 }}>{v.cible}</span>
              </div>
            ))}
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
