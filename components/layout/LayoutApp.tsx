import {ReactElement} from 'react'
import {useSession} from 'next-auth/react'
import {Box, useColorModeValue} from '@chakra-ui/react'

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

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '2', lg: '8' }}
    >
      {children}
    </Box>
  )
}

export default LayoutApp
