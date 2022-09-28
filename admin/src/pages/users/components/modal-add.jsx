import { Modal, Form, Button, Upload, Input, Spin, Row, Col, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const AddUserModal = (props) => {
  const { visible, onCancel, beforeUpload, form, onFinish, loading, handleCancel } = props;
  const [value, setValue] = useState('admin');
  const onChange = ({ target: { value } }) => {
    console.log('radio1 checked', value);
    setValue(value);
  };
  const options = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Shipper',
      value: 'shipper',
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
      <Modal bodyStyle={{ marginLeft: '30px', marginRight: '30px' }} width={600} footer={null} visible={visible} title="Create New User" onCancel={onCancel}>
        <Form form={form} onFinish={onFinish} layout="vertical" className="row-col" autoComplete="off">
          <Row gutter={[16, 8]}>
            <Col span={12}>
              {' '}
              <Form.Item
                className="username"
                label="Tên"
                style={{ fontWeight: '600' }}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input first name!',
                  },
                ]}
                hasFeedback
              >
                <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="username"
                label="Họ"
                style={{ fontWeight: '600' }}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input last name!',
                  },
                ]}
                hasFeedback
              >
                <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Họ" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            className="username"
            label="Email"
            style={{ fontWeight: '600' }}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
            hasFeedback
          >
            <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Số điện thoại"
            style={{ fontWeight: '600' }}
            name="contactNumber"
            rules={[
              {
                required: true,
                message: 'Please input contact number!',
              },
            ]}
            hasFeedback
          >
            <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item className="username" label="Quyền" name="roles" style={{ fontWeight: '600' }} hasFeedback>
            <Radio.Group onChange={onChange} defaultValue="admin" options={options} optionType="button" />
          </Form.Item>
          <Form.Item className="username" label="Avatar" style={{ fontWeight: '600' }} name="image">
            <Upload accept=".png, .jpeg, .jpg" beforeUpload={beforeUpload}>
              <Button style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} icon={<UploadOutlined />}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            className="username"
            label="Mật khẩu"
            name="password"
            style={{ fontWeight: '600' }}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
              {
                min: 6,
                message: 'Mật khẩu phải ít nhất 6 ký tự',
              },
            ]}
            hasFeedback
          >
            <Input.Password style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            className="username"
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            style={{ fontWeight: '600' }}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu không khớp!');
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Nhập lại mật khẩu" />
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button htmlType="submit" style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#40E0D0', color: 'white', width: '30%', marginRight: '10px' }}>
              Create
            </Button>
            <Button onClick={handleCancel} style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#FF6347', color: 'white', width: '30%' }}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserModal;
