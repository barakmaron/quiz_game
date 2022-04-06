import { React, useEffect, useState} from 'react'
import { GetLeaderBoard } from './ApiManager';

let set = true;

const Leaderborad = () => {
    const [board, setBoard] = useState([])
    useEffect(() => {
        if(set)
        {
            const top10 = async () => {return await GetLeaderBoard()};
            top10().then((res) => setBoard(res));
            console.log(board);
            set = false;
        }
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
                        <td>{i + 1}</td>
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
