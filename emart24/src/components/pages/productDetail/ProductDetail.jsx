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
    <div>
      {
        product && (
          <div className={style.detailWrap}>
          <img src={product.thumbnail} alt={product.description} />
          <p>평점 : {product.rating}</p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.category}</p>
          <p>{product.brand}</p>
          <p>가격 : {product.price}</p>
          <p>할인금액 : {product.discount}</p>
          

          </div>
        )
      }
    
    </div>
  );
}

export default ProductDetail;