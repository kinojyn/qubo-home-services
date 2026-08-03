import type { Locale } from "@/types/locale";

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceFaq {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceLocale {
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  introduction: string;
  benefits: readonly ServiceBenefit[];
  problems: readonly string[];
  faq: readonly ServiceFaq[];
  areaDescription: string;
  metadata: {
    title: string;
    description: string;
  };
}

export type ServiceSlug =
  | "riparazioni-elettriche"
  | "piccoli-interventi-idraulici"
  | "montaggio-mobili"
  | "tv-e-tende"
  | "porte-e-serrature"
  | "pittura-e-lavori-tuttofare";

export const SERVICE_DETAILS_LOCALE: Record<Locale, Record<ServiceSlug, ServiceLocale>> = {
  it: {
    "riparazioni-elettriche": {
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
      metadata: {
        title: "Riparazioni elettriche in Friuli",
        description:
          "Piccole riparazioni elettriche domestiche in Friuli Venezia Giulia: prese, luci e installazioni gestite con chiarezza da QUBO e cura.",
      },
    },
    "piccoli-interventi-idraulici": {
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
      metadata: {
        title: "Piccoli lavori idraulici in Friuli",
        description:
          "Piccoli interventi idraulici in Friuli Venezia Giulia per rubinetti, docce e sostituzioni domestiche, organizzati con semplicità e attenzione alla casa.",
      },
    },
    "montaggio-mobili": {
      title: "Montaggio mobili",
      eyebrow: "Montaggio per la casa",
      headline: "Il nuovo mobile, montato con cura e senza stress.",
      description:
        "Hai acquistato un nuovo mobile? Lo montiamo con cura e lasciamo tutto in ordine.",
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
      metadata: {
        title: "Montaggio mobili per la casa in Friuli",
        description:
          "Montaggio di mobili, armadi, tavoli e complementi in Friuli Venezia Giulia, organizzato con cura e comunicazione semplice dal nostro team locale.",
      },
    },
    "tv-e-tende": {
      title: "TV e tende",
      eyebrow: "Installazioni domestiche",
      headline: "TV e tende, installate nel posto giusto.",
      description:
        "TV da fissare o tende da installare? Sistemiamo ogni elemento nel posto giusto.",
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
      metadata: {
        title: "Installazione TV e tende in Friuli",
        description:
          "Installazione di supporti TV, bastoni e tende in Friuli Venezia Giulia, con verifica della parete e lavoro organizzato con cura in ogni dettaglio.",
      },
    },
    "porte-e-serrature": {
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
      metadata: {
        title: "Porte e serrature domestiche in Friuli",
        description:
          "Piccole regolazioni di porte, maniglie e serrature domestiche in Friuli Venezia Giulia, gestite con attenzione e indicazioni chiare in ogni fase.",
      },
    },
    "pittura-e-lavori-tuttofare": {
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
      metadata: {
        title: "Lavori tuttofare e pittura in Friuli",
        description:
          "Ritocchi di pittura e piccoli lavori tuttofare in Friuli Venezia Giulia, riuniti in una richiesta semplice e gestiti da un unico team con cura.",
      },
    },
  },
  en: {
    "riparazioni-elettriche": {
      title: "Electrical repairs",
      eyebrow: "Small electrical jobs",
      headline: "Lights, sockets, and small faults. Fixed simply.",
      description: "A socket to replace or a light that doesn't work? We'll take care of it.",
      introduction:
        "We handle everyday small electrical problems with clear communication and a service organised around your home's needs.",
      benefits: [
        {
          title: "One less problem",
          description: "We assess the job and explain what's needed without complicated terms.",
        },
        {
          title: "Tidy work",
          description: "We work carefully and leave the space clean when finished.",
        },
        {
          title: "Multiple jobs together",
          description: "We can organise other small jobs in the same request.",
        },
      ],
      problems: [
        "Sockets or switches to replace",
        "Lights that don't work",
        "Lamps and ceiling lights to install",
        "Small household electrical connections",
      ],
      faq: [
        {
          id: "electric-scope",
          question: "What electrical work do you handle?",
          answer:
            "We handle small household repairs and installations. Complete systems and structural work are not part of the service.",
        },
        {
          id: "electric-materials",
          question: "Do I need to buy the materials first?",
          answer:
            "Tell us what's needed. We'll confirm in advance if any components need to be prepared or purchased.",
        },
        {
          id: "electric-multiple",
          question: "Can I add other small jobs?",
          answer:
            "Yes. Include everything in your request and we'll evaluate how to organise the work in the simplest way.",
        },
      ],
      areaDescription:
        "We organise small electrical jobs in Friuli Venezia Giulia, based on availability and the type of work requested.",
      metadata: {
        title: "Electrical repairs in Friuli",
        description:
          "Small household electrical repairs in Friuli Venezia Giulia: sockets, lights, and installations handled clearly by QUBO with care.",
      },
    },
    "piccoli-interventi-idraulici": {
      title: "Small plumbing jobs",
      eyebrow: "Small plumbing work",
      headline: "A tap leaking? Let's get everything back to normal.",
      description: "A tap leaking or a shower that needs fixing? We solve the problem simply.",
      introduction:
        "From small leaks to everyday replacements, we organise light plumbing jobs without making the request more complicated than the problem.",
      benefits: [
        {
          title: "Simple request",
          description: "Describe the problem and we'll help you understand the next step.",
        },
        {
          title: "Focused work",
          description: "We concentrate on the agreed small job, with care for the spaces.",
        },
        {
          title: "Home in order",
          description: "We complete the work trying to reduce inconvenience and unnecessary time.",
        },
      ],
      problems: [
        "Leaking taps",
        "Shower heads and accessories to replace",
        "Traps and drains to check",
        "Small plumbing replacements",
      ],
      faq: [
        {
          id: "plumbing-scope",
          question: "Do you also handle complete plumbing systems?",
          answer:
            "No. The service covers small household jobs; complete systems and structural work require specialised professionals and dedicated assessments.",
        },
        {
          id: "plumbing-leak",
          question: "What should I do if there's a major leak?",
          answer:
            "Turn off the water if safe to do so and contact a qualified emergency service immediately. Our online request does not replace an emergency service.",
        },
        {
          id: "plumbing-parts",
          question: "Can I supply the new tap myself?",
          answer:
            "Yes. Indicate it in your request, preferably with model and measurements, so we can verify the details before the visit.",
        },
      ],
      areaDescription:
        "We handle small plumbing jobs in Friuli Venezia Giulia, depending on the area, availability, and nature of the problem.",
      metadata: {
        title: "Small plumbing jobs in Friuli",
        description:
          "Small plumbing jobs in Friuli Venezia Giulia for taps, showers, and household replacements, organised simply with care for your home.",
      },
    },
    "montaggio-mobili": {
      title: "Furniture assembly",
      eyebrow: "Home assembly",
      headline: "Your new furniture, assembled with care and without stress.",
      description: "Bought new furniture? We assemble it carefully and leave everything tidy.",
      introduction:
        "We handle the assembly of furniture and home furnishings, following the manufacturer's instructions and organising the work clearly.",
      benefits: [
        {
          title: "Time saved",
          description: "You avoid hours of instructions, pieces, and tools to prepare.",
        },
        {
          title: "Accurate assembly",
          description: "We follow the steps carefully and check the result.",
        },
        {
          title: "Tidy space",
          description: "When done, we gather the work materials and leave the area in order.",
        },
      ],
      problems: [
        "Wardrobes and chests of drawers to assemble",
        "Tables, chairs, and desks",
        "Shelves and small furnishings",
        "Furniture to adjust after assembly",
      ],
      faq: [
        {
          id: "furniture-boxes",
          question: "Does the furniture still need to be boxed?",
          answer:
            "It can be. Make sure all packages and instructions are available in the space where it will be assembled.",
        },
        {
          id: "furniture-wall",
          question: "Can you fix the furniture to the wall?",
          answer:
            "We evaluate the fixing based on the furniture, wall, and supplied accessories. Describe these details in your request.",
        },
        {
          id: "furniture-disposal",
          question: "Do you take away the packaging?",
          answer:
            "Removal is not automatically included. We can gather and sort the packaging in the designated space.",
        },
      ],
      areaDescription:
        "Furniture assembly service is available in Friuli Venezia Giulia, subject to confirmation of the area and product characteristics.",
      metadata: {
        title: "Home furniture assembly in Friuli",
        description:
          "Assembly of furniture, wardrobes, tables, and furnishings in Friuli Venezia Giulia, organised with care and simple communication by our local team.",
      },
    },
    "tv-e-tende": {
      title: "TV and blinds",
      eyebrow: "Home installations",
      headline: "TV and blinds, installed in the right place.",
      description: "TV to mount or blinds to install? We set everything in the right place.",
      introduction:
        "We mount TV brackets, curtain poles, and accessories after checking the wall, measurements, and available components.",
      benefits: [
        {
          title: "Agreed position",
          description: "We define the height and installation point together before starting.",
        },
        {
          title: "Fixing assessed",
          description: "We check the bracket, wall, and accessories to organise the correct work.",
        },
        {
          title: "Clean result",
          description: "We take care of alignment and tidiness of the work area.",
        },
      ],
      problems: [
        "TV brackets to install",
        "Televisions to position on the wall",
        "Curtain poles and tracks",
        "Home accessories to align and fix",
      ],
      faq: [
        {
          id: "media-bracket",
          question: "Do I need to have the TV bracket already?",
          answer:
            "Yes, or tell us the TV model and wall in your request. We'll confirm what information is needed before the visit.",
        },
        {
          id: "media-wall",
          question: "Do you install on all wall types?",
          answer:
            "The fixing depends on the material, condition, and accessibility of the wall. We evaluate it before confirming the job.",
        },
        {
          id: "media-cables",
          question: "Do you also hide cables inside the wall?",
          answer:
            "Complex masonry or electrical work is not included. We can evaluate simple and tidy external solutions.",
        },
      ],
      areaDescription:
        "TV and blind installations are available in Friuli Venezia Giulia, after checking the area, wall, and materials.",
      metadata: {
        title: "TV and blind installation in Friuli",
        description:
          "Installation of TV brackets, curtain poles, and blinds in Friuli Venezia Giulia, with wall assessment and carefully organised work in every detail.",
      },
    },
    "porte-e-serrature": {
      title: "Doors and locks",
      eyebrow: "Doors and small access",
      headline: "Doors that close properly. Locks that do their job.",
      description: "A door that doesn't close properly or need a new lock? We'll sort it out.",
      introduction:
        "We handle small adjustments, handles, and light replacements to make daily use of doors and access points simpler.",
      benefits: [
        {
          title: "Easier use",
          description: "We fix small problems that make a door uncomfortable every day.",
        },
        {
          title: "Details checked",
          description: "We check measurements, components, and compatibility before the job.",
        },
        {
          title: "Clear work",
          description:
            "We agree on what's possible without promising work not suited to the service.",
        },
      ],
      problems: [
        "Internal doors to adjust",
        "Handles to replace",
        "Non-complex household locks",
        "Hinges and small accessories to fix",
      ],
      faq: [
        {
          id: "doors-emergency",
          question: "Do you provide emergency door opening?",
          answer:
            "No. For locked-in persons, security doors, or safety emergencies, contact a specialised locksmith or competent services.",
        },
        {
          id: "doors-lock",
          question: "Can I purchase the lock myself?",
          answer:
            "Yes. Send us the model, measurements, and useful photos first, avoiding images showing keys or sensitive security information.",
        },
        {
          id: "doors-exterior",
          question: "Do you install complete external doors?",
          answer:
            "The service covers small jobs. Structural installations and complex security systems require specialist assessment.",
        },
      ],
      areaDescription:
        "Small door and lock adjustments are available in Friuli Venezia Giulia, based on the type of access and the area.",
      metadata: {
        title: "Doors and household locks in Friuli",
        description:
          "Small adjustments of doors, handles, and household locks in Friuli Venezia Giulia, managed with attention and clear guidance at every stage.",
      },
    },
    "pittura-e-lavori-tuttofare": {
      title: "Painting and handyman jobs",
      eyebrow: "Small handyman work",
      headline: "That list of small jobs? Finally completed.",
      description: "A touch-up, a wall, or a list of small jobs? We handle them in a single visit.",
      introduction:
        "We group touch-ups, small fixes, and various jobs into one clear request, so you can take care of your home with fewer appointments.",
      benefits: [
        {
          title: "Single request",
          description: "Tell us the entire list and we'll help you organise it by priority.",
        },
        {
          title: "Fewer appointments",
          description: "When possible, we combine multiple small jobs in the same visit.",
        },
        {
          title: "Careful result",
          description: "We tackle each agreed activity with order and attention to the spaces.",
        },
      ],
      problems: [
        "Localised paint touch-ups",
        "Shelves and accessories to fix",
        "Small household adjustments",
        "Lists of various jobs to complete",
      ],
      faq: [
        {
          id: "handyman-list",
          question: "How many jobs can I include in the request?",
          answer:
            "Include everything you'd like fixed. We'll evaluate priorities, timing, and which activities can be combined together.",
        },
        {
          id: "handyman-paint",
          question: "Do you also do full painting jobs?",
          answer:
            "We handle touch-ups and small painting work. Entire buildings or major renovations are not part of the service.",
        },
        {
          id: "handyman-materials",
          question: "How do I prepare the materials?",
          answer:
            "Describe the jobs and we'll agree on what needs to be available before the work.",
        },
      ],
      areaDescription:
        "Light painting and handyman jobs are available in Friuli Venezia Giulia, subject to verification of the list and the area.",
      metadata: {
        title: "Handyman and painting jobs in Friuli",
        description:
          "Paint touch-ups and small handyman jobs in Friuli Venezia Giulia, combined in one simple request and managed by a single team with care.",
      },
    },
  },
  de: {
    "riparazioni-elettriche": {
      title: "Elektroreparaturen",
      eyebrow: "Kleine Elektroarbeiten",
      headline: "Licht, Steckdosen und kleine Störungen. Einfach behoben.",
      description:
        "Eine Steckdose austauschen oder ein Licht, das nicht funktioniert? Wir kümmern uns darum.",
      introduction:
        "Wir erledigen die täglichen kleinen Elektroprobleme mit klarer Kommunikation und einem Service, der auf die Bedürfnisse Ihres Zuhauses abgestimmt ist.",
      benefits: [
        {
          title: "Ein Problem weniger",
          description:
            "Wir bewerten die Arbeit und erklären, was benötigt wird, ohne komplizierte Fachbegriffe.",
        },
        {
          title: "Ordnung bei der Arbeit",
          description: "Wir arbeiten sorgfältig und hinterlassen den Raum sauber.",
        },
        {
          title: "Mehrere Arbeiten zusammen",
          description: "Wir können weitere kleine Arbeiten in derselben Anfrage organisieren.",
        },
      ],
      problems: [
        "Steckdosen oder Schalter ersetzen",
        "Nicht funktionierende Lichtpunkte",
        "Lampen und Deckenleuchten installieren",
        "Kleine elektrische Hausanschlüsse",
      ],
      faq: [
        {
          id: "electric-scope",
          question: "Welche Elektroarbeiten führen Sie durch?",
          answer:
            "Wir führen kleine Reparaturen und Installationen im Haushalt durch. Komplette Anlagen und strukturelle Arbeiten sind nicht Teil des Services.",
        },
        {
          id: "electric-materials",
          question: "Muss ich das Material vorher kaufen?",
          answer:
            "Teilen Sie uns mit, was benötigt wird. Wir bestätigen im Voraus, ob Komponenten vorbereitet oder gekauft werden müssen.",
        },
        {
          id: "electric-multiple",
          question: "Kann ich weitere kleine Arbeiten hinzufügen?",
          answer:
            "Ja. Fügen Sie alles in Ihre Anfrage ein, und wir bewerten, wie die Arbeiten am einfachsten organisiert werden können.",
        },
      ],
      areaDescription:
        "Wir organisieren kleine Elektroarbeiten in Friaul Julisch Venetien, je nach Verfügbarkeit und Art der angeforderten Arbeit.",
      metadata: {
        title: "Elektroreparaturen in Friaul",
        description:
          "Kleine elektrische Haushaltsreparaturen in Friaul Julisch Venetien: Steckdosen, Beleuchtung und Installationen, klar und sorgfältig von QUBO durchgeführt.",
      },
    },
    "piccoli-interventi-idraulici": {
      title: "Kleine Sanitärarbeiten",
      eyebrow: "Kleine Sanitärarbeiten",
      headline: "Ein Wasserhahn tropft? Wir bringen alles wieder in Ordnung.",
      description:
        "Ein tropfender Wasserhahn oder eine Dusche, die repariert werden muss? Wir lösen das Problem einfach.",
      introduction:
        "Von kleinen Lecks bis zu alltäglichen Austauscharbeiten organisieren wir leichte Sanitäreinsätze, ohne die Anfrage komplizierter zu machen als das Problem.",
      benefits: [
        {
          title: "Einfache Anfrage",
          description:
            "Beschreiben Sie das Problem, und wir helfen Ihnen, den nächsten Schritt zu verstehen.",
        },
        {
          title: "Gezielte Arbeit",
          description:
            "Wir konzentrieren uns auf die vereinbarte kleine Arbeit, mit Rücksicht auf die Räumlichkeiten.",
        },
        {
          title: "Zuhause in Ordnung",
          description:
            "Wir schließen die Arbeit ab und versuchen, Unannehmlichkeiten und unnötige Zeit zu vermeiden.",
        },
      ],
      problems: [
        "Tropfende Wasserhähne",
        "Duschköpfe und Zubehör ersetzen",
        "Siphons und Abflüsse prüfen",
        "Kleine Sanitäraustauscharbeiten",
      ],
      faq: [
        {
          id: "plumbing-scope",
          question: "Führen Sie auch komplette Sanitäranlagen durch?",
          answer:
            "Nein. Der Service umfasst kleine Haushaltsarbeiten; komplette Anlagen und strukturelle Arbeiten erfordern spezialisierte Fachkräfte und gesonderte Bewertungen.",
        },
        {
          id: "plumbing-leak",
          question: "Was soll ich bei einem größeren Leck tun?",
          answer:
            "Stellen Sie das Wasser ab, wenn es sicher ist, und kontaktieren Sie sofort einen qualifizierten Notdienst. Unsere Online-Anfrage ersetzt keinen Notfalleinsatz.",
        },
        {
          id: "plumbing-parts",
          question: "Kann ich den neuen Wasserhahn selbst mitbringen?",
          answer:
            "Ja. Geben Sie es in Ihrer Anfrage an, möglichst mit Modell und Maßen, damit wir die Details vor dem Besuch prüfen können.",
        },
      ],
      areaDescription:
        "Wir führen kleine Sanitärarbeiten in Friaul Julisch Venetien durch, abhängig vom Gebiet, der Verfügbarkeit und der Art des Problems.",
      metadata: {
        title: "Kleine Sanitärarbeiten in Friaul",
        description:
          "Kleine Sanitärarbeiten in Friaul Julisch Venetien für Wasserhähne, Duschen und Haushaltsaustausche, einfach und sorgfältig organisiert.",
      },
    },
    "montaggio-mobili": {
      title: "Möbelmontage",
      eyebrow: "Montage für zuhause",
      headline: "Die neuen Möbel, sorgfältig montiert und ohne Stress.",
      description:
        "Neue Möbel gekauft? Wir montieren sie sorgfältig und hinterlassen alles ordentlich.",
      introduction:
        "Wir kümmern uns um die Montage von Möbeln und Wohneinrichtungen, befolgen die Anweisungen des Herstellers und organisieren die Arbeit klar.",
      benefits: [
        {
          title: "Zeit gespart",
          description:
            "Sie vermeiden stundenlanges Lesen von Anleitungen und Vorbereiten von Teilen und Werkzeugen.",
        },
        {
          title: "Sorgfältige Montage",
          description: "Wir befolgen die Schritte genau und überprüfen das Ergebnis.",
        },
        {
          title: "Ordnung am Arbeitsplatz",
          description:
            "Nach Abschluss sammeln wir das Arbeitsmaterial und hinterlassen den Bereich in Ordnung.",
        },
      ],
      problems: [
        "Schränke und Kommoden montieren",
        "Tische, Stühle und Schreibtische",
        "Regale und kleine Einrichtungsgegenstände",
        "Möbel nach der Montage nachjustieren",
      ],
      faq: [
        {
          id: "furniture-boxes",
          question: "Müssen die Möbel noch verpackt sein?",
          answer:
            "Das können sie. Stellen Sie sicher, dass alle Pakete und Anleitungen im Raum verfügbar sind, in dem die Montage erfolgen soll.",
        },
        {
          id: "furniture-wall",
          question: "Können Sie die Möbel an der Wand befestigen?",
          answer:
            "Wir bewerten die Befestigung basierend auf Möbel, Wand und mitgeliefertem Zubehör. Beschreiben Sie diese Details in Ihrer Anfrage.",
        },
        {
          id: "furniture-disposal",
          question: "Entsorgen Sie die Verpackung?",
          answer:
            "Die Abholung ist nicht automatisch inbegriffen. Wir können die Verpackung sammeln und am angegebenen Ort ordnen.",
        },
      ],
      areaDescription:
        "Der Möbelmontageservice ist in Friaul Julisch Venetien verfügbar, vorbehaltlich der Bestätigung des Gebiets und der Produkteigenschaften.",
      metadata: {
        title: "Möbelmontage für zuhause in Friaul",
        description:
          "Montage von Möbeln, Schränken, Tischen und Einrichtungsgegenständen in Friaul Julisch Venetien, sorgfältig und klar kommuniziert von unserem lokalen Team.",
      },
    },
    "tv-e-tende": {
      title: "TV und Vorhänge",
      eyebrow: "Hausinstallationen",
      headline: "TV und Vorhänge, am richtigen Platz installiert.",
      description:
        "TV zu montieren oder Vorhänge zu installieren? Wir bringen jedes Element an den richtigen Platz.",
      introduction:
        "Wir montieren TV-Halterungen, Gardinenstangen und Zubehör nach Prüfung von Wand, Maßen und verfügbaren Komponenten.",
      benefits: [
        {
          title: "Abgestimmte Position",
          description: "Wir legen gemeinsam Höhe und Installationspunkt fest, bevor wir beginnen.",
        },
        {
          title: "Befestigung geprüft",
          description:
            "Wir kontrollieren Halterung, Wand und Zubehör, um die korrekte Arbeit zu organisieren.",
        },
        {
          title: "Sauberes Ergebnis",
          description: "Wir achten auf Ausrichtung und Ordnung des Arbeitsbereichs.",
        },
      ],
      problems: [
        "TV-Halterungen installieren",
        "Fernseher an der Wand positionieren",
        "Gardinenstangen und -schienen",
        "Haushaltszubehör ausrichten und befestigen",
      ],
      faq: [
        {
          id: "media-bracket",
          question: "Muss ich die TV-Halterung bereits haben?",
          answer:
            "Ja, oder teilen Sie uns Modell des Fernsehers und Wand in Ihrer Anfrage mit. Wir bestätigen, welche Informationen vor dem Besuch benötigt werden.",
        },
        {
          id: "media-wall",
          question: "Installieren Sie auf allen Wandarten?",
          answer:
            "Die Befestigung hängt von Material, Zustand und Zugänglichkeit der Wand ab. Wir bewerten es vor der Bestätigung der Arbeit.",
        },
        {
          id: "media-cables",
          question: "Verstecken Sie auch Kabel in der Wand?",
          answer:
            "Komplexe Maurer- oder Elektroarbeiten sind nicht enthalten. Wir können einfache und ordentliche externe Lösungen bewerten.",
        },
      ],
      areaDescription:
        "TV- und Vorhanginstallationen sind in Friaul Julisch Venetien verfügbar, nach Überprüfung von Gebiet, Wand und Materialien.",
      metadata: {
        title: "TV- und Vorhanginstallation in Friaul",
        description:
          "Installation von TV-Halterungen, Gardinenstangen und Vorhängen in Friaul Julisch Venetien, mit Wandprüfung und sorgfältig organisierter Arbeit.",
      },
    },
    "porte-e-serrature": {
      title: "Türen und Schlösser",
      eyebrow: "Türen und kleine Zugänge",
      headline: "Türen, die richtig schließen. Schlösser, die ihre Arbeit tun.",
      description:
        "Eine Tür schließt nicht richtig oder ein neues Schloss wird benötigt? Wir kümmern uns darum.",
      introduction:
        "Wir führen kleine Einstellungen, Griffwechsel und leichte Austauscharbeiten durch, um die tägliche Nutzung von Türen und Zugängen zu erleichtern.",
      benefits: [
        {
          title: "Einfachere Nutzung",
          description: "Wir beheben kleine Probleme, die eine Tür jeden Tag unangenehm machen.",
        },
        {
          title: "Details geprüft",
          description: "Wir kontrollieren Maße, Komponenten und Kompatibilität vor der Arbeit.",
        },
        {
          title: "Klare Arbeit",
          description:
            "Wir vereinbaren, was möglich ist, ohne Arbeiten zu versprechen, die nicht zum Service passen.",
        },
      ],
      problems: [
        "Innentüren einstellen",
        "Türklinken ersetzen",
        "Einfache Haushaltsschlösser",
        "Scharniere und Kleinzubehör reparieren",
      ],
      faq: [
        {
          id: "doors-emergency",
          question: "Bieten Sie Notfall-Türöffnungen an?",
          answer:
            "Nein. Bei eingeschlossenen Personen, Sicherheitstüren oder Notfällen wenden Sie sich an einen spezialisierten Schlüsseldienst oder zuständige Dienste.",
        },
        {
          id: "doors-lock",
          question: "Kann ich das Schloss selbst kaufen?",
          answer:
            "Ja. Senden Sie uns vorher Modell, Maße und nützliche Fotos, vermeiden Sie jedoch Bilder, die Schlüssel oder sensible Sicherheitsinformationen zeigen.",
        },
        {
          id: "doors-exterior",
          question: "Installieren Sie komplette Außentüren?",
          answer:
            "Der Service umfasst kleine Arbeiten. Strukturelle Installationen und komplexe Sicherheitssysteme erfordern eine spezialistische Bewertung.",
        },
      ],
      areaDescription:
        "Kleine Einstellungen an Türen und Schlössern sind in Friaul Julisch Venetien verfügbar, je nach Zugangstyp und Gebiet.",
      metadata: {
        title: "Türen und Haushaltsschlösser in Friaul",
        description:
          "Kleine Einstellungen an Türen, Türklinken und Haushaltsschlössern in Friaul Julisch Venetien, sorgfältig mit klaren Anweisungen in jeder Phase.",
      },
    },
    "pittura-e-lavori-tuttofare": {
      title: "Malerei und Handwerksarbeiten",
      eyebrow: "Kleine Handwerksarbeiten",
      headline: "Diese Liste kleiner Arbeiten? Endlich erledigt.",
      description:
        "Eine Ausbesserung, eine Wand oder eine Liste kleiner Arbeiten? Wir erledigen sie in einem einzigen Einsatz.",
      introduction:
        "Wir bündeln Ausbesserungen, kleine Reparaturen und verschiedene Arbeiten in einer klaren Anfrage, damit Sie sich mit weniger Terminen um Ihr Zuhause kümmern können.",
      benefits: [
        {
          title: "Eine einzige Anfrage",
          description:
            "Teilen Sie uns die gesamte Liste mit, und wir helfen Ihnen, sie nach Priorität zu ordnen.",
        },
        {
          title: "Weniger Termine",
          description:
            "Wenn möglich, fassen wir mehrere kleine Arbeiten im selben Besuch zusammen.",
        },
        {
          title: "Sorgfältiges Ergebnis",
          description: "Wir gehen jede vereinbarte Tätigkeit mit Ordnung und Sorgfalt an.",
        },
      ],
      problems: [
        "Lokale Farbausbesserungen",
        "Regale und Zubehör befestigen",
        "Kleine Haushaltseinstellungen",
        "Listen verschiedener zu erledigender Arbeiten",
      ],
      faq: [
        {
          id: "handyman-list",
          question: "Wie viele Arbeiten kann ich in die Anfrage aufnehmen?",
          answer:
            "Fügen Sie alles hinzu, was Sie erledigt haben möchten. Wir bewerten gemeinsam Prioritäten, Zeitrahmen und welche Aktivitäten zusammengefasst werden können.",
        },
        {
          id: "handyman-paint",
          question: "Machen Sie auch komplette Malerarbeiten?",
          answer:
            "Wir führen Ausbesserungen und kleine Malerarbeiten durch. Ganze Gebäude oder große Renovierungen sind nicht Teil des Services.",
        },
        {
          id: "handyman-materials",
          question: "Wie bereite ich die Materialien vor?",
          answer:
            "Beschreiben Sie die Arbeiten, und wir vereinbaren, was vor dem Einsatz bereitgestellt werden muss.",
        },
      ],
      areaDescription:
        "Leichte Maler- und Handwerksarbeiten sind in Friaul Julisch Venetien verfügbar, vorbehaltlich Prüfung der Liste und des Gebiets.",
      metadata: {
        title: "Handwerks- und Malerarbeiten in Friaul",
        description:
          "Farbausbesserungen und kleine Handwerksarbeiten in Friaul Julisch Venetien, gebündelt in einer einfachen Anfrage und sorgfältig von einem Team durchgeführt.",
      },
    },
  },
};
