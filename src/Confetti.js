import React from 'react'
import Confetti from 'react-confetti'
export default ({winner, onRestart}) => {
    return (
      <div>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className='wrapper'>
          <div className='container'>
            <h1>Congrats player {winner}</h1>
            <div className='restart-options'>
              <button onClick={() => onRestart()}>restart</button>
            </div>
          </div>
        </div>
      </div>
  )
}