import { Modal, Tabs, Button, Spin, Row, Col } from 'antd';

import React from 'react';
import TabDescription from './component-add/tab-description';
import TabDigital from './component-add/tab-digital';
import TabInfo from './component-add/tab-info';

const AddProductModal = (props) => {
  const {
    open,
    onCancel,
    handleCancel,
    handleChangeUpload,
    handleAddProduct,
    formTabInfo,
    formTabDigital,
    setColorSubmit,
    colorSubmit,
    fileList,
    description,
    setDescription,
    loading,
  } = props;

  const listTabs = [
    {
      key: '1',
      label: 'Thông tin sản phẩm',
      children: (
        <TabInfo
          form={formTabInfo}
          setColorSubmit={setColorSubmit}
          colorSubmit={colorSubmit}
          handleChangeUpload={handleChangeUpload}
          fileList={fileList}
        />
      ),
    },
    {
      key: '2',
      label: 'Thông số kỹ thuật',
      children: <TabDigital form={formTabDigital} />,
    },
    {
      key: '3',
      label: 'Mô tả sản phẩm',
      children: (
        <TabDescription
          setDescription={setDescription}
          description={description}
        />
      ),
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal
        bodyStyle={{ marginLeft: '30px', marginRight: '30px' }}
        width={800}
        footer={null}
        open={open}
        title="Thêm sản phẩm mới"
        onCancel={onCancel}
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
          {loading ? <Spin /> : null}
        </div>

        <Row align="center" justify="center">
          <Col>
            <Button
              onClick={handleAddProduct}
              style={{
                marginRight: '20px',
                backgroundColor: '#2ad3ff',
                color: '#ffffff',
              }}
            >
              Thêm
            </Button>
            <Button
              onClick={handleCancel}
              style={{ backgroundColor: '#e06666', color: '#ffffff' }}
            >
              Hủy
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AddProductModal;
