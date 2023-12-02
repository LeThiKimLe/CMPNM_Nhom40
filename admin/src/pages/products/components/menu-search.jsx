import { Row, Col, Collapse, Form, Input, Cascader } from 'antd';
import React from 'react';
const { Panel } = Collapse;

const MenuSearch = () => {
  const onChange = (value) => {
    console.log(value);
  };
  const options = [
    {
      label: 'Màu sắc',
      value: 'Màu sắc',
      children: [
        {
          label: 'Trắng',
          value: 'Trắng',
        },
        {
          label: 'Đen',
          value: 'Đen',
        },
      ],
    },
    {
      label: 'Trạng thái',
      value: 'status',
      children: [
        {
          label: 'Kích hoạt',
          value: 'active',
        },
        {
          label: 'Chưa kích hoạt',
          value: 'unactive',
        },
      ],
    },
  ];

  return (
    <Collapse expandIconPosition="end" bordered={false}>
      <Panel header="Thông tin tìm kiếm">
        <Row gutter={[24, 8]}>
          <Col span={12}>
            <Form
              layout="vertical"
              className="row-col"
              autoComplete="off"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                className="username"
                label="Tên, thương hiệu:"
                style={{ fontWeight: '' }}
                name="name"
              >
                {' '}
                <Input />
              </Form.Item>
            </Form>
          </Col>

          <Col span={12}>
            <p
              style={{
                marginBottom: '8px',
              }}
            >
              Bộ lọc
            </p>
            <Cascader
              bordered="false"
              size="large"
              style={{
                width: '100%',
              }}
              options={options}
              onChange={onChange}
              multiple
              maxTagCount="responsive"
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default MenuSearch;
