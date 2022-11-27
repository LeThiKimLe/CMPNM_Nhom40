import React from 'react';
import { Form, Modal, Input, Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const ModalAddBanner = (props) => {
  const { open, onCancel, form, onFinish, handleCancel, loading } = props;

  return (
    <Modal
      footer={null}
      open={open}
      title="Thêm mới quảng cáo"
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        className="row-col"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          className="username"
          label="Tên quảng cáo"
          style={{ fontWeight: '600' }}
          name="nameBanner"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền tên quảng cáo!',
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="Tên quảng cáo"
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Hình ảnh"
          style={{ fontWeight: '600' }}
          name="image"
          rules={[
            {
              required: true,
              message: 'Vui lòng thêm hình ảnh!',
            },
          ]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept=".png, .jpeg, .jpg"
          >
            <Button
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              icon={<UploadOutlined />}
            >
              Click để tải ảnh
            </Button>
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
          <Button
            htmlType="submit"
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#40E0D0',
              color: 'white',
              width: '30%',
              marginRight: '10px',
            }}
          >
            Thêm mới
          </Button>

          <Button
            onClick={handleCancel}
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#FF6347',
              color: 'white',
              width: '30%',
            }}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddBanner;
