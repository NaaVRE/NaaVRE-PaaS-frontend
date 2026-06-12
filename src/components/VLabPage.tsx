"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {VLab} from "@/types/vlab";
import {RuntimeConfigContext} from "@/context/runtime-config";
import VLabDescription from "@/components/VLabDescription";
import VLAbAssets from "@/components/VLAbAssets";
import VLabInstances from "@/components/VLabInstances";
import {signIn, useSession} from "next-auth/react";
import VLabLongDescription from "@/components/VLabLongDescription";

const signInTutorialUrl = "https://naavre.net/docs/tutorials/#signing-in";

const defaultVLab: VLab = {
  title: "Loading ..",
  labels: [],
  slug: "",
  description: "Loading ..",
  long_description: "",
  deployment_url: "",
  additional_actions: [],
  image: "",
}

export default function VLabPage({slug}: { slug: string }) {
  const {status: sessionStatus} = useSession();
  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);
  const [backendError, setBackendError] = useState(false);
  const [vlab, setVLab] = useState<VLab>(defaultVLab);
  const [vlabLoading, setVlabLoading] = useState(true)

  const hasLongDescription = vlab.long_description !== "";

  const getVLabData = useCallback(async () => {
    if (!naavreCatalogueServiceUrl) {
      return
    }
    setVlabLoading(true);
    setBackendError(false);
    try {
      const res = await fetch(`${naavreCatalogueServiceUrl}/virtual-labs/${slug}/`);
      const data = await res.json();
      if (!res.ok) {
        const msg = "Cannot get VLab data";
        console.error(msg, res, data);
        throw msg;
      }
      setVLab(data);
    } catch (error) {
      console.error(error)
      setBackendError(true);
    }
    setVlabLoading(false);
  }, [naavreCatalogueServiceUrl, slug])

  useEffect(() => {
    getVLabData().then();
  }, [getVLabData]);

  return (
    <>
      <div className="rounded shadow-lg bg-white p-8">
        <VLabDescription
          vlab={vlab}
          vlabLoading={vlabLoading}
          backendError={backendError}
        />
      </div>
      <div className={`flex flex-col ${hasLongDescription ? "xl:flex-row-reverse" : ""} gap-4`}>
        <div className={`${hasLongDescription ? "xl:w-1/2" : ""} flex flex-col gap-4`}>
        {sessionStatus === "authenticated" ? (
          <>
            <div className="rounded shadow-lg bg-white p-8">
              <VLabInstances vlab={vlab} slug={slug}/>
            </div>
            <div className="rounded shadow-lg bg-white p-8">
              <VLAbAssets slug={slug}/>
            </div>
          </>
        ) : (
          <div className="rounded shadow-lg bg-white p-8 space-y-8">
            <p className="text-center">
              <a
                onClick={() => signIn('keycloak')}
                href="#"
                className="text-primary underline"
              >
                Login to see details
              </a>
            </p>
            <p className="text-center text-primaryMuted">
              New to NaaVRE? Follow the{' '}
              <a
                href={signInTutorialUrl}
                className="text-primary underline"
              >
                login tutorial
              </a>
            </p>
          </div>
        )}
        </div>
        {hasLongDescription && (
          <div className="xl:w-1/2 rounded shadow-lg bg-white p-8">
            <VLabLongDescription vlab={vlab}/>
          </div>
        )}
      </div>
    </>
  )
}