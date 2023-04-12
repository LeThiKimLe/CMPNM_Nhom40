import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import DetailInfo from './component-detail/detail-info';
import DigitalInfo from './component-detail/digital-info';
import DescriptionInfo from './component-detail/description-info';

const DetailModal = (props) => {
  const { open, onCancel, productId } = props;
  const product = useSelector((state) => state.product);
  const { products } = product;
  let listTabs = [];
  if (open) {
    const productSelected = _.find(products, { _id: productId });
    console.log(productSelected);
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
      category,
      detailsProduct,
      description,
    } = productSelected;
    const info = {
      color,
      createdAt,
      name,
      productPictures,
      quantitySold,
      sale,
      salePrice,
      regularPrice,
      stock,
      category,
    };

    if (Object.keys(productSelected).length !== 0) {
      listTabs = [
        {
          key: '1',
          label: 'Thông tin sản phẩm',
          children: <DetailInfo info={info} />,
        },
        {
          key: '2',
          label: 'Thông số  kỹ thuật',
          children: <DigitalInfo detailsProduct={detailsProduct} />,
        },
        {
          key: '3',
          label: 'Mô tả sản phẩm',
          children: <DescriptionInfo description={description} />,
        },
      ];
    }
  }

  return (
    <Modal
      open={open}
      footer={null}
      title="Chi tiết sản phẩm"
      width={800}
      onCancel={onCancel}
    >
      <Tabs defaultActiveKey="1" size="large" items={listTabs} />
    </Modal>
  );
};

export default DetailModal;
