const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const ADVERTISING_WHATSAPP_MESSAGE =
  "Buongiorno, ho visto la vostra pubblicità e vorrei richiedere un preventivo.";

export const ADVERTISING_WHATSAPP_URL = `https://wa.me/393201391900?text=${encodeURIComponent(ADVERTISING_WHATSAPP_MESSAGE)}`;
export const ADVERTISING_WEBSITE_URL = "https://quboservice.com/";

/** Only bounded campaign labels are forwarded. Never forward arbitrary query strings or click IDs. */
export function getCampaignParameters(search: string): URLSearchParams {
  const incoming = new URLSearchParams(search);
  const campaign = new URLSearchParams();

  for (const key of CAMPAIGN_KEYS) {
    const value = incoming.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) campaign.set(key, value);
  }

  return campaign;
}

export function getAdvertisingLinks(search: string) {
  const campaign = getCampaignParameters(search);
  const website = new URL(ADVERTISING_WEBSITE_URL);
  const whatsapp = new URL(ADVERTISING_WHATSAPP_URL);

  website.search = campaign.toString();

  // wa.me has no UTM attribution API. Keep campaign context in the editable message.
  if (campaign.size > 0) {
    whatsapp.searchParams.set(
      "text",
      `${ADVERTISING_WHATSAPP_MESSAGE}\n\nRiferimento campagna: ${campaign.toString()}`,
    );
  }

  return { website: website.href, whatsapp: whatsapp.href };
}
