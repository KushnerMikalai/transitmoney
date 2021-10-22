import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) => fetch(input, init).then(res => res.json())

function usePosts () {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

function useHello () {
  const { data, error } = useSWR('/api/hello', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

const Home: NextPage = () => {
  const { data, isLoading, isError } = useHello()
  const posts = usePosts()

  return (
    <div className={styles.container}>
      <Head>
        <title>kush</title>
        <meta name="description" content="kush app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>kush</h1>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>docs &rarr;</a>
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >deploy &rarr;</a>
        </div>

        <hr/>
        {posts.isLoading ? <p>Loading Posts</p> :
          <ul>
            {posts.data.map((post: any) => <li key={post.id}>{post.title}</li>)}
          </ul>
        }
      </main>

      <footer className={styles.footer}>
        {data ? <a href={data.link} target="_blank" rel="noopener noreferrer">{data.name}</a> : 'Loading...'}
      </footer>
    </div>
  )
}

export default Home
