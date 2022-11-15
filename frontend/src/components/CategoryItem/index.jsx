import React, { useState } from 'react';
import { MenuItem, Menu, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const CategoryItem = (props) => {
  const { name, index, value, categories } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [icon, setIcon] = useState(false);
  const listCategory = categories.filter((item) => item.parentId === value);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    setIcon(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setIcon(false);
  }
  return (
    <div key={index}>
      <Button
        id={`fade-button-${name}`}
        variant="text"
        size="medium"
        p={0}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '10px',
          paddingRight: '0px',
          color: '#111111',
          fontWeight: '500',
          fontSize: '0.875rem',
          textTransform: 'initial !important',
        }}
        endIcon={
          listCategory.length > 0 ? (
            icon ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )
          ) : null
        }
        aria-owns={anchorEl ? `simple-menu-${name}` : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {name}
      </Button>
      {listCategory.length > 0 ? (
        <Menu
          id={`simple-menu-${name}`}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          {listCategory.map((item) => {
            return (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Menu>
      ) : null}
    </div>
  );
};

export default CategoryItem;
