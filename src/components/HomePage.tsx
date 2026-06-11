"use client";

import {useContext, useState} from "react";
import {RuntimeConfigContext} from "@/context/runtime-config";
import {PaasConfigContext} from "@/context/paas-config";
import Markdown from "react-markdown";
import {LifeWatchUnifiedMenu} from "@/components/lifewatch-unified-menu/menu";
import {VLabsList} from "@/components/VLabsList";

export function HomePage() {

  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);

  const {paasConfig, paasConfigLoading} = useContext(PaasConfigContext)

  return (
    <>

      <div className="rounded shadow-lg bg-surface p-8">
        <div className="flex">
          <h1 className="text-2xl text-onSurface mb-8 flex-1">
            {paasConfigLoading ? (
              <span className="animate-pulse">
                    <span
                      className="inline-block min-h-[1em] w-3/12 flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
                  </span>
            ) : (
              paasConfig.title
            )}
          </h1>
          <LifeWatchUnifiedMenu className="flex-none" />
        </div>
        <div className="text-l text-onSurface">
          {paasConfigLoading ? (
            <span className="animate-pulse">
                  <span
                    className="inline-block min-h-[1em] w-full flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
                </span>
          ) : (
            <div className="prose max-w-none">
              <Markdown>{paasConfig.description}</Markdown>
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

      {naavreCatalogueServiceUrl !== null && (
        <VLabsList listUrl={`${naavreCatalogueServiceUrl}/virtual-labs/`} />
      )}
    </>
  )
}