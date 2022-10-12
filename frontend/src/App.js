import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './containers/header/Header';
import Pages from './pages/Pages';
import Cart from './containers/header/cart/Cart';
import Data from './components/flashDeals/Data';
import { useState } from 'react';

function App() {
  //Step 1: fetch data from database
  const { productItems } = Data;

  const [cardItem, setCardItem] = useState([]);

  const addToCart = (product) => {
    const producExit = cardItem.find((item) => item.id === product.id);
    if (producExit) {
      setCardItem(
        cardItem.map((item) =>
          item.id === product.id
            ? { ...producExit, qty: producExit.qty + 1 }
            : item
        )
      );
    } else {
      setCardItem([...cardItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const producExit = cardItem.find((item) => item.id === product.id);
    if (producExit.qty === 1) {
      setCardItem(cardItem.filter((item) => item.id !== product.id));
    } else {
      setCardItem(
        cardItem.map((item) =>
          item.id === product.id
            ? { ...producExit, qty: product.qty - 1 }
            : item
        )
      );
    }
  };
  return (
    <>
      <Router>
        <Header cardItem={cardItem} />
        <Routes>
          <Route
            path="/"
            element={
              <Pages productItems={productItems} addToCart={addToCart} />
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                cardItem={cardItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
