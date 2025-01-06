import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // User ID missing in the session
    } & DefaultSession['user'];
  }
}
