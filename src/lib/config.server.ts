// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// Read env inside functions/handlers (not at module scope) so values resolve
// correctly at request time on Vercel and in local SSR.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline Bun.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function getServerConfig() {
  return {
    nodeEnv: Bun.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: Bun.env.DATABASE_URL,
    //   stripeSecretKey: Bun.env.STRIPE_SECRET_KEY,
  };
}
