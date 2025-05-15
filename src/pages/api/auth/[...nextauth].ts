import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import {JWT} from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
  try {
    // Get a new set of tokens with a refreshToken
    // console.log("AUTH0_ISSUER", process.env.AUTH0_ISSUER)
    const url = process.env.AUTH0_ISSUER + '/protocol/openid-connect/token'

    console.log(url)
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken || "",
        client_id: process.env.AUTH0_ID,
        client_secret: process.env.AUTH0_SECRET,
        requested_token_type: 'urn:ietf:params:oauth:token-type:refresh_token'
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }

    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpiry: Date.now() / 1e3 + data.expires_in,
    }
  } catch (error) {
    console.error('Caught exception in refreshAccessToken')
    console.error(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

async function refreshAccessTokenIfExpired(token: JWT) {
  if (token.accessTokenExpiry) {
    const expDate = new Date(token.accessTokenExpiry * 1e3)
    const nowDate = new Date()
    const tokenExpired = (expDate < nowDate)
    if (tokenExpired) {
      token = await refreshAccessToken(token);
    }
  }
  return token;
}

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    })
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpiry = account.expires_at;
      }
      return await refreshAccessTokenIfExpired(token);
    },
    async session({session, token}) {
      token = await refreshAccessTokenIfExpired(token);
      session.accessToken = token.accessToken
      session.error = token.error;
      return session
    }
  }
});
