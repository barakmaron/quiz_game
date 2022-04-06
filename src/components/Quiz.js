import { React, useState, useEffect } from 'react';
import GameFlow from './GameFlow';
import QuizIntro from './QuizIntro';
import { GetQuestions } from './ApiManager';
import { shuffleArray } from './Utilities';

const state = [
    {state: 'intro', visible: true},
    {state: 'game', visible: false}
];

const Quiz = ({ players, difficulty, category, finished }) => {
    const [render, rerender] = useState(false);
    const [questions, setQuestions] = useState([]);
    const numberOfRounds = 5;
    useEffect(() => {
        const getQuestions = async () => {
            let data = await GetQuestions(difficulty, category, players.length * numberOfRounds * 5);            
            if(data.response_code === 0)
            {
                shuffleArray(data.results);
                setQuestions(data.results);
                return;
            }
            else
            {
                data = await GetQuestions(difficulty, category, players.length * numberOfRounds);
                if(data.response_code === 0)
                {
                    shuffleArray(data.results);
                    setQuestions(data.results);
                    return;
                }                
            }
            // show error
        }

        getQuestions()
    }, [difficulty, category, players]);

    function handlerStart ()
    {
        state[0].visible = false; 
        state[1].visible = true;
        rerender(!render);   
    }

  return (
    <div>
        {state[0].visible && <QuizIntro players={players} startHandler={handlerStart}></QuizIntro>}
        {state[1].visible && <GameFlow players={players} questionsResult={questions} finishedGame={finished}></GameFlow>}
    </div>
  )
}

export default Quiz
