import React, { useState, useMemo } from 'react';
import MDBox from '../../components/MDBox';
import CategoryItem from '../../components/CategoryItem';
import CategoryIcon from '@mui/icons-material/Category';
import { useSelector } from 'react-redux';
// react-router-dom components
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Container,
  Stack,
  Menu,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SideNavigation = () => {
  const [icon, setIcon] = useState(false);
  const data = useSelector((state) => state.data);
  const navigate = useNavigate();
  const { loading } = data;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFirstMenuItemClicked, setIsFirstMenuItemClicked] = useState(false);
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
      setIcon(true);
    }
  }

  function handleClose() {
    setAnchorEl(null);
    setIcon(false);
  }

  const handleMenuClick = () => {
    navigate('/products?category=all');
    setIsFirstMenuItemClicked(true);
    handleClose();
  };
  const categoryList = useMemo(() => {
    if (!loading) {
      return data.categories;
    }
  }, [data.categories, loading]);

  const categoryCustom = useMemo(() => {
    if (categoryList && Object.keys(categoryList).length !== 0) {
      const categoryOneList = categoryList.filter((item) => item.level === 1);
      const categoryCustom = categoryOneList.map((item) => {
        return {
          key: item._id,
          name: item.name,
          value: item._id,
        };
      });
      return categoryCustom;
    }
  }, [categoryList]);
  return (
    <MDBox
      color="#323232"
      bgColor="#ffffff"
      borderRadius="none"
      opacity={1}
      sx={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.2)',
      }}
      display="flex"
      justifyContent="space-between"
    >
      <Container>
        <Grid xs={12} container display="flex" justifyContent="space-between">
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
          >
            <>
              <Button
                variant="text"
                size="medium"
                p={0}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: '2px',
                  paddingRight: '10px',
                  color: '#111111',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  textTransform: 'initial !important',
                }}
                startIcon={<CategoryIcon />}
                endIcon={
                  icon ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                aria-owns={anchorEl ? `simple-menu` : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                Phone list
              </Button>
              <Menu
                id={`simple-menu`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                <MenuItem
                  onClick={handleMenuClick}
                  style={
                    isFirstMenuItemClicked
                      ? { backgroundColor: '#f5f5f5' }
                      : { backgroundColor: 'transparent' }
                  }
                >
                  Chọn theo hãng
                </MenuItem>
              </Menu>
            </>
          </Stack>{' '}
          <Stack
            direction="row"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            spacing={3}
          >
            {categoryCustom &&
              Object.keys(categoryCustom).length > 0 &&
              categoryCustom.map((cat, index) => {
                return (
                  <CategoryItem
                    key={index}
                    name={cat.name}
                    value={cat.value}
                    categories={categoryList}
                  />
                );
              })}
          </Stack>
        </Grid>
      </Container>
    </MDBox>
  );
};

export default SideNavigation;
