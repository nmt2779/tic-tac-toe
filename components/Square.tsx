import { cn } from "@/lib/utils";

export default function Square({
  value,
  onSquareClick,
  isWinningSquare,
  row,
  col,
}: {
  value: string;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
  row?: number;
  col?: number;
}) {
  // Determine corner positions and apply appropriate rounded corners
  const getCornerClasses = () => {
    if (row === undefined || col === undefined) return "";

    if (row === 0 && col === 0) return "rounded-tl-2xl"; // Top-left corner
    if (row === 0 && col === 2) return "rounded-tr-2xl"; // Top-right corner
    if (row === 2 && col === 0) return "rounded-bl-2xl"; // Bottom-left corner
    if (row === 2 && col === 2) return "rounded-br-2xl"; // Bottom-right corner

    return "";
  };

  return (
    <button
      onClick={onSquareClick}
      className={cn(
        isWinningSquare ? "bg-blue-500 text-white" : "bg-white",
        "text-4xl font-semibold border border-gray-700 text-center w-24 h-24 mr-[-1px] mt-[-1px]",
        getCornerClasses()
      )}
    >
      {value}
    </button>
  );
}
