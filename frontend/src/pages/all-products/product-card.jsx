/* eslint-disable array-callback-return */
import React, { useEffect, useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';
// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../../components/MDTypography';
import { Button, Chip, Stack } from '@mui/material';
import { formatThousand } from '../../utils/custom-price';
import { Link } from 'react-router-dom';
import { renderScreen } from '../../utils/custom-products';

function getOptions(products) {
  let option = products.reduce((acc, curr) => {
    const option = `${curr.ram}-${curr.storage}`;
    if (!acc.includes(option)) {
      acc.push(option);
    }
    return acc;
  }, []);

  const uniqueRam = products.reduce((acc, curr) => {
    if (!acc.includes(curr.ram)) {
      acc.push(curr.ram);
    }
    return acc;
  }, []);

  const option2 = products.map((product) => product.storage);

  if (uniqueRam.length === 1) {
    option = option2.filter((item, index) => option2.indexOf(item) === index);
  }

  option = option.filter((item, index) => option.indexOf(item) === index);

  return option;
}
function ProductCard({ category, products }) {
  const [optionSelected, setOptionSelected] = useState(0);
  const options = products.map((item) => item._id);
  const optionsCustom = getOptions(options);
  const product = useMemo(() => {
    return products[optionSelected].items[0];
  }, [optionSelected, products]);
  const {
    name,
    productPictures,
    regularPrice,
    salePrice,
    sale,
    detailsProduct,
    ram,
    storage,
  } = product;
  const screenCustom = renderScreen(detailsProduct.screen);
  return (
    <Card key={category._id} className="product-card">
      <>
        <Link to={`/product-page/${category}?ram=${ram}&storage=${storage}`}>
          <MDBox
            position="relative"
            width="100%"
            sx={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardMedia
              src={productPictures[0]}
              component="img"
              title={name}
              sx={{
                maxWidth: '100%',
                height: '200px',
                margin: 0,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </MDBox>
        </Link>

        <MDBox mb={0.5} mx={0.5}>
          <MDBox mb={0.5}>
            <Link
              to={`/product-page/${category.slug}?ram=${detailsProduct.ram}&storage=${detailsProduct.storage}`}
            >
              <MDTypography
                className="product-name"
                textTransform="capitalize"
                color="dark"
              >
                {name}
              </MDTypography>
            </Link>
          </MDBox>
          <MDBox
            mb={0.5}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid
              container
              justifyContent="flex-start"
              alignItems="flex-start"
              xs={12}
            >
              {/* thông tin màn hình */}
              {screenCustom.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    size="medium"
                    className="product-chip"
                    label={item}
                  />
                );
              })}
            </Grid>
          </MDBox>
          <MDBox
            mb={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              container
              justifyContent="flex-start"
              alignItems="flex-start"
              xs={12}
            >
              {optionsCustom.map((item, index) => {
                return (
                  <Button
                    key={index}
                    size="small"
                    color="dark"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      padding: '2px 3px',
                      border:
                        optionSelected === index ? '1px solid #3d85c6' : '',
                      borderRadius: '0.3rem',
                      marginRight: '3px',
                      marginBottom: '3px',
                      width: '30px',
                      color: '#111',
                      backgroundColor: '#edf0ff',
                    }}
                    onClick={() => setOptionSelected(index)}
                  >
                    {item}
                  </Button>
                );
              })}
            </Grid>
            {/* // danh sách ram */}
          </MDBox>
          <MDBox display="flex" justifyContent="flex-start" alignItems="center">
            <MDTypography
              sx={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#5b5b5b',
                textDecoration: 'line-through',
              }}
              textTransform="capitalize"
            >
              {formatThousand(regularPrice)}đ
            </MDTypography>
            <span
              style={{
                marginLeft: '3px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#B00E18',
              }}
            >
              {sale !== '0' ? `-${sale}%` : null}
            </span>
          </MDBox>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#1f2128',
              }}
              textTransform="capitalize"
              color="dark"
            >
              {formatThousand(salePrice)}đ
            </MDTypography>
            <MDBox display="flex">
              <FavoriteIcon fontSize="medium" color="primary" />
            </MDBox>
          </MDBox>
        </MDBox>
      </>
    </Card>
  );
}

export default ProductCard;
