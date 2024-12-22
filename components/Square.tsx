export default function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <button className="border text-center w-10 h-10" onClick={onSquareClick}>
      {value}
    </button>
  );
}
