import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
