import React from 'react';
import { Link } from 'react-router-dom';
import style from "./TopSearchBar.module.css";

function TopSearchBar() {
  return (
    <div className={style.topSearchBar}>
      <Link to={'/search'}><input type="text" placeholder='검색할 상품을 입력하세요' className={style.search}/></Link>
    </div>
   );
}

export default TopSearchBar;