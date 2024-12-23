"use client";
import { useState } from "react";
import Board from "./Board";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";
import { Move } from "@/types/Move";

export default function Game() {
  const [history, setHistory] = useState<Move[]>([
    { squares: Array(9).fill(null), coordinates: { row: 0, col: 0 } },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [movesAscending, setMovesAscending] = useState<boolean>(true);
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
      ? `Go to move #${index} (${move.coordinates.row}, ${move.coordinates.col})`
      : `Go to game start`;
    return (
      <li key={index}>
        {index === currentMove && index !== 0 ? (
          <div className="flex gap-2 items-center">
            <MapPinIcon className="w-4 h-4" />({move.coordinates.row},{" "}
            {move.coordinates.col})
          </div>
        ) : (
          <Button
            className={cn(index === 0 ? "font-semibold" : "")}
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
      className="w-full max-w-[600px] flex flex-col sm:flex-row
     justify-center border shadow-md rounded-lg "
    >
      <div className="flex flex-col items-center justify-center p-6">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="p-6 grow">
        <ol className="grid grid-rows-5 grid-flow-col gap-4">
          {movesAscending ? moves : moves.reverse()}
        </ol>
        <Button onClick={toggleMovesOrder} className="mt-10 sm:mt-6 w-full">
          Sort by {movesAscending ? "Descending" : "Ascending"}
        </Button>
      </div>
    </div>
  );
}
