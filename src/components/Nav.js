import { React, useState }  from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Nav.scss'

const Nav = () => {
  const [directories, setDirectories] = useState(() => ['intro', 'game', 'leaderboard',  'how to play']);
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
            return(<a key={i} href={"/" + url} className="nav-link active"><span className="nav-link-span"><span className="u-nav">{url}</span></span></a>);
          return(<a key={i} href={"/" + url} className="nav-link"><span className="nav-link-span"><span className="u-nav">{url}</span></span></a>);
        })
        }
      </div>
    </nav>
  )
}

export default Nav
