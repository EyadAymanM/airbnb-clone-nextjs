// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       async authorize(credentials, req) {
//         const res = await fetch("http://localhost:3000/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });

//         const user = await res.json();
        
        

//         if (user.access_token) {
//           return user;
//         } else {
//           throw new Error('wrong email or password')
//         }

//       },
//     })
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//     updateAge: 60 * 60
//   },
//   pages: {
//     signIn: '/auth/login',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//       session.user = {token,user};
//       return session;
//     },
//   }

// })