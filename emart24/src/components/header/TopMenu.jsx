import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./TopMenu.module.css";
import Lottie from "lottie-react";
import cart from "../../image/cart.json";
import { CartCountState } from '../state/CartCountState';
import { logInState } from '../state/logInState';
import { useRecoilState, useRecoilValue } from 'recoil';

function TopMenu() {
  
  const logInData = useRecoilValue(logInState);
  console.log(logInData)
  const [cartQty, setCartQty] = useRecoilState(CartCountState); 

  useEffect( () => {
    fetch(`http://localhost:3001/carts?userId=${logInData.userId}`)
    .then(res => res.json())
    .then(data => {
      let allQty = 0;
      data.map(item => {
        allQty += item.qty;
      })
      setCartQty(allQty)
    });
  }, [logInData.isLogIn]);


  return (
    <ul className={style.topMenu}>
      <li><Link to={'/product'}>상품</Link></li>
      <li><Link to={'/event'}>이벤트</Link></li>
      <li>
        <div className='cartIcon'>
          <Link to={'/cart'}>
            <Lottie animationData={cart} style={{width: "100px", display: "inline-block", }}></Lottie>
          </Link>
          {
            logInData.isLogIn ? <p className={style.qtyBadge}>담긴 상품수량: {cartQty}</p> : ""
          }
          </div>
      </li>
    </ul>
   );
}

export default TopMenu;