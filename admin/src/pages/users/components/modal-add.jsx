import { Modal, Form, Button, Upload, Input, Spin, Row, Col, Typography, Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const AddUserModal = (props) => {
  const { visible, onCancel, handleChange, beforeUpload, loading, imageUrl } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
      <Modal bodyStyle={{ marginLeft: '30px', marginRight: '30px' }} width={800} footer={null} visible={visible} title="Create New User" onCancel={onCancel}>
        <Row gutter={[32, 8]}>
          <Col span={16}>
            <Form layout="vertical" className="row-col" autoComplete="off">
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  {' '}
                  <Form.Item
                    className="username"
                    label="First Name"
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
                    <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    className="username"
                    label="Last Name"
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
                    <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Last Name" />
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
                label="Contact Number"
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
                <Input style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Contact Number" />
              </Form.Item>

              <Form.Item className="username" label="Password" name="password" style={{ fontWeight: '600' }} hasFeedback>
                <Radio.Group options={options} optionType="button" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Password"
                name="Password"
                style={{ fontWeight: '600' }}
                rules={[
                  {
                    min: 6,
                    message: 'Password min required 6 character',
                  },
                ]}
                hasFeedback
              >
                <Input.Password style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Password" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Confirm Password"
                name="confirmPassword"
                style={{ fontWeight: '600' }}
                rules={[
                  {
                    min: 6,
                    message: 'Password min required 6 character',
                  },
                ]}
                hasFeedback
              >
                <Input.Password style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }} placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item></Form.Item>
            </Form>
          </Col>
          <Col
            span={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div>
              <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Profile Picture</p>
              <Upload name="avatar" accept=".png, .jpeg, .jpg" onChange={handleChange} beforeUpload={beforeUpload} listType="picture-card" className="avatar-uploader" showUploadList={false}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </Col>
        </Row>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Button htmlType="submit" style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#40E0D0', color: 'white', width: '30%', marginRight: '10px' }}>
            Create
          </Button>
          <Button style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#FF6347', color: 'white', width: '30%' }}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserModal;
