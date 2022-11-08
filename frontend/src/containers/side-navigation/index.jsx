import React, { useState } from 'react';
import MDBox from '../../components/MDBox';
import CategoryItem from '../../components/CategoryItem';
import CategoryIcon from '@mui/icons-material/Category';
// react-router-dom components
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
import { useSelector } from 'react-redux';

const SideNavigation = () => {
  const [icon, setIcon] = useState(false);

  const data = useSelector((state) => state.data);
  const { categories } = data;
  let categoryLevelOne = categories.filter((item) => item.level === 1);
  let categoryCustom = categoryLevelOne.map((item) => {
    return {
      key: item._id,
      name: item.name,
      value: item._id,
    };
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

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
  return (
    <MDBox
      color="dark"
      bgColor="white"
      opacity={1}
      display="flex"
      sx={{
        paddingTop: '10px',
        paddingBottom: '10px',
      }}
      shadow="lg"
      alignItems="center"
    >
      <Container>
        <Stack direction="row" spacing={2}>
          <Grid container item xs={12} spacing={1}>
            <Grid xs={6} item alignItems="center">
              <>
                <Button
                  id={`fade-button`}
                  variant="text"
                  size="medium"
                  p={0}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: '10px',
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
                  Danh sách điện thoại
                </Button>
                <Menu
                  id={`simple-menu`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                >
                  <MenuItem onClick={handleClose}>Chọn theo hãng</MenuItem>
                  <MenuItem onClick={handleClose}>Chọn theo mức giá</MenuItem>
                  <MenuItem onClick={handleClose}>Loại điện thoại</MenuItem>
                  <MenuItem onClick={handleClose}>Chọn theo nhu cầu</MenuItem>
                  <MenuItem onClick={handleClose}>Điện thoại hot</MenuItem>
                </Menu>
              </>
            </Grid>
            <Grid item xs={4} justifyContent="flex-end" alignItems="center">
              <Stack direction="row" spacing={1}>
                {categoryCustom.map((cat, index) => {
                  return (
                    <CategoryItem
                      key={index}
                      name={cat.name}
                      value={cat.value}
                      categories={categories}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
};

export default SideNavigation;
