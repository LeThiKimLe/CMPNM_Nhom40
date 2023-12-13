import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import productThunk from '../../features/product/product.service';
import './style.css';

import {
  Row,
  Col,
  Typography,
  Spin,
  Steps,
  Select,
  Button,
  notification,
  Divider,
} from 'antd';

import { useLocation } from 'react-router-dom';
import OrderDetailItem from './order-detail-item';
import { formatThousand } from '../../utils';
import { customOrderStatusList } from '../../utils/custom-order';
const { Step } = Steps;
const { Title } = Typography;

const orderStatusList = [
  {
    key: 'pending',
    value: 'Waiting for confirmation',
    color: '#eeeeee',
  },
  {
    key: 'packed',
    value: 'Packaged',
    color: '#6fa8dc',
  },
  {
    key: 'shipping',
    value: 'Delivery',
    color: '#ffe599',
  },
  {
    key: 'delivered',
    value: 'Delivered',
    color: '#b6d7a8',
  },
  {
    key: 'cancelled',
    value: 'Canceled',
    color: '#ea9999',
  },
  {
    key: 'refund',
    value: 'Return',
    color: '#b4a7d6',
  },
];
const checkOrderStatus = (orderStatus) => {
  const status = orderStatus[orderStatus.length - 1].type;
  return (
    status === 'delivered' || status === 'cancelled' || status === 'refund'
  );
};
const getOrder = (listOrder, orderId) => {
  let order = {};
  listOrder.map((item) => {
    if (item._id === orderId) {
      order = item;
    }
  });
  return order;
};
const renderOrderStatus = (orderStatus, orderStatusList) => {
  let customStatus = {};
  orderStatusList.map((item) => {
    if (item.key === orderStatus.type) {
      customStatus = {
        title: item.value,
        description: new Date(orderStatus.date).toLocaleString(),
        color: item.color,
      };
    }
  });
  return customStatus;
};
const getTotalPrice = (items) => {
  let totalPrice = 0;
  items.map((item, index) => {
    const { price, purchasedQty } = item;
    const priceItem = price * purchasedQty;
    totalPrice = totalPrice + priceItem;
  });
  return totalPrice;
};
const EditOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderId = location.pathname.split('/')[3];
  const order = useSelector((state) => state.order);
  const orderSelect = getOrder(order.orderList, orderId);
  const [orderSelected, setOrderSelected] = useState(orderSelect);
  // *list status option
  const [listStatus, setListStatus] = useState([]);
  const [orderStatusSelected, setOrderStatusSelected] = useState(0);
  const handleChangeSelectStatus = (value) => {
    setOrderStatusSelected(value);
  };
  const handleUpdateStatus = () => {
    dispatch(
      orderThunk.updateOrderStatus({ orderId, status: orderStatusSelected })
    )
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Update order status successfully!',
          placement: 'top',
        });
        dispatch(orderThunk.getOrder(orderId))
          .unwrap()
          .then(async (value) => {
            setListStatus(customOrderStatusList(value.order.orderStatus));
            setOrderSelected(value.order);
            const delivered = value.order.orderStatus.some(
              (status) => status.type === 'delivered'
            );
            console.log(delivered);
            if (delivered) {
              await dispatch(productThunk.getAllAPI());
            }
          });
      });
  };
  useEffect(() => {
    dispatch(orderThunk.getOrder(orderId))
      .unwrap()
      .then((value) => {
        console.log(value.order);
        setListStatus(customOrderStatusList(value.order.orderStatus));
        setOrderSelected(value.order);
      });
  }, [dispatch, orderId]);

  return (
    <div className="tabled">
      {order.loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px',
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '20px',
            }}
          >
            <Col span={24}>
              <Title level={3}>Order detail</Title>
              <Row gutter={[8, 0]}>
                <Col>
                  <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                  >
                    Code orders:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text
                      style={{ fontSize: '14px', color: '#2b3445' }}
                  >
                    {orderId}
                  </Typography.Text>
                </Col>
                <Col style={{ marginLeft: '20px' }}>
                  <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                  >
                    Order date:
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text
                      style={{ fontSize: '14px', color: '#2b3445' }}
                  >
                    {orderSelected.orderStatus
                        ? new Date(
                            orderSelected.orderStatus[0].date
                        ).toLocaleDateString()
                        : null}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                gutter={[8, 0]}
                align="start"
                justify="start"
                style={{ marginTop: '20px' }}
              >
                <Col>
                  <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                  >
                    Order status:
                  </Typography.Text>
                </Col>
                <Col gutter={[8, 0]}>
                  <Typography.Text style={{ fontSize: '14px', color: 'black' }}>
                    {orderSelected.paymentStatus === 'completed'
                        ? 'Paid'
                        : 'Unpaid'}
                  </Typography.Text>
                </Col>
              </Row>
              <Row
                gutter={[8, 0]}
                align="start"
                justify="start"
                style={{ marginTop: '20px' }}
              >
                <Col>
                  <Typography.Text
                    style={{ fontSize: '14px', color: '#7d879c' }}
                  >
                    Trạng thái đơn hàng:
                  </Typography.Text>
                </Col>
                <Col gutter={[8, 0]}>
                  <Steps
                    direction="horizontal"
                    current={
                      orderSelected.orderStatus
                        ? orderSelected.orderStatus.length - 1
                        : 0
                    }
                    style={{ marginLeft: '60px', width: '100%' }}
                  >
                    {orderSelected.orderStatus
                      ? orderSelected.orderStatus.map((item, index) => {
                          const customStatus = renderOrderStatus(
                            item,
                            orderStatusList
                          );
                          return (
                            <Step
                              key={index}
                              style={{ width: '200px' }}
                              title={customStatus.title}
                              description={customStatus.description}
                              status={
                                index === orderSelected.orderStatus.length - 1
                                  ? 'current'
                                  : 'wait'
                              }
                            />
                          );
                        })
                      : null}
                  </Steps>
                </Col>
              </Row>

              {orderSelected.orderStatus &&
              checkOrderStatus(orderSelected.orderStatus) ? null : (
                <Row
                  gutter={[8, 0]}
                  style={{ marginTop: '20px', marginBottom: '40px' }}
                  align="middle"
                  justify="start"
                >
                  <Col>
                    <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      Update order status:
                    </Typography.Text>
                  </Col>
                  <Col>
                    <div className="my-select-container">
                      <Select
                        size="large"
                        style={{ fontSize: '14px', minWidth: '200px' }}
                        onChange={handleChangeSelectStatus}
                        options={listStatus}
                      />
                      <Button
                        style={{
                          background: '#3d85c6',
                          marginLeft: '10px',
                          color: 'white',
                          borderRadius: '10px',
                        }}
                        onClick={handleUpdateStatus}
                      >
                        Update
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
              {orderSelected.items
                ? orderSelected.items.map((item, index) => {
                    return (
                      <Row
                        gutter={[8, 0]}
                        style={{ marginTop: '20px' }}
                        align="middle"
                        justify="start"
                        key={index}
                      >
                        <OrderDetailItem item={item} />
                      </Row>
                    );
                  })
                : null}
            </Col>
          </div>
          <Row
            span={24}
            gutter={[8, 0]}
            style={{ marginTop: '20px' }}
            align="start"
            justify="space-between"
          >
            <Col span={12}>
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '15px',
                }}
              >
                <Row>
                  <Typography.Text
                    style={{
                      fontSize: '14px',
                      color: '#7d879c',
                      marginBottom: '10px',
                    }}
                  >
                    Delivery address:
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text
                    style={{ fontSize: '14px', color: '#7d879c' }}
                    strong
                  >
                    {orderSelected.address
                      ? `${orderSelected.address.address}, ${orderSelected.address.wardName}, ${orderSelected.address.districtName}, ${orderSelected.address.provinceName}`
                      : null}
                  </Typography.Text>
                </Row>
              </div>
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '20px',
                }}
              >
                <Row>
                  <Typography.Text
                    style={{
                      fontSize: '14px',
                      color: '#7d879c',
                      marginBottom: '10px',
                    }}
                  >
                    Payment methods:
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text
                    style={{ fontSize: '14px', color: '#7d879c' }}
                    strong
                  >
                    {orderSelected.paymentType === 'paypal'
                        ? 'Payment via Paypal e-wallet'
                        : orderSelected.paymentType === 'momo'
                            ? 'Payment via Momo e-wallet'
                            : ' Payment on delivery'}
                  </Typography.Text>
                </Row>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '20px',
                }}
              >
                <Row
                  align="middle"
                  justify="space-between"
                  style={{ marginBottom: '10px' }}
                >
                  <Col>
                    <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      Total cost:
                    </Typography.Text>
                  </Col>
                  <Col>
                    {' '}
                    <Typography.Title
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      {orderSelected.items
                        ? formatThousand(getTotalPrice(orderSelected.items))
                        : 0}
                      đ
                    </Typography.Title>
                  </Col>
                </Row>
                <Row
                  align="middle"
                  justify="space-between"
                  style={{ marginBottom: '10px' }}
                >
                  <Col>
                    <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      Total shipping fee:
                    </Typography.Text>
                  </Col>
                  <Col>
                    {' '}
                    <Typography.Title
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      {orderSelected.shipAmount
                        ? formatThousand(orderSelected.shipAmount)
                        : 0}
                      đ
                    </Typography.Title>
                  </Col>
                </Row>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      Total shipping fee reduction:
                    </Typography.Text>
                  </Col>
                  <Col>
                    {' '}
                    <Typography.Title
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      {orderSelected.freeShip
                        ? formatThousand(orderSelected.freeShip)
                        : 0}
                      đ
                    </Typography.Title>
                  </Col>
                </Row>
                <Divider />
                <Row
                  align="middle"
                  justify="space-between"
                  style={{ marginBottom: '10px' }}
                >
                  <Col>
                    <Typography.Text
                      style={{ fontSize: '14px', color: '#7d879c' }}
                      strong
                    >
                      Total:
                    </Typography.Text>
                  </Col>
                  <Col>
                    {' '}
                    <Typography.Title
                      style={{ fontSize: '14px', color: '#7d879c' }}
                    >
                      {orderSelected.totalAmount
                        ? formatThousand(orderSelected.totalAmount)
                        : 0}
                      đ
                    </Typography.Title>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default EditOrder;
