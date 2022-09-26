import React, { useState } from 'react';
import { Row, Col, Card, Button, Input, Avatar, Table, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import face2 from '../../assets/images/face-2.jpg';
import AddUserModal from './components/modal-add';
import MenuSearch from './components/menu-search';
const { Title } = Typography;
function Users() {
  const [visibleAdd, setVisibleAdd] = useState(false);
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
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <>
          <Space size="middle">
            <Button style={{ background: '#40E0D0', color: 'white' }}>Edit</Button>
            <Button style={{ background: '#FF6347', color: 'white' }}>Delete</Button>
          </Space>
        </>
      ),
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
            ACTIVE
          </Button>
        </>
      ),
    },
  ];
  const onCancelAdd = () => {
    setVisibleAdd(false);
  };
  return (
    <>
      <AddUserModal visible={visibleAdd} onCancel={onCancelAdd} />
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
            <Row gutter={[32, 8]}>
              <Col>
                <Button onClick={() => setVisibleAdd(true)} type="primary" icon={<PlusOutlined />}>
                  Add
                </Button>
              </Col>
              <Col>
                <Button onClick={() => setVisibleAdd(true)} type="primary" icon={<PlusOutlined />}>
                  Add
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} pagination={true} className="ant-border-space" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
