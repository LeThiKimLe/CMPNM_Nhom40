import React, { useState } from 'react';
import { Container, Stack, Paper, IconButton, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
import MDAvatar from '../../components/MDAvatar';
import avatar from '../../assets/images/canvas.png';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountComponent from './account';
import AddressComponent from './address';
import PasswordComponent from './password';
import OrderComponent from './order';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
  const [page, setPage] = useState('account');
  const renderPage = () => {
    switch (page) {
      case 'address':
        return <AddressComponent />;
      case 'account':
        return <AccountComponent />;
      case 'password':
        return <PasswordComponent />;
      case 'order':
        return <OrderComponent />;
      default:
        return <AccountComponent />;
    }
  };
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={2} justifyContent="flex-start" alignItems="center">
            <MDBox
              borderRadius="lg"
              sx={{
                backgroundColor: '#ffffff',
                padding: '15px 15px',
              }}
            >
              <Stack spacing={2}>
                <>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <MDAvatar src={avatar} size="md" />
                    <MDBox ml={2} lineHeight={1}>
                      <MDTypography
                        display="block"
                        sx={{
                          fontSize: '14px',
                          color: '#111111',
                          fontWeight: '500',
                        }}
                      >
                        Bùi Tiệp
                      </MDTypography>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            paddingLeft: '2px',
                            paddingRight: '2px',
                          }}
                        >
                          <EditIcon fontSize="inherit" color="primary" />
                        </IconButton>
                        <MDTypography
                          sx={{ color: '#111111', fontSize: '0.75rem' }}
                        >
                          Sửa hồ sơ
                        </MDTypography>
                      </Stack>
                    </MDBox>
                  </Stack>{' '}
                </>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => setPage('account')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <PersonIcon fontSize="inherit" color="info" />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{ color: '#111111', fontSize: '0.75rem' }}
                  >
                    Hồ sơ của tôi
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => setPage('address')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <HomeWorkIcon fontSize="inherit" color="success" />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{ color: '#111111', fontSize: '0.75rem' }}
                  >
                    Địa chỉ
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => setPage('password')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <LockIcon fontSize="inherit" color="warning" />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{ color: '#111111', fontSize: '0.75rem' }}
                  >
                    Đổi mật khẩu
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => setPage('order')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <ReceiptIcon fontSize="inherit" color="error" />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{ color: '#111111', fontSize: '0.75rem' }}
                  >
                    Đơn mua
                  </MDTypography>
                </Stack>
              </Stack>
            </MDBox>
          </Grid>
          <Grid item xs={10}>
            <MDBox
              borderRadius="lg"
              sx={{
                backgroundColor: '#ffffff',
                padding: '15px 15px',
              }}
            >
              {renderPage()}
            </MDBox>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default ProfilePage;
