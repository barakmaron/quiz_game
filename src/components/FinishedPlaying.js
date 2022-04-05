import { React, useState} from 'react'
import { FaStar, FaUserAstronaut } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi';
import Button from './Button';

import '../css/FinishedPlaying.scss';

const FinishedPlaying = ({players, score}) => {
    let place = '';
    const color = ['2eb952', '35afe9', 'bd35e9', 'e9a135', '8bb722', 'e93535', '355ce9'];
    const placeColor = ['gold', 'silver', '#CD7F32'];
  return (<>
    <div className='finishedPlaying'>        
      {score.map((playerScore, i) =>
      {
        if(i < 3)
        {
            place = <span className='place'><GiTrophy style={{color: [placeColor[i % 3]]}}></GiTrophy> {i + 1}</span>;
        }
        else if(i > 3)
        {
            place = <span className='place' style={{color: [placeColor[2]]}}> {i + 1}</span>;
        }
        return(<div key={i} className='playerStats' style={{color: '#' + color[i % 7]}}>
            {place}
            <h3><FaUserAstronaut style={{color: '#009fff'}}></FaUserAstronaut> {players[i].value}</h3>
            <span><FaStar style={{color: 'gold'}}></FaStar> {playerScore}</span>            
        </div>)
      })}       
    </div>    
    </>
  )
}

export default FinishedPlaying
