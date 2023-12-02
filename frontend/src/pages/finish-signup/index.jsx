import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// react-router-dom components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import Footer from '../../containers/footer';
// Authentication layout components
// Images
import finishSignup from '../../assets/images/finish-signup.png';
import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
import SideNavigation from '../../containers/side-navigation';
const FinishSignUp = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: 'hidden', backgroundColor: '#fff' }}
    >
      <MDBox position="absolute" width="100%" minHeight="100vh" />
      <MDBox width="100%" height="100vh" mx="auto">
        <Header />
        <Navbar />
        <SideNavigation />
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="60%"
        >
          <Grid item xs={11} sm={9} md={7} lg={6} xl={5}>
            <div style={{ marginBottom: '40px', marginTop: '30px' }}>
              <img
                src={finishSignup}
                alt="tiep"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '30%',
                }}
              />
            </div>
            <MDTypography variant="body2" color="dark">
              We have sent a mail to the email address to Confirm your email
              address and activate your account. Path in the email will expire
              within 24 hours.
            </MDTypography>
            <MDTypography
              variant="button"
              fontWeight="bold"
              fontSize="1rem"
              color={'dark'}
              component={Link}
              to="/notification"
            >
              Click here{' '}
            </MDTypography>
            <span style={{ fontSize: '1rem' }}>
              {' '}
              If you do not receive emails and want to change your email address
              you register.
            </span>
          </Grid>
        </Grid>
      </MDBox>
      <Footer dark />
    </MDBox>
  );
};

export default FinishSignUp;
