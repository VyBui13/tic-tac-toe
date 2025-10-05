// src/App.tsx
import { useState } from "react";
import Board from "./components/Board";

export type SquareValue = "X" | "O" | null;
export type BoardState = SquareValue[][];

type HistoryItem = {
  squares: BoardState;
  location: { row: number; col: number } | null;
};

export default function Game() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      location: null,
    },
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(
    nextSquares: BoardState,
    location: { row: number; col: number }
  ) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: location },
    ];

    setHistory([
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location },
    ]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // Feature 3: Toggle sắp xếp
  function handleSortToggle() {
    setSortAscending(!sortAscending);
  }

  const moves = history.map((step, move) => {
    const locationText = step.location
      ? `(${step.location.row + 1}, ${step.location.col + 1})`
      : "";

    let description;
    if (move > 0) {
      description = `Go to move #${move} ${locationText}`;
    } else {
      description = "Go to game start";
    }

    // Feature 1: Hiển thị text cho nước đi hiện tại
    if (move === currentMove) {
      return (
        <li key={move} className="mb-2">
          <span className="font-bold text-gray-700">
            You are at move #{move} {locationText}
          </span>
        </li>
      );
    }

    return (
      <li key={move} className="mb-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  // Áp dụng sắp xếp cho danh sách moves
  const sortedMoves = sortAscending ? moves : moves.slice().reverse();

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="mr-12">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Move History</h3>
        {/* Feature 3: Nút toggle sắp xếp */}
        <button
          className="mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSortToggle}
        >
          Sort {sortAscending ? "Descending" : "Ascending"}
        </button>
        <ol className="list-decimal list-inside">{sortedMoves}</ol>
      </div>
    </div>
  );
}
