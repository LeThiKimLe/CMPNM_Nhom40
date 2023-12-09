import React from 'react';

import { formatThousand } from '../../utils';
import { Col, Typography, Avatar } from 'antd';
const OrderDetailItem = (props) => {
  const { item } = props;
  const { productId, purchasedQty } = item;
  const { salePrice, productPictures, name, ram, storage, color } = productId;
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
          {ram} - {storage} - {color}
        </Typography.Text>
      </Col>
    </>
  );
};

export default OrderDetailItem;
