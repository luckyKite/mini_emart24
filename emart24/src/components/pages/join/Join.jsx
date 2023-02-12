import React from 'react';
import { useState } from 'react';
import style from './Join.module.css';

function Join() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordChk, setPasswordChk] = useState();
  const [isPasswordSame, setIsPasswordSame] = useState();
  
  const emailCheck = (email) => {
    const emailForm = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return emailForm.test(email);
  }

  const passwordCheck = (password) => {
    let result = false;
    const passwordForm = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if(password.match(passwordForm) === null) {
      //alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자 입니다.');
      //console.log('비번양식 틀림')
    } else {
      //alert('비밀번호를 아래에 한번 더 입력해주세요^^');
      //console.log('비번 양식 ok');
       result = true;
    }
    return result;
  }

  const passwordMatch = (password, passwordCheck) => {
    let result = false;
    if(password !== passwordCheck) {
      //alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요!');
      //console.log('비번입력틀림')
    } else {
      //alert('비밀번호가 확인되었습니다. 회원가입을 눌러주세요^^');
      //console.log('비번체크ok')
      return true;
    }
    return result;
  }


  const handlerName = (e) => {
    if(e.target.value) {
      setName(e.target.value);
    }
  }

  const handlerEmail = (e) => {
    if(emailCheck(e.target.value)) {
      setEmail(e.target.value);
    }
  }

  const handlerPassword = (e) => {
    if(passwordCheck(e.target.value)) {
      setPassword(e.target.value);
    }
  }

  const handlerPasswordChk = (e) => {
    if(passwordCheck(e.target.value)) {
      setPasswordChk(e.target.value);
    }
  }

  const hanlderJoinBtn = () => {
    console.log(name, email, password, passwordChk);
    if(name && email && password && passwordChk) {
      if (passwordMatch(password, passwordChk)) {
        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {"Content-type" : "application/json"},
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(res => {
          res.json();
          //setIsPasswordSame()
        })
        .then(data =>
          console.log("입력된데이터", data))
        .catch(err => console.error(err));
      }
      console.log(passwordMatch(password,passwordChk))
    }
  }
  return (
    <div className='container'>
      <div className={style.joinFrom}>        
        <p className={style.comment}>emart24에 가입하시고 혜택을 누리세요! </p>
        <p><input type="text" placeholder='이름' onBlur={handlerName} /></p>
        <p><input type="text" placeholder='이메일' onBlur={handlerEmail} /></p>
        <p><input type="password" placeholder='비밀번호는 영문, 숫자, 특수문자 포함 8~20자 입니다.' onBlur={handlerPassword} /></p>
        <p><input type="password" placeholder='비밀번호를 한번 더 입력 해 주세요.' onBlur={handlerPasswordChk} /></p>
        <button onClick={hanlderJoinBtn} className={style.joinBtn}>회원가입</button>
      </div>
    </div>
  );
}


export default Join;