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

const orderStatusList = [
  {
    key: 'pending',
    value: 'Chờ xác nhận',
    color: '#eeeeee',
  },
  {
    key: 'packed',
    value: 'Đã đóng gói',
    color: '#6fa8dc',
  },
  {
    key: 'shipping',
    value: 'Đang giao hàng',
    color: '#ffe599',
  },
  {
    key: 'delivered',
    value: 'Đã giao hàng',
    color: '#b6d7a8',
  },
  {
    key: 'cancelled',
    value: 'Đã hủy',
    color: '#ea9999',
  },
  {
    key: 'refund',
    value: 'Trả hàng',
    color: '#b4a7d6',
  },
];
const checkOrderStatus = (orderStatus) => {
  const status = orderStatus[orderStatus.length - 1].type;
  return status == 'delivered' || status == 'cancelled' || status == 'refund';
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
    console.log('select', orderStatusSelected);
    dispatch(
      orderThunk.updateOrderStatus({ orderId, status: orderStatusSelected })
    )
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Cập nhật trạng thái đơn hàng thành công',
          placement: 'top',
        });
        dispatch(orderThunk.getOrder(orderId))
          .unwrap()
          .then((value) => {
            dispatch(orderThunk.getAllOrderAfter());
            if (orderStatusSelected === 'delivered') {
              dispatch(productThunk.getAllAfterHandle());
            }
            setListStatus(customOrderStatusList(value.order.orderStatus));
            setOrderSelected(value.order);
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
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Typography.Title level={3}>Chi tiết đơn hàng</Typography.Title>
        </Col>
      </Row>
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
              <Row gutter={[8, 0]}>
                <Col>
                  <Typography.Text
                    style={{ fontSize: '14px', color: '#7d879c' }}
                  >
                    Mã đơn hàng:
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
                    Ngày đặt hàng:
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
                      Cập nhật trạng thái đơn hàng:
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
                        Cập nhật
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
                    Địa chỉ giao hàng:
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
                    Phương thức thanh toán:
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text
                    style={{ fontSize: '14px', color: '#7d879c' }}
                    strong
                  >
                    Thanh toán khi nhận hàng
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
                      Tổng tiền hàng:
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
                      Tổng phí vận chuyển:
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
                      Tổng giảm phí vận chuyển:
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
                      Tổng cộng:
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
