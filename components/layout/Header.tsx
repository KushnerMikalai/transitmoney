import {useSession, signOut, signIn} from 'next-auth/react'
import Link from 'next/link'
import {
  Button,
  useColorMode,
  HStack,
  Box,
  VisuallyHidden,
  Container,
} from "@chakra-ui/react"
import {FaGoogle} from 'react-icons/fa'
import {useState} from 'react'

const Header = () => {
  const {data: session, status} = useSession()
  const {colorMode, toggleColorMode} = useColorMode()
  const [isLoadingSignIn, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true)
    signIn('google', {callbackUrl: `${window.location.origin}/dashboard`})
  }

  const Auth = () => {
    return (
      <HStack spacing="24px">
        <Box>
          <span className="mr-4 text-xs">{session?.user?.email}</span>
        </Box>
        <Box>
          <Button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>
            Sign out
          </Button>
        </Box>
      </HStack>
    )
  }

  return (
    <header className="hd">
      <Container maxW="container.xl" centerContent>
        <Link href="/">
          <a className="logo">Transitmoney</a>
        </Link>
        <nav className="hd-nav">
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
      </Container>

      {/*language=CSS*/}
      <style jsx>{`
        .hd {
          position: sticky;
          top: 0;
          width: 100%;
        }

        .logo {
          margin-right: 20px;
          font-weight: 600;
          font-size: 21px;
        }

        .hd-nav {
          display: flex;
          align-items: center;
          margin-left: auto;
        }

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