import {
  Button,
  Avatar,
  Flex,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import {
  HiSelector,
  HiUser,
} from 'react-icons/hi'

const HeaderLite = () => {
  const { data: session } = useSession()

  return (
    <Flex
      px="4"
      py="4"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize='xl' textTransform="uppercase" fontWeight="bold">Transitmoney</Text>
      <Menu id="navbar" isLazy matchWidth={true}>
        <MenuButton
          key="sss"
          as={Button}
          colorScheme='brand'
          leftIcon={<HiUser />}
          rightIcon={<HiSelector />}
        >
          {session?.user?.email}
        </MenuButton>
        <MenuList w="100%">
          <MenuItem onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}>
            Выйти
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default HeaderLite