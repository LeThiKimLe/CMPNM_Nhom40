/* eslint-disable array-callback-return */
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Stack, Divider } from '@mui/material';
import Breadcrumbs from '../../components/CustomBreadcrumbs';
import MDBox from '../../components/MDBox';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDTypography from '../../components/MDTypography';
import MDButton from '../../components/MDButton';

const SingleProduct = () => {
  const location = useLocation();
  const id = location.state?.id;
  const name = location.state?.name;
  const category = location.pathname.split('/')[2];
  // init state
  const [productSelected, setProductSelected] = useState({});
  const [colorList, setColorList] = useState([]);

  // select state
  const [colorSelected, setColorSelected] = useState(0);
  const [optionSelected, setOptionSelected] = useState(0);
  const data = useSelector((state) => state.data);
  const { productGroups, colors } = data;
  useEffect(() => {
    productGroups.map((item) => {
      if (item.category === category) {
        setProductSelected(item);
      }
    });
    let colorCategory = [];
    colors.map((item) => {
      if (item.category === category) {
        const custom = {
          name: item.name,
          value: item.value,
        };
        colorCategory.push(custom);
      }
    });
    setColorList(colorCategory);
  }, [productGroups, category, colors]);

  return (
    <MDBox
      color="#000000"
      bgColor="#ffffff"
      variant="contained"
      width="100vw"
      height="100%"
      sx={{ overflowX: 'hidden' }}
      p={1}
    >
      <Container>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Breadcrumbs title={`Điện thoại ${name}`} url={id} />
        </Grid>

        <Grid>
          <MDTypography sx={{ color: '#111111', paddingLeft: '0px' }}>
            {productSelected.name}
          </MDTypography>
        </Grid>
        <Divider sx={{ borderBottomWidth: '45px' }} flexItem />
        <Grid container spacing={1} justifyContent="space-between" item xs={12}>
          <Grid
            item
            xs={7}
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <MDBox variant="contained" p={2}>
              <img
                width="250px"
                height="300px"
                src={productSelected.picture}
                alt={productSelected.name}
              />
            </MDBox>
          </Grid>
          <Grid item xs={5} justifyContent="flex-start" alignItems="flex-start">
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <MDBox variant="contained">
                {productSelected?.storages
                  ? productSelected.storages.map((item, index) => {
                      return (
                        <MDButton
                          key={item.value}
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: '400',
                            border: '1px solid #2F4F4F',
                            borderRadius: '0.3rem',
                            marginRight: '5px',
                            color: '#2F4F4F',
                          }}
                          onClick={(e) => {
                            console.log(e.currentTarget);
                          }}
                        >
                          {item}
                        </MDButton>
                      );
                    })
                  : null}
              </MDBox>
              <MDBox variant="contained">
                {productSelected?.colors
                  ? productSelected.colors.map((item, index) => {
                      for (let color of colorList) {
                        if (color.value === item) {
                          return (
                            <MDButton
                              key={index}
                              variant="contained"
                              size="small"
                              sx={{
                                fontSize: '0.75rem',
                                fontWeight: '400',
                                border: '1px solid #2F4F4F',
                                borderRadius: '0.3rem',
                                marginRight: '5px',
                                color: '#2F4F4F',
                              }}
                              onClick={(e) => {
                                console.log(e.currentTarget);
                              }}
                            >
                              {color.name}
                            </MDButton>
                          );
                        }
                      }
                    })
                  : null}
              </MDBox>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default SingleProduct;
