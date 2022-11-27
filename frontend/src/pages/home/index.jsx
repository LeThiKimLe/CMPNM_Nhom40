import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Stack } from '@mui/material';

import ProductCard from '../../components/ProductItem';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import delivery from '../../assets/images/fast-delivery.png';
import money from '../../assets/images/money.png';
import history from '../../assets/images/history.png';
import payment from '../../assets/images/payment.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { getShuffledArr } from '../../utils/custom-products';
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        maxWidth: '250px',
        minWidth: '245px',
        marginRight: '12px',
        marginBottom: '8px',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const Home = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const { productGroups, banners } = data;

  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      minHeight="80vh"
    >
      <Container
        sx={{
          backgroundColor: 'Light',
        }}
      >
        {data.loading ? (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <CircularProgress />
          </MDBox>
        ) : (
          <Grid
            sx={{ paddingTop: '15px', marginTop: '10px' }}
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            xs={12}
          >
            <MDBox variant="contained" borderRadius="lg">
              <Paper
                elevation={3}
                sx={{ padding: '16px', marginBottom: '10px' }}
              >
                <Carousel showThumbs={false}>
                  {banners && banners.length > 0
                    ? banners.map((item, index) => {
                        return (
                          <div
                            key={index}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              sx={{ width: '100%' }}
                              src={item.image}
                              alt={item.nameBanner}
                              loading="lazy"
                            />
                          </div>
                        );
                      })
                    : null}
                </Carousel>
              </Paper>
            </MDBox>
            <MDBox variant="contained" borderRadius="lg" width="100%">
              <Paper
                elevation={3}
                sx={{ padding: '20px', marginBottom: '10px' }}
              >
                <Grid
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                  display="flex"
                  spacing={2}
                  xs={12}
                >
                  <Grid
                    xs={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <img src={delivery} alt="giao hang nhanh" width="60px" />
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <MDTypography
                          sx={{
                            color: '#444444',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          Giao hàng nhanh chóng
                        </MDTypography>
                        <MDTypography
                          sx={{ color: '#444444', fontSize: '14px' }}
                        >
                          Phí vận chuyển thấp
                        </MDTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <img src={money} alt="Đảm bảo tiền" width="60px" />
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <MDTypography
                          sx={{
                            color: '#444444',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          Đảm bảo tiền tệ
                        </MDTypography>
                        <MDTypography
                          sx={{ color: '#444444', fontSize: '14px' }}
                        >
                          Tiền sẽ được hoàn lại trong 7 ngày
                        </MDTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <img src={history} alt="Bảo hành" width="60px" />
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <MDTypography
                          sx={{
                            color: '#444444',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          Bảo hành
                        </MDTypography>
                        <MDTypography
                          sx={{ color: '#444444', fontSize: '14px' }}
                        >
                          Sản phẩm bảo hành 1 năm
                        </MDTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid
                    xs={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <img src={payment} alt="Thanh toán" width="60px" />
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <MDTypography
                          sx={{
                            color: '#444444',
                            fontSize: '14px',
                            fontWeight: '600',
                          }}
                        >
                          Thanh toán
                        </MDTypography>
                        <MDTypography
                          sx={{ color: '#444444', fontSize: '14px' }}
                        >
                          Thanh toán bảo mật, tiện lợi
                        </MDTypography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </MDBox>
            <Grid
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              display="flex"
              spacing={2}
              xs={12}
            >
              <MDTypography
                sx={{
                  color: '#444444',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                Sản phẩm giảm giá
              </MDTypography>
              <Stack
                direction="row"
                alignItems="center"
                display="flex"
                spacing={0.5}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/products')}
              >
                <MDTypography
                  sx={{
                    color: '#444444',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}
                >
                  Xem thêm
                </MDTypography>
                <ArrowForwardIcon size="small" />
              </Stack>
            </Grid>

            <MDBox
              variant="contained"
              borderRadius="lg"
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
              }}
            >
              {productGroups.length > 0
                ? productGroups.map((item, index) => {
                    if (index < 15) {
                      return (
                        <Item key={index}>
                          <ProductCard
                            index={item.category}
                            rams={item.rams}
                            storages={item.storages}
                            category={item.category}
                            categoryOne={item.categoryOne}
                            categoryOneName={item.categoryOneName}
                            options={item.options}
                            productSelected={item.productSelected}
                            productGroup={item.products}
                            colors={item.colors}
                            groupColors={item.groupColors}
                          />
                        </Item>
                      );
                    }
                  })
                : null}
            </MDBox>
          </Grid>
        )}
      </Container>
    </MDBox>
  );
};

export default Home;
