"use client";

import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(true); // true for X, false for O

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index) => {
    // Don't allow click if square is already filled
    if (board[index] || winner) return;

    // Create new board with the move
    const newBoard = board.slice();
    newBoard[index] = currentPlayer ? "X" : "O";

    // Update state
    setBoard(newBoard);
    setCurrentPlayer(!currentPlayer);
  };

  return (
    <>
      <div className="game-container">
        <div className="game">
          <h1>Tic Tac Toe</h1>
          <div className="game-info">
            <div className="status">
              {winner
                ? `Winner: ${winner}`
                : isDraw
                ? "It's a draw!"
                : `Next player: ${currentPlayer ? "X" : "O"}`}
            </div>
          </div>

          <div className="game-board">
            <div className="board">
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    className="board-cell"
                    onClick={() => handleClick(index)}
                  >
                    {board[index]}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: "Arial", sans-serif;
          padding: 20px;
        }

        .game {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        .game-info {
          margin-bottom: 20px;
        }
        .status {
          font-size: 1.5rem;
          font-weight: bold;
          color: #555;
          padding: 10px;
          border-radius: 8px;
          background: #f8f9fa;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 5px;
          background: #333;
          border-radius: 10px;
          padding: 5px;
          margin: 0 auto;
          width: fit-content;
        }
        .board-cell {
          width: 80px;
          height: 80px;
          background: white;
          border: none;
          font-size: 2rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 5px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .board-cell:hover {
          background: #e9ecef;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return 'X' or 'O'
    }
  }
  return null; // No winner
}
