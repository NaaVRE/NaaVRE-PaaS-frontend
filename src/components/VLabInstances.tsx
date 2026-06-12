"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import {VLab} from "@/types/vlab";
import {useSession} from "next-auth/react";
import {RuntimeConfigContext} from "@/context/runtime-config";
import {getRefreshedAccessToken} from "@/lib/auth";
import {contrastColor} from "contrast-color";

function VLabActionButton({
  children,
  href,
  onClick,
  color,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  color?: string;
}) {
  let style = {}
  if (color === undefined) {
    style = {
      "--bg-color": "var(--color-primary)",
      "--text-color": "var(--color-onPrimary)",
    }
  } else {
    const bgColor = color;
    const textColor = contrastColor({bgColor: bgColor});
    style = {
      "--bg-color": bgColor,
      "--text-color": textColor,
    }
  }

  return (
    <a
      target="blank"
      href={href}
      onClick={onClick}
    >
      <button
        className="
          py-2 px-4
          rounded border
          bg-(--bg-color)
          border-(--bg-color)
          text-(--text-color)
          hover:bg-transparent
          hover:text-(--btn-color)
          cursor-pointer
        "
        style={style}
      >
        {children}
      </button>
    </a>
  )
}

type Props = {
  vlab: VLab,
  slug: string | string[] | undefined,
}

interface VLabInstance {
  virtual_lab: string,
  user: string,
}

export default function VLabInstances({vlab, slug}: Props) {

  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);

  const session = useSession()

  const [vlabInstances, setVlabInstances] = useState<Array<VLabInstance>>([])
  const [backendError, setBackendError] = useState(false)
  const [hideInstance, setHideInstance] = useState(false)

  async function registerInstance() {
    if (!naavreCatalogueServiceUrl) {
      console.log("Cannot register instance because naavreCatalogueServiceUrl is missing")
    }
    if (
      hideInstance
      || (session.status != "authenticated")
    ) {
      return
    }

    const username = session.data.user?.name
    const accessToken = await getRefreshedAccessToken()

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

    return fetch(`${naavreCatalogueServiceUrl}/virtual-lab-instances/`, requestOptions);
  }

  const fetchVlabInstances = useCallback(async () => {
    if (!naavreCatalogueServiceUrl) {
      return
    }
    if (session.status !== "authenticated") {
      console.log("Not authenticated")
      return
    }

    const res = await fetch(`${naavreCatalogueServiceUrl}/virtual-lab-instances/?virtual_lab=${slug}`, {
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
  }, [naavreCatalogueServiceUrl, session.data?.accessToken, session.status, slug]);

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
                  key={vlab_instance.user}
                  className="rounded-full m-1 px-2 bg-quinary text-onTertiary"
                >
                  {vlab_instance.user}
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
        <div className="flex flex-wrap gap-2">
          <VLabActionButton
            href={vlab.deployment_url}
            onClick={registerInstance}
          >
            Start Virtual Lab
          </VLabActionButton>
          {vlab.additional_actions?.map(({label, url, color}) => (
            <VLabActionButton
              key={url}
              href={url}
              onClick={registerInstance}
              color={color}
            >
              {label}
            </VLabActionButton>
          ))}
        </div>
      </div>
    </div>
  )
}
