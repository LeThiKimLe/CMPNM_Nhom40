import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input, Form, Row, Col, Button } from 'antd';
import { SketchPicker } from 'react-color';

const ColorInput = (props) => {
  const { color, colorList, addButton, addButtonOpen, handleClose, handleAddSubmit } = props;
  console.log('colorList', colorList);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
          {colorList.map((color) => {
            return (
              <Button shape="circle" style={{ background: color, borderRadius: '50%', width: '40px', height: '40px' }}>
                {' '}
              </Button>
            );
          })}
        </Col>
        <Col>
          <div>
            <Button style={{ borderRadius: '50%', width: '40px', height: '40px', paddingLeft: '3px' }} icon={<PlusOutlined />} size="small" onClick={addButtonOpen}></Button>
          </div>
        </Col>
      </Row>
      {/* list color */}

      {addButton ? (
        <div style={{ border: '1px solid #C0C0C0', borderRadius: '10px', padding: '20px', marginTop: '10px' }}>
          <Form className="row-col">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                {' '}
                <Form.Item
                  label="Tên màu"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng điền tên màu!',
                    },
                  ]}
                >
                  <Input
                    style={{
                      borderRadius: '10px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="RGB" name="value">
                  <SketchPicker />
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button onClick={handleAddSubmit} size="small" style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#40E0D0', color: 'white', width: '20%', marginRight: '10px' }}>
                Thêm
              </Button>

              <Button onClick={handleClose} style={{ border: '1px solid #C0C0C0', borderRadius: '10px', background: '#FF6347', color: 'white', width: '20%' }} size="small">
                Hủy
              </Button>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default ColorInput;
