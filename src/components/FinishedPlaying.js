import { React, useState, useEffect} from 'react'
import { FaStar, FaUserAstronaut } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi';

import '../css/FinishedPlaying.scss';
import { SetPlayersInDataBase } from './ApiManager';

const FinishedPlaying = ({players, score}) => {
    let place = '';
    const color = ['2eb952', '35afe9', 'bd35e9', 'e9a135', '8bb722', 'e93535', '355ce9'];
    const top3Colors = ['gold', 'silver', '#CD7F32'];
    const [playersObj, setPlayersObj] = useState(() => []);
    const sortScoresToPlyersObjects = (players, score) =>
    {
        players.forEach((player, i) => {
            
            sendScoresToServer(player.value, score[i]);
            setPlayersObj(s => {
                return[...s, {name: player.value, score: score[i]}];
            });
        });
        playersObj.sort((a, b) => a.score - b.score);
    };
    const sendScoresToServer = async (name, score) => 
    {
        await SetPlayersInDataBase(name, score);
    };
    useEffect(() => {
            sortScoresToPlyersObjects(players, score);
    }, [players, score]);
    
  return (<>
    <div className='finishedPlaying'>        
      {playersObj.map((player, i) =>
      {
        if(i < 3)
        {
            place = <span className='place'><GiTrophy style={{color: [top3Colors[i % 3]]}}></GiTrophy> {i + 1}</span>;
        }
        else if(i > 3)
        {
            place = <span className='place' style={{color: [top3Colors[2]]}}> {i + 1}</span>;
        }
        return(<div key={i} className='playerStats' style={{color: '#' + color[i % 7]}}>
            {place}
            <h3><FaUserAstronaut style={{color: '#009fff'}}></FaUserAstronaut> {player.name}</h3>
            <span><FaStar style={{color: 'gold'}}></FaStar> {player.score}</span>            
        </div>)
      })}       
    </div>    
    </>
  )
}

export default FinishedPlaying
