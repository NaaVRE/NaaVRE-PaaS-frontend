import type {Metadata} from "next";
import React, {ReactNode} from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: "NaaVRE PaaS",
    template: "%s | NaaVRE PaaS"
  },
};

export default async function RootLayout({children}: { children: ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  return (
    <html lang="en">
    <head>
      <link rel="shortcut icon" href={`${basePath}/favicon.svg`}/>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <title>NaaVRE PaaS</title>
    </head>
    <body>
      <div className="min-h-screen flex flex-col md:flex-row mx-auto bg-surfaceContainer">
        <Providers>
        <Nav />
        <div className="mx-auto w-full flex flex-col space-y-5 py-5 md:px-5">
          <main className="grow flex flex-col space-y-4">
            {children}
          </main>
          <Footer />
        </div>
        </Providers>
      </div>
    </body>
    </html>
  );
}
