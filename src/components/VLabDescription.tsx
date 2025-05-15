import {VLab} from "@/types/vlab";

export default function VLabDescription({
  vlab,
  vlabLoading,
  backendError,
}: {
  vlab: VLab,
  vlabLoading: boolean;
  backendError: boolean;
}) {
  return (
    <div>
      {backendError ? (
        <p className="my-5">
          Could not load vlab description
        </p>
      ) : (
        vlabLoading ? (
          <span className="animate-pulse">
            <p className="text-2xl font-sans">
              <span className="inline-block min-h-[1em] w-3/12 flex-auto cursor-wait bg-onSurface align-middle opacity-50"/>
            </p>
            <p className="mt-8">
              <span className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>

            </p>
          </span>
        ) : (
          <>
            <p className="text-4xl font-sans">{vlab.title}</p>
            <p className="mt-5 text-justify">{vlab.description}</p>
          </>
        )
      )}
    </div>
  )
}
