import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box, Container } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import OrderItem from './order-item.jsx';
import Grid from '@mui/material/Unstable_Grid2';
import OrderItem2 from './order-item2';
const OrderListContent = ({ orderList, type }) => {
  const updatedColumns =
    type === 'all'
      ? [
          {
            key: 'id',
            fieldName: 'Mã đơn',
            index: 'id',
            width: 3.5,
          },
          {
            key: 'status',
            fieldName: 'Trạng thái',
            index: 'status',
            width: 2.5,
          },
          {
            key: 'datePurchased',
            fieldName: 'Ngày đặt hàng',
            index: 'datePurchased',
            width: 2.5,
          },
          {
            key: 'totalAmount',
            fieldName: 'Tổng đơn',
            index: 'totalAmount',
            width: 2.5,
          },
          {
            key: 'action',
            fieldName: ' ',
            index: 'action',
            width: 1,
          },
        ]
      : [
          {
            key: 'id',
            fieldName: 'Mã đơn',
            index: 'id',
            width: 4,
          },
          {
            key: 'datePurchased',
            fieldName: 'Ngày đặt hàng',
            index: 'datePurchased',
            width: 3,
          },
          {
            key: 'totalAmount',
            fieldName: 'Tổng đơn',
            index: 'totalAmount',
            width: 4,
          },
          {
            key: 'action',
            fieldName: ' ',
            index: 'action',
            width: 1,
          },
        ];

  return (
    <Grid>
      <Grid item xs={12} sx={{ paddingTop: '0px' }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{ paddingLeft: '20px' }}
        >
          {updatedColumns.map((item) => {
            return (
              <Grid xs={item.width} key={item.index}>
                <MDTypography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#7d879c',
                  }}
                >
                  {item.fieldName}
                </MDTypography>
              </Grid>
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '0px' }}>
        <Box sx={{ paddingTop: '0px' }}>
          {orderList.map((item, index) => {
            if (type == 'all') {
              return (
                <div key={index}>
                  <OrderItem
                    id={item._id}
                    totalAmount={item.totalAmount}
                    orderStatus={item.orderStatus}
                  />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <OrderItem2
                    id={item._id}
                    totalAmount={item.totalAmount}
                    orderStatus={item.orderStatus}
                  />
                </div>
              );
            }
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

OrderListContent.propTypes = {
  orderList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default OrderListContent;
