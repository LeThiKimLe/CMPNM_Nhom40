import React, { useState } from 'react';
import { Divider, Stack, Chip } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import ModalAddAddress from './modal-add-address';
const AddressComponent = () => {
  const [open, setOpen] = useState(false);
  const onCancel = () => setOpen(false);
  return (
    <>
      <ModalAddAddress
        visible={open}
        handleCancel={() => setOpen(false)}
        onCancel={onCancel}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingLeft: '10px' }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <MDTypography
            sx={{ color: '#444444' }}
            fontWeight="medium"
            variant="h5"
          >
            Địa chỉ của tôi
          </MDTypography>
          <MDTypography
            sx={{ color: '#444444', fontSize: '14px' }}
            fontWeight="regular"
            variant="subtitle1"
          >
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </MDTypography>
        </Stack>
        <MDButton
          size="medium"
          color="dark"
          sx={{
            textTransform: 'initial !important',
            fontWeight: '500',
            padding: '2px 10px',
          }}
          onClick={() => setOpen(true)}
        >
          Thêm Địa chỉ
        </MDButton>
      </Stack>

      <Divider sx={{ width: '100%' }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        sx={{ paddingLeft: '10px' }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={0.5}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0.5}
          >
            <MDTypography
              sx={{ fontSize: '16px', fontWeigh: '500', color: '#111111' }}
            >
              Nguyễn Bùi Tiệp |
            </MDTypography>
            <MDTypography
              sx={{ fontSize: '14px', fontWeigh: '400', color: '#444444' }}
            >
              0334943334
            </MDTypography>
          </Stack>
          <MDTypography
            sx={{ fontSize: '14px', fontWeigh: '400', color: '#444444' }}
          >
            1050 Ql 1a
          </MDTypography>
          <MDTypography
            sx={{ fontSize: '14px', fontWeigh: '400', color: '#444444' }}
          >
            Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh
          </MDTypography>

          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={0.5}
          >
            <Chip label="Địa chỉ lấy hàng" size="small" />
            <Chip label="Địa chỉ lấy hàng" size="small" />
            <Chip label="Địa chỉ trả hàng" size="small" />
          </Stack>
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={0.5}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={0.5}
          >
            <MDTypography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#444444',
                paddingRight: '4px',
              }}
            >
              Cập nhật
            </MDTypography>
            <MDTypography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#444444',
                paddingRight: '4px',
              }}
            >
              Xóa
            </MDTypography>
          </Stack>
          <MDButton
            size="small"
            color="dark"
            variant="outlined"
            sx={{
              textTransform: 'initial !important',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            Thiết lập mặc định
          </MDButton>
        </Stack>
      </Stack>
    </>
  );
};

export default AddressComponent;
