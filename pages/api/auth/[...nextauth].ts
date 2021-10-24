import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {TypeORMLegacyAdapter} from '@next-auth/typeorm-legacy-adapter'

export default NextAuth({
  adapter: TypeORMLegacyAdapter(process.env.MYSQL_URL || ''),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    session({session, token, user}) {
      return session
    },
  },
})