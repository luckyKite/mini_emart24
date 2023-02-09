import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import style from "./CartList.module.css";


const CartList = ({cart}) => {

  const[cartObj, setCartObj] = useState(
    {
      id: cart.id,
      userId: cart.userId,
      productId: cart.productId,
      productImg: "",
      productName: "",
      productPrice: 0,
      qty: cart.qty,
    }
  );

  const url = `http://localhost:3001/products/${cart.productId}`;

  useEffect(() => {
    fetch(url)
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
  
  const handleIncreaseQty = () => {
    fetch(`http://localhost:3001/carts/${cart.productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            productId: cart.productId,
            qty: cart.qty + 1
          }),
        })
          .then((res) => {
            res.json();
            if (res.ok) {
              //alert(`장바구니 수량 증가.`);
              setCartObj({
                ...cartObj,
                qty: cartObj.qty + 1
              })
            } else {
              alert("서버 에러");
            }
          })
          .catch((err) => console.error(err));
  }

  const handleDecreaseQty = () => {
    fetch(`http://localhost:3001/carts/${cart.productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            productId: cart.productId,
            qty: cart.qty - 1
          }),
        })
          .then((res) => {
            res.json();
            if (res.ok) {
              //alert(`장바구니 수량 감소`);
              setCartObj({
                ...cartObj,
                qty: cartObj.qty - 1
              })
            } else {
              alert("서버 에러");
            }
          })
          .catch((err) => console.error(err));
  }

  const quantity = cartObj.qty;
  return (
    <>
      <div className={style.cartList}>
        <img src={cartObj.productImg} alt={cartObj.productName} />
        <div className={style.button}>
          <button className={style.mi} onClick={handleDecreaseQty}>-</button>
          <p className={style.qty}>총 수량 : {cartObj.qty}개</p>
          <button className={style.pl} onClick={handleIncreaseQty}>+</button>
          <p className={style.total}>총 금액 : {cartObj.productPrice * cartObj.qty}원</p>
          <button className={style.del} >X</button>
        </div>
      </div>
    
    </>
  );
}

export default CartList;