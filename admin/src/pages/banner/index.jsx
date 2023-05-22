import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  Typography,
  Button,
  Form,
  notification,
  Image,
  Spin,
  Table,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import ModalAddBanner from './modal-add';
import { getBase64 } from '../../utils';
import bannerThunk from '../../features/banner/banner.service';
import { bannerActions } from '../../features/banner/banner.slice';
const { Title } = Typography;

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    width: '50%',
  },
  {
    title: 'Ngày tạo',
    key: 'created',
    dataIndex: 'created',
    width: '20%',
  },
];
const Banner = () => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);
  const { getLoading, loading } = banner;
  // * modal add
  const [openAdd, setOpenAdd] = useState(false);
  const [formAdd] = Form.useForm();

  //* banner list
  const [listBanner, setListBanner] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // * banner list

  const onCancelhandle = () => {
    formAdd.resetFields();
    setOpenAdd(false);
  };

  // todo handle add banner
  const onFinishAdd = async (values) => {
    console.log(values);
    const { nameBanner, image } = values;
    const { fileList } = image;
    const picture = await getBase64(fileList[0].originFileObj);
    const bannerData = {
      image: picture,
      nameBanner,
    };
    dispatch(bannerThunk.createAPI(bannerData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Thêm quảng cáo thành công!' });
        formAdd.resetFields();
        dispatch(bannerActions.reset());
        setTimeout(() => {
          setOpenAdd(false);
          dispatch(bannerThunk.getAllAPI())
            .unwrap()
            .then((value) => {
              setListBanner(value.list);
            });
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
  // *modal add

  // * useEffect init
  useEffect(() => {
    dispatch(bannerThunk.getAllAPI())
      .unwrap()
      .then((value) => {
        console.log('list banner', value.list);
        setListBanner(value.list);
      });
  }, [dispatch]);

  // * setData table
  useEffect(() => {
    if (listBanner.length > 0) {
      setData(
        listBanner.map((item, index) => {
          return {
            key: item._id,
            name: (
              <>
                <div className="avatar-info">
                  <Typography.Title level={5}>
                    {item.nameBanner}
                  </Typography.Title>
                  <p>{item._id}</p>
                </div>
              </>
            ),
            image: (
              <>
                {item.image ? (
                  <Image width={130} height={60} src={item.image} />
                ) : null}
              </>
            ),
            created: (
              <>
                <div className="ant-employed">
                  <Typography.Title level={5}>
                    {new Date(item.createdAt).toLocaleDateString()}
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
  }, [listBanner]);

  return (
    <div className="tabled">
      <ModalAddBanner
        open={openAdd}
        onCancel={onCancelhandle}
        form={formAdd}
        onFinish={onFinishAdd}
        handleCancel={onCancelhandle}
        loading={loading}
      />
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Title level={3}>Danh sách quảng cáo</Title>
        </Col>
        <Col xs="24" xl={24}>
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
                icon={<PlusOutlined />}
                onClick={() => setOpenAdd(true)}
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
  );
};

export default Banner;
