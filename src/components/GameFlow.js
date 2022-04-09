import { React, useState, useEffect, useRef } from 'react'
import { FaStar, FaPlay, FaUserAstronaut } from 'react-icons/fa';
import { Buffer } from 'buffer';
import Button from './Button'
import { delay, shuffleArray} from './Utilities.js'

import '../css/GameFlow.scss'
import CorrectSound from '../assets/CorrectAnswerSound.mp3';
import IncorrectSound from '../assets/IncorrectAnswerSound.mp3';
import QuestionTimer from './QuestionTimer';

let round = 0;

const GameFlow = ({ players, questionsResult, finishedGame }) => {
    const color = ['35afe9', 'bd35e9', 'e9a135','355ce9'];
    const correctAnswerSound = new Audio(CorrectSound);
    const incorrectAnswerSound = new Audio(IncorrectSound);

    const ref = useRef(null);

    const [score, setScore] = useState(() => []);
    const [turn, setTurn] = useState(() => 0);
    const [countQuestion, setCountQuestion] = useState(() => 0);
    const [questions, setQuestions] = useState(() => []);
    const timePerQuestion = 30;
    const [clickedAnswer, setClickedAnswer] = useState(() => false);    
    const [mobile, setMobile] = useState(() => true);

    useEffect(() =>
    {
        const windowResize = () => {
            if (window.innerWidth > 800) {
                setMobile(false);
            }
        }
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
                    return [...s, {question: questionBuffer, answers: answersBuffer, correct_answer: correctAns}]
                })
            })                       
        }
        decodeQuestions();
    }, [questionsResult, players]);   

    async function correctAnswerHandle(e) 
    {
        setScore(oldScore => {
            oldScore[turn] += (30 * document.getElementById('timer' + countQuestion).getAttribute('value')) >> 0;          
            return oldScore;
          });
        correctAnswerSound.play();
        e.target.parentElement.className += ' correctAnswer';        
        await delay(2000);
        setClickedAnswer(() => false);            
        correctAnswerSound.pause();
        ref.current.clearState(timePerQuestion);
        return Promise;
    }

    async function incorrectAnswerHandle(e) 
    {
        incorrectAnswerSound.play();
        e.target.parentElement.className += ' incorrectAnswer';
        document.getElementById(questions[countQuestion].correct_answer).className += ' correctAnswer';      
        await delay(2000);         
        setClickedAnswer(() => false); 
        incorrectAnswerSound.pause();
        ref.current.clearState(timePerQuestion);
        return Promise;
    }

    async function handleTimeFinishedWithOutAnswer() 
    {
        document.getElementById(questions[countQuestion].correct_answer).className += ' correctAnswer';      
        await delay(2000);        
        ref.current.clearState(timePerQuestion);
        checkIfFinishedAndSetTurn();
    }
    
    async function checkIfFinishedAndSetTurn()
    {      
        const temp = turn + 1;        
        if(temp === players.length)
        {
            setTurn(() => 0);            
            round += 1;
            if(round === 5)
            {
                await delay(500);
                finishedGame(score); 
                return;
            }            
        }
        else
        {
            setTurn(t => {return t+1});
        }
        setCountQuestion(count => {return count + 1});
    }

    async function handleAnswerClick(e)
    {
        e.preventDefault();
        if(!clickedAnswer)
        {
            setClickedAnswer(() => true);
            if(e.target.id === questions[countQuestion].correct_answer)
            {
                await correctAnswerHandle(e);
                checkIfFinishedAndSetTurn();                          
            }
            else
            {
                await incorrectAnswerHandle(e);  
                checkIfFinishedAndSetTurn();                        
            }
            
        }
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
                    const answers = q.answers.map((ans, j) =>{return(<Button addCostumeWidth={!mobile ? '35%' : '100%'} color={color[j% 4]} key={j} text={ans} id={ans} onClick={handleAnswerClick}></Button>)})
                    return(<div key={i}><h3>{q.question}</h3><div  className='answers'>{answers}</div></div>)
                }
                return(<div key={i}></div>);
            })}
        </div> 
        <div className='timeSection'>
            <QuestionTimer ref={ref} time={timePerQuestion} id={'timer' + countQuestion} handleTimeFinished={handleTimeFinishedWithOutAnswer}></QuestionTimer>    
        </div>   
    </div>
  )
}

export default GameFlow
