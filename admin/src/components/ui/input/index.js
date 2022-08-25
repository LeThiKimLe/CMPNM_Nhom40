import React from 'react';
import { Form, Input } from 'antd';
function InputRefactor({ className, label, name, required, message }) {
  return (
    <>
      <Form.Item
        className={className}
        label={label}
        rules={[
          {
            required: required,
            message: message,
          },
        ]}
      >
        <Input placeholder={label} />
      </Form.Item>
    </>
  );
}

export default InputRefactor;
