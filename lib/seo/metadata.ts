import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  description: string;
  imagePath?: string;
  path: string;
  title: string;
  twitterImagePath?: string;
};

export function createRobotsMetadata(isIndexable = siteConfig.isIndexable): Metadata["robots"] {
  if (!isIndexable) {
    return { follow: false, index: false, nocache: true };
  }

  return {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function createPageMetadata({
  description,
  imagePath = siteConfig.socialImage,
  path,
  title,
  twitterImagePath = siteConfig.twitterImage,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const createImage = (url: string) => ({
    alt: `${siteConfig.name} — servizi per la casa`,
    height: 630,
    url,
    width: 1200,
  });

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { "it-IT": path, "x-default": path },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url: path,
      images: [createImage(imagePath)],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [createImage(twitterImagePath)],
    },
    robots: createRobotsMetadata(),
  };
}

export function createRootMetadata(): Metadata {
  const pageMetadata = createPageMetadata({
    description: siteConfig.description,
    path: "/",
    title: siteConfig.homeTitle,
  });

  return {
    ...pageMetadata,
    applicationName: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.homeTitle} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    category: "home services",
    creator: siteConfig.name,
    formatDetection: { address: false, email: false, telephone: false },
    keywords: [
      "riparazioni domestiche",
      "piccoli lavori casa",
      "servizi per la casa",
      "Friuli Venezia Giulia",
    ],
    publisher: siteConfig.name,
    icons: {
      icon: { url: "/images/brand/qubo-logo.png", type: "image/png", sizes: "990x990" },
      shortcut: "/images/brand/qubo-logo.png",
      apple: "/images/brand/qubo-logo.png",
    },
    manifest: "/manifest.json",
  };
}
