import { React}  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import './App.css';

import Header from './components/Header';
import Game from './components/Game';
import Footer from './components/Footer';
import Leaderborad from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="container">
        <Header></Header> 
        <div className='mainContent'>
          <Routes>
            <Route path='/' element={<Navigate replace to="/intro" />} />
            <Route path='/intro' element={
              <div className='intro'>
                <h2>INTRO</h2>
                <p>This is my first project I ever build in React. It was a great experience building, testing and learning.
                  I hope you will have fun playing this game as much as I had when building it.
                </p>
                <br></br>
                <p>The Server (backend) is a very simple php script that posts scores and name to the database as well as getting the TOP 10 players from the database.</p>
              </div>
            }/>
            <Route path='/game' element={<Game></Game>} />
            <Route path='/leaderboard' element={<Leaderborad></Leaderborad>} />
            <Route path='/how%20to%20play' element={
              <div className='intro'>
                <h2>HOW TO PLAY?</h2>
                <p>
                  Go to the game page, then enter your name, you can add more players to play against, by clicking the add player button.
                </p>
                <br></br>
                <p>After you add all the players names click start. Now you will need to chose a difficulty level, and a category.</p>
                <br></br>
                <p>Start answering the questions as they come, each player in his turn. You will get scored for a correct answer based on how fast you answered.</p>
                <br></br>
                <p>Each player will get 5 questions (5 rounds)</p>
              </div>
            }></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </div>      
    </Router>
  );
}

export default App;
