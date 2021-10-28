import {useSession, signOut, signIn} from 'next-auth/react'
import Link from 'next/link'
import {Button, useColorMode} from "@chakra-ui/react"

const Header = () => {
  const {data: session, status} = useSession()
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <header className="hd">
      <div className="hd-content">
        <Link href="/">
          <a className="logo">Kush</a>
        </Link>
        <nav className="hd-nav">
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
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
                  onClick={() => signIn('google', {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  })}
                >
                  <i className="sign-in__icon"
                     style={{backgroundImage: `url(https://www.google.com/s2/favicons?sz=64&domain_url=google.com)`}}></i>
                  Sign in with Google
                </Button>
              </>
            )}
            {session && (
              <>
                <span className="mr-4 text-xs">{session.user.email}</span>
                <Button onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>
                  Sign out
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>

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

        .hd-content {
          display: flex;
          align-items: center;
          margin: 0 auto;
          max-width: 980px;
          padding: 0 22px;
          height: 52px;
          position: relative;
          z-index: 2;
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