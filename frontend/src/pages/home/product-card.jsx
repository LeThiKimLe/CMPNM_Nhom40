/* eslint-disable array-callback-return */
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
// Material Dashboard 2 React components
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../../components/MDTypography';
import { Chip } from '@mui/material';
import { formatThousand } from '../../utils/custom-price';
import { Link } from 'react-router-dom';
import { renderScreen } from '../../utils/custom-products';

function ProductCard({ product }) {
  const {
    name,
    productPictures,
    regularPrice,
    salePrice,
    sale,
    detailsProduct,
  } = product;
  const { ram, storage } = detailsProduct;
  const screenCustom = renderScreen(detailsProduct.screen);

  return (
    <Card
      key={product._id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <>
        <Link>
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
            <Link>
              <MDTypography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  height: '50px',
                }}
                textTransform="capitalize"
                color="dark"
              >
                {name} {ram} {storage}
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
                    size="small"
                    sx={{
                      fontSize: '10px',
                      fontWeight: '500',
                      borderRadius: '0.3rem',
                      marginRight: '3px',
                      marginBottom: '3px',
                    }}
                    label={item}
                  />
                );
              })}
            </Grid>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-start" alignItems="center">
            <MDTypography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#696969',
                textDecoration: 'line-through',
              }}
              textTransform="capitalize"
            >
              {formatThousand(regularPrice)}đ
            </MDTypography>
            <span
              style={{
                marginLeft: '3px',
                fontSize: '14px',
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
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              textTransform="capitalize"
              color="dark"
            >
              {formatThousand(salePrice)}đ
            </MDTypography>
          </MDBox>
        </MDBox>
      </>
    </Card>
  );
}

export default ProductCard;
