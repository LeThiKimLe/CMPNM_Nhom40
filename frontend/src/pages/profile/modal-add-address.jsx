import { Select, Modal, Form, Row, Col, Input, Button } from 'antd';
import React from 'react';

const { Option } = Select;
const ModalAddAddress = (props) => {
  const { visible, onCancel, form, handleCancel, onFinish } = props;
  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={onCancel}
      title="Địa chỉ mới"
    >
      <Form
        form={form}
        layout="vertical"
        className="row-col"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            {' '}
            <Form.Item
              className="username"
              label="Tên"
              style={{ fontWeight: '500' }}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên!',
                },
              ]}
              hasFeedback
            >
              <Input
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="username"
              label="Số điện thoại"
              style={{ fontWeight: '500' }}
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
              hasFeedback
            >
              <Input
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Tỉnh, Thành phố"
          style={{ fontWeight: '500' }}
          name="provinceName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tỉnh, thành phố!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="medium"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option size="medium" value="tiep">
              Tiep
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Quận, Huyện"
          style={{ fontWeight: '500' }}
          name="districtName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập quận, huyện!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="medium"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option size="medium" value="tiep">
              Tiep
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Xã, Phường"
          style={{ fontWeight: '500' }}
          name="wardName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xã, phường!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="medium"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option size="medium" value="tiep">
              Tiep
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Địa chỉ cụ thể"
          style={{ fontWeight: '500' }}
          name="address"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ]}
          hasFeedback
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#40E0D0',
              color: 'white',
              width: '30%',
              marginRight: '10px',
              marginTop: '20px',
            }}
          >
            Thêm mới
          </Button>

          <Button
            onClick={handleCancel}
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#FF6347',
              color: 'white',
              width: '30%',
            }}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddAddress;
