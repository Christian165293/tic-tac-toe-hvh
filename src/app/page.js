//this tells Next.js that the component runs on the 
//client side (browser) rather than being server-side rendered
"use client";

// Import React's useState hook for managing component state
import { useState } from "react";

// Main component function - this is the entry point of our Tic Tac Toe game
export default function Home() {

  // ========== STATE MANAGEMENT SECTION ==========
  // Initialize game state with two pieces of data:
  
  // 1. Board state: Array of 9 elements (3x3 grid), all starting as null (empty)
  // Index mapping: [0,1,2] = top row, [3,4,5] = middle row, [6,7,8] = bottom row
  const [board, setBoard] = useState(Array(9).fill(null));
    // 2. Current player: true = X's turn, false = O's turn (X always goes first)
  const [currentPlayer, setCurrentPlayer] = useState(true); 

  // ========== GAME LOGIC SECTION ==========
  // Check if there's a winner by calling the calculateWinner function
  const winner = calculateWinner(board);
    // Check for draw: no winner AND all cells are filled (no null values)
  const isDraw = !winner && board.every((cell) => cell !== null);

  // ========== EVENT HANDLERS SECTION ==========
  // Function to handle when a player clicks on a board cell
  const handleClick = (index) => {
    // Don't allow move if cell is occupied OR game is already won
    if (board[index] || winner) return;

    // Create a copy of the current board (don't mutate original state)
    const newBoard = board.slice();
    // Place X or O based on current player (true = X, false = O)
    newBoard[index] = currentPlayer ? "X" : "O";

    // Update the board state with the new move
    setBoard(newBoard);
    // Switch to the other player for next turn
    setCurrentPlayer(!currentPlayer);
  };

  //Function to reset the game to initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(true);
  };

  // ========== RENDER SECTION ==========
  return (
    <>
      <div className="game-container">
        <div className="game">
          <h1>Tic Tac Toe</h1>
          {/* Game Status Display */}
          <div className="game-info">
            <div className="status">
              {/* Conditional rendering of game status using ternary operators */}
              {winner
                ? `Winner: ${winner}`// Show winner if game is won
                : isDraw
                ? "It's a draw!"// Show draw if board is full
                : `Next player: ${currentPlayer ? "X" : "O"}`//Show whose turn it is
                } 
            </div>
          </div>

          {/* Game Board Grid */}
          <div className="game-board">
            <div className="board">
              {/* Create 9 buttons for the 3x3 grid */}
              {Array(9)
                .fill(null) // Create array of 9 empty elements
                .map((_, index) => (  // Map over array to create buttons
                  <button
                    key={index} // Unique key for React rendering
                    className="board-cell"
                    onClick={() => handleClick(index)}// Pass cell index to click handler
                  >
                    {board[index]} {/* Display X, O, or empty */}
                  </button>
                ))}
            </div>
          </div>

              {/* Reset Button */}
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>

      {/* ========== STYLING SECTION ========== */}
      {/* Styled JSX for component styling (Next.js feature) */}
      <style jsx>{`
      /* Main container - centers the game and sets background */
        .game-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #800000;
          font-family: "Arial", sans-serif;
          padding: 20px;
        }

        /* Game card - white container with rounded corners and shadow */
        .game {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        /* Main title styling */
        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        .game-info {
          margin-bottom: 20px;
        }

        /* Status message styling */
        .status {
          font-size: 1.5rem;
          font-weight: bold;
          color: #555;
          padding: 10px;
          border-radius: 8px;
          background: #f8f9fa;
        }

        /* 3x3 grid layout for the game board */
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

        /* Individual cell styling */
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
          /* Hover effect for cells */
        .board-cell:hover {
          background: #e9ecef;
          transform: scale(1.05);
        }
          /* Reset button styling */
        .reset-button {
          background: #800000;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
          /* Reset button hover effect */
        .reset-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
}
// ========== GAME WIN DETECTION FUNCTION ==========
// Pure function that determines if there's a winner on the current board
function calculateWinner(squares) {
    // Define all possible winning combinations (8 total)
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

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];// Destructure the three positions

      // Check if all three positions have the same non-null value
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return 'X' or 'O'
    }
  }
  return null; // No winner
}
