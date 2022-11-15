import {
  Row,
  Col,
  Image,
  Switch,
  Table,
  Typography,
  Button,
  notification,
  Form,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddCategoryModal from './components/modal-add';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
import EditCategoryModal from './components/modal-edit';
import { getBase64 } from '../../utils';
import ConfirmDelete from '../../components/ui/modal/confirm-delete';
const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
  },
  {
    title: 'Thương hiệu',
    key: 'parentId',
    dataIndex: 'parentId',
  },
  {
    title: 'Logo',
    dataIndex: 'categoryImage',
    key: 'categoryImage',
  },

  {
    title: 'Level',
    key: 'level',
    dataIndex: 'level',
  },
  {
    title: 'Trạng thái',
    key: 'isActive',
    dataIndex: 'isActive',
  },
  {
    title: 'Ngày tạo',
    key: 'created',
    dataIndex: 'created',
  },
];
const { Title } = Typography;
// project table start

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const auth = useSelector((state) => state.auth);
  const { categories } = auth.data;
  const { getLoading } = category;

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [categoryParentList, setCategoryParentList] = useState([]);
  const [categoryParent, setCategoryParent] = useState('');

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listCategory, setListCategory] = useState(categories);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  // TODO Handle after
  const onFinishEditHandle = () => {};
  const handleCancel = () => {
    formAdd.resetFields();
    setVisibleAdd(false);
  };
  const getCategoryById = (listCategory, id) => {
    let name;
    listCategory.map((cat) => {
      if (cat._id === id) {
        name = cat.name;
      }
    });
    return name;
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
    const { name } = values;
    let categoryData = {
      name,
    };
    if (categoryParent !== '') {
      categoryData.parentId = categoryParent;
    }
    if (values.image) {
      const { fileList } = values.image;
      const picture = await getBase64(fileList[0].originFileObj);
      categoryData.picture = picture;
    }

    dispatch(categoryThunk.createAPI(categoryData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Thêm thương hiệu thành công!' });
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
  // *delete button handle
  const handleConfirmDelete = () => {
    console.log(selectedRowKeys);
    dispatch(categoryThunk.deleteCategoryAPI(selectedRowKeys))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Xóa tài khoản thành công!',
          placement: 'top',
        });
        setTimeout(() => {
          setVisibleDelete(false);
          dispatch(categoryThunk.getAllAPI());
        }, 1000);
      })
      .catch((error) => {
        notification.error({ message: error, placement: 'top' });
      });
  };

  useEffect(() => {
    if (listCategory.length === 0) {
      dispatch(categoryThunk.getAllAPI())
        .unwrap()
        .then((value) => {
          setListCategory(value.list);
          setLoading(false);
        });
    }
  }, [dispatch, listCategory]);
  //* watch for changes to the category.categoryies after get all categories
  useEffect(() => {
    if (listCategory.length > 0) {
      setLoading(false);
      const listParent = listCategory.filter(
        (cate) => cate.level === 1 || cate.level === 2
      );

      setCategoryParentList(listParent);
      setCategoryList(
        listCategory.map((category) => {
          return {
            key: category._id,
            name: (
              <>
                <div className="avatar-info">
                  <Typography.Title level={5}>{category.name}</Typography.Title>
                  <p>{category._id}</p>
                </div>
              </>
            ),
            parentId: (
              <>
                {category.parentId ? (
                  <div className="author-info">
                    <Button
                      style={{
                        borderRadius: '20px',
                        backgroundColor: '#F0F8FF',
                      }}
                    >
                      {getCategoryById(listCategory, category.parentId)}
                    </Button>
                  </div>
                ) : null}
              </>
            ),
            categoryImage: (
              <>
                {category.categoryImage ? (
                  <Image width={130} height={60} src={category.categoryImage} />
                ) : null}
              </>
            ),
            level: (
              <>
                <div className="author-info">
                  <Typography.Title level={5}>
                    {category.level}
                  </Typography.Title>
                </div>
              </>
            ),
            isActive: (
              <>
                {category.isActive ? (
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
                    {new Date(category.createdAt).toLocaleDateString()}
                  </Typography.Title>
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setCategoryList([]);
    }
  }, [listCategory]);

  return (
    <>
      <AddCategoryModal
        handleCancel={handleCancel}
        form={formAdd}
        loading={loading}
        onFinish={handleAddCategory}
        visible={visibleAdd}
        onCancel={() => setVisibleAdd(false)}
        setCategoryParent={setCategoryParent}
        categoriesParent={categoryParentList}
      />
      <EditCategoryModal
        handleCancel={handleCancel}
        form={formEdit}
        loading={loading}
        onFinish={onFinishEditHandle}
        visible={visibleEdit}
        onCancel={() => setVisibleEdit(false)}
      />
      <ConfirmDelete
        visible={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        loading={loading}
        handleDelete={handleConfirmDelete}
        title={'Xóa thương hiệu'}
      />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Title level={3}>Danh sách Thương hiệu</Title>
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
                  onClick={onClickBtnDelete}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
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
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={categoryList}
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

export default ListCategories;
