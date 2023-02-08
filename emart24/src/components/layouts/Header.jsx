import React from 'react';
import Logo from '../header/Logo';
import TopMenu from '../header/TopMenu';
import TopNav from '../header/TopNav';
import "./Header.module.css";

function Header() {
  return (
    <header>
      <Logo />
      <TopMenu/>
      <TopNav />
    </header>
  );
}

export default Header;