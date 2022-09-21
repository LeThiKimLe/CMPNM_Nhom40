import { Modal, Form, Button, Upload, Input, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

const AddCategoryModal = (props) => {
  const { visible, title, onFinish, loading, onCancel, form } = props;
  // form.submit

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal footer={null} visible={visible} title={title} onCancel={onCancel}>
        <Form form={form} layout="vertical" className="row-col" autoComplete="off" onFinish={onFinish}>
          <Form.Item
            className="username"
            label="Name"
            style={{ fontWeight: '600' }}
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input name category!',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Image"
            style={{ fontWeight: '600' }}
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input image category!',
              },
            ]}
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              accept=".png, .jpeg, .jpg"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loading ? <Spin /> : null}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
