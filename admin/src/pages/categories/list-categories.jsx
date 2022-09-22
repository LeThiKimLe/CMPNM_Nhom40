/* eslint-disable array-callback-return */
import { Row, Col, Card, Table, Switch, Image, Typography, Input, Button, notification, Form, Spin, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import face2 from '../../assets/images/face-2.jpg';
import AddCategoryModal from './components/modal-add';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
import EditCategoryModal from './components/modal-edit';
const { Search } = Input;
const { Title } = Typography;

// project table start

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const { loading, success, get } = category;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [keyEdit, setKeyEdit] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const onFinishAddHandle = async (values) => {
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
        formAdd.resetFields();
        dispatch(categoryActions.reset());
        setTimeout(() => {
          setVisibleAdd(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch(() => {
        notification.success({ message: 'Create Category error' });
      });
  };
  const onFinishEditHandle = () => {};
  const onCloseAdd = () => {
    setVisibleAdd(false);
  };
  const onChangeUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleCancel = () => {
    formAdd.resetFields();
    setVisibleAdd(false);
  };
  const renderDataInEdit = (editKey) => {
    let categoryEdit;
    category.categories.map((category, index) => {
      if (index === editKey) {
        categoryEdit = category;
      }
    });
    const { name, categoryImage, isActive } = categoryEdit;
    formEdit.setFieldsValue({
      name,
      categoryImage,
      checked: isActive,
    });
  };
  // table code start
  const columns = [
    {
      title: 'LOGO',
      dataIndex: 'logo',
      key: 'logo',
      width: '25%',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'ACTIONS',
      key: 'action',
      render: (record) => (
        <div style={{ textAlign: 'center' }}>
          <Space size="middle">
            <Button
              onClick={() => {
                setVisibleEdit(true);
                setKeyEdit(record.key);
                renderDataInEdit(record.key);
              }}
              style={{ background: '#40E0D0', color: 'white' }}
            >
              Edit
            </Button>
            <Button style={{ background: '#FF6347', color: 'white' }}>Delete</Button>
          </Space>
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(categoryThunk.getAllAPI());
  }, [dispatch]);

  useEffect(() => {
    if (category.categories.length > 0) {
      setData(
        category.categories.map((category, index) => {
          return {
            key: index,
            logo: <Image width={80} height={40} src={category.categoryImage} style={{ margin: '0 12px 0 0', paddingTop: 10, float: 'left' }} />,
            name: (
              <>
                <div className="avatar-info">
                  <Title level={4}>{category.name}</Title>
                </div>
              </>
            ),

            status: (
              <>
                <div className="ant-employed">{category.isActive ? <Switch defaultChecked /> : <Switch />}</div>
              </>
            ),
          };
        })
      );
    }
  }, [category.categories]);
  return (
    <>
      <AddCategoryModal
        handleCancel={handleCancel}
        form={formAdd}
        loading={loading}
        onFinish={onFinishAddHandle}
        visible={visibleAdd}
        fileList={fileList}
        title="Create new category"
        onChange={onChangeUpload}
        onCancel={() => setVisibleAdd(false)}
      />
      <EditCategoryModal
        handleCancel={handleCancel}
        form={formEdit}
        loading={loading}
        onFinish={onFinishEditHandle}
        visible={visibleEdit}
        title="Create new category"
        onCancel={() => setVisibleEdit(false)}
      />
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
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisibleAdd(true)}>
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
                  <Table columns={columns} dataSource={data} pagination={true} className="ant-border-space" />
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
