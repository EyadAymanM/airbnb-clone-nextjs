import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          const user = response.data;
          if (user) {
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60, 
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.idToken) {
        token.idToken = user.idToken;
        // token.picture = user.image;
      }
      if (user) {
        token.user = user;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // session.idToken = token.idToken;  
      session.user = {token,user};
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };