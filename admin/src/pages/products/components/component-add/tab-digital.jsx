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
          name="attribute"
          size="large"
          className="custom-selector"
          rules={[
            {
              required: true,
              message: 'Please enter attribute!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="attribute"
            optionFilterProp="children"
            size="large"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          ></Select>
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
