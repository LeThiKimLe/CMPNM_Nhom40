import React from 'react';
import { Stack, Tabs, Tab } from '@mui/material';
import MDBox from '../../components/MDBox';
const OrderComponent = () => {
  const [value, setValue] = React.useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="dark"
        indicatorColor="dark"
        aria-label="secondary tabs example"
      >
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="all"
          label="Tất cả"
        />
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="pending"
          label="Chờ xác nhận"
        />
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="waiting"
          label="Chờ lấy hàng"
        />
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="shipping"
          label="Đang giao"
        />
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="delivered"
          label="Đã giao"
        />
        <Tab
          sx={{ width: '140px', minWidth: '100px' }}
          value="cancelled"
          label="Đã hủy"
        />
        <Tab
          sx={{ width: '150px', minWidth: '100px' }}
          value="Refund"
          label="Trả hàng"
        />
      </Tabs>
    </Stack>
  );
};

export default OrderComponent;
