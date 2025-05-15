import {VLab} from "@/types/vlab";

export default function VLabDescription({vlab, backendError}: {vlab: VLab, backendError: boolean}) {
  return (
    <div>
      {backendError ? (
        <p className="my-5">
          Could not load vlab description
        </p>
      ) : (
        <>
          <p className="text-4xl font-sans">{vlab.title}</p>
          <p className="mt-5 text-justify">{vlab.description}</p>
        </>
      )}
    </div>
  )
}
