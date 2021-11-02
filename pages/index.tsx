import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'
import { useState } from 'react'
// import useSWR from 'swr'
// import Header from '../components/layout/Header'
import styles from '../styles/home.module.css'
import {
  Button,
  Box,
  // Container,
  Flex,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'
// import Logo from '../components/layout/Logo'

// const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then(res => res.json())

// function useUsers() {
//   const {data, error} = useSWR('/api/users', fetcher)

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }

// function useHello() {
//   const { data, error } = useSWR('/api/hello', fetcher)

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }


const LoginForm = () => {
  const { data: session, status } = useSession()
  const [isLoadingSignIn, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true)
    signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })
  }

  return (
    <>
      {status === 'unauthenticated' && !session ? (
        <>
          <Button
            colorScheme="brand"
            isLoading={isLoadingSignIn}
            // variant="solid"
            onClick={handleSignIn}
            leftIcon={<FaGoogle />}
          >
            Sign in with Google
          </Button>
        </>
      ) : ''}
    </>
  )
}

const Home: NextPage = () => {
  // const {data, isLoading, isError} = useHello()
  // const users = useUsers()
  const bg = useColorModeValue('gray.50', 'inherit')

  return (
    <>
      <Head>
        <meta name="description" content="kush app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex bg={bg} minH="100vh">
        <Box flex="1" bg="brand.600" position="relative">
          <Flex justify="center" h="100%" align="center">
            <Heading as="h1" color="white">Transitmoney</Heading>
          </Flex>
          <div className={styles.scrollDown}>scroll for more information</div>
        </Box>
        <Box flex="1" bg="gray.50">
          <Flex justify="center" h="100%" align="center">
            <LoginForm />
          </Flex>
        </Box>
      </Flex>
      <Box
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}
      >
        TODO info about app
      </Box>

      <footer>
        {/* <div>{data ? <a href={data.link} target="_blank" rel="noopener noreferrer">{data.name}</a> : 'Loading...'}</div> */}
        <div className={styles.footerLinks}>
          <a className={styles.link}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">deploy</a>
        </div>
      </footer>
    </>
  )
}

export default Home