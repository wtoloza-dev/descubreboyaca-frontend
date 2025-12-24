/**
 * NextAuth Type Extensions
 *
 * 🎓 LESSON: Module Augmentation
 *
 * Auth.js types don't include our custom fields (accessToken).
 * We extend them using TypeScript's "module augmentation".
 *
 * This tells TypeScript:
 * "Hey, Session also has accessToken, trust me"
 */

import 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the User type returned by authorize()
   */
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }

  /**
   * Extend the Session type used by auth() and useSession()
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT type used in callbacks
   */
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
