import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <FontAwesomeIcon icon={faPhone} />
            <label>Nhom 9</label>
            <FontAwesomeIcon icon={faEnvelope} />
            <label>19110397@student.hcmute.edu.vn</label>
          </div>
          <div className="right row RText">
            <label>FAQ's</label>
            <label>Need Helps?</label>
            <span>Language</span>
            <label>VIE</label>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
