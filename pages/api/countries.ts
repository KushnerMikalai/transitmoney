import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'

const handler: NextApiHandler = async (_, res) => {
  try {
    const session = await getSession({ req: _ })

    if (session) {
      const db = (await clientPromise).db('dev_1')
      const countries = await db.collection('countries')
        .find({cioc: { $in: ['BLR', 'RUS', 'UKR', 'POL']} })
        .project({
          cioc: 1,
          name: 1,
          flag: 1,
          currencies: 1,
        })
        .toArray()

      return res.json(countries)
    } else {
      res.status(401).json('Access Denied')
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default handler