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
    const {
      color,
      createdAt,
      name,
      productPictures,
      quantitySold,
      sale,
      salePrice,
      regularPrice,
      attribute,
      category_path,
      stock,
      detailsProduct,
      description,
    } = productSelected;
    console.log('product selected', productSelected);
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
      category_path,
    };

    if (Object.keys(productSelected).length !== 0) {
      listTabs = [
        {
          key: '1',
          label: 'Information',
          children: <DetailInfo info={info} />,
        },
        {
          key: '2',
          label: 'Digital',
          children: (
            <DigitalInfo
              detailsProduct={detailsProduct}
              attribute={attribute}
            />
          ),
        },
        {
          key: '3',
          label: 'Description',
          children: <DescriptionInfo description={description} />,
        },
      ];
    }
  }

  return (
    <Modal
      open={open}
      footer={null}
      title="Detail product"
      width={800}
      onCancel={onCancel}
    >
      <Tabs defaultActiveKey="1" size="large" items={listTabs} />
    </Modal>
  );
};

export default DetailModal;
