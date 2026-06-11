"use client";

import {useEffect, useState} from "react";
import Link from "next/link";

import {VLab} from "@/types/vlab";
import {VLabLabelChips} from "@/components/VLabLabelChips";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

export function VLabsList({listUrl}: { listUrl: string }) {

  const [vlabs, setVlabs] = useState<Array<VLab>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!listUrl) {
      return
    }
    setLoading(true)
    setError(false)
    fetch(listUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json()
      })
      .then((data) => {
        setVlabs(data.results);
      })
      .catch((exception) => {
        console.log(exception)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [listUrl]);

  if (error) {
    return (
      <div className='grid grid-cols-1 gap-4'>
        <div className="rounded overflow-hidden shadow-lg bg-red-100 border border-red-400 text-red-700  p-5">
          Something went wrong while loading virtual labs.
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

      {loading ? (
        <div className="rounded overflow-hidden shadow-lg bg-surface animate">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-30 m-1 object-cover"
              src={`${basePath}/vlab-loading.svg`}
              alt="Loading virtual lab image"
            />
            <div className="font-bold text-l mb-2 bg-primaryMuted text-onPrimary p-5">
              <p className="animate-pulse">
                      <span
                        className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-onPrimary align-middle opacity-50"></span>
              </p>
            </div>
            <div className="px-3 py-2">
              <p className="text-base truncate animate-pulse ...">
                      <span
                        className="inline-block min-h-[0.6em] w-6/12 flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        vlabs.map((vlab: VLab) => {
          return (
            <div key={vlab.slug} className="rounded overflow-hidden shadow-lg bg-surface">
              <Link
                href={`/vl/${vlab.slug}`}
              >
                <div>
                  <div
                    className="flex justify-between items-end"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-30 m-1 object-cover"
                      src={vlab.image || `${basePath}/vlab-default.svg`}
                      alt={`${vlab.title} image`}
                    />
                    <VLabLabelChips labels={vlab.labels}/>
                  </div>
                  <div className="font-bold text-l mb-2 bg-primary text-onPrimary p-5">{vlab.title}</div>
                  <div className="px-3 py-2">
                    <p className="text-onSurface line-clamp-2">
                      {vlab.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )
      }
    </div>
  )
}