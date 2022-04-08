import React from 'react'

import Button from './Button';

const QuizIntro = ({ players, startHandler }) => {
    const handleStart = (e) =>
    {
        e.preventDefault();
        startHandler();
    }
  return (
    <div>
      <h2>Hi  
        {players.map((player, i) => {
            const comma = players.length !== i + 1 ? ', ' : ' ';
            return(<span key={i}> <span>{player.value}</span>{comma}</span>);
        })}
         here are some ground roles...</h2>
        <p>Each player will get 30 seconds to answer.</p>
        <p>You can use each help only once.</p>
        <p>The game consist 5 rounds, you will get points for each correct answer.</p>
        <h3>Lets start the FUNNNNNNNNN!!!</h3>

        <Button text='Lets go' onClick={handleStart}></Button>
    </div>
  )
}

export default QuizIntro
