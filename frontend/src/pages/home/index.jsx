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
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        maxWidth: '240px',
        marginLeft: '5px',
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
  const data = useSelector((state) => state.data);
  const { productGroups } = data;
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              paddingTop: '15px',
            }}
          >
            {productGroups.length > 0
              ? productGroups.map((item, index) => {
                  console.log(item);
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
                })
              : null}
          </Box>
        )}
      </Container>
    </MDBox>
  );
};

export default Home;
