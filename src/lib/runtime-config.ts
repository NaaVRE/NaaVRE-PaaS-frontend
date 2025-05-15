export type RuntimeConfig = {
  naavreCatalogueServiceUrl: string | null;
}

export const defaultRuntimeConfig: RuntimeConfig = {
  naavreCatalogueServiceUrl: null,
}

export default function getRuntimeConfig(): RuntimeConfig {
  const config: RuntimeConfig = defaultRuntimeConfig;
  if ('NAAVRE_CATALOGUE_SERVICE_URL' in process.env) {
    config.naavreCatalogueServiceUrl = process.env.NAAVRE_CATALOGUE_SERVICE_URL.replace(/\/$/, '');
  } else {
    throw new Error("NAAVRE_CATALOGUE_SERVICE_URL environment variable is not set.");
  }
  return config;
}
