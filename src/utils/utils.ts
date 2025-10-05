import type { BoardState, SquareValue } from "../Game";

export function calculateWinner(squares: BoardState): {
  winner: SquareValue;
  line: [number, number][];
} {
  // Kiểm tra hàng ngang
  for (let i = 0; i < 3; i++) {
    if (
      squares[i][0] &&
      squares[i][0] === squares[i][1] &&
      squares[i][0] === squares[i][2]
    ) {
      return {
        winner: squares[i][0],
        line: [
          [i, 0],
          [i, 1],
          [i, 2],
        ],
      };
    }
  }

  // Kiểm tra hàng dọc
  for (let i = 0; i < 3; i++) {
    if (
      squares[0][i] &&
      squares[0][i] === squares[1][i] &&
      squares[0][i] === squares[2][i]
    ) {
      return {
        winner: squares[0][i],
        line: [
          [0, i],
          [1, i],
          [2, i],
        ],
      };
    }
  }

  // Kiểm tra đường chéo chính
  if (
    squares[0][0] &&
    squares[0][0] === squares[1][1] &&
    squares[0][0] === squares[2][2]
  ) {
    return {
      winner: squares[0][0],
      line: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    };
  }

  // Kiểm tra đường chéo phụ
  if (
    squares[0][2] &&
    squares[0][2] === squares[1][1] &&
    squares[0][2] === squares[2][0]
  ) {
    return {
      winner: squares[0][2],
      line: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };
  }

  return { winner: null, line: [] };
}
