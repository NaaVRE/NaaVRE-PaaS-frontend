import {createContext} from "react";

import {RuntimeConfig} from "@/lib/runtime-config";

export const RuntimeConfigContext = createContext<RuntimeConfig>({
  basePath: "",
  staticFolder: "",
  naavreCatalogueServiceUrl: "",
})
