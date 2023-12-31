import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import MDBox from '../MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MDTypography from '../MDTypography';
import { Button, Chip, Dialog, DialogContent } from '@mui/material';
import { formatThousand } from '../../utils/custom-price';
import { Link } from 'react-router-dom';
import { renderScreen } from '../../utils/custom-products';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

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
function ProductCard({
  category,
  countCompare,
  products,
  setShowCompare,
  setCountCompare,
  compareLocal,
  setCompareLocal,
  compareProductLocal,
  setCompareProductLocal,
}) {
  const [optionSelected, setOptionSelected] = useState(0);
  const [checkCompare, setCheckCompare] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const options = products.map((item) => item._id);
  const optionsCustom = getOptions(options);
  const product = useMemo(() => {
    return products[optionSelected].items[0];
  }, [optionSelected, products]);
  const exitIndex = useCallback(() => {
    if (Object.keys(compareLocal).length > 0) {
      const index = compareLocal.findIndex((item) => item === product._id);
      if (index === -1) {
        setCheckCompare(false);
      } else {
        setCheckCompare(true);
      }
    } else {
      setCheckCompare(false);
    }
  }, [compareLocal, product._id]);
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
  const handleAddCompare = () => {
    if (!checkCompare) {
      if (countCompare === 3) {
        setShowDialog(true);
      } else {
        console.log('chay');
        setCompareLocal([...compareLocal, product._id]);
        localStorage.setItem(
          'compare',
          JSON.stringify([...compareLocal, product._id])
        );
        if (!compareProductLocal) {
          localStorage.setItem('compareLocal', JSON.stringify([product]));
          setCompareProductLocal([product]);
        } else {
          localStorage.setItem(
            'compareLocal',
            JSON.stringify([...compareProductLocal, product])
          );

          setCompareProductLocal([...compareProductLocal, product]);
        }

        setShowCompare(true);
        setCountCompare(countCompare + 1);
        setCheckCompare(true);
      }
    } else {
      const index = compareLocal.findIndex((item) => item === product._id);
      // xoa index trong local and products
      const newProductsCompare = [...compareProductLocal];
      newProductsCompare.splice(index, 1);
      const newCompareLocal = [...compareLocal];
      newCompareLocal.splice(index, 1);
      setCountCompare(newCompareLocal.length);
      setCompareLocal(newCompareLocal);
      localStorage.setItem('compare', JSON.stringify(newCompareLocal));
      localStorage.setItem('compareLocal', JSON.stringify(newProductsCompare));
      setCompareProductLocal(newProductsCompare);
      setCheckCompare(false);
    }
  };
  useEffect(() => {
    exitIndex();
  }, [exitIndex]);
  return (
    <Card
      key={category._id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <p>Please remove products to continue comparing</p>
        </DialogContent>
      </Dialog>
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
              to={`/product-page/${category}?ram=${ram}&storage=${storage}`}
            >
              <MDTypography
                sx={{
                  fontSize: '16.25px',
                  fontWeight: '700',
                  height: '50px',
                  color: '#323232',
                }}
                textTransform="capitalize"
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
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: '600',
                      borderRadius: '0.3rem',
                      marginRight: '3px',
                      marginBottom: '3px',
                      backgroundColor: '#edf8f7',
                    }}
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
            justifycontent="space-between"
            alignitems="center"
          >
            <MDTypography
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#1f2128',
              }}
              textTransform="capitalize"
            >
              {formatThousand(salePrice)}đ
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            justifycontent="flex-start"
            alignitems="center"
            sx={{ cursor: 'pointer' }}
            onClick={handleAddCompare}
          >
            {checkCompare === true ? (
              <>
                <CheckCircleOutlineRoundedIcon
                  fontSize="small"
                  sx={{ color: '#6c5dd3' }}
                />
                <MDTypography
                  sx={{
                    fontSize: '14px',
                    marginLeft: '4px',
                    fontWeight: '500',
                    color: '#6c5dd3',
                  }}
                >
                  Added comparison
                </MDTypography>
              </>
            ) : (
              <>
                <AddCircleOutlineRoundedIcon
                  fontSize="small"
                  sx={{ color: '#6c5dd3' }}
                />
                <MDTypography
                  sx={{
                    fontSize: '14px',
                    marginLeft: '4px',
                    fontWeight: '500',
                    color: '#6c5dd3',
                  }}
                >
                  Compare
                </MDTypography>
              </>
            )}
          </MDBox>
        </MDBox>
      </>
    </Card>
  );
}

export default ProductCard;
