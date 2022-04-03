import { React, useState, useEffect } from 'react';
import GameFlow from './GameFlow';
import QuizIntro from './QuizIntro';
import { GetQuestions } from './ApiManager';

const state = [
    {state: 'intro', visible: true},
    {state: 'game', visible: false}
];

const Quiz = ({ players, difficulty, category }) => {
    const [render, rerender] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const data = await GetQuestions(difficulty, category, players.length);
            if(data.response_code === 0)
            {
                setQuestions(data.results);         
            }
            else
            {
                ///show error
            }
        }

        getQuestions()
    }, [difficulty, category, players]);
    function handlerStart ()
    {
        rerender(!render);
        state[0].visible = false; 
        state[1].visible = true;   
    }

  return (
    <div>
        {state[0].visible && <QuizIntro players={players} startHandler={handlerStart}></QuizIntro>}
        {state[1].visible && <GameFlow players={players} questionsResult={questions}></GameFlow>}
    </div>
  )
}

export default Quiz
