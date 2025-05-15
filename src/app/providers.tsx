"use client";

import { SessionProvider } from "next-auth/react"
import {ReactNode} from "react";

import '@/globals.css';
import {PaasConfigProvider} from '@/context/paas-config';
import {RuntimeConfigProvider} from "@/context/runtime-config";

export default function Providers({children}: { children: ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  return (
    <SessionProvider basePath={`${basePath}/api/auth`}>
      <RuntimeConfigProvider>
        <PaasConfigProvider>
          {children}
        </PaasConfigProvider>
      </RuntimeConfigProvider>
    </SessionProvider>
  )
}
