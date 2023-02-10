import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopMenu.module.css";
import Lottie from "lottie-react";
import cart from "../../image/cart.json";

function TopMenu() {
  return (
    <ul className={style.topMenu}>
      <li><Link to={'/product'}>상품</Link></li>
      <li><Link to={'/event'}>이벤트</Link></li>
      <li>
      <Link to={'/cart'}>
        <Lottie animationData={cart} style={{width: "100px", display: "inline-block", }}></Lottie>
      </Link>
      </li>
    </ul>
   );
}

export default TopMenu;