import {
  Row,
  Col,
  Card,
  Table,
  Switch,
  Image,
  Typography,
  Button,
  notification,
  Form,
  Spin,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import AddCategoryModal from './components/modal-add';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
import EditCategoryModal from './components/modal-edit';
import ConfirmDeleteModal from './components/modal-delete';
import { getBase64 } from '../../utils';

const { Title } = Typography;

// project table start

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const { loading, getLoading, success, get } = category;

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [keySelected, setKeySelected] = useState("");
  const [data, setData] = useState([]);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const onFinishEditHandle = () => {};

  const handleCancel = () => {
    formAdd.resetFields();
    setVisibleAdd(false);
  };
  const renderDataInEdit = (editKey) => {
    let categoryEdit;
    category.categories.map((category) => {
      if (category._id === editKey) {
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
  // todo create Category
  const handleAddCategory = async (values) => {
    const { name, image } = values;
    const { fileList } = image;
    const picture = await getBase64(fileList[0].originFileObj);
    const categoryData = {
      name,
      picture,
    };
    dispatch(categoryThunk.createAPI(categoryData))
      .then(() => {
        notification.success({ message: "Category created successfully" });
        formAdd.resetFields();
        dispatch(categoryActions.reset());
        setTimeout(() => {
          setVisibleAdd(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch(() => {
        notification.success({ message: "Create Category error" });
      });
  };
  // todo handle delete event
  const handleDeleteCategory = () => {
    dispatch(categoryThunk.deleteCategoryAPI(keySelected))
      .then(() => {
        notification.success({ message: "Category delete successfully" });
        dispatch(categoryActions.reset());
        setTimeout(() => {
          setVisibleDelete(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch(() => {
        notification.success({ message: "Create Category error" });
      });
  };
  // table code start
  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: "20%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "40%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <>
          <Space size="middle">
            <Button
              onClick={() => {
                setVisibleEdit(true);
                setKeySelected(record.key);
                renderDataInEdit(record.key);
              }}
              style={{
                background: "#40E0D0",
                color: "white",
                border: "1px solid #C0C0C0",
                borderRadius: "10px",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setVisibleDelete(true);
                setKeySelected(record.key);
              }}
              style={{
                background: "#FF6347",
                color: "white",
                border: "1px solid #C0C0C0",
                borderRadius: "10px",
              }}
            >
              Delete
            </Button>
          </Space>
        </>
      ),
    },
  ];
  //* get all categories initial
  useEffect(() => {
    dispatch(categoryThunk.getAllAPI());
  }, [dispatch]);

  //* watch for changes to the category.categoryies after get all categories
  useEffect(() => {
    if (category.categories.length > 0) {
      setData(
        category.categories.map((category, index) => {
          return {
            key: category._id,
            logo: (
              <Image
                width={80}
                height={40}
                src={category.categoryImage}
                style={{ margin: "0 12px 0 0", paddingTop: 10, float: "left" }}
              />
            ),
            name: (
              <>
                <div className="avatar-info">
                  <Title level={4}>{category.name}</Title>
                </div>
              </>
            ),
            status: (
              <>
                <div className="ant-employed">
                  {category.isActive ? <Switch defaultChecked /> : <Switch />}
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setData([]);
    }
  }, [category.categories]);
  return (
    <>
      <AddCategoryModal
        handleCancel={handleCancel}
        form={formAdd}
        loading={loading}
        onFinish={handleAddCategory}
        visible={visibleAdd}
        onCancel={() => setVisibleAdd(false)}
      />
      <EditCategoryModal
        handleCancel={handleCancel}
        form={formEdit}
        loading={loading}
        onFinish={onFinishEditHandle}
        visible={visibleEdit}
        onCancel={() => setVisibleEdit(false)}
      />
      <ConfirmDeleteModal
        loading={loading}
        visible={visibleDelete}
        handleDelete={handleDeleteCategory}
        onCancel={() => setVisibleDelete(false)}
      />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="List Categories"
              extra={
                <Row>
                  <Col>
                    <Button
                      style={{
                        color: "white",
                        border: "1px solid #C0C0C0",
                        borderRadius: "10px",
                      }}
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setVisibleAdd(true)}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              }
            >
              <div className="table-responsive">
                {getLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "20px",
                    }}
                  >
                    <Spin size="large" />
                  </div>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={true}
                    className="ant-border-space"
                  />
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
