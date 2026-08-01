import { icons } from "./icons";

type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name];
  return <Component className={className} />;
}