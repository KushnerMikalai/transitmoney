import { ReactElement, useState } from 'react'
import {
  Box,
  Flex,
  Spinner,
  // useBreakpointValue,
  // useColorModeValue,
} from '@chakra-ui/react'
// import { useSession, getSession } from 'next-auth/react'
// import StartPlan from '../StartPlan/StartPlan'
// import Sidebar from './Sidebar'
import {useEntrypoint} from '../../lib/swr-hooks'

type LayoutAppType<T = {}> = {
  children?: React.ReactNode
}

// const smVariant = { navigation: 'drawer', navigationButton: true }
// const mdVariant = { navigation: 'sidebar', navigationButton: false }

const LayoutApp = ({ children }: LayoutAppType): ReactElement => {
  // const bg = useColorModeValue('gray.200', 'inherit')
  // const { data: session, status } = useSession()
  const {data, isLoading, isError} = useEntrypoint()


  // const [isSidebarOpen, setSidebarOpen] = useState(false)
  // const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
  // const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  if (isLoading) {
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

  if (isError) {
    return <p>Access Denied</p>
  }

  return (
    <Flex minH="100vh">
      {/* <Sidebar
        variant={variants?.navigation || 'sidebar'}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      /> */}
      <Box
        // ml={!variants?.navigationButton ? 260 : 0}
        minH="100%"
        w="100%"
        transition="all .1s ease-in-out"
      >
        <Box
          minH="100%"
          px="5"
          backgroundImage="radial-gradient(#E2E8F0 2%, transparent 11%), radial-gradient(#E2E8F0 2%, transparent 11%)"
          backgroundSize="20px 20px"
        >
          {/* {variants?.navigationButton && <button onClick={toggleSidebar}>toggle sidebar</button>} */}
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default LayoutApp
