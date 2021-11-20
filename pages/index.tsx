import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useSession, signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
// import useSWR from 'swr'
import styles from '../styles/home.module.css'
import {
  Button,
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'

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
    signIn('google')
  }

  return (
    <>
      {!session ? (
        <>
          <Button
            colorScheme="brand"
            isLoading={isLoadingSignIn || status === 'loading'}
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

const Home: NextPage = (props) => {
  // const {data, isLoading, isError} = useHello()
  // const users = useUsers()
  const bg = useColorModeValue('gray.50', 'inherit')
  const siteName = 'transitmoney'

  return (
    <>
      <Head>
        <meta name="description" content="kush app" />
        <link rel="icon" href="/favicon.ico" />
        <title>{siteName}</title>
      </Head>

      <Flex bg={bg} minH="100vh">
        <Box pb="10" flex="1" bg="brand.600" position="relative">
          <Flex justify="center" h="100%" align="center" direction="column">
            <Heading as="h1" mb="6" color="white">{siteName}</Heading>
            <Text
              fontSize="xl"
              maxW="400"
              textAlign="center"
              color="white"
            >some text to motivate you to enter the application</Text>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/app/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default Home