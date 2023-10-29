import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Table,
  Select,
  Button,
  Avatar,
  Typography,
  Spin,
  notification,
} from 'antd';
import colorThunk from '../../features/color/color.service';
const { Title } = Typography;

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    width: '52%',
  },
  {
    title: 'created',
    key: 'created',
    dataIndex: 'created',
  },
];

const options = [
  { label: 'Red', value: 'Đỏ' },
  { label: 'Orange', value: 'Cam' },
  { label: 'Yellow', value: 'Vàng' },
  { label: 'Green', value: 'Xanh lá' },
  { label: 'Blue', value: 'Xanh dương' },
  { label: 'Purple', value: 'Tím' },
  { label: 'Pink', value: 'Hồng' },
  { label: 'Brown', value: 'Nâu' },
  { label: 'Gray', value: 'Xám' },
  { label: 'Black', value: 'Đen' },
  { label: 'White', value: 'Trắng' },
];

function Colors() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);
  const { getLoading } = color;

  //* color list
  const [listColor, setListColor] = useState([]);
  const [colorSelected, setColorSelected] = useState({
    label: '',
    value: '',
  });

  const handleChange = (e, color) => {
    console.log('Selected: ', color);
    setColorSelected({
      label: color.label,
      value: color.value,
    });
  };

  const handleAddColor = () => {
    console.log(colorSelected);
    dispatch(colorThunk.createAPI(colorSelected))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Add color successfully!' });
        setTimeout(() => {
          dispatch(colorThunk.getAllAPI())
            .unwrap()
            .then((value) => {
              setListColor(value.list);
            });
        }, 1000);
      });
  };

  const fetchColors = useCallback(() => {
    dispatch(colorThunk.getAllAPI())
      .unwrap()
      .then((value) => {
        console.log('list color', value.list);
        setListColor(value.list);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const data = useMemo(() => {
    if (listColor.length > 0) {
      return listColor.map((item, index) => {
        const divStyle = {
          backgroundColor: item.value.toLowerCase(),
          width: '40px', // Set width as needed
          height: '40px', // Set height as needed
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          marginRight: '5px',
        };
        return {
          key: item._id,
          name: (
            <>
              <Avatar.Group>
                <div style={divStyle}></div>
                <div className="avatar-info">
                  <Title level={5}>{item.value}</Title>
                </div>
              </Avatar.Group>{' '}
            </>
          ),
          created: (
            <>
              <div className="ant-employed">
                <Typography.Text level={5}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Typography.Text>
                <a href="#pablo">Edit</a>
                <a href="#pablo">Delete</a>
              </div>
            </>
          ),
        };
      });
    } else {
      return [];
    }
  }, [listColor]);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col span={24} md={14} className="mb-24">
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="Colors"
          >
            <div className="table-responsive">
              {getLoading ? (
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
                  pagination={false}
                  className="ant-border-space"
                  showHeader={false}
                />
              )}
            </div>
          </Card>
        </Col>
        <Col span={24} md={10} className="mb-24">
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="Create new color"
            style={{ minHeight: '200px' }}
          >
            <Row gutter={[16, 16]}>
              <Col
                span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Select
                  style={{
                    width: '90%',
                    fontFamily: 'Poppins',
                  }}
                  options={options}
                  onChange={handleChange}
                />
              </Col>
              <Col
                span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  type="primary"
                  style={{ width: '90%' }}
                  onClick={handleAddColor}
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Colors;
