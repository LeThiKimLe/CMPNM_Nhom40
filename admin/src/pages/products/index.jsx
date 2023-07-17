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
  Switch,
  Avatar,
  Table,
  Spin,
  Tag,
  Input,
  Space,
  Button,
} from 'antd';
import AddProductModal from './components/modal-add';
import { useDispatch, useSelector } from 'react-redux';
import productThunk from '../../features/product/product.service';
import categoryThunk from '../../features/category/category.service';

import MenuSearch from './components/menu-search';
import { getBase64, formatThousand } from '../../utils';
import ConfirmDelete from '../categories/components/confirm-delete';
import ButtonHandle from '../../components/ui/button';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import DetailModal from './components/modal-detail';
import ModalEdit from './components/modal-edit';
const { Title } = Typography;

const colorList = [
  { name: 'Đỏ', value: 'Red' },
  { name: 'Cam', value: 'Orange' },
  { name: 'Vàng', value: 'Yellow' },
  { name: 'Xanh lá cây', value: 'Green' },
  { name: 'Xanh dương', value: 'Blue' },
  { name: 'Tím', value: 'Purple' },
  { name: 'Hồng', value: 'Pink' },
  { name: 'Nâu', value: 'Brown' },
  { name: 'Xám', value: 'Gray' },
  { name: 'Đen', value: 'Black' },
  { name: 'Trắng', value: 'White' },
];
const getColorProduct = (color) => {
  let colorName = '';
  colorList.map((item) => {
    if (item.value === color) {
      colorName = item.name;
    }
  });
  return colorName;
};
function Products() {
  const [loadingAll, setLoadingAll] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { products, getLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  // * useDispatch

  const [editLoading, setEditLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [visibleDelete, setVisibleDelete] = useState(false);
  // *tab mô tả modal add
  const [openEdit, setOpenEdit] = useState(false);
  const [description, setDescription] = useState('');
  const [fileListEdit, setFileListEdit] = useState([]);
  // *tab modal edit
  const [descriptionEdit, setDescriptionEdit] = useState('');
  // *tab info

  const [fileList, setFileList] = useState([]);
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const [formEditTabInfo] = Form.useForm();
  const [formEditTabDigital] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // * search ten

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'regularPrice',
      key: 'regularPrice',
    },

    {
      title: 'Thương hiệu',
      dataIndex: 'category',
      key: 'category',
    },

    {
      title: 'Màu sắc',
      key: 'color',
      dataIndex: 'color',
    },
    {
      title: 'Số lượng',
      key: 'stock',
      dataIndex: 'stock',
    },
    {
      title: 'Trạng thái',
      key: 'active',
      dataIndex: 'active',
    },
    {
      title: 'Ngày tạo',
      key: 'created',
      dataIndex: 'created',
    },
  ];
  const [initialFileList, setInitialFileList] = useState([]);
  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleChangeUploadEdit = ({ fileList: newFileList }) => {
    setFileListEdit(newFileList);
  };
  const handleOnCancelAdd = () => {
    setOpenAdd(false);
    formTabInfo.resetFields();
    formTabDigital.resetFields();
  };
  const handleOnCancelEdit = () => {
    setOpenEdit(false);
    formEditTabDigital.resetFields();
    formEditTabInfo.resetFields();
  };
  const handleAddProduct = async () => {
    if (fileList.length === 0) {
      notification.error({
        message: 'Vui lòng chọn ảnh',
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
        message: 'Tạo sản phẩm thành công',
        placement: 'top',
      });
      formTabInfo.resetFields();
      formTabDigital.resetFields();
      setOpenAdd(false);
      await dispatch(productThunk.getAllAPI());
    } catch (error) {
      notification.error({
        message: error,
        placement: 'top',
      });
    }
  };

  const handleEditProduct = () => {
    console.log('edit product');
  };
  const handleOpenEditModal = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      notification.error({
        message: 'Vui lòng chỉ chọn một sản phẩm để chỉnh sửa',
        placement: 'top',
      });
    } else {
      setOpenEdit(true);
    }
  };
  const onClickBtnDelete = () => {
    if (selectedRowKeys.length === 0) {
      notification.error({
        message: 'Vui lòng chỉ chọn một sản phẩm để xóa',
        placement: 'top',
      });
    } else {
      setVisibleDelete(true);
    }
  };
  // *delete button handle
  const handleConfirmDelete = () => {
    console.log(selectedRowKeys);
    dispatch(productThunk.deleteProductAPI(selectedRowKeys))
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Xóa tài sản phẩm công!',
          placement: 'top',
        });
      })
      .catch((error) => {
        notification.error({ message: error, placement: 'top' });
      });
  };
  const handleDetailProduct = () => {
    if (selectedRowKeys.length === 0 || selectedRowKeys.length > 1) {
      notification.error({
        message: 'Vui lòng chỉ chọn một sản phẩm để xem',
        placement: 'top',
      });
    } else {
      setOpenDetail(true);
    }
  };

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) {
      return;
    }

    try {
      await dispatch(categoryThunk.getAllAPI());
    } catch (error) {
      console.log(error);
    }
  }, [categories, dispatch]);

  const fetchProducts = useCallback(async () => {
    if (products.length > 0) {
      return;
    }
    try {
      await dispatch(productThunk.getAllAPI());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loaded) {
      setLoadingAll(true);
      Promise.all([fetchCategories(), fetchProducts()]).then(() => {
        setLoadingAll(false);
        setLoaded(true);
      });
    }
  }, [loaded, fetchCategories, fetchProducts]);

  const dataTable = useMemo(() => {
    const getCategoryById = (id) => {
      const categoryItem = categories.find((cat) => cat._id === id);
      return categoryItem ? categoryItem.name : '';
    };

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
        category: (
          <>
            <div className="author-info">
              <Tag color="cyan">{getCategoryById(productItem.category)}</Tag>
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
            {getColorProduct(productItem.color)}
          </Tag>
        ),
        stock: (
          <>
            <div className="author-info">
              <Typography.Title level={5}>{productItem.stock}</Typography.Title>
            </div>
          </>
        ),
        active: (
          <>
            <Switch
              defaultChecked={productItem.active}
              style={{ backgroundColor: '#00CED1' }}
            />
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
      <AddProductModal
        open={openAdd}
        onCancel={handleOnCancelAdd}
        handleCancel={handleOnCancelAdd}
        handleChangeUpload={handleChangeUpload}
        handleAddProduct={handleAddProduct}
        formTabInfo={formTabInfo}
        formTabDigital={formTabDigital}
        fileList={fileList}
        description={description}
        setDescription={setDescription}
      />
      <ModalEdit
        open={openEdit}
        loading={editLoading}
        onCancel={handleOnCancelEdit}
        productId={selectedRowKeys.length > 0 ? selectedRowKeys[0] : null}
        formInfo={formEditTabInfo}
        formDigital={formEditTabDigital}
        handleEditProduct={handleEditProduct}
      />
      <ConfirmDelete
        open={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        handleDelete={handleConfirmDelete}
        title={'Xóa sản phẩm'}
      />
      <DetailModal
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        productId={selectedRowKeys.length > 0 ? selectedRowKeys[0] : null}
      />

      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Title level={3}>Danh sách sản phẩm</Title>
          </Col>
          <Col xs="24" xl={24}>
            <Row
              gutter={[32, 16]}
              style={{
                marginTop: '10px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Col>
                <ButtonHandle
                  bgColor="#93c47d"
                  icon={<HiPlus />}
                  title="Thêm"
                  handle={() => setOpenAdd(true)}
                />
              </Col>
              <Col>
                <ButtonHandle
                  bgColor="#f9cb9c"
                  icon={<AiFillEye />}
                  title="Chi tiết"
                  handle={handleDetailProduct}
                />
              </Col>
              <Col>
                <ButtonHandle
                  bgColor="#3d85c6"
                  icon={<AiFillEdit />}
                  title="Chỉnh sửa"
                  handle={handleOpenEditModal}
                />
              </Col>
              <Col>
                <ButtonHandle
                  bgColor="#e06666"
                  icon={<AiFillDelete />}
                  handle={onClickBtnDelete}
                  title="Xóa"
                />
              </Col>
            </Row>
            <div className="table-responsive" style={{ borderRadius: '10px' }}>
              {loadingAll || getLoading ? (
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
              ) : dataTable && dataTable.length > 0 ? (
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataTable}
                  pagination={true}
                  className="ant-border-space"
                />
              ) : (
                <div>No data</div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Products;
