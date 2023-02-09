import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopNav.module.css";

function TopNav() {
  return ( 
    <ul className={style.topNav}>
      <li><Link to={'/join'}>회원가입</Link></li>
      <li><Link to={'/login'}>로그인</Link></li>
    </ul>
   );
}

export default TopNav;