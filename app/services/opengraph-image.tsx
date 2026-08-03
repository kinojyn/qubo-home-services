import { ImageResponse } from "next/og";

import { SocialImage, SOCIAL_IMAGE_SIZE } from "@/components/seo/SocialImage";

export const alt = "QUBO — servizi per i piccoli lavori di casa";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <SocialImage
      subtitle="Riparazioni e installazioni in Friuli Venezia Giulia"
      title="Un solo team per i piccoli lavori di casa."
    />,
    size,
  );
}
