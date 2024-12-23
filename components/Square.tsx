import { cn } from "@/lib/utils";

export default function Square({
  value,
  onSquareClick,
  isWinningSquare,
}: {
  value: string;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
}) {
  return (
    <button
      onClick={onSquareClick}
      className={cn(
        isWinningSquare ? "bg-blue-200" : "",
        "text-2xl border border-gray-700 text-center w-16 h-16 mr-[-1px] mt-[-1px]"
      )}
    >
      {value}
    </button>
  );
}
