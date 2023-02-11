import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from "./ProductDetail.module.css";

function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect( () => {
    fetch(`http://localhost:3001/products/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setProduct(data);
    })
    .catch(err => console.log(err))
  },[id]);


  return (
    <div className={style.detailWrap}>
      {
        product && (
          <div className={style.detailInfo}>
            <h2 className={style.name}>{product.name}</h2>
            <img src={product.thumbnail}/>
            <div className={style.detailText}>
              <p>상세설명 : {product.description}</p>         
              <p>카테고리(분류) : {product.category}</p>
              <p>제조사 : {product.brand}</p>
              <p>정가 : {product.price}원</p>
              <p>할인금액 : {product.discount}원</p>
              <p>구매자 평점 : {product.rating}</p> 
            </div> 
          </div>
        )
      }
    
    </div>
  );
}

export default ProductDetail;