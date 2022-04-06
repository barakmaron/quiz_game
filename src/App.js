import { React}  from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

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
            <Route path='/game' element={<Game></Game>} />
            <Route path='/leaderboard' element={<Leaderborad></Leaderborad>} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>      
    </Router>
  );
}

export default App;
