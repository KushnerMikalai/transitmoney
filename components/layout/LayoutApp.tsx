import {ReactElement} from 'react'
import {useSession} from 'next-auth/react'
import {Box, useColorModeValue} from '@chakra-ui/react'

type LayoutAppType<T = {}> = {
  children?: React.ReactNode
}

const LayoutApp = ({children}: LayoutAppType): ReactElement => {
  const {data: session, status} = useSession()
  const bg = useColorModeValue('gray.50', 'inherit')

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return (
    <Box
      bg={bg}
      minH="100vh"
    >
      {children}
    </Box>
  )
}

export default LayoutApp
