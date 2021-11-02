import { useSession, signOut, signIn } from 'next-auth/react'
import Link from 'next/link'
import {
  Button,
  useColorMode,
  HStack,
  Box,
  Container,
  Flex,
} from "@chakra-ui/react"
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import Logo from './Logo'
import styles from './Header.module.css'

const Header = () => {
  const { data: session, status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLoadingSignIn, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true)
    signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })
  }

  const Auth = () => {
    return (
      <HStack spacing="24px">
        <Box>
          <span className="mr-4 text-xs">{session?.user?.email}</span>
        </Box>
        <Box>
          <Button onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}>
            Sign out
          </Button>
        </Box>
      </HStack>
    )
  }

  return (
    <header className={styles.header}>
      <Container maxW="container.xl" >
        <Flex align="center">
          <Link href="/">
            <a><Logo /></a>
          </Link>
          <nav className={styles.nav}>
            <Button onClick={toggleColorMode}>
              toggle {colorMode === 'light' ? 'dark' : 'light'}
            </Button>
            {session && (<ul>
              <li>
                <Link href="/">
                  <a>home</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a>dashboard</a>
                </Link>
              </li>
            </ul>)}
            <div className="auth">
              {status === 'unauthenticated' && !session && (
                <>
                  <Button
                    isLoading={isLoadingSignIn}
                    color="currentColor"
                    variant="solid"
                    onClick={handleSignIn}
                    leftIcon={<FaGoogle />}
                  >
                    Sign in with Google
                  </Button>
                </>
              )}
              {session && (<Auth />)}
            </div>
          </nav>
        </Flex>
      </Container>

      {/*language=CSS*/}
      <style jsx>{`
        .hd-nav ul {
          display: flex;
          list-style: none;
        }

        .hd-nav ul li {
          margin-left: 10px;
        }

        .auth {
          margin-left: 24px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </header>
  )
}

export default Header