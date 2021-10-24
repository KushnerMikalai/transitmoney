import {ReactElement} from 'react'
import {useSession} from 'next-auth/react'

type LayoutAppType<T = {}> = {
  children?: React.ReactNode
}

const LayoutApp = ({children}: LayoutAppType): ReactElement => {
  const {data: session, status} = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return <>{children}</>
}

export default LayoutApp
