import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CartList from './CartList';
import { CartCountState } from '../../state/CartCountState';
import style from "./Cart.module.css";
import { logInState } from '../../state/logInState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import withAuth from '../../withAuth/withAuth'

function Cart() {
  const userId = 0; // 비회원
  const [logInData, setLogInData] = useRecoilState(logInState);
  
  const [cartData, setCartData] = useState();
  const cartCount = useRecoilValue(CartCountState);

  useEffect(() => {
    fetch(`http://localhost:3001/carts?userId=${logInData.userId}`)
    .then(res => res.json())
    .then(data => {
      setCartData(data)
    })
  },[logInData, cartCount])

  return ( 
    <div className='container'>
      <p className={style.cartShow}>내가 담은 상품 🎁</p>
      {
        cartData && cartData.map( cart => (
          <CartList
            key={cart.id}
            cart={cart}
          />
        ))
      }
    </div>
   );
}
export default withAuth(Cart);