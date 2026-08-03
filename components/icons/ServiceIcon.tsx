import { DoorOpen, Droplets, Hammer, Paintbrush, Tv, Zap } from "lucide-react";

import type { ServiceIcon as ServiceIconName } from "@/features/services";

const SERVICE_ICONS: Record<ServiceIconName, typeof Zap> = {
  electrical: Zap,
  plumbing: Droplets,
  furniture: Hammer,
  media: Tv,
  doors: DoorOpen,
  handyman: Paintbrush,
};

type ServiceIconProps = {
  className?: string;
  name: ServiceIconName;
};

export function ServiceIcon({ className, name }: ServiceIconProps) {
  const Icon = SERVICE_ICONS[name];
  return <Icon aria-hidden="true" className={className} />;
}
