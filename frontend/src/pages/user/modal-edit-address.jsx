import {
  Select,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Button,
  Checkbox,
  notification,
  Spin,
} from 'antd';
import React, { useState, useEffect } from 'react';
import getAddressAPI from '../../utils/get-details-address';
import { useDispatch, useSelector } from 'react-redux';
import addressThunk from '../../features/address/address.service';
const { Option } = Select;
const ModalEditAddress = (props) => {
  const { open, onCancel, setOpen, item, getAddressList } = props;
  const dispatch = useDispatch();
  const addressUser = useSelector((state) => state.addressUser);
  const [form] = Form.useForm();
  // * list select
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  // * list name select
  const [provinceName, setProvinceName] = useState(item.provinceName);
  const [districtName, setDistrictName] = useState(item.districtName);
  const [wardName, setWardName] = useState(item.districtName);
  // * list value select
  const [provinceId, setProvinceId] = useState(item.provinceId);
  const [districtId, setDistrictId] = useState(item.districtId);
  const [wardCode, setWardCode] = useState(item.wardCode);
  const [name, setName] = useState(item.name);
  const [mobileNumber, setMobileNumber] = useState(item.mobileNumber);
  const [address, setAddress] = useState(item.address);
  const [checkDefault, setCheckDefault] = useState(item.isDefault);
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onCheckboxChange = () => {
    setCheckDefault(!checkDefault);
  };

  const handleChangeProvince = (e) => {
    setProvinceName(listProvince[e].ProvinceName);
    setProvinceId(listProvince[e].ProvinceID);
    getAddressAPI.getAPIDistrict(listProvince[e].ProvinceID).then((data) => {
      setListDistrict(data);
    });
  };
  const handleChangeDistrict = (value) => {
    getAddressAPI.getAPIWard(listDistrict[value].DistrictID).then((data) => {
      setListWard(data);
    });
    setDistrictId(listDistrict[value].DistrictID);
    setDistrictName(listDistrict[value].DistrictName);
  };
  const handleChangeWard = (value) => {
    setWardCode(listWard[value].WardCode);
    setWardName(listWard[value].WardName);
  };
  const handleEditAddress = () => {
    const addressData = {
      name,
      address,
      mobileNumber,
      provinceName,
      provinceId,
      districtName,
      districtId,
      wardCode,
      wardName,
      _id: item._id,
      isDefault: checkDefault,
    };
    dispatch(addressThunk.updateAddressAPI({ address: addressData }))
      .unwrap()
      .then(() => {
        // get All address
        notification.success({ message: 'Cập nhật địa chỉ thành công!' });
        setOpen(false);
        form.resetFields();
        getAddressList();
      });
  };
  useEffect(() => {
    if (open) {
      const {
        name,
        mobileNumber,
        provinceName,
        districtName,
        wardName,
        address,
      } = item;
      form.setFieldsValue({
        name,
        mobileNumber,
        provinceName,
        districtName,
        wardName,
        address,
      });
      getAddressAPI.getAPIProvince().then((data) => {
        setListProvince(data);
      });
    }
  }, [form, item, open]);
  return (
    <Modal
      footer={null}
      open={open}
      onCancel={onCancel}
      title="Cập nhật địa chỉ"
    >
      <Form
        form={form}
        layout="vertical"
        className="row-col"
        autoComplete="off"
        onFinish={handleEditAddress}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            {' '}
            <Form.Item
              className="username"
              label="Tên"
              style={{ fontWeight: '500' }}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên!',
                },
              ]}
              hasFeedback
            >
              <Input
                onChange={(e) => setName(e.target.value)}
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="username"
              label="Số điện thoại"
              style={{ fontWeight: '500' }}
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
              hasFeedback
            >
              <Input
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber ? mobileNumber : ''}
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Tỉnh, Thành phố"
          style={{ fontWeight: '500' }}
          name="provinceName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tỉnh, thành phố!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            value={provinceName ? provinceName : ''}
            size="medium"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => handleChangeProvince(e)}
          >
            {listProvince &&
              listProvince.map((item, index) => (
                <Option size="medium" value={index} key={index}>
                  {item.ProvinceName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Quận, Huyện"
          style={{ fontWeight: '500' }}
          name="districtName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập quận, huyện!',
            },
          ]}
        >
          <Select
            onChange={handleChangeDistrict}
            value={districtName ? districtName : ''}
            showSearch
            optionFilterProp="children"
            size="middle"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {listDistrict &&
              listDistrict.map((item, index) => (
                <Option size="middle" value={index} key={index}>
                  {item.DistrictName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Xã, Phường"
          style={{ fontWeight: '500' }}
          name="wardName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập xã, phường!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="middle"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            value={wardName ? wardName : ''}
            onChange={handleChangeWard}
          >
            {listWard &&
              listWard.map((item, index) => (
                <Option size="middle" value={index} key={index}>
                  {item.WardName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="username"
          label="Địa chỉ cụ thể"
          style={{ fontWeight: '500' }}
          name="address"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ]}
          hasFeedback
        >
          <Input
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item
          className="username"
          style={{ fontWeight: '500' }}
          hasFeedback
        >
          {!item.isDefault ? (
            <Checkbox checked={checkDefault} onChange={onCheckboxChange}>
              Đặt làm địa chỉ mặc định
            </Checkbox>
          ) : null}
        </Form.Item>
        {addressUser.updatingAddress ? (
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
        ) : null}
        <Form.Item>
          <Button
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#40E0D0',
              color: 'white',
              width: '30%',
              marginRight: '10px',
              marginTop: '20px',
            }}
            onClick={handleEditAddress}
          >
            Cập nhật
          </Button>

          <Button
            onClick={handleCancel}
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              background: '#FF6347',
              color: 'white',
              width: '30%',
            }}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditAddress;
