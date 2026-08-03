import { ImageResponse } from "next/og";

import { SocialImage, SOCIAL_IMAGE_SIZE } from "@/components/seo/SocialImage";

export const alt = "QUBO — piccoli lavori di casa in Friuli Venezia Giulia";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <SocialImage
      subtitle="Friuli Venezia Giulia, Italia"
      title="Un solo team. Ogni piccolo lavoro di casa."
    />,
    size,
  );
}
