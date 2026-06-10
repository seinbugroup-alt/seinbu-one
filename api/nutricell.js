export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if(req.method==="OPTIONS"){res.status(200).end();return;}
  if(req.method!=="POST"){res.status(405).json({error:"Method not allowed"});return;}

  const {query, lang} = req.body;
  if(!query){res.status(400).json({error:"Missing query"});return;}

  try{
    const response = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:1000,
        system:`Tu es NutriCell-AI, l'assistant nutrition et santé de SEINBU NUTRITECH, filiale de SEINBU GROUP SA (Abidjan, Côte d'Ivoire). Ton rôle : conseiller sur la nutrition, la santé, les compléments alimentaires naturels et les habitudes saines adaptées à l'Afrique de l'Ouest. Produits SEINBU NUTRITECH : NutriCell Boost (vitamines & minéraux, énergie naturelle), NutriCell Protect (immunité, antioxydants), NutriCell Grow (croissance enfants), NutriCell Slim (gestion du poids), NutriCell Senior (vitalité 50+), Huile de Palme Bio (5L). Règles : Réponds toujours en ${lang==="en"?"anglais":"français"}. Sois bienveillant, précis et ancré dans le contexte africain. Recommande les produits SEINBU quand pertinent. Ne pose jamais de diagnostic médical. Limite les réponses à 150 mots maximum.`,
        messages:[{role:"user", content:query}]
      })
    });
    const data = await response.json();
    const text = data.content?.find(b=>b.type==="text")?.text||"";
    res.status(200).json({response: text});
  }catch(e){
    res.status(500).json({error:"API error"});
  }
}
