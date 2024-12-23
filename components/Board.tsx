import calculateWinner from "@/lib/calculate-winner";
import Square from "./Square";

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}) {
  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="text-xl font-semibold">{status}</div>
      <div className="flex flex-col mt-2">
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
                      value={squares[index]}
                      onSquareClick={() => handleClick(index)}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </>
  );
}
