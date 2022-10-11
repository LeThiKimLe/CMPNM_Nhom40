import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUserLarge,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

const Search = ({ cartItem }) => {
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    search.classList.toggle('active', window.scrollY > 100);
  });
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width"></div>
          <div className="search-box f_flex">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" placeholder="Search" />
            <span>All Categories</span>
          </div>
          <div className="icon f_flex width">
            <FontAwesomeIcon icon={faUserLarge} />
            <div className="cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                <span>{cartItem.lenght === 0 ? '' : cartItem.lenght}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
