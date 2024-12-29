"use client";

import { createGameStore, GameStore, initGameStore } from "@/stores/gameStore";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(
  undefined
);

export interface GameStoreProviderProps {
  children: React.ReactNode;
}

export const GameStoreProvider = ({ children }: GameStoreProviderProps) => {
  const storeRef = useRef<GameStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createGameStore(initGameStore());
  }

  return (
    <GameStoreContext.Provider value={storeRef.current}>
      {children}
    </GameStoreContext.Provider>
  );
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);

  if (!gameStoreContext) {
    throw new Error("useGameStore must be used within a GameStoreProvider");
  }

  return useStore(gameStoreContext, selector);
};
