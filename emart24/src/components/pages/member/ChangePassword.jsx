import React from 'react';
import { useState } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { logInState } from '../../state/logInState';
import style from './ChangePassword.module.css';

const ChangePassword = () => {
  
  const navigate = useNavigate();
  const [nowPassword, setNowPassword] = useState();
  const [nextPassword, setNextPassword] = useState();
  const [nextPassword2, setNextPassword2] = useState();

  const loginData = useRecoilValue(logInState);
  
  const changePassword = () => {
    if(loginData.password === nowPassword)  {
      fetch(`http://localhost:3001/users/${loginData.userId}`,{
        method: "PATCH",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          password : nextPassword,
        }),
      })
      .then((res) => {
        res.json();
        if(res.ok) {
          alert('비밀번호 변경을 완료했습니다.');
          navigate('/member')
        } else {
          alert('비밀번호 변경이 실패했습니다.');
        }
      })
      .catch((err) => console.log(err));
    } 
  }


  return (
    <div className='container'>
      <div className={style.changePassWrap}>
        <p className={style.changeTitle}>비밀번호 변경</p>
        <input onBlur={(e) => setNowPassword(e.target.value)} type="password" placeholder='현재 비밀번호 입력'/>
        <input onBlur={(e) => setNextPassword(e.target.value)} type="password" placeholder='바꿀 비밀번호 입력'/>
        <input onBlur={(e) => setNextPassword2(e.target.value)} type="password" placeholder='바꿀 비밀번호 재입력'/>
        <button className={style.changeBtn} onClick={changePassword}>변경하기</button>
      </div>
    </div>
  );
}

export default ChangePassword;