import React from 'react';
import { Link } from 'react-router-dom';
import style from "./ProductList.module.css";

function ProductList({ product }) {

  const userId = 1;

  const getSameProduct = async () => {
    let result = false;
    await fetch(`http://localhost:3001/carts?userId=1&productId=${product.id}`)
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
        fetch(`http://localhost:3001/carts/${result.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            productId: product.id,
            qty: result.qty + 1
          }),
        })
          .then((res) => {
            res.json();
            if (res.ok) {
              alert(`${product.name}이/가 장바구니에 담겼습니다.`);
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
            productId: product.id,
            userId: userId,
            qty: 1
          })
        })
          .then(res => {
            res.json();
          })
          .catch(err => console.error(err));
      }
    })

  }


  return (
    <div className={style.productListWrap}>
      <div className={style.rating}>
        <p>👍{product.rating}</p>
      </div>
      <div className={style.image}>
        <Link to={`/productDetail/${product.id}`}>
          <img src={product.thumbnail} alt={product.description} />
        </Link>
      </div>
      <div className={style.productInfo}>
        <p className={style.name}>{product.name}</p>
        <p className={style.price}>{product.price}원</p>
      </div>
      <div className={style.cartBtnWrap}>
        <button onClick={handleAddCart} className={style.cartBtn}>
          담기
        </button>
      </div>
    </div>
  );
}

export default ProductList;