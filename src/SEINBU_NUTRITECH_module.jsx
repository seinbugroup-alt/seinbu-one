import { useState } from "react";

// ── Couleurs SEINBU NUTRITECH ─────────────────────────────────────
const C = {
  bg:      "#020A0A",
  card:    "#061212",
  border:  "#0D3333",
  primary: "#0E8A7A",
  light:   "#2DD4BF",
  gold:    "#D4A827",
  purple:  "#A855F7",
  sbc:     "#10B981",
  red:     "#EF4444",
  text:    "#D1F5EF",
  muted:   "#2D6E65",
};

// ── Données mock ──────────────────────────────────────────────────
const MOCK = {
  piGCV:       314159,
  sbcRate:     10,
  distributeurs: 3840,
  targetDist:    10000,
  ca2026:        145,

  produits: [
    // Vestige
    { id:"V1", marque:"Vestige 🪷", nom:"Vestige Noni Premium",      cat:"Immunité",    prix:12500, sbcBonus:125,  emoji:"🍇", stock:true  },
    { id:"V2", marque:"Vestige 🪷", nom:"Assure Protein Chocolate",   cat:"Nutrition",   prix:18000, sbcBonus:180,  emoji:"💪", stock:true  },
    { id:"V3", marque:"Vestige 🪷", nom:"FlexiQule (articulations)",  cat:"Articul.",    prix:14000, sbcBonus:140,  emoji:"🦴", stock:true  },
    { id:"V4", marque:"Vestige 🪷", nom:"Skin Glow Capsules",         cat:"Beauté",      prix:9500,  sbcBonus:95,   emoji:"✨", stock:false },
    // Longrich
    { id:"L1", marque:"Longrich 🇨🇳", nom:"Bamboo Salt Toothpaste",  cat:"Dentaire",    prix:5000,  sbcBonus:50,   emoji:"🦷", stock:true  },
    { id:"L2", marque:"Longrich 🇨🇳", nom:"Activated Carbon Soap",   cat:"Soins",       prix:3500,  sbcBonus:35,   emoji:"🧼", stock:true  },
    // Arvea
    { id:"A1", marque:"Arvea 🇫🇷",   nom:"Complexe Minceur Détox",   cat:"Minceur",     prix:22000, sbcBonus:220,  emoji:"🌿", stock:true  },
    { id:"A2", marque:"Arvea 🇫🇷",   nom:"Boost Immunité Bio",       cat:"Immunité",    prix:17500, sbcBonus:175,  emoji:"🛡️", stock:false },
    // Africa
    { id:"AF1", marque:"AFRICA 🌍",  nom:"Capsules Moringa Premium",  cat:"AFRICA VITAL",prix:8000,  sbcBonus:80,   emoji:"🌱", stock:true  },
    { id:"AF2", marque:"AFRICA 🌍",  nom:"Crème Karité-Aloe",         cat:"AFRICA BEAUTÉ",prix:6500, sbcBonus:65,   emoji:"🌺", stock:true  },
    { id:"AF3", marque:"AFRICA 🌍",  nom:"Tisane Quinquéliba-Hibiscus",cat:"AFRICA DETOX",prix:4000, sbcBonus:40,   emoji:"🍵", stock:true  },
  ],

  distNetwork: [
    { niveau:"Distributeur Local",   abrv:"DL", nb:3200, commission:"10–15%", couleur:"#2DD4BF"  },
    { niveau:"Manager Régional",     abrv:"MR", nb:520,  commission:"15–18%", couleur:"#D4A827"  },
    { niveau:"Directeur de Zone",    abrv:"DZ", nb:110,  commission:"18–21%", couleur:"#A855F7"  },
    { niveau:"Ambassadeur NutriTech",abrv:"AMB",nb:10,   commission:"+Bonus", couleur:"#FB923C"  },
  ],

  africaGammes: [
    { nom:"AFRICA VITAL",   emoji:"💊", produits:["Moringa Premium","Immunité Africain","Multivitamines Tropical"],         couleur:"#2DD4BF" },
    { nom:"AFRICA DETOX",   emoji:"🍵", produits:["Tisane Quinquéliba-Hibiscus","Jus de Baobab","Cure Neem 21 jours"],      couleur:"#4ADE60" },
    { nom:"AFRICA BEAUTÉ",  emoji:"🌺", produits:["Crème Karité-Aloe","Huile Neem capillaire","Sérum Papaye"],              couleur:"#F9A8D4" },
    { nom:"AFRICA DENTAL",  emoji:"🦷", produits:["Poudre dentaire Neem-Charbon","Bain bouche Quinquéliba"],                couleur:"#A78BFA" },
    { nom:"AFRICA PHARMA",  emoji:"⚕️", produits:["Extrait Feuilles Papaye","Gélules Curcuma-Gingembre"],                   couleur:"#FB923C" },
  ],

  projections: [
    { an:"2026", ca:"145 M",    net:"46 M"  },
    { an:"2027", ca:"415 M",    net:"130 M" },
    { an:"2028", ca:"940 M",    net:"296 M" },
    { an:"2029", ca:"1,67 Md",  net:"526 M" },
    { an:"2030", ca:"2,82 Mds", net:"885 M" },
  ],
};

const fmt = (n, d = 0) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d }).format(n);

// Filtre boutique
const MARQUES = ["Tout", "Vestige 🪷", "Longrich 🇨🇳", "Arvea 🇫🇷", "AFRICA 🌍"];

export default function SeinbuNutriTech() {
  const [tab, setTab]       = useState("dashboard");
  const [filtre, setFiltre] = useState("Tout");
  const [panier, setPanier] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiResp, setAiResp]   = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const produitsFiltres = filtre === "Tout"
    ? MOCK.produits
    : MOCK.produits.filter(p => p.marque === filtre);

  const totalPanier = panier.reduce((s, id) => {
    const p = MOCK.produits.find(x => x.id === id);
    return s + (p ? p.prix : 0);
  }, 0);
  const totalSBC = panier.reduce((s, id) => {
    const p = MOCK.produits.find(x => x.id === id);
    return s + (p ? p.sbcBonus : 0);
  }, 0);
  const totalPi = totalPanier / MOCK.piGCV;

  const togglePanier = (id) => {
    setPanier(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const askAI = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResp("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Tu es NutriTech-AI, conseiller santé naturelle de NutriTech Cellulaire (filiale SEINBU GROUP, Côte d'Ivoire). 
Tu conseilles les clients sur les produits NutriTech : gammes Vestige (Ayurveda), Longrich, Arvea Nature, et AFRICA by NutriTech (phytothérapie africaine : Moringa, Neem, Quinquéliba, Hibiscus, Baobab, Karité, Papaye, etc.). 
Réponds toujours en français, de façon chaleureuse, concise (5 lignes max), en recommandant les produits les plus adaptés. Précise toujours que les produits sont payables en Pi Network ou SBC (SEINBU Coin) avec 10% de bonus fidélité en SBC.`,
          messages: [{ role: "user", content: aiInput }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Désolé, je n'ai pas pu répondre.";
      setAiResp(text);
    } catch {
      setAiResp("Connexion temporairement indisponible. Réessaie dans un moment.");
    }
    setAiLoading(false);
  };

  const pctDist = Math.round((MOCK.distributeurs / MOCK.targetDist) * 100);

  const tabs = [
    { id:"dashboard",   label:"Dashboard",  icon:"📊" },
    { id:"boutique",    label:"Boutique",   icon:"🛒" },
    { id:"distributeurs",label:"Réseau",   icon:"🤝" },
    { id:"africa",      label:"AFRICA",     icon:"🌍" },
    { id:"conseil",     label:"Conseil IA", icon:"🤖" },
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
        }}>🌿</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>
            NUTRITECH CELLULAIRE
          </div>
          <div style={{ fontSize: 10, color: C.muted }}>
            Santé & Bien-être · Filiale N°3 · Ayurveda · Africa
          </div>
        </div>
        <div style={{
          marginLeft: "auto",
          background: `${C.sbc}22`,
          border: `1px solid ${C.sbc}`,
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 11,
          color: C.sbc,
        }}>SBC +10%</div>
      </div>

      {/* ── DASHBOARD ──────────────────────────────────────── */}
      {tab === "dashboard" && (
        <div style={{ padding: "20px 16px" }}>

          {/* Carte principale */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}CC, #053D36)`,
            borderRadius: 20, padding: 20, marginBottom: 16,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 140, height: 140, borderRadius: "50%",
              background: "rgba(255,255,255,.04)",
            }} />
            <div style={{ fontSize: 11, opacity: .75, marginBottom: 4 }}>
              RÉSEAU DISTRIBUTEURS
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1 }}>
              {fmt(MOCK.distributeurs)} <span style={{ fontSize: 18 }}>DL</span>
            </div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 2 }}>
              sur {fmt(MOCK.targetDist)} objectif 12 mois
            </div>
            <div style={{
              marginTop: 14, background: "rgba(0,0,0,.3)",
              borderRadius: 10, height: 8,
            }}>
              <div style={{
                width: `${pctDist}%`, height: "100%",
                background: `linear-gradient(90deg, ${C.light}, ${C.gold})`,
                borderRadius: 10,
              }} />
            </div>
            <div style={{ fontSize: 10, opacity: .7, marginTop: 4 }}>
              {pctDist}% · CA estimé 2026 : {MOCK.ca2026} M FCFA
            </div>
          </div>

          {/* 3 Piliers */}
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
            3 PILIERS COMMERCIAUX
          </div>
          {[
            { emoji:"🪷", nom:"Vestige Marketing", origine:"🇮🇳 Inde", desc:"Ayurveda · +3M distributeurs dans 70 pays",   ca:"80 M FCFA",  color:"#FB923C" },
            { emoji:"🌿", nom:"Longrich + Arvea",   origine:"🇨🇳🇫🇷",    desc:"Dentaire · Cosmétique · Bien-être Premium",   ca:"50 M FCFA",  color:"#A855F7" },
            { emoji:"🌍", nom:"AFRICA by NutriTech",origine:"🇨🇮 CI",    desc:"Phytothérapie africaine · Gamme propriétaire", ca:"Lancement",  color:C.light   },
          ].map(p => (
            <div key={p.nom} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 10,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: `${p.color}22`,
                border: `2px solid ${p.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>
                  {p.nom} <span style={{ fontSize: 11 }}>{p.origine}</span>
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{p.desc}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{p.ca}</div>
            </div>
          ))}

          {/* Projections */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, marginTop: 6,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
              PROJECTIONS FINANCIÈRES (FCFA)
            </div>
            {MOCK.projections.map(p => (
              <div key={p.an} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "5px 0",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{p.an}</span>
                <span style={{ fontSize: 11, color: C.light }}>CA {p.ca}</span>
                <span style={{ fontSize: 11, color: C.sbc }}>Net {p.net}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BOUTIQUE ───────────────────────────────────────── */}
      {tab === "boutique" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🛒 Boutique NutriTech
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>
            Paiement en π ou SBC · +10% fidélité en SBC automatique
          </div>

          {/* Filtre marques */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {MARQUES.map(m => (
              <div key={m}
                onClick={() => setFiltre(m)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "5px 12px", borderRadius: 20,
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  background: filtre === m ? C.primary : C.card,
                  border: `1px solid ${filtre === m ? C.light : C.border}`,
                  color: filtre === m ? "#fff" : C.muted,
                  transition: "all .2s",
                }}
              >{m}</div>
            ))}
          </div>

          {/* Produits */}
          {produitsFiltres.map(p => (
            <div key={p.id} style={{
              background: C.card,
              border: `1px solid ${panier.includes(p.id) ? C.primary : C.border}`,
              borderRadius: 12, padding: "12px 14px", marginBottom: 10,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${C.primary}22`,
                border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{p.nom}</div>
                <div style={{ fontSize: 9, color: C.muted }}>{p.marque} · {p.cat}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>
                    {fmt(p.prix)} FCFA
                  </span>
                  <span style={{ fontSize: 9, color: C.sbc, fontWeight: 700 }}>
                    +{p.sbcBonus} SBC fidélité
                  </span>
                </div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                  ≈ {(p.prix / MOCK.piGCV).toFixed(7)} π
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  color: p.stock ? C.light : C.red,
                  background: p.stock ? `${C.light}22` : `${C.red}22`,
                  border: `1px solid ${p.stock ? C.light : C.red}`,
                  borderRadius: 20, padding: "1px 7px",
                }}>
                  {p.stock ? "✓ Dispo" : "⚠️ Rupture"}
                </div>
                <div
                  onClick={() => p.stock && togglePanier(p.id)}
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: panier.includes(p.id) ? C.primary : `${C.primary}22`,
                    border: `1px solid ${C.primary}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, cursor: p.stock ? "pointer" : "default",
                    opacity: p.stock ? 1 : .4,
                  }}
                >
                  {panier.includes(p.id) ? "✓" : "+"}
                </div>
              </div>
            </div>
          ))}

          {/* Panier flottant */}
          {panier.length > 0 && (
            <div style={{
              position: "fixed", bottom: 72, left: 16, right: 16,
              background: `linear-gradient(135deg, ${C.primary}, #0A6E60)`,
              borderRadius: 14, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,.5)",
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>
                  🛒 {panier.length} article{panier.length > 1 ? "s" : ""}
                </div>
                <div style={{ fontSize: 10, opacity: .8 }}>
                  {fmt(totalPanier)} FCFA · {totalPi.toFixed(7)} π
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.sbc }}>
                  +{totalSBC} SBC offerts
                </div>
                <div style={{
                  marginTop: 4, background: "rgba(255,255,255,.2)",
                  borderRadius: 8, padding: "4px 12px",
                  fontSize: 11, fontWeight: 800, cursor: "pointer",
                }}>
                  COMMANDER →
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── RÉSEAU ─────────────────────────────────────────── */}
      {tab === "distributeurs" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🤝 Réseau MLM NutriTech
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            {fmt(MOCK.distributeurs)} distributeurs actifs · Objectif 10 000
          </div>

          {/* Niveaux réseau */}
          {MOCK.distNetwork.map(n => (
            <div key={n.abrv} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 16, marginBottom: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: `${n.couleur}22`,
                    border: `2px solid ${n.couleur}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: n.couleur,
                  }}>{n.abrv}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: n.couleur }}>
                      {n.niveau}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      {fmt(n.nb)} membres actifs
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 900, color: n.couleur,
                }}>
                  {n.commission}
                </div>
              </div>
            </div>
          ))}

          {/* Rémunération SBC */}
          <div style={{
            background: `${C.sbc}11`, border: `1px solid ${C.sbc}44`,
            borderRadius: 14, padding: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.sbc, marginBottom: 10 }}>
              💎 Bonus SBC pour les distributeurs
            </div>
            {[
              { label:"Sur chaque vente personnelle",    val:"10% du prix en SBC" },
              { label:"Sur ventes de son équipe (N-1)", val:"2% en SBC"           },
              { label:"Objectif mensuel atteint",        val:"+500 SBC bonus"      },
              { label:"Parrainage nouveau distributeur", val:"+200 SBC/parrain"    },
            ].map(b => (
              <div key={b.label} style={{
                display: "flex", justifyContent: "space-between",
                padding: "5px 0", borderBottom: `1px solid ${C.border}`,
                fontSize: 11,
              }}>
                <span style={{ color: C.muted }}>{b.label}</span>
                <span style={{ color: C.sbc, fontWeight: 800 }}>{b.val}</span>
              </div>
            ))}
          </div>

          {/* Pi Bonds distributeurs */}
          <div style={{
            background: `${C.purple}11`, border: `1px solid ${C.purple}44`,
            borderRadius: 14, padding: 16,
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.purple, marginBottom: 10 }}>
              π Pi Bonds NutriTech — Financement participatif
            </div>
            {[
              { label:"Pi Bond STARTER",   val:"50 π",   rendement:"8%/an",  couleur:"#2DD4BF" },
              { label:"Pi Bond BUSINESS",  val:"250 π",  rendement:"12%/an", couleur:"#D4A827" },
              { label:"Pi Bond PREMIUM",   val:"1 000 π",rendement:"18%/an", couleur:"#A855F7" },
            ].map(b => (
              <div key={b.label} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "8px 10px",
                background: `${b.couleur}11`,
                border: `1px solid ${b.couleur}33`,
                borderRadius: 8, marginBottom: 6,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: b.couleur }}>{b.label}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>Min. {b.val}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 900, color: b.couleur }}>
                  {b.rendement}
                </div>
              </div>
            ))}
            <div style={{ fontSize: 9, color: C.muted, marginTop: 8 }}>
              Rendements versés en SBC · Investissement en π uniquement
            </div>
          </div>

          {/* CTA rejoindre */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
            borderRadius: 12, padding: "14px 0",
            textAlign: "center", fontSize: 14, fontWeight: 800,
            cursor: "pointer", letterSpacing: 1, marginTop: 16,
            color: "#fff",
          }}>
            + REJOINDRE LE RÉSEAU NUTRITECH
          </div>
        </div>
      )}

      {/* ── AFRICA BY NUTRITECH ────────────────────────────── */}
      {tab === "africa" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🌍 AFRICA by NutriTech
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Phytothérapie africaine · Gamme propriétaire · Souveraineté sanitaire
          </div>

          {/* Vision */}
          <div style={{
            background: `linear-gradient(135deg, #0D2E1A, #122E24)`,
            border: `1px solid ${C.light}33`,
            borderRadius: 16, padding: 16, marginBottom: 16, textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🌿</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.light }}>
              "La santé est un droit. NutriTech en fait une réalité africaine."
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>
              Matières premières cultivées par ANI · R&D validée par SEINBU TECH
            </div>
          </div>

          {/* Gammes */}
          {MOCK.africaGammes.map(g => (
            <div key={g.nom} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 14, marginBottom: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${g.couleur}22`,
                  border: `2px solid ${g.couleur}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>{g.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 13, color: g.couleur }}>
                  {g.nom}
                </div>
              </div>
              {g.produits.map(pr => (
                <div key={pr} style={{
                  display: "flex", gap: 6, alignItems: "center",
                  marginBottom: 4, fontSize: 11, color: C.text,
                }}>
                  <span style={{ color: g.couleur, fontWeight: 800 }}>▸</span>
                  <span>{pr}</span>
                </div>
              ))}
            </div>
          ))}

          {/* Plantes ANI → NutriTech */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14,
          }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 10 }}>
              PLANTES CULTIVÉES PAR ANI POUR NUTRITECH
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Moringa","Neem","Gingembre","Curcuma","Hibiscus","Baobab","Karité","Aloe vera","Quinquéliba","Papaye"].map(pl => (
                <div key={pl} style={{
                  background: `${C.primary}22`,
                  border: `1px solid ${C.primary}44`,
                  borderRadius: 20, padding: "4px 10px",
                  fontSize: 10, color: C.light, fontWeight: 700,
                }}>{pl}</div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 10 }}>
              Synergie ANI × NutriTech · Brevet OAPI + PCT en cours
            </div>
          </div>
        </div>
      )}

      {/* ── CONSEIL IA ─────────────────────────────────────── */}
      {tab === "conseil" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
            🤖 NutriTech-AI
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
            Conseiller santé naturelle · Recommandations personnalisées
          </div>

          {/* Avatar */}
          <div style={{
            background: `linear-gradient(135deg, ${C.primary}22, ${C.bg})`,
            border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 16, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}>🌿</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>NutriTech-AI</div>
              <div style={{ fontSize: 10, color: C.muted }}>
                Ayurveda · Phytothérapie africaine · Bien-être
              </div>
              <div style={{ fontSize: 9, color: C.sbc, marginTop: 2 }}>
                Conseils gratuits · Produits payables π ou SBC
              </div>
            </div>
          </div>

          {/* Réponse IA */}
          {aiResp && (
            <div style={{
              background: `${C.primary}15`,
              border: `1px solid ${C.primary}44`,
              borderRadius: 12, padding: 14, marginBottom: 14,
            }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 6 }}>
                🌿 NUTRITECH-AI
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: C.text }}>
                {aiResp}
              </div>
            </div>
          )}

          {/* Suggestions rapides */}
          {!aiResp && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 8 }}>
                QUESTIONS FRÉQUENTES
              </div>
              {[
                "Quels produits pour renforcer mon immunité ?",
                "Je souffre de douleurs articulaires, que conseilles-tu ?",
                "Produits naturels africains pour la peau et les cheveux ?",
                "Comment réduire ma glycémie naturellement ?",
              ].map(q => (
                <div key={q}
                  onClick={() => setAiInput(q)}
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "9px 12px", marginBottom: 7,
                    fontSize: 11, color: C.text, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                  <span style={{ color: C.light }}>→</span> {q}
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 12,
          }}>
            <textarea
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              placeholder="Décris ton problème de santé ou ce que tu recherches…"
              rows={3}
              style={{
                background: "transparent", border: "none", outline: "none",
                color: C.text, fontSize: 13, width: "100%",
                resize: "none", lineHeight: 1.5,
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
            <div
              onClick={askAI}
              style={{
                marginTop: 8,
                background: aiLoading
                  ? C.muted
                  : `linear-gradient(135deg, ${C.primary}, ${C.light})`,
                borderRadius: 10, padding: "10px 0",
                textAlign: "center", fontSize: 13, fontWeight: 800,
                cursor: aiLoading ? "default" : "pointer",
                color: "#fff", letterSpacing: .5,
              }}
            >
              {aiLoading ? "⏳ Analyse en cours..." : "💬 OBTENIR UN CONSEIL"}
            </div>
          </div>

          {aiResp && (
            <div
              onClick={() => { setAiResp(""); setAiInput(""); }}
              style={{
                marginTop: 10, textAlign: "center",
                fontSize: 11, color: C.muted, cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Nouvelle question
            </div>
          )}
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
