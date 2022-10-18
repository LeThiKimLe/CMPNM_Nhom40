import React from 'react';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AddAlertIcon from '@mui/icons-material/AddAlert';

// react-router-dom components
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Stack } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Header = () => {
  return (
    <MDBox
      color="white"
      bgColor="info"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={2}
      height="10px"
      display="flex"
      alignItems="center"
    >
      {' '}
      <Container>
        <Stack direction="row" spacing={2}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={10} alignItems="center">
              <Stack direction="row" spacing={1}>
                <PhoneIcon />
                <MDTypography
                  variant="button"
                  fontWeight="bold"
                  color={'white'}
                >
                  Nhóm 9
                </MDTypography>
                <Stack direction="row" spacing={1}>
                  <EmailIcon />
                  <MDTypography
                    variant="button"
                    fontWeight="bold"
                    color={'white'}
                  >
                    18110379@student.hcmute.edu.vn
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    fontWeight="bold"
                    color={'white'}
                  >
                    19110397@student.hcmute.edu.vn
                  </MDTypography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={2} justifyContent="flex-end" alignItems="center">
              <Stack direction="row" spacing={1}>
                <AddAlertIcon />
                <MDTypography
                  variant="button"
                  fontWeight="bold"
                  color={'white'}
                  component={Link}
                  to="/notification"
                >
                  Thông báo
                </MDTypography>
                <LanguageIcon />
                <MDTypography
                  variant="button"
                  fontWeight="bold"
                  color={'white'}
                >
                  VIE
                </MDTypography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default Header;
