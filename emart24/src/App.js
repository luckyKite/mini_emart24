import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Cart from './components/pages/cart/Cart';
import Product from './components/pages/product/Product';
import Event from './components/pages/event/Event';
import Login from './components/pages/login/Login';
import Join from './components/pages/join/Join';
import ProductDetail from './components/pages/productDetail/ProductDetail';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import SearchList from './components/pages/search/SearchList';
import Home from './components/pages/home/Home';
import Member from './components/pages/member/Member';
import ChangePassword from './components/pages/member/ChangePassword';

function App() {  

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homes/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member" element={<Member />} />
          <Route path="/join" element={<Join />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/product" element={<Product />} />
          <Route path="/event" element={<Event />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchList />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
