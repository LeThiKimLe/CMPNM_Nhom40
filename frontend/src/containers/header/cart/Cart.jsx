import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartItem, addToCart, decreaseQty }) => {
  const totalPrice = cartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartItem.lenght === 0 && (
              <h1 className="no-items product">No items are add in Cart</h1>
            )}
          </div>
          {cartItem.map((item) => {
            const productQty = item.price * item.qty;
            return (
              <div className="cart-list product d_flex">
                <div className="img">
                  <img src={item.cover} alt="" />
                </div>
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <h4>
                    {item.price}*{item.qty}
                    <span>${productQty}</span>
                  </h4>
                </div>
                <div className="cart-items-function">
                  <div className="removeCart">
                    <button className="removeCart">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <div className="cartControl d_flex">
                    <button className="incCart" onClick={() => addToCart(item)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      className="incCart"
                      onClick={() => decreaseQty(item)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-price"></div>
              </div>
            );
          })}
          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price:</h4>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
