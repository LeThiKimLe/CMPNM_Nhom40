import {
  Modal,
  Form,
  Button,
  Upload,
  Input,
  Spin,
  Row,
  Col,
  Radio,
  Typography,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
      label: 'Quảng trị viên',
      value: 'admin',
    },
    {
      label: 'Người dùng',
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
        title="Chi tiết người dùng"
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
                <Input
                  style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                  placeholder="Tên"
                />
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
                <Input
                  style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                  placeholder="Họ"
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
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
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
            <Input
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Quyền"
            name="roles"
            style={{ fontWeight: '600' }}
            hasFeedback
          >
            <Radio.Group
              onChange={onChange}
              defaultValue="admin"
              options={options}
              optionType="button"
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Ngày tạo"
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
