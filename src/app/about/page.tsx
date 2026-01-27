"use client";

import Link from 'next/link';
import { useContext } from "react";
import { PaasConfigContext } from "@/context/paas-config";

export default function Page() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  const { paasConfig } = useContext(PaasConfigContext)
  return (
      <div className="rounded shadow-lg bg-white p-8">
        <h1 className="text-2xl text-gray-800 mb-8">
          About NaaVRE
        </h1>
        <p className="text-base text-gray-800">
          NaaVRE is built by LifeWatch ERIC VLIC and the QCDIS team at the University of Amsterdam.
          <br /><br />
          Go to the{" "}
          <Link href={paasConfig.documentation_url} className="text-primary hover:underline">
            documentation website
          </Link>{" "}
          to get in touch or propose your own virtual lab.
        </p>

        <div className="flex flex-col sm:flex-row items-center mt-8">
          <Link href="https://www.lifewatch.eu/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="LifeWatch ERIC logo"
              src={`${basePath}/logo-lifewatch-eric-medium.png`}
              width="150"
              className="m-10"
            />
          </Link>
          <Link href="https://www.uva.nl/en">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="University of Amsterdam logo"
              src={`${basePath}/logo-uva-medium.png`}
              width="170"
              className="m-10"
            />
          </Link>
        </div>
      </div>
  )
}
