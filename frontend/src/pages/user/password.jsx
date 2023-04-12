import React from 'react';
import UserPage from './user-page';
import { Divider, Stack } from '@mui/material';
import MDTypography from '../../components/MDTypography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDButton from '../../components/MDButton';
import MDInput from '../../components/MDInput';
const PasswordPage = () => {
  return <UserPage>
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingLeft: '10px' }}
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
            <MDTypography
              sx={{ color: '#444444', fontSize: '20px' }}
              fontWeight="medium"
            >
              Đổi Mật Khẩu
            </MDTypography>
          </Stack>
        <MDTypography sx={{ color: '#444444', fontSize: '0.875rem' }}
              fontWeight="regular"
              variant="subtitle1">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </MDTypography>
        </Stack>
      </Stack>
    <Divider sx={{ width: '100%' }} />
   <Grid
    xs={12}
    container
    items 
    sx={{ paddingLeft: "10px"}}
    >
     <Grid 
        xs={3}
        spacing={2}
      >
        <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={4}
                sx={{ marginTop: "10px"}}
              >
                <MDTypography
                  sx={{ color: '#757575', fontSize: '0.875rem' }}
                  fontWeight="regular"
                >
                  Mật Khẩu Hiện Tại
                </MDTypography>
                <MDTypography
                  sx={{ color: '#757575', fontSize: '0.875rem' }}
                  fontWeight="regular"
                >
                  Mật Khẩu Mới
                </MDTypography>
                <MDTypography
                  sx={{ color: '#757575', fontSize: '0.875rem' }}
                  fontWeight="regular"
                >
                  Xác Nhận Mật Khẩu
                </MDTypography>
              </Stack>
            </Grid>
      <Grid spacing={1} xs={4}>
        <Stack 
          sx={{ marginLeft: "10px", marginTop: "5px"}}
          direction="column" 
          justifyContent="center"
          spacing={2}
          alignItems="flex-start"
        >
        <MDInput variant="outlined" size="small" sx={{ width: "300px"}}/>
        <MDInput variant="outlined" size="small" sx={{ width: "300px"}}/>
        <MDInput variant="outlined" size="small" sx={{ width: "300px"}}/>
        <MDButton
          size="medium"
          color="dark"
          sx={{
            textTransform: 'initial !important',
            fontWeight: '500',
            padding: '2px 10px',
          }}
        >
          Xác nhận
        </MDButton>
        </Stack>
      </Grid>
      <Grid spacing={2} xs={3}>
        <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ marginTop: "10px"}}>
           <MDTypography
                  sx={{ color: '#757575', fontSize: '0.875rem' }}
                  fontWeight="regular"
                >
                  Quên mật khẩu 
                </MDTypography>

        </Stack>
      </Grid>
    </Grid> 
  </UserPage>;
};

export default PasswordPage;
