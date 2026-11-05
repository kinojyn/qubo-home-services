"use client";

import { useCookieConsent } from "@/contexts/CookieContext";

import styles from "./AdvertisingLanding.module.css";

/** Inline consent keeps the two primary actions visible on small screens. */
export function AdvertisingConsent() {
  const { acceptAll, bannerVisible, openPreferences, rejectAll } = useCookieConsent();

  return (
    <div className={styles.consent}>
      <div className={styles.legalLinks}>
        <a href="/privacy">Privacy</a>
        <a href="/cookie-policy">Cookie Policy</a>
        <button onClick={openPreferences} type="button">
          Preferenze cookie
        </button>
      </div>
      {bannerVisible && (
        <div className={styles.consentNotice}>
          <p>Con il tuo consenso usiamo cookie e strumenti di analisi per migliorare il sito.</p>
          <div>
            <button onClick={acceptAll} type="button">
              Accetta tutti
            </button>
            <button onClick={rejectAll} type="button">
              Rifiuta tutti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
