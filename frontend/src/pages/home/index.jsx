import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';
import ProductCard from '../../components/ProductItem';
import { useSelector } from 'react-redux';
import { renderScreen } from '../../utils/custom-products';
import { useEffect } from 'react';
import MDBox from '../../components/MDBox';
import { createCategoryGroup } from '../../utils/custome-category';
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

const Home = () => {
  const data = useSelector((state) => state.data);
  const { productGroups, categories } = data;
  const list = createCategoryGroup(categories);
  // useEffect(() => {}, [products, categories]);
  return (
    <MDBox
      color="#000000"
      bgColor="#ffffff"
      variant="contained"
      borderRadius="none"
      opacity={1}
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Container>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {productGroups.length > 0
            ? productGroups.map((item, index) => {
                return (
                  <Item key={index}>
                    <ProductCard
                      key={index}
                      image={item.picture}
                      name={item.name}
                      screen={renderScreen(item.screen)}
                      ram={item.rams}
                      regularPrice={item.regularPrice}
                      salePrice={item.salePrice}
                      storage={item.storages}
                      sale={item.sale}
                      category={item.category}
                      categoryOne={item.categoryOne}
                      categoryOneName={item.categoryOneName}
                      options={item.options}
                    />
                  </Item>
                );
              })
            : null}
        </Box>
      </Container>
    </MDBox>
  );
};

export default Home;
