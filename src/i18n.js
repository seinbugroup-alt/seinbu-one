// ── SEINBU ONE — Traductions FR / EN ─────────────────────────────
// Usage dans un module : import { useT } from "./i18n";
//                        const T = useT(lang);

export const TRANSLATIONS = {

  // ── Commun ──────────────────────────────────────────────────────
  common: {
    fr: {
      dashboard: "Dashboard", convert: "Convertir", staking: "Staking",
      mobile: "Mobile", history: "Historique", send: "Envoyer",
      receive: "Recevoir", exchange: "Échanger", balance: "Solde",
      transactions: "Transactions", thisMonth: "Ce mois", available: "Disponibles",
      connect: "Connexion Pi", connected: "Pi connecté", testnet: "Testnet",
      pilotPhase: "Phase Pilote", loading: "Chargement…", error: "Erreur",
      confirm: "Confirmer", cancel: "Annuler", save: "Enregistrer",
      back: "Retour", search: "Rechercher", filter: "Filtrer",
      total: "Total", details: "Détails", programs: "Programmes",
      contact: "Contact", about: "À propos", settings: "Paramètres",
    },
    en: {
      dashboard: "Dashboard", convert: "Convert", staking: "Staking",
      mobile: "Mobile", history: "History", send: "Send",
      receive: "Receive", exchange: "Exchange", balance: "Balance",
      transactions: "Transactions", thisMonth: "This month", available: "Available",
      connect: "Pi Connect", connected: "Pi connected", testnet: "Testnet",
      pilotPhase: "Pilot Phase", loading: "Loading…", error: "Error",
      confirm: "Confirm", cancel: "Cancel", save: "Save",
      back: "Back", search: "Search", filter: "Filter",
      total: "Total", details: "Details", programs: "Programs",
      contact: "Contact", about: "About", settings: "Settings",
    },
  },

  // ── FINTECH ─────────────────────────────────────────────────────
  fintech: {
    fr: {
      title: "SEINBU FINTECH",
      subtitle: "Finance Numérique · SBC Coin · Mobile Money",
      tabs: ["Dashboard", "Convertir", "Staking", "Mobile", "Historique"],
      sbcBalance: "SOLDE SBC COIN",
      stakingLabel: "SBC en staking", gainsLabel: "Gains ce mois",
      piAvailable: "Pi disponibles", txLabel: "Transactions",
      ratesTitle: "TAUX EN TEMPS RÉEL",
      convertTitle: "Convertir",
      poolTitle: "PIONEER EXCHANGE POOL",
      poolBurn: "Disponibles · Burn 0.5% / tx",
      youReceive: "VOUS RECEVREZ (SBC)",
      convertBtn: "Convertir Pi → SBC",
      stakingTitle: "Staking SBC",
      mobileTitle: "Mobile Money",
      historyTitle: "Historique des Transactions",
      recharge: "RECHARGER EN SBC",
      withdraw: "RETIRER EN MOBILE MONEY",
      burnLabel: "Burn",
    },
    en: {
      title: "SEINBU FINTECH",
      subtitle: "Digital Finance · SBC Coin · Mobile Money",
      tabs: ["Dashboard", "Convert", "Staking", "Mobile", "History"],
      sbcBalance: "SBC COIN BALANCE",
      stakingLabel: "SBC in staking", gainsLabel: "Monthly gains",
      piAvailable: "Pi available", txLabel: "Transactions",
      ratesTitle: "LIVE RATES",
      convertTitle: "Convert",
      poolTitle: "PIONEER EXCHANGE POOL",
      poolBurn: "Available · Burn 0.5% / tx",
      youReceive: "YOU WILL RECEIVE (SBC)",
      convertBtn: "Convert Pi → SBC",
      stakingTitle: "SBC Staking",
      mobileTitle: "Mobile Money",
      historyTitle: "Transaction History",
      recharge: "TOP UP IN SBC",
      withdraw: "WITHDRAW TO MOBILE MONEY",
      burnLabel: "Burn",
    },
  },

  // ── ANI ─────────────────────────────────────────────────────────
  ani: {
    fr: {
      title: "SEINBU ANI",
      subtitle: "Agriculture Nouvelle Ivoirienne · Filiale N°2",
      tabs: ["Dashboard", "Cultures", "Marché", "Financement", "Carte"],
      area: "SUPERFICIE ENGAGÉE", target: "objectif pilote",
      progress: "de l'objectif atteint", farmers: "planteurs actifs",
      pilotCultures: "CULTURES PILOTES", stock: "Stock",
      revenue: "CA consolidé", production: "prod.",
      bioUrin: "BioUrin™ prod.", volume: "Volume collecté",
      marketTitle: "Marché Agricole", fundTitle: "Financement Pi",
      mapTitle: "Carte des exploitations",
    },
    en: {
      title: "SEINBU ANI",
      subtitle: "New Ivorian Agriculture · Subsidiary N°2",
      tabs: ["Dashboard", "Crops", "Market", "Financing", "Map"],
      area: "AREA ENGAGED", target: "pilot target",
      progress: "of target reached", farmers: "active farmers",
      pilotCultures: "PILOT CROPS", stock: "Stock",
      revenue: "Consolidated revenue", production: "prod.",
      bioUrin: "BioUrin™ prod.", volume: "Volume collected",
      marketTitle: "Agricultural Market", fundTitle: "Pi Financing",
      mapTitle: "Farm Map",
    },
  },

  // ── NUTRITECH ───────────────────────────────────────────────────
  nutritech: {
    fr: {
      title: "SEINBU NUTRITECH",
      subtitle: "Nutrition & Santé · Intelligence Artificielle",
      tabs: ["Dashboard", "Analyse", "Produits", "IA Nutrition", "Suivi"],
      analysisTitle: "Analyse Nutritionnelle",
      productsTitle: "Produits NutriTech",
      aiTitle: "NutriCell-AI",
      trackTitle: "Suivi Santé",
      scanBtn: "Scanner un aliment",
      recommend: "Recommandations personnalisées",
    },
    en: {
      title: "SEINBU NUTRITECH",
      subtitle: "Nutrition & Health · Artificial Intelligence",
      tabs: ["Dashboard", "Analysis", "Products", "AI Nutrition", "Tracking"],
      analysisTitle: "Nutritional Analysis",
      productsTitle: "NutriTech Products",
      aiTitle: "NutriCell-AI",
      trackTitle: "Health Tracking",
      scanBtn: "Scan a food item",
      recommend: "Personalized recommendations",
    },
  },

  // ── HAVILA ──────────────────────────────────────────────────────
  havila: {
    fr: {
      title: "FONDATION HAVILA",
      subtitle: "Éducation · Santé · Action Sociale",
      tabs: ["Mission", "Programmes", "Impact", "Don", "Contact"],
      mission: "Notre Mission",
      programs: "Nos Programmes",
      impact: "Notre Impact",
      donate: "Faire un Don",
      donateBtn: "Donner en Pi",
      education: "Éducation", health: "Santé", social: "Action Sociale",
      beneficiaries: "Bénéficiaires", projects: "Projets actifs",
    },
    en: {
      title: "HAVILA FOUNDATION",
      subtitle: "Education · Health · Social Action",
      tabs: ["Mission", "Programs", "Impact", "Donate", "Contact"],
      mission: "Our Mission",
      programs: "Our Programs",
      impact: "Our Impact",
      donate: "Make a Donation",
      donateBtn: "Donate in Pi",
      education: "Education", health: "Health", social: "Social Action",
      beneficiaries: "Beneficiaries", projects: "Active projects",
    },
  },

  // ── TELECOM ─────────────────────────────────────────────────────
  telecom: {
    fr: {
      title: "SEINBU TELECOM",
      subtitle: "Télécommunications · Connectivité Africaine",
      tabs: ["Services", "Forfaits", "Couverture", "Recharge", "Support"],
      servicesTitle: "Nos Services",
      plansTitle: "Forfaits Mobile",
      coverageTitle: "Couverture Réseau",
      rechargeTitle: "Recharger",
      rechargeBtn: "Recharger en Pi",
      data: "Data", calls: "Appels", sms: "SMS",
    },
    en: {
      title: "SEINBU TELECOM",
      subtitle: "Telecommunications · African Connectivity",
      tabs: ["Services", "Plans", "Coverage", "Top-up", "Support"],
      servicesTitle: "Our Services",
      plansTitle: "Mobile Plans",
      coverageTitle: "Network Coverage",
      rechargeTitle: "Top Up",
      rechargeBtn: "Top up with Pi",
      data: "Data", calls: "Calls", sms: "SMS",
    },
  },

  // ── SECURITY ────────────────────────────────────────────────────
  security: {
    fr: {
      title: "SEINBU SECURITY",
      subtitle: "Sécurité Privée · Surveillance · Protection",
      tabs: ["Dashboard", "Alertes", "Agents", "Rondes", "Rapports"],
      alertsTitle: "Alertes en cours",
      agentsTitle: "Agents actifs",
      roundsTitle: "Rondes programmées",
      reportsTitle: "Rapports de sécurité",
      status: "Statut", active: "Actif", inactive: "Inactif",
      emergency: "Urgence", normal: "Normal",
    },
    en: {
      title: "SEINBU SECURITY",
      subtitle: "Private Security · Surveillance · Protection",
      tabs: ["Dashboard", "Alerts", "Agents", "Rounds", "Reports"],
      alertsTitle: "Current alerts",
      agentsTitle: "Active agents",
      roundsTitle: "Scheduled rounds",
      reportsTitle: "Security reports",
      status: "Status", active: "Active", inactive: "Inactive",
      emergency: "Emergency", normal: "Normal",
    },
  },

  // ── TECH ────────────────────────────────────────────────────────
  tech: {
    fr: {
      title: "SEINBU TECH",
      subtitle: "Technologies · Développement · Innovation",
      tabs: ["Services", "Projets", "API", "Équipe", "Contact"],
      servicesTitle: "Services Tech",
      projectsTitle: "Projets en cours",
      apiTitle: "API & Intégrations",
      teamTitle: "Notre Équipe",
      deployBtn: "Déployer",
    },
    en: {
      title: "SEINBU TECH",
      subtitle: "Technology · Development · Innovation",
      tabs: ["Services", "Projects", "API", "Team", "Contact"],
      servicesTitle: "Tech Services",
      projectsTitle: "Ongoing Projects",
      apiTitle: "API & Integrations",
      teamTitle: "Our Team",
      deployBtn: "Deploy",
    },
  },

  // ── EDITIONS ────────────────────────────────────────────────────
  editions: {
    fr: {
      title: "SEINBU ÉDITIONS",
      subtitle: "Publications · Livres · Contenus Numériques",
      tabs: ["Catalogue", "Nouveautés", "Auteurs", "Commander", "À propos"],
      catalogTitle: "Catalogue",
      newTitle: "Nouveautés",
      authorsTitle: "Nos Auteurs",
      orderTitle: "Commander",
      orderBtn: "Acheter en Pi",
      priceLabel: "Prix Pi",
    },
    en: {
      title: "SEINBU ÉDITIONS",
      subtitle: "Publishing · Books · Digital Content",
      tabs: ["Catalogue", "New", "Authors", "Order", "About"],
      catalogTitle: "Catalogue",
      newTitle: "New Releases",
      authorsTitle: "Our Authors",
      orderTitle: "Order",
      orderBtn: "Buy with Pi",
      priceLabel: "Pi Price",
    },
  },

  // ── INDUSTRIE ───────────────────────────────────────────────────
  industrie: {
    fr: {
      title: "SEINBU INDUSTRIE",
      subtitle: "Industrie · Manufacture · Transformation",
      tabs: ["Production", "Stocks", "Équipements", "Commandes", "KPIs"],
      productionTitle: "Production en cours",
      stocksTitle: "Gestion des Stocks",
      equipTitle: "Équipements",
      ordersTitle: "Commandes",
      kpiTitle: "Indicateurs clés",
      units: "unités", capacity: "Capacité",
    },
    en: {
      title: "SEINBU INDUSTRIE",
      subtitle: "Industry · Manufacturing · Processing",
      tabs: ["Production", "Stocks", "Equipment", "Orders", "KPIs"],
      productionTitle: "Ongoing Production",
      stocksTitle: "Stock Management",
      equipTitle: "Equipment",
      ordersTitle: "Orders",
      kpiTitle: "Key Indicators",
      units: "units", capacity: "Capacity",
    },
  },

};

// Hook d'utilisation — retourne les traductions pour la langue donnée
export function useT(module, lang = "fr") {
  const mod = TRANSLATIONS[module];
  if (!mod) return TRANSLATIONS.common[lang] || TRANSLATIONS.common.fr;
  return {
    ...TRANSLATIONS.common[lang] || TRANSLATIONS.common.fr,
    ...(mod[lang] || mod.fr),
  };
}
