import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
} from '@chakra-ui/react'
import {
  HiSelector,
  HiOutlineHome,
  HiOutlineSortDescending,
  HiOutlineViewList
} from 'react-icons/hi'

interface Props {
  onClose: () => void
  isOpen: boolean
  variant: 'drawer' | 'sidebar' | string,
}

interface PropsSidebarContent {
  onClick: () => void
}

const menuMap = [
  {
    link: '/app/dashboard',
    name: 'Dashboard',
    icon: (<HiOutlineHome />)
  },
  {
    link: '/app/expenses',
    name: 'Expenses',
    icon: (<HiOutlineSortDescending />)
  },
  {
    link: '/app/categories',
    name: 'Categories',
    icon: (<HiOutlineViewList />)
  }
]

const Auth = () => {
  const { data: session } = useSession()

  return (
    <Box mb="10">
      <Menu matchWidth={true}>
        <MenuButton w="100%" size="lg" px="4" as={Button} rightIcon={<HiSelector />}>
          <HStack spacing="10px">
            <Avatar bg="brand.600" color="white" size="sm" name={session?.user?.email} />
            <Text
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="136px"
              fontSize="xs"
            >
              {session?.user?.name || session?.user?.email}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList w="100%">
          <MenuItem onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

const SidebarContent = (props: PropsSidebarContent) => {
  const router = useRouter()

  return (
    <VStack>
      {menuMap.map(item => (
        <Link key={item.link} href={item.link} passHref>
          <Box
            as="a"
            px="3"
            py="2"
            color={router.route === item.link ? '' : 'gray.800'}
            display="flex"
            alignItems="center"
            fontSize="14"
            w="100%"
            borderRadius="md"
            bg={router.route === item.link ? 'gray.200' : 'tansparent'}
            transitionProperty="background"
            transitionDuration="160ms"
            _hover={{
              bg: router.route === item.link ? 'gray.200' : 'gray.100'
            }}
          >
            {item.icon}
            <Text ml="2">{item.name}</Text>
          </Box>
        </Link>
      ))}
    </VStack>
  )
}

const Sidebar = ({ isOpen, variant, onClose }: Props) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left="0"
      p="5"
      w="260px"
      top="0"
      h="100%"
      transition="all .1s ease-in-out"
      boxShadow="inner"
    >
      <Auth />
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>login</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar
