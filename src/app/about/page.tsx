import Link from 'next/link';
import React from "react";

export default function Page() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  return (
      <div className="rounded shadow-lg bg-white p-8">
        <h1 className="text-2xl text-gray-800 mb-8">
          About NaaVRE
        </h1>
        <p className="text-base text-gray-800">
          NaaVRE is built by LifeWatch ERIC VLIC and the QCDIS team at the University of Amsterdam.
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
