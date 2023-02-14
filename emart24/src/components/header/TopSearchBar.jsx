import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SearchState } from '../state/SearchState';
import style from "./TopSearchBar.module.css";

function TopSearchBar() {

  const [searchWord, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useRecoilState(SearchState);

  const handleSearch = () => {
    //console.log('단어검색', searchWord);
    //window.location.href = `/search/${searchWor}`
    fetch(`http://localhost:3001/products?q=${searchWord}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      setSearchResult(data);
    });
  }

  // search word change handler
  const handleChange = (event) => {
    //console.log(event.target.value);
    setSearchWord(event.target.value);
  }

  return (
    <div className={style.topSearchBar}>
      <Link to={'/search'}>
        <div className={style.search}>
          <input type="text" 
            placeholder='검색할 상품을 입력하고 Enter를 누르세요.'
            onChange={handleChange}
            onKeyDown={(e)=> e.key === 'Enter' && handleSearch()}
            defaultValue={searchWord} />
        </div>
      </Link>
    </div>
   );
}

export default TopSearchBar;