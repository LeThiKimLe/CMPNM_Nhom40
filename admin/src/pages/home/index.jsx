import React from 'react';
import { Col, Row, Typography, Card, Button } from 'antd';
import {
  faSackDollar,
  faBagShopping,
  faTruckFast,
  faBoxesStacked,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { formatThousand } from '../../utils';
const { Title } = Typography;

const StockProductColumns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '32%',
  },
  {
    title: 'Màu sắc',
    key: 'color',
    dataIndex: 'color',
  },
  {
    title: 'Số lượng',
    key: 'stock',
    dataIndex: 'stock',
  },
];

const RecentOrderColumns = [
  {
    title: 'Mã đơn',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Số lượng sản phẩm',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Trạng thái thanh toán',
    key: 'paymentStatus',
    dataIndex: 'paymentStatus',
  },
  {
    title: 'Trạng thái đơn',
    key: 'orderStatus',
    dataIndex: 'orderStatus',
  },
  {
    title: 'Tổng tiền',
    key: 'totalAmount',
    dataIndex: 'totalAmount',
  },
];
const getTotalAmount = (orders) => {
  let total = 0;
  orders.map((item) => {
    total = total + item.totalAmount;
  });
  return total;
};
const getTotalItems = (orders) => {
  let items = 0;
  orders.map((item) => {
    items = items + item.items.length;
  });
  return items;
};
const getAllTotalShip = (orders) => {
  let totalShip = 0;
  orders.map((item) => {
    totalShip = totalShip + item.shipAmount;
  });
  return totalShip;
};
function Home() {
  const auth = useSelector((state) => state.auth);
  const { orders } = auth.data;
  let totalAmount = 0;
  let allItems = 0;
  let totalShipAmount = 0;
  if (orders) {
    totalAmount = getTotalAmount(orders);
    allItems = getTotalItems(orders);
    totalShipAmount = getAllTotalShip(orders);
  }
  const count = [
    {
      today: 'Tổng doanh thu',
      title: `${formatThousand(totalAmount)}đ`,
      icon: <FontAwesomeIcon icon={faSackDollar} className="fa-2xl" />,
      bnb: 'bnb2',
    },
    {
      today: 'Tổng số đơn hàng',
      title: `${orders.length}`,
      icon: <FontAwesomeIcon icon={faBagShopping} className="fa-2xl" />,
      bnb: 'bnb2',
    },
    {
      today: 'Lượng sản phẩm bán ra',
      title: `${allItems}`,
      icon: <FontAwesomeIcon icon={faBoxesStacked} className="fa-2xl" />,
      bnb: 'redtext',
    },
    {
      today: 'Tổng tiền vận chuyển',
      title: `${formatThousand(totalShipAmount)}đ`,
      icon: <FontAwesomeIcon icon={faTruckFast} className="fa-2xl" />,
      bnb: 'bnb2',
    },
  ];
  return (
    <>
      <div className="layout-content">
        <div className="tabled">
          <Title
            style={{
              fontSize: '24px',
              color: '#4e97fd',
              fontWeight: '600',
            }}
          >
            Chào buổi sáng, Tiệp!
          </Title>
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c.today}</span>
                        <Title style={{ fontSize: '20px', fontWeight: '700' }}>
                          {c.title} <small className={c.bnb}>{c.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div
                          className="icon-box"
                          style={{
                            backgroundColor: '#3d85c6',
                          }}
                        >
                          {c.icon}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox cardbody h-full">
                <div className="project-ant">
                  <div>
                    <Title level={5}>Đơn hàng gần đây</Title>
                  </div>
                  <div className="ant-filtertabs">
                    <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                      <Button>Xem tất cả</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox cardbody h-full">
                <div className="project-ant">
                  <Title
                    level={5}
                    style={{
                      color: '#2b3445',
                    }}
                  >
                    Sản phẩm sắp hết
                  </Title>
                  <div className="ant-filtertabs">
                    <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                      <Button>Xem tất cả</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Home;
