import Google from '@auth/core/providers/google';
import { defineConfig } from 'auth-astro';

declare module '@auth/core/types' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }
}

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/photoslibrary.readonly',
            'https://www.googleapis.com/auth/photoslibrary.sharing',
            'profile',
            'email'
          ].join(" "),
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.access_token;
        session.refreshToken = token.refresh_token;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      // Refrescar el token si ha expirado
      if (token.expires_at && Date.now() >= token.expires_at * 1000) {
        try {
          const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: import.meta.env.GOOGLE_CLIENT_ID,
              client_secret: import.meta.env.GOOGLE_CLIENT_SECRET,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token,
            }),
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }

      return token;
    },
  },
});