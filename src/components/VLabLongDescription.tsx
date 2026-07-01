import {VLab} from "@/types/vlab";
import Markdown from "@/components/Markdown";

export default function VLabLongDescription({
  vlab,
}: {
  vlab: VLab,
}) {
  return (
    <div className="mt-5 prose max-w-none text-justify">
      <Markdown>{vlab.long_description}</Markdown>
    </div>
  )
}
