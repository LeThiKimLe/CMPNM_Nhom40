import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import React from 'react';
import Header from '../header';
import Navbar from '../navbar';
import SideNavigation from '../side-navigation';

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
        <Header />
        <Navbar />
        <SideNavigation />

        {children}
      </>
    );
  }
}

export default Layout;
