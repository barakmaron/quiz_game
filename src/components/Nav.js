import { React, useState }  from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Nav.scss'

const Nav = () => {
  const [directories] = useState(() => ['intro', 'game', 'leaderboard',  'how%20to%20play']);
  const location = useLocation().pathname;

  return (
    <nav id="nav">
      <div className="nav left">
        <span className="gradient skew">
          <h1 className="logo un-skew"><a href="/">Quiz Game</a></h1></span>
        <button id="menu" className="btn-nav"><span className="fas fa-bars"></span></button>
      </div>
      <div className="nav right">
        {directories.map((url,i) =>
        {
          if(location.substring(1) === url)
          {
            url = url === 'how%20to%20play' ? 'how to play' : url;
            return(<Link key={i} to={"/" + url} className="nav-link active"><span className="nav-link-span"><span className="u-nav">{url}</span></span></Link>);
          }
          url = url === 'how%20to%20play' ? 'how to play' : url;
          return(<Link key={i} to={"/" + url} className="nav-link"><span className="nav-link-span"><span className="u-nav">{url}</span></span></Link>);
        })
        }
      </div>
    </nav>
  )
}

export default Nav
