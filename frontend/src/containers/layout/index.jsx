import { useLocation } from 'react-router-dom';
import React from 'react';

import Header from '../header';
import Navbar from '../navbar';
import SideNavigation from '../side-navigation';
import Footer from '../footer';
import MDBox from '../../components/MDBox';
import { Divider } from '@mui/material';
function Layout({ children }) {
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');
  if (
    pathname === 'sign-in' ||
    pathname === 'sign-up' ||
    pathname === 'finish-signup' ||
    pathname === 'verify-email' ||
    pathname === 'resend-verify-email'
  ) {
    return <>{children}</>;
  } else {
    return (
      <>
        <MDBox
          color="#000"
          bgColor="#fff"
          alignItems="center"
          sx={{
            paddingBottom: '10px',
          }}
        >
          <Header />
          <Navbar />
          <SideNavigation />
        </MDBox>
        {children}
        <Footer />
      </>
    );
  }
}

export default Layout;
