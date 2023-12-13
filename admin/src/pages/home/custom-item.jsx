// CustomItem.js
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const CustomItem = ({ data }) => {
  return (
    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
      <Card bordered={false} className="criclebox ">
        <div className="number">
          <Row align="middle" gutter={[24, 0]}>
            <Col xs={18}>
              <span>{data.today}</span>
              <Title style={{ fontSize: '20px', fontWeight: '700' }}>
                {data.title} <small className={data.bnb}>{data.persent}</small>
              </Title>
            </Col>
            <Col xs={6}>
              <div
                className="icon-box"
                style={{
                  backgroundColor: '#46bcaa',
                }}
              >
                {data.icon}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
};

export default CustomItem;
