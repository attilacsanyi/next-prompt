import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    /*
     * Serverless function to get the session
     * Docs: https://next-auth.js.org/configuration/callbacks#session-callback
     */
    async session({ session }) {
      if (session.user?.email) {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },
    /*
     * Serverless function to sign in the user
     * Docs: https://next-auth.js.org/configuration/callbacks#sign-in-callback
     */
    async signIn({ profile }) {
      try {
        if (!profile) {
          throw new Error('Profile is required');
        }

        await connectToDB();

        const { name = '', email = '', image = '' } = profile;

        // Check if user already exist
        const user = await User.findOne({ email });

        // If not create a user in the database
        if (!user) {
          await User.create({
            email,
            image,
            username: name.replace(' ', '').toLowerCase(),
          });
        }

        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
  },
} satisfies NextAuthOptions;

/**
 * Read the session in server components
 * Docs: https://next-auth.js.org/configuration/nextjs#getserversession
 */
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
