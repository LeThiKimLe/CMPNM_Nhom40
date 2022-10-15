import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import MDInput from '../../components/MDInput';
import MDButton from '../../components/MDButton';
import Footer from '../sign_in/components/footer';
// Authentication layout components
// Images
import bgImage from '../../assets/images/bg-sign-in-basic.jpeg';
import Header from '../../containers/header';
import Navbar from '../../containers/navbar';
import { Stack } from '@mui/material';

function SignUp() {
  const [rememberMe, setRememberMe] = useState(false);
  const image = bgImage;
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <MDBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      sx={{ overflowX: 'hidden' }}
    >
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Header />
        <Navbar />
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="80%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography
                  variant="h4"
                  fontWeight="medium"
                  color="white"
                  mt={1}
                >
                  Đăng ký
                </MDTypography>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <FacebookIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GitHubIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      component={MuiLink}
                      href="#"
                      variant="body1"
                      color="white"
                    >
                      <GoogleIcon color="inherit" />
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox
                  component="form"
                  role="form"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={3}>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Tên" fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Họ" fullWidth />
                    </MDBox>
                  </Stack>
                  <MDBox mb={2}>
                    <MDInput type="email" label="Email" fullWidth />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput type="password" label="Mật khẩu" fullWidth />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password"
                      label="Nhập lại mật khẩu"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      Đăng ký
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Đã có tài khoản
                      <MDTypography
                        component={Link}
                        to="/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Đăng nhập
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </MDBox>
  );
}

export default SignUp;
