import { Row, Col, Collapse, Form, Input, Cascader, Typography } from "antd";
import React from "react";
const { Panel } = Collapse;
const { SHOW_CHILD } = Cascader;
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
      label: "Quyền",
      value: "quyền",
      children: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      label: "Trạng thái",
      value: "trạng thái",
      children: [
        {
          label: "Hoạt động",
          value: "hoạt động",
        },
        {
          label: "Chưa hoạt động",
          value: "chưa hoạt động",
        },
      ],
    },
  ];

  return (
    <Collapse
      expandIconPosition="end"
      style={{ marginBottom: "10px" }}
      bordered={false}
    >
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
                //className="username"
                label="Tên, email, số điện thoại: "
                style={{ fontWeight: "" }}
                name="name"
              >
                {" "}
                <Input />
              </Form.Item>
            </Form>
          </Col>

          <Col span={12}>
            <p
              style={{
                marginBottom: "8px",
              }}
            >
              Bộ lọc
            </p>
            <Cascader
              bordered="false"
              size="large"
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1px solid #1111",
              }}
              dropdownMenuColumnStyle={{
                borderRadius: "10px",
                border: "1px solid #1111",
              }}
              options={options}
              onChange={onChange}
              multiple
              maxTagCount="responsive"
              placeholder="Vui lòng chọn bộ lọc"
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default MenuSearch;
