import React from 'react';
import MDBox from '../../components/MDBox';
import { Container, Stack, Button, Menu, MenuItem, Fade } from '@mui/material';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Stack direction="row">
          <span>
            <Button onClick={handleClick}>Danh mục</Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Apple</MenuItem>
              <MenuItem onClick={handleClose}>Samsung</MenuItem>
              <MenuItem onClick={handleClose}>Vivo</MenuItem>
            </Menu>
          </span>
          <span>
            <Button>Liên hệ</Button>
          </span>
        </Stack>
      </Container>
    </>
  );
}
