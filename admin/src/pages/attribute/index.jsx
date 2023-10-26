import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Card,
  Table,
  Select,
  Button,
  Typography,
  Spin,
  notification,
} from 'antd';
import attributeThunk from '../../features/attribute/attribute.service';
const { Title } = Typography;
const { Option } = Select;
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
const ram = [
  {
    key: '1',
    value: '2GB',
    amount: '2GB',
  },
  {
    key: '2',
    value: '3GB',
    amount: '3GB',
  },
  {
    key: '3',
    value: '4GB',
    amount: '4GB',
  },
  {
    key: '4',
    value: '6GB',
    amount: '6GB',
  },
  {
    key: '5',
    value: '8GB',
    amount: '8GB',
  },
  {
    key: '6',
    value: '12GB',
    amount: '12GB',
  },
];
const storage = [
  {
    key: '1',
    value: '32GB',
    amount: '32GB',
  },
  {
    key: '2',
    value: '64GB',
    amount: '64GB',
  },
  {
    key: '3',
    value: '128GB',
    amount: '128GB',
  },
  {
    key: '4',
    value: '256GB',
    amount: '256GB',
  },
  {
    key: '5',
    value: '512GB',
    amount: '512GB',
  },
  {
    key: '6',
    value: '1TB',
    amount: '1TB',
  },
];
function Attributes() {
  const dispatch = useDispatch();
  const attribute = useSelector((state) => state.attribute);
  const { getLoading, loading } = attribute;

  //* attribute list
  const [listAttribute, setListAttribute] = useState([]);
  const [attributeSelected, setAttributeSelected] = useState({
    ram: '',
    storage: '',
  });

  const [data, setData] = useState([]);
  const handleAttributeChange = (attributeName, value) => {
    console.log(attributeSelected);
    setAttributeSelected((prevAttribute) => ({
      ...prevAttribute,
      [attributeName]: value,
    }));
  };

  const handleRamChange = (value) => {
    handleAttributeChange('ram', value);
  };

  const handleStorageChange = (value) => {
    handleAttributeChange('storage', value);
  };

  const handleCreateAttribute = () => {
    console.log('attribute create', attributeSelected);
    dispatch(attributeThunk.createAPI(attributeSelected))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Add attribute successfully!' });
        setTimeout(() => {
          dispatch(attributeThunk.getAllAPI())
            .unwrap()
            .then((value) => {
              setListAttribute(value.list);
            });
        }, 1000);
      });
  };
  useEffect(() => {
    dispatch(attributeThunk.getAllAPI())
      .unwrap()
      .then((value) => {
        console.log('list attribute', value.list);
        setListAttribute(value.list);
      });
  }, [dispatch]);
  useEffect(() => {
    if (listAttribute.length > 0) {
      setData(
        listAttribute.map((item, index) => {
          return {
            key: item._id,
            name: (
              <>
                <Typography.Title level={5}>
                  {item.ram} - {item.storage}
                </Typography.Title>
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
        })
      );
    } else {
      setData([]);
    }
  }, [listAttribute]);
  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="List attribute"
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
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={true}
            className="criclebox tablespace mb-24"
            title="Create new attribute"
            style={{ minHeight: '250px' }}
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
                  placeholder="select ram"
                  onChange={handleRamChange}
                  style={{ width: '90%' }}
                >
                  {ram.map((ram) => {
                    return (
                      <Option key={ram.key} value={ram.value}>
                        {ram.amount}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col
                span={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Select
                  placeholder="select storage"
                  style={{ width: '90%' }}
                  onChange={handleStorageChange}
                >
                  {storage.map((storage) => {
                    return (
                      <Option key={storage.key} value={storage.value}>
                        {storage.amount}
                      </Option>
                    );
                  })}
                </Select>
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
                  onClick={handleCreateAttribute}
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

export default Attributes;
