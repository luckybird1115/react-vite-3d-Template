import { create } from "zustand";

const useStore = create((set) => ({

    foundationSize: {
        width: 5,
        depth: 3,
    },
    setFoundationSize: (v) => {
        set({ foundationSize: v });
    },

}));

export default useStore;
