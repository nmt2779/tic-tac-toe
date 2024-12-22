export default function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <button
      className="border border-gray-700 text-center w-16 h-16 mr-[-1px] mt-[-1px]"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
