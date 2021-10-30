import type {NextPage} from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import Header from '../components/layout/Header'
import styles from '../styles/home.module.css'
import {Box, useColorModeValue} from '@chakra-ui/react'

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then(res => res.json())

function useUsers() {
  const {data, error} = useSWR('/api/users', fetcher)

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
  const users = useUsers()
  const bg = useColorModeValue('gray.50', 'inherit')

  return (
    <Box
      bg={bg}
      minH="100vh"
    >
      <Head>
        <meta name="description" content="kush app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div>
      </div>
      <Header/>
      <main className={styles.main}>
        {/* {users.isLoading ? <p>loading user data</p> :
          users.data && Array.isArray(users.data) && <ul>
            {users.data.map((user: any) => <li key={user.id}>
              {user.image && <img className="ava" src={user.image} alt=""/>}
              <span>{user.name || user.email}</span>
            </li>)}
          </ul>
        } */}
      </main>

      <footer className={styles.footer}>
        {/* <div>{data ? <a href={data.link} target="_blank" rel="noopener noreferrer">{data.name}</a> : 'Loading...'}</div> */}
        <div className={styles.footerLinks}>
          <a className={styles.link}
             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">deploy</a>
        </div>
      </footer>

      {}
      {/*language=CSS*/}
      <style jsx>{`
        .ava {
          display: inline-block;
          width: 40px;
          height: 40px;
          object-fit: contain;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>
    </Box>
  )
}

export default Home
