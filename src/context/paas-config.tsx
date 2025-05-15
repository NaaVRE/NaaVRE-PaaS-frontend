import {useEffect, useState, createContext, ReactNode, useContext} from "react";

import {RuntimeConfigContext} from "@/context/runtime-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const defaultPaasConfig = {
  title: "Virtual Lab environments",
  description: "A collection of virtual lab environments",
  documentation_url: "https://github.com/QCDIS/NaaVRE/blob/main/README.md",
  site_icon: `${basePath}/logo-lifewatch-eric-small.png`,
}

export const PaasConfigContext = createContext({
  paasConfig: defaultPaasConfig,
  paasConfigLoading: true,
});

export function PaasConfigProvider({children}: { children: ReactNode }) {


  const [paasConfig, setPaasConfig] = useState(defaultPaasConfig);
  const [paasConfigLoading, setPaasConfigLoading] = useState(true)
  const {naavreCatalogueServiceUrl} = useContext(RuntimeConfigContext);

  useEffect(() => {
    if (!naavreCatalogueServiceUrl) {
      return
    }
    fetch(`${naavreCatalogueServiceUrl}/paas-configuration/`)
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
  }, [naavreCatalogueServiceUrl]);

  return (
    <PaasConfigContext.Provider value={{paasConfig: paasConfig, paasConfigLoading: paasConfigLoading}}>
      {children}
    </PaasConfigContext.Provider>
  );
}
