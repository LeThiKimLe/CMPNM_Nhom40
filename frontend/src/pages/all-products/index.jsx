/* eslint-disable array-callback-return */
import {
  Container,
  Divider,
  Checkbox,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Input,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import CurrencyInput from 'react-currency-input-field';
import { Stack } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import userThunk from '../../features/user/user.service';
import ProductCard2 from '../../components/ProductItem2';
import ProductCard from '../../components/ProductItem';
import {
  getShuffledArr,
  getListProductByCategory,
} from '../../utils/custom-products';
const typePhone = [
  {
    name: 'iOS',
  },
  {
    name: 'Android',
  },
];
const rams = [
  {
    value: '2GB',
  },
  {
    value: '3GB',
  },
  {
    value: '4GB',
  },
  {
    value: '6GB',
  },
  {
    value: '8GB',
  },
  {
    value: '12GB',
  },
];
const storages = [
  {
    value: '32GB',
  },
  {
    value: '64GB',
  },
  {
    value: '128GB',
  },
  {
    value: '256GB',
  },
  {
    value: '512GB',
  },
  {
    value: '1TB',
  },
];
const sortOptions = [
  {
    key: '% giảm',
    name: '% giảm',
    value: 0,
  },
  {
    key: 'Giá giảm dần',
    name: 'Giá giảm dần',
    value: -1,
  },
  {
    key: 'Giá tăng dần',
    name: 'Giá tăng dần',
    value: 1,
  },
  {
    key: 'Nổi bật',
    name: 'Nổi bật',
    value: '2',
  },
];
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
        maxWidth: '250px',
        minWidth: '240px',
        marginRight: '13px',
        marginBottom: '8px',
        ...sx,
      }}
      {...other}
    />
  );
}

const AllProductPage = () => {
  const dispatch = useDispatch();
  const categories = JSON.parse(localStorage.getItem('categories'));
  const data = useSelector((state) => state.data);
  const { productGroups } = data;
  const [minPriceInput, setMinPriceInput] = useState(null);
  const [maxPriceInput, setMaxPriceInput] = useState(null);
  const [categoryOption, setCategoryOption] = useState([]);
  const [osOption, setOsOption] = useState([]);
  const [ramOption, setRamOption] = useState([]);
  const [storageOption, setStorageOption] = useState([]);
  const [sortOption, setSortOption] = useState('Giá tăng dần');
  const [sortOptionValue, setSortOptionValue] = useState(2);
  const [listProduct, setListProduct] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleChangeSort = (e) => {
    sortOptions.map((item) => {
      if (item.key === e.target.value) {
        setSortOptionValue(item.value);
      }
    });
    setSortOption(e.target.value);
  };
  const handleCategoryOption = (e) => {
    const index = categoryOption.indexOf(e.target.value);
    if (index === -1) {
      setCategoryOption([...categoryOption, e.target.value]);
    } else {
      setCategoryOption(
        categoryOption.filter((cate) => cate !== e.target.value)
      );
    }
  };
  const handleOSChange = (e) => {
    const index = osOption.indexOf(e.target.value);
    if (index === -1) {
      setOsOption([...osOption, e.target.value]);
    } else {
      setOsOption(osOption.filter((os) => os !== e.target.value));
    }
  };
  const handleRamChange = (e) => {
    const index = ramOption.indexOf(e.target.value);
    if (index === -1) {
      setRamOption([...ramOption, e.target.value]);
    } else {
      setRamOption(ramOption.filter((ram) => ram !== e.target.value));
    }
  };
  const handleStorageChange = (e) => {
    const index = storageOption.indexOf(e.target.value);
    if (index === -1) {
      setStorageOption([...storageOption, e.target.value]);
    } else {
      setStorageOption(
        storageOption.filter((storage) => storage !== e.target.value)
      );
    }
  };
  const handleChangeMin = (newValue) => {
    console.log('onValueChange fired');
    if (newValue === undefined) {
      setMinPriceInput('0');
    } else {
      setMinPriceInput(newValue);
    }
  };
  const handleChangeMax = (newValue) => {
    console.log('onValueChange fired');
    if (newValue === undefined) {
      setMaxPriceInput('0');
    } else {
      setMaxPriceInput(newValue);
    }
  };

  useEffect(() => {
    if (
      Object.keys(osOption).length === 0 &&
      Object.keys(ramOption).length === 0 &&
      Object.keys(storageOption).length === 0
    ) {
      setListProduct(
        getListProductByCategory(productGroups, categoryOption, sortOptionValue)
      );
    } else {
      const searchModal = {
        category: categoryOption,
        os: osOption,
        ram: ramOption,
        storage: storageOption,
        sort: sortOptionValue,
      };
      dispatch(userThunk.getProductsOptionAPI())
        .unwrap()
        .then((value) => {
          setLoading(false);
          setListProduct(value.list);
        });
    }
  }, [
    dispatch,
    sortOptionValue,
    categoryOption,
    osOption,
    ramOption,
    storageOption,
    productGroups,
    sortOption,
  ]);
  return (
    <MDBox
      color="#000000"
      bgColor="Light"
      variant="contained"
      borderRadius="none"
      opacity={1}
      display="flex"
      justifyContent="space-between"
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
          <Grid
            item
            sx={{ paddingTop: '10px', marginTop: '10px' }}
            container
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            xs={12}
          >
            <Grid
              item
              xs={2.5}
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ paddingRight: '8px' }}
            >
              <MDBox
                borderRadius="lg"
                width="100%"
                height="100%"
                bgColor="white"
                variant="contained"
                sx={{ padding: '18px 27px', marginBottom: '10px' }}
              >
                <Stack sx={{ marginBottom: '15px' }}>
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                      marginBottom: '8px',
                    }}
                  >
                    Thương hiệu
                  </MDTypography>
                  {categories && categories.length !== 0
                    ? categories.map((item, index) => {
                        if (item.level === 1) {
                          const checkedValue = categoryOption.includes(
                            item._id
                          );
                          return (
                            <FormControlLabel
                              key={index}
                              label={item.name}
                              control={
                                <Checkbox
                                  value={item._id}
                                  checked={checkedValue}
                                  onChange={handleCategoryOption}
                                />
                              }
                            />
                          );
                        }
                      })
                    : null}
                </Stack>
                <Divider />
                <Stack spacing={1} sx={{ marginBottom: '15px' }}>
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                      marginBottom: '8px',
                    }}
                  >
                    Mức giá
                  </MDTypography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                  >
                    <CurrencyInput
                      placeholder="0"
                      value={minPriceInput}
                      onValueChange={handleChangeMin}
                      step={10}
                      style={{
                        border: '1px solid #999999',
                        borderRadius: '8px',
                        padding: '5px 8px',
                        width: '90px',
                        height: '35px',
                        fontSize: '14px',
                      }}
                    />
                    <MDTypography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2b3445',
                        marginBottom: '8px',
                      }}
                    >
                      -
                    </MDTypography>
                    <CurrencyInput
                      placeholder="1000000"
                      value={maxPriceInput}
                      onValueChange={handleChangeMax}
                      step={10}
                      style={{
                        border: '1px solid #999999',
                        borderRadius: '8px',
                        padding: '5px 8px',
                        width: '90px',
                        height: '35px',
                        fontSize: '14px',
                      }}
                    />
                  </Stack>
                </Stack>
                <Divider />
                <Stack direction="column" sx={{ marginBottom: '15px' }}>
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                      marginBottom: '8px',
                    }}
                  >
                    Thương hiệu
                  </MDTypography>
                  {typePhone.map((item, index) => {
                    const checkedValue = osOption.includes(item.name);
                    return (
                      <FormControlLabel
                        key={index}
                        label={item.name}
                        control={
                          <Checkbox
                            value={item.name}
                            checked={checkedValue}
                            onChange={handleOSChange}
                          />
                        }
                      />
                    );
                  })}
                </Stack>
                <Divider />
                <Stack direction="column" sx={{ marginBottom: '15px' }}>
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                      marginBottom: '8px',
                    }}
                  >
                    RAM
                  </MDTypography>
                  {rams.map((item, index) => {
                    const checkedValue = ramOption.includes(item.value);
                    return (
                      <FormControlLabel
                        key={index}
                        label={item.value}
                        control={
                          <Checkbox
                            value={item.value}
                            checked={checkedValue}
                            onChange={handleRamChange}
                          />
                        }
                      />
                    );
                  })}
                </Stack>
                <Divider />
                <Stack direction="column" sx={{ marginBottom: '15px' }}>
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                      marginBottom: '8px',
                    }}
                  >
                    Dung lượng lưu trữ
                  </MDTypography>
                  {storages.map((item, index) => {
                    const checkedValue = storageOption.includes(item.value);
                    return (
                      <FormControlLabel
                        key={index}
                        label={item.value}
                        control={
                          <Checkbox
                            value={item.value}
                            checked={checkedValue}
                            onChange={handleStorageChange}
                          />
                        }
                      />
                    );
                  })}
                </Stack>
              </MDBox>
            </Grid>
            <Grid
              item
              xs={9.5}
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{ paddingLeft: '8px' }}
            >
              <MDBox
                borderRadius="lg"
                width="100%"
                height="100%"
                bgColor="white"
                variant="contained"
                sx={{ padding: '16px 27px', marginBottom: '10px' }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2b3445',
                    }}
                  >
                    48 điện thoại
                  </MDTypography>
                  <Select
                    sx={{ width: '150px', height: '35px' }}
                    value={sortOption}
                    onChange={handleChangeSort}
                  >
                    {sortOptions.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.name}>
                          {item.key}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </MDBox>
              <MDBox
                variant="contained"
                borderRadius="lg"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                }}
              >
                {listProduct.length > 0
                  ? listProduct.map((item, index) => {
                      if (index < 15) {
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
                      }
                    })
                  : null}
                {/* {listProduct.length > 0
                  ? listProduct.map((item, index) => {
                      if (index < 12) {
                        return (
                          <Item key={index}>
                            <ProductCard2 index={item._id} item={item} />
                          </Item>
                        );
                      }
                    })
                  : null} */}
              </MDBox>
            </Grid>
          </Grid>
        )}
      </Container>
    </MDBox>
  );
};

export default AllProductPage;
