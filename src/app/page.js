"use client";
import Head from "next/head";

export default function Home() {
  const handleClick = (index) => {
    console.log(`Square ${index} clicked!`);
  };

  return (
    <>
      <div className="game-container">
        <div className="game">
          <h1>Tic Tac Toe</h1>
          <div className="game-board">
            <div className="board">
              {Array(9)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index} className="board-cell" onClick={() => handleClick(i)}>
                    {/* Placeholder for game cells*/}
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
