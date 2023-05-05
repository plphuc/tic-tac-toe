import React, { useState } from 'react';
import Confetti from './Confetti';
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
  return (
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
)}
export default function Game() {
  const [history, setHistory] = useState(Array(Array(9).fill(null)));
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState()
  const currentSquares = history[history.length-1]

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares])
    setWinner(calculateWinner(nextSquares))
    setIsXNext(!isXNext)

  }

  function jumpTo(move) {
    let currentHistory = history.slice(0,move+1)
    setHistory(currentHistory)
  }
  function handleRestart() {
    setHistory(history.slice(0,1))
    setIsXNext(true)
    setWinner()
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move>0) {
      description='Move to #' + move
    }
    else {
      description='Restart'
    }
    return (
      <li key={move}><button onClick={() => {jumpTo(move)}}>{description}</button></li>
    )
  })

  return (
    <div>
      {(winner && 
      <div>
          <Confetti
            winner={winner}
            onRestart={handleRestart}
          />
    </div>) || (<div className="game">
        <div className="game-board">
          <Board 
            isXNext={isXNext}
            squares = {currentSquares}
            onPlay = {handlePlay}
          />
        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>)}
    </div>)
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