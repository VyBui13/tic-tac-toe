type SquareProps = {
  value: "X" | "O" | null;
  onSquareClick: () => void;
  isWinning: boolean;
};

export default function Square({
  value,
  onSquareClick,
  isWinning,
}: SquareProps) {
  // Thay đổi style nếu là ô chiến thắng
  const winningStyle = isWinning ? "bg-green-300" : "bg-white";

  return (
    <button
      className={`h-24 w-24 border border-gray-400 m-[-1px] float-left text-5xl font-bold leading-none text-center ${winningStyle}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
