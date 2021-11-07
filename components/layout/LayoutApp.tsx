import { ReactElement, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Box,
  Flex,
  Spinner,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import Sidebar from './Sidebar'

type LayoutAppType<T = {}> = {
  children?: React.ReactNode
}

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

const LayoutApp = ({ children }: LayoutAppType): ReactElement => {
  const { data: session, status } = useSession()
  const bg = useColorModeValue('gray.200', 'inherit')

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  if (status === 'loading') {
    return <Box
      w="100%"
      minH="100vh"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.500"
        size="xl"
      />
    </Box>
  }

  if (status === 'unauthenticated') {
    return <p>access denied :(</p>
  }

  return (
    <Flex
      minH="100vh"
    >
      <Sidebar
        variant={variants?.navigation || 'sidebar'}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box
        ml={!variants?.navigationButton && 260}
        minH="100%"
        w="100%"
        bg="white"
        transition="all .1s ease-in-out"
      >
        <Box
          minH="100%"
          px="5"
          pb="5"
          bg="gray.50"
        >
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutApp
