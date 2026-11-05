import Image from "next/image";
import { Check, Hammer, House, MapPin, Monitor, Wrench } from "lucide-react";

import { AdvertisingActions } from "./AdvertisingActions";
import { AdvertisingConsent } from "./AdvertisingConsent";
import styles from "./AdvertisingLanding.module.css";

const SERVICES = [
  { label: "Montaggio mobili", icon: Hammer },
  { label: "Installazione TV", icon: Monitor },
  { label: "Piccole riparazioni", icon: Wrench },
  { label: "Piccoli lavori domestici", icon: House },
];

const BENEFITS = ["Servizi a domicilio", "Preventivi chiari", "Soluzioni pratiche"];

export function AdvertisingLanding() {
  return (
    <div className={styles.landing}>
      <a className={styles.skipLink} href="#main-content">
        Vai al contenuto
      </a>
      <header className={styles.header} aria-label="QUBO">
        <Image
          alt="QUBO"
          src="/images/brand/qubo-logo.png"
          width={72}
          height={72}
          sizes="64px"
          fetchPriority="high"
          priority
        />
        <p className={styles.tagline}>Una chiamata. Casa sistemata.</p>
      </header>
      <main className={styles.main} id="main-content" tabIndex={-1}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>PICCOLI LAVORI. UN UNICO REFERENTE.</p>
          <h1>
            Hai bisogno di una mano <span>a casa?</span>
          </h1>
          <p className={styles.subtitle}>
            Piccoli lavori, montaggi e installazioni a Cervignano del Friuli e dintorni.
          </p>
          <AdvertisingActions />
        </div>
        <section className={styles.services} aria-labelledby="advertising-services">
          <h2 id="advertising-services">Come possiamo aiutarti?</h2>
          <ul className={styles.serviceGrid}>
            {SERVICES.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>
        <ul className={styles.benefits} aria-label="Il nostro approccio">
          {BENEFITS.map((benefit) => (
            <li key={benefit}>
              <Check aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerBrand}>QUBO</p>
        <p>Una chiamata. Casa sistemata.</p>
        <p className={styles.location}>
          <MapPin aria-hidden="true" />
          Cervignano del Friuli e dintorni
        </p>
        <AdvertisingConsent />
      </footer>
    </div>
  );
}
