import React, { useState } from 'react';
import { Row, Col, Checkbox } from 'antd';
import { Chip } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import { Link } from 'react-router-dom';
const AddressItem = (props) => {
  const { item, keyIndex, addressIndex, setAddressIndex } = props;
  const {
    name,
    mobileNumber,
    wardName,
    districtName,
    provinceName,
    isDefault,
    address,
    _id,
  } = item;

  const handleOnChange = () => {
    setAddressIndex(keyIndex);
  };

  return (
    <div
      key={_id}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Row style={{ width: '100%' }}>
        <Col span={2}>
          <Checkbox
            checked={addressIndex === keyIndex ? true : false}
            onChange={handleOnChange}
          />
        </Col>
        <Col span={18}>
          <Row>
            <MDTypography
              sx={{
                fontSize: '16px',
                fontWeigh: '500',
                color: '#e91e63',
              }}
            >
              {`${name} | ${mobileNumber}`}
            </MDTypography>
          </Row>
          <Row>{address}</Row>
          <Row>{`${wardName}, ${districtName}, ${provinceName}`}</Row>
          {
            <Row>
              {isDefault ? (
                <>
                  <Chip
                    color="primary"
                    label="Mặc định"
                    size="small"
                    sx={{ marginRight: '5px' }}
                  />
                  <Chip
                    label="Địa chỉ lấy hàng"
                    size="small"
                    sx={{ marginRight: '5px' }}
                  />
                  <Chip label="Địa chỉ trả hàng" size="small" />
                </>
              ) : null}
            </Row>
          }
        </Col>
        <Col span={4}>
          <MDTypography
            component={Link}
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'info',
              paddingRight: '4px',
            }}
          >
            Cập nhật
          </MDTypography>
        </Col>
      </Row>
    </div>
  );
};

export default AddressItem;
