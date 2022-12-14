import React, { useState, useEffect } from 'react';
import { Divider, Stack, CircularProgress } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';
import MDBox from '../../components/MDBox';
import ModalAddAddress from './modal-add-address';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UserPage from './user-page';
import { useDispatch, useSelector } from 'react-redux';
import addressThunk from '../../features/address/address.service';
import AddressItem from './address-item';
const AddressPage = () => {
  const dispatch = useDispatch();
  const addressUser = useSelector((state) => state.addressUser);

  // * state modal
  const [open, setOpen] = useState(false);
  const [listAddress, setListAddress] = useState([]);
  const onCancel = () => setOpen(false);
  // * state modal
  useEffect(() => {
    dispatch(addressThunk.getAllAPI())
      .unwrap()
      .then((data) => {
        if (data.length === 0) {
          setListAddress([]);
        } else {
          setListAddress(data.addresses);
        }
      });
  }, [dispatch]);

  return (
    <UserPage>
      <ModalAddAddress
        open={open}
        setOpen={setOpen}
        onCancel={onCancel}
        setListAddress={setListAddress}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            display="flex"
            alignItems="flex-start"
            spacing={1}
          >
            <LocationOnIcon
              fontSize="medium"
              color="error"
              sx={{ marginTop: '3px' }}
            />
            <MDTypography
              sx={{ color: '#444444', fontSize: '20px' }}
              fontWeight="medium"
            >
              Địa chỉ của tôi
            </MDTypography>
          </Stack>
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
      {!addressUser.getLoading ? (
        listAddress && listAddress.length > 0 ? (
          listAddress.map((item, index) => {
            return (
              <div key={index}>
                <AddressItem item={item} setListAddress={setListAddress} />
                <Divider sx={{ width: '100%' }} />
              </div>
            );
          })
        ) : (
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <MDTypography variant="h4" color="primary">
              {`Bạn chưa có địa chỉ nào!`}
            </MDTypography>
          </Stack>
        )
      ) : (
        <MDBox display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress />
        </MDBox>
      )}
    </UserPage>
  );
};

export default AddressPage;
