import React from 'react';
import { Dialog, DialogTitle, Divider } from '@mui/material';
import MDBox from '../../components/MDBox';
import ProductCard from './product-card.jsx';
import DetailProductItem from './detail-compare.jsx';

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
const CompareProducts = ({ open, onClose, products }) => {
  return (
    <Dialog maxWidth="xl" open={open} onClose={onClose}>
      <DialogTitle fullWidth={true} sx={{ textAlign: 'center' }}>
        So sánh sản phẩm
      </DialogTitle>
      <MDBox
        color="#000000"
        bgColor="Light"
        variant="contained"
        borderRadius="none"
        opacity={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={1}
      >
        <MDBox
          variant="contained"
          borderRadius="lg"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {products && Object.keys(products).length > 0
            ? products.map((item, index) => {
                return (
                  <Item key={index}>
                    <ProductCard product={item} />
                  </Item>
                );
              })
            : null}
        </MDBox>
      </MDBox>
      <Divider />
      <DetailProductItem products={products} />
    </Dialog>
  );
};
export default CompareProducts;
