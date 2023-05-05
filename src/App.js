import React, { useState } from 'react';
import Confetti from 'react-confetti'

function Square({value, onSquareClick}) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>)
}

function Board({isXNext, squares, onPlay}) {
  function handleOnclick(i) {
    if (squares[i] === null) {
      let nextSquares = squares.slice()

      if (isXNext === false) {
        nextSquares[i] = "O"
      } 
      else {
        nextSquares[i] = "X"
      }
      onPlay(nextSquares)
    }
  }
  const winner = calculateWinner(squares)
  return (
    <div>
    <div className ="board">
        {squares.map((square, index) => {
          return (
            <Square key={index}
              value = {square}
              onSquareClick={() => handleOnclick(index)}
            />
          )
        })}
    </div>
    {winner && <div>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <h1>Congrats player {winner}</h1>
    </div>}
    </div>
  );
}
export default function Game() {
  const [history, setHistory] = useState(Array(Array(9).fill(null)));
  const [isXNext, setIsXNext] = useState(true)
  const currentSquares = history[history.length-1]
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares])
    setIsXNext(!isXNext)
  }
  const moves = history.map((squares, move) => {
    return (
      <button></button>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          isXNext={isXNext}
          squares = {currentSquares}
          onPlay = {handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
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