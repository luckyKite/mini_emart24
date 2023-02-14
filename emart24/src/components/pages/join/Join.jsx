import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Join.module.css';
import Swal from "sweetalert2";

function Join() {

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isDuplicateEmail: false,
  });
  
  // 이메일 정규식 테스트
  const emailCheck = (email) => {
    const emailForm = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return emailForm.test(email);
  }

  // 비밀번호 정규식 테스트
  const passwordCheck = (password) => {
    const passwordForm = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    return password.match(passwordForm)
  }

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const hanlderJoinBtn = (e) => {
    e.preventDefault();
    if( inputData.name === '' || inputData.email === '' || inputData.password === '' || inputData.confirmPassword === ''){
      return alert('빈칸을 모두 입력해주세요!');
    }
    if(!emailCheck(inputData.email)){
      return alert('이메일 형식이 올바르지 않습니다.');
    }
    if(!passwordCheck(inputData.password)){
      return alert('비밀번호 형식이 올바르지 않습니다.');
    }
    if(inputData.password !== inputData.confirmPassword){
      return alert('비밀번호가 서로 일치하지 않습니다.');
    }
    if(!inputData.isDuplicateEmail){
      return alert('이메일 중복확인을 해주세요.');
    }
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify({
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      })
    })
    .then(res => {
      if(res.ok){
        alert('회원가입이 완료되었습니다.');
        navigate('/login'); //login으로 바꾸면 로그인 기능이 안됩니다... -> / '/'일때는 로그인도 정상      
      }
    })
    .catch(err => console.error(err));
  }

  /** 이메일 중복확인  */
  const emailChk = () => {
    fetch(`http://localhost:3001/users?email=${inputData.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          alert("사용가능 이메일입니다");
          setInputData({
            ...inputData,
            isDuplicateEmail: true
          });
        } else {
          alert("중복된 이메일입니다");
        }
      });
  };
  
  return (
    <div className='container'>
      <form className={style.joinFrom} onSubmit={hanlderJoinBtn}>
        <p className={style.comment}>emart24에 가입하시고 혜택을 누리세요! </p>
        <input type="text" placeholder='이름' name='name' onChange={handleInputData}/>
        <input type="text" placeholder='이메일' name='email' onChange={handleInputData}/>
        <p onClick={emailChk} className={style.doubleChk}>이메일 중복확인</p>
        <input type="password" placeholder='비밀번호는 영문, 숫자, 특수문자 포함 8~20자 입니다.' name='password' onChange={handleInputData}/>
        <input type="password" placeholder='비밀번호를 한번 더 입력 해 주세요.' name='confirmPassword' onChange={handleInputData}/>
        <button type="submit" className={style.joinBtn}>회원가입</button>
      </form>
    </div>
  );
}


export default Join;