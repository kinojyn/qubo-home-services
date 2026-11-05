"use client";

import { ArrowUpRight, Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

import { useCookieConsent } from "@/contexts/CookieContext";
import { trackAdvertisingClick } from "@/features/advertising/analytics";
import {
  ADVERTISING_WEBSITE_URL,
  ADVERTISING_WHATSAPP_URL,
  getAdvertisingLinks,
} from "@/features/advertising/attribution";

import styles from "./AdvertisingLanding.module.css";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.85 11.85 0 0 0 12.05 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.92 11.92 0 0 0 5.8 1.48h.01C18.65 23.84 24 18.49 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.06 21.83a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.86 9.86 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.46-4.45 9.88-9.96 9.88Zm5.44-7.41c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.19.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.53.07-.8.37s-1.05 1.02-1.05 2.49 1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.22 1.36.19 1.88.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function AdvertisingActions() {
  const consent = useCookieConsent();
  const [links, setLinks] = useState({
    website: ADVERTISING_WEBSITE_URL,
    whatsapp: ADVERTISING_WHATSAPP_URL,
  });

  useEffect(() => {
    setLinks(getAdvertisingLinks(window.location.search));
  }, []);

  return (
    <div className={styles.actions}>
      <a
        className={`${styles.action} ${styles.whatsapp}`}
        href={links.whatsapp}
        onClick={() => trackAdvertisingClick("whatsapp_click", consent)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className={styles.actionIcon}>
          <WhatsAppIcon />
        </span>
        <span className={styles.actionText}>
          <strong>RICHIEDI UN PREVENTIVO SU WHATSAPP</strong>
          <span>Scrivici e raccontaci di cosa hai bisogno.</span>
        </span>
        <ArrowUpRight aria-hidden="true" className={styles.arrow} />
        <span className="sr-only"> (si apre in una nuova scheda)</span>
      </a>
      <a
        className={`${styles.action} ${styles.website}`}
        href={links.website}
        onClick={() => trackAdvertisingClick("website_click", consent)}
      >
        <span className={styles.actionIcon}>
          <Globe2 aria-hidden="true" />
        </span>
        <span className={styles.actionText}>
          <strong>SCOPRI I NOSTRI SERVIZI</strong>
          <span>Visita il sito e scopri come possiamo aiutarti.</span>
        </span>
        <ArrowUpRight aria-hidden="true" className={styles.arrow} />
      </a>
    </div>
  );
}
