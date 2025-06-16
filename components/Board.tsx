import calculateWinner from "@/lib/calculate-winner";
import Square from "./Square";
import { Move } from "@/types/Move";

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
      <div className="text-2xl lg:text-3xl font-bold">{status}</div>
      <div className="flex flex-col mt-4 rounded-md">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div className="flex" key={row}>
              {Array(3)
                .fill(null)
                .map((_, col) => {
                  const index = row * 3 + col;
                  return (
                    <Square
                      key={index}
                      value={squares ? squares[index] : ""}
                      onSquareClick={() => handleClick({ row: row, col: col })}
                      isWinningSquare={result?.line.includes(index)}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </>
  );
}
