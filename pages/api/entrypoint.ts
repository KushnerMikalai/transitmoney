import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'

const handler: NextApiHandler = async (_, res) => {
  try {
    const session = await getSession({ req: _ })

    if (session) {
      const db = (await clientPromise).db('dev_1')
      const user = await db.collection('users').findOne({ email: session.user.email })
      const budgets = await db.collection('budgets').find({ userId: user._id }).toArray()

      delete user._id
      delete user.emailVerified

      return res.json({
        user,
        budgets
      })
    } else {
      res.status(401).json('Access Denied')
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default handler