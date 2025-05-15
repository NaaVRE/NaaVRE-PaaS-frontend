"use client";

import {createContext, ReactNode, useEffect, useState} from "react";

import {defaultRuntimeConfig, RuntimeConfig} from "@/lib/runtime-config";
import {getRuntimeConfigAction} from "@/app/actions";

export const RuntimeConfigContext = createContext<RuntimeConfig>(defaultRuntimeConfig);

export function RuntimeConfigProvider({children}: { children: ReactNode }) {
  const [runtimeConfig, setRuntimeConfig] = useState<RuntimeConfig>(defaultRuntimeConfig);

  useEffect(() => {
    getRuntimeConfigAction().then(res => setRuntimeConfig(res));
  }, [])

  return (
    <RuntimeConfigContext.Provider value={runtimeConfig}>
      {children}
    </RuntimeConfigContext.Provider>
  )
}
