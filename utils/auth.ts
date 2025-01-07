import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import NextAuth, { type Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  trustHost: true,
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
      const isValidProfile = (
        profile?: Profile
      ): profile is { email: string; name: string; picture: string } => {
        if (!profile || !profile.email || !profile.name || !profile.picture) {
          throw new Error(
            'Profile is required and must have email, name, and picture'
          );
        }

        return true;
      };

      try {
        if (!isValidProfile(profile)) {
          throw new Error('Invalid profile');
        }

        await connectToDB();

        const { name, email, picture: image } = profile;

        // Check if user already exist
        const user = await User.findOne({ email: profile.email });

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
});
