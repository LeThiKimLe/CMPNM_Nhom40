import {
  Row,
  Col,
  Card,
  Image,
  Switch,
  Statistic,
  Typography,
  Button,
  notification,
  Form,
  Spin,
  Space,
} from 'antd';
import {
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddCategoryModal from './components/modal-add';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
import EditCategoryModal from './components/modal-edit';
import ConfirmDeleteModal from './components/modal-delete';
import { getBase64 } from '../../utils';

const { Title } = Typography;
const { Meta } = Card;
// project table start

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const { loading, getLoading } = category;

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [keySelected, setKeySelected] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  // TODO Handle after
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
      .unwrap()
      .then(() => {
        notification.success({ message: 'Category created successfully' });
        formAdd.resetFields();
        dispatch(categoryActions.reset());
        setTimeout(() => {
          setVisibleAdd(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch((error) => {
        formAdd.setFields([
          {
            name: 'name',
            errors: [error],
          },
        ]);
      });
  };
  // todo handle delete event
  const handleDeleteCategory = () => {
    dispatch(categoryThunk.deleteCategoryAPI(keySelected))
      .then(() => {
        notification.success({ message: 'Category delete successfully' });
        dispatch(categoryActions.reset());
        setTimeout(() => {
          setVisibleDelete(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch(() => {
        notification.success({ message: 'Delete category error' });
      });
  };
  useEffect(() => {
    dispatch(categoryThunk.getAllAPI());
  }, [dispatch]);
  //* watch for changes to the category.categoryies after get all categories
  useEffect(() => {
    if (category.categories.length > 0) {
      setCategoryList(category.categories);
    } else {
      setCategoryList([]);
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
            <Title level={3}>Danh sách Nhãn Hiệu</Title>
          </Col>
          <Col xs="24" xl={24}>
            <Row>
              <Col span={12}>
                <p>Tiep</p>
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
                <Row gutter={[8, 8]}>
                  {category.categories.map((category, i) => {
                    return (
                      <Col span={4}>
                        <Card
                          key={category._id}
                          style={{
                            borderRadius: '10px',
                            padding: '20px 20px 0px',
                            background: '#F0F8FF',
                          }}
                          cover={
                            <Image
                              src={category.categoryImage}
                              height={80}
                              alt={category.name}
                              style={{ borderRadius: '10px' }}
                            />
                          }
                          actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="delete" />,
                          ]}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Title level={4}>{category.name}</Title>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ListCategories;
