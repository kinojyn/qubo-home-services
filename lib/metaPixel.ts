// Public dataset identifier from QUBO's Events Manager; this is not a credential.
export const META_PIXEL_ID = "1111398838561399";

type PixelCommand = unknown[];
type PixelFunction = {
  (...args: PixelCommand): void;
  callMethod?: (...args: PixelCommand) => void;
  queue: PixelCommand[];
  loaded: boolean;
  push?: PixelFunction;
  version: string;
};

type PixelWindow = Window & {
  fbq?: PixelFunction;
  _fbq?: PixelFunction;
  quboPixelState?: { consent: boolean; lastPath: string | null };
};

function removeMarketingCookies() {
  for (const name of ["_fbp", "_fbc"]) {
    const expiration = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = expiration;
    const parts = window.location.hostname.split(".");
    while (parts.length >= 2) {
      document.cookie = `${expiration}; domain=${parts.join(".")}`;
      parts.shift();
    }
  }
}

/** No Meta script/request before opt-in. Never run on private/admin routes. */
export function updateMetaPixel(allowed: boolean, pathname: string) {
  const pixelWindow = window as PixelWindow;
  const permitted = allowed && !/^\/(admin|api)(\/|$)/.test(pathname);
  const existing = pixelWindow.quboPixelState;

  if (!permitted) {
    if (existing?.consent) {
      const pixel = pixelWindow.fbq;
      // Do not replay unsent page/click events if consent was withdrawn during loading.
      if (pixel && !pixel.callMethod) {
        pixel.queue = pixel.queue.filter((command) => !String(command[0]).startsWith("track"));
      }
      pixel?.("consent", "revoke");
      existing.consent = false;
      existing.lastPath = null;
      removeMarketingCookies();
    }
    return;
  }

  if (!pixelWindow.fbq) {
    const pixel: PixelFunction = Object.assign(
      (...args: PixelCommand) => {
        if (pixel.callMethod) pixel.callMethod(...args);
        else pixel.queue.push(args);
      },
      { queue: [] as PixelCommand[], loaded: true, version: "2.0" },
    );
    pixel.push = pixel;
    pixelWindow.fbq = pixel;
    pixelWindow._fbq ??= pixel;
  }

  const pixel = pixelWindow.fbq;
  if (!existing) {
    pixel("consent", "grant");
    // Manual fixed-property events only; no automatic form/advanced matching.
    pixel("set", "autoConfig", false, META_PIXEL_ID);
    pixel("init", META_PIXEL_ID);
    pixelWindow.quboPixelState = { consent: true, lastPath: null };
  } else if (!existing.consent) {
    pixel("consent", "grant");
    existing.consent = true;
  }

  if (!document.getElementById("qubo-meta-pixel")) {
    const script = document.createElement("script");
    script.id = "qubo-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  const state = pixelWindow.quboPixelState!;
  if (state.lastPath !== pathname) {
    pixel("trackSingle", META_PIXEL_ID, "PageView");
    state.lastPath = pathname;
  }
}
