import React from "react";
import Link from "next/link";

export default function Footer() {

  return (
    <div className="flex flex-col w-full items-center my-2">
      <p className="text-xs text-onSurface">
        Powered by NaaVRE / LifeWatch ERIC VLIC (
          <Link
            href="/about"
            className="hover:underline"
          >
            About
          </Link>
        )
      </p>
    </div>
  )
}
