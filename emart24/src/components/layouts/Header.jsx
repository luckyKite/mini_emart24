import React from 'react';
import Logo from '../header/Logo';
import TopMenu from '../header/TopMenu';
import TopNav from '../header/TopNav';
import TopSearchBar from '../header/TopSearchBar';
import styled from"./Header.module.css";

function Header() {
  return (
    <header>
      <TopNav />
      <div className={styled.headerMain}>
        <Logo />
        <TopSearchBar />
        <TopMenu/>
      </div>
    </header>
  );
}

export default Header;