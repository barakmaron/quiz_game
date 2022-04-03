import { React, useState } from 'react';
import Button from './Button';

const Stage1 = ({ setPlayersNames }) => {
    const [playerNamesInput, addPlayer] = useState([{}]);

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
        <form>
            {playerNamesInput.map((item, i) => {
                const placeholder = "Player " + (i + 1) + " Name";
                return(<input type="text" key={i} id={i} onChange={handleChange} placeholder={placeholder} />);
            })}
            <Button text="Add player" color='66dd50'  onClick={addPlayerInput}></Button>
            <Button text="START" name="start" onClick={startGame}></Button>            
        </form>
    </div>
  )
}

export default Stage1
