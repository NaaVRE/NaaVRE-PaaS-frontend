"use server";

import getRuntimeConfig from "@/lib/runtime-config";

export async function getRuntimeConfigAction() {
  return getRuntimeConfig();
}
