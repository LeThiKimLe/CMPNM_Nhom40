import { Divider, Stack, Chip, Box, CircularProgress } from '@mui/material';
import React, { useCallback } from 'react';
import MDTypography from '../../components/MDTypography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import UserPage from './user-page';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import userThunk from '../../features/user/user.service';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const getProfile = useCallback(() => {
    dispatch(userThunk.showProfileAPI())
      .unwrap()
      .then((value) => {
        setProfile(value.user);
        setLoading(false);
      });
  }, [dispatch]);
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <UserPage>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ paddingLeft: '10px' }}
          >
            <MDTypography
              sx={{ color: '#323232' }}
              fontWeight="medium"
              variant="h5"
            >
              My profile
            </MDTypography>
            <MDTypography
              sx={{ color: '#323232', fontSize: '0.875rem', fontWeight: '500' }}
            >
              Manage profile information for account security
            </MDTypography>
          </Stack>

          <Divider sx={{ width: '100%' }} />
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
              >
                <MDTypography
                  sx={{
                    color: '#323232',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                  }}
                >
                  Name:
                </MDTypography>
                <MDTypography
                  sx={{
                    color: '#323232',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                  }}
                >
                  Email:
                </MDTypography>
                <MDTypography
                  sx={{
                    color: '#323232',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  Phone number:
                </MDTypography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
              >
                <MDTypography sx={{ color: '#323232', fontSize: '0.875rem' }}>
                  {profile ? `${profile.lastName} ${profile.firstName}` : null}
                </MDTypography>
                <MDTypography sx={{ color: '#323232', fontSize: '0.875rem' }}>
                  {profile.email ? profile.email : null}
                </MDTypography>
                <MDTypography sx={{ color: '#323232', fontSize: '0.875rem' }}>
                  {profile.contactNumber ? profile.contactNumber : 'not update'}
                </MDTypography>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </UserPage>
  );
};

export default ProfilePage;
