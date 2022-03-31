import React  from 'react';

import '../css/Header.scss';

import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <div className="nav-wrapper">
        <Nav></Nav>
      </div>
    </header>
  )
}

export default Header
