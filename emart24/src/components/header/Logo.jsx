import React from 'react';
import { Link } from 'react-router-dom';
import style from"./Logo.module.css";

function Logo() {
  return ( 
    <Link className={style.logo} to={'/'}><img src={require('../../image/logo.png')} alt='이마트로고' /></Link>
   );
}

export default Logo;