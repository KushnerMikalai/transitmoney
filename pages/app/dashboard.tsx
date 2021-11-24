import LayoutApp from '../../components/layout/LayoutApp'
// import StartPlan from '../../components/StartPlan/StartPlan'
import { useBearStore } from "../../store/useBearStore";
import { useBeesStore } from "../../store/useBeesStore";

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return <button onClick={increasePopulation}>one up</button>;
}

export default function Dashboard() {
  const bees = useBeesStore((state) => state.bees);
  const increaseBees = useBeesStore((state) => state.increasePopulation);

  return (
    <LayoutApp>
      <BearCounter/>
      <Controls/>

      <hr/>
      <h2>Bees</h2>
      {bees} <button onClick={increaseBees}>More Bees</button>

    </LayoutApp>
  )
}