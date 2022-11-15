import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import { formatThousand } from '../../utils';
import { Button, Row, Col, Typography, Table, Spin } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const EditOrder = () => {
  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Typography.Title level={3}>Chi tiết đơn hàng</Typography.Title>
        </Col>
      </Row>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '14px',
        }}
      >
        <Col xs="12">
          <Row gutter={[8, 0]}>
            <Col>
              <Typography.Text style={{ fontSize: '14px', color: '#7d879c' }}>
                Mã đơn hàng:
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text style={{ fontSize: '14px', color: '#2b3445' }}>
                6372365636234761874921bf
              </Typography.Text>
            </Col>
            <Col style={{ marginLeft: '20px' }}>
              <Typography.Text style={{ fontSize: '14px', color: '#7d879c' }}>
                Ngày đặt hàng:
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text style={{ fontSize: '14px', color: '#2b3445' }}>
                {new Date('2022-11-14T12:36:38.038Z').toLocaleDateString()}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col xs="12"></Col>
      </div>
    </div>
  );
};

export default EditOrder;
