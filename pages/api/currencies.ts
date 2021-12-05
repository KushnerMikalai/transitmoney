import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'

const handler: NextApiHandler = async (_, res) => {
  try {
    const session = await getSession({ req: _ })

    if (session) {
      const db = (await clientPromise).db('dev_1')
      const currencies = await db.collection('currencies')
        .find({key: { $in: ['EUR', 'USD', 'RUB', 'KZT', 'GBP', 'BYN', 'UAH']}})
        .toArray()

      return res.json(currencies)
    } else {
      res.status(401).json('Access Denied')
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default handler