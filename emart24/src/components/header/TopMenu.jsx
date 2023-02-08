import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopMenu.module.css";


function TopMenu() {
  return ( 
      <ul className={style.topMenu}>
        <li><Link to={'/product'} className={style.link}>상품</Link></li>
        <li><Link to={'/event'} className={style.link}>이벤트</Link></li>
        <li><Link to={'/cart'} className={style.link}>장바구니</Link></li>
      </ul>
   );
}

export default TopMenu;