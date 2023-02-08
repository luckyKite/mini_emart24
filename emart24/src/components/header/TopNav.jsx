import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopNav.module.css";

function TopNav() {
  return ( 
    <ul className={style.topNav}>
      <li><Link to={'/member'} className={style.link}>회원가입</Link></li>
      <li><Link to={'/login'} className={style.link}>로그인</Link></li>
    </ul>
   );
}

export default TopNav;