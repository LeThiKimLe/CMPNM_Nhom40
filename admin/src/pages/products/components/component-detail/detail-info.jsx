import { Col, Row } from 'antd';
import React from 'react';
import { formatThousand } from '../../../../utils';

const DetailInfo = (props) => {
  const { info } = props;
  const {
    color,
    createdAt,
    name,
    productPictures,
    quantitySold,
    sale,
    salePrice,
    regularPrice,
    stock,
    category_path,
  } = info;

  const listData = [
    {
      name: 'Tên',
      value: name,
    },
    {
      name: 'Thương hiệu',
      value: category_path[2].name,
    },
    {
      name: 'Màu sắc',
      value: color.value,
    },
    {
      name: 'Giá gốc',
      value: `${regularPrice && formatThousand(regularPrice)}đ`,
    },
    {
      name: 'Giá khuyến mãi',
      value: `${salePrice && formatThousand(salePrice)}đ`,
    },
    {
      name: 'Phần trăm giảm giá',
      value: `${sale && sale}%`,
    },
    {
      name: 'Số lượng đã bán',
      value: `${quantitySold && formatThousand(quantitySold)}`,
    },
    {
      name: 'Số lượng trong kho',
      value: `${stock && formatThousand(stock)}`,
    },
    {
      name: 'Ngày tạo',
      value: `${new Date(createdAt).toLocaleDateString()}`,
    },
  ];
  return (
    <Row>
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '15px 0px',
        }}
      >
        {productPictures &&
          productPictures.map((item) => {
            return (
              <div style={{ margin: '5px' }}>
                <img src={item} alt="" style={{ borderRadius: '8px' }} />
              </div>
            );
          })}
      </Col>
      <div style={{ marginTop: '20px', marginLeft: '10px' }}>
        {listData.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minWidth: '600px',
              }}
            >
              <p
                style={{
                  minWidth: '250px',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                {item.name}
              </p>
              <p style={{ fontSize: '16px', fontWeight: '400' }}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </Row>
  );
};

export default DetailInfo;
