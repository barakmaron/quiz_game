import { React, useState } from 'react'

import '../css/Game.scss';

import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import Quiz from './Quiz';

const stages = [
    {stage: 1, visible: true},
    {stage: 2, visible: false},
    {stage: 3, visible: false},
    {stage: 4, visible: false}
  ];

const Game = () => {
  
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState(0);

  const addPlayers = (playersNames) => 
  {
    playersNames.forEach(player => {
      setPlayers(s => {
        return [...s, {value: player.value}];        
      });
    });
    stages[0].visible = false; 
    stages[1].visible = true;    
  }

  function handlerDifficulty (level)
  {
    setDifficulty(level);
    stages[1].visible = false;
    stages[2].visible = true;
  }

  function handlerCategory (cat)
  {
    setCategory(cat);
    stages[2].visible = false;
    stages[3].visible = true;
  }

  return (
    <div>
      <h1 className='title'>QUIZ GAME</h1>
      {stages[0].visible && <Stage1 setPlayersNames={addPlayers}></Stage1>}
      {stages[1].visible && <Stage2 difficulty={handlerDifficulty}></Stage2>}
      {stages[2].visible && <Stage3 category={handlerCategory}></Stage3>}
      {stages[3].visible && <Quiz category={category} difficulty={difficulty} players={players}></Quiz>}
    </div>
  )
}



export default Game
