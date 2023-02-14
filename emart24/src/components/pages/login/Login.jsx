import React, { useEffect, useState } from 'react'
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { logInState } from '../../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


export default function Login() {

    const navigate = useNavigate();
    const [logInData, setLogInData] = useRecoilState(logInState);
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
      if(emailValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
      setEmail(e.target.value);
      const regex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };

    const handlePw = (e) => {
      setPw(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };

    const onClickConfirmButton = () => {
      fetch(`http://localhost:3001/users?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if(data.length!==0) {
          if(data[0].password === pw) {
            alert('로그인에 성공했습니다.')
            setLogInData(data[0])
            navigate('/'); //로그인 성공후 페이지 이동안됨
          }
        } else {
          alert('로그인 실패했습니다.')
        }
      })
      
    }

    return (
      <div className='container'>
        <form className={style.loginForm}>
          <p className={style.loginComment}>로그인</p>
            <p className={style.email}>이메일 주소</p>
            <input
                className="input"
                type="text"
                placeholder="ex) sample@gmail.com"
                value={email}
                onChange={handleEmail}/>
          <p className={style.err}>
            {!emailValid && email.length > 0 && (
              <p className={style.errMsg}>올바른 이메일을 입력해주세요.</p>
            )}
          </p>
          <p className={style.pass}>비밀번호</p>
          <input
                className="input"
                type="password"
                placeholder="ex) sample**0828"
                value={pw}
                onChange={handlePw}
              />
          <p className={style.err}>
            {!pwValid && pw.length > 0 && (
              <p className={style.errMsg}>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</p>
            )}
          </p>
          <button 
            onClick={onClickConfirmButton} 
            disabled={notAllow} 
            className={style.loginBtn}
          >
          확인
          </button>        
        </form>
      </div>
    );
}
