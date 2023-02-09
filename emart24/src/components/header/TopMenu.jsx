import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopMenu.module.css";


function TopMenu() {
  return ( 
      <ul className={style.topMenu}>
        <li><Link to={'/product'}>상품</Link></li>
        <li><Link to={'/event'}>이벤트</Link></li>
        <li><Link to={'/cart'}>장바구니</Link></li>
      </ul>
   );
}

export default TopMenu;