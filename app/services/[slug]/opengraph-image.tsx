import { ImageResponse } from "next/og";

import { SocialImage, SOCIAL_IMAGE_SIZE } from "@/components/seo/SocialImage";
import { getServiceBySlug } from "@/features/services";

export const alt = "QUBO — servizio per la casa";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

type ServiceImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceOpenGraphImage({ params }: ServiceImageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  return new ImageResponse(
    <SocialImage
      subtitle={`${service?.title ?? "Servizi per la casa"} · Friuli Venezia Giulia`}
      title={service?.headline ?? "Piccoli lavori per la casa."}
    />,
    size,
  );
}
