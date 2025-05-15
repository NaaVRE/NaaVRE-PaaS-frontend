"use client";

import {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'

import {PaasConfigContext} from '@/context/paas-config';
import {VLab} from "@/types/vlab";
import {RuntimeConfigContext} from "@/context/runtime-config";

export default function Page() {

  const runtimeConfig = useContext(RuntimeConfigContext);

  const {paasConfig, paasConfigLoading} = useContext(PaasConfigContext)

  const [vlabs, setVlabs] = useState([]);
  const [vlabsLoading, setVlabsLoading] = useState(true);

  useEffect(() => {

    const apiUrl = runtimeConfig.naavreCatalogueServiceUrl;
    fetch(`${apiUrl}/virtual-labs/`)
      .then((res) => res.json())
      .then((data) => {
        setVlabs(data.results);
        setVlabsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setVlabsLoading(false)
      });
  }, [runtimeConfig.naavreCatalogueServiceUrl]);

  return (
    <>

      <div className="rounded shadow-lg bg-surface p-8">
        <h1 className="text-2xl text-onSurface mb-8">
          {paasConfigLoading ? (
            <span className="animate-pulse">
                  <span
                    className="inline-block min-h-[1em] w-3/12 flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
                </span>
          ) : (
            paasConfig.title
          )}
        </h1>
        <div className="text-l text-onSurface">
          {paasConfigLoading ? (
            <span className="animate-pulse">
                  <span
                    className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
                </span>
          ) : (
            <div className="prose">
              <ReactMarkdown>{paasConfig.description}</ReactMarkdown>
            </div>
          )}
        </div>
        {paasConfigLoading || (
          paasConfig.documentation_url && (
            <p className="mt-4">
              <a
                href={paasConfig.documentation_url}
                className="text-primary hover:underline"
              >
                Documentation
              </a>
            </p>
          )
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

        {vlabsLoading ? (
          <div className="rounded overflow-hidden shadow-lg bg-surface animate">
            <div>
              <img className="h-30 m-1 object-cover" src={`${runtimeConfig.staticFolder}/vlab-loading.svg`}/>
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
          vlabs.length > 0 ? (
            vlabs.map((vlab: VLab) => {
              return (
                <div key={vlab.slug} className="rounded overflow-hidden shadow-lg bg-surface">
                  <Link
                    href={`/vl/${vlab.slug}`}
                  >
                    <div>
                      <img className="h-30 m-1 object-cover"
                           src={vlab.image || `${runtimeConfig.staticFolder}/vlab-default.svg`}/>
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
          ) : (
            <div className="rounded overflow-hidden shadow-lg bg-surface p-5">
              No virtual labs found
            </div>
          )
        )
        }
      </div>
    </>
  )
}
