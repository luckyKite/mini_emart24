import React, { useEffect, useState } from 'react';
import style from "./Product.module.css";
import ProductList from './ProductList';

function Product() {

  const [product, setProduct] = useState();
  const [eventList, setEventList] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/events/1`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setEventList(data);
    })

    // fetch(`http://localhost:3001/products`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProduct(data);
    //   })
  }, []);


  return ( 
    <div className='container'>
      <p className={style.comment}>emart24에서 상품을 골라 장바구니에 담아보세요~♬</p>
        <ul className={style.productList}>
          {/* {
            product && product.map( product =>
              <ProductList key={product.id} product={product} />
            )
          } */}
          {
            eventList && eventList.eventProductList.map( eventProduct => (
              <ProductList key={eventProduct.id} product={eventProduct.productId} />
            ))

          }
        </ul>
      </div>
   );
}

export default Product;