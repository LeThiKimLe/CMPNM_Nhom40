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

// prop-types is a library for typechecking of props

// @mui material components
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// Material Dashboard 2 React components
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import MDButton from '../MDButton';
import { Chip } from '@mui/material';

function ProductCard({
  image,
  name,
  screen,
  ram,
  regularPrice,
  salePrice,
  ramCheck = 0,
}) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
      }}
    >
      <MDBox position="relative" width="100.25%" sx={{ marginBottom: '10px' }}>
        <CardMedia
          src={image}
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
      <MDBox mb={0.5} mx={0.5}>
        <MDBox mb={0.5}>
          <MDTypography
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
            textTransform="capitalize"
            color="dark"
          >
            {name}
          </MDTypography>
        </MDBox>
        <MDBox
          mb={0.5}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* thông tin màn hình */}
          {screen.map((item) => {
            return (
              <Chip
                size="medium"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  borderRadius: '0.3rem',
                  marginRight: '3px',
                }}
                label={item}
              />
            );
          })}
        </MDBox>
        <MDBox
          mb={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* // danh sách ram */}
          {ram.map((item, index) => {
            if (ramCheck === index) {
              return (
                <MDButton
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '2px 1px',
                    border: '2px solid #2F4F4F',
                    borderRadius: '0.3rem',
                    marginRight: '3px',
                    color: '#2F4F4F',
                  }}
                >
                  {item}
                </MDButton>
              );
            } else {
              return (
                <MDButton
                  variant="contained"
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '2px 1px',
                    border: '1px solid #808080',
                    borderRadius: '0.3rem',
                    marginRight: '3px',
                  }}
                >
                  {item}
                </MDButton>
              );
            }
          })}
        </MDBox>
        <MDBox>
          <MDTypography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#696969',
            }}
            textTransform="capitalize"
          >
            {salePrice}đ
          </MDTypography>
        </MDBox>
        <MDBox>
          <MDTypography
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
            textTransform="capitalize"
            color="dark"
          >
            {regularPrice}đ
          </MDTypography>
        </MDBox>
        {/* <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDButton
            component={Link}
            to={action.route}
            variant="outlined"
            size="small"
            color={action.color}
          >
            {action.label}
          </MDButton>
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox> */}
      </MDBox>
    </Card>
  );
}

export default ProductCard;
