/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Col, Row, Typography, Card, Button, Spin, Table, Tag } from 'antd';
import {
  faSackDollar,
  faBagShopping,
  faTruckFast,
  faBoxesStacked,
} from '@fortawesome/free-solid-svg-icons';

import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { formatThousand, getListProductSold } from '../../utils';
import orderThunk from '../../features/order/order.service';
import { useNavigate } from 'react-router-dom';
import productThunk from '../../features/product/product.service';
import ReactApexChart from 'react-apexcharts';
// import eChart from '../../components/chart/configs/eChart';
const { Title, Text } = Typography;

const StockProductColumns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '32%',
  },
  {
    title: 'Số lượng bán',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'Số lượng kho',
    key: 'stock',
    dataIndex: 'stock',
  },
  {
    title: 'Giá tiền',
    key: 'price',
    dataIndex: 'price',
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
const eChartConfig = {
  series: [
    {
      name: 'Sales',
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 200, 400, 300],
      color: '#fff',
    },
  ],

  options: {
    chart: {
      type: 'bar',
      width: '100%',
      height: 'auto',

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  },
};
const monthNamesEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthNamesVi = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const product = useSelector((state) => state.product);
  const { orderList } = order;

  const [listOrder, setListOrder] = useState(orderList);
  const [listProduct, setListProduct] = useState(product.products);
  const [eChart, setEChart] = useState(eChartConfig);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allItems, setAllItems] = useState(0);
  const [totalShipAmount, setTotalShipAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [productSoldData, setProductSoldData] = useState([]);
  const getTotalAmount = (orders) => {
    let total = 0;
    orders.map((item) => {
      if (item.orderStatus[item.orderStatus.length - 1].type === 'delivered') {
        total = total + item.totalAmount;
      }
    });
    return total;
  };
  const getTotalProductInItem = (items) => {
    let amount = 0;
    items.map((item) => {
      amount = amount + item.purchasedQty;
    });
    return amount;
  };
  const getTotalItems = (orders) => {
    let items = 0;
    orders.map((item) => {
      if (item.orderStatus[item.orderStatus.length - 1].type === 'delivered') {
        items = items + getTotalProductInItem(item.items);
      }
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
  const count = [
    {
      today: 'Tổng doanh thu',
      title: `${formatThousand(totalAmount)}đ`,
      icon: <FontAwesomeIcon icon={faSackDollar} className="fa-2xl" />,
      bnb: 'bnb2',
    },
    {
      today: 'Tổng số đơn hàng',
      title: `${orderList.length}`,
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

  const getRevenue = useCallback(async () => {
    try {
      const dataRevenue = await dispatch(
        orderThunk.getMonthlyRevenueAPI()
      ).unwrap();

      const data = [];
      const categories = [];

      dataRevenue.forEach((item) => {
        const monthIndex = monthNamesEn.indexOf(item.month);
        const monthName =
          monthIndex !== -1 ? monthNamesVi[monthIndex] : item.month;

        const categoryIndex = categories.indexOf(monthName);

        if (categoryIndex === -1) {
          categories.push(monthName);
          data.push(item.totalRevenue);
        } else {
          data[categoryIndex] += item.totalRevenue;
        }
      });
      const eChart = {
        series: [
          {
            name: 'Doanh thu',
            data,
            color: '#fff',
          },
        ],

        options: {
          chart: {
            width: '100%',
            height: 'auto',

            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 5,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['transparent'],
          },
          grid: {
            show: true,
            borderColor: '#ccc',
            strokeDashArray: 2,
          },
          xaxis: {
            categories,
            labels: {
              show: true,
              align: 'right',
              minWidth: 0,
              maxWidth: 160,
              style: {
                colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
              },
            },
          },
          yaxis: {
            labels: {
              show: true,
              align: 'right',
              minWidth: 0,
              maxWidth: 160,
              style: {
                colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
              },
              formatter: function (value) {
                return numeral(value).format('0,0') + ' VNĐ';
              },
            },
          },

          tooltip: {
            y: {
              formatter: function (val) {
                return numeral(val).format('0,0') + ' VNĐ';
              },
            },
          },
        },
      };

      console.log('eChart', eChart);
      setEChart(eChart);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchProducts = useCallback(async () => {
    if (product.products.length > 0) {
      return;
    }
    try {
      const data = await dispatch(productThunk.getAllAPI()).unwrap();
      setListProduct(data.list);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const fetchOrders = useCallback(async () => {
    try {
      const value = await dispatch(orderThunk.getAllOrder()).unwrap();
      setListOrder(value.list[1]);
      setTotalAmount(getTotalAmount(value.list[1]));
      setAllItems(getTotalItems(value.list[1]));
      setTotalShipAmount(getAllTotalShip(value.list[1]));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    Promise.all([fetchProducts(), getRevenue(), fetchOrders()])
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, [fetchProducts, fetchOrders]);

  useEffect(() => {
    if (Object.keys(listOrder).length > 0) {
      setOrderData(
        listOrder.map((item) => {
          const { paymentStatus, totalAmount, orderStatus, items } = item;
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
            totalAmount: (
              <>
                <div className="ant-employed">
                  <Text>{formatThousand(totalAmount)}đ</Text>
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setOrderData([]);
    }
  }, [listOrder]);
  useEffect(() => {
    if (Object.keys(listProduct).length > 0) {
      const newListProduct = getListProductSold(listProduct);
      setProductSoldData(
        newListProduct.map((item) => {
          return {
            key: item._id,
            name: (
              <>
                <div className="ant-employed">
                  <Text>{item.name}</Text>
                </div>
              </>
            ),
            amount: (
              <>
                <div className="ant-employed">
                  <Text>{item.quantitySold}</Text>
                </div>
              </>
            ),
            stock: (
              <>
                <div className="ant-employed">
                  <Text>{item.stock}</Text>
                </div>
              </>
            ),
            price: (
              <>
                <div className="ant-employed">
                  <Text>{formatThousand(item.salePrice)}đ</Text>
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setProductSoldData([]);
    }
  }, [listProduct]);

  return (
    <>
      <div className="layout-content">
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

            <Row gutter={[24, 0]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={18} className="mb-24">
                <Card bordered={false} className="criclebox">
                  {eChart && (
                    <div id="chart">
                      <Title level={5}>Doanh thu theo tháng</Title>
                      <ReactApexChart
                        className="bar-chart"
                        options={eChart.options}
                        series={eChart.series}
                        type="bar"
                        height={400}
                      />
                    </div>
                  )}
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={6} className="mb-24">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className="mb-24"
                  >
                    <Card bordered={false} className="criclebox ">
                      <div className="number">
                        <Row align="middle" gutter={[24, 0]}>
                          <Col xs={18}>
                            <span>{count[0].today}</span>
                            <Title
                              style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                              {count[0].title}{' '}
                              <small className={count[0].bnb}>
                                {count[0].persent}
                              </small>
                            </Title>
                          </Col>
                          <Col xs={6}>
                            <div
                              className="icon-box"
                              style={{
                                backgroundColor: '#3d85c6',
                              }}
                            >
                              {count[0].icon}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className="mb-24"
                  >
                    <Card bordered={false} className="criclebox ">
                      <div className="number">
                        <Row align="middle" gutter={[24, 0]}>
                          <Col xs={18}>
                            <span>{count[1].today}</span>
                            <Title
                              style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                              {count[1].title}{' '}
                              <small className={count[1].bnb}>
                                {count[1].persent}
                              </small>
                            </Title>
                          </Col>
                          <Col xs={6}>
                            <div
                              className="icon-box"
                              style={{
                                backgroundColor: '#3d85c6',
                              }}
                            >
                              {count[1].icon}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className="mb-24"
                  >
                    <Card bordered={false} className="criclebox ">
                      <div className="number">
                        <Row align="middle" gutter={[24, 0]}>
                          <Col xs={18}>
                            <span>{count[2].today}</span>
                            <Title
                              style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                              {count[2].title}{' '}
                              <small className={count[2].bnb}>
                                {count[2].persent}
                              </small>
                            </Title>
                          </Col>
                          <Col xs={6}>
                            <div
                              className="icon-box"
                              style={{
                                backgroundColor: '#3d85c6',
                              }}
                            >
                              {count[2].icon}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className="mb-24"
                  >
                    <Card bordered={false} className="criclebox ">
                      <div className="number">
                        <Row align="middle" gutter={[24, 0]}>
                          <Col xs={18}>
                            <span>{count[3].today}</span>
                            <Title
                              style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                              {count[3].title}{' '}
                              <small className={count[3].bnb}>
                                {count[3].persent}
                              </small>
                            </Title>
                          </Col>
                          <Col xs={6}>
                            <div
                              className="icon-box"
                              style={{
                                backgroundColor: '#3d85c6',
                              }}
                            >
                              {count[3].icon}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
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
                        <Button onClick={() => navigate('/orders')}>
                          Xem tất cả
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ant-list-box table-responsive"
                    style={{ padding: '24px' }}
                  >
                    <Table
                      columns={RecentOrderColumns}
                      dataSource={orderData}
                      pagination={true}
                    />
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
                      Sản phẩm đã bán
                    </Title>
                    <div className="ant-filtertabs">
                      <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                        <Button>Xem tất cả</Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ant-list-box table-responsive"
                    style={{ padding: '24px' }}
                  >
                    <Table
                      columns={StockProductColumns}
                      dataSource={productSoldData}
                      pagination={true}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
