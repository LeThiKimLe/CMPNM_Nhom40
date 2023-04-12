import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const TopCate = () => {
  return (
    <>
      <section className="topCat background">
        <div className="container">
          <div className="heading d_flex">
            <div className="heading-left row f_lex">
              <FontAwesomeIcon icon={faBorderAll} />
              <h2>Top Categories</h2>
            </div>
            <div className="heading-right row">
              <span>View all</span>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopCate;
