import { Row, Col, Card, Table, Switch, Avatar, Typography, Input, Button, notification, Form, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import face2 from '../../assets/images/face-2.jpg';
import AddCategoryModal from './components/modal-add';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
const { Search } = Input;
const { Title } = Typography;

// project table start

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const { loading, success } = category;

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  // table code start
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '45%',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
    },
  ];
  const onFinishHandle = async (values) => {
    const { name, image } = values;
    const { fileList } = image;
    const picture = await getBase64(fileList[0].originFileObj);
    const categoryData = {
      name,
      picture,
    };
    dispatch(categoryThunk.createAPI(categoryData))
      .then(() => {
        notification.success({ message: 'Category created successfully' });
        form.resetFields();
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      })
      .catch(() => {
        notification.success({ message: 'Create Category error' });
      });
  };
  const onClose = () => setVisible(false);
  // const data = [
  //   {
  //     key: '1',
  //     name: (
  //       <>
  //         <Avatar.Group>
  //           <Avatar className="shape-avatar" shape="square" size={40} src={face2}></Avatar>
  //           <div className="avatar-info">
  //             <Title level={5}>Tiep</Title>
  //           </div>
  //         </Avatar.Group>{' '}
  //       </>
  //     ),

  //     status: (
  //       <>
  //         <div className="ant-employed">
  //           <Switch defaultChecked onChange={onChange} />
  //           <a href="#pablo">Edit</a>
  //         </div>
  //       </>
  //     ),
  //   },
  // ];
  useEffect(() => {
    dispatch(categoryThunk.getAllAPI());
  }, [dispatch]);
  function renderTable() {}
  return (
    <>
      <AddCategoryModal form={form} loading={loading} onFinish={onFinishHandle} visible={visible} title="Create new category" onCancel={onClose} />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="List Categories"
              extra={
                <Row>
                  <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
                      Add
                    </Button>
                  </Col>
                  <Col>
                    <Search placeholder="Type here..." enterButton />
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
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
                  <Table columns={columns} dataSource={data} pagination={false} className="ant-border-space" />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ListCategories;
