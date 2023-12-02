/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Form,
  notification,
  Row,
  Col,
  Typography,
  Avatar,
  Table,
  Tabs,
  Tag,
  Button,
  Drawer,
  Card,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import productThunk from '../../features/product/product.service';
import categoryThunk from '../../features/category/category.service';

import { getBase64, formatThousand } from '../../utils';
import ConfirmDelete from '../categories/components/confirm-delete';
import DetailModal from './components/modal-detail';
import TabDescription from './components/component-add/tab-description';
import TabDigital from './components/component-add/tab-digital';
import TabInfo from './components/component-add/tab-info';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '32%',
  },
  {
    title: 'Regular price',
    dataIndex: 'regularPrice',
    key: 'regularPrice',
  },
  {
    title: 'Sale price',
    dataIndex: 'salePrice',
    key: 'salePrice',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: '10%',
  },
  {
    title: 'Attribute',
    key: 'attribute',
    dataIndex: 'attribute',
    width: '5%',
  },
  {
    title: 'Color',
    key: 'color',
    dataIndex: 'color',
    width: '5%',
  },
  {
    title: 'Stock',
    key: 'stock',
    dataIndex: 'stock',
    width: '5%',
  },
  {
    title: 'Created at',
    key: 'created',
    dataIndex: 'created',
    width: '7%',
  },
];
function Products() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);

  const showAdd = () => {
    setVisibleAdd(true);
  };

  // * handle delete product
  const handleConfirmDelete = () => {
    dispatch(productThunk.deleteProductAPI(selectedRowKeys))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Delete product successfully!',
          placement: 'top',
        });
        setVisibleDelete(false);
        fetchProducts();
      })
      .catch((error) => {
        notification.error({ message: error, placement: 'top' });
      });
  };
  // * on click button delete
  const onClickBtnDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Please select only one product to delete',
        placement: 'top',
      });
    } else {
      setVisibleDelete(true);
    }
  };

  // * handle detail product
  const handleDetailProduct = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      notification.warning({
        message: 'Please select only one product to see',
        placement: 'top',
      });
    } else {
      setVisibleDetail(true);
    }
  };

  // * handle row change
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [description, setDescription] = useState('');
  // * form add
  const [fileList, setFileList] = useState([]);
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const handleOnCancelAdd = () => {
    formTabInfo.resetFields();
    formTabDigital.resetFields();
    setVisibleAdd(false);
  };
  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleAddProduct = async () => {
    if (fileList.length === 0) {
      notification.error({
        message: 'Please select image',
        placement: 'top',
      });
      return;
    }

    let productPictures = [];
    let productData = {};
    let listImage = [];
    let infoValues, digitalValues;
    fileList.forEach((file, index) => {
      const image = getBase64(file.originFileObj);
      listImage.push(image);
    });

    try {
      infoValues = await formTabInfo.validateFields();
      digitalValues = await formTabDigital.validateFields();
      for (let i = 0; i < fileList.length; i++) {
        productPictures.push(await listImage[i]);
      }

      if (!infoValues.sale) {
        infoValues.sale = 0;
      } else {
        infoValues.sale = parseInt(infoValues.sale);
      }
      infoValues.productPictures = productPictures;

      productData = {
        info: infoValues,
        digital: digitalValues,
        description,
      };
      delete infoValues.image;
      console.log(productData);

      await dispatch(productThunk.createAPI(productData)).unwrap();

      notification.success({
        message: 'Create product successfully!',
        placement: 'top',
      });
      formTabInfo.resetFields();
      formTabDigital.resetFields();
      setVisibleAdd(false);
      await dispatch(productThunk.getAllAPI());
    } catch (error) {
      notification.error({
        message: error,
        placement: 'top',
      });
    }
  };
  // *
  const listTabs = [
    {
      key: '1',
      label: 'Information',
      children: (
        <TabInfo
          form={formTabInfo}
          handleChangeUpload={handleChangeUpload}
          fileList={fileList}
        />
      ),
    },
    {
      key: '2',
      label: 'Digital',
      children: <TabDigital form={formTabDigital} />,
    },
    {
      key: '3',
      label: 'Description',
      children: (
        <TabDescription
          setDescription={setDescription}
          description={description}
        />
      ),
    },
  ];
  const fetchCategories = useCallback(async () => {
    try {
      await dispatch(categoryThunk.getAllAPI());
    } catch (error) {
      console.log(error);
    }
  }, [categories, dispatch]);

  const fetchProducts = useCallback(async () => {
    try {
      await dispatch(productThunk.getAllAPI());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loaded) {
      Promise.all([fetchCategories(), fetchProducts()]).then(() => {
        setLoaded(true);
      });
    }
  }, [loaded, fetchCategories, fetchProducts]);

  const dataTable = useMemo(() => {
    return products.map((productItem) => {
      return {
        key: productItem._id,
        name: (
          <>
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="square"
                size={50}
                src={productItem.productPictures[0]}
              ></Avatar>
              <div className="avatar-info">
                <Typography.Title level={5}>
                  {productItem.name}
                </Typography.Title>
                <p>{productItem._id}</p>
              </div>
            </Avatar.Group>{' '}
          </>
        ),
        regularPrice: (
          <>
            <div className="ant-employed">
              <Typography.Title level={5}>
                {formatThousand(productItem.regularPrice)}đ
              </Typography.Title>
            </div>
          </>
        ),
        salePrice: (
          <>
            <div className="ant-employed">
              <Typography.Title level={5}>
                {formatThousand(productItem.salePrice)}đ
              </Typography.Title>
            </div>
          </>
        ),
        category: (
          <>
            <div className="author-info">
              <Tag color="cyan">{productItem.category_path[2].name}</Tag>
            </div>
          </>
        ),
        attribute: (
          <>
            <div className="author-info">
              <Tag color="cyan">
                {productItem.ram} - {productItem.storage}
              </Tag>
            </div>
          </>
        ),
        color: (
          <Tag
            color={productItem.color}
            style={{
              backgroundColor: productItem.color,
              color: productItem.color === 'White' ? '#111111' : '#ffffff',
            }}
          >
            {productItem.color}
          </Tag>
        ),
        stock: (
          <>
            <div className="author-info">
              <Typography.Title level={5}>{productItem.stock}</Typography.Title>
            </div>
          </>
        ),
        created: (
          <>
            <div className="ant-employed">
              <Typography.Title level={5}>
                {new Date(productItem.createdAt).toLocaleDateString()}
              </Typography.Title>
            </div>
          </>
        ),
      };
    });
  }, [categories, products]);

  return (
    <>
      <ConfirmDelete
        open={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        handleDelete={handleConfirmDelete}
        title={'Delete product'}
      />
      <DetailModal
        open={visibleDetail}
        onCancel={() => setVisibleDetail(false)}
        productId={selectedRowKeys.length > 0 ? selectedRowKeys[0] : null}
      />
      <Drawer
        width={400}
        title="Add new product"
        placement="right"
        onClose={handleOnCancelAdd}
        open={visibleAdd}
      >
        <Row className="custom-row">
          <Tabs defaultActiveKey="1" size="large" items={listTabs} />
        </Row>
        <Row className="custom-row-button" style={{ marginTop: '10px' }}>
          <Button className="add-button" onClick={handleAddProduct}>
            Add
          </Button>
          <Button className="search-button" onClick={handleOnCancelAdd}>
            Cancel
          </Button>
        </Row>
      </Drawer>
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
                  <Button
                    className="search-button"
                    onClick={handleDetailProduct}
                  >
                    Detail
                  </Button>
                </Col>
                <Col>
                  <Button className="add-button" onClick={showAdd}>
                    Add
                  </Button>
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
          <Col span={24} md={24} className="mb-24">
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Products"
            >
              <div className="table-responsive">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataTable}
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

export default Products;
