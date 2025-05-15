"use client";

import React, {useCallback, useContext, useEffect, useState} from "react";
import clsx from "clsx";
import {useSession} from "next-auth/react";
import {RuntimeConfigContext} from "@/context/runtime-config";
import {getRefreshedAccessToken} from "@/lib/auth";

export default function WorkflowRuns({slug}: {slug?: string | string[]}) {

  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);

  const { data: session } = useSession()
  const [assets, setAssets] = useState([])
  const [loadingAssets, setLoadingAssets] = useState(false)
  const [backendError, setBackendError] = useState(false)

  const fetchAssets = useCallback(async () => {
    if (!naavreCatalogueServiceUrl) {
      return
    }

    setAssets([]);
    setLoadingAssets(true);
    setBackendError(false);

    const accessToken = await getRefreshedAccessToken();

    const res = await fetch(
      `${naavreCatalogueServiceUrl}/workflows/?virtual_lab=${slug}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken || session?.accessToken}`,
        },
      }
    );

    if (res.status !== 200) {
      console.log(res)
      setBackendError(true)
      setLoadingAssets(false);
      return
    }

    try {
      const dat = await res.json()
      setAssets(dat.results)
    } catch (e) {
      console.log(e)
      setBackendError(true)
    }

    setLoadingAssets(false);
  }, [naavreCatalogueServiceUrl, session?.accessToken, slug]);

  useEffect(() => {
    fetchAssets().then()
  }, [fetchAssets]);

  if (!session) {
    return <p>Not authenticated</p>
  }

  return (
    <div>
      <button type="button"
              className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={fetchAssets}>
        <svg xmlns="http://www.w3.org/2000/svg" className={clsx("h-5", "w-5", loadingAssets && "animate-spin")}
             viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"/>
        </svg>
      </button>
      <p className="my-5">
        {backendError ? (
          "Could not fetch workflows"
        ) : (
          loadingAssets || `${assets.length} workflow run${assets.length != 1 ? "s": ""}`
        )}
      </p>
      {assets.length > 0 && (
        <table className="table-auto bg-white mt-5">
          <thead>
          <tr>
            <th className="bg-primaryContainer border text-left px-4 py-2">Name</th>
            <th className="bg-primaryContainer border text-left px-4 py-2">Status</th>
            <th className="bg-primaryContainer border text-left px-4 py-2">Progress</th>
          </tr>
          </thead>
            <tbody>
            {assets.map((workflow) => {
              return (
                <tr key={workflow['url']} className="odd:bg-surfaceContainer">
                  <td className={"border text-left py-2 px-4"}>{workflow['title']}</td>
                  <td className={"border py-2 px-4 text-left"}>{workflow['status']}</td>
                  <td className={"border py-2 px-4 text-left"}>{workflow['progress']}</td>
                </tr>
              )
            })}
            </tbody>
        </table>
      )}
    </div>
  )
}
