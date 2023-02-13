import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopNav.module.css";
import { useNavigate } from 'react-router-dom';
import { logInState } from '../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function TopNav() {

  const navigate = useNavigate();
  const [logInData, setLogInData] = useRecoilState(logInState);
  
  const logOut = () => {
    setLogInData(false);
    navigate('/');
  }

  return (
    <ul className={style.topNav}> {
      logInData ?
        <>
          <li><Link to={'/member'}>회원정보</Link></li>
          <li onClick={logOut} className={style.outTag}>로그아웃</li>
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