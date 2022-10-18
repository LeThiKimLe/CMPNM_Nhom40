/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

// Material Dashboard 2 React components
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';

// custom styles for the NotificationItem
import menuItem from './styles';

const NotificationItem = forwardRef(({ title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <MDBox
      component={Link}
      py={0.2}
      display="flex"
      alignItems="center"
      lineHeight={0.8}
    >
      <MDTypography variant="button" color="dark" fontWeight="regular">
        {title}
      </MDTypography>
    </MDBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NotificationItem;
