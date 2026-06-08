import { useState } from "react";

const C = {
  bg:      "#00020F",
  card:    "#000520",
  border:  "#0A1550",
  primary: "#1D4ED8",
  light:   "#60A5FA",
  gold:    "#D4A827",
  green:   "#10B981",
  text:    "#D0DEFF",
  muted:   "#1E3A8A",
  sub:     "#1E40AF",
};

const TABS = [
  { id:"rd",        label:"R&D",       icon:"🔬" },
  { id:"ia",        label:"IA & Data",  icon:"🤖" },
  { id:"smarthome", label:"Smart Home", icon:"🏠" },
  { id:"incubateur",label:"Incubateur", icon:"🚀" },
  { id:"solutions", label:"Solutions",  icon:"💡" },
];

const PROJECTS = [
  {
    id:"p1", icon:"🌾", color:"#10B981",
    title:"AGRI-IA SEINBU",
    tag:"Intelligence Artificielle · Agriculture",
    status:"En développement",
    progress:65,
    desc:"Système IA de prédiction des rendements agricoles pour les cultures de riz bio dans l'ouest ivoirien. Intégration IoT capteurs sol et drones.",
    team:4, budget:"45M FCFA",
  },
  {
    id:"p2", icon:"⚡", color:"#F59E0B",
    title:"SOLAR-PI GRID",
    tag:"Énergie · IoT · Blockchain",
    status:"Prototype",
    progress:40,
    desc:"Réseau de microgrids solaires tokenisés sur Pi Network. Chaque kWh produit génère des SBC pour les communautés rurales CI.",
    team:3, budget:"120M FCFA",
  },
  {
    id:"p3", icon:"🏙️", color:"#7C3AED",
    title:"PIONEER CITY OS",
    tag:"Smart City · SEINBU IMMOBILIER",
    status:"Conception",
    progress:20,
    desc:"Système d'exploitation de la ville intelligente Pioneer City. Gestion Pi des accès, paiements, énergie et sécurité des 100 villas.",
    team:6, budget:"200M FCFA",
  },
  {
    id:"p4", icon:"📡", color:"#0891B2",
    title:"5G SEINBU BACKBONE",
    tag:"Télécoms · Infrastructure",
    status:"Planification",
    progress:10,
    desc:"Infrastructure 5G privée SEINBU TELECOM pour les 14 villes cibles CI. Backbone fibre optique Abidjan-San Pedro-Bouaké.",
    team:5, budget:"500M FCFA",
  },
];

const AI_SERVICES = [
  { icon:"🌾", label:"AGRI-IA",        desc:"Prédiction rendements, maladies cultures",   status:"Beta",        color:"#10B981" },
  { icon:"🔐", label:"SECURITY-AI",    desc:"Détection anomalies, intrusions réseau",     status:"Actif",       color:"#DC2626" },
  { icon:"📊", label:"FINANCE-AI",     desc:"Analyse Pi market, prédictions SBC",         status:"Développement",color:"#F59E0B" },
  { icon:"🚚", label:"LOGISTICS-AI",   desc:"Optimisation routes SEINBU EXPRESS",         status:"Bêta",        color:"#7C3AED" },
  { icon:"💬", label:"NutriCell-AI",   desc:"Assistant santé & bien-être NUTRITECH",      status:"Actif",       color:"#059669" },
];

const STARTUPS = [
  { name:"AgroTech CI",     sector:"AgriTech",    stage:"Seed",     funding:"5M FCFA",  pi:"0.00027", flag:"🌱" },
  { name:"PayPi Africa",    sector:"FinTech",     stage:"Series A", funding:"50M FCFA", pi:"0.00265", flag:"💳" },
  { name:"EduPi",           sector:"EdTech",      stage:"Seed",     funding:"8M FCFA",  pi:"0.00042", flag:"📚" },
  { name:"HealthPi CI",     sector:"HealthTech",  stage:"Idée",     funding:"2M FCFA",  pi:"0.00011", flag:"🏥" },
];

const SOLUTIONS = [
  { icon:"🖥️", title:"SEINBU ERP",          desc:"Système de gestion intégré pour PME africaines. Pi-native, multidevises UEMOA.", price:"150 000 FCFA/an" },
  { icon:"📱", title:"Pi App Development",   desc:"Développement d'applications Pi Network clé en main pour entreprises.", price:"Sur devis" },
  { icon:"☁️", title:"Cloud Pi Hébergement", desc:"Hébergement sécurisé avec paiement Pi. Certifié SEINBU SECURITY.", price:"25 000 FCFA/mois" },
  { icon:"🔗", title:"Blockchain Consulting", desc:"Intégration blockchain Pi Network dans vos processus métier.", price:"Sur devis" },
];


const ROOMS = [
  { id:"salon",    label:"Salon",       icon:"🛋️",  devices:4, active:3 },
  { id:"chambre",  label:"Chambre",     icon:"🛏️",  devices:3, active:1 },
  { id:"cuisine",  label:"Cuisine",     icon:"🍳",  devices:5, active:2 },
  { id:"bureau",   label:"Bureau",      icon:"💼",  devices:6, active:5 },
  { id:"securite", label:"Sécurité",    icon:"🔐",  devices:8, active:8 },
  { id:"jardin",   label:"Jardin",      icon:"🌿",  devices:3, active:1 },
];

const DEVICES = [
  { room:"salon",    icon:"💡", label:"Éclairage principal",  type:"light",  on:true,  value:80 },
  { room:"salon",    icon:"❄️", label:"Climatisation",        type:"ac",     on:true,  value:23 },
  { room:"salon",    icon:"📺", label:"Smart TV",             type:"media",  on:true,  value:null },
  { room:"salon",    icon:"🔌", label:"Prise intelligente",   type:"plug",   on:false, value:null },
  { room:"bureau",   icon:"💡", label:"Lumière bureau",       type:"light",  on:true,  value:60 },
  { room:"bureau",   icon:"❄️", label:"Clim bureau",          type:"ac",     on:true,  value:22 },
  { room:"securite", icon:"📷", label:"Caméra entrée",        type:"camera", on:true,  value:null },
  { room:"securite", icon:"🚪", label:"Serrure connectée",    type:"lock",   on:true,  value:null },
];

const ENERGY = [
  { label:"Lun", solar:12, consumed:8  },
  { label:"Mar", solar:15, consumed:11 },
  { label:"Mer", solar:10, consumed:9  },
  { label:"Jeu", solar:18, consumed:12 },
  { label:"Ven", solar:14, consumed:10 },
  { label:"Sam", solar:20, consumed:7  },
  { label:"Dim", solar:16, consumed:6  },
];

export default function SeinbuTech() {
  const [tab, setTab]       = useState("rd");
  const [selected, setSel]  = useState(null);

  const fmt = n => new Intl.NumberFormat("fr-FR").format(n);

  if (selected) {
    const p = PROJECTS.find(x => x.id === selected);
    return (
      <div style={{background:C.bg, minHeight:"100vh", color:C.text,
        fontFamily:"'Segoe UI',sans-serif", paddingBottom:40}}>
        <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.bg})`,
          borderBottom:`1px solid ${C.border}`, padding:"14px 16px",
          display:"flex", alignItems:"center", gap:12}}>
          <div onClick={() => setSel(null)} style={{
            width:32, height:32, borderRadius:8, background:C.card,
            border:`1px solid ${C.border}`, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:14, cursor:"pointer"}}>←</div>
          <div style={{fontSize:13, fontWeight:800}}>Projet R&D</div>
        </div>
        <div style={{padding:"20px 16px"}}>
          {/* Hero */}
          <div style={{background:`linear-gradient(135deg,${p.color}22,${C.card})`,
            border:`1px solid ${p.color}44`, borderRadius:16,
            padding:20, textAlign:"center", marginBottom:20}}>
            <div style={{fontSize:52, marginBottom:10}}>{p.icon}</div>
            <div style={{fontSize:18, fontWeight:900, marginBottom:6}}>{p.title}</div>
            <span style={{background:`${p.color}22`, color:p.color,
              border:`1px solid ${p.color}44`, borderRadius:20,
              padding:"3px 12px", fontSize:9, fontWeight:700}}>{p.tag}</span>
          </div>
          {/* Progression */}
          <div style={{background:C.card, border:`1px solid ${C.border}`,
            borderRadius:12, padding:16, marginBottom:14}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
              <span style={{fontSize:11, fontWeight:700}}>Progression</span>
              <span style={{fontSize:11, fontWeight:900, color:p.color}}>{p.progress}%</span>
            </div>
            <div style={{background:C.border, borderRadius:10, height:8, overflow:"hidden"}}>
              <div style={{width:`${p.progress}%`, height:"100%",
                background:`linear-gradient(90deg,${p.color},${p.color}88)`,
                borderRadius:10, transition:"width 1s"}}/>
            </div>
            <div style={{marginTop:10, display:"flex", justifyContent:"space-between"}}>
              {[["Statut",p.status],["Équipe",`${p.team} ingénieurs`],["Budget",p.budget]].map(([k,v]) => (
                <div key={k} style={{textAlign:"center"}}>
                  <div style={{fontSize:11, fontWeight:800, color:p.color}}>{v}</div>
                  <div style={{fontSize:8, color:C.muted}}>{k}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Description */}
          <div style={{background:C.card, border:`1px solid ${C.border}`,
            borderRadius:12, padding:14, marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:8}}>
              Description
            </div>
            <div style={{fontSize:12, lineHeight:1.6}}>{p.desc}</div>
          </div>
          <div style={{background:`linear-gradient(135deg,${C.primary},#1E3A8A)`,
            borderRadius:12, padding:"13px 0", textAlign:"center",
            fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:1}}>
            REJOINDRE CE PROJET
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
          background:`linear-gradient(135deg,${C.primary},#1E3A8A)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>⚙️</div>
        <div>
          <div style={{fontWeight:800, fontSize:16, letterSpacing:1}}>SEINBU TECH</div>
          <div style={{fontSize:10, color:C.muted}}>
            R&D · Intelligence Artificielle · Incubateur · Solutions
          </div>
        </div>
        <div style={{marginLeft:"auto", background:`${C.primary}22`,
          border:`1px solid ${C.primary}44`, borderRadius:20,
          padding:"4px 12px", fontSize:11, color:C.light}}>2026</div>
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

        {/* ── R&D ──────────────────────────────── */}
        {tab === "rd" && (
          <div>
            <div style={{fontSize:11, color:C.muted, marginBottom:16}}>
              Projets de recherche & développement actifs — SEINBU TECH CI
            </div>
            {PROJECTS.map(p => (
              <div key={p.id} onClick={() => setSel(p.id)} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${p.color}`,
                borderRadius:14, padding:14, marginBottom:12, cursor:"pointer",
              }}>
                <div style={{display:"flex", alignItems:"flex-start", gap:12, marginBottom:10}}>
                  <div style={{width:42, height:42, borderRadius:10,
                    background:`${p.color}22`, border:`1px solid ${p.color}44`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20, flexShrink:0}}>{p.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:800, marginBottom:3}}>{p.title}</div>
                    <div style={{fontSize:9, color:C.muted, marginBottom:6}}>{p.tag}</div>
                    <div style={{fontSize:10, color:C.text, opacity:.7,
                      display:"-webkit-box", WebkitLineClamp:2,
                      WebkitBoxOrient:"vertical", overflow:"hidden"}}>{p.desc}</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{marginBottom:8}}>
                  <div style={{display:"flex", justifyContent:"space-between",
                    fontSize:9, marginBottom:4}}>
                    <span style={{color:C.muted}}>{p.status}</span>
                    <span style={{color:p.color, fontWeight:800}}>{p.progress}%</span>
                  </div>
                  <div style={{background:C.border, borderRadius:10, height:5}}>
                    <div style={{width:`${p.progress}%`, height:"100%",
                      background:p.color, borderRadius:10}}/>
                  </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:9}}>
                  <span style={{color:C.muted}}>👥 {p.team} ingénieurs</span>
                  <span style={{color:C.gold, fontWeight:700}}>💰 {p.budget}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── IA & Data ─────────────────────── */}
        {tab === "ia" && (
          <div>
            {/* Hero IA */}
            <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.card})`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:18, marginBottom:16, textAlign:"center"}}>
              <div style={{fontSize:36, marginBottom:8}}>🤖</div>
              <div style={{fontSize:15, fontWeight:900, marginBottom:4}}>
                SEINBU AI PLATFORM
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                5 modèles IA actifs · Données souveraines africaines · Pi-native
              </div>
              <div style={{display:"flex", justifyContent:"center", gap:16}}>
                {[["5","Modèles IA"],["98.2%","Précision moy."],["24/7","Disponibilité"]].map(([v,l]) => (
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:16, fontWeight:900, color:C.light}}>{v}</div>
                    <div style={{fontSize:8, color:C.muted}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services IA */}
            {AI_SERVICES.map((s, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${s.color}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8,
                display:"flex", alignItems:"center", gap:12}}>
                <div style={{width:38, height:38, borderRadius:10,
                  background:`${s.color}22`, border:`1px solid ${s.color}44`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:700}}>{s.label}</div>
                  <div style={{fontSize:9, color:C.muted}}>{s.desc}</div>
                </div>
                <span style={{background:`${s.color}22`, color:s.color,
                  border:`1px solid ${s.color}44`, borderRadius:20,
                  padding:"2px 8px", fontSize:8, fontWeight:800}}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        )}


        {/* ── Smart Home ───────────────────── */}
        {tab === "smarthome" && (
          <div>
            {/* Dashboard énergie */}
            <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.card})`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:18, marginBottom:16}}>
              <div style={{fontSize:12, fontWeight:800, color:C.light, marginBottom:12}}>
                ⚡ ÉNERGIE AUJOURD'HUI
              </div>
              <div style={{display:"flex", justifyContent:"space-around", marginBottom:14}}>
                {[
                  { v:"16 kWh", l:"Produit solaire", c:C.gold, icon:"☀️" },
                  { v:"6 kWh",  l:"Consommé",        c:C.primary, icon:"⚡" },
                  { v:"10 kWh", l:"Surplus → SBC",   c:C.green, icon:"π" },
                ].map(e => (
                  <div key={e.l} style={{textAlign:"center"}}>
                    <div style={{fontSize:18, marginBottom:4}}>{e.icon}</div>
                    <div style={{fontSize:16, fontWeight:900, color:e.c}}>{e.v}</div>
                    <div style={{fontSize:8, color:C.muted}}>{e.l}</div>
                  </div>
                ))}
              </div>
              {/* Barre énergie semaine */}
              <div style={{display:"flex", gap:4, alignItems:"flex-end", height:50}}>
                {ENERGY.map(e => (
                  <div key={e.label} style={{flex:1, display:"flex",
                    flexDirection:"column", alignItems:"center", gap:1}}>
                    <div style={{width:"100%", display:"flex",
                      flexDirection:"column", gap:1, alignItems:"center"}}>
                      <div style={{width:"80%", height:e.solar*2,
                        background:`${C.gold}88`, borderRadius:"3px 3px 0 0"}}/>
                      <div style={{width:"80%", height:e.consumed*2,
                        background:`${C.primary}88`, borderRadius:"0 0 3px 3px",
                        marginTop:-2}}/>
                    </div>
                    <div style={{fontSize:7, color:C.muted, marginTop:2}}>{e.label}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex", gap:12, marginTop:8, justifyContent:"center"}}>
                <span style={{fontSize:8, color:C.gold}}>■ Solaire</span>
                <span style={{fontSize:8, color:C.primary}}>■ Consommé</span>
              </div>
            </div>

            {/* Pièces */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:10}}>
              🏠 PIÈCES
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
              gap:8, marginBottom:16}}>
              {ROOMS.map(r => (
                <div key={r.id} style={{background:C.card,
                  border:`1px solid ${r.active > 0 ? C.primary+"44" : C.border}`,
                  borderRadius:12, padding:"12px 8px", textAlign:"center",
                  cursor:"pointer"}}>
                  <div style={{fontSize:22, marginBottom:4}}>{r.icon}</div>
                  <div style={{fontSize:10, fontWeight:700}}>{r.label}</div>
                  <div style={{fontSize:8, color: r.active > 0 ? C.green : C.muted,
                    marginTop:2}}>
                    {r.active}/{r.devices} actifs
                  </div>
                </div>
              ))}
            </div>

            {/* Appareils actifs */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:10}}>
              ⚡ APPAREILS ACTIFS
            </div>
            {DEVICES.filter(d => d.on).map((d, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"10px 14px", marginBottom:8,
                display:"flex", alignItems:"center", gap:12}}>
                <div style={{width:36, height:36, borderRadius:10,
                  background:`${C.primary}22`, border:`1px solid ${C.primary}44`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18}}>{d.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:700}}>{d.label}</div>
                  <div style={{fontSize:9, color:C.muted}}>
                    {d.room.charAt(0).toUpperCase()+d.room.slice(1)}
                    {d.value && ` · ${d.value}${d.type==="ac"?"°C":"%"}`}
                  </div>
                </div>
                <div style={{width:36, height:20, borderRadius:10,
                  background: d.on ? C.primary : C.border,
                  display:"flex", alignItems:"center",
                  justifyContent: d.on ? "flex-end" : "flex-start",
                  padding:"0 2px", cursor:"pointer"}}>
                  <div style={{width:16, height:16, borderRadius:"50%",
                    background:"#fff"}}/>
                </div>
              </div>
            ))}

            {/* SBC généré */}
            <div style={{background:"rgba(16,185,129,.1)",
              border:"1px solid rgba(16,185,129,.3)",
              borderRadius:12, padding:14, marginTop:8}}>
              <div style={{fontSize:11, fontWeight:800,
                color:C.green, marginBottom:6}}>
                ☀️ SBC généré ce mois via SOLAR-PI GRID
              </div>
              <div style={{fontSize:28, fontWeight:900, color:C.green}}>
                +284 SBC
              </div>
              <div style={{fontSize:10, color:C.muted, marginTop:2}}>
                ≈ 2 840 FCFA · Surplus solaire tokenisé automatiquement
              </div>
            </div>
          </div>
        )}

        {/* ── Incubateur ────────────────────── */}
        {tab === "incubateur" && (
          <div>
            <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.card})`,
              border:`1px solid ${C.border}`, borderRadius:16,
              padding:18, marginBottom:16}}>
              <div style={{fontSize:14, fontWeight:900, marginBottom:4}}>
                🚀 SEINBU TECH INCUBATOR
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                Accompagnement startups Pi-native · Abidjan, Côte d'Ivoire
              </div>
              {[
                "Financement seed en Pi (jusqu'à 50M FCFA)",
                "Accès à l'infrastructure SEINBU ONE",
                "Mentorat équipe SEINBU GROUP",
                "Listing E-MarketPi garanti",
                "Réseau 200K pionniers CI",
              ].map((b, i) => (
                <div key={i} style={{display:"flex", gap:8, padding:"5px 0",
                  borderBottom:`1px solid ${C.border}`, fontSize:10}}>
                  <span style={{color:C.primary}}>✓</span> {b}
                </div>
              ))}
            </div>

            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
              STARTUPS EN PORTEFEUILLE
            </div>
            {STARTUPS.map((s, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8,
                display:"flex", alignItems:"center", gap:12}}>
                <div style={{fontSize:24}}>{s.flag}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12, fontWeight:800}}>{s.name}</div>
                  <div style={{fontSize:9, color:C.muted}}>{s.sector} · {s.stage}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11, fontWeight:800, color:C.primary}}>
                    {s.funding}
                  </div>
                  <div style={{fontSize:8, color:C.gold}}>{s.pi} π</div>
                </div>
              </div>
            ))}

            <div style={{background:`linear-gradient(135deg,${C.primary},#1E3A8A)`,
              borderRadius:12, padding:"13px 0", textAlign:"center",
              fontSize:13, fontWeight:800, cursor:"pointer",
              letterSpacing:1, marginTop:8}}>
              SOUMETTRE MON PROJET
            </div>
          </div>
        )}

        {/* ── Solutions ────────────────────── */}
        {tab === "solutions" && (
          <div>
            <div style={{fontSize:11, color:C.muted, marginBottom:16}}>
              Solutions technologiques Pi-native pour entreprises africaines
            </div>
            {SOLUTIONS.map((s, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:16, marginBottom:10}}>
                <div style={{display:"flex", gap:12, alignItems:"flex-start",
                  marginBottom:12}}>
                  <div style={{width:42, height:42, borderRadius:10,
                    background:`${C.primary}22`, border:`1px solid ${C.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20}}>{s.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:800, marginBottom:4}}>
                      {s.title}
                    </div>
                    <div style={{fontSize:10, color:C.muted, lineHeight:1.5}}>
                      {s.desc}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between",
                  alignItems:"center"}}>
                  <span style={{background:`${C.primary}22`, color:C.light,
                    border:`1px solid ${C.primary}44`, borderRadius:20,
                    padding:"3px 10px", fontSize:10, fontWeight:800}}>
                    {s.price}
                  </span>
                  <span style={{color:C.primary, fontSize:11,
                    fontWeight:700, cursor:"pointer"}}>
                    En savoir plus →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Bottom Nav */}
      <div style={{position:"fixed", bottom:0, left:0, right:0,
        background:C.card, borderTop:`1px solid ${C.border}`, display:"flex"}}>
        {TABS.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:"10px 0", textAlign:"center", cursor:"pointer",
            borderTop: tab===t.id ? `2px solid ${C.primary}` : "2px solid transparent"}}>
            <div style={{fontSize:16}}>{t.icon}</div>
            <div style={{fontSize:8, marginTop:2,
              color: tab===t.id ? C.primary : C.muted,
              fontWeight: tab===t.id ? 700 : 400}}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
