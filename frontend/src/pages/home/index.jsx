import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';

import ProductCard from '../../components/ProductItem';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

import MDBox from '../../components/MDBox';

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
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        maxWidth: '240px',
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
async function getMethodShip(to_district) {
  const response = await fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=3076334&from_district=1442&to_district=${to_district}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: 'cors',
        Host: 'api.producthunt.com',
        token: `53cff26c-f9d5-11ec-ad26-3a4226f77ff0`,
      },
    }
  ).then((response) => response.json());

  // update the state
  if (response.code === 200) {
    console.log(response);
    return response.data[0].service_id;
  }
}
const Home = () => {
  const data = useSelector((state) => state.data);
  const { productGroups } = data;
  getMethodShip(2046);
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      minHeight="80vh"
    >
      <Container
        disableGutters
        maxWidth={false}
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              paddingTop: '15px',
            }}
          >
            {productGroups.length > 0
              ? productGroups.map((item, index) => {
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
                      />
                    </Item>
                  );
                })
              : null}
          </Box>
        )}
      </Container>
    </MDBox>
  );
};

export default Home;
