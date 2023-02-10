import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CartList from './CartList';
import { useRecoilValue } from 'recoil';
import { CartCountState } from '../../state/CartCountState';
import style from "./Cart.module.css";


function Cart() {
  const userId = 1;
  const [cartData, setCartData] = useState();
  const cartCount = useRecoilValue(CartCountState);

  useEffect(() => {
    fetch(`http://localhost:3001/carts?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      setCartData(data)
    })
  },[userId, cartCount])

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
export default Cart;