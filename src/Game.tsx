// src/App.tsx
import { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./utils/utils";

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

  function reset() {
    setHistory([
      {
        squares: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        location: null,
      },
    ]);
    setCurrentMove(0);
    setSortAscending(true);
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
        <span className="font-bold text-white">
          You are at move #{move} {locationText}
        </span>
      );
    }

    return (
      <button
        className="w-full px-3 py-1 bg-white text-black rounded hover:bg-gray-300 cursor-pointer mb-2"
        key={move}
        onClick={() => jumpTo(move)}
      >
        {description}
      </button>
    );
  });

  // Áp dụng sắp xếp cho danh sách moves
  const sortedMoves = sortAscending ? moves : moves.slice().reverse();
  const { winner, line } = calculateWinner(currentSquares);
  const isDraw = currentSquares.flat().every((square) => square !== null);

  let person = xIsNext ? "X" : "O";
  let result = "N/A";

  if (winner) {
    result = `${winner} wins!`;
  } else if (isDraw) {
    result = "It's a draw!";
  }

  return (
    <div className="h-full w-full flex justify-center items-center bg-[var(--background-color)] text-[var(--text-color)]">
      <div className="basis-5/6 h-full border-r-1 border-gray">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winner={winner}
          line={line}
        />
      </div>

      <div className="basis-1/6 h-full flex flex-col">
        <div className="item p-4 bg-[var(--secondary-background-color)] border-b border-gray-300 text-white">
          <h3 className="text-xl font-bold mb-2">Game Info</h3>
          <p className="mb-1">Next Player: {person}</p>
          <p className="mb-4">Result: {result}</p>
        </div>

        <div className="item p-4  border-b border-gray-300 bg-[var(--secondary-background-color)]">
          <h3 className="text-xl font-bold mb-2">Tool</h3>
          <div className="flex flex-col">
            <button
              className="w-full mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleSortToggle}
            >
              Sort {sortAscending ? "Descending" : "Ascending"}
            </button>

            <button
              className="w-full mb-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              onClick={reset}
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="item p-4 bg-[var(--secondary-background-color)] flex-grow">
          <h3 className="text-xl font-bold mb-2">Move History</h3>

          {sortedMoves}
        </div>
      </div>
    </div>
  );
}
