import {ComponentPropsWithoutRef, ElementType, ReactNode} from "react";
import clsx from "clsx";
import {VLabLabel} from "@/types/vlab";
import {contrastColor} from "contrast-color";

type VLabLabelChipProps<T extends ElementType> = {
  label: VLabLabel;
  start?: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'label'>;

export function VLabLabelChip<T extends ElementType = 'div'>({
  label,
  start,
  className,
  as,
  ...props
}: VLabLabelChipProps<T>){
  const Component = as ?? 'div'
  const bgColor = label.color;
  const textColor = contrastColor({bgColor: bgColor});
  const borderColor = contrastColor({bgColor: bgColor, fgLightColor: 'transparent', fgDarkColor: '#bababa', threshold: 240});
  const style: object = {
        "--bg-color": bgColor,
        "--text-color": textColor,
        "--border-color": borderColor,
      }
  return (
    <Component
      style={style}
      className={clsx(
        "m-1 rounded-full border",
        "px-2 py-0 line-clamp-1",
        "flex gap-1",
        "bg-(--bg-color) border-(--border-color) text-(--text-color)",
        className
      )}
      {...props}
    >
      {start ?? ''}
      <span>{label.title}</span>
    </Component>
  )
}

export function VLabLabelChips({labels}: {labels: Array<VLabLabel>}) {
  return (
    <div className="flex flex-col items-end p-1">
      {labels.map(label => (
        <VLabLabelChip key={label.title} label={label} />
      ))}
    </div>
  )
}
