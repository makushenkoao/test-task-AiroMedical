import { Beer } from "../types/beer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const __API__ = "https://api.punkapi.com/v2/beers";

type BeerStore = {
  beers: Beer[];
  isBeersLoading?: boolean;
  isBeersError: boolean;
  page: number;
  selectedBeers: number[];
  setBeers: (beers: Beer[]) => void;
  setPage: (page: number) => void;
  incrementPage: () => void;
  setSelectedBeers: (id: number) => void;
  deleteSelectedBeers: () => void;
  clearSelectedBeers: () => void;
  isLastPage: boolean;
  fetchBeers: () => void;
};

export const useBeerStore = create(
  devtools<BeerStore>((set, get) => ({
    beers: [],
    isBeersError: false,
    page: 1,
    selectedBeers: [],
    isLastPage: false,
    setBeers: (beers) => {
      set({ beers });
    },
    setPage: (page) => {
      set({ page });
    },
    incrementPage: () => {
      set({ page: get().page + 1 });
    },
    setSelectedBeers: (id) => {
      set((state) => {
        if (state.selectedBeers.includes(id)) {
          return {
            selectedBeers: state.selectedBeers.filter((item) => item !== id),
          };
        } else {
          return {
            selectedBeers: [...state.selectedBeers, id],
          };
        }
      });
    },
    deleteSelectedBeers: () => {
      set((state) => ({
        beers: state.beers.filter(
          (beer) => !state.selectedBeers.includes(beer.id)
        ),
        selectedBeers: [],
      }));
    },
    clearSelectedBeers: () => {
      set({ selectedBeers: [] });
    },
    fetchBeers: async () => {
      try {
        set({ isBeersLoading: true, isBeersError: false });
        const response = await fetch(`${__API__}?page=${get().page}`);
        if (!response.ok) {
          throw new Error("A server error has occurred.");
        }
        const data = await response.json();
        if (!data.length) {
          set({ isLastPage: true, isBeersError: true, isBeersLoading: false });
          return;
        }
        set({ beers: data, isBeersLoading: false });
      } catch (error) {
        set({ isBeersError: true, isBeersLoading: false });
      }
    },
  }))
);
