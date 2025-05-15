export async function getRefreshedAccessToken(basePath: string): Promise<string | undefined> {
  try {
    const res = await fetch(`${basePath}/api/auth/session`);
    const dat = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch session data.");
    }
    return dat.accessToken;
  } catch (error) {
    console.error(error);
  }
}
