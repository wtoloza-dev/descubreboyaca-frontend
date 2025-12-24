/**
 * Auth.js Route Handler
 *
 * 🎓 LESSON: Why this file?
 *
 * Auth.js needs HTTP endpoints to handle:
 * - POST /api/auth/signin → Process login
 * - POST /api/auth/signout → Process logout
 * - GET /api/auth/session → Get current session
 * - GET /api/auth/providers → List available providers
 *
 * The [...nextauth] is a "catch-all" route.
 * It matches /api/auth/ANYTHING.
 *
 * We just export the handlers from our auth config.
 * Auth.js does the rest.
 */

import { handlers } from '@/auth';

export const { GET, POST } = handlers;
