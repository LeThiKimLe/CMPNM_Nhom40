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
    value: '1',
    name: 'iOS',
  },
  {
    key: '2',
    value: '2',
    name: 'Android',
  },
];
const ram = [
  {
    key: '1',
    value: '1',
    amount: '2GB',
  },
  {
    key: '2',
    value: '2',
    amount: '3GB',
  },
  {
    key: '3',
    value: '3',
    amount: '4GB',
  },
  {
    key: '4',
    value: '4',
    amount: '6GB',
  },
  {
    key: '5',
    value: '5',
    amount: '8GB',
  },
  {
    key: '6',
    value: '6',
    amount: '12GB',
  },
];
const storage = [
  {
    key: '1',
    value: '1',
    amount: '32GB',
  },
  {
    key: '2',
    value: '2',
    amount: '64GB',
  },
  {
    key: '3',
    value: '3',
    amount: '128GB',
  },
  {
    key: '4',
    value: '4',
    amount: '256GB',
  },
  {
    key: '5',
    value: '5',
    amount: '512GB',
  },
  {
    key: '6',
    value: '6',
    amount: '1TB',
  },
];

const TabDigital = (props) => {
  const { form } = props;
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
      >
        <Form.Item
          className="username"
          label="Màn hình"
          style={{ fontWeight: '600' }}
          name="screen"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số màn hình!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số màn hình"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Hệ điều hành"
          style={{ fontWeight: '600' }}
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
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
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
          style={{ fontWeight: '600' }}
          name="backCamera"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số camera sau!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số camera sau"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Camera trước"
          style={{ fontWeight: '600' }}
          name="frontCamera"
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số camera trước"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Chip"
          style={{ fontWeight: '600' }}
          name="cpu"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số chip!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số chip"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="RAM"
          style={{ fontWeight: '600' }}
          name="ram"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số RAM!',
            },
          ]}
        >
          <Select
            placeholder="Chọn dung lượng RAM"
            size="large"
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            onChange={handleChange}
          >
            {ram.map((ram) => {
              return (
                <Option key={ram.key} value={ram.value}>
                  {ram.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Dung lượng lưu trữ"
          style={{ fontWeight: '600' }}
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
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            onChange={handleChange}
          >
            {storage.map((storage) => {
              return (
                <Option key={storage.key} value={storage.value}>
                  {storage.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Sim"
          style={{ fontWeight: '600' }}
          name="sim"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số sim!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số sim"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Pin & Sạc"
          style={{ fontWeight: '600' }}
          name="batteryPowerAndCharger"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền thông số Pin & Sạc!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số Pin & Sạc"
            size="large"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default TabDigital;
