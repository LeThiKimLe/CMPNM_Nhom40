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
        notification.success({ message: 'Delete address successfully=' });
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
                color: '#323232',
              }}
            >
              {mobileNumber}
            </MDTypography>
          </Stack>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeigh: '400',
              color: '#323232',
            }}
          >
            {address}
          </MDTypography>
          <MDTypography
            sx={{
              fontSize: '14px',
              fontWeigh: '400',
              color: '#323232',
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
                <Chip
                  label="Default"
                  size="small"
                  sx={{
                    fontSize: '12px',
                    color: '#4d69fa',
                    backgroundColor: '#edf0ff',
                    fontWeight: '500',
                  }}
                />
                <Chip
                  label="Pick-up address"
                  size="small"
                  sx={{
                    fontSize: '12px',
                    color: '#5b5b5b',
                    backgroundColor: '#edf0ff',
                    fontWeight: '500',
                  }}
                />
                <Chip
                  label="Return address"
                  size="small"
                  sx={{
                    fontSize: '12px',
                    color: '#5b5b5b',
                    backgroundColor: '#edf0ff',
                    fontWeight: '500',
                  }}
                />
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
                color: '#323232',
                paddingRight: '4px',
              }}
              onClick={() => setOpen(true)}
            >
              Update
            </MDTypography>
            {isDefault ? null : (
              <MDTypography
                component={Link}
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#323232',
                  paddingRight: '4px',
                }}
                onClick={() => setOpenDialog(true)}
              >
                Remove
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
            Set default
          </MDButton>
        </Stack>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {'Are you sure you want to delete this address??'}
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
