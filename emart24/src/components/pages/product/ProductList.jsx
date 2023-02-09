import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./ProductList.module.css";

function ProductList({product}) {

  const userId = 1;
  console.log(product)

  const [productData, setProductData] = useState();

  const handleAddCart = () => {
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
      if(res.ok) {
        window.alert('장바구니 담기');
      }
    })
    .catch(err => console.error(err));
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
    <div className={style.productListWrap}>
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

export default ProductList;