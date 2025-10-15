import calculateWinner from "@/lib/calculate-winner";
import Square from "./Square";
import { Move } from "@/types/Move";
import { motion, AnimatePresence } from "motion/react";

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (move: Move) => void;
}) {
  const handleClick = ({ row, col }: { row: number; col: number }) => {
    const i = row * 3 + col;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay({ squares: nextSquares, coordinates: { row, col } });
  };

  const result = calculateWinner(squares);
  let status;
  if (result) {
    status = "Winner: " + result.winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <motion.div
        className="text-4xl font-bold"
        key={status}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={result ? "text-blue-600" : ""}
          >
            {status}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="flex flex-col mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <motion.div
              className="flex"
              key={row}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: row * 0.1,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              {Array(3)
                .fill(null)
                .map((_, col) => {
                  const index = row * 3 + col;
                  return (
                    <Square
                      key={`${row}-${col}-${squares[index]}-${
                        result?.winner || "none"
                      }`}
                      value={squares ? squares[index] : ""}
                      onSquareClick={() => handleClick({ row: row, col: col })}
                      isWinningSquare={result?.line.includes(index) || false}
                      row={row}
                      col={col}
                    />
                  );
                })}
            </motion.div>
          ))}
      </motion.div>
    </>
  );
}
