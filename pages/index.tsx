import type {NextPage} from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import {useSession, signOut, signIn} from 'next-auth/react'
import styles from '../styles/home.module.css'

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then(res => res.json())

function useUsers() {
  const {data, error} = useSWR(`https://jsonplaceholder.typicode.com/users`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

function useHello() {
  const {data, error} = useSWR('/api/hello', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

const Home: NextPage = () => {
  const {data, isLoading, isError} = useHello()
  const {data: session, status} = useSession()

  const users = useUsers()

  const styleSignIn = {
    backgroundImage: `url(https://www.google.com/s2/favicons?sz=64&domain_url=google.com)`,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>kush</title>
        <meta name="description" content="kush app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <p>
          {!session && (
            <>
              <button
                className="signIn"
                onClick={() => signIn('google', {
                  callbackUrl: `${window.location.origin}/dashboard`,
                })}>
                <i className="signIn__icon" style={styleSignIn}></i>
                Sign in with Google
              </button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br/>
              <button
                onClick={() =>
                  signOut({callbackUrl: `${window.location.origin}`})
                }
              >
                Sign out
              </button>
            </>
          )}
        </p>

        <hr/>

        {/*{users.isLoading ? <p>Loading Posts</p> :*/}
        {/*  <ul>*/}
        {/*    {users.data.map((post: any) => <li key={post.id}>{post.name}</li>)}*/}
        {/*  </ul>*/}
        {/*}*/}
      </main>

      <footer className={styles.footer}>
        <div>{data ? <a href={data.link} target="_blank" rel="noopener noreferrer">{data.name}</a> : 'Loading...'}</div>
        <div className={styles.footerLinks}>
          <a className={styles.link}
             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">deploy</a>
        </div>
      </footer>

      {/*language=CSS*/}
      <style jsx>{`
        .signIn {
          display: flex;
          align-items: center;
          border: 1px solid #d9d9d9;
          background-color: #fff;
          border-radius: 5px;
          font-size: 14px;
          padding: 7px 15px;
          cursor: pointer;
          transition: all 150ms ease-in-out;
        }

        .signIn:hover {
          background-color: #f8f8f8;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
        }

        .signIn__icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          margin-right: 10px;
          background-size: contain;
        }
      `}</style>
    </div>
  )
}

export default Home
