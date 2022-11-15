import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import { formatThousand } from '../../utils';
import { Button, Row, Col, Typography, Table, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { customListOrder } from '../../utils/custom-order';
const { Title } = Typography;
const paymentStatusList = [
  {
    name: 'Chưa thanh toán',
    value: 'pending',
    color: '#eeeeee',
  },
  {
    name: 'Đã thanh toán',
    value: 'completed',
    color: '#b6d7a8',
  },
  {
    name: 'Hủy đơn',
    value: 'cancelled',
    color: '#ea9999',
  },
  {
    name: 'Đã hoàn tiền',
    value: 'refund',
    color: '#b4a7d6',
  },
];
const orderStatusList = [
  {
    key: 'pending',
    value: 'Chờ xác nhận',
    color: '#eeeeee',
  },
  {
    key: 'waiting',
    value: 'Chờ lấy hàng',
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
const columns = [
  {
    title: 'Mã đơn',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Số lượng sản phẩm',
    key: 'amount',
    dataIndex: 'amount',
    width: '5%',
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'orderDate',
    key: 'orderDate',
    width: '5%',
  },
  {
    title: 'Địa chỉ giao',
    dataIndex: 'address',
    key: 'address',
    width: '30%',
  },
  {
    title: 'Trạng thái thanh toán',
    key: 'paymentStatus',
    dataIndex: 'paymentStatus',
    width: '5%',
  },
  {
    title: 'Trạng thái đơn',
    key: 'orderStatus',
    dataIndex: 'orderStatus',
    width: '5%',
  },
  {
    title: 'Tổng tiền',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
    width: '10%',
  },
  {
    title: '',
    key: 'action',
    dataIndex: 'action',
    width: '7%',
  },
];

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { orders } = auth.data;
  const [listOrder, setListOrder] = useState(orders);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    if (Object.keys(listOrder).length === 0) {
      dispatch(orderThunk.getAllOrder())
        .unwrap()
        .then((value) => {
          const newListOrder = customListOrder(value.list[1], value.list[0]);
          setLoading(false);
          setListOrder(newListOrder);
        });
    }
  }, [dispatch, listOrder]);
  useEffect(() => {
    if (listOrder.length > 0) {
      setLoading(false);
      setData(
        listOrder.map((item) => {
          const { paymentStatus, totalAmount, orderStatus, items } = item;
          const { provinceName, wardName, districtName } = item.addressDetail;
          return {
            key: item._id,
            id: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>{item._id}</Typography.Title>
                </div>
              </>
            ),
            amount: (
              <div>
                <Typography.Title level={5}>{items.length}</Typography.Title>
              </div>
            ),
            orderDate: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {new Date(orderStatus[0].date).toLocaleDateString()}
                  </Typography.Title>
                </div>
              </>
            ),
            address: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {wardName}, {districtName}, {provinceName}
                  </Typography.Title>
                </div>
              </>
            ),
            totalAmount: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {formatThousand(totalAmount)}đ
                  </Typography.Title>
                </div>
              </>
            ),
            orderStatus: (
              <>
                {orderStatusList.map((statusValue) => {
                  if (
                    statusValue.key === orderStatus[orderStatus.length - 1].type
                  ) {
                    return (
                      <Button
                        key={statusValue.key}
                        style={{
                          borderRadius: '20px',
                          backgroundColor: statusValue.color,
                        }}
                      >
                        {statusValue.value}
                      </Button>
                    );
                  }
                })}
              </>
            ),
            paymentStatus: (
              <>
                {paymentStatusList.map((payment) => {
                  if (payment.value === paymentStatus) {
                    return (
                      <Button
                        key={payment.key}
                        style={{
                          borderRadius: '20px',
                          backgroundColor: payment.color,
                        }}
                      >
                        {payment.name}
                      </Button>
                    );
                  }
                })}
              </>
            ),
            action: (
              <>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="fa-lg"
                  color="#3d85c6"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={() => navigate(`/orders/edit/${item._id}`)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="fa-lg"
                  color="#f44336"
                  style={{ cursor: 'pointer' }}
                />
              </>
            ),
          };
        })
      );
    } else {
      setData([]);
    }
  }, [listOrder]);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Title level={3}>Danh sách đơn hàng</Title>
        </Col>
        <Col xs="24" xl={24}>
          <div className="table-responsive" style={{ borderRadius: '10px' }}>
            {loading ? (
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
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={true}
                className="ant-border-space"
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Orders;
