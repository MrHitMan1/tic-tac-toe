import React, { useState } from "react";
import "./TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });

  function handleClick(index) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScore({ ...score, [winner]: score[winner] + 1 });
    } else if (newBoard.every((cell) => cell)) {
      setScore({ ...score, Draws: score.Draws + 1 });
    }
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  function resetAll() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setScore({ X: 0, O: 0, Draws: 0 });
  }

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((cell) => cell)
    ? "Draw"
    : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game-container">
      <div className="game-board">
        <h1>Tic Tac Toe</h1>
        <p>{status}</p>
        <div className="board-grid">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="board-cell"
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="scoreboard">
          <p>X Wins: {score.X}</p>
          <p>O Wins: {score.O}</p>
          <p>Draws: {score.Draws}</p>
        </div>
        <button onClick={resetBoard} className="btn">Restart Game</button>
        <button onClick={resetAll} className="btn">Reset Scores</button>
      </div>
    </div>
  );
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
