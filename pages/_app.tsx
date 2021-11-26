import type {AppProps} from 'next/app'
import {SessionProvider} from 'next-auth/react'
import {ChakraProvider} from '@chakra-ui/react'
import theme from '../theme'
import {useCreateStore, Provider} from '../lib/store'

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  const createStore = useCreateStore(pageProps.initialState)

  return (
    <Provider createStore={createStore}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  )
}
