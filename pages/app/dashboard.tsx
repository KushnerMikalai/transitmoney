import type { GetServerSideProps } from 'next'
import LayoutApp from '../../components/layout/LayoutApp'
import { useSession, getSession } from 'next-auth/react'
import { useBearStore } from '../../store/useBearStore'
import { useBeesStore } from '../../store/useBeesStore'
import Clock from '../../components/Clock'
import useInterval from '../../lib/useInterval'
import { useStore, initializeStore } from '../../lib/store'

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return <button onClick={increasePopulation}>one up</button>;
}

export default function Dashboard() {
  const { data: session } = useSession()

  // @ts-ignore
  const { tick } = useStore()

  useInterval(() => {
    tick(Date.now(), true)
  }, 1000)

  const bees = useBeesStore((state) => state.bees);
  const increaseBees = useBeesStore((state) => state.increasePopulation);

  return (
    <LayoutApp isAuth={Boolean(session)}>
      <BearCounter />
      <Controls />
      <Clock />
      <hr />
      <h2>Bees</h2>
      {bees} <button onClick={increaseBees}>More Bees</button>
    </LayoutApp>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const store = initializeStore()
  // @ts-ignore
  store.getState().tick(Date.now(), false)

  return {
    props: {
      session: await getSession(context),
      initialState: JSON.parse(JSON.stringify(store.getState())),
    }
  }
}