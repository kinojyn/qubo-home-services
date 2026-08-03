import type { ServiceArea } from "@/features/serviceAreas/types";

export const SERVICE_AREAS = [
  {
    slug: "udine",
    city: "Udine",
    province: "Udine",
    headline: "Piccole riparazioni domestiche a Udine, senza complicazioni.",
    introduction:
      "Dalla manutenzione quotidiana alle installazioni leggere, raccogliamo i lavori di casa in una sola richiesta e ne verifichiamo fattibilità, zona e disponibilità prima di confermare l'intervento.",
    localContext:
      "In appartamenti, case indipendenti e abitazioni nei comuni intorno a Udine, i piccoli lavori spesso si accumulano. QUBO aiuta a organizzarli con un unico contatto e indicazioni chiare prima della visita.",
    nearbyAreas: ["Tavagnacco", "Pasian di Prato", "Cividale del Friuli"],
    benefits: [
      {
        title: "Una richiesta unica",
        description:
          "Puoi descrivere più piccoli lavori e ricevere una valutazione organizzata della richiesta.",
      },
      {
        title: "Disponibilità verificata",
        description:
          "Confermiamo copertura, tempi e fattibilità in base alla zona e al tipo di intervento.",
      },
      {
        title: "Comunicazione semplice",
        description: "Sai quali informazioni e materiali servono prima di fissare l'appuntamento.",
      },
    ],
    metadata: {
      title: "Riparazioni domestiche a Udine",
      description:
        "Piccole riparazioni domestiche a Udine e dintorni: elettricità, idraulica, montaggi e lavori tuttofare organizzati con un unico team locale.",
    },
  },
  {
    slug: "trieste",
    city: "Trieste",
    province: "Trieste",
    headline: "I piccoli lavori di casa a Trieste, gestiti da un unico team.",
    introduction:
      "Organizziamo riparazioni quotidiane, montaggi e installazioni leggere a Trieste, verificando in anticipo accesso, materiali e caratteristiche del lavoro per rendere la richiesta più semplice.",
    localContext:
      "Negli appartamenti cittadini e nelle abitazioni dell'area triestina, accessi, pareti e spazi di lavoro possono richiedere una preparazione accurata. Per questo raccogliamo i dettagli utili prima di confermare la visita.",
    nearbyAreas: ["Muggia", "San Dorligo della Valle", "Monrupino"],
    benefits: [
      {
        title: "Dettagli prima della visita",
        description:
          "Foto e descrizione ci aiutano a valutare accesso, supporti e materiali necessari.",
      },
      {
        title: "Più lavori coordinati",
        description:
          "Quando è possibile, riuniamo diverse piccole attività nella stessa richiesta.",
      },
      {
        title: "Conferma trasparente",
        description: "La disponibilità viene sempre verificata prima di fissare data e intervento.",
      },
    ],
    metadata: {
      title: "Riparazioni domestiche a Trieste",
      description:
        "Riparazioni domestiche a Trieste e nell'area vicina: montaggi, installazioni e piccoli lavori gestiti con chiarezza da un solo team locale.",
    },
  },
  {
    slug: "pordenone",
    city: "Pordenone",
    province: "Pordenone",
    headline: "A Pordenone, una soluzione semplice per i piccoli lavori di casa.",
    introduction:
      "Dai mobili da montare alle piccole riparazioni, valutiamo la tua lista di lavori a Pordenone e organizziamo gli interventi compatibili in modo chiaro, senza moltiplicare i contatti.",
    localContext:
      "Tra appartamenti, villette e abitazioni nell'area pordenonese, ogni richiesta può includere esigenze diverse. Una descrizione completa ci permette di definire priorità e preparazione prima dell'appuntamento.",
    nearbyAreas: ["Cordenons", "Porcia", "Roveredo in Piano"],
    benefits: [
      {
        title: "Lista lavori ordinata",
        description:
          "Valutiamo insieme priorità e attività che possono essere svolte nello stesso intervento.",
      },
      {
        title: "Ambito chiaro",
        description:
          "Confermiamo cosa rientra nei piccoli lavori domestici prima dell'appuntamento.",
      },
      {
        title: "Cura degli spazi",
        description:
          "Il lavoro viene organizzato prestando attenzione all'ordine dell'ambiente domestico.",
      },
    ],
    metadata: {
      title: "Riparazioni domestiche a Pordenone",
      description:
        "Piccoli lavori e riparazioni domestiche a Pordenone e dintorni: un solo team per montaggi, installazioni e manutenzione quotidiana della casa.",
    },
  },
  {
    slug: "gorizia",
    city: "Gorizia",
    province: "Gorizia",
    headline: "Piccoli interventi per la casa a Gorizia, organizzati con cura.",
    introduction:
      "Per riparazioni leggere, regolazioni e installazioni domestiche a Gorizia, partiamo da una richiesta completa e confermiamo sempre zona, disponibilità e tipo di lavoro.",
    localContext:
      "Nelle case di Gorizia e dei comuni vicini, piccoli interventi diversi possono essere gestiti con meno appuntamenti. Indicare subito misure, foto e materiali disponibili rende la valutazione più precisa.",
    nearbyAreas: ["Cormons", "Gradisca d'Isonzo", "Sagrado"],
    benefits: [
      {
        title: "Valutazione iniziale",
        description:
          "Descrizione e immagini aiutano a capire se il lavoro rientra nel servizio disponibile.",
      },
      {
        title: "Organizzazione locale",
        description:
          "Zona e disponibilità vengono controllate prima di proporti il prossimo passo.",
      },
      {
        title: "Un solo riferimento",
        description:
          "Mantieni un contatto unico anche quando la richiesta comprende più attività compatibili.",
      },
    ],
    metadata: {
      title: "Riparazioni domestiche a Gorizia",
      description:
        "Riparazioni domestiche a Gorizia e nei comuni vicini: piccoli interventi, montaggi e installazioni coordinati con semplicità da un unico team.",
    },
  },
] as const satisfies readonly ServiceArea[];
