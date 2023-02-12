import React, { useEffect, useState } from 'react'
import style from './Login.module.css';


const User = {
  email: 'beat1103@gmail.com',
  pw: '1234*1234qq'
}


export default function Login() {
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
      if(email === User.email && pw === User.pw) {
        alert('로그인에 성공했습니다.')
      } else {
        alert("등록되지 않은 회원입니다.");
      }
    }

    return (
      <div className='container'>
        <div className={style.loginForm}>
          <p className={style.loginComment}>로그인</p>
            <p className={style.email}>이메일 주소</p>
            <p>
              <input
                className="input"
                type="text"
                placeholder="ex) test@gmail.com"
                value={email}
                onChange={handleEmail}/>
            </p>
          <p className={style.err}>
            {!emailValid && email.length > 0 && (
              <p>올바른 이메일을 입력해주세요.</p>
            )}
          </p>

          <p className={style.pass}>비밀번호</p>
            <p>
              <input
                className="input"
                type="password"
                placeholder="ex) 123*456a"
                value={pw}
                onChange={handlePw}
              />
            </p>
          <p className={style.err}>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </p>

          <button 
            onClick={onClickConfirmButton} 
            disabled={notAllow} 
            className={style.loginBtn}
          >
          확인
          </button>        
        </div>
      </div>
    );
}
