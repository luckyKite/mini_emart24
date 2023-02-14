import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { SearchState } from '../../state/SearchState';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CartCountState } from '../../state/CartCountState';
import style from './SearchList.module.css';
import ProductList from '../product/ProductList';


function SearchList({product}) {
  
  const searchResult  = useRecoilValue(SearchState); 
  
  const userId = 1;
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useRecoilState(CartCountState);

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
    //console.log(product.id);
    getSameProduct().then(result => {
      if (result) {
        // 중복 상품이 있는 경우
        fetch(`http://localhost:3001/carts/${result.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            productId: product.id,
            qty: result.qty + 1
          }),
        })
          .then((res) => {
            res.json();
            if (res.ok) {
              setCartCount(cartCount+1)
              alert(`${product.name}이/가 장바구니에 담겼습니다.`);
              navigate('/cart');
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
            userId: userId,
            productId: product.id,
            qty: 1
          })
        })
          .then(res => {
            res.json();
            setCartCount(cartCount+1)
            alert(`${product.name}이/가 장바구니에 담겼습니다.`);
            navigate('/cart');
          })
          .catch(err => console.error(err));
      }
    })
  }

  console.log(searchResult);
  return (
    <div className='container'>
      <p className={style.comment}>찾으시는 상품을 확인해보세요! 🔍 </p>
      {
        searchResult &&
        searchResult.map(item =>
          <ProductList key={item.id} product={item} showRating={false} />
        )
      }
    </div>
  );
}

export default SearchList;