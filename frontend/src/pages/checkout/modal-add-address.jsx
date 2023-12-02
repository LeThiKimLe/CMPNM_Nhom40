import {
  Select,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  notification,
  Spin,
} from 'antd';
import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import getAddressAPI from '../../utils/get-details-address';
import { useDispatch, useSelector } from 'react-redux';
import addressThunk from '../../features/address/address.service';
import MDButton from '../../components/MDButton';
const { Option } = Select;
const ModalAddAddress = (props) => {
  const { open, onCancel, setOpen, getAddressList } = props;
  const dispatch = useDispatch();
  const addressUser = useSelector((state) => state.addressUser);
  const [form] = Form.useForm();
  // * list select
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  // * list name select
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  // * list value select
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [checkDefault, setCheckDefault] = useState(false);

  const onSearch = (value) => {
    console.log('search:', value);
  };
  const handleCancel = () => {
    form.resetFields();
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
  const handleAddAddress = () => {
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
      isDefault: checkDefault,
    };
    dispatch(addressThunk.addAddressAPI({ address: addressData }))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Add new address successfully!' });
        setOpen(false);
        form.resetFields();
        getAddressList();
      });
  };
  useEffect(() => {
    getAddressAPI.getAPIProvince().then((data) => {
      setListProvince(data);
    });
  }, []);
  return (
    <Modal
      footer={null}
      open={open}
      onCancel={onCancel}
      title="Add new address"
    >
      <Form
        form={form}
        layout="vertical"
        className="row-col"
        autoComplete="off"
        onFinish={handleAddAddress}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            {' '}
            <Form.Item
              className="username"
              label="Name"
              style={{ fontWeight: '500' }}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter name!',
                },
              ]}
              hasFeedback
            >
              <Input
                value={name ? name : ''}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="username"
              label="Phone number"
              style={{ fontWeight: '500' }}
              name="mobileNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter the phone number!',
                },
              ]}
              hasFeedback
            >
              <Input
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber ? mobileNumber : ''}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Province, City"
          style={{ fontWeight: '500' }}
          name="provinceName"
          rules={[
            {
              required: true,
              message: 'Please enter province or city!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            value={provinceName ? provinceName : ''}
            size="medium"
            onSearch={onSearch}
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
          label="District, District"
          style={{ fontWeight: '500' }}
          name="districtName"
          rules={[
            {
              required: true,
              message: 'Please enter a district!',
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
          label="Commune, Ward"
          style={{ fontWeight: '500' }}
          name="wardName"
          rules={[
            {
              required: true,
              message: 'Please enter commune, ward!',
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="middle"
            onSearch={onSearch}
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
          label="Specific address"
          style={{ fontWeight: '500' }}
          name="address"
          rules={[
            {
              required: true,
              message: 'Please enter an address!',
            },
          ]}
          hasFeedback
        >
          <Input
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="username"
          style={{ fontWeight: '500' }}
          name="isDefault"
          hasFeedback
        >
          <Checkbox checked={checkDefault} onChange={onCheckboxChange}>
            Set as default address
          </Checkbox>
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{
              marginTop: '20px',
            }}
          >
            <MDButton
              size="small"
              color="light"
              sx={{
                textTransform: 'initial !important',
                fontWeight: '600',
                color: '#4d69fa',
                backgroundColor: '#edf0ff',
                borderRadius: '8px',
                boxShadow: '#dbd9d9 5px 5px 5px 5px',
              }}
              onClick={handleAddAddress}
            >
              Add
            </MDButton>
            <MDButton
              size="small"
              color="light"
              sx={{
                textTransform: 'initial !important',
                fontWeight: '600',
                color: '#f35421',
                backgroundColor: '#feeee9',
                borderRadius: '8px',
                boxShadow: '#dbd9d9 5px 5px 5px 5px',
              }}
              onClick={handleCancel}
            >
              Back
            </MDButton>
          </Stack>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddAddress;
