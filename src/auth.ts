/**
 * Auth.js Configuration
 *
 * This is the heart of authentication in the app.
 *
 * 🎓 LESSON: What happens here?
 *
 * 1. We define HOW users can authenticate (providers)
 * 2. We define WHAT data to store in the session
 * 3. We define WHERE to redirect after login/logout
 *
 * Auth.js handles:
 * - Cookie management (httpOnly, secure, sameSite)
 * - Token encryption/signing
 * - Session validation
 * - CSRF protection
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { config as appConfig } from '@/config';

/**
 * 🎓 LESSON: Providers
 *
 * Providers define HOW users authenticate:
 * - Credentials: email/password (your FastAPI backend)
 * - Google: OAuth with Google
 * - GitHub: OAuth with GitHub
 *
 * We use Credentials because you have your own FastAPI backend.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  /**
   * 🎓 LESSON: Pages
   *
   * Custom pages for auth flows.
   * If not specified, Auth.js uses default pages.
   */
  pages: {
    signIn: '/login',
    // error: '/auth/error',
  },

  /**
   * 🎓 LESSON: Providers Array
   *
   * Each provider is an authentication method.
   * You can have multiple (Credentials + Google + GitHub).
   */
  providers: [
    Credentials({
      /**
       * 🎓 LESSON: authorize()
       *
       * This function runs when user submits login form.
       * It receives credentials and must return:
       * - User object → login success
       * - null → login failed
       *
       * This is where we call YOUR FastAPI backend.
       */
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          // Call YOUR FastAPI backend
          const response = await fetch(`${appConfig.apiUrl}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            return null; // Login failed
          }

          const data = await response.json();

          /**
           * 🎓 LESSON: Return User Object
           *
           * Whatever we return here goes into the JWT/session.
           * We store the access_token to use it for API calls.
           */
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.full_name,
            image: data.user.profile_picture_url,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],

  /**
   * 🎓 LESSON: Callbacks
   *
   * Callbacks let you hook into the auth flow.
   * They run at specific moments and let you modify data.
   */
  callbacks: {
    /**
     * 🎓 LESSON: jwt() callback
     *
     * Runs when JWT is created or updated.
     * Used to persist extra data (like accessToken) in the JWT.
     *
     * Flow:
     * 1. User logs in → authorize() returns user
     * 2. jwt() receives user, adds to token
     * 3. Token is encrypted and stored in cookie
     */
    async jwt({ token, user }) {
      // First login: user object is available
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    /**
     * 🎓 LESSON: session() callback
     *
     * Runs when session is read (auth(), useSession()).
     * Used to expose data from JWT to the client.
     *
     * Why separate jwt() and session()?
     * - JWT contains sensitive data (tokens) → encrypted
     * - Session is what client sees → only safe data
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        // Expose accessToken so we can use it for API calls
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  /**
   * 🎓 LESSON: Session Strategy
   *
   * - "jwt": Token stored in cookie, validated by signature (default)
   * - "database": Session stored in DB, cookie has session ID
   *
   * JWT is simpler (no DB needed) and works well with external APIs.
   */
  session: {
    strategy: 'jwt',
  },
});
