import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { useBeesStore } from './useBeesStore'

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useBearStore = create<BearState>(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => {
        useBeesStore.setState({ bees: 23 });
        set((state) => ({ bears: state.bears + 1 }));
      },
      removeAllBears: () => set({ bears: 0 })
    }),
    "bears"
  )
);

export { useBearStore };
