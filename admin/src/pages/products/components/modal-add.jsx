import { Modal, Tabs, Button, Spin, Row, Col } from 'antd';

import React from 'react';
import TabDescription from './tab-description';
import TabDigital from './tab-digital';
import TabInfo from './tab-info';

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
        <Tabs defaultActiveKey="1" size="large">
          <Tabs.TabPane tab="Thông tin sản phẩm" key="1">
            <TabInfo
              form={formTabInfo}
              setColorSubmit={setColorSubmit}
              colorSubmit={colorSubmit}
              handleChangeUpload={handleChangeUpload}
              fileList={fileList}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông số kỹ thuật" key="2">
            <TabDigital form={formTabDigital} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Mô tả sản phẩm" key="3">
            <TabDescription
              setDescription={setDescription}
              description={description}
            />
          </Tabs.TabPane>
        </Tabs>
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
