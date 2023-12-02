import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

import { Select } from 'antd';

const { Option } = Select;
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
const rams = [
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
const storages = [
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
const TabDigital = (props) => {
  const { form } = props;
  return (
    <>
      <Form form={form}>
        <Form.Item
          className="input-product"
          name="screen"
          size="large"
          rules={[
            {
              required: true,
              message: 'Please enter screen!',
            },
          ]}
        >
          <Input placeholder="screen" />
        </Form.Item>

        <Form.Item
          className="input-product"
          name="backCamera"
          size="large"
          rules={[
            {
              required: true,
              message: 'Please enter back camera!',
            },
          ]}
        >
          <Input placeholder="back camera" size="large" />
        </Form.Item>
        <Form.Item className="input-product" name="frontCamera">
          <Input placeholder="front camera" size="large" />
        </Form.Item>
        <Form.Item
          className="input-product"
          name="cpu"
          rules={[
            {
              required: true,
              message: 'Please enter chip!',
            },
          ]}
        >
          <Input placeholder="chip" size="large" />
        </Form.Item>
        <Form.Item
          name="os"
          size="large"
          className="custom-selector"
          rules={[
            {
              required: true,
              message: 'Please enter os!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="os"
            optionFilterProp="children"
            size="large"
            className="custom-selection"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {' '}
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
          name="ram"
          size="large"
          className="custom-selector"
          rules={[
            {
              required: true,
              message: 'Please enter ram!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="ram"
            optionFilterProp="children"
            size="large"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {rams.map((ram) => {
              return (
                <Option key={ram.key} value={ram.value}>
                  {ram.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="storage"
          size="large"
          className="custom-selector"
          rules={[
            {
              required: true,
              message: 'Please enter storage!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="storage"
            optionFilterProp="children"
            size="large"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {storages.map((storage) => {
              return (
                <Option key={storage.key} value={storage.value}>
                  {storage.amount}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          className="input-product"
          name="sim"
          rules={[
            {
              required: true,
              message: 'Please enter sim!',
            },
          ]}
        >
          <Input placeholder="sim" size="large" />
        </Form.Item>
        <Form.Item
          className="input-product"
          name="batteryPowerAndCharger"
          rules={[
            {
              required: true,
              message: 'Please enter battery power and charger!',
            },
          ]}
        >
          <Input placeholder="battery power and charger" size="large" />
        </Form.Item>
      </Form>
    </>
  );
};

export default TabDigital;
