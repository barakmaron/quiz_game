import React  from 'react';
import '../css/Nav.scss'

const Nav = () => {
  return (
    <nav id="nav">
      <div className="nav left">
        <span className="gradient skew">
          <h1 className="logo un-skew"><a href="/">Quiz Game</a></h1></span>
        <button id="menu" className="btn-nav"><span className="fas fa-bars"></span></button>
      </div>
      <div className="nav right">
        <a href="/game" className="nav-link active"><span className="nav-link-span"><span className="u-nav">game</span></span></a>
        <a href="/leaderboard" className="nav-link"><span className="nav-link-span"><span className="u-nav">Leaderboard</span></span></a>
        <a href="/invite" className="nav-link"><span className="nav-link-span"><span className="u-nav">Invite</span></span></a>
        <a href="/how_to_play" className="nav-link"><span className="nav-link-span"><span className="u-nav">How To Play</span></span></a>
      </div>
    </nav>
  )
}

export default Nav
