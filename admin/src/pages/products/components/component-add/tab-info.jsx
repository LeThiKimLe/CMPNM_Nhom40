import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Row, Col, Upload, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import categoryThunk from '../../../../features/category/category.service';

const { Option } = Select;
const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Pink',
  'Brown',
  'Gray',
  'Black',
  'White',
];

const TabInfo = (props) => {
  const { form, fileList, handleChangeUpload } = props;
  const dispatch = useDispatch();
  // * color selected
  const [categoryParent, setCategoryParent] = useState([]);

  const onSearch = (value) => {
    console.log('search:', value);
  };
  const fetchCategories = useCallback(async () => {
    const value = await dispatch(categoryThunk.getAllAPI()).unwrap();
    if (value.list.length > 0) {
      const list = value.list.filter((item) => item.level === 3);
      setCategoryParent(list);
    }
  }, [dispatch]);

  // *color input
  useEffect(() => {
    fetchCategories();
  }, [dispatch, fetchCategories]);
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
            {categoryParent &&
              categoryParent.length > 0 &&
              categoryParent.map((category) => {
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
            {colors.map((color, index) => {
              return (
                <Option key={index} value={color}>
                  {color}
                </Option>
              );
            })}
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
