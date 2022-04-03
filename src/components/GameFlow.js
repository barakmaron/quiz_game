import { React, useState, useEffect } from 'react'
import { FaStar, FaPlay, FaUserAstronaut } from 'react-icons/fa'
import { Buffer } from 'buffer'

import '../css/GameFlow.scss'
import Button from './Button'

const GameFlow = ({ players, questionsResult }) => {
    const [score, setScore] = useState([])
    const [round, setRound] = useState(0)
    const [turn, setTurn] = useState(0)
    const [countQuestion, setCountQuestion] = useState(0)
    const [questions, setQuestions] = useState([{question: '-1', answers: []}])
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() =>
    {
        players.forEach(player => {
            setScore(s => {
                return [...s, 0]
            });
        });
        const decodeQuestions = () => {
            questionsResult.forEach(question => {
                let questionBuffer = Buffer.from(question.question, 'base64').toString('utf8');
                const correctAns = Buffer.from(question.correct_answer, 'base64').toString('utf8');
                let answersBuffer = []
                question.incorrect_answers.forEach(answer => {
                    answersBuffer.push(Buffer.from(answer, 'base64').toString('utf8'));
                });
                answersBuffer.push(correctAns)
                shuffleArray(answersBuffer);
                setQuestions(s => {
                    if(s[0].question === '-1')
                        return [{question: questionBuffer, answers: answersBuffer, correct_answer: correctAns}]
                    return [...s, {question: questionBuffer, answers: answersBuffer, correct_answer: correctAns}]
                })
            })                       
        }
        decodeQuestions();
        console.log(questions)
        console.log(score)
    }, []);

    function handleAnswerClick(e)
    {
        e.preventDefault();
        if(e.target.id === questions[countQuestion].correct_answer)
        {
            setScore(s => {
                const newArr = s.slice();
                newArr[turn] += 30;          
                return newArr;
              })
        }
        if(turn + 1 === players.length)
        {
            setTurn(0);
            setRound(round + 1);
        }
        else
        {
            setTurn(turn+1);
        }
        if(round === 6)
        {
            ///end of game
            setRound(0)
        }
        setCountQuestion(countQuestion + 1);
    }
  return (
    <div className='gameContainer'>
        <div className='gameStatistics'>
            <div className='playerName'><FaUserAstronaut style={{color: '#009fff'}}></FaUserAstronaut> {players[turn].value}</div>
            <div className='score'><FaStar style={{color: '#ffed00'}}></FaStar> {score[turn]}</div>
            <div className='round'><FaPlay style={{color: '#18ab46'}}></FaPlay> {round + 1}/5</div>    
        </div>
        <div className='questionSection'>             
            {questions.map((q, i) => {
                if(countQuestion === i)
                {
                    const answers = q.answers.map((ans, j) =>{return(<Button key={j} text={ans} id={ans} onClick={handleAnswerClick}></Button>)})
                    return(<div key={i}><h3>{q.question}</h3>{answers}</div>)
                }
            })}
        </div>    
    </div>
  )
}

export default GameFlow
