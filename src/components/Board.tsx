// src/components/Board.tsx
import type { BoardState } from "../Game";
import Square from "./Square";

type BoardProps = {
  xIsNext: boolean;
  squares: BoardState;
  onPlay: (
    nextSquares: BoardState,
    location: { row: number; col: number }
  ) => void;
  winner: "X" | "O" | null;
  line: [number, number][];
};

export default function Board({
  xIsNext,
  squares,
  onPlay,
  winner,
  line,
}: BoardProps) {
  function handleClick(row: number, col: number) {
    if (winner || squares[row][col]) {
      return;
    }
    const nextSquares = squares.map((r) => r.slice()); // Tạo bản sao 2 chiều
    nextSquares[row][col] = xIsNext ? "X" : "O";

    onPlay(nextSquares, { row, col });
  }

  // Feature 4: Xác định người thắng và hiển thị thông báo

  // Render đơn giản hơn nhiều
  return (
    <>
      <div className="flex flex-col items-center h-full">
        <div className="w-full flex-grow flex justify-center items-center">
          <div className="board">
            {squares.map((rowArray, rowIndex) => (
              <div key={rowIndex} className="clear-both content-[''] table">
                {rowArray.map((squareValue, colIndex) => {
                  // Kiểm tra xem ô hiện tại có nằm trong đường chiến thắng không
                  const isWinning = line.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                  );
                  return (
                    <Square
                      key={`${rowIndex}-${colIndex}`}
                      value={squareValue}
                      onSquareClick={() => handleClick(rowIndex, colIndex)}
                      isWinning={isWinning}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
