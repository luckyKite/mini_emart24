import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./EventList.module.css";

function EventList({product}) {

  const userId = 1;
  const [productData, setProductData] = useState();

  const getSameProduct = async () => {
    let result = false;
    await fetch(`http://localhost:3001/carts?userId=1&productId=${product}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length !== 0) result = { id: data[0].id, qty: data[0].qty }
      });
    return result;
  };

  const handleAddCart = () => {
    getSameProduct().then(result => {
      if (result) {
        // 중복 상품이 있는 경우
        fetch(`http://localhost:3001/carts/${product}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            productId: product,
            qty: result.qty + 1
          }),
        })
          .then((res) => {
            res.json();
            if (res.ok) {
              alert(`상품을 장바구니에 추가합니다.`);
            } else {
              alert("서버 에러");
            }
          })
          .catch((err) => console.error(err));
      } else {
        // 중복 상품이 없는 경우
        fetch('http://localhost:3001/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product,
            userId: userId,
            qty: 1
          })
        })
          .then(res => {
            res.json();
            alert(`이벤트 상품을 장바구니에 담았습니다!`);
          })
          .catch(err => console.error(err));
        }
    })
  }


  useEffect(()=> {
    fetch(`http://localhost:3001/products/${product}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setProductData(data);
    }).catch(err => console.error(err));
  },[product])

  return (
    <div className={style.eventListWrap}>
      { productData && (
        <>
        <div className={style.rating}>
          <p>👍{productData.rating}</p>
        </div>
        <div className={style.image}>
          <Link to= {`/productDetail/${productData.id}`}>
            <img src={productData.thumbnail} alt={productData.description} />
          </Link>   
        </div>
        <div className={style.productInfo}>
          <p className={style.name}>{productData.name}</p>
          <p className={style.price}>{productData.price}원</p>
        </div>
        <div className={style.cartBtnWrap}>
          <p onClick={handleAddCart} className={style.cartBtn}>
            담기
          </p>
        </div>
        </>
      )}
    </div>
  );
}

export default EventList;