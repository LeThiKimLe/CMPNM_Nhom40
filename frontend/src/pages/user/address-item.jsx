import React, { useState } from 'react';
import {
  Stack,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import { notification } from 'antd';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import MDBox from '../../components/MDBox';
import ModalEditAddress from './modal-edit-address';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import addressThunk from '../../features/address/address.service';
const AddressItem = (props) => {
  const { item, getAddressList } = props;
  const {
    name,
    address,
    mobileNumber,
    provinceName,
    districtName,
    wardName,
    isDefault,
    _id,
  } = item;
  // modal edit address
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const handleSetDefault = () => {
    dispatch(addressThunk.setDefaultAddressAPI(_id))
      .unwrap()
      .then(() => {
        getAddressList();
      });
  };
  const handleDelete = () => {
    dispatch(addressThunk.deleteAddressAPI(_id))
      .unwrap()
      .then(() => {
        setOpenDialog(false);
        notification.success({ message: 'Xóa địa chỉ thành công!' });
        getAddressList();
      });
  };
  return (
    <MDBox
      key={_id}
      style={{ display: 'flex', paddingLeft: '10px', paddingRight: '0px' }}
    >
      <ModalEditAddress
        open={open}
        setOpen={setOpen}
        onCancel={() => setOpen(false)}
        item={item}
        getAddressList={getAddressList}
      />
      <Grid2
        container
        item
        xs={12}
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
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
              sx={{
                fontSize: '16px',
                fontWeigh: '500',
                color: '#111111',
              }}
            >
              {name} |
            </MDTypography>
            <MDTypography
              sx={{
                fontSize: '14px',
                fontWeigh: '400',
                color: '#444444',
              }}
            >
              {mobileNumber}
            </MDTypography>
          </Stack>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeigh: '400',
              color: '#444444',
            }}
          >
            {address}
          </MDTypography>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeigh: '400',
              color: '#444444',
            }}
          >
            {`${wardName}, ${districtName}, ${provinceName}`}
          </MDTypography>

          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={0.5}
          >
            {isDefault ? (
              <>
                <Chip color="primary" label="Mặc định" size="small" />
                <Chip label="Địa chỉ lấy hàng" size="small" />
                <Chip label="Địa chỉ trả hàng" size="small" />
              </>
            ) : null}
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
              component={Link}
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#444444',
                paddingRight: '4px',
              }}
              onClick={() => setOpen(true)}
            >
              Cập nhật
            </MDTypography>
            {isDefault ? null : (
              <MDTypography
                component={Link}
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#444444',
                  paddingRight: '4px',
                }}
                onClick={() => setOpenDialog(true)}
              >
                Xóa
              </MDTypography>
            )}
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
            onClick={handleSetDefault}
            disabled={isDefault}
          >
            Thiết lập mặc định
          </MDButton>
        </Stack>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Bạn có chắc muốn xóa địa chỉ này?'}
          </DialogTitle>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleDelete} autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Grid2>
    </MDBox>
  );
};

export default AddressItem;
