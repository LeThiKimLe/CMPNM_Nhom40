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
import { useSelector } from 'react-redux';
import { renderScreen } from '../../utils/custom-products';

function ProductCard({
  index,
  rams,
  storages,
  category,
  categoryOne,
  categoryOneName,
  options,
  productSelected,
  productGroup,
  colors,
}) {
  const [optionSelected, setOptionSelected] = useState(0);
  const [product, setProduct] = useState(productSelected);
  const {
    name,
    productPictures,
    regularPrice,
    salePrice,
    sale,
    detailsProduct,
  } = product;
  const [ramSelected, setRamSelected] = useState(detailsProduct.ram);
  const [storageSelected, setStorageSelected] = useState(
    detailsProduct.storage
  );
  const screenCustom = renderScreen(detailsProduct.screen);
  const customOptions =
    rams.length > 1 && storages.length > 1 ? options : storages;
  useEffect(() => {
    if (customOptions.length === storages.length) {
      rams.map((item, index) => {
        if (optionSelected === index) {
          setRamSelected(item);
        }
      });
      setStorageSelected(storages[optionSelected]);
    } else {
      customOptions.map((item, index) => {
        if (index === optionSelected) {
          setRamSelected(item.split('-')[0]);
          setStorageSelected(item.split('-')[1]);
        }
      });
    }
  }, [customOptions, optionSelected, rams, storages.length, storages]);
  useEffect(() => {
    productGroup.map((item) => {
      const {
        detailsProduct: { ram, storage },
      } = item;
      if (ram === ramSelected && storage === storageSelected) {
        setProduct(item);
        return;
      }
    });
  }, [storageSelected, ramSelected, productGroup]);
  return (
    <Card
      key={index}
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
        state={{
          id: categoryOne,
          name: categoryOneName,
          product: product,
          option: customOptions,
          ram: ramSelected,
          storage: storageSelected,
          optionSelected: optionSelected,
          rams: rams,
          storages: storages,
          productGroup: productGroup,
          colors: colors,
        }}
      >
        <MDBox
          position="relative"
          width="100.25%"
          sx={{ marginBottom: '10px' }}
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
            to={`/products/${category}`}
            state={{
              id: categoryOne,
              name: categoryOneName,
              product: product,
              option: customOptions,
              ram: ramSelected,
              storage: storageSelected,
              optionSelected: optionSelected,
              rams: rams,
              storages: storages,
              productGroup: productGroup,
              colors: colors,
            }}
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
          {screenCustom.map((item, index) => {
            return (
              <Chip
                key={index}
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
            return (
              <MDButton
                key={index}
                variant="contained"
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding: '2px 2px',
                  border:
                    optionSelected === index
                      ? '2px solid #2F4F4F'
                      : '1px solid #2F4F4F',
                  borderRadius: '0.3rem',
                  marginRight: '3px',
                  color: '#2F4F4F',
                }}
                onClick={() => setOptionSelected(index)}
              >
                {item}
              </MDButton>
            );
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