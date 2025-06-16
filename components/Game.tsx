"use client";

import Board from "./Board";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";
import { Move } from "@/types/Move";
import { useGameStore } from "@/providers/game-store-provider";

export default function Game() {
  const {
    history,
    setHistory,
    currentMove,
    setCurrentMove,
    movesAscending,
    setMovesAscending,
  } = useGameStore((state) => state);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(move: Move) {
    const nextHistory = [...history.slice(0, currentMove + 1), move];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleMovesOrder() {
    setMovesAscending(!movesAscending);
  }

  const moves = history.map((move, index) => {
    const desc = index
      ? `Go to move #${index} (${move.coordinates?.row}, ${move.coordinates?.col})`
      : `Go to game start`;
    return (
      <li key={index}>
        {index === currentMove && index !== 0 ? (
          <div className="flex gap-2 items-center  h-full">
            <MapPinIcon className="w-4 h-4" />({move.coordinates?.row},{" "}
            {move.coordinates?.col})
          </div>
        ) : (
          <Button
            className={cn(index === 0 ? "font-semibold" : "", "w-full")}
            variant={"outline"}
            onClick={() => jumpTo(index)}
          >
            {desc}
          </Button>
        )}
      </li>
    );
  });

  return (
    <div
      className="w-full max-w-[700px] lg:max-w-[900px] flex flex-col sm:flex-row
     justify-center sm:justify-between border border-gray-300 shadow-md rounded-2xl "
    >
      <div className="flex flex-col items-center justify-center p-6 lg:p-12">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="px-2 lg:px-6 py-4 lg:py-10 grow border-t sm:border-t-0 sm:border-l border-gray-300 ">
        <ol className="w-full grid grid-rows-5 grid-cols-2 grid-flow-col gap-3 lg:gap-5">
          {movesAscending ? moves : moves.reverse()}
        </ol>
        <Button
          onClick={toggleMovesOrder}
          className="mt-6 sm:mt-6 w-full font-semibold"
        >
          Sort by {movesAscending ? "Descending" : "Ascending"}
        </Button>
      </div>
    </div>
  );
}
