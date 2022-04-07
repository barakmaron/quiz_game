import { React, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../css/Stage1.scss';
import Button from './Button';

const Stage1 = ({ setPlayersNames }) => {
    const [playerNamesInput, setPlayers] = useState(() => [{name: 'player0', value: ''}]);

    const addPlayerInput = (e) => {
        e.preventDefault();
        setPlayers((s) => {
            return [...s, { name: 'player' + Math.floor((Math.random() * 50) + 1), value: '' }];
        });
    };
    const handleChange = e => {
        e.preventDefault();    
        const index = e.target.getAttribute('id');
        setPlayers(s => {
          s[index].value = e.target.value;    
          return s;
        });
    };

    const deletePlayerName = e => {
        const name = e.target.getAttribute('name');
        setPlayers(s => (s.filter(item => item.name !== name)));
    };
    
    function setErrorOnEmptyName()
    {
        playerNamesInput.forEach((player, i) => {
            if(Object.keys(player).length === 0 || player.value === '')
            {
                document.getElementById('input' + i).className += ' errorInput';
            } 
        });
    };
    
    const startGame = (e) =>
    {
        let flag = true;
        e.preventDefault();
        playerNamesInput.forEach(player => {
            if(Object.keys(player).length === 0 || player.value === '')
                flag = false;
        });
        flag ? setPlayersNames(playerNamesInput) : setErrorOnEmptyName();
    }
    
  return (
    <div>
        <h2>Enter players names:</h2>
        <form>
            {playerNamesInput.map((item, i) => {
                const placeholder = "Player " + (i + 1) + " Name";
                return(<span key={i} name={item.name}>
                    <input type="text" key={i} id={'input'+i} onChange={handleChange} placeholder={placeholder} />
                    { i != 0 && <span name={item.name} onClick={deletePlayerName}><FaTimes name={item.name} onClick={deletePlayerName} style={{color: '#ff7045', fontSize: '1.5em', cursor: 'pointer'}}></FaTimes></span>}
                    </span>);
            })}
            <Button text="Add player" color='66dd50'  onClick={addPlayerInput}></Button>
            <Button text="START" name="start" onClick={startGame}></Button>            
        </form>
    </div>
  )
}

export default Stage1
