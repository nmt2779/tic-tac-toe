"use client";
import { useState } from "react";
import Board from "./Board";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [movesAscending, setMovesAscending] = useState<boolean>(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleMovesOrder() {
    setMovesAscending(!movesAscending);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        {move === currentMove ? (
          "You are at move #" + move
        ) : (
          <Button
            className={cn(move === 0 ? "font-semibold" : "")}
            variant={"outline"}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </Button>
        )}
      </li>
    );
  });

  return (
    <div className="w-full max-w-[600px] flex flex-col sm:flex-row justify-center gap-10 ">
      <div className="flex flex-col items-center p-4">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className=" p-4 grow">
        <ol className="grid grid-rows-5 grid-flow-col gap-2">
          {movesAscending ? moves : moves.reverse()}
        </ol>
        <Button onClick={toggleMovesOrder} className="mt-2 w-full">
          Sort by {movesAscending ? "Descending" : "Ascending"}
        </Button>
      </div>
    </div>
  );
}
