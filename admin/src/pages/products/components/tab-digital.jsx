import React from 'react';
import { Form, Input } from 'antd';

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
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Hệ điều hành"
          />
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
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Thông số RAM"
          />
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
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Dung lượng lưu trữ"
          />
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
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default TabDigital;
