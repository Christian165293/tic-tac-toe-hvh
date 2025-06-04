"use client";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe - Next.js</title>
        <meta name="description" content="A simple Tic Tac Toe game built with Next.js" />
      </Head>
      <div className="game-container">
        <div className="game">
          <h1>Tic Tac Toe</h1>
          <p>Game will go here...</p>
        </div>
      </div>
      <style jsx>{`
        .game-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Arial', sans-serif;
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
      `}</style>
    </>
  );
}
