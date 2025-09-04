import {VLabLabel} from "@/types/vlab";
import {contrastColor} from "contrast-color";

function VLabLabelChip({label}: {label: VLabLabel}) {
  const bgColor = label.color;
  const textColor = contrastColor({bgColor: bgColor});
  const borderColor = contrastColor({bgColor: bgColor, fgLightColor: 'transparent', fgDarkColor: '#bababa', threshold: 240});
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
      className="m-1 rounded-full border"
    >
      <div
        className="px-2 py-0 line-clamp-1"
      >
        {label.title}
      </div>
    </div>
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
