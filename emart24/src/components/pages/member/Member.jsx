import React, { useEffect, useState } from 'react';
import style from './Member.module.css';
import { logInState } from '../../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import users from "../../../image/user.png";
import changePassword from './ChangePassword';
import { Link } from 'react-router-dom';

function Member() {

  const [logInData, setLogInData] = useRecoilState(logInState);

  return (
    <div className='container'>   
      <div className={style.userWrap}>
        <p className={style.userMain}>나의 정보</p>
        <img src={users} alt='나의정보이미지' className={style.userImage} />            
        <p>이름: {logInData && logInData.name}</p>
        <p className={style.userEmail}>이메일(아이디) : {logInData && logInData.email}</p>
        <p className={style.userPass}>
          비밀번호 : {logInData && logInData.password}
          <Link to= '/changePassword'>
          <button className={style.change}>변경</button></Link>
        </p>    
      </div> 
    </div>
  );
}

export default Member;