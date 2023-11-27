import { Modal, notification } from 'antd';
import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
// * start import form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// * end import form
import getAddressAPI from '../../utils/get-details-address';

import addressThunk from '../../features/address/address.service';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDTypography from '../../components/MDTypography';
import './style.css';
import AddressInputItem from './address-input-item';

const ModalAddAddress = (props) => {
  const { open, onCancel, setOpen, getAddressList } = props;
  const dispatch = useDispatch();
  // * validation schema add address
  const addAddressValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter name'),
    mobileNumber: Yup.string()
      .required('Please enter a phone number')
      .matches(/^(?:\+84|0)(?:\d{9,10})$/, 'Please enter a valid phone number'),
    provinceName: Yup.string().required('Please select province name!'),
    districtName: Yup.string().required('Please select district name'),
    wardName: Yup.string().required('Please select ward name'),
    address: Yup.string().required('Please enter detail address'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addAddressValidationSchema) });
  // * end validation schema add address
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  // * list id
  const [provinceID, setProvinceID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [wardCode, setWardCode] = useState('');
  // * end list id

  // * list select
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  // * list name select
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  // * list value select
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const resetForm = () => {
    setName('');
    setMobileNumber('');
    setAddress('');
    setListProvince([]);
    setProvinceID('');
    setProvinceName('');
    setDistrictID('');
    setDistrictName('');
    setWardCode('');
    setWardName('');
    setChecked(false);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeProvince = (e) => {
    const province = e.target.value;
    const provinceObject = _.find(listProvince, { ProvinceName: province });
    setProvinceName(provinceObject.ProvinceName);
    setProvinceID(provinceObject.ProvinceID);
    getAddressAPI.getAPIDistrict(provinceObject.ProvinceID).then((data) => {
      setListDistrict(data);
      setDistrictName('');
      setDistrictID('');
    });
  };
  const handleChangeDistrict = (e) => {
    const district = e.target.value;
    const provinceObject = _.find(listDistrict, { DistrictName: district });
    setDistrictName(provinceObject.DistrictName);
    setDistrictID(provinceObject.DistrictID);
    getAddressAPI.getAPIWard(provinceObject.DistrictID).then((data) => {
      setListWard(data);
      setWardCode('');
      setWardName('');
    });
  };
  const handleChangeWard = (e) => {
    const ward = e.target.value;
    const wardObject = _.find(listWard, { WardName: ward });
    setWardCode(wardObject.WardCode);
    setWardName(wardObject.WardName);
  };
  const handleAddAddress = (data) => {
    const addressData = {
      ...data,
      provinceID,
      districtID,
      wardCode,
      isDefault: checked,
    };
    console.log(addressData);
    dispatch(addressThunk.addAddressAPI({ address: addressData }))
      .unwrap()
      .then(() => {
        // get All address
        notification.success({ message: 'Add address succefully!' });
        setOpen(false);
        resetForm();
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
      width={500}
    >
      <MDBox
        sx={{
          paddingTop: '20px',
        }}
        component="form"
        role="form"
        justifyContent="space-between"
      >
        <AddressInputItem
          register={register('name')}
          htmlFor="name"
          title={'Name'}
          errors={errors.name}
          value={name}
          onChange={handleChangeName}
        />
        <AddressInputItem
          register={register('mobileNumber')}
          htmlFor={'mobileNumber'}
          title={'Phone number'}
          errors={errors.mobileNumber}
          value={mobileNumber}
          onChange={handleChangeMobileNumber}
        />
        <MDBox mb={2}>
          <InputLabel
            htmlFor="provinceName"
            sx={{
              marginLeft: '3px',
              marginBottom: '6px',
              color: '#323232',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            Province name
          </InputLabel>
          <Select
            className="input-element"
            required
            {...register('provinceName')}
            id="provinceName"
            name="provinceName"
            type="text"
            fullWidth
            value={provinceName ? provinceName : ''}
            onChange={handleChangeProvince}
          >
            {listProvince &&
              listProvince.map((item, index) => (
                <MenuItem size="medium" value={item.ProvinceName} key={index}>
                  {item.ProvinceName}
                </MenuItem>
              ))}
          </Select>
          {errors.provinceName && (
            <MDTypography variant="caption" color="error">
              {errors.provinceName.message}
            </MDTypography>
          )}
        </MDBox>

        <MDBox mb={2}>
          <InputLabel
            htmlFor="districtName"
            sx={{
              marginLeft: '3px',
              marginBottom: '6px',
              color: '#323232',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            District name
          </InputLabel>
          <Select
            className="input-element"
            required
            {...register('districtName')}
            id="districtName"
            name="districtName"
            type="text"
            fullWidth
            onChange={handleChangeDistrict}
            value={districtName ? districtName : ''}
          >
            {listDistrict &&
              listDistrict.map((item, index) => (
                <MenuItem size="medium" value={item.DistrictName} key={index}>
                  {item.DistrictName}
                </MenuItem>
              ))}
          </Select>
          {errors.districtName && (
            <MDTypography variant="caption" color="error">
              {errors.districtName.message}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={2}>
          <InputLabel
            htmlFor="wardName"
            sx={{
              marginLeft: '3px',
              marginBottom: '6px',
              color: '#323232',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            Ward name
          </InputLabel>
          <Select
            className="input-element"
            required
            id="wardName"
            name="wardName"
            {...register('wardName')}
            type="text"
            fullWidth
            value={wardName ? wardName : ''}
            onChange={handleChangeWard}
          >
            {listWard &&
              listWard.map((item, index) => (
                <MenuItem size="medium" value={item.WardName} key={index}>
                  {item.WardName}
                </MenuItem>
              ))}
          </Select>
          {errors.wardName && (
            <MDTypography variant="caption" color="error">
              {errors.wardName.message}
            </MDTypography>
          )}
        </MDBox>
        <AddressInputItem
          register={register('address')}
          htmlFor={'address'}
          title={'Detail address'}
          errors={errors.address}
          value={address}
          onChange={handleChangeAddress}
        />

        <MDBox
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ marginLeft: '0px', paddingLeft: '0px' }}
          />
          <Typography
            variant="body1"
            sx={{ color: '#323232', fontSize: '13px', fontWeight: '600' }}
          >
            Set default
          </Typography>{' '}
        </MDBox>
      </MDBox>
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
          onClick={handleSubmit(handleAddAddress)}
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
    </Modal>
  );
};

export default ModalAddAddress;
