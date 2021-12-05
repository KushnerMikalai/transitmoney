import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import clientPromise from '../../../lib/mongodb'

const handler: NextApiHandler = async (_, res) => {
  try {
    const session = await getSession({ req: _ })

    if (session) {
      const db = (await clientPromise).db('dev_1')

      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countries = await response.json()

        if (Array.isArray(countries) && countries.length) {
          await db.collection('countries').deleteMany({})
          await db.collection('currencies').deleteMany({})

          await db.collection('countries').insertMany(countries)
          const currencies: any = {};

          countries.forEach((item: any) => {
            if (item && item.currencies) {
              const keys = Object.keys(item.currencies);

              if (Array.isArray(keys)) {
                keys.forEach(key => {
                  if (key && !currencies[key]) {
                    currencies[key] = {
                      ...item.currencies[key],
                      key,
                    }
                  }
                });
              }
            }
          });

          await db.collection('currencies').insertMany(Object.values(currencies));
        }


        res.json('done')
      } catch(e: any) {
        res.status(500).json({ message: e.message })
      }

    } else {
      res.status(401).json('access_denied')
    }
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export default handler