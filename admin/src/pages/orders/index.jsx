import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderThunk from '../../features/order/order.service';
import { formatThousand } from '../../utils';
import {
  Button,
  Row,
  Col,
  Typography,
  Table,
  Spin,
  Tag,
  Space
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from "@ant-design/icons";

import { customListOrder } from '../../utils/custom-order';

const { Text, Title } = Typography;

const { paymentStatusList,
  orderStatusList, } = require('./column-name');


function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { orderList } = order;
  const [listOrder, setListOrder] = useState(orderList);
  const [loading, setLoading] = useState(true);

  const handleEditOrder = (id) => {
    navigate(`/orders/edit/${id}`);
  };

  const fetchOrders = useCallback(async () => {
    try {
      const value = await dispatch(orderThunk.getAllOrder()).unwrap();
      if (value.list[1].length === 0) {
        setListOrder([]);
      } else {
        const newListOrder = customListOrder(value.list[1], value.list[0]);
        setListOrder(newListOrder);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
      width: '30%'
    },
    {
      title: 'Product quantity',
      key: 'amount',
      dataIndex: 'amount',
      width: '5%',
    },
    {
      title: 'Order date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: '5%',
    },
    {
      title: 'Delivery address',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    },
    {
      title: 'Payment status',
      key: 'paymentStatus',
      dataIndex: 'paymentStatus',
      width: '5%',
    },
    {
      title: 'Status',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      width: '5%',
    },
    {
      title: 'Total amount',
      key: 'totalAmount',
      dataIndex: 'totalAmount',
      width: '10%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <button className="edit-button" onClick={() => handleEditOrder(record.key)}>
            <EditOutlined/>
          </button>
      ),
    }
  ];
  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  const data = useMemo(() => {
    if (listOrder.length > 0) {
      return listOrder.map((item) => {
        const { paymentStatus, totalAmount, orderStatus, items } = item;
        const { provinceName, wardName, districtName } = item.addressDetail;
        return {
          key: item._id,
          id: (
            <>
              <div className="ant-employed">
                <Text>{item._id}</Text>
              </div>
            </>
          ),
          amount: (
            <div>
              <Text>{items.length}</Text>
            </div>
          ),
          orderDate: (
            <>
              <div className="ant-employed">
                <Text>
                  {new Date(orderStatus[0].date).toLocaleDateString()}
                </Text>
              </div>
            </>
          ),
          address: (
            <>
              <div className="ant-employed">
                <Text>
                  {wardName}, {districtName}, {provinceName}
                </Text>
              </div>
            </>
          ),
          totalAmount: (
            <>
              <div className="ant-employed">
                <Text>{formatThousand(totalAmount)}đ</Text>
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
                    <Tag key={statusValue.key} color={statusValue.color}>
                      {' '}
                      {statusValue.value}
                    </Tag>
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
                    <Tag key={payment.key} color={payment.color}>
                      {' '}
                      {payment.name}
                    </Tag>
                  );
                }
              })}
            </>
          ),
        };
      });
    } else {
      return [];
    }

  }, [listOrder]);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
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
                columns={columns}
                dataSource={data}
                pagination={true}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Orders;
