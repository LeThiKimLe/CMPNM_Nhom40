/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Material Dashboard 2 React components
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import MDButton from '../MDButton';
import { Chip } from '@mui/material';
import { formatThousand } from '../../utils/custom-price';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ProductCard({
  key,
  image,
  name,
  screen,
  ram,
  storage,
  regularPrice,
  salePrice,
  sale,
  category,
  categoryOne,
  categoryOneName,
  options,
}) {
  const handleToProduct = (e) => {
    console.log(e.currentTarget);
  };
  const [optionCheck, setOptionCheck] = useState(0);
  const customOptions =
    ram.length > 1 && storage.length > 1 ? options : storage;
  return (
    <Card
      key={key}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <Link
        to={`/products/${category}`}
        state={{ id: categoryOne, name: categoryOneName }}
      >
        <MDBox
          position="relative"
          width="100.25%"
          sx={{ marginBottom: '10px' }}
        >
          <CardMedia
            src={image}
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
            to={`/products/${category}`}
            state={{ id: categoryOne, name: categoryOneName }}
          >
            <MDTypography
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                height: '50px',
              }}
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
          {/* thông tin màn hình */}
          {screen.map((item) => {
            return (
              <Chip
                size="medium"
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: '500',
                  borderRadius: '0.3rem',
                  marginRight: '3px',
                }}
                label={item}
              />
            );
          })}
        </MDBox>
        <MDBox
          mb={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* // danh sách ram */}
          {customOptions.map((item, index) => {
            if (optionCheck === index) {
              return (
                <MDButton
                  key={index}
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '2px 2px',
                    border: '2px solid #2F4F4F',
                    borderRadius: '0.3rem',
                    marginRight: '3px',
                    color: '#2F4F4F',
                  }}
                >
                  {item}
                </MDButton>
              );
            } else {
              return (
                <MDButton
                  key={index}
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '2px 2px',
                    border: '1px solid #808080',
                    borderRadius: '0.3rem',
                    marginRight: '3px',
                  }}
                  onClick={() => {
                    setOptionCheck(index);
                  }}
                >
                  {item}
                </MDButton>
              );
            }
          })}
        </MDBox>
        <MDBox display="flex" justifyContent="flex-start" alignItems="center">
          <MDTypography
            sx={{
              fontSize: '0.875rem',
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
    </Card>
  );
}

export default ProductCard;
