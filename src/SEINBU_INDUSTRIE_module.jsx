import { useState } from "react";

const C = {
  bg:      "#050505",
  card:    "#0F0F0F",
  border:  "#1F1F1F",
  primary: "#374151",
  light:   "#9CA3AF",
  gold:    "#D4A827",
  green:   "#10B981",
  red:     "#EF4444",
  text:    "#E5E7EB",
  muted:   "#4B5563",
  steel:   "#6B7280",
};

const TABS = [
  { id:"overview",  label:"Vue d'ensemble", icon:"🏭" },
  { id:"drive",     label:"DRIVE",          icon:"🚗" },
  { id:"marine",    label:"MARINE",         icon:"⚓" },
  { id:"energie",   label:"Énergie",        icon:"⚡" },
];

const SECTORS = [
  { icon:"🚗", label:"SEINBU DRIVE",    sub:"Véhicules électriques CI",  color:"#3B82F6", progress:30 },
  { icon:"⚓", label:"SEINBU MARINE",   sub:"Transport fluvial & maritime",color:"#0891B2", progress:15 },
  { icon:"🚂", label:"SEINBU RAIL",     sub:"Fret ferroviaire UEMOA",    color:"#7C3AED", progress:10 },
  { icon:"⚡", label:"SEINBU ÉNERGIE",  sub:"Solaire · Hydro · Bioénergie",color:"#F59E0B", progress:25 },
  { icon:"🏗️", label:"BTP INDUSTRIE",  sub:"Construction & génie civil", color:"#92400E", progress:20 },
  { icon:"🌾", label:"AGRO-INDUSTRIE", sub:"Transformation riz bio & cacao",color:"#059669", progress:45 },
];

const DRIVE_VEHICLES = [
  {
    id:"v1", name:"PIONEER EV-1",
    type:"Berline électrique", range:"450 km",
    price:"18M FCFA", pi:"0.0956",
    seats:5, color:"#3B82F6", icon:"🚗",
    desc:"Première berline électrique made in CI. Batterie 75 kWh, recharge rapide 80% en 45 min. Connectée Pi Network.",
    available:"Q3 2027",
  },
  {
    id:"v2", name:"SEINBU VAN-E",
    type:"Utilitaire électrique", range:"300 km",
    price:"25M FCFA", pi:"0.1328",
    seats:9, color:"#059669", icon:"🚐",
    desc:"Van électrique pour transport urbain et logistique. Idéal pour SEINBU EXPRESS. Capacité 1,2 tonnes.",
    available:"Q1 2028",
  },
  {
    id:"v3", name:"MOTO-PI 125",
    type:"Moto électrique", range:"150 km",
    price:"2.5M FCFA", pi:"0.0133",
    seats:2, color:"#D97706", icon:"🏍️",
    desc:"Moto électrique pour la livraison du dernier kilomètre SEINBU EXPRESS. Légère, robuste, 100% électrique.",
    available:"Q4 2026",
  },
];

const MARINE_ROUTES = [
  { from:"Abidjan", to:"San-Pédro",   duration:"4h",  price:"8 000 FCFA",  pi:"0.000042", icon:"🛥️" },
  { from:"Abidjan", to:"Grand-Bassam",duration:"45min",price:"2 000 FCFA",  pi:"0.000011", icon:"⛵" },
  { from:"Abidjan", to:"Assinie",     duration:"1h30", price:"3 500 FCFA",  pi:"0.000019", icon:"🛥️" },
  { from:"Abidjan", to:"Sassandra",   duration:"6h",   price:"12 000 FCFA", pi:"0.000064", icon:"⛴️" },
];

const ENERGY_PROJECTS = [
  { icon:"☀️", name:"SOLAR FARM BOUAKÉ",    capacity:"50 MW",  status:"Planification", color:"#F59E0B", villages:120 },
  { icon:"💧", name:"HYDRO SASSANDRA",      capacity:"200 MW", status:"Étude",         color:"#0891B2", villages:500 },
  { icon:"🌿", name:"BIO-ÉNERGIE YAMOUSSO", capacity:"30 MW",  status:"Prototype",     color:"#059669", villages:80  },
  { icon:"🔋", name:"SOLAR-PI ABIDJAN",     capacity:"5 MW",   status:"En cours",      color:"#D4A827", villages:15  },
];

export default function SeinbuIndustrie() {
  const [tab, setTab]     = useState("overview");
  const [selV, setSelV]   = useState(null);

  // eslint-disable-next-line no-unused-vars
const fmt = n => new Intl.NumberFormat("fr-FR").format(n);

  if (selV) {
    const v = DRIVE_VEHICLES.find(x => x.id === selV);
    return (
      <div style={{background:C.bg, minHeight:"100vh", color:C.text,
        fontFamily:"'Segoe UI',sans-serif", paddingBottom:40}}>
        <div style={{background:`linear-gradient(135deg,${C.primary}22,${C.bg})`,
          borderBottom:`1px solid ${C.border}`, padding:"14px 16px",
          display:"flex", alignItems:"center", gap:12}}>
          <div onClick={() => setSelV(null)} style={{width:32, height:32,
            borderRadius:8, background:C.card, border:`1px solid ${C.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, cursor:"pointer"}}>←</div>
          <div style={{fontSize:13, fontWeight:800}}>SEINBU DRIVE</div>
        </div>
        <div style={{padding:"20px 16px"}}>
          <div style={{background:`linear-gradient(135deg,${v.color}22,${C.card})`,
            border:`1px solid ${v.color}44`, borderRadius:16,
            padding:24, textAlign:"center", marginBottom:20}}>
            <div style={{fontSize:64, marginBottom:12}}>{v.icon}</div>
            <div style={{fontSize:20, fontWeight:900, marginBottom:4}}>{v.name}</div>
            <div style={{fontSize:11, color:C.muted, marginBottom:10}}>{v.type}</div>
            <span style={{background:`${v.color}22`, color:v.color,
              border:`1px solid ${v.color}44`, borderRadius:20,
              padding:"3px 12px", fontSize:10, fontWeight:700}}>
              Disponible {v.available}
            </span>
          </div>
          {/* Specs */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16}}>
            {[["Autonomie",v.range,v.color],["Places",`${v.seats} pers.`,C.steel],
              ["Prix",v.price,C.gold],["Prix Pi",`${v.pi} π`,C.gold]].map(([k,val,col]) => (
              <div key={k} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"12px 10px", textAlign:"center"}}>
                <div style={{fontSize:14, fontWeight:900, color:col}}>{val}</div>
                <div style={{fontSize:9, color:C.muted, marginTop:2}}>{k}</div>
              </div>
            ))}
          </div>
          <div style={{background:C.card, border:`1px solid ${C.border}`,
            borderRadius:12, padding:14, marginBottom:16}}>
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:8}}>
              Description
            </div>
            <div style={{fontSize:12, lineHeight:1.6, color:C.text}}>{v.desc}</div>
          </div>
          <div style={{background:`linear-gradient(135deg,${v.color},${v.color}88)`,
            borderRadius:12, padding:"13px 0", textAlign:"center",
            fontSize:13, fontWeight:800, cursor:"pointer", letterSpacing:1}}>
            PRÉ-COMMANDER EN Pi
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{background:C.bg, minHeight:"100vh", color:C.text,
      fontFamily:"'Segoe UI',sans-serif", paddingBottom:80}}>

      {/* Header */}
      <div style={{background:`linear-gradient(135deg,#1F1F1F,${C.bg})`,
        borderBottom:`1px solid ${C.border}`,
        padding:"16px 20px", display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:40, height:40, borderRadius:10,
          background:`linear-gradient(135deg,${C.steel},#374151)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>🏭</div>
        <div>
          <div style={{fontWeight:800, fontSize:16, letterSpacing:1}}>SEINBU INDUSTRIE</div>
          <div style={{fontSize:10, color:C.muted}}>
            DRIVE · MARINE · RAIL · Énergie · BTP · Agro-industrie
          </div>
        </div>
        <div style={{marginLeft:"auto", background:"rgba(255,255,255,.07)",
          border:`1px solid ${C.border}`, borderRadius:20,
          padding:"4px 12px", fontSize:11, color:C.light}}>CI 🇨🇮</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex", background:C.card,
        borderBottom:`1px solid ${C.border}`, padding:"0 4px"}}>
        {TABS.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:"11px 4px", textAlign:"center",
            fontSize:9, fontWeight:800, cursor:"pointer",
            borderBottom: tab===t.id ? `2px solid ${C.gold}` : "2px solid transparent",
            color: tab===t.id ? C.gold : C.muted, transition:"all .15s"}}>
            <div style={{fontSize:16, marginBottom:2}}>{t.icon}</div>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{padding:"16px 16px"}}>

        {/* ── Vue d'ensemble ──────────────── */}
        {tab === "overview" && (
          <div>
            {/* Stats */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
              gap:8, marginBottom:16}}>
              {[
                ["6","Secteurs",C.gold],
                ["63.6 Mds","Budget total",C.green],
                ["2026-35","Horizon",C.light],
              ].map(([v,l,col]) => (
                <div key={l} style={{background:C.card, border:`1px solid ${C.border}`,
                  borderRadius:12, padding:"12px 8px", textAlign:"center"}}>
                  <div style={{fontSize:14, fontWeight:900, color:col}}>{v}</div>
                  <div style={{fontSize:8, color:C.muted, marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>

            {/* Secteurs */}
            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
              SECTEURS INDUSTRIELS
            </div>
            {SECTORS.map((s, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${s.color}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8}}>
                <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
                  <span style={{fontSize:22}}>{s.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12, fontWeight:800}}>{s.label}</div>
                    <div style={{fontSize:9, color:C.muted}}>{s.sub}</div>
                  </div>
                  <span style={{fontSize:11, fontWeight:900, color:s.color}}>
                    {s.progress}%
                  </span>
                </div>
                <div style={{background:C.border, borderRadius:10, height:4}}>
                  <div style={{width:`${s.progress}%`, height:"100%",
                    background:s.color, borderRadius:10}}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DRIVE ───────────────────────── */}
        {tab === "drive" && (
          <div>
            <div style={{background:`linear-gradient(135deg,#1E3A8A22,${C.card})`,
              border:`1px solid #1E3A8A44`, borderRadius:16,
              padding:16, marginBottom:16, textAlign:"center"}}>
              <div style={{fontSize:12, fontWeight:900, color:"#60A5FA", marginBottom:4}}>
                🚗 SEINBU DRIVE — Mobilité Électrique CI
              </div>
              <div style={{fontSize:10, color:C.muted}}>
                Premier constructeur automobile électrique ivoirien · Pi-powered
              </div>
            </div>

            {DRIVE_VEHICLES.map(v => (
              <div key={v.id} onClick={() => setSelV(v.id)} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${v.color}`,
                borderRadius:14, padding:14, marginBottom:12, cursor:"pointer"}}>
                <div style={{display:"flex", gap:14, alignItems:"center", marginBottom:10}}>
                  <div style={{width:52, height:52, borderRadius:12,
                    background:`${v.color}22`, border:`1px solid ${v.color}44`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:28}}>{v.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14, fontWeight:800}}>{v.name}</div>
                    <div style={{fontSize:10, color:C.muted, marginBottom:4}}>
                      {v.type}
                    </div>
                    <span style={{background:`${v.color}22`, color:v.color,
                      fontSize:8, fontWeight:700, padding:"2px 8px",
                      borderRadius:10}}>Dispo. {v.available}</span>
                  </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderTop:`1px solid ${C.border}`}}>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:12, fontWeight:800, color:v.color}}>
                      {v.range}
                    </div>
                    <div style={{fontSize:8, color:C.muted}}>Autonomie</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:12, fontWeight:800, color:C.gold}}>
                      {v.price}
                    </div>
                    <div style={{fontSize:8, color:C.muted}}>Prix FCFA</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:12, fontWeight:800, color:C.gold}}>
                      {v.pi} π
                    </div>
                    <div style={{fontSize:8, color:C.muted}}>Prix Pi</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MARINE ──────────────────────── */}
        {tab === "marine" && (
          <div>
            <div style={{background:"linear-gradient(135deg,#0C4A6E22,#0F172A)",
              border:"1px solid #0C4A6E44", borderRadius:16,
              padding:16, marginBottom:16, textAlign:"center"}}>
              <div style={{fontSize:32, marginBottom:8}}>⚓</div>
              <div style={{fontSize:13, fontWeight:900, color:"#7DD3FC", marginBottom:4}}>
                SEINBU MARINE
              </div>
              <div style={{fontSize:10, color:C.muted}}>
                Transport fluvial & maritime — Lagune Ébrié · Côte Atlantique
              </div>
            </div>

            <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:12}}>
              🛥️ LIAISONS MARITIMES CI
            </div>
            {MARINE_ROUTES.map((r, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"12px 14px", marginBottom:8}}>
                <div style={{display:"flex", alignItems:"center",
                  justifyContent:"space-between", marginBottom:8}}>
                  <div style={{display:"flex", alignItems:"center", gap:10}}>
                    <span style={{fontSize:22}}>{r.icon}</span>
                    <div>
                      <div style={{fontSize:12, fontWeight:800}}>
                        {r.from} → {r.to}
                      </div>
                      <div style={{fontSize:9, color:C.muted}}>⏱ {r.duration}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:12, fontWeight:800, color:C.gold}}>
                      {r.price}
                    </div>
                    <div style={{fontSize:8, color:C.gold}}>{r.pi} π</div>
                  </div>
                </div>
                <div style={{background:"#0C4A6E22",
                  border:"1px solid #0C4A6E44", borderRadius:8,
                  padding:"6px 0", textAlign:"center",
                  fontSize:10, fontWeight:700, color:"#7DD3FC",
                  cursor:"pointer"}}>
                  Réserver en Pi →
                </div>
              </div>
            ))}

            {/* Flotte */}
            <div style={{background:C.card, border:`1px solid ${C.border}`,
              borderRadius:12, padding:14, marginTop:8}}>
              <div style={{fontSize:11, fontWeight:800, color:C.light, marginBottom:10}}>
                🚢 FLOTTE SEINBU MARINE
              </div>
              {[
                ["Ferry PI-01","50 passagers","En service","#10B981"],
                ["Vedette PI-02","12 passagers","En service","#10B981"],
                ["Cargo SEINBU-1","50 tonnes","En commande","#F59E0B"],
              ].map(([n,c,s,col]) => (
                <div key={n} style={{display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderBottom:`1px solid ${C.border}`,
                  fontSize:11}}>
                  <span style={{fontWeight:700}}>{n}</span>
                  <span style={{color:C.muted, fontSize:10}}>{c}</span>
                  <span style={{color:col, fontSize:10, fontWeight:700}}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Énergie ─────────────────────── */}
        {tab === "energie" && (
          <div>
            <div style={{background:"linear-gradient(135deg,#78350F22,#0F0F0F)",
              border:"1px solid #78350F44", borderRadius:16,
              padding:16, marginBottom:16}}>
              <div style={{fontSize:13, fontWeight:900, color:C.gold, marginBottom:4}}>
                ⚡ SEINBU ÉNERGIE
              </div>
              <div style={{fontSize:10, color:C.muted, marginBottom:12}}>
                Énergie propre tokenisée Pi · Villages CI · UEMOA
              </div>
              <div style={{display:"flex", justifyContent:"space-around"}}>
                {[["285 MW","Capacité totale"],["715","Villages cibles"],["SBC","Token énergie"]].map(([v,l]) => (
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontSize:15, fontWeight:900, color:C.gold}}>{v}</div>
                    <div style={{fontSize:8, color:C.muted}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {ENERGY_PROJECTS.map((p, i) => (
              <div key={i} style={{background:C.card, border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${p.color}`,
                borderRadius:14, padding:14, marginBottom:10}}>
                <div style={{display:"flex", justifyContent:"space-between",
                  alignItems:"flex-start", marginBottom:8}}>
                  <div style={{display:"flex", gap:10, alignItems:"center"}}>
                    <span style={{fontSize:24}}>{p.icon}</span>
                    <div>
                      <div style={{fontSize:12, fontWeight:800}}>{p.name}</div>
                      <div style={{fontSize:9, color:C.muted}}>
                        {p.capacity} · {p.villages} villages
                      </div>
                    </div>
                  </div>
                  <span style={{background:`${p.color}22`, color:p.color,
                    border:`1px solid ${p.color}44`, borderRadius:20,
                    padding:"2px 8px", fontSize:8, fontWeight:800}}>
                    {p.status}
                  </span>
                </div>
                <div style={{background:`${p.color}15`,
                  border:`1px solid ${p.color}33`, borderRadius:8,
                  padding:"6px 12px", textAlign:"center",
                  fontSize:10, fontWeight:700, color:p.color, cursor:"pointer"}}>
                  Investir via Pi Bonds →
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
            borderTop: tab===t.id ? `2px solid ${C.gold}` : "2px solid transparent"}}>
            <div style={{fontSize:16}}>{t.icon}</div>
            <div style={{fontSize:8, marginTop:2,
              color: tab===t.id ? C.gold : C.muted,
              fontWeight: tab===t.id ? 700 : 400}}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
