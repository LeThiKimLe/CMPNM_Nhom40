
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Avatar,
  Table,
  Typography,
  Space,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import face2 from "../../assets/images/face-2.jpg";
import AddUserModal from "./components/modal-add";
import MenuSearch from "./components/menu-search";
import { getBase64 } from '../../utils';
import userThunk from '../../features/users/user.service';
sssssssssssssssssssssssssssssssssssssssss
const { Title } = Typography;
function Users() {
  const dispatch = useDispatch();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [loadingUplaod, setLoadingUplaod] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  // table code start
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Số điện thoại",
      key: "contactNumber",
      dataIndex: "contactNumber",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
    },

    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <>
          <Space size="middle">
            <Button style={{ background: "#40E0D0", color: "white" }}>
              Edit
            </Button>
            <Button style={{ background: "#FF6347", color: "white" }}>
              Delete
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={50}
              src={face2}
            ></Avatar>
            <div className="avatar-info">
              <Typography.Title level={5}>Nguyen Bui Tiep</Typography.Title>
              <p>michael@mail.com</p>
            </div>
          </Avatar.Group>{" "}
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
  const beforeUploadHandler = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    return isJpgOrPng;
  };
  const onChangeUploadHandler = async (file) => {
    const picture = await getBase64(file.fileList[0].originFileObj);
    dispatch(userThunk.uploadImageAPI(picture))
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        notification.success({ message: 'Create Category error' });
      });
  };
  return (
    <>
      <AddUserModal visible={visibleAdd} onCancel={onCancelAdd} loading={loadingUplaod} imageUrl={imageUrl} beforeUpload={beforeUploadHandler} handleChange={onChangeUploadHandler} />
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

                <Button
                  style={{
                    background: "#FFB266",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    background: "#00994C",
                    color: "white",
                    borderRadius: "10px",
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
                    background: "#0066CC",
                    color: "white",
                    //border: "1px solid #C0C0C0",
                    borderRadius: "10px",
                  }}
                  icon={<EditOutlined />}
                  onClick={() => setVisibleAdd(true)} icon={<PlusOutlined />}sssssssssssssssss
                >
                  Chỉnh sửa
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    background: "#FF3333",
                    color: "white",
                    borderRadius: "10px",
                  }}
                  icon={<DeleteOutlined />}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table
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
