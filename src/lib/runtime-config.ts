export type RuntimeConfig = {
  basePath: string;
  staticFolder: string;
  naavreCatalogueServiceUrl: string;
}

export default function getRuntimeConfig(): RuntimeConfig {
  return {
    basePath: process.env.FRONTEND_BASE_PATH,
    staticFolder: process.env.FRONTEND_BASE_PATH,
    naavreCatalogueServiceUrl: process.env.NAAVRE_CATALOGUE_SERVICE_URL.replace(/\/$/, ''),
  }
}
