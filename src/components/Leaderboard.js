import { React, useEffect, useState} from 'react'
import { GetLeaderBoard } from './ApiManager';

import '../css/Leaderboard.scss';
import { GiTrophy } from 'react-icons/gi';

const Leaderborad = () => {
    const top3colors = ['gold', 'silver', '#CD7F32'];
    const [board, setBoard] = useState(() => []);
    useEffect(() => {
        const top10 = async () => {return await GetLeaderBoard()};
        top10().then((res) => setBoard(res));
    }, [board])

  return (
    <div className='leaderborad'>
        <table>
            <thead>
                <tr>
                    <th>PLACE</th>
                    <th>NAME</th>
                    <th>SCORE</th>
                </tr>
            </thead>
            <tbody>
                {board.map((player,i) => {
                    return(<tr key={i}>
                        <td>{i < 3 && <GiTrophy style={{color: top3colors[i]}}></GiTrophy>}{i + 1}</td>
                        <td>{player[1]}</td>
                        <td>{player[2]}</td>
                        </tr>)
                })}
            </tbody>
      </table>
    </div>
  )
}

export default Leaderborad
