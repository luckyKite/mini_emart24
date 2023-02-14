import React, { useEffect, useState } from 'react'
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { logInState } from '../../state/logInState';
import { useRecoilState } from 'recoil';


export default function Login() {

    const navigate = useNavigate();
    const [logInData, setLogInData] = useRecoilState(logInState);

    const [inputData, setInputData] = useState({
      email: '',
      password: ''
    })

    const onClickConfirmButton = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3001/users?email=${inputData.email}&&password=${inputData.password}`)
      .then(res => res.json())
      .then(data => {
        if(data.length!==0) {
          setLogInData({
            ...logInData,
            isLogIn: true,
            email: data[0].email,
            name: data[0].name,
            userId: data[0].id,
            password: data[0].password,
          })
          alert(`${data[0].name}님 환영합니다.`)
          navigate('/');
        } else {
          alert('로그인 실패했습니다.')
        }
      })
    }

    const handleInpuData = (e) => {
      const {name, value} = e.target;
      setInputData({
        ...inputData,
        [name]: value
      })
    }

    return (
      <div className='container'>
        <form className={style.loginForm} onSubmit={onClickConfirmButton}>
          <p className={style.loginComment}>로그인</p>
            <p className={style.email}>이메일 주소</p>
            <input
                className="input"
                type="text"
                placeholder="ex) sample@gmail.com"
                name='email'
                value={inputData.email}
                onChange={handleInpuData}/>
          <p className={style.pass}>비밀번호</p>
          <input
                className="input"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name='password'
                value={inputData.password}
                onChange={handleInpuData}
              />
          <button 
            type="submit"
            className={style.loginBtn}
          >
          확인
          </button>        
        </form>
      </div>
    );
}
