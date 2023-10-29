import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Upload,
  Select,
  notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import categoryThunk from '../../../../features/category/category.service';

const { Option } = Select;

const TabInfo = (props) => {
  const { form, fileList, handleChangeUpload } = props;
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const color = useSelector((state) => state.color);
  // * color selected

  const onSearch = (value) => {
    console.log('search:', value);
  };

  // *color input
  useEffect(() => {
    if (category.categories.length === 0) {
      dispatch(categoryThunk.getAllAPI());
    }
  }, [category.categories, dispatch]);
  return (
    <>
      <Form form={form}>
        <Form.Item
          name="name"
          className="input-product"
          rules={[
            {
              required: true,
              message: 'Please enter the product name!',
            },
          ]}
        >
          <Input placeholder="product name" />
        </Form.Item>
        <Form.Item
          name="regularPrice"
          className="input-product"
          rules={[
            {
              required: true,
              message: 'Please enter the regular price!',
            },
          ]}
        >
          <Input placeholder="regular price" />
        </Form.Item>

        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Form.Item name="sale" className="input-product">
              <Row>
                <Col span={12}>
                  <Input type="number" placeholder="sale percent" />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="salePrice" className="input-product">
          <Input placeholder="sale price" />
        </Form.Item>
        <Form.Item
          name="category"
          size="large"
          className="custom-selector"
          rules={[
            {
              required: true,
              message: 'Please enter category!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="category"
            optionFilterProp="children"
            size="large"
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {category.categories.map((category) => {
              return (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* color */}
        <Form.Item name="color" className="custom-selector">
          <Select placeholder="color" size="large">
            {' '}
          </Select>
        </Form.Item>
        <Form.Item
          name="stock"
          className="input-product"
          size="large"
          rules={[
            {
              required: true,
              message: 'Please enter stock!',
            },
          ]}
        >
          <Input type="number" placeholder="stock" />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input image category!',
            },
          ]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept=".png, .jpeg, .jpg"
            fileList={fileList}
            onChange={handleChangeUpload}
            multiple={true}
            listType="picture-card"
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default TabInfo;
