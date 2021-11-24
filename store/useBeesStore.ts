import create from "zustand";
import { devtools } from "zustand/middleware";

type BeesState = {
  bees: number;
  increasePopulation: () => void;
  removeAllBees: () => void;
};

const useBeesStore = create<BeesState>(
  devtools(
    (set) => ({
      bees: 0,
      increasePopulation: () => set((state) => ({ bees: state.bees + 10 })),
      removeAllBees: () => set({ bees: 0 })
    }),
    "bees"
  )
);

export { useBeesStore };
