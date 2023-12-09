import { Modal, Form, Input, Row, Col, Radio, Typography } from 'antd';

import React, { useState } from 'react';

const EditUserModel = (props) => {
  const { visible, onCancel, form } = props;
  const { roles, createdAt } = form.getFieldValue();
  const [value, setValue] = useState(roles);
  const onChange = ({ target: { value } }) => {
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
        width={600}
        footer={null}
        open={visible}
        title="Edit user"
        onCancel={onCancel}
      >
        <Form
          form={form}
          layout="vertical"
          className="row-col"
          autoComplete="off"
        >
          <Row gutter={[16, 8]}>
            <Col span={12}>
              {' '}
              <Form.Item
                  className="username"
                  label="First name"
                  style={{ fontWeight: '600' }}
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter first name!',
                    },
                  ]}
                  hasFeedback
              >
                <Input
                    style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                    placeholder="First name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  className="username"
                  label="Last name"
                  style={{ fontWeight: '600' }}
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter lastname!',
                    },
                  ]}
                  hasFeedback
              >
                <Input
                    style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                    placeholder="Last name"
                />
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
                  message: 'Please enter email address!',
                },
                {
                  type: 'email',
                  message: 'Please enter the correct email address!',
                },
              ]}
              hasFeedback
          >
            <Input
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                placeholder="Email"
            />
          </Form.Item>
          <Form.Item
              className="username"
              label="Phone number"
              style={{ fontWeight: '600' }}
              name="contactNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number!',
                },
                {
                  message: 'Please enter the correct phone number!',
                  pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g),
                },
              ]}
              hasFeedback
          >
            <Input
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                placeholder="Phone number"
            />
          </Form.Item>
          <Form.Item
              className="username"
              label="Role"
              name="roles"
              style={{ fontWeight: '600' }}
              hasFeedback
          >
            <Radio.Group
                onChange={onChange}
                options={options}
                optionType="button"
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Created at"
            name="createdAt"
            style={{ fontWeight: '600' }}
            hasFeedback
          >
            <Typography.Title level={5}>
              {new Date(createdAt).toLocaleDateString()}
            </Typography.Title>
          </Form.Item>

          <Form.Item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditUserModel;
