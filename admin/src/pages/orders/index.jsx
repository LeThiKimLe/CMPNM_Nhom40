import React, { useState, useEffect } from 'react';
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
  notification,
  Tag,
} from 'antd';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { customListOrder } from '../../utils/custom-order';

import { SearchOutlined, EditOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const paymentStatusList = [
  {
    name: 'Chưa thanh toán',
    value: 'pending',
    color: '#5ba6a6',
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
    color: '#5ba6a6',
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
];

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { orderList } = order;
  const [listOrder, setListOrder] = useState(orderList);
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

  const handleEditOrder = () => {
    console.log(selectedRowKeys);
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Vui lòng chỉ chọn một trường để chỉnh sửa',
        placement: 'top',
      });
    } else if (selectedRowKeys.length > 1) {
      notification.error({
        message: 'Vui lòng chỉ chọn một trường để chỉnh sửa',
        placement: 'top',
      });
    } else {
      navigate(`/orders/edit/${selectedRowKeys[0]}`);
    }
  };
  useEffect(() => {
    setLoading(true);
    dispatch(orderThunk.getAllOrder())
      .unwrap()
      .then((value) => {
        const newListOrder = customListOrder(value.list[1], value.list[0]);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setListOrder(newListOrder);
      });
  }, [dispatch]);
  useEffect(() => {
    if (listOrder.length > 0) {
      setData(
        listOrder.map((item) => {
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
          <Row
            gutter={[32, 16]}
            style={{ marginTop: '10px', marginBottom: '20px' }}
          >
            <Col>
              <Button
                style={{
                  background: '#FFB266',
                  color: 'white',
                  borderRadius: '10px',
                }}
                icon={<SearchOutlined />}
              >
                Tìm kiếm
              </Button>
            </Col>

            <Col>
              <Button
                style={{
                  background: '#0066CC',
                  color: 'white',
                  borderRadius: '10px',
                }}
                icon={<EditOutlined />}
                onClick={handleEditOrder}
              >
                Chỉnh sửa
              </Button>
            </Col>
          </Row>
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
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Orders;
