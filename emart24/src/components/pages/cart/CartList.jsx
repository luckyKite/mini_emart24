import React, { useEffect, useState } from 'react';
import style from "./CartList.module.css";
import { useRecoilState } from 'recoil';
import { CartCountState } from '../../state/CartCountState';

const CartList = ({cart}) => {

  const[cartObj, setCartObj] = useState(
    {
      id: cart.id,
      userId: cart.userId,
      productId: cart.productId,
      productImg: cart.thumbnail,
      productName: cart.name,
      productPrice: cart.price,
      qty: cart.qty,
    }
  );

  const url = `http://localhost:3001/products/${cart.productId}`;

  useEffect(() => {
    fetch(`http://localhost:3001/products/${cartObj.id}`)
    .then(res => res.json())
    .then(data => {
      setCartObj({
        ...cartObj,
        productImg: data.thumbnail,
        productName: data.name,
        productPrice: data.price,
      })
    })
  },[url])
  
 
  const handleQtyPatch = (qty) => {
    fetch(`http://localhost:3001/carts/${cartObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        ...cartObj,
        qty: qty
      })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const handleQtyIncre = () => {
    //state
    setCartObj({
        ...cartObj,
        qty: cartObj.qty + 1
    })

    //database
    handleQtyPatch(cartObj.qty + 1);
  }

  const handleQtyDecre = () => {
    //state
    if(cartObj.qty === 1)
    return alert("최소 수량은 1개입니다.");
    setCartObj({
      ...cartObj,
      qty: cartObj.qty - 1
    })

    //database
    handleQtyPatch(cartObj.qty - 1);
  }

  return (
    <>
      <div className={style.cartList}>
        <img src={cartObj.productImg} alt={cartObj.productName} />
        <div className={style.button}>
          <button className={style.mi} onClick={handleQtyDecre}>-</button>
          <p className={style.qty}>총 수량 : {cartObj.qty}개</p>
          <button className={style.pl} onClick={handleQtyIncre}>+</button>
          <p className={style.total}>총 금액 : {cartObj.productPrice * cartObj.qty}원</p>
          <button className={style.del} >X</button>
        </div>
      </div>
    
    </>
  );
}

export default CartList;