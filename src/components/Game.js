import { React, useState } from 'react'

import '../css/Game.scss';

import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import Quiz from './Quiz';
import FinishedPlaying from './FinishedPlaying';

const stages = [
    {stage: 1, visible: true},
    {stage: 2, visible: false},
    {stage: 3, visible: false},
    {stage: 4, visible: false},
    {stage: 5, visible: false}
  ];

const Game = () => {
  const [render, rerender] = useState(false);
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState(0);
  const [score, setScore] = useState([0]);

  const addPlayers = (playersNames) => 
  {
    stages[0].visible = false; 
    stages[1].visible = true; 
    playersNames.forEach(player => {
      setPlayers(s => {
        return [...s, {value: player.value}];        
      });
    });   
  }

  function handlerDifficulty (level)
  {
    stages[1].visible = false;
    stages[2].visible = true;
    setDifficulty(level);
  }

  function handlerCategory (cat)
  {    
    stages[2].visible = false;
    stages[3].visible = true;
    setCategory(cat);
  }

  function handlerGameFinished (score)
  {
    stages[3].visible = false;
    stages[4].visible = true;
    setScore(score);
  }

  function handlePlayAgain()
  {
    stages[4].visible = false; 
    stages[3].visible = true; 
    players.map((player, i) => {
      setScore(s => {
        const newArr = s.slice();
          newArr[i] = 0;
    
          return newArr;        
      });
    });  
    rerender(!render); 
  }

  return (
    <div render={render.toString()}>
      <h1 className='title'>QUIZ GAME</h1>
      {stages[0].visible && <Stage1 setPlayersNames={addPlayers}></Stage1>}
      {stages[1].visible && <Stage2 difficulty={handlerDifficulty}></Stage2>}
      {stages[2].visible && <Stage3 category={handlerCategory}></Stage3>}
      {stages[3].visible && <Quiz category={category} difficulty={difficulty} players={players} finished={handlerGameFinished}></Quiz>}
      {stages[4].visible && <FinishedPlaying players={players} score={score} playAgain={handlePlayAgain}></FinishedPlaying>}
    </div>
  )
}



export default Game
