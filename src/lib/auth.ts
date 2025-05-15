export async function getRefreshedAccessToken(): Promise<string | undefined> {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
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
