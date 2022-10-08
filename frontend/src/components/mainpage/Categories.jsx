import React from 'react';

const Categories = () => {
  const data = [
    {
      cateImg: '',
      cateName: 'Apple',
    },
    {
      cateImg: '',
      cateName: 'Samsung',
    },
    {
      cateImg: '',
      cateName: 'Xiaomi',
    },
    {
      cateImg: '',
      cateName: 'Oppo',
    },
    {
      cateImg: '',
      cateName: 'Vivo',
    },
  ];
  return (
    <>
      <div className="category">
        {data.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
              <img src={value.cateImg} alt="" />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
