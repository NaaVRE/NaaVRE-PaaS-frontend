import {useEffect, useState, createContext, ReactNode} from "react";

import {RuntimeConfig} from "@/lib/runtime-config";

export const PaasConfigContext = createContext({
  paasConfig: {
    title: "",
    description: "",
    documentation_url: "",
    site_icon: "",
  },
  paasConfigLoading: true,
});

export function PaasConfigProvider({
  runtimeConfig,
  children,
}: {
  runtimeConfig: RuntimeConfig,
  children: ReactNode,
}) {
  const [paasConfig, setPaasConfig] = useState({
    title: "Virtual Lab environments",
    description: "A collection of virtual lab environments",
    documentation_url: "https://github.com/QCDIS/NaaVRE/blob/main/README.md",
    site_icon: `${runtimeConfig.staticFolder}/logo-lifewatch-eric-small.png`,
  })
  const [paasConfigLoading, setPaasConfigLoading] = useState(true)

  useEffect(() => {
    const apiUrl = runtimeConfig.naavreCatalogueServiceUrl;
    fetch(`${apiUrl}/paas-configuration/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count > 0) {
          setPaasConfig(data.results[0]);
        }
        setPaasConfigLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setPaasConfigLoading(false)
      });
  }, [runtimeConfig.naavreCatalogueServiceUrl]);

  return (
    <PaasConfigContext.Provider value={{paasConfig: paasConfig, paasConfigLoading: paasConfigLoading}}>
      {children}
    </PaasConfigContext.Provider>
  );
}
