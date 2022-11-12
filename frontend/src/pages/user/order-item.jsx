/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from 'react';
import MDTypography from '../../components/MDTypography';
import { Stack, Paper, Chip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { formatThousand } from '../../utils/custom-price';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
const statusValue = [
  {
    key: 'pending',
    value: 'Chờ xác nhận',
    color: 'light',
  },
  {
    key: 'waiting',
    value: 'Chờ lấy hàng',
    color: 'secondary',
  },
  {
    key: 'shipping',
    value: 'Đang giao hàng',
    color: 'info',
  },
  {
    key: 'delivered',
    value: 'Đã giao hàng',
    color: 'success',
  },
  {
    key: 'cancelled',
    value: 'Đã hủy',
    color: 'primary',
  },
  {
    key: 'refund',
    value: 'Trả hàng',
    color: 'dark',
  },
];
const OrderItem = (props) => {
  const { id, totalAmount, orderStatus } = props;
  const datePurchased = orderStatus[0].date;
  const type = orderStatus[orderStatus.length - 1].type;
  return (
    <Paper
      key={id}
      elevation={0}
      sx={{
        paddingTop: '7px',
        paddingBottom: '7px',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
    >
      <Stack
        component={Link}
        to={`/user/order/${id}`}
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingLeft: '20px' }}
      >
        <Grid xs={3.5}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#2b3445',
            }}
          >
            {id}
          </MDTypography>
        </Grid>
        <Grid xs={2.5}>
          {!orderStatus
            ? null
            : statusValue.map((item) => {
                if (item.key == type) {
                  return (
                    <Chip
                      key={item.key}
                      size="small"
                      label={item.value}
                      sx={{ padding: '3px 3px', color: item.color }}
                    />
                  );
                }
              })}
        </Grid>
        <Grid xs={2.5}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#2b3445',
            }}
          >
            {new Date(datePurchased).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
            })}
          </MDTypography>
        </Grid>
        <Grid xs={2.5}>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#2b3445',
            }}
          >
            {formatThousand(totalAmount)}đ
          </MDTypography>
        </Grid>
        <Grid xs={1}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ paddingRight: '10px' }}
          >
            <ArrowForwardIcon />
          </Stack>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default OrderItem;
