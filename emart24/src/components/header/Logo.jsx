import React from 'react';
import "./Logo.module.css";

function Logo() {
  return ( 
    <h1>
      <img src={require('../../image/logo.png')} alt='이마트로고' />
    </h1>
   );
}

export default Logo;