import {useSession, signOut, signIn} from 'next-auth/react'
import Link from 'next/link'

const Header = () => {
  const {data: session, status} = useSession()

  return (
    <header className="hd">
      <div className="hd-content">
        <Link href="/">
          <a className="logo">Kush</a>
        </Link>
        <nav className="hd-nav">
          <div className="auth">
            {status === 'unauthenticated' && !session && (
              <>
                <button
                  className="sign-in text-xs"
                  onClick={() => signIn('google', {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  })}>
                  <i className="sign-in__icon"
                     style={{backgroundImage: `url(https://www.google.com/s2/favicons?sz=64&domain_url=google.com)`}}></i>
                  Sign in with Google
                </button>
              </>
            )}
            {session && (
              <>
                <span className="mr-4 text-xs">{session.user.email}</span>
                <button
                  className="sign-in text-xs"
                  onClick={() =>
                    signOut({callbackUrl: `${window.location.origin}`})
                  }
                >
                  Sign out
                </button>
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
          /*-webkit-backdrop-filter: saturate(180%) blur(20px);*/
          /*backdrop-filter: saturate(180%) blur(20px);*/
          /*background-color: rgba(255, 255, 255, 0.72);*/

          /*box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;*/
          /*box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;*/
          /*box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;*/
        }

        .logo {
          margin-right: 20px;
          font-weight: 600;
          font-size: 21px;
        }

        .hd-nav {
          margin-left: auto;
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

        .sign-in {
          display: flex;
          align-items: center;
          background: #272729;
          color: #fff;
          border-radius: 15px;
          border: none;
          margin: 0;
          padding: 4px 11px;
          cursor: pointer;
          transition: all 150ms ease-in-out;
        }

        .sign-in:hover {
        }

        .sign-in__icon {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-right: 10px;
          background-size: contain;
        }
      `}</style>
    </header>
  )
}

export default Header