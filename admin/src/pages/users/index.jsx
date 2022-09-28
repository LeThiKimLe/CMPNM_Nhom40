import React, { useState } from 'react';
import { Row, Col, notification, Button, message, Form, Avatar, Table, Typography, Space } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import face2 from '../../assets/images/face-2.jpg';
import AddUserModal from './components/modal-add';
import MenuSearch from './components/menu-search';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64 } from '../../utils';
import userThunk from '../../features/users/user.service';
import { userActions } from '../../features/users/user.slice';

const { Title } = Typography;
function Users() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { users, message, getLoading, loading, success } = user;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  // form
  const [formAdd] = Form.useForm();

  // table code start
  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
    },
    {
      title: 'Số điện thoại',
      key: 'contactNumber',
      dataIndex: 'contactNumber',
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
    },

    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" shape="square" size={50} src={face2}></Avatar>
            <div className="avatar-info">
              <Typography.Title level={5}>Nguyen Bui Tiep</Typography.Title>
              <p>michael@mail.com</p>
            </div>
          </Avatar.Group>{' '}
        </>
      ),
      contactNumber: (
        <>
          <div className="ant-employed">
            <Typography.Title level={5}>0334943334</Typography.Title>
          </div>
        </>
      ),
      role: (
        <>
          <div className="author-info">
            <Typography.Title level={5}>Admin</Typography.Title>
          </div>
        </>
      ),

      status: (
        <>
          <Button type="primary" className="tag-primary">
            Đã kích hoạt
          </Button>
        </>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length === 0) setDisableButton(false);
    else {
      setDisableButton(true);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onCancelAdd = () => {
    formAdd.resetFields();
    setVisibleAdd(false);
  };
  const beforeUploadHandler = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return false;
  };

  // todo create new User
  const handleAddUser = async (values) => {
    const { image } = values;

    const picture = await getBase64(image.file);
    delete values.confirmPassword;
    delete values.image;
    const userData = {
      picture,
      ...values,
    };
    dispatch(userThunk.createUserAPI(userData))
      .then(() => {
        notification.success({ message: 'Category created successfully' });
        // formAdd.resetFields();
        dispatch(userActions.reset());
        setTimeout(() => {
          setVisibleAdd(false);
          // dispatch(userThunk.getAllAPI());
        }, 1000);
      })
      .catch(() => {
        notification.error({ message: 'Create category error' });
      });
  };
  return (
    <>
      <AddUserModal
        handleCancel={onCancelAdd}
        form={formAdd}
        loading={loading}
        onFinish={handleAddUser}
        visible={visibleAdd}
        onCancel={() => setVisibleAdd(false)}
        beforeUpload={beforeUploadHandler}
      />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Title level={3}>Danh sách Người dùng</Title>
          </Col>
          <Col xs="24" xl={24}>
            <Row>
              <Col span={12}>
                <MenuSearch />
              </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ marginLeft: '5px', marginBottom: '20px' }}>
              <Col>
                <Button
                  style={{
                    background: '#FFB266',
                    color: 'white',
                    borderRadius: '10px',
                  }}
                  disabled={disableButton}
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    background: '#00994C',
                    color: 'white',
                    borderRadius: '10px',
                  }}
                  disabled={disableButton}
                  onClick={() => setVisibleAdd(true)}
                  icon={<PlusOutlined />}
                >
                  Thêm
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
                >
                  Chỉnh sửa
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    background: '#FF3333',
                    color: 'white',
                    borderRadius: '10px',
                  }}
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
            <div className="table-responsive" style={{ borderRadius: '10px' }}>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={true} className="ant-border-space" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
