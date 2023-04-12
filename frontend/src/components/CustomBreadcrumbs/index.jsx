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

// react-router-dom components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

// Material Dashboard 2 React components
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MDButton from '../MDButton';
function Breadcrumbs({ title, url, light }) {
  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey[600],
          },
        }}
      >
        <Link to={`/products`}>
          <MDButton
            component="span"
            variant="text"
            fontWeight="regular"
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '0px',
              paddingRight: '10px',
              color: '#5b5b5b',
              fontWeight: '500',
              fontSize: '0.875rem',
              textTransform: 'initial !important',
            }}
          >
            Điện thoại
          </MDButton>
        </Link>
        <Link to={`/products/${url}`}>
          <MDButton
            variant="text"
            component="span"
            fontWeight="regular"
            color={light ? 'white' : 'dark'}
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
          >
            {title.replace('-', ' ')}
          </MDButton>
        </Link>
      </MuiBreadcrumbs>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
