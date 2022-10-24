import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Paper } from '@mui/material';
import ProductCard from '../../components/ProductItem';
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
        maxWidth: '250px',
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
  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <Item>
            <Paper
              elevation={0}
              sx={{
                padding: '5px',
              }}
            >
              <ProductCard
                image="https://res.cloudinary.com/dqcsrhhoc/image/upload/v1666540718/Images/Product/g83caevased0vcxi0ghm.jpg"
                name="Điện thoại iPhone 14 Pro Max"
                screen={[`6.7"`, 'Super Retina XDR']}
                ram={['64GB', '128GB']}
                regularPrice="33.990.000"
                salePrice="31.990.000"
              />
            </Paper>
          </Item>
        </Box>
      </div>
    </Container>
  );
};

export default Home;
