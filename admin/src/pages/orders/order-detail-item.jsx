import React from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { formatThousand } from '../../utils';
import { Col, Typography, Button, Avatar } from 'antd';
const getColorProduct = (product, colors) => {
  let colorName = '';
  const { color, category } = product;
  colors.map((item) => {
    if (item.value === color && item.category == category) {
      colorName = item.name;
    }
  });
  return colorName;
};
const OrderDetailItem = (props) => {
  const { item } = props;
  const auth = useSelector((state) => state.auth);
  const { colors } = auth.data;
  const { productId, purchasedQty } = item;
  const { salePrice, productPictures, name, detailsProduct } = productId;
  const { ram, storage } = detailsProduct;
  const colorName = getColorProduct(productId, colors);
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
