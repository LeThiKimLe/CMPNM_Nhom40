import React from 'react';
import { Form, Input, Row, Col, InputNumber, Upload, Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const DetailInfo = (props) => {
  const { form } = props;
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Form.Item
          style={{ fontWeight: '600' }}
          className="username"
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Tên sản phẩm"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Giá gốc (đ)"
          style={{ fontWeight: '600' }}
          name="regularPrice"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá sản phẩm!',
            },
          ]}
        >
          <Input
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              width: '100%',
              height: '40px',
            }}
            size="large"
            placeholder="Giá gốc"
          />
        </Form.Item>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            {' '}
            <Form.Item
              className="username"
              label="Phần trăm giảm giá (%)"
              style={{ fontWeight: '600' }}
              name="sale"
            >
              <Row>
                <Col span={12}>
                  <InputNumber
                    min={0}
                    max={50}
                    style={{
                      borderRadius: '10px',
                    }}
                    size="middle"
                    step={1}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Giá đã giảm (đ)"
          style={{ fontWeight: '600' }}
          name="salePrice"
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Thương hiệu"
          style={{ fontWeight: '600' }}
          name="category"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thương hiệu!',
            },
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col span={16}>
              {' '}
              <Input
                type="text"
                style={{
                  border: '1px solid #C0C0C0',
                  borderRadius: '10px',
                }}
                placeholder="Thương hiệu"
              />
            </Col>
            <Col span={8}>
              <Button style={{ backgroundColor: '#6fa8dc', color: '#fff' }}>
                Chỉnh sửa
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          className="username"
          label="Màu sắc"
          style={{ fontWeight: '600' }}
          name="color"
        >
          <Row gutter={[16, 16]}>
            <Col span={16}>
              {' '}
              <Button
                style={{
                  backgroundColor: '#111',
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                }}
              >
                tiep
              </Button>
            </Col>
            <Col span={8}>
              {' '}
              <Button
                style={{
                  backgroundColor: '#6fa8dc',
                  color: '#fff',
                  fontSize: '12px',
                }}
              >
                Chỉnh sửa
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            {' '}
            <Form.Item
              className="username"
              label="Số lượng trong kho"
              style={{ fontWeight: '600' }}
              name="stock"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền số lượng sản phẩm trong kho!',
                },
              ]}
            >
              <Row>
                <Col span={12}>
                  <Input
                    type="number"
                    style={{
                      border: '1px solid #C0C0C0',
                      borderRadius: '10px',
                    }}
                    placeholder="Số lượng sản phẩm"
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Hình ảnh"
          style={{ fontWeight: '600' }}
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

export default DetailInfo;
