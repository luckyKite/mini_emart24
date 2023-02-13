import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from "./TopMenu.module.css";
import Lottie from "lottie-react";
import cart from "../../image/cart.json";
import { CartCountState } from '../state/CartCountState';
import { logInState } from '../state/logInState';
import { useRecoilState } from 'recoil';

function TopMenu() {
  const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  const [cartQty, setCartQty] = useRecoilState(CartCountState); 

  useEffect( () => {
    fetch(`http://localhost:3001/carts?userId=${logInData ? logInData.id : userId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCartQty(data.length)
    });
  }, [logInData ? logInData.id : userId]);


  return (
    <ul className={style.topMenu}>
      <li><Link to={'/product'}>상품</Link></li>
      <li><Link to={'/event'}>이벤트</Link></li>
      <li>
        <div className='cartIcon'>
          <Link to={'/cart'}>
            <Lottie animationData={cart} style={{width: "100px", display: "inline-block", }}></Lottie>
          </Link>
          <p className={style.qtyBadge}>담긴 상품종류: {cartQty}</p>
          </div>
      </li>
    </ul>
   );
}

export default TopMenu;