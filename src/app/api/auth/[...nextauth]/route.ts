/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUrl from '@/config/config';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${apiUrl}/usuarios/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              username: credentials?.username ?? '',
              password: credentials?.password ?? '',
            }),
          });

          if (!res.ok) {
            throw new Error('Login failed');
          }

          const user = await res.json();
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          throw new Error('Login failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any)?.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  secret: 'your_secret_key',
});

export { handler as GET, handler as POST };