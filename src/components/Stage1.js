import { React, useState } from 'react';
import Button from './Button';

const Stage1 = ({ setPlayersNames }) => {
    const [playerNamesInput, addPlayer] = useState([{ id: 1 }]);
    //const [plyers, setPlayers] = useState([]);

    const addPlayerInput = (e) => {
        e.preventDefault();

        addPlayer(s => {
            return [...s, { value: '' }];
        });
    };
    const handleChange = e => {
        e.preventDefault();
    
        const index = e.target.id;
        addPlayer(s => {
          const newArr = s.slice();
          newArr[index].value = e.target.value;
    
          return newArr;
        });
    };
    
    const startGame = (e) =>
    {
        e.preventDefault();
        setPlayersNames(playerNamesInput);
    }
    
  return (
    <div>
        <h2>QUIZ GAME</h2>
        <form>
            {playerNamesInput.map((item, i) => {
                const placeholder = "Player " + (i + 1) + " Name";
                return(<input type="text" key={i} id={i} onChange={handleChange} placeholder={placeholder} />);
            })}
            
            <Button text="START" name="start" onClick={startGame}></Button>
            <Button text="Add player" onClick={addPlayerInput}></Button>
        </form>
    </div>
  )
}

export default Stage1
