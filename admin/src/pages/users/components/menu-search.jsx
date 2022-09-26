import { Row, Col, Collapse, Form, Input, Cascader, Typography } from 'antd';
import React from 'react';
const { Panel } = Collapse;
const { SHOW_CHILD } = Cascader;
const { Title } = Typography;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const MenuSearch = () => {
  const onChange = (value) => {
    console.log(value);
  };
  const options = [
    {
      label: 'Light',
      value: 'light',
    },
  ];
  return (
    <Collapse expandIconPosition="end" style={{ border: '1px solid #ccc', marginBottom: '10px' }}>
      <Panel header="Thông tin tìm kiếm">
        <Row gutter={[24, 8]}>
          <Col span={6}>
            <Form
              layout="vertical"
              className="row-col"
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item className="username" label="Tên, email, số điện thoại: " style={{ fontWeight: '' }} name="name">
                {' '}
                <Input />
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Title level={5}>Bộ lọc</Title>
            <Cascader options={options} onChange={onChange} multiple maxTagCount="responsive" showCheckedStrategy={SHOW_CHILD} />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default MenuSearch;
