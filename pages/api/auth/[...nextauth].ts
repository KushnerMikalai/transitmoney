import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../lib/mongodb'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: (await clientPromise).db('dev_1')
    }),
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
}