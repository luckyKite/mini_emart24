import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CartList from './CartList';

function Cart() {
  const userId = 1;
  const [cartData, setCartData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/carts?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      setCartData(data)
    })
  },[userId])

  return ( 
    <div className='container'>
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