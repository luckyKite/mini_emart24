import React from 'react';
import style from './Home.module.css';
import mainImage from '../../../image/only24.png';
import HomeList from './HomeList';

function Home() {
  return ( 
    <div className='container'>
      홈입니다.
      <a href="https://www.emart24.co.kr/event/43" target="_blank"><img src="https://emart24.co.kr/image/NDg3Mg==" alt='이마트 카드할인' /></a>
      <a href="https://www.emart24.co.kr/event/41" target="_blank"><img src="https://emart24.co.kr/image/MzM5Nw==" alt='이마트 발렌타인' /></a>
      <a href="https://www.emart24.co.kr/event/44" target="_blank"><img src="https://emart24.co.kr/image/NDk3Nw==" alt='이마트 라면행사' /></a>   
      <HomeList />
    </div>
   );
}

export default Home;