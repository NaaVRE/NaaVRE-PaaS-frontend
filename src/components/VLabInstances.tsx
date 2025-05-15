"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import getConfig from "next/config";
import {VLab} from "@/types/vlab";
import {useSession} from "next-auth/react";
import {RuntimeConfigContext} from "@/context/runtime-config";
import {getRefreshedAccessToken} from "@/lib/auth";

type Props = {
  vlab: VLab,
  slug: string | string[] | undefined,
}

interface VLabInstance {
  vlab: string,
  username: string,
}

export default function VLabInstances({vlab, slug}: Props) {

  const publicRuntimeConfig = useContext(RuntimeConfigContext);

  const session = useSession()

  const [vlabInstances, setVlabInstances] = useState<Array<VLabInstance>>([])
  const [backendError, setBackendError] = useState(false)
  const [hideInstance, setHideInstance] = useState(false)

  async function registerInstance() {
    if (
      hideInstance
      || (session.status != "authenticated")
    ) {
      return
    }

    const username = session.data.user?.name
    const accessToken = await getRefreshedAccessToken(publicRuntimeConfig.basePath)

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken || session.data.accessToken}`,
      },
      body: JSON.stringify({
        "virtual_lab": slug,
        "username": username,
      }),
    }

    const apiUrl = publicRuntimeConfig.naavreCatalogueServiceUrl;
    return fetch(`${apiUrl}/virtual-lab-instances/`, requestOptions);
  }

  const fetchVlabInstances = useCallback(async () => {
    if (session.status !== "authenticated") {
      console.log("Not authenticated")
      return
    }

    const apiUrl = publicRuntimeConfig.naavreCatalogueServiceUrl;
    const res = await fetch(`${apiUrl}/virtual-lab-instances/?virtual_lab=${slug}`, {
      headers: {
        'Authorization': `Bearer ${session.data.accessToken}`
      }
    });
    if (res.status !== 200) {
      console.log(res)
      setBackendError(true)
      return
    }
    try {
      const dat = await res.json()
      console.log(dat);
      setVlabInstances(dat.results)
    } catch (e) {
      console.log(e)
      setBackendError(true)
    }
  }, [publicRuntimeConfig.naavreCatalogueServiceUrl, slug]);

  useEffect(() => {
    fetchVlabInstances().then()
  }, [fetchVlabInstances]);

  return (
    <div className="space-y-4">
      <p className="text-2xl font-sans">Instances</p>
      {backendError ? (
        <p>Could not fetch instances</p>
      ) : (
        <>
          <p>
            {vlabInstances.length} instance{vlabInstances.length != 1 && "s"}
          </p>
          <ul
            className="flex flex-wrap"
          >
            {vlabInstances.map((vlab_instance) => {
              return (
                <li
                  key={vlab_instance.username}
                  className="rounded-full m-1 px-2 bg-quinary text-onTertiary"
                >
                  {vlab_instance.username}
                </li>
              )
            })}
          </ul>
        </>
      )}
      <div className="space-y-4 pt-4">
        <div className="space-x-2">
          <input
            type="checkbox"
            name="hideInstance"
            checked={hideInstance}
            onChange={
              (e) => {
                setHideInstance(e.target.checked)
              }
            }
          />
          <label className="text-sm">
            Hide my instance from this list
          </label>
        </div>
        <div>
          <a
            target="blank"
            href={vlab.deployment_url}
            onClick={registerInstance}
          >
            <button
              className="bg-primary hover:bg-primaryDark text-onPrimary font-bold py-2 px-4 rounded"
            >
              Launch my instance
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
