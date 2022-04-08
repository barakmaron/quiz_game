import { React } from 'react'
import Button from './Button';

const Stage2 = ({ difficulty }) => {    
   
   const setDifficultyLevel = e => {
       e.preventDefault();
        difficulty(e.target.id);
   }

  return (
    <div>
        <h3>Lets choose difficulty:</h3>
        <Button text="EASY" color='66dd50' name="easy" id="easy" onClick={setDifficultyLevel}></Button>
        <Button text="MEDIUM" color='f5dd32' name="medium" id="medium" onClick={setDifficultyLevel}></Button>
        <Button text="HARD" color='dd5050' name="hard" id="hard" onClick={setDifficultyLevel}></Button>
    </div>
  )
}

export default Stage2
