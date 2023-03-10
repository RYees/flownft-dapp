import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mint from './pages/Mint';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Mint />} />
    </Routes>
  );
}

export default App;