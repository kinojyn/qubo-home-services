import type { ServiceDetail } from "@/features/services/types";

export const SERVICE_DETAILS = [
  {
    slug: "riparazioni-elettriche",
    icon: "electrical",
    title: "Riparazioni elettriche",
    eyebrow: "Piccoli interventi elettrici",
    headline: "Luce, prese e piccoli guasti. Sistemati con semplicità.",
    description: "Una presa da sostituire o una luce che non funziona? Ce ne occupiamo noi.",
    introduction:
      "Gestiamo i piccoli problemi elettrici di ogni giorno, con comunicazione chiara e un intervento organizzato intorno alle esigenze della tua casa.",
    benefits: [
      {
        title: "Un problema in meno",
        description: "Valutiamo il lavoro e ti spieghiamo cosa serve, senza termini complicati.",
      },
      {
        title: "Intervento ordinato",
        description: "Lavoriamo con cura e lasciamo lo spazio pulito al termine.",
      },
      {
        title: "Più lavori insieme",
        description: "Possiamo organizzare altri piccoli interventi nella stessa richiesta.",
      },
    ],
    problems: [
      "Prese o interruttori da sostituire",
      "Punti luce che non funzionano",
      "Lampade e plafoniere da installare",
      "Piccoli collegamenti elettrici domestici",
    ],
    faq: [
      {
        id: "electric-scope",
        question: "Quali lavori elettrici gestite?",
        answer:
          "Ci occupiamo di piccole riparazioni e installazioni domestiche. Gli impianti completi e gli interventi strutturali non rientrano nel servizio.",
      },
      {
        id: "electric-materials",
        question: "Devo acquistare prima il materiale?",
        answer:
          "Raccontaci cosa serve. Ti confermeremo in anticipo se occorre preparare o acquistare qualche componente.",
      },
      {
        id: "electric-multiple",
        question: "Posso aggiungere altri piccoli lavori?",
        answer:
          "Sì. Inserisci tutto nella richiesta e valuteremo come organizzare gli interventi nel modo più semplice.",
      },
    ],
    areaDescription:
      "Organizziamo piccoli interventi elettrici in Friuli Venezia Giulia, in base alla disponibilità e al tipo di lavoro richiesto.",
    relatedSlugs: ["tv-e-tende", "porte-e-serrature", "pittura-e-lavori-tuttofare"],
    metadata: {
      title: "Riparazioni elettriche in Friuli",
      description:
        "Piccole riparazioni elettriche domestiche in Friuli Venezia Giulia: prese, luci e installazioni gestite con chiarezza da QUBO e cura.",
    },
  },
  {
    slug: "piccoli-interventi-idraulici",
    icon: "plumbing",
    title: "Piccoli interventi idraulici",
    eyebrow: "Piccoli lavori idraulici",
    headline: "Un rubinetto perde? Riportiamo tutto alla normalità.",
    description:
      "Un rubinetto perde o la doccia va sistemata? Risolviamo il problema con semplicità.",
    introduction:
      "Dalle piccole perdite alle sostituzioni quotidiane, organizziamo interventi idraulici leggeri senza rendere la richiesta più complicata del problema.",
    benefits: [
      {
        title: "Richiesta semplice",
        description: "Descrivi il problema e ti aiutiamo a capire il prossimo passo.",
      },
      {
        title: "Lavoro mirato",
        description: "Ci concentriamo sul piccolo intervento concordato, con cura per gli spazi.",
      },
      {
        title: "Casa in ordine",
        description: "Completiamo il lavoro cercando di ridurre disagi e tempi inutili.",
      },
    ],
    problems: [
      "Rubinetti che perdono",
      "Soffioni e accessori doccia da sostituire",
      "Sifoni e scarichi da controllare",
      "Piccole sostituzioni idrauliche",
    ],
    faq: [
      {
        id: "plumbing-scope",
        question: "Gestite anche impianti idraulici completi?",
        answer:
          "No. Il servizio riguarda piccoli interventi domestici; impianti completi e lavori strutturali richiedono professionisti e valutazioni dedicate.",
      },
      {
        id: "plumbing-leak",
        question: "Cosa devo fare se c'è una perdita importante?",
        answer:
          "Chiudi l'acqua se puoi farlo in sicurezza e contatta subito un servizio di emergenza qualificato. La nostra richiesta online non sostituisce un pronto intervento.",
      },
      {
        id: "plumbing-parts",
        question: "Posso fornire io il nuovo rubinetto?",
        answer:
          "Sì. Indicalo nella richiesta, possibilmente con modello e misure, così potremo verificare i dettagli prima della visita.",
      },
    ],
    areaDescription:
      "Gestiamo piccoli interventi idraulici in Friuli Venezia Giulia, compatibilmente con la zona, la disponibilità e la natura del problema.",
    relatedSlugs: ["pittura-e-lavori-tuttofare", "montaggio-mobili", "porte-e-serrature"],
    metadata: {
      title: "Piccoli lavori idraulici in Friuli",
      description:
        "Piccoli interventi idraulici in Friuli Venezia Giulia per rubinetti, docce e sostituzioni domestiche, organizzati con semplicità e attenzione alla casa.",
    },
  },
  {
    slug: "montaggio-mobili",
    icon: "furniture",
    title: "Montaggio mobili",
    eyebrow: "Montaggio per la casa",
    headline: "Il nuovo mobile, montato con cura e senza stress.",
    description: "Hai acquistato un nuovo mobile? Lo montiamo con cura e lasciamo tutto in ordine.",
    introduction:
      "Ci occupiamo del montaggio di mobili e complementi domestici, seguendo le istruzioni del produttore e organizzando il lavoro in modo chiaro.",
    benefits: [
      {
        title: "Tempo risparmiato",
        description: "Eviti ore tra istruzioni, pezzi e utensili da preparare.",
      },
      {
        title: "Montaggio accurato",
        description: "Seguiamo i passaggi con attenzione e controlliamo il risultato.",
      },
      {
        title: "Spazio ordinato",
        description: "Al termine raccogliamo il materiale di lavoro e lasciamo l'area in ordine.",
      },
    ],
    problems: [
      "Armadi e cassettiere da montare",
      "Tavoli, sedie e scrivanie",
      "Mensole e piccoli complementi",
      "Mobili da regolare dopo il montaggio",
    ],
    faq: [
      {
        id: "furniture-boxes",
        question: "Il mobile deve essere ancora imballato?",
        answer:
          "Può esserlo. Assicurati che tutti i colli e le istruzioni siano disponibili nello spazio in cui verrà montato.",
      },
      {
        id: "furniture-wall",
        question: "Potete fissare il mobile alla parete?",
        answer:
          "Valutiamo il fissaggio in base al mobile, alla parete e agli accessori forniti. Descrivi questi dettagli nella richiesta.",
      },
      {
        id: "furniture-disposal",
        question: "Portate via gli imballaggi?",
        answer:
          "Il ritiro non è incluso automaticamente. Possiamo raccogliere e ordinare gli imballaggi nello spazio indicato.",
      },
    ],
    areaDescription:
      "Il servizio di montaggio mobili è disponibile in Friuli Venezia Giulia, previa conferma della zona e delle caratteristiche del prodotto.",
    relatedSlugs: ["tv-e-tende", "porte-e-serrature", "pittura-e-lavori-tuttofare"],
    metadata: {
      title: "Montaggio mobili per la casa in Friuli",
      description:
        "Montaggio di mobili, armadi, tavoli e complementi in Friuli Venezia Giulia, organizzato con cura e comunicazione semplice dal nostro team locale.",
    },
  },
  {
    slug: "tv-e-tende",
    icon: "media",
    title: "TV e tende",
    eyebrow: "Installazioni domestiche",
    headline: "TV e tende, installate nel posto giusto.",
    description: "TV da fissare o tende da installare? Sistemiamo ogni elemento nel posto giusto.",
    introduction:
      "Montiamo supporti TV, bastoni e accessori per tende dopo aver verificato parete, misure e componenti disponibili.",
    benefits: [
      {
        title: "Posizione concordata",
        description: "Definiamo insieme altezza e punto di installazione prima di iniziare.",
      },
      {
        title: "Fissaggio valutato",
        description:
          "Controlliamo supporto, parete e accessori per organizzare il lavoro corretto.",
      },
      {
        title: "Risultato pulito",
        description: "Curiamo allineamento e ordine dell'area di lavoro.",
      },
    ],
    problems: [
      "Supporti TV da installare",
      "Televisori da posizionare a parete",
      "Bastoni e binari per tende",
      "Accessori domestici da allineare e fissare",
    ],
    faq: [
      {
        id: "media-bracket",
        question: "Devo avere già il supporto TV?",
        answer:
          "Sì, oppure indicaci modello del televisore e parete nella richiesta. Ti confermeremo quali informazioni servono prima della visita.",
      },
      {
        id: "media-wall",
        question: "Installate su ogni tipo di parete?",
        answer:
          "Il fissaggio dipende da materiale, condizioni e accessibilità della parete. Lo valutiamo prima di confermare il lavoro.",
      },
      {
        id: "media-cables",
        question: "Nascondete anche i cavi dentro la parete?",
        answer:
          "Le opere murarie o elettriche complesse non sono incluse. Possiamo valutare soluzioni esterne semplici e ordinate.",
      },
    ],
    areaDescription:
      "Le installazioni di TV e tende sono disponibili in Friuli Venezia Giulia, dopo la verifica di zona, parete e materiali.",
    relatedSlugs: ["riparazioni-elettriche", "montaggio-mobili", "pittura-e-lavori-tuttofare"],
    metadata: {
      title: "Installazione TV e tende in Friuli",
      description:
        "Installazione di supporti TV, bastoni e tende in Friuli Venezia Giulia, con verifica della parete e lavoro organizzato con cura in ogni dettaglio.",
    },
  },
  {
    slug: "porte-e-serrature",
    icon: "doors",
    title: "Porte e serrature",
    eyebrow: "Porte e piccoli accessi",
    headline: "Porte che chiudono bene. Serrature che fanno il loro lavoro.",
    description:
      "Una porta non chiude bene o serve una nuova serratura? Pensiamo noi alla sistemazione.",
    introduction:
      "Interveniamo su piccole regolazioni, maniglie e sostituzioni leggere per rendere più semplice l'uso quotidiano di porte e accessi.",
    benefits: [
      {
        title: "Uso più semplice",
        description: "Correggiamo piccoli problemi che rendono scomoda una porta ogni giorno.",
      },
      {
        title: "Dettagli verificati",
        description: "Controlliamo misure, componenti e compatibilità prima del lavoro.",
      },
      {
        title: "Intervento chiaro",
        description:
          "Concordiamo cosa è possibile fare senza promettere lavori non adatti al servizio.",
      },
    ],
    problems: [
      "Porte interne da regolare",
      "Maniglie da sostituire",
      "Serrature domestiche non complesse",
      "Cerniere e piccoli accessori da sistemare",
    ],
    faq: [
      {
        id: "doors-emergency",
        question: "Fornite apertura porte di emergenza?",
        answer:
          "No. Per persone bloccate, porte blindate o urgenze di sicurezza contatta un fabbro specializzato o i servizi competenti.",
      },
      {
        id: "doors-lock",
        question: "Posso acquistare io la serratura?",
        answer:
          "Sì. Inviaci prima modello, misure e foto utili, evitando immagini che mostrino chiavi o informazioni di sicurezza sensibili.",
      },
      {
        id: "doors-exterior",
        question: "Installate porte esterne complete?",
        answer:
          "Il servizio copre piccoli interventi. Installazioni strutturali e sistemi di sicurezza complessi richiedono una valutazione specialistica.",
      },
    ],
    areaDescription:
      "Piccole regolazioni di porte e serrature sono disponibili in Friuli Venezia Giulia, in base al tipo di accesso e alla zona.",
    relatedSlugs: ["pittura-e-lavori-tuttofare", "montaggio-mobili", "riparazioni-elettriche"],
    metadata: {
      title: "Porte e serrature domestiche in Friuli",
      description:
        "Piccole regolazioni di porte, maniglie e serrature domestiche in Friuli Venezia Giulia, gestite con attenzione e indicazioni chiare in ogni fase.",
    },
  },
  {
    slug: "pittura-e-lavori-tuttofare",
    icon: "handyman",
    title: "Pittura e lavori tuttofare",
    eyebrow: "Piccoli lavori tuttofare",
    headline: "Quella lista di piccoli lavori? Finalmente completata.",
    description:
      "Un ritocco, una parete o una lista di piccoli lavori? Li gestiamo con un solo intervento.",
    introduction:
      "Raggruppiamo ritocchi, piccole sistemazioni e lavori diversi in una richiesta chiara, così puoi occuparti della casa con meno appuntamenti.",
    benefits: [
      {
        title: "Un'unica richiesta",
        description: "Raccontaci l'intera lista e ti aiutiamo a organizzarla per priorità.",
      },
      {
        title: "Meno appuntamenti",
        description: "Quando possibile, riuniamo più piccoli lavori nella stessa visita.",
      },
      {
        title: "Risultato curato",
        description: "Affrontiamo ogni attività concordata con ordine e attenzione agli spazi.",
      },
    ],
    problems: [
      "Ritocchi di pittura localizzati",
      "Mensole e accessori da fissare",
      "Piccole regolazioni domestiche",
      "Liste di lavori diversi da completare",
    ],
    faq: [
      {
        id: "handyman-list",
        question: "Quanti lavori posso inserire nella richiesta?",
        answer:
          "Inserisci tutto ciò che vorresti sistemare. Valuteremo insieme priorità, tempi e quali attività possono essere riunite.",
      },
      {
        id: "handyman-paint",
        question: "Fate anche tinteggiature complete?",
        answer:
          "Gestiamo ritocchi e piccoli lavori di pittura. Interi edifici o grandi ristrutturazioni non rientrano nel servizio.",
      },
      {
        id: "handyman-materials",
        question: "Come preparo i materiali?",
        answer:
          "Descrivi i lavori e ci accorderemo su ciò che deve essere disponibile prima dell'intervento.",
      },
    ],
    areaDescription:
      "Pittura leggera e lavori tuttofare sono disponibili in Friuli Venezia Giulia, previa verifica della lista e della zona.",
    relatedSlugs: ["montaggio-mobili", "porte-e-serrature", "piccoli-interventi-idraulici"],
    metadata: {
      title: "Lavori tuttofare e pittura in Friuli",
      description:
        "Ritocchi di pittura e piccoli lavori tuttofare in Friuli Venezia Giulia, riuniti in una richiesta semplice e gestiti da un unico team con cura.",
    },
  },
] as const satisfies readonly ServiceDetail[];
