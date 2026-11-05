export type LegalSection = {
  paragraphs: readonly string[];
  title: string;
};

export type LegalDocument = {
  description: string;
  eyebrow: string;
  path: string;
  sections: readonly LegalSection[];
  title: string;
};

export const LEGAL_REVIEW_DATE = "19 luglio 2026";

const COMPANY_NAME = "QUBO";
const PRIVACY_EMAIL = "qubo.servizi@proton.me";
const CONTACT_PHONE = "+39 320 139 1900";

export const PRIVACY_DOCUMENT: LegalDocument = {
  title: "Informativa sulla privacy",
  description:
    "La presente Informativa sulla Privacy descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web di QUBO, in conformità al Regolamento UE 2016/679 (GDPR) e alla normativa italiana in materia di protezione dei dati.",
  eyebrow: "Privacy",
  path: "/privacy",
  sections: [
    {
      title: "Introduzione",
      paragraphs: [
        "La protezione dei dati personali è un impegno fondamentale per QUBO. La presente informativa è redatta ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018.",
        'Ti invitiamo a leggere attentamente questo documento prima di fornirci qualsiasi dato personale. Per qualsiasi chiarimento, puoi contattarci utilizzando i recapiti indicati nella sezione "Come contattarci".',
      ],
    },
    {
      title: "Contatti per la privacy",
      paragraphs: [
        `${COMPANY_NAME} è un progetto imprenditoriale in fase di costituzione. I dati inviati tramite il sito sono trattati esclusivamente per rispondere alle richieste e organizzare gli interventi richiesti.`,
        `Per domande sul trattamento dei dati o per esercitare i propri diritti: ${PRIVACY_EMAIL}.`,
        `Telefono di contatto: ${CONTACT_PHONE}.`,
      ],
    },
    {
      title: "Dati personali raccolti",
      paragraphs: [
        "Raccogliamo solo i dati personali necessari per erogare i servizi richiesti. Le categorie di dati trattati includono:",
        "Dati identificativi e di contatto: nome, cognome, numero di telefono, indirizzo email e indirizzo di residenza (solo se necessario per la prestazione del servizio). Questi dati sono forniti volontariamente dall'utente tramite i moduli di contatto e richiesta preventivo.",
        "Dati relativi al servizio richiesto: descrizione del problema, tipo di intervento, indirizzo dell'immobile, eventuali foto o documenti allegati alla richiesta.",
        "Dati di navigazione: indirizzo IP, tipo di browser, sistema operativo, pagine visitate, data e ora della visita. Questi dati sono raccolti automaticamente per finalità tecniche e statistiche.",
      ],
    },
    {
      title: "Dati tecnici di navigazione",
      paragraphs: [
        "Durante la normale navigazione, i sistemi informatici e le procedure software preposte al funzionamento del sito acquisiscono alcuni dati la cui trasmissione è implicita nell'uso dei protocolli di comunicazione Internet.",
        "Si tratta di informazioni che non vengono raccolte per essere associate a soggetti identificati, ma che per loro stessa natura potrebbero, attraverso elaborazioni e associazioni, permettere di identificare gli utenti.",
        "Questi dati vengono utilizzati al solo fine di ricavare informazioni statistiche anonime sull'uso del sito e per verificarne il corretto funzionamento, e vengono cancellati dopo 30 giorni.",
      ],
    },
    {
      title: "Cookie e tecnologie simili",
      paragraphs: [
        "Questo sito utilizza cookie e tecnologie di tracciamento per garantire il corretto funzionamento delle pagine e migliorare l'esperienza di navigazione.",
        "Per informazioni dettagliate sui cookie utilizzati, consulta la nostra Informativa sui Cookie disponibile nella sezione dedicata.",
        "L'utente può gestire liberamente le proprie preferenze sui cookie tramite il pannello delle preferenze accessibile dal sito.",
        "Dal 5 novembre 2026, solo con il consenso alla categoria marketing, utilizziamo Meta Pixel (Meta Platforms Ireland Limited) per misurare le visite al sito e i clic sui pulsanti della pagina pubblicitaria. Meta può ricevere indirizzi delle pagine e informazioni tecniche del browser e associare gli eventi ai propri identificatori. Non inviamo intenzionalmente contenuti dei moduli, email o numeri di telefono e non abilitiamo il matching avanzato automatico. Un clic su WhatsApp è un'interazione di contatto, non una richiesta o un ordine confermato. Puoi revocare il consenso da Preferenze cookie. Informazioni Meta: https://www.facebook.com/privacy/policy/ e https://www.facebook.com/policies/cookies/.",
      ],
    },
    {
      title: "Finalità del trattamento",
      paragraphs: [
        "I dati personali sono trattati per le seguenti finalità:",
        "a) Rispondere alle richieste di contatto e preventivo inviate tramite i moduli del sito.",
        "b) Erogare i servizi richiesti, inclusa la programmazione di appuntamenti e la gestione delle comunicazioni relative agli interventi.",
        "c) Adempiere agli obblighi legali e fiscali connessi all'attività svolta.",
        "d) Migliorare l'esperienza di navigazione attraverso l'analisi statistica aggregata (solo previo consenso).",
        "e) Inviare comunicazioni commerciali e promozionali relative ai servizi di QUBO (solo previo consenso esplicito).",
      ],
    },
    {
      title: "Base giuridica del trattamento",
      paragraphs: [
        "Il trattamento dei dati si basa sulle seguenti basi giuridiche, ai sensi dell'art. 6 del GDPR:",
        "Esecuzione di un contratto o di misure precontrattuali: per le richieste di preventivo e l'erogazione dei servizi (art. 6, par. 1, lett. b).",
        "Adempimento di un obbligo legale: per la gestione degli obblighi fiscali, contabili e amministrativi (art. 6, par. 1, lett. c).",
        "Legittimo interesse: per finalità di sicurezza informatica, miglioramento del servizio e statistica interna (art. 6, par. 1, lett. f).",
        "Consenso dell'interessato: per l'invio di comunicazioni marketing e l'utilizzo di cookie non essenziali (art. 6, par. 1, lett. a). Il consenso è revocabile in qualsiasi momento.",
      ],
    },
    {
      title: "Periodo di conservazione",
      paragraphs: [
        "I dati personali sono conservati per il tempo strettamente necessario a conseguire le finalità per cui sono stati raccolti:",
        "Dati relativi a richieste di preventivo: fino a 12 mesi dall'ultimo contatto, salvo successiva formalizzazione del rapporto.",
        "Dati contrattuali e fiscali: per 10 anni dalla conclusione del rapporto, come richiesto dalla normativa fiscale.",
        "Dati di navigazione e statistici: fino a 30 giorni per i dati grezzi; i dati aggregati e anonimizzati possono essere conservati a tempo indeterminato.",
        "Dati marketing: fino alla revoca del consenso da parte dell'interessato.",
      ],
    },
    {
      title: "Comunicazione e diffusione dei dati",
      paragraphs: [
        "I dati personali potranno essere comunicati a soggetti terzi, solo quando necessario per l'erogazione del servizio o per adempiere a obblighi di legge. Tali soggetti includono:",
        "Fornitori di servizi tecnici (hosting, manutenzione del sito, piattaforme di comunicazione) che agiscono come Responsabili del trattamento ai sensi dell'art. 28 del GDPR.",
        "Autorità competenti, in adempimento a obblighi di legge o per la difesa dei nostri diritti.",
        "I dati non vengono diffusi né trasferiti a soggetti non autorizzati.",
      ],
    },
    {
      title: "Trasferimenti internazionali",
      paragraphs: [
        "I dati personali sono trattati principalmente all'interno dello Spazio Economico Europeo (SEE). Qualora fosse necessario avvalersi di fornitori situati in paesi extra SEE, il trasferimento avverrà nel rispetto delle garanzie previste dagli artt. 44-49 del GDPR, come l'adozione di Clausole Contrattuali Standard approvate dalla Commissione Europea.",
      ],
    },
    {
      title: "Misure di sicurezza",
      paragraphs: [
        "Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, distruzione, perdita, alterazione e divulgazione non autorizzata.",
        "Le misure includono la crittografia delle comunicazioni tramite protocollo HTTPS, l'accesso ai dati limitato al personale autorizzato, firewall e sistemi di rilevamento intrusioni, e procedure di backup e disaster recovery.",
      ],
    },
    {
      title: "Diritti dell'interessato",
      paragraphs: [
        "Ai sensi degli artt. 15-22 del GDPR, l'interessato ha il diritto di:",
        "Diritto di accesso (art. 15): ottenere la conferma dell'esistenza o meno di dati personali che ti riguardano e riceverne comunicazione chiara.",
        "Diritto di rettifica (art. 16): richiedere la correzione dei dati personali inesatti o l'integrazione di quelli incompleti.",
        "Diritto alla cancellazione (art. 17): ottenere la cancellazione dei dati personali, nei casi previsti dal GDPR (es. revoca del consenso, opposizione al trattamento, dati non più necessari).",
        "Diritto alla limitazione del trattamento (art. 18): ottenere la sospensione del trattamento in determinate circostanze (es. contestazione dell'esattezza dei dati).",
        "Diritto alla portabilità dei dati (art. 20): ricevere i dati in formato strutturato, di uso comune e leggibile da dispositivo automatico, e richiedere il trasferimento a un altro titolare.",
        "Diritto di opposizione (art. 21): opporti al trattamento dei dati per motivi connessi alla tua situazione particolare, incluso il marketing diretto.",
        "Diritto di non essere sottoposto a processi decisionali automatizzati (art. 22): non utilizziamo processi decisionali interamente automatizzati che producano effetti giuridici significativi.",
      ],
    },
    {
      title: "Modalità di esercizio dei diritti",
      paragraphs: [
        `Per esercitare i tuoi diritti, puoi contattarci in qualsiasi momento ai seguenti recapiti:`,
        `Email: ${PRIVACY_EMAIL}`,
        `Telefono: ${CONTACT_PHONE}`,
        "Ti risponderemo entro 30 giorni dalla richiesta, salvo proroga di ulteriori 30 giorni in caso di particolare complessità.",
        "Se ritieni che il trattamento dei tuoi dati violi il GDPR, hai il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).",
      ],
    },
    {
      title: "Aggiornamenti della presente informativa",
      paragraphs: [
        "La presente informativa può essere soggetta ad aggiornamenti per adeguarsi a modifiche normative, evoluzione dei servizi offerti o cambiamenti organizzativi.",
        "Gli utenti saranno informati delle modifiche significative tramite apposita comunicazione sul sito. Ti invitiamo a consultare periodicamente questa pagina per rimanere aggiornato.",
        `Ultimo aggiornamento: ${LEGAL_REVIEW_DATE}.`,
      ],
    },
  ],
};

export const COOKIE_DOCUMENT: LegalDocument = {
  title: "Informativa sui cookie",
  description:
    "La presente Informativa sui Cookie fornisce informazioni dettagliate sull'utilizzo dei cookie e di tecnologie similari sul sito di QUBO, in conformità al GDPR e al Provvedimento Generale del Garante Privacy dell'8 maggio 2014.",
  eyebrow: "Cookie",
  path: "/cookie-policy",
  sections: [
    {
      title: "Meta Pixel — aggiornamento 5 novembre 2026",
      paragraphs: [
        "Fornitore: Meta Platforms Ireland Limited. Categoria: marketing, disattivata fino al consenso. Finalità: misurazione delle visite (PageView) e delle interazioni sulla pagina /pubblicita (whatsapp_click, Contact e website_click). Questi eventi non attestano l'invio di una richiesta o l'acquisto di un servizio.",
        "Il Pixel può utilizzare cookie come _fbp e _fbc e trattare indirizzi delle pagine, identificatori e dati tecnici del browser. Le informazioni e le durate applicate dal fornitore sono disponibili su https://www.facebook.com/policies/cookies/. Non utilizziamo Conversions API né il matching avanzato automatico per questa integrazione.",
        "Il codice Meta viene caricato solo dopo il consenso marketing. Puoi rifiutare o revocare questa scelta tramite Preferenze cookie: i successivi eventi vengono bloccati e i cookie Meta accessibili al sito vengono rimossi. Non possiamo eliminare cookie di altri domini o annullare eventi già ricevuti da Meta. Per il trattamento dei dati da parte di Meta: https://www.facebook.com/privacy/policy/.",
      ],
    },
    {
      title: "Cosa sono i cookie",
      paragraphs: [
        "I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.",
        "I cookie possono essere permanenti (rimangono sul dispositivo fino alla scadenza prefissata) o temporanei (cookie di sessione, che scadono alla chiusura del browser).",
        'Tecnologie similari come i pixel di tracciamento, i web beacon e gli script di analisi possono svolgere funzioni analoghe. In questa informativa, il termine "cookie" include tutte queste tecnologie.',
      ],
    },
    {
      title: "Tipologie di cookie utilizzati",
      paragraphs: [
        "Questo sito utilizza le seguenti categorie di cookie:",
        "Cookie tecnici (necessari): sono essenziali per il corretto funzionamento del sito e per garantire la sicurezza della navigazione. Non richiedono il consenso preventivo dell'utente e vengono installati automaticamente a seguito dell'accesso al sito.",
        "Cookie analytics: raccolgono informazioni aggregate e anonime sul comportamento di navigazione degli utenti (pagine visitate, tempo di permanenza, provenienza geografica). Questi dati permettono di migliorare le prestazioni e l'usabilità del sito.",
        "Cookie di preferenza: memorizzano le scelte dell'utente (lingua preferita, regione, impostazioni di visualizzazione) per personalizzare l'esperienza di navigazione.",
        "Cookie di marketing e profilazione: vengono utilizzati per mostrare contenuti pubblicitari pertinenti agli interessi dell'utente, limitare la frequenza di visualizzazione degli annunci e misurare l'efficacia delle campagne pubblicitarie.",
      ],
    },
    {
      title: "Cookie di terze parti",
      paragraphs: [
        "Alcuni cookie presenti sul sito provengono da servizi di terze parti indipendenti da QUBO. Questi soggetti sono titolari autonomi del trattamento e dispongono di proprie privacy policy e cookie policy.",
        "Per i cookie di terze parti, l'utente può esprimere le proprie preferenze direttamente attraverso il pannello delle preferenze del sito o tramite gli strumenti messi a disposizione dai singoli fornitori terzi.",
        "Tra i servizi di terze parti che potrebbero essere utilizzati: piattaforme di analytics (come Google Analytics), servizi di mappe (come Google Maps), e piattaforme di social media (per la condivisione di contenuti).",
      ],
    },
    {
      title: "Durata dei cookie",
      paragraphs: [
        "La durata dei cookie varia in base alla loro tipologia:",
        "Cookie di sessione: scadono automaticamente alla chiusura del browser.",
        "Cookie permanenti: rimangono sul dispositivo per un periodo prefissato, che può variare da pochi minuti a diversi anni, a seconda della loro funzione.",
        "Al momento della prima installazione, ogni cookie viene configurato con una durata proporzionata alla finalità perseguita.",
        "Al termine del periodo di validità, il cookie viene automaticamente disattivato.",
      ],
    },
    {
      title: "Gestione dei cookie",
      paragraphs: [
        "L'utente può gestire liberamente le proprie preferenze sui cookie in diversi modi:",
        "Tramite il pannello delle preferenze cookie, accessibile dal sito in qualsiasi momento, dove puoi selezionare o deselezionare le singole categorie di cookie.",
        "Attraverso le impostazioni del browser, che permettono di bloccare o eliminare tutti o parte dei cookie. La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.",
        "Per i cookie di terze parti, puoi anche visitare i siti web dei singoli fornitori per gestire le preferenze direttamente.",
      ],
    },
    {
      title: "Gestione dei cookie tramite il browser",
      paragraphs: [
        "I browser più comuni offrono opzioni per controllare i cookie attraverso le impostazioni di privacy e sicurezza. Ecco i link alle guide dei browser principali:",
        "Google Chrome: Impostazioni > Privacy e sicurezza > Cookie e altri dati dei siti",
        "Mozilla Firefox: Opzioni > Privacy e sicurezza > Cookie e dati dei siti",
        "Safari: Preferenze > Privacy > Cookie e dati dei siti web",
        "Microsoft Edge: Impostazioni > Cookie e autorizzazioni sito > Cookie",
        "La disabilitazione completa dei cookie potrebbe limitare l'utilizzo di alcune funzionalità del sito.",
      ],
    },
    {
      title: "Revoca del consenso",
      paragraphs: [
        "L'utente ha il diritto di revocare il proprio consenso all'utilizzo dei cookie in qualsiasi momento, senza che ciò pregiudichi la liceità del trattamento basata sul consenso prestato prima della revoca.",
        "Per revocare il consenso, puoi utilizzare il pannello delle preferenze cookie accessibile dal sito o modificare le impostazioni del tuo browser.",
      ],
    },
    {
      title: "Aggiornamenti della cookie policy",
      paragraphs: [
        "La presente Informativa sui Cookie può essere aggiornata periodicamente per riflettere cambiamenti nei cookie utilizzati, evoluzioni normative o modifiche organizzative.",
        `Ultimo aggiornamento: ${LEGAL_REVIEW_DATE}.`,
        "Per qualsiasi domanda relativa all'uso dei cookie, puoi contattarci utilizzando i recapiti indicati nell'Informativa sulla Privacy.",
      ],
    },
  ],
};

export const TERMS_DOCUMENT: LegalDocument = {
  title: "Termini e condizioni di utilizzo",
  description:
    "I presenti Termini e Condizioni regolano l'utilizzo del sito web di QUBO e la fruizione dei servizi offerti. Ti invitiamo a leggerli attentamente prima di utilizzare il sito o di richiedere i nostri servizi.",
  eyebrow: "Termini",
  path: "/termini",
  sections: [
    {
      title: "Servizi offerti",
      paragraphs: [
        "QUBO offre servizi di piccole riparazioni domestiche, installazioni, montaggio mobili, interventi idraulici leggeri, lavori elettrici minori e altri servizi per la casa nel territorio del Friuli Venezia Giulia.",
        "L'elenco completo e aggiornato dei servizi è disponibile sul sito alla sezione dedicata. Ogni servizio è descritto con le proprie caratteristiche e limitazioni.",
      ],
    },
    {
      title: "Utilizzo del sito",
      paragraphs: [
        "L'utente si impegna a utilizzare il sito in conformità alla legge, ai presenti Termini e al buon costume.",
        "È vietato utilizzare il sito per scopi illeciti o fraudolenti, introdurre malware o codici dannosi, tentare di accedere a aree riservate senza autorizzazione, o interferire con il corretto funzionamento del sito.",
        "Ci riserviamo il diritto di limitare o sospendere l'accesso al sito in caso di violazione dei presenti Termini.",
      ],
    },
    {
      title: "Responsabilità dell'utente",
      paragraphs: [
        "L'utente è responsabile dell'accuratezza e veridicità delle informazioni fornite tramite i moduli del sito.",
        "L'utente si impegna a non inserire dati falsi, incompleti o fuorvianti, e a comunicare tempestivamente eventuali variazioni delle informazioni precedentemente fornite.",
        "È responsabilità dell'utente conservare con cura eventuali credenziali di accesso e comunicazioni ricevute.",
      ],
    },
    {
      title: "Preventivi e prezzi",
      paragraphs: [
        "I preventivi forniti tramite il sito hanno valore indicativo e non costituiscono un'offerta contrattuale vincolante.",
        "Il prezzo finale può variare in base a fattori che emergono solo dopo la presa visione diretta dell'intervento, come la complessità effettiva del lavoro, i materiali necessari e le condizioni dell'immobile.",
        "Il preventivo definitivo sarà comunicato dopo la verifica sul posto e sarà valido per il periodo indicato nel documento stesso.",
      ],
    },
    {
      title: "Prenotazione appuntamenti",
      paragraphs: [
        "La richiesta di appuntamento tramite il sito non costituisce una prenotazione automatica. Gli appuntamenti vengono confermati da QUBO dopo la verifica della disponibilità.",
        "In caso di impossibilità a rispettare l'appuntamento, l'utente si impegna a comunicare la disdetta con almeno 24 ore di anticipo.",
        "QUBO si riserva il diritto di riprogrammare gli appuntamenti in caso di cause di forza maggiore o imprevisti organizzativi, dandone tempestiva comunicazione all'utente.",
      ],
    },
    {
      title: "Limitazione di responsabilità",
      paragraphs: [
        "QUBO non sarà ritenuta responsabile per danni indiretti, consequenziali o accidentali derivanti dall'utilizzo del sito o dei servizi offerti.",
        "La responsabilità di QUBO è limitata al valore del servizio richiesto, salvo diversa disposizione di legge inderogabile.",
        'Il sito è fornito "così com\'è" e QUBO non garantisce che il sito sia privo di errori, virus o altri componenti dannosi, né che il suo funzionamento sia ininterrotto.',
      ],
    },
    {
      title: "Garanzia sui servizi",
      paragraphs: [
        "I servizi di riparazione e installazione sono coperti da garanzia limitata per eventuali difetti di lavorazione, secondo quanto previsto dalla normativa applicabile.",
        "La garanzia non copre danni derivanti da uso improprio, manomissioni, usura normale, o interventi effettuati da personale non autorizzato da QUBO.",
        "Per far valere la garanzia, l'utente deve contattarci entro 30 giorni dalla scoperta del difetto, fornendo una descrizione dettagliata del problema.",
      ],
    },
    {
      title: "Proprietà intellettuale",
      paragraphs: [
        "Tutti i contenuti del sito (testi, immagini, loghi, grafica, icone, video) sono di proprietà di QUBO o concessi in licenza d'uso, e sono protetti dalle leggi sul diritto d'autore e dalla normativa sulla proprietà intellettuale.",
        "È vietata la riproduzione, distribuzione, modifica o pubblicazione dei contenuti senza autorizzazione scritta di QUBO.",
        'Il marchio "QUBO" e il logo sono marchi di proprietà dell\'azienda.',
      ],
    },
    {
      title: "Recesso e risoluzione",
      paragraphs: [
        "L'utente ha diritto di recesso ai sensi del D.Lgs. 206/2005 (Codice del Consumo) per i servizi non ancora eseguiti, entro 14 giorni dalla data di conferma dell'ordine.",
        "QUBO si riserva il diritto di sospendere o terminare l'erogazione dei servizi in caso di violazione dei presenti Termini, comportamento fraudolento o mancato pagamento.",
        "In caso di risoluzione del rapporto, l'utente sarà tenuto al pagamento dei servizi già effettuati fino alla data di risoluzione.",
      ],
    },
    {
      title: "Legge applicabile e foro competente",
      paragraphs: [
        "I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia relativa all'interpretazione o esecuzione dei presenti Termini, il foro competente è quello del luogo in cui ha sede QUBO.",
        "Prima di adire le vie legali, le parti si impegnano a tentare una risoluzione bonaria della controversia.",
        "Per i consumatori, è competente il foro del luogo di residenza o domicilio dell'utente, se previsto come imperativo dalla legge.",
      ],
    },
    {
      title: "Contatti",
      paragraphs: [
        "Per qualsiasi domanda, chiarimento o segnalazione relativa ai presenti Termini e Condizioni, puoi contattarci ai seguenti recapiti:",
        `Email: ${PRIVACY_EMAIL}`,
        `Telefono: ${CONTACT_PHONE}`,
      ],
    },
  ],
};

export const LEGAL_NOTICE_DOCUMENT: LegalDocument = {
  title: "Legal Notice / Impronta legale",
  description:
    "Informazioni legali e identificative di QUBO, in conformità alla normativa italiana in materia di pubblicità e trasparenza dei servizi.",
  eyebrow: "Legal Notice",
  path: "/legal-notice",
  sections: [
    {
      title: "Informazioni sul progetto",
      paragraphs: [
        "QUBO è un progetto imprenditoriale in fase di costituzione dedicato ai servizi per la casa nel Friuli Venezia Giulia.",
        "Le informazioni identificative e fiscali definitive saranno pubblicate quando la costituzione dell'attività sarà completata.",
      ],
    },
    {
      title: "Contatti",
      paragraphs: [
        `Email: ${PRIVACY_EMAIL}`,
        `Telefono: ${CONTACT_PHONE}`,
        "I nostri recapiti sono disponibili per richieste di informazioni, preventivi e assistenza clienti.",
      ],
    },
    {
      title: "Responsabilità sui contenuti",
      paragraphs: [
        "I contenuti del sito sono redatti con la massima cura e attenzione. Tuttavia, QUBO non si assume alcuna responsabilità per l'accuratezza, completezza e attualità delle informazioni pubblicate.",
        "Ci riserviamo il diritto di modificare, aggiornare o rimuovere i contenuti del sito in qualsiasi momento senza preavviso.",
      ],
    },
    {
      title: "Proprietà intellettuale",
      paragraphs: [
        "Tutti i contenuti presenti sul sito, inclusi testi, immagini, loghi, grafica e materiale multimediale, sono di proprietà esclusiva di QUBO, salvo diversa indicazione.",
        "È vietata la riproduzione, distribuzione o utilizzo dei contenuti senza autorizzazione esplicita del titolare.",
      ],
    },
    {
      title: "Responsabilità per link esterni",
      paragraphs: [
        "Il sito può contenere link a siti web esterni gestiti da terze parti. QUBO non ha alcun controllo sul contenuto e sulle politiche di questi siti e non si assume alcuna responsabilità per essi.",
        "La presenza di link non costituisce approvazione o affiliazione con i siti collegati.",
      ],
    },
    {
      title: "Risoluzione delle controversie",
      paragraphs: [
        "Per qualsiasi controversia relativa all'utilizzo del sito o ai servizi offerti, si applica la legge italiana.",
        "Ai sensi del Regolamento UE n. 524/2013, i consumatori possono accedere alla piattaforma ODR (Online Dispute Resolution) all'indirizzo https://ec.europa.eu/consumers/odr/ per la risoluzione extragiudiziale delle controversie.",
      ],
    },
  ],
};

export const COOKIE_PREFERENCES_DOCUMENT: LegalDocument = {
  title: "Preferenze cookie",
  description:
    "Gestisci le tue preferenze sull'utilizzo dei cookie e delle tecnologie di tracciamento su QUBO. Puoi modificare le tue scelte in qualsiasi momento.",
  eyebrow: "Cookie Preferences",
  path: "/cookie-preferences",
  sections: [
    {
      title: "Personalizza le tue preferenze",
      paragraphs: [
        "In questa pagina puoi gestire in modo granulare il consenso all'utilizzo dei cookie sul nostro sito.",
        "I cookie necessari sono sempre attivi in quanto essenziali per il funzionamento del sito. Per le altre categorie, puoi scegliere liberamente quali abilitare.",
        "Le tue preferenze verranno memorizzate per 6 mesi, dopodiché ti chiederemo di rinnovarle.",
      ],
    },
    {
      title: "Cookie necessari",
      paragraphs: [
        "Questi cookie sono indispensabili per il corretto funzionamento del sito. Non possono essere disattivati e non richiedono il consenso dell'utente.",
        "Includono cookie tecnici di sessione, cookie per la sicurezza e cookie per la memorizzazione delle preferenze di consenso.",
      ],
    },
    {
      title: "Cookie analytics",
      paragraphs: [
        "I cookie analytics raccolgono informazioni aggregate e anonime sul modo in cui gli utenti interagiscono con il sito.",
        "Questi dati ci aiutano a migliorare l'usabilità e le prestazioni del sito, comprendendo quali pagine sono più visitate e come gli utenti navigano.",
      ],
    },
    {
      title: "Cookie di marketing",
      paragraphs: [
        "I cookie di marketing vengono utilizzati per tracciare i visitatori attraverso i siti web e mostrare annunci pubblicitari pertinenti e coinvolgenti.",
        "Possono essere utilizzati anche per limitare la frequenza di visualizzazione degli annunci e misurare l'efficacia delle campagne pubblicitarie.",
      ],
    },
    {
      title: "Cookie di preferenza",
      paragraphs: [
        "I cookie di preferenza consentono al sito di ricordare le scelte dell'utente (come la lingua preferita o la regione) e fornire funzionalità personalizzate.",
        "Migliorano l'esperienza di navigazione adattando il contenuto alle preferenze individuali.",
      ],
    },
    {
      title: "Come modificare le preferenze",
      paragraphs: [
        "Puoi modificare le tue preferenze in qualsiasi momento tramite il pannello presente su questa pagina. Le modifiche avranno effetto dal momento del salvataggio.",
        "In alternativa, puoi gestire i cookie anche tramite le impostazioni del tuo browser. Tuttavia, la disabilitazione di alcuni cookie potrebbe limitare le funzionalità del sito.",
      ],
    },
  ],
};
