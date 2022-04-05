import { React, useState, useEffect, useRef } from 'react'
import { FaStar, FaPlay, FaUserAstronaut, FaMusic } from 'react-icons/fa';
import { AiFillSound } from 'react-icons/ai';
import { Buffer } from 'buffer';
import Button from './Button'
import { delay, shuffleArray} from './Utilities.js'

import '../css/GameFlow.scss'
import CorrectSound from '../assets/CorrectAnswerSound.mp3';
import IncorrectSound from '../assets/IncorrectAnswerSound.mp3';
import QuestionTimer from './QuestionTimer';

const GameFlow = ({ players, questionsResult }) => {
    const color = ['35afe9', 'bd35e9', 'e9a135','355ce9'];
    const correctAnswerSound = new Audio(CorrectSound);
    const incorrectAnswerSound = new Audio(IncorrectSound);

    const ref = useRef(null);

    const [score, setScore] = useState([]);
    const [round, setRound] = useState(0);
    const [turn, setTurn] = useState(0);
    const [countQuestion, setCountQuestion] = useState(0);
    const [questions, setQuestions] = useState([{question: '-1', answers: []}]);
    const [settings, setSettings] = useState({ soundEffect: true, backgroundSound: true});
    const [timePerQuestion, setTimePerQuestion] = useState(30);

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

    async function correctAnswerHandle(e) 
    {
        settings.soundEffect ? correctAnswerSound.play() : correctAnswerSound.pause();
        let delayres = await delay(500);
        e.target.parentElement.className += ' correctAnswer';        
        delayres = await delay(2500);
        correctAnswerSound.pause();
        setCountQuestion(countQuestion + 1);
        ref.current.clearState(timePerQuestion);        
    }

    async function incorrectAnswerHandle(e) 
    {
        settings.soundEffect ? incorrectAnswerSound.play() : incorrectAnswerSound.pause();
        let delayres = await delay(500);
        e.target.parentElement.className += ' incorrectAnswer';
        delayres = await delay(2500);
        incorrectAnswerSound.pause();
        setCountQuestion(countQuestion + 1);
        ref.current.clearState(timePerQuestion); 
    }

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
              correctAnswerHandle(e);                          
        }
        else
        {
            incorrectAnswerHandle(e);            
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
        
    }
  return (
    <div className='gameContainer'>
        <div className='gameStatistics'>
            <div className='settings'>
                <AiFillSound style={{color: '#fd5252', cursor: 'pointer'}}></AiFillSound>
                <FaMusic style={{color: '#fd5252', cursor: 'pointer'}}></FaMusic>
            </div>
            <div className='playerName'><FaUserAstronaut style={{color: '#009fff'}}></FaUserAstronaut> {players[turn].value}</div>
            <div className='score'><FaStar style={{color: '#ffed00'}}></FaStar> {score[turn]}</div>
            <div className='round'><FaPlay style={{color: '#18ab46'}}></FaPlay> {round + 1}/5</div>    
        </div>
        <div className='questionSection'>             
            {questions.map((q, i) => {
                if(countQuestion === i)
                {
                    const answers = q.answers.map((ans, j) =>{return(<Button addCostumeWidth='35%' color={color[j% 4]} key={j} text={ans} id={ans} onClick={handleAnswerClick}></Button>)})
                    return(<div key={i}><h3>{q.question}</h3><div  className='answers'>{answers}</div></div>)
                }
            })}
        </div> 
        <div className='timeSection'>
            <QuestionTimer ref={ref} time={timePerQuestion} id={countQuestion} handleTimeFinished={()=>{alert("end")}}></QuestionTimer>    
        </div>   
    </div>
  )
}

export default GameFlow
