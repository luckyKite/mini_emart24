import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopNav.module.css";

import { logInState } from '../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function TopNav() {
  const [logInData, setLogInData] = useRecoilState(logInState);

  return (
    <ul className={style.topNav}> {
      logInData ?
        <>
          <li><Link to={'/member'}>회원정보</Link></li>
          <li onClick={()=> setLogInData(false)}>로그아웃</li>
        </> 
        : 
        <>
          <li><Link to={'/join'}>회원가입</Link></li>
          <li><Link to={'/login'}>로그인</Link></li>
        </>
    }
    </ul>
  );
}

export default TopNav;