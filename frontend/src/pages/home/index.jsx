import React, { useState, useEffect, useCallback } from 'react';
import { Container, Box, Paper, Stack, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDButton from '../../components/MDButton';
import MDTypography from '../../components/MDTypography';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoComponent from './Info.component';
import AddIcon from '@mui/icons-material/Add';
import { MdKeyboardArrowDown } from 'react-icons/md';
import MDAvatar from '../../components/MDAvatar';
import CompareProducts from './compare.jsx';

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
        minWidth: '244px',
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
const renderCompare = (
  compareLocal,
  setCompareLocal,
  setCountCompare,
  compareProductLocal,
  setCompareProductLocal
) => {
  const handleClose = (i) => {
    const newProductsCompare = [...compareProductLocal];
    newProductsCompare.splice(i, 1);
    localStorage.setItem('compareLocal', JSON.stringify(newProductsCompare));
    setCompareProductLocal(newProductsCompare);
    const newCompareLocal = [...compareLocal];
    newCompareLocal.splice(i, 1);
    setCountCompare(newCompareLocal.length);
    setCompareLocal(newCompareLocal);
    localStorage.setItem('compare', JSON.stringify(newCompareLocal));
  };
  const items = [];
  for (let i = 0; i < 3; i++) {
    let content = '';
    if (i < compareProductLocal.length) {
      const { name, productPictures } = compareProductLocal[i];
      content = (
        <MDBox
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '130px',
            width: '310px',
            borderRight: '1px solid',
            borderColor: '#e8e5e5',
            position: 'relative',
          }}
        >
          <MDBox
            lineHeight={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <MDAvatar
                variant="square"
                src={productPictures[0]}
                name={name}
                size="md"
              />
              <MDBox ml={2} lineHeight={1}>
                <MDTypography
                  display="block"
                  sx={{ fontSize: '12px', color: '#111111', fontWeight: '500' }}
                >
                  {name}
                </MDTypography>
              </MDBox>
            </Stack>
          </MDBox>
          <span
            onClick={() => handleClose(i)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '15px',
              width: '16px',
              height: '16px',
              cursor: 'pointer',
            }}
          >
            <MdClose />
          </span>
        </MDBox>
      );
    } else {
      content = (
        <MDBox
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '900px',
            height: '130px',
            width: '310px',
            borderRight: '1px solid',
            borderColor: '#e8e5e5',
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed',
                height: '50px',
                width: '50px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <AddIcon />
            </Box>
            <MDTypography
              display="block"
              sx={{ fontSize: '12px', color: '#111111', fontWeight: '400' }}
            >
              Thêm sản phẩm
            </MDTypography>
          </Stack>
        </MDBox>
      );
    }
    items.push(content);
  }
  return items;
};
const Home = () => {
  const data = useSelector((state) => state.data);

  const { products, banners } = data;
  const [compareProductLocal, setCompareProductLocal] = useState(
    localStorage.getItem('compareLocal') === null
      ? null
      : JSON.parse(localStorage.getItem('compareLocal'))
  );

  const [countCompare, setCountCompare] = useState(0);
  const [showCompare, setShowCompare] = useState(false);
  const [loading, setLoading] = useState(true);
  const compares = localStorage.getItem('compare');
  const [showDialogCompare, setShowDialogCompare] = useState(false);
  const [compareLocal, setCompareLocal] = useState(
    compares !== null ? JSON.parse(compares) : []
  );
  const handleDeleteAll = () => {
    setCountCompare(0);
    setShowCompare(false);
    setCompareProductLocal([]);
    setCompareLocal([]);
    localStorage.setItem('compareLocal', JSON.stringify([]));
    localStorage.setItem('compare', JSON.stringify([]));
  };
  const checkCountCompare = useCallback(() => {
    if (Object.keys(compareLocal).length > 0) {
      setCountCompare(compareLocal.length);
    } else {
      return;
    }
  }, [compareLocal]);
  const handleCompare = () => {
    setShowDialogCompare(true);
    setShowCompare(false);
  };
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (!data.loading) {
        setLoading(false);
      }
      checkCountCompare();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [checkCountCompare, data.loading]);

  return (
    <>
      {countCompare > 0 && showCompare && !showDialogCompare === true ? (
        <Container
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '130px',
            zIndex: 9999,
            padding: 0,
          }}
        >
          <MDBox
            color="dark"
            bgColor="white"
            variant="contained"
            shadow="lg"
            opacity={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '130px',
              width: '100%', // trừ đi kích thước của button
              padding: '16px',
              position: 'relative', // thêm position relative cho MDBox
            }}
          >
            {renderCompare(
              compareLocal,
              setCompareLocal,
              setCountCompare,
              compareProductLocal,
              setCompareProductLocal
            )}
            <MDBox
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '130px',
                width: '310px',
              }}
            >
              <Stack direction="column" alignItems="center" spacing={0}>
                <MDButton
                  variant="contained"
                  color={countCompare < 2 ? 'secondary' : 'dark'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  disabled={countCompare < 2}
                  onClick={handleCompare}
                >
                  <MDTypography
                    color="white"
                    sx={{ fontSize: '14px', fontWeight: '500' }}
                  >
                    So sánh ngay
                  </MDTypography>
                </MDButton>
                <MDTypography
                  color="info"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    cursor: 'pointer',
                  }}
                  onClick={handleDeleteAll}
                >
                  Xóa tất cả sản phẩm
                </MDTypography>
              </Stack>
            </MDBox>

            <IconButton
              sx={{
                position: 'absolute', // thêm position absolute cho IconButton
                right: 0, // đưa IconButton lên bên phải của MDBox
                top: 0,
              }}
              onClick={() => setShowCompare(false)}
            >
              <MdKeyboardArrowDown />
            </IconButton>
          </MDBox>
        </Container>
      ) : null}

      <MDBox
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
              <CompareProducts
                open={showDialogCompare}
                onClose={() => setShowDialogCompare(false)}
                products={compareProductLocal}
              />
              {showCompare === false &&
              countCompare > 0 &&
              !showDialogCompare ? (
                <MDButton
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    marginBottom: '20px',
                    marginLeft: '20px',
                    borderRadius: '10px',
                    zIndex: 9999,
                  }}
                  variant="contained"
                  size="small"
                  onClick={() => setShowCompare(true)}
                >
                  <MDTypography
                    sx={{ fontSize: '14px', fontWeight: '500' }}
                    color="dark"
                  >
                    So Sánh ({countCompare})
                  </MDTypography>
                </MDButton>
              ) : null}

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
                  Discounted products
                </MDTypography>
                <Stack
                  component={Link}
                  direction="row"
                  alignItems="center"
                  display="flex"
                  spacing={0.5}
                  sx={{ cursor: 'pointer' }}
                  to="/products?category=all"
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
                    Show more
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
                {products.length > 0
                  ? products.map((item, index) => {
                      console.log('product', item);
                      if (index < 15) {
                        return (
                          <Item key={index}>
                            {/* <ProductCard
                              compareLocal={compareLocal}
                              setCompareLocal={setCompareLocal}
                              setShowCompare={setShowCompare}
                              countCompare={countCompare}
                              category={item.category}
                              products={item.products}
                              setCountCompare={setCountCompare}
                              compareProductLocal={compareProductLocal}
                              setCompareProductLocal={setCompareProductLocal}
                            /> */}
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
    </>
  );
};

export default Home;
