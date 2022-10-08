import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './containers/header/Header';
import Pages from './pages/Pages';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Pages />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
