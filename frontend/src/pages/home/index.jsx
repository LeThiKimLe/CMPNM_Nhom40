import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductItem';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoComponent from './Info.component';
function Item(props) {
  const { sx, ...other } = props;
  return (
    <MDBox
      shadow="lg"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : '#fff',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,

        fontSize: '0.875rem',
        fontWeight: '700',
        maxWidth: '250px',
        minWidth: '245px',
        marginRight: '12px',
        marginBottom: '8px',
        borderRadius: '16px',
        paddingTop: '16px',
        ...sx,
      }}
      {...other}
    />
  );
}

const Home = () => {
  const data = useSelector((state) => state.data);
  const { productGroups, banners } = data;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

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
        {loading ? (
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <CircularProgress color="dark" />
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
            {/* info component */}
            <InfoComponent />
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
                component={Link}
                direction="row"
                alignItems="center"
                display="flex"
                spacing={0.5}
                sx={{ cursor: 'pointer' }}
                to="/products"
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
                <ArrowForwardIcon size="small" sx={{ color: '#111' }} />
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
