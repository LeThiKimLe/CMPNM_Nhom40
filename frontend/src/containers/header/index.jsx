import React from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AddAlertIcon from '@mui/icons-material/AddAlert';

// react-router-dom components
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Paper, Stack } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Header = () => {
  return (
    <MDBox
      color="#000"
      bgColor="#fff"
      height="20px"
      display="flex"
      alignItems="center"
      sx={{
        padding: '20px',
      }}
    >
      {' '}
      <Container>
        <Grid xs={12} container display="flex" justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <PhoneIcon />
              <MDTypography
                variant="button"
                fontWeight="medium"
                sx={{ fontSize: '14px', color: '#323232' }}
              >
                Group 50
              </MDTypography>
              <Stack direction="row" spacing={1}>
                <EmailIcon />
                <MDTypography
                  variant="button"
                  fontWeight="medium"
                  sx={{ fontSize: '14px', color: '#323232' }}
                >
                  18110379@student.hcmute.edu.vn
                </MDTypography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Stack direction="row" spacing={1}>
              <AddAlertIcon />
              <MDTypography
                variant="button"
                fontWeight="medium"
                sx={{ fontSize: '14px', color: '#323232' }}
                component={Link}
                to="/notification"
              >
                Notification
              </MDTypography>
              <LanguageIcon />
              <MDTypography
                variant="button"
                fontWeight="medium"
                sx={{ fontSize: '14px', color: '#323232' }}
              >
                VIE
              </MDTypography>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default Header;
