"use client";

import { SessionProvider } from "next-auth/react"
import {ReactNode} from "react";

import '@/globals.css';
import {PaasConfigProvider} from '@/context/paas-config';
import {RuntimeConfig} from "@/lib/runtime-config";
import {RuntimeConfigContext} from "@/context/runtime-config";

export default function Providers({
  runtimeConfig,
  children,
}:
{
  runtimeConfig: RuntimeConfig,
  children: ReactNode,
}) {
  return (
    <SessionProvider basePath={`${runtimeConfig.basePath}/api/auth`}>
      <RuntimeConfigContext value={runtimeConfig}>
        <PaasConfigProvider runtimeConfig={runtimeConfig}>
          {children}
        </PaasConfigProvider>
      </RuntimeConfigContext>
    </SessionProvider>
  )
}
