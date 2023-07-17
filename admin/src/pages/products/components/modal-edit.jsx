import React, { useMemo } from 'react';
import { Modal, Tabs, Button, Spin, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import DetailInfo from './component-edit/detail-info';
import DigitalInfo from './component-edit/digital-info';
import DescriptionTab from './component-edit/description';
import _ from 'lodash';
const ModalEdit = ({
  open,
  onCancel,
  formInfo,
  formDigital,
  productId,
  handleEditProduct,
  loading,
}) => {
  const { products } = useSelector((state) => state.product);

  const listTabs = useMemo(() => {
    if (!open) return [];

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

    if (Object.keys(productSelected).length === 0) return [];

    return [
      {
        key: '1',
        label: 'Thông tin sản phẩm',
        children: <DetailInfo info={info} form={formInfo} />,
      },
      {
        key: '2',
        label: 'Thông số kỹ thuật',
        children: (
          <DigitalInfo detailsProduct={detailsProduct} form={formDigital} />
        ),
      },
      {
        key: '3',
        label: 'Mô tả sản phẩm',
        children: <DescriptionTab description={description} />,
      },
    ];
  }, [open, products, productId, formInfo, formDigital]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title="Chỉnh sửa sản phẩm"
      width={800}
    >
      <Tabs defaultActiveKey="1" size="large" items={listTabs} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        {loading && <Spin />}
      </div>

      <Row align="center" justify="center">
        <Col>
          <Button
            onClick={handleEditProduct}
            style={{
              width: '200px',
              marginRight: '20px',
              backgroundColor: '#2ad3ff',
              color: '#ffffff',
              border: 'none', // loại bỏ đường viền
              borderRadius: '4px', // bo tròn góc
              fontSize: '16px', // tăng kích thước chữ
              fontWeight: 'bold', // in đậm chữ
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', // thêm hiệu ứng bóng đổ
            }}
          >
            Thêm
          </Button>
          <Button
            onClick={onCancel}
            style={{
              width: '200px',
              backgroundColor: '#e06666',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            Hủy
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalEdit;
