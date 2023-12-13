/* eslint-disable array-callback-return */
import React, {useState, useEffect, useMemo, useCallback} from 'react';
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
    Tag, Card,
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import avatar from '../../assets/images/avatar.jpg';
import AddUserModal from './components/modal-add';
import {useDispatch, useSelector} from 'react-redux';
import {getBase64} from '../../utils';
import userThunk from '../../features/users/user.service';
import {userActions} from '../../features/users/user.slice';
import EditUserModel from './components/modal-edit';
import ConfirmDeleteUser from './components/modal-delete';

const {Title} = Typography;

function Users() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const {loading, getLoading} = user;
    const [listUser, setListUser] = useState(user.users);
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // form
    const [formAdd] = Form.useForm();
    const [formEdit] = Form.useForm();

    // table code start
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '32%',
        },
        {
            title: 'Phone number',
            key: 'contactNumber',
            dataIndex: 'contactNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },

        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Created',
            key: 'created',
            dataIndex: 'created',
        },
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const getAllUserCallback = useCallback(() => {
        dispatch(userThunk.getAllUserAPI())
            .unwrap()
            .then((value) => {
                setListUser(value.list);
            });
    }, [dispatch]);
    // *delete button handle
    const handleConfirmDelete = () => {
        dispatch(userThunk.deleteUsersAPI(selectedRowKeys))
            .unwrap()
            .then(() => {
                notification.success({
                    message: 'Delete user successfully!',
                    placement: 'top',
                });
                setTimeout(() => {
                    getAllUserCallback();
                    setVisibleDelete(false);
                }, 1000);
            })
            .catch((error) => {
                notification.error({message: error, placement: 'top'});
            });
    };
    const onClickBtnDelete = () => {
        if (selectedRowKeys.length === 0) {
            notification.error({
                message: 'Please select a field to edit',
                placement: 'top',
            });
        } else {
            setVisibleDelete(true);
        }
    };
    const onClickBtnEdit = () => {
        if (selectedRowKeys.length === 0) {
            notification.error({
                message: 'Please select a field to edit',
                placement: 'top',
            });
        } else if (selectedRowKeys.length > 1) {
            notification.error({
                message: 'Please select only one field to edit',
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
    const onCancelAddUser = () => {
        setVisibleAdd(false);
        formAdd.resetFields();
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
            userData = {...values};
        }

        dispatch(userThunk.createUserAPI(userData))
            .unwrap()
            .then(() => {
                notification.success({message: 'Create user successfully!'});
                formAdd.resetFields();
                dispatch(userActions.reset());

                setTimeout(() => {
                    setVisibleAdd(false);
                    getAllUserCallback();
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
                dispatch(userActions.reset());
            });
    };
    //* get all users initial

    useEffect(() => {
        getAllUserCallback();
    }, [getAllUserCallback]);
    const data = useMemo(() => {
        if (listUser.length > 0) {
            return listUser.map((user, index) => ({
                key: user._id,
                index: (
                    <>
                        <div>
                            <Typography.Title level={5}>{index + 1}</Typography.Title>
                        </div>
                    </>
                ),
                name: (
                    <>
                        <Avatar.Group>
                            <div>
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
                        <div>
                            <Typography.Title level={5}>
                                {!user.contactNumber ? 'Not update' : user.contactNumber}
                            </Typography.Title>
                        </div>
                    </>
                ),
                role: (
                    <>
                        <div>
                            <Typography.Title level={5}>
                                {user.roles === 'user' ? (
                                    <Tag color="orange">User</Tag>
                                ) : (
                                    <Tag color="blue">Admin</Tag>
                                )}
                            </Typography.Title>
                        </div>
                    </>
                ),
                status: (
                    <>
                        {user.isVerified ? (
                            <Switch defaultChecked style={{backgroundColor: '#00CED1'}}/>
                        ) : (
                            <Switch/>
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
            }));
        } else {
            return [];
        }
    }, [listUser]);
    return (
        <>
            <ConfirmDeleteUser
                open={visibleDelete}
                title="Delete user"
                loading={loading}
                onCancel={() => setVisibleDelete(false)}
                handleDelete={handleConfirmDelete}
            />
            <AddUserModal
                handleCancel={onCancelAdd}
                form={formAdd}
                loading={loading}
                onFinish={handleAddUser}
                visible={visibleAdd}
                onCancel={onCancelAddUser}
                beforeUpload={beforeUploadHandler}
            />
            <EditUserModel
                visible={visibleEdit}
                form={formEdit}
                onCancel={() => setVisibleEdit(false)}
            />

            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col span={24} md={24} className="mb-24">
                        <Card
                            bordered={true}
                            className="criclebox tablespace mb-24 "
                            style={{marginBottom: '5px'}}
                        >
                            <Row
                                gutter={[32, 16]}
                                className="button-row"
                                style={{marginLeft: '5px'}}
                            >
                                <Col>
                                    <Button
                                        className="add-button"
                                        onClick={() => setVisibleAdd(true)}
                                    >
                                        Add
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="add-button" onClick={onClickBtnEdit}>Edit</Button>
                                </Col>
                                <Col>
                                    <Button className="delete-button" onClick={onClickBtnDelete}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[24, 0]}>
                    <Col span={24} md={24} className="mb-24">
                        <Card
                            bordered={true}
                            className="criclebox tablespace mb-24"
                            title="Categories"
                        >
                            <div className="table-responsive">
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={data}
                                    pagination={true}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Users;
