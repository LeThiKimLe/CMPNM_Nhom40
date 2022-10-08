import { Modal, Tabs, Form, Select, Input, Button } from 'antd';

import React, { useState, useEffect } from 'react';
import TabDescription from './tab-description';
import TabDigital from './tab-digital';
import TabInfo from './tab-info';

const AddProductModal = (props) => {
  const { handleCancel } = props;
  // *tab mô tả
  const [description, setDescription] = useState('');

  const [colorSubmit, setColorSubmit] = useState('');
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const { visible, onCancel } = props;
  const handleAddProduct = () => {
    formTabInfo
      .validateFields()
      .then((values) => {
        console.log(colorSubmit);
      })
      .catch((errorInfo) => {
        console.log(colorSubmit);
        console.log(errorInfo);
      });
  };
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
        visible={visible}
        title="Thêm sản phẩm mới"
        onCancel={onCancel}
      >
        <Tabs defaultActiveKey="1" size="large">
          <Tabs.TabPane tab="Thông tin sản phẩm" key="1">
            <TabInfo
              form={formTabInfo}
              setColorSubmit={setColorSubmit}
              colorSubmit={colorSubmit}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông số kỹ thuật" key="2">
            <TabDigital form={formTabDigital} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Mô tả sản phẩm" key="3">
            <TabDescription />
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
          <Button
            size="small"
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#40E0D0',
              color: 'white',
              width: '20%',
              marginRight: '10px',
            }}
            onClick={handleAddProduct}
          >
            Thêm
          </Button>
          <Button
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#FF6347',
              color: 'white',
              width: '20%',
            }}
            size="small"
            onClick={handleCancel}
          >
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddProductModal;
