import {NextApiHandler} from 'next'
import {query} from '../../lib/db'
import {getSession} from "next-auth/react"

const handler: NextApiHandler = async (_, res) => {
  try {
    const session = await getSession({req: _})
    const email = session?.user?.email || '';

    if (session) {
      const results = await query(`SELECT * FROM users WHERE Email = "${email}" LIMIT 1`)

      return res.json(results)
    } else {
      res.status(401).json('Access Denied')
    }

  } catch (e) {
    res.status(500).json({message: e.message})
  }
}

export default handler