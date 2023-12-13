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
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const AddUserModal = (props) => {
  const {
    visible,
    onCancel,
    beforeUpload,
    form,
    onFinish,
    loading,
    handleCancel,
    fileList,
    handleChangeUpload,
  } = props;
  const [value, setValue] = useState('admin');
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
        title="Add new user"
        onCancel={onCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
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
            label="Avatar"
            style={{ fontWeight: '600' }}
            name="image"
          >
            <Upload
              accept=".png, .jpeg, .jpg"
              beforeUpload={beforeUpload}
              fileList={fileList}
              onChange={handleChangeUpload}
            >
              <Button
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                icon={<UploadOutlined />}
              >
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            className="username"
            label="Password"
            name="password"
            style={{ fontWeight: '600' }}
            rules={[
              {
                required: true,
                message: 'Please enter password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Confirm password"
            name="confirmPassword"
            style={{ fontWeight: '600' }}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please re-enter your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Password incorrect!');
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              placeholder="Confirm password"
            />
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
            <Button
              htmlType="submit"
              className={'add-button'}
            >
              Create
            </Button>
            <Button
              onClick={handleCancel}
                className={"delete-button"}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserModal;
