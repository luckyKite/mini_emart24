import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './HomeList.module.css';


function HomeList() {

  const [home, setHomes] = useState();

  useEffect(() => {
  fetch(`http://localhost:3001/homes`)
    .then(res => res.json())
    .then(data => {
      setHomes(data);
    })
  }, []);


  return (
    <div>
      <div className='container'>
        <p className={style.homeMain}>ONLY 이마트24</p>
        <p className={style.homeDetail}>이마트24에서만 있는 차별화 상품을 만나보세요.</p>
        <div className={style.homeListWrap}>
          {
            home && home.map( homeData => 
              <div key={homeData.id} className={style.homeWrap}>
                <Link to= {`/homes/${homeData.id}`}>                  
                  <img src={homeData.image} alt='홈화면 이벤트 이미지' />
                </Link> 
                <p className={style.homeName}>{homeData.name}</p>
                <p className={style.homeTitle}>{homeData.title}</p>
              </div>
            )       
          } 
        </div>
      </div> 
    </div>
  );
}

export default HomeList;