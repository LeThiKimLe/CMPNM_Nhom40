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
      sx={{ overflowX: 'hidden' }}
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
              Chúng tôi đã gửi một thư đến địa chỉ email buitiep@gmail.com để
              xác nhận địa chỉ email và kích hoạt tài khoản của bạn. Đường dẫn
              trong email sẽ hết hạn trong vòng 24 giờ.
            </MDTypography>
            <MDTypography
              variant="button"
              fontWeight="bold"
              fontSize="1rem"
              color={'dark'}
              component={Link}
              to="/notification"
            >
              Nhấn vào đây{' '}
            </MDTypography>
            <span style={{ fontSize: '1rem' }}>
              {' '}
              nếu bạn không nhận được email và muốn thay đổi địa chỉ email mà
              bạn đăng ký.
            </span>
          </Grid>
        </Grid>
      </MDBox>
      <Footer dark />
    </MDBox>
  );
};

export default FinishSignUp;
