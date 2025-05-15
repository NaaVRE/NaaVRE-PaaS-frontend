"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {VLab} from "@/types/vlab";
import {RuntimeConfigContext} from "@/context/runtime-config";
import VLabDescription from "@/components/VLabDescription";
import VLAbAssets from "@/components/VLAbAssets";
import VLabInstances from "@/components/VLabInstances";
import {signIn, useSession} from "next-auth/react";

const defaultVLab: VLab = {
  title: "Loading ..",
  slug: "",
  description: "Loading ..",
  deployment_url: "",
  image: "",
}

export default function VLabPage({slug}: { slug: string }) {
  const {status: sessionStatus} = useSession();
  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);
  const [backendError, setBackendError] = useState(false);
  const [vlab, setVLab] = useState<VLab>(defaultVLab);

  const getVLabData = useCallback(async () => {
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
  }, [naavreCatalogueServiceUrl, slug])

  useEffect(() => {
    getVLabData().then();
  }, [getVLabData]);

  return (
    <>
      <div className="rounded shadow-lg bg-white p-8">
        <VLabDescription vlab={vlab} backendError={backendError}/>
      </div>
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
        <div className="rounded shadow-lg bg-white p-8">
          <p className="text-primaryMuted text-center">
            <a onClick={() => signIn('keycloak')} href="#">
              Login to see details
            </a>
          </p>
        </div>
      )}
    </>
  )
}