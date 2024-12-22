"use client";
import { useState } from "react";
import Board from "./Board";
import { Button } from "./ui/button";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
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

  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <Button variant={"outline"} onClick={() => jumpTo(move)}>
          {desc}
        </Button>
      </li>
    );
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol className="grid grid-rows-5 grid-flow-col gap-2">{moves}</ol>
      </div>
    </div>
  );
}
