export default function Square({
  value,
  onClick,
}: {
  value: number;
  onClick: () => void;
}) {
  return <button className="">{value}</button>;
}
