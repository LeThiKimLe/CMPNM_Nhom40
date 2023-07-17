import React from 'react';

import { formatThousand } from '../../utils';
import { Col, Typography, Avatar } from 'antd';
const colorList = [
  { name: 'Đỏ', value: 'Red' },
  { name: 'Cam', value: 'Orange' },
  { name: 'Vàng', value: 'Yellow' },
  { name: 'Xanh lá cây', value: 'Green' },
  { name: 'Xanh dương', value: 'Blue' },
  { name: 'Tím', value: 'Purple' },
  { name: 'Hồng', value: 'Pink' },
  { name: 'Nâu', value: 'Brown' },
  { name: 'Xám', value: 'Gray' },
  { name: 'Đen', value: 'Black' },
  { name: 'Trắng', value: 'White' },
];
const getColorProduct = (product) => {
  let colorName = '';
  const { color } = product;
  colorList.map((item) => {
    if (item.value === color) {
      colorName = item.name;
    }
  });
  return colorName;
};
const OrderDetailItem = (props) => {
  const { item } = props;

  const { productId, purchasedQty } = item;
  const { salePrice, productPictures, name, detailsProduct } = productId;
  const { ram, storage } = detailsProduct;
  const colorName = getColorProduct(productId);
  return (
    <>
      <Col span={8} style={{ marginBottom: '8px' }}>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={50}
            src={productPictures[0]}
          ></Avatar>
          <div className="avatar-info">
            <Typography.Title level={5}>{name}</Typography.Title>
            <p>
              {formatThousand(salePrice)}đ x {purchasedQty}
            </p>
          </div>
        </Avatar.Group>
      </Col>
      <Col span={8}>
        <Typography.Text strong style={{ fontSize: '14px' }}>
          {ram} - {storage} - {colorName}
        </Typography.Text>
      </Col>
      {/* <Col span={4}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{
              background: '#f44336',
              color: 'white',
              borderRadius: '10px',
            }}
            icon={<DeleteOutlined />}
            size="small"
          >
            Xóa
          </Button>
        </div>
      </Col> */}
    </>
  );
};

export default OrderDetailItem;
