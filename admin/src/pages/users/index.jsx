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
  Switch,
  Spin,
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
  const { users, getLoading, loading } = user;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  // form
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);
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
    console.log(selectedRowKeys);
    dispatch(userThunk.deleteUsersAPI(selectedRowKeys))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Xóa tài khoản thành công!',
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
        message: 'Vui lòng chỉ chọn một trường để xóa',
        placement: 'top',
      });
    } else {
      setVisibleDelete(true);
    }
  };
  const onClickBtnEdit = () => {
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
    dispatch(userThunk.createUserAPI(userData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Tạo tài khoản thành công!' });
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
    if (users.length === 0) {
      dispatch(userThunk.getAllUserAPI());
    }
  }, [dispatch, users]);
  useEffect(() => {
    if (users.length > 0) {
      setData(
        users.map((user) => {
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
                    {!user.contactNumber ? 'Chưa cập nhật' : user.contactNumber}
                  </Typography.Title>
                </div>
              </>
            ),
            role: (
              <>
                <div className="author-info">
                  <Typography.Title level={5}>
                    {user.roles === 'user' ? 'Người dùng' : 'Quản trị viên'}
                  </Typography.Title>
                </div>
              </>
            ),

            status: (
              <>
                {user.isVerified ? (
                  <Switch
                    defaultChecked
                    style={{ backgroundColor: '#00CED1' }}
                  />
                ) : (
                  <Switch />
                )}
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
  }, [users]);
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
        onCancel={() => setVisibleDelete(false)}
        loading={loading}
        handleDelete={handleConfirmDelete}
        title={'Xóa người dùng'}
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
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  pagination={true}
                  className="ant-border-space"
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
