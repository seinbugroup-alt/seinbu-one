import { useT } from "./i18n";
import { useState } from "react";

const C = {
  bg:      "#0D0800",
  card:    "#1A1000",
  border:  "#3D2200",
  primary: "#B45309",
  light:   "#F59E0B",
  gold:    "#D4A827",
  green:   "#10B981",
  text:    "#F5EDD0",
  muted:   "#78400A",
  sub:     "#92450A",
};

const TABS = [
  { id:"librairie", label:"Librairie",  icon:"📚" },
  { id:"ebooks",    label:"E-Books",    icon:"📱" },
  { id:"edtech",    label:"EdTech",     icon:"🎓" },
  { id:"commandes", label:"Commandes",  icon:"📦" },
];

const BOOKS = [
  {
    id:"b1",
    title:"Pi Network, les banques et la régulation",
    author:"KAALLEYD",
    tag:"Finance · Pi Network",
    pages:180,
    lang:"FR/EN",
    priceFCFA:15000,
    pricePi:"0.00008",
    cover:"📘",
    desc:"Analyse des impacts de Pi Network sur le système bancaire africain et les cadres réglementaires UEMOA/BCEAO.",
    bestseller:true,
  },
  {
    id:"b2",
    title:"40 Jours pour briser les chaînes",
    author:"KAALLEYD",
    tag:"Développement personnel · PQCES",
    pages:120,
    lang:"FR/EN",
    priceFCFA:10000,
    pricePi:"0.00005",
    cover:"⛓️",
    desc:"Programme de transformation personnelle en 40 jours. Méthode PQCES — Prier, Questionner, Créer, Exécuter, Scaler.",
    bestseller:false,
  },
  {
    id:"b3",
    title:"Le Roc et la Source",
    author:"KAALLEYD",
    tag:"Gouvernance · Afrique",
    pages:210,
    lang:"FR",
    priceFCFA:18000,
    pricePi:"0.00010",
    cover:"🪨",
    desc:"Manifeste de gouvernance africaine souveraine. Vision d'une Afrique indépendante construite sur ses propres fondations.",
    bestseller:false,
  },
  {
    id:"b4",
    title:"SEINBU COIN (SBC) — Whitepaper v1.1",
    author:"SEINBU GROUP SA",
    tag:"Blockchain · Tokenomics",
    pages:64,
    lang:"FR/EN",
    priceFCFA:0,
    pricePi:"0",
    cover:"📄",
    desc:"Whitepaper officiel du token SBC. Architecture, tokenomics, utilités et feuille de route du SEINBU COIN.",
    free:true,
  },
];

const COURSES = [
  { icon:"π",  title:"Pi Network & Finance Africaine",   level:"Débutant", duration:"4h", students:"1 240", price:"Gratuit", color:"#D4A827" },
  { icon:"🔗", title:"Blockchain pour Entrepreneurs CI",  level:"Intermédiaire", duration:"6h", students:"830",  price:"5 000 FCFA", color:"#7C3AED" },
  { icon:"📊", title:"Tokenomics & SBC Coin",             level:"Avancé",   duration:"3h", students:"420",  price:"8 000 FCFA", color:"#B45309" },
  { icon:"✍️", title:"Écriture & Publication en Afrique", level:"Débutant", duration:"5h", students:"560",  price:"6 000 FCFA", color:"#0891B2" },
  { icon:"🌍", title:"Gouvernance Africaine Moderne",     level:"Intermédiaire", duration:"8h", students:"290",  price:"10 000 FCFA", color:"#10B981" },
];

const ORDERS = [
  { id:"ED-2026-0041", title:"Pi Network, les banques...", date:"02/06/2026", status:"livré",   color:"#10B981", format:"E-Book + Physique" },
  { id:"ED-2026-0028", title:"40 Jours pour briser...",   date:"18/05/2026", status:"en cours", color:"#F97316", format:"E-Book" },
];

export default function SeinbuEditions({ lang = "fr" }) {
  // eslint-disable-next-line no-unused-vars
  const T = useT("editions", lang);
  const [tab, setTab]       = useState("librairie");
  const [selected, setSel]  = useState(null);
  const [filter, setFilter] = useState("tous");

  const fmt = n => new Intl.NumberFormat("fr-FR").format(n);

  if (selected) {
    const b = BOOKS.find(x => x.id === selected);
    return (
      <div style={{background:C.bg, minHeight:"100vh", color:C.text,
        fontFamily:"'Segoe UI',sans-serif", padding:"0 0 40px"}}>
        {/* Back header */}
        <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.bg})`,
          borderBottom:`1px solid ${C.border}`, padding:"14px 16px",
          display:"flex", alignItems:"center", gap:12}}>
          <div onClick={() => setSel(null)} style={{
            width:32, height:32, borderRadius:8, background:C.card,
            border:`1px solid ${C.border}`, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:14, cursor:"pointer"}}>←</div>
          <div style={{fontSize:13, fontWeight:800}}>Détail livre</div>
        </div>
        <div style={{padding:"20px 16px"}}>
          {/* Cover */}
          <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.card})`,
            border:`1px solid ${C.border}`, borderRadius:16,
            padding:24, textAlign:"center", marginBottom:20}}>
            <div style={{fontSize:64, marginBottom:12}}>{b.cover}</div>
            <div style={{fontSize:18, fontWeight:900, marginBottom:4}}>{b.title}</div>
            <div style={{fontSize:12, color:C.muted, marginBottom:12}}>
              {b.author} · {b.pages} pages · {b.lang}
            </div>
            <span style={{background:`${C.primary}22`, color:C.light,
              border:`1px solid ${C.primary}44`, borderRadius:20,
              padding:"3px 12px", fontSize:10, fontWeight:700}}>{b.tag}</span>
          </div>
          {/* Description */}
          <div style={{background:C.card, border:`1px solid ${C.border}`,
            borderRadius:12, padding:14, marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:8}}>À propos</div>
            <div style={{fontSize:12, color:C.text, lineHeight:1.6}}>{b.desc}</div>
          </div>
          {/* Prix */}
          {!b.free ? (
            <div style={{display:"flex", gap:10, marginBottom:16}}>
              <div style={{flex:1, background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:14, textAlign:"center"}}>
                <div style={{fontSize:9, color:C.muted, marginBottom:4}}>PRIX FCFA</div>
                <div style={{fontSize:20, fontWeight:900, color:C.light}}>{fmt(b.priceFCFA)}</div>
                <div style={{fontSize:8, color:C.muted}}>FCFA</div>
              </div>
              <div style={{flex:1, background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:14, textAlign:"center"}}>
                <div style={{fontSize:9, color:C.muted, marginBottom:4}}>PRIX PI</div>
                <div style={{fontSize:20, fontWeight:900, color:C.gold}}>{b.pricePi}</div>
                <div style={{fontSize:8, color:C.muted}}>π (GCV)</div>
              </div>
            </div>
          ) : (
            <div style={{background:"rgba(16,185,129,.15)", border:"1px solid rgba(16,185,129,.3)",
              borderRadius:12, padding:14, textAlign:"center", marginBottom:16}}>
              <div style={{fontSize:16, fontWeight:900, color:"#5DD490"}}>GRATUIT</div>
              <div style={{fontSize:10, color:"#5DD490", opacity:.7}}>Téléchargement libre</div>
            </div>
          )}
          {/* Boutons */}
          <div style={{display:"flex", gap:10}}>
            <div style={{flex:1, background:`linear-gradient(135deg,${C.primary},#92400E)`,
              borderRadius:12, padding:"13px 0", textAlign:"center",
              fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:1}}>
              {b.free ? "📥 TÉLÉCHARGER" : "🛒 ACHETER"}
            </div>
            <div style={{background:C.card, border:`1px solid ${C.border}`,
              borderRadius:12, padding:"13px 16px", fontSize:20, cursor:"pointer"}}>❤️</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:C.bg, minHeight:"100vh", color:C.text,
      fontFamily:"'Segoe UI',sans-serif", paddingBottom:80}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.bg})`,
        borderBottom:`1px solid ${C.border}`,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:40, height:40, borderRadius:10,
          background:`linear-gradient(135deg,${C.primary},#92400E)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>📚</div>
        <div>
          <div style={{fontWeight:800, fontSize:16, letterSpacing:1}}>SEINBU ÉDITIONS</div>
          <div style={{fontSize:10, color:C.muted}}>
            Édition · Culture africaine · EdTech · KAALLEYD
          </div>
        </div>
        <div style={{marginLeft:"auto", background:`${C.primary}22`,
          border:`1px solid ${C.primary}44`, borderRadius:20,
          padding:"4px 12px", fontSize:11, color:C.light}}>GCV π</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex", background:C.card,
        borderBottom:`1px solid ${C.border}`, padding:"0 4px"}}>
        {TABS.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:"11px 4px", textAlign:"center",
            fontSize:9, fontWeight:800, cursor:"pointer",
            borderBottom: tab===t.id ? `2px solid ${C.primary}` : "2px solid transparent",
            color: tab===t.id ? C.light : C.muted, transition:"all .15s"}}>
            <div style={{fontSize:16, marginBottom:2}}>{t.icon}</div>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{padding:"16px 16px"}}>

        {/* ── Librairie ───────────────────────────── */}
        {tab === "librairie" && (
          <div>
            {/* Filtre */}
            <div style={{display:"flex", gap:8, marginBottom:16, overflowX:"auto"}}>
              {["tous","finance","personnel","gouvernance","gratuit"].map(f => (
                <div key={f} onClick={() => setFilter(f)} style={{
                  background: filter===f ? C.primary : C.card,
                  border:`1px solid ${filter===f ? C.primary : C.border}`,
                  borderRadius:20, padding:"5px 14px", fontSize:10,
                  fontWeight:700, cursor:"pointer", whiteSpace:"nowrap",
                  color: filter===f ? "#0D0800" : C.muted, flexShrink:0,
                }}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>
              ))}
            </div>

            {/* Livres */}
            {BOOKS.map(b => (
              <div key={b.id} onClick={() => setSel(b.id)} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:14, marginBottom:12,
                display:"flex", gap:14, cursor:"pointer",
                position:"relative",
              }}>
                {b.bestseller && (
                  <div style={{position:"absolute", top:10, right:10,
                    background:`${C.gold}22`, color:C.gold,
                    fontSize:8, fontWeight:900, padding:"2px 8px", borderRadius:10}}>
                    ⭐ BEST-SELLER
                  </div>
                )}
                <div style={{width:56, height:72, borderRadius:8,
                  background:`linear-gradient(135deg,${C.primary}44,${C.card})`,
                  border:`1px solid ${C.primary}44`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:28, flexShrink:0}}>{b.cover}</div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontSize:12, fontWeight:800, marginBottom:3,
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                    {b.title}
                  </div>
                  <div style={{fontSize:10, color:C.muted, marginBottom:6}}>
                    {b.author} · {b.pages}p · {b.lang}
                  </div>
                  <div style={{fontSize:9, color:C.text, opacity:.7, marginBottom:8,
                    display:"-webkit-box", WebkitLineClamp:2,
                    WebkitBoxOrient:"vertical", overflow:"hidden"}}>
                    {b.desc}
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{fontSize:12, fontWeight:900,
                      color: b.free ? "#5DD490" : C.light}}>
                      {b.free ? "Gratuit" : `${fmt(b.priceFCFA)} FCFA`}
                    </div>
                    {!b.free && (
                      <div style={{fontSize:9, color:C.gold}}>{b.pricePi} π</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── E-Books ────────────────────────────── */}
        {tab === "ebooks" && (
          <div>
            <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.card})`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:20, marginBottom:16, textAlign:"center"}}>
              <div style={{fontSize:36, marginBottom:8}}>📱</div>
              <div style={{fontSize:16, fontWeight:900, marginBottom:4}}>
                Bibliothèque numérique SEINBU
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                Lecture hors-ligne · Formats PDF & EPUB · Synchronisation Pi
              </div>
              <div style={{display:"flex", justifyContent:"center", gap:16}}>
                {[["4", "Titres disponibles"],["1 240","Lecteurs actifs"],["GCV","Tarification Pi"]].map(([v,l]) => (
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:16, fontWeight:900, color:C.light}}>{v}</div>
                    <div style={{fontSize:8, color:C.muted}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mes livres */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
              📖 MES LIVRES ACHETÉS
            </div>
            {BOOKS.slice(0,2).map(b => (
              <div key={b.id} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8,
                display:"flex", alignItems:"center", gap:12}}>
                <span style={{fontSize:24}}>{b.cover}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:11, fontWeight:700}}>{b.title}</div>
                  <div style={{fontSize:9, color:C.muted}}>{b.author}</div>
                </div>
                <div style={{background:`${C.primary}22`, color:C.light,
                  border:`1px solid ${C.primary}44`, borderRadius:8,
                  padding:"6px 12px", fontSize:10, fontWeight:700, cursor:"pointer"}}>
                  Lire
                </div>
              </div>
            ))}

            {/* Formats */}
            <div style={{background:C.card, border:`1px solid ${C.border}`,
              borderRadius:12, padding:14, marginTop:16}}>
              <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:10}}>
                Formats disponibles
              </div>
              {[["PDF","Lecture bureau, impression"],["EPUB","Liseuse, mobile adaptatif"],["Audio","Bientôt · Version audio KAALLEYD"]].map(([f,d]) => (
                <div key={f} style={{display:"flex", justifyContent:"space-between",
                  padding:"7px 0", borderBottom:`1px solid ${C.border}`, fontSize:11}}>
                  <span style={{fontWeight:700, color:C.light}}>{f}</span>
                  <span style={{color:C.muted, fontSize:10}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EdTech ─────────────────────────────── */}
        {tab === "edtech" && (
          <div>
            <div style={{fontSize:11, color:C.muted, marginBottom:16}}>
              Formations en ligne · Certifiées SEINBU ÉDITIONS · Paiement Pi
            </div>
            {COURSES.map((c, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${c.color}`,
                borderRadius:14, padding:14, marginBottom:10}}>
                <div style={{display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:8}}>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <div style={{width:36, height:36, borderRadius:10,
                      background:`${c.color}22`, border:`1px solid ${c.color}44`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:18}}>{c.icon}</div>
                    <div>
                      <div style={{fontSize:12, fontWeight:800}}>{c.title}</div>
                      <div style={{fontSize:9, color:C.muted}}>
                        {c.level} · {c.duration} · {c.students} étudiants
                      </div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13, fontWeight:900,
                      color: c.price==="Gratuit" ? "#5DD490" : C.light}}>
                      {c.price}
                    </div>
                  </div>
                </div>
                <div style={{
                  background:`${c.color}15`, border:`1px solid ${c.color}33`,
                  borderRadius:8, padding:"7px 12px",
                  textAlign:"center", fontSize:10, fontWeight:800,
                  color:c.color, cursor:"pointer"}}>
                  {c.price==="Gratuit" ? "S'inscrire gratuitement" : "S'inscrire"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Commandes ──────────────────────────── */}
        {tab === "commandes" && (
          <div>
            <div style={{fontSize:11, color:C.muted, marginBottom:16}}>
              Historique de vos commandes SEINBU ÉDITIONS
            </div>
            {ORDERS.map(o => (
              <div key={o.id} style={{background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${o.color}`,
                borderRadius:12, padding:"12px 14px", marginBottom:10}}>
                <div style={{display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:8}}>
                  <div>
                    <div style={{fontSize:12, fontWeight:800}}>{o.title}</div>
                    <div style={{fontFamily:"monospace", fontSize:9,
                      color:C.muted, marginTop:2}}>{o.id}</div>
                  </div>
                  <span style={{background:`${o.color}22`, color:o.color,
                    border:`1px solid ${o.color}44`, borderRadius:20,
                    padding:"2px 10px", fontSize:9, fontWeight:800}}>
                    {o.status === "livré" ? "✓ Livré" : "⏳ En cours"}
                  </span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between",
                  fontSize:10, padding:"5px 0", borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.muted}}>Date</span>
                  <span style={{fontWeight:700}}>{o.date}</span>
                </div>
                <div style={{display:"flex", justifyContent:"space-between",
                  fontSize:10, padding:"5px 0"}}>
                  <span style={{color:C.muted}}>Format</span>
                  <span style={{fontWeight:700}}>{o.format}</span>
                </div>
              </div>
            ))}

            {/* Passer commande */}
            <div style={{background:`${C.primary}11`, border:`1px solid ${C.primary}33`,
              borderRadius:12, padding:14, marginTop:8}}>
              <div style={{fontSize:11, fontWeight:800, color:C.primary, marginBottom:4}}>
                Commander un livre physique
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                Livraison via SEINBU EXPRESS · Paiement Pi au GCV ou FCFA
              </div>
              <div onClick={() => setTab("librairie")} style={{
                background:`linear-gradient(135deg,${C.primary},#92400E)`,
                borderRadius:10, padding:"11px 0",
                textAlign:"center", fontSize:12, fontWeight:800,
                cursor:"pointer", letterSpacing:1}}>
                PARCOURIR LA LIBRAIRIE
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
