"use client";

import { cn } from "@/lib/utils";
import { useGameStore } from "@/providers/game-store-provider";
import { Move } from "@/types/Move";
import { ChevronsDownIcon, ChevronsUpIcon, MapPinIcon } from "lucide-react";
import Board from "./Board";
import { Button } from "./ui/button";

export default function Game() {
  const {
    history,
    setHistory,
    currentMove,
    showHistory,
    setCurrentMove,
    movesAscending,
    setMovesAscending,
    setShowHistory,
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
      ? `Move #${index} (${move.coordinates?.row}, ${move.coordinates?.col})`
      : `START`;
    return (
      <li key={index}>
        {index === currentMove && index !== 0 ? (
          <div className="flex gap-2 items-center  h-full">
            <MapPinIcon className="w-4 h-4" />({move.coordinates?.row},{" "}
            {move.coordinates?.col})
          </div>
        ) : (
          <Button
            className={cn(
              index === 0 ? "font-semibold" : "",
              "w-full border border-gray-300 text-base"
            )}
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
     justify-center sm:justify-between"
    >
      <div className="flex flex-col items-center justify-center p-6 lg:p-12 lg:px-20">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="border border-gray-200 rounded-full p-2 w-fit mx-auto"
      >
        {showHistory ? (
          <ChevronsDownIcon className="w-8 h-8" />
        ) : (
          <ChevronsUpIcon className="w-8 h-8" />
        )}
      </button>
      {showHistory && (
        <div className="px-2 lg:px-6 py-4 lg:py-10 grow ">
          <ol className="flex flex-wrap gap-2">
            {movesAscending ? moves : moves.reverse()}
          </ol>
          <Button
            onClick={toggleMovesOrder}
            className="mt-6 sm:mt-6 w-full font-bold h-12 rounded-xl text-lg"
          >
            Sort by {movesAscending ? "Descending" : "Ascending"}
          </Button>
        </div>
      )}
    </div>
  );
}
