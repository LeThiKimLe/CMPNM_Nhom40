/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  notification,
  Button,
  message,
  Form,
  Avatar,
  Table,
  Typography,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import avatar from '../../assets/images/avatar.jpg';
import AddUserModal from './components/modal-add';
import ConfirmDelete from '../../components/ui/modal/confirm-delete';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64 } from '../../utils';
import userThunk from '../../features/users/user.service';
import { userActions } from '../../features/users/user.slice';
import MenuSearch from './components/menu-search';
import EditUserModel from './components/modal-edit';

const { Title } = Typography;
function Users() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { users, getLoading, loading, success } = user;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  // form
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

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
    {
      title: 'Ngày tạo',
      key: 'created',
      dataIndex: 'created',
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // *delete button handle
  const handleConfirmDelete = () => {
    dispatch(userThunk.deleteUsersAPI(selectedRowKeys))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Delete succesfully',
          placement: 'top',
        });
        setTimeout(() => {
          setVisibleDelete(false);
          dispatch(userThunk.getAllUserAPI());
        }, 1000);
      })
      .catch((error) => {
        notification.error({ message: error, placement: 'top' });
      });
  };
  const onClickBtnDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Vui lòng chỉ chọn một đối tượng để xóa',
        placement: 'top',
      });
    } else {
      setVisibleDelete(true);
    }
  };
  const onClickBtnEdit = () => {
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Vui lòng chỉ chọn một đối tượng để chỉnh sửa',
        placement: 'top',
      });
    } else if (selectedRowKeys.length > 1) {
      notification.error({
        message: 'Vui lòng chỉ chọn một đối tượng để chỉnh sửa',
        placement: 'top',
      });
    } else {
      setVisibleEdit(true);
      renderDataInEdit();
    }
  };
  const renderDataInEdit = () => {
    let userEdit;
    user.users.map((user) => {
      if (user._id === selectedRowKeys[0]) {
        userEdit = user;
      }
    });
    formEdit.setFieldsValue({
      ...userEdit,
    });
  };
  const onFinishEditHandle = () => {};
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onCancelAdd = () => {
    formAdd.resetFields();
    setVisibleAdd(false);
  };
  const beforeUploadHandler = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return false;
  };

  // todo create new User
  const handleAddUser = async (values) => {
    let userData = {};
    delete values.confirmPassword;
    if (values.image) {
      const picture = await getBase64(values.image.file);
      delete values.image;
      userData = {
        ...values,
        picture,
      };
    } else {
      delete values.image;
      userData = { ...values };
    }
    console.log(userData);
    dispatch(userThunk.createUserAPI(userData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'User created successfully' });
        // formAdd.resetFields();
        dispatch(userActions.reset());
        setTimeout(() => {
          setVisibleAdd(false);
          dispatch(userThunk.getAllUserAPI());
        }, 1000);
      })
      .catch((error) => {
        notification.error({
          message: error,
          placement: 'top',
        });
        formAdd.setFields([
          {
            name: 'email',
            errors: [error],
          },
        ]);
        // formAdd.resetFields();
        dispatch(userActions.reset());
      });
  };
  //* get all users initial
  useEffect(() => {
    dispatch(userThunk.getAllUserAPI());
  }, [dispatch]);
  useEffect(() => {
    if (user.users.length > 0) {
      setData(
        user.users.map((user) => {
          return {
            key: user._id,
            name: (
              <>
                <Avatar.Group>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={50}
                    src={user.profilePicture ? user.profilePicture : avatar}
                  ></Avatar>
                  <div className="avatar-info">
                    <Typography.Title level={5}>
                      {user.lastName + user.firstName}
                    </Typography.Title>
                    <p>{user.email}</p>
                  </div>
                </Avatar.Group>{' '}
              </>
            ),
            contactNumber: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {user.contactNumber}
                  </Typography.Title>
                </div>
              </>
            ),
            role: (
              <>
                <div className="author-info">
                  <Typography.Title level={5}>{user.roles}</Typography.Title>
                </div>
              </>
            ),

            status: (
              <>
                <Button type="primary" className="tag-primary">
                  {user.isVerified ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                </Button>
              </>
            ),
            created: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Typography.Title>
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setData([]);
    }
  }, [user.users]);
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
      <EditUserModel
        visible={visibleEdit}
        form={formEdit}
        onCancel={() => setVisibleEdit(false)}
      />
      <ConfirmDelete
        visible={visibleDelete}
        onFinish={onFinishEditHandle}
        onCancel={() => setVisibleDelete(false)}
        loading={loading}
        handleDelete={handleConfirmDelete}
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
            <Row
              gutter={[32, 16]}
              style={{ marginLeft: '5px', marginBottom: '20px' }}
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
                    background: '#00994C',
                    color: 'white',
                    borderRadius: '10px',
                  }}
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
                  onClick={onClickBtnEdit}
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
                  onClick={onClickBtnDelete}
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
            <div className="table-responsive" style={{ borderRadius: '10px' }}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={true}
                className="ant-border-space"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
