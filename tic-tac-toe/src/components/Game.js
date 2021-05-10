import { useState } from "react";

import Board from "./Board";

export default function Game() {
  const num = 3;

  const [fields, setFields] = useState({
    history: [
      {
        squares: Array(num ** 2).fill(null),
      },
    ],
    //stepNumber: 0,
    xIsNext: true,
  });

  const history = fields.history;

  const current = history[history.length - 1];

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Győztes: " + winner;
  } else {
    status = "Következő játékos " + (fields.xIsNext ? "X" : "O");
  }

  const moves = history.map((step, move) => {
    const desc = move ? 
    `Menj ide: ${move}. lépés` :
    "Menj a játék kezdetéhez";
    return (
      <li key={move}>
        <button onClick={handleButtonMove}>{desc}</button>
      </li>
    )
  })

  function handleButtonMove(e) {

  }

  function handleOnClickButton(e) {
    const index = Number(e.target.dataset.index);
    const newSquares = [...current.squares];
    if (calculateWinner(newSquares) || newSquares[index]) {
      return;
    }
    newSquares[index] = fields.xIsNext ? "X" : "0";
    setFields({
      /* history: [
        ...history,
        {
          squares: newSquares,
        },
      ], */
      history: history.concat([
        {
          squares: newSquares,
        },
      ]),
      xIsNext: !fields.xIsNext,
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          xIsNext={fields.xIsNext}
          onClick={handleOnClickButton}
          num={num}
        />
      </div>
      <div className="game-info">
      <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
