import React from 'react';
import { Link } from 'react-router-dom';
import style from "./ProductList.module.css";

function ProductList({product}) {

  const userId = 1;

  const handleAddCart = () => {
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
      if(res.ok) {
        window.alert('장바구니 담기');
      }
    })
    .catch(err => console.error(err));
  }


  return (
    <div className={style.productListWrap}>
      <div className={style.rating}>
        <p>👍{product.rating}</p>
      </div>
      <div className={style.image}>
        <Link to= {`/productDetail/${product.id}`}>
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