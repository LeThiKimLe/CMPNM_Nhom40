import {
  Row,
  Col,
  Image,
  Table,
  Typography,
  Button,
  notification,
  Form,
  Tag,
  Upload,
  Card,
  Select,
  Input,
} from 'antd';

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import categoryThunk from '../../features/category/category.service';
import { categoryActions } from '../../features/category/category.slice';
import { getBase64 } from '../../utils';
const { Option } = Select;
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
    width: '15%',
  },
  {
    title: 'Category',
    key: 'parentId',
    dataIndex: 'parentId',
  },
  {
    title: 'Logo',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Created at',
    key: 'created',
    dataIndex: 'created',
  },
];

function ListCategories() {
  // modal visible
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const { categories, getLoading } = category;

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [listCategoryParent, setListCategoryParent] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listCategory, setListCategory] = useState(categories);

  const [fileList, setFileList] = useState([]);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [formAdd] = Form.useForm();

  const handleCategoryParent = (value) => {
    setParentId(value);
  };

  const handleFileUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleClearAddForm = () => {
    setName('');
    setFileList([]);
    setParentId('');
  };

  // TODO Handle after
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
  // todo create Category
  const handleAddCategory = async (values) => {
    const { name, parentId } = values;
    let categoryData = {
      name,
    };
    if (parentId !== '') {
      categoryData.parentId = parentId;
    }
    if (fileList.length > 0) {
      const picture = await getBase64(fileList[0].originFileObj);
      categoryData.picture = picture;
    }
    dispatch(categoryThunk.createAPI(categoryData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Add category successfully!' });
        dispatch(categoryActions.reset());
        fetchCategories();
      })
      .catch((error) => {
        notification.success({ message: error });
      })
      .finally(() => {
        handleClearAddForm();
      });
  };
  // todo handle delete event
  const onClickBtnDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Please select a field to delete!',
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
          message: 'Delete category successfully!',
          placement: 'top',
        });
        fetchCategories();
      })
      .catch((error) => {
        notification.error({ message: error, placement: 'top' });
      });
  };
  const fetchCategories = useCallback(async () => {
    const value = await dispatch(categoryThunk.getAllAPI()).unwrap();
    setListCategory(value.list);
    console.log(value.list);
    if (value.list.length > 0) {
      const list = value.list.filter(
        (item) => item.level === 1 || item.level === 2
      );
      setListCategoryParent(list);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (listCategory.length > 0) {
      setCategoryList(
        listCategory.map((category, index) => ({
          key: category._id,
          index: (
            <>
              <Typography.Title level={5}>{index + 1}</Typography.Title>
            </>
          ),
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
              {category.parent ? (
                <Tag color="volcano">{category.parent.name}</Tag>
              ) : null}
            </>
          ),
          image: (
            <>
              {category.image ? (
                <Image width={80} height={50} src={category.image} />
              ) : null}
            </>
          ),

          created: (
            <>
              <Typography.Title level={5}>
                {new Date(category.createdAt).toLocaleDateString()}
              </Typography.Title>
            </>
          ),
        }))
      );
    } else {
      setCategoryList([]);
    }
  }, [listCategory]);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col span={24} md={24} className="mb-24">
            <Card
              bordered={true}
              className="criclebox tablespace mb-24 "
              style={{ marginBottom: '5px' }}
            >
              <Row
                gutter={[32, 16]}
                className="button-row"
                style={{ marginLeft: '5px' }}
              >
                <Col>
                  <Button className="search-button">Search</Button>
                </Col>
                <Col>
                  <Button className="add-button">Edit</Button>
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
          <Col span={24} md={16} className="mb-24">
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Categories"
            >
              <div className="table-responsive">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={categoryList}
                  pagination={true}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={true}
              title="Create new category"
            >
              <Form form={formAdd} onFinish={handleAddCategory}>
                <Form.Item
                  name="name"
                  className="input-product"
                  sx={{
                    width: "100%"
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the category name!',
                    },
                  ]}
                >
                  <Input placeholder="category name" />
                </Form.Item>
                <Form.Item
                  name="parentId"
                  size="large"
                  className="custom-selector"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter category!',
                    },
                  ]}
                >
                  <Select
                    placeholder="select a category parent"
                    showSearch
                    size="large"
                    optionFilterProp="children"
                    onChange={handleCategoryParent}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {listCategoryParent.length > 0
                      ? listCategoryParent.map((category) => {
                          return (
                            <Option key={category._id} value={category._id}>
                              {category.name}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item name="image">
                  <Upload
                    beforeUpload={() => {
                      return false;
                    }}
                    accept=".png, .jpeg, .jpg"
                    fileList={fileList}
                    onChange={handleFileUpload}
                    multiple={true}
                    listType="picture-card"
                  >
                    <PlusOutlined />
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Row className="custom-row-button">
                    <Button className="add-button" htmlType="submit">
                      Add
                    </Button>
                    <Button className="search-button">Cancel</Button>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ListCategories;
