import React from 'react';
import { Container, Stack, IconButton, Divider, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MDTypography from '../../components/MDTypography';
import MDBox from '../../components/MDBox';
import MDAvatar from '../../components/MDAvatar';
import avatar from '../../assets/images/profile.png';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import userThunk from '../../features/user/user.service';

import { Link, useNavigate } from 'react-router-dom';
const UserPage = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(userThunk.showProfileAPI())
      .unwrap()
      .then((value) => {
        setProfile(value.user);
        setLoading(false);
      });
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <MDBox
      color="#000000"
      bgColor="#fff"
      display="flex"
      p={1}
      justifyContent="flex-start"
      width="100%"
      minHeight="75vh"
      sx={{
        backgroundColor: '#ffffff',
        color: '#808191',
        fontFamily: 'Poppins',
        padding: '5px',
      }}
    >
      <Container disableGutters maxWidth={false}>
        <Grid sx={{ padding: '10px 0px' }} container item xs={12} spacing={2}>
          <Grid item xs={2} justifyContent="flex-start" alignItems="center">
            <MDBox
              borderRadius="lg"
              sx={{
                padding: '16px',
                marginBottom: '10px',
                borderRadius: '13px',
                boxShadow: '#dbd9d9 5px 5px 5px 5px',
                color: '#808191',
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
                        {profile.lastName && profile.firstName
                          ? `${profile.lastName} ${profile.firstName}`
                          : null}
                      </MDTypography>
                    </MDBox>
                  </Stack>{' '}
                </>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => navigate('/user/profile')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <PersonIcon fontSize="inherit" sx={{ color: '#f35421' }} />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{
                      color: '#111111',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    My profile
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => navigate('/user/address')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <HomeWorkIcon
                      fontSize="inherit"
                      sx={{ color: '#46bcaa' }}
                    />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{
                      color: '#111111',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    My Addresses
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => navigate('/user/password')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <LockIcon fontSize="inherit" sx={{ color: '#ffcf52' }} />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{
                      color: '#111111',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    My password
                  </MDTypography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                  onClick={() => navigate('/user/order')}
                >
                  <IconButton
                    size="small"
                    sx={{
                      paddingLeft: '2px',
                      paddingRight: '2px',
                    }}
                  >
                    <ReceiptIcon fontSize="inherit" sx={{ color: '#0b5394' }} />
                  </IconButton>
                  <MDTypography
                    component={Link}
                    sx={{
                      color: '#111111',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    Orders
                  </MDTypography>
                </Stack>
              </Stack>
            </MDBox>
          </Grid>
          <Grid item xs={10} sx={{ paddingRight: '0px' }}>
            <MDBox
              variant="contained"
              sx={{
                padding: '16px',
                marginBottom: '10px',
                borderRadius: '13px',
                boxShadow: '#dbd9d9 5px 5px 10px 10px',
                color: '#808191',
                minHeight: '400px',
              }}
            >
              {children}
            </MDBox>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default UserPage;
