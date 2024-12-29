import { Move } from "@/types/Move";
import { createStore } from "zustand/vanilla";

export type GameState = { 
  history: Move[];
  currentMove: number;
  movesAscending: boolean;
}

export type GameActions = { 
  setHistory: (history: Move[]) => void;
  setCurrentMove: (currentMove: number) => void;
  setMovesAscending: (movesAscending: boolean) => void;
}

export type GameStore = GameState & GameActions;

export const initGameStore = (): GameState => {
  return {
    history: [{ squares: Array(9).fill(null), coordinates: { row: 0, col: 0 } }],
    currentMove: 0,
    movesAscending: true,
  }
}

export const defaultInitialState: GameState = {
  history: [{ squares: Array(9).fill(null), coordinates: { row: 0, col: 0 } }],
  currentMove: 0,
  movesAscending: true,
};

export const createGameStore = (initState: GameState = defaultInitialState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    setHistory: (history: Move[]) => set((state) => ({ ...state, history })),
    setCurrentMove: (currentMove: number) => set((state) => ({ ...state, currentMove })),
    setMovesAscending: (movesAscending: boolean) => set((state) => ({ ...state, movesAscending })),
  }));
}