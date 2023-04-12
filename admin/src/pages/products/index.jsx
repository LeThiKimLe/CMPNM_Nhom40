/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Button,
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
} from 'antd';
import AddProductModal from './components/modal-add';
import { useDispatch, useSelector } from 'react-redux';
import productThunk from '../../features/product/product.service';
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
const columns = [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
    width: '32%',
  },
  {
    title: 'Giá gốc',
    key: 'regularPrice',
    dataIndex: 'regularPrice',
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

const getColorProduct = (product, colors) => {
  let colorName = '';
  const { color, category } = product;
  colors.map((item) => {
    if (item.value === color && item.category == category) {
      colorName = item.name;
    }
  });
  return colorName;
};
function Products() {
  const product = useSelector((state) => state.product);
  const data = useSelector((state) => state.data);
  const { colors, categories } = data;
  const getCategoryById = (id) => {
    let name;
    categories.map((cat) => {
      if (cat._id === id) {
        name = cat.name;
      }
    });
    return name;
  };

  // * useDispatch
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(product.products);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  // *tab mô tả
  const [description, setDescription] = useState('');
  // *tab info
  const [colorSubmit, setColorSubmit] = useState('');
  const [fileList, setFileList] = useState([]);
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const [formEditTabInfo] = Form.useForm();
  const [formEditTabDigital] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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

    const infoValuesForm = formTabInfo.validateFields();
    const digitalValuesForm = formTabDigital.validateFields();
    Promise.all([...listImage, infoValuesForm, digitalValuesForm])
      .then((values) => {
        for (let i = 0; i < fileList.length + 2; i++) {
          if (i < fileList.length) {
            productPictures.push(values[i]);
          }
          infoValues = values[fileList.length];
          digitalValues = values[fileList.length + 1];
        }

        infoValues.color = colorSubmit;
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

        return new Promise((resolve, reject) => {
          resolve(productData);
        });
      })
      .then((result) => {
        return dispatch(productThunk.createAPI(result))
          .unwrap()
          .then(() => {
            notification.success({
              message: 'Tạo sản phẩm thành công',
              placement: 'top',
            });
            setTimeout(() => {
              formTabInfo.resetFields();
              formTabDigital.resetFields();
              setOpenAdd(false);
              dispatch(productThunk.getAllAfterHandle())
                .unwrap()
                .then((value) => {
                  setListProduct(value.list);
                });
            }, 1000);
          });
      })
      .catch((error) => {
        notification.error({
          message: error,
          placement: 'top',
        });
      });
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
        setTimeout(() => {
          setVisibleDelete(false);
          dispatch(productThunk.getAllAfterHandle())
            .unwrap()
            .then((value) => {
              setListProduct(value.list);
            });
        }, 1000);
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
  useEffect(() => {
    if (Object.keys(listProduct).length === 0) {
      dispatch(productThunk.getAllAPI())
        .unwrap()
        .then((value) => {
          setListProduct(value.list);
        });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [dispatch]);
  useEffect(() => {
    if (listProduct.length > 0) {
      setDataTable(
        listProduct.map((product) => {
          return {
            key: product._id,
            name: (
              <>
                <Avatar.Group>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={50}
                    src={product.productPictures[0]}
                  ></Avatar>
                  <div className="avatar-info">
                    <Typography.Title level={5}>
                      {product.name}
                    </Typography.Title>
                    <p>{product._id}</p>
                  </div>
                </Avatar.Group>{' '}
              </>
            ),
            regularPrice: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {formatThousand(product.regularPrice)}đ
                  </Typography.Title>
                </div>
              </>
            ),
            category: (
              <>
                <div className="author-info">
                  <Tag color="cyan">{getCategoryById(product.category)}</Tag>
                </div>
              </>
            ),

            color: (
              <>
                <Tag
                  color={product.color}
                  style={{
                    color: product.color === '#ffffff' ? '#111111' : '#ffffff',
                  }}
                >
                  {getColorProduct(product, colors)}
                </Tag>
              </>
            ),
            stock: (
              <>
                <div className="author-info">
                  <Typography.Title level={5}>{product.stock}</Typography.Title>
                </div>
              </>
            ),
            active: (
              <>
                {product.active ? (
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
                    {new Date(product.createdAt).toLocaleDateString()}
                  </Typography.Title>
                </div>
              </>
            ),
          };
        })
      );
    } else {
      setDataTable([]);
    }
  }, [listProduct]);
  return (
    <>
      <AddProductModal
        loading={product.loading}
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        handleCancel={() => setOpenAdd(false)}
        handleChangeUpload={handleChangeUpload}
        handleAddProduct={handleAddProduct}
        formTabInfo={formTabInfo}
        formTabDigital={formTabDigital}
        colorSubmit={colorSubmit}
        setColorSubmit={setColorSubmit}
        fileList={fileList}
        description={description}
        setDescription={setDescription}
      />
      <ConfirmDelete
        open={visibleDelete}
        onCancel={() => setVisibleDelete(false)}
        loading={product.loading}
        handleDelete={handleConfirmDelete}
        title={'Xóa sản phẩm'}
      />
      <DetailModal
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        productId={selectedRowKeys.length > 0 ? selectedRowKeys[0] : null}
      />
      <ModalEdit
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        formInfo={formEditTabInfo}
        formDigital={formEditTabDigital}
      />
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Title level={3}>Danh sách sản phẩm</Title>
          </Col>
          <Col xs="24" xl={24}>
            <Row>
              <Col span={12}>
                <MenuSearch />
              </Col>
            </Row>
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
                  bgColor="#99cccc"
                  icon={<BiSearchAlt />}
                  title="Tìm kiếm"
                />
              </Col>
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
              {product.getLoading || loading ? (
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
                  dataSource={dataTable}
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

export default Products;
