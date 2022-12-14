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
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
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
  const auth = useSelector((state) => state.auth);
  const { colors } = auth.data;
  const { categories } = auth.data;
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
  const [visibleDelete, setVisibleDelete] = useState(false);
  // *tab mô tả
  const [description, setDescription] = useState('');
  // *tab info
  const [colorSubmit, setColorSubmit] = useState('');
  const [fileList, setFileList] = useState([]);
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onCancel = () => {
    setOpenAdd(false);
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
        console.log(productData);
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
      setData(
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
      setData([]);
    }
  }, [listProduct]);
  return (
    <>
      <AddProductModal
        loading={product.loading}
        open={openAdd}
        onCancel={onCancel}
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
              style={{ marginTop: '10px', marginBottom: '20px' }}
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
                  onClick={() => setOpenAdd(true)}
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
                  dataSource={data}
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
