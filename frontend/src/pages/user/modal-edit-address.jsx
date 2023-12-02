import { Modal, notification } from 'antd';
import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Typography,
} from '@mui/material';
// * start import form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// * end import form
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import getAddressAPI from '../../utils/get-details-address';
import { useDispatch } from 'react-redux';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDTypography from '../../components/MDTypography';
import './style.css';
import AddressInputItem from './address-input-item';
import addressThunk from '../../features/address/address.service';

const ModalEditAddress = (props) => {
  const { open, onCancel, setOpen, item, getAddressList } = props;
  const dispatch = useDispatch();
  const updateAddressValidationSchema = Yup.object().shape({
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
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ resolver: yupResolver(updateAddressValidationSchema) });
  // * list id
  const [provinceID, setProvinceID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [wardCode, setWardCode] = useState('');
  // * end list id
  // * list input
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  // * end list input
  // * list select
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  // * list name select
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  // * list value select
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
  const handleCancel = () => {
    setOpen(false);
    clearErrors();
  };

  const handleChangeProvince = (e) => {
    const provinceID = e.target.value;
    const provinceObject = _.find(listProvince, { ProvinceID: provinceID });
    setProvinceName(provinceObject.ProvinceName);
    setProvinceID(provinceObject.ProvinceID);
    getAddressAPI.getAPIDistrict(provinceObject.ProvinceID).then((data) => {
      setListDistrict(data);
      setDistrictName('');
      setDistrictID('');
    });
  };
  const handleChangeDistrict = (e) => {
    const districtID = e.target.value;
    const provinceObject = _.find(listDistrict, { DistrictID: districtID });
    setDistrictName(provinceObject.DistrictName);
    setDistrictID(provinceObject.DistrictID);
    getAddressAPI.getAPIWard(provinceObject.DistrictID).then((data) => {
      setListWard(data);
      setWardCode('');
      setWardName('');
    });
  };
  const handleChangeWard = (e) => {
    const wardCode = e.target.value;
    const wardObject = _.find(listWard, { WardCode: wardCode });
    setWardCode(wardObject.WardCode);
    setWardName(wardObject.WardName);
  };
  const handleEditAddress = () => {
    const addressData = {
      name,
      address,
      mobileNumber,
      provinceName,
      provinceID,
      districtName,
      districtID,
      wardCode,
      wardName,
      _id: item._id,
      isDefault: checked,
    };
    dispatch(addressThunk.updateAddressAPI({ address: addressData }))
      .unwrap()
      .then(() => {
        // get All address
        notification.success({ message: 'Update address successfully!' });
        handleCancel();
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
        isDefault,
      } = item;
      setName(name);
      setValue('name', name);
      setMobileNumber(mobileNumber);
      setValue('mobileNumber', mobileNumber);
      setAddress(address);
      setValue('address', address);
      setChecked(isDefault);
      getAddressAPI
        .getAPIProvince()
        .then((data) => {
          setListProvince(data);
          const provinceObject = _.find(data, { ProvinceName: provinceName });
          setProvinceID(provinceObject.ProvinceID);
          setProvinceName(provinceObject.ProvinceName);
          setValue('provinceName', provinceObject.ProvinceName);
          return getAddressAPI.getAPIDistrict(provinceObject.ProvinceID);
        })
        .then((data) => {
          setListDistrict(data);
          const districtObject = _.find(data, { DistrictName: districtName });
          setDistrictID(districtObject.DistrictID);
          setDistrictName(districtObject.DistrictName);
          setValue('districtName', districtObject.DistrictName);
          return getAddressAPI.getAPIWard(districtObject.DistrictID);
        })
        .then((data) => {
          setListWard(data);
          const wardObject = _.find(data, { WardName: wardName });
          setWardCode(wardObject.WardCode);
          setWardName(wardObject.WardName);
          setValue('wardName', wardObject.WardName);
        });
    }
  }, [item, open, setValue]);
  return (
    <Modal footer={null} open={open} onCancel={onCancel} title="Update address">
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
            value={provinceID}
            onChange={handleChangeProvince}
            sx={{ paddingLeft: '0px' }}
          >
            {listProvince &&
              listProvince.map((item, index) => (
                <MenuItem size="medium" value={item.ProvinceID} key={index}>
                  {item.ProvinceName}
                </MenuItem>
              ))}
          </Select>
          {errors.ProvinceName && (
            <MDTypography variant="caption" color="error">
              {errors.ProvinceName.message}
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
            value={districtID ? districtID : ''}
            sx={{ paddingLeft: '0px' }}
          >
            {listDistrict &&
              listDistrict.map((item, index) => (
                <MenuItem size="medium" value={item.DistrictID} key={index}>
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
            value={wardCode ? wardCode : ''}
            onChange={handleChangeWard}
            sx={{ paddingLeft: '0px' }}
          >
            {listWard &&
              listWard.map((item, index) => (
                <MenuItem
                  size="medium"
                  value={item.WardCode}
                  key={index}
                  sx={{ fontSize: '14px', fontWeight: '500', color: '#323232' }}
                >
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
          onClick={handleSubmit(handleEditAddress)}
        >
          Update
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

export default ModalEditAddress;
