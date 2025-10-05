// src/components/Board.tsx
import type { BoardState } from "../Game";
import { calculateWinner } from "../utils/utils";
import Square from "./Square";

type BoardProps = {
  xIsNext: boolean;
  squares: BoardState;
  onPlay: (
    nextSquares: BoardState,
    location: { row: number; col: number }
  ) => void;
};

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const { winner, line } = calculateWinner(squares);

  function handleClick(row: number, col: number) {
    if (winner || squares[row][col]) {
      return;
    }
    const nextSquares = squares.map((r) => r.slice()); // Tạo bản sao 2 chiều
    nextSquares[row][col] = xIsNext ? "X" : "O";

    onPlay(nextSquares, { row, col });
  }

  // Feature 4: Xác định người thắng và hiển thị thông báo
  const isDraw = !winner && squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    // Feature 4.2: Hiển thị kết quả hòa
    status = "Result: Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // Render đơn giản hơn nhiều
  return (
    <>
      <div className="mb-4 text-xl font-semibold">{status}</div>
      <div>
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
    </>
  );
}
