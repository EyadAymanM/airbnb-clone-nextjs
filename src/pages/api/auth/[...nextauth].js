import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const api = process.env.NEXT_PUBLIC_API_URL
export default NextAuth({

  providers: [
  
    CredentialsProvider({
      name: "Your E-mail",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const res = await fetch(`${api}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        
        

        if (user.access_token) {
          return user;
        } else {
          throw new Error('wrong email or password')
        }

      },
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = {token,user};
      return session;
    },
  }

})