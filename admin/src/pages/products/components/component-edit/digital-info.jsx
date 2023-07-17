import React from 'react';
import { Form, Input } from 'antd';

import { Select } from 'antd';

const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const mobileOS = [
  {
    key: '1',
    value: 'iOS',
    name: 'iOS',
  },
  {
    key: '2',
    value: 'Android',
    name: 'Android',
  },
];
const ramList = [
  {
    key: '1',
    value: '2GB',
    amount: '2GB',
  },
  {
    key: '2',
    value: '3GB',
    amount: '3GB',
  },
  {
    key: '3',
    value: '4GB',
    amount: '4GB',
  },
  {
    key: '4',
    value: '6GB',
    amount: '6GB',
  },
  {
    key: '5',
    value: '8GB',
    amount: '8GB',
  },
  {
    key: '6',
    value: '12GB',
    amount: '12GB',
  },
];
const storageList = [
  {
    key: '1',
    value: '32GB',
    amount: '32GB',
  },
  {
    key: '2',
    value: '64GB',
    amount: '64GB',
  },
  {
    key: '3',
    value: '128GB',
    amount: '128GB',
  },
  {
    key: '4',
    value: '256GB',
    amount: '256GB',
  },
  {
    key: '5',
    value: '512GB',
    amount: '512GB',
  },
  {
    key: '6',
    value: '1TB',
    amount: '1TB',
  },
];
const inputStyle = {
  border: '1px solid #C0C0C0',
  borderRadius: '10px',
  fontWeight: '600',
  color: '#111',
  fontSize: '14px',
};
const DigitalInfo = (props) => {
  const { detailsProduct, form } = props;

  const initialValues = detailsProduct;
  return (
    <>
      <Form
        form={form}
        className="row-col"
        autoComplete="off"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={initialValues}
      >
        <Form.Item
          className="username"
          label="Màn hình"
          style={{ fontWeight: '500' }}
          name="screen"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số màn hình!',
            },
          ]}
        >
          <Input
            style={inputStyle}
            placeholder="Thông số màn hình"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Hệ điều hành"
          style={{ fontWeight: '500' }}
          name="OS"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền hệ điều hành!',
            },
          ]}
        >
          <Select
            placeholder="Chọn hệ điều hành"
            size="large"
            style={inputStyle}
            onChange={handleChange}
          >
            {mobileOS.map((mobileOS) => {
              return (
                <Option key={mobileOS.key} value={mobileOS.value}>
                  {mobileOS.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Camera sau"
          style={{ fontWeight: '500' }}
          name="backCamera"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số camera sau!',
            },
          ]}
        >
          <Input
            style={inputStyle}
            placeholder="Thông số camera sau"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Camera trước"
          style={{ fontWeight: '500' }}
          name="frontCamera"
        >
          <Input
            style={inputStyle}
            placeholder="Thông số camera trước"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Chip"
          style={{ fontWeight: '500' }}
          name="cpu"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số chip!',
            },
          ]}
        >
          <Input style={inputStyle} placeholder="Thông số chip" size="large" />
        </Form.Item>
        <Form.Item
          className="username"
          label="RAM"
          style={{ fontWeight: '500' }}
          name="ram"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số RAM!',
            },
          ]}
        >
          <Select placeholder="Chọn dung lượng RAM" size="large">
            {ramList.map((ram) => {
              return (
                <Option
                  key={ram.key}
                  value={ram.value}
                  style={{ fontSize: '14px' }}
                >
                  {ram.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Dung lượng lưu trữ"
          style={{ fontWeight: '500' }}
          name="storage"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền dung lượng lưu trữ!',
            },
          ]}
        >
          <Select
            placeholder="Chọn dung lượng lưu trữ"
            size="large"
            style={inputStyle}
          >
            {storageList.map((storage) => {
              return (
                <Option
                  key={storage.key}
                  value={storage.value}
                  style={{ fontSize: '14px' }}
                >
                  {storage.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Sim"
          style={{ fontWeight: '500' }}
          name="sim"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số sim!',
            },
          ]}
        >
          <Input style={inputStyle} placeholder="Thông số sim" size="large" />
        </Form.Item>
        <Form.Item
          className="username"
          label="Pin & Sạc"
          style={{ fontWeight: '500' }}
          name="batteryPowerAndCharger"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số Pin & Sạc!',
            },
          ]}
        >
          <Input
            style={inputStyle}
            placeholder="Thông số Pin & Sạc"
            size="large"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default DigitalInfo;
