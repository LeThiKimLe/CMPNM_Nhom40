/* eslint-disable array-callback-return */
import {
  Container,
  Divider,
  Checkbox,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { _ } from 'lodash';
import { useLocation } from 'react-router-dom';
import MDBox from '../../components/MDBox';
import MDTypography from '../../components/MDTypography';
import CurrencyInput from 'react-currency-input-field';
import { Stack } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import userThunk from '../../features/user/user.service';
import ProductCard2 from '../../components/ProductItem2';
import ProductCard from '../../components/ProductItem';
import { getListProductByCategory } from '../../utils/custom-products';
import optionFilter from './options';
import ProductPagination from './pagination';
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
const { typePhone, rams, storages, sortOptions } = optionFilter;
const AllProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = JSON.parse(localStorage.getItem('categories'));
  const data = useSelector((state) => state.data);
  const { productGroups } = data;
  const [minPriceInput, setMinPriceInput] = useState(null);
  const [maxPriceInput, setMaxPriceInput] = useState(null);
  const [categoryOption, setCategoryOption] = useState([]);
  const [listCategoryFilter, setListCategoryFilter] = useState([]);
  const [osOption, setOsOption] = useState([]);
  const [ramOption, setRamOption] = useState([]);
  const [storageOption, setStorageOption] = useState([]);
  const [sortOption, setSortOption] = useState('Nổi bật');
  const [sortOptionValue, setSortOptionValue] = useState(2);
  const [listProductGroup, setListProductGroup] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [checkProduct, setCheckProduct] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

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
    let list = [];
    if (!location.state || Object.keys(listCategoryFilter).length === 0) {
      list = categories.filter((c) => c.level === 1);
    } else {
      const listFilter = location.state.listFilter;
      if (Object.keys(listFilter).length === 0) {
        list = categories.filter((c) => c.level === 1);
      } else {
        list = categories.filter((c) => listFilter.includes(c._id));
      }
    }
    setListCategoryFilter(list);
  }, [location.state])
  useEffect(() => {
    setLoading(true);
    console.log(location.state)
    if (
      !location.state && 
      Object.keys(osOption).length === 0 &&
      Object.keys(ramOption).length === 0 &&
      Object.keys(storageOption).length === 0
    ) {
      const newListGroup = getListProductByCategory(
        productGroups,
        categoryOption,
        sortOptionValue
      );
      setAmount(newListGroup.length);
      setCheckProduct(1);
      setListProductGroup(newListGroup);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      const searchModel = {
        category: Object.keys(categoryOption).length !== 0 ? categoryOption : listCategoryFilter,
        os: osOption,
        ram: ramOption,
        storage: storageOption,
        sort: sortOptionValue,
      };
      if (location.state) {
        searchModel.child = true;
      }
      console.log('searchModel', searchModel);
      setCheckProduct(2);

      dispatch(userThunk.getProductsOptionAPI(searchModel))
        .unwrap()
        .then((value) => {
          console.log(value);
          setAmount(value.list.total);
          setTotalPage(value.list.totalPage);
          setListProduct(value.list.data);
          setLoading(false);
        });
    }
  }, [
    listCategoryFilter,
    location.state,
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
            <CircularProgress color="dark" />
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
              > <Stack sx={{ marginBottom: '15px' }}>
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
      {listCategoryFilter && listCategoryFilter.length !== 0
        ? listCategoryFilter.map((item, index) => {
          const checkedValue = categoryOption.includes(item._id);
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
            }/>
          )}): null}
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
                    Loại điện thoại
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
                    {!amount ? '0 sản phẩm' : `${amount} sản phẩm`}
                  </MDTypography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <MDTypography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2b3445',
                      }}
                    >
                      Sắp xếp theo:
                    </MDTypography>
                    <Select
                      sx={{ width: '150px', height: '35px' }}
                      value={sortOption}
                      onChange={handleChangeSort}
                    >
                      {sortOptions.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item.name}
                            sx={{ fontWeight: '500' }}
                          >
                            {item.key}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Stack>
                </Stack>
              </MDBox>
              {loading ? (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <CircularProgress color="dark" />
                </MDBox>
              ) : Object.keys(osOption).length === 0 &&
                Object.keys(ramOption).length === 0 &&
                Object.keys(storageOption).length === 0 &&
                Array.isArray(listProductGroup) ? (
                <MDBox
                  variant="contained"
                  borderRadius="lg"
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                  }}
                >
                  {listProductGroup.map((item, index) => {
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
                  })}
                </MDBox>
              ) : Object.keys(osOption).length === 0 &&
                Object.keys(ramOption).length === 0 &&
                Object.keys(storageOption).length === 0 &&
                Object.keys(listProductGroup).length === 0 ? (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <MDTypography sx={{ color: '#111111' }}>
                    Không tìm thấy sản phẩm
                  </MDTypography>
                </MDBox>
              ) : Object.keys(listProduct).length === 0 ? (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <MDTypography sx={{ color: '#111111' }}>
                    Không tìm thấy sản phẩm
                  </MDTypography>
                </MDBox>
              ) : Array.isArray(listProduct) ? (
                <MDBox
                  variant="contained"
                  borderRadius="lg"
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                  }}
                >
                  {listProduct.map((item, index) => {
                    if (index < 12) {
                      return (
                        <Item key={index}>
                          <ProductCard2 index={item._id} item={item} />
                        </Item>
                      );
                    }
                  })}
                </MDBox>
              ) : null}
              <Stack>
                {amount && !loading ? (
                  <ProductPagination count={totalPage} />
                ) : null}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </MDBox>
  );
};

export default AllProductPage;
