import { useLocation } from 'react-router-dom';
import React from 'react';
import MenuCategories from '../side-navigation';
import Header from '../header';
import Navbar from '../navbar';
function Layout({ children }) {
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');
  if (
    pathname === 'sign-in' ||
    pathname === 'sign-up' ||
    pathname === 'verify-email' ||
    pathname === 'resend-verify-email'
  ) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Header />
        <Navbar />
        <MenuCategories />
        {children}
      </>
    );
  }
}

export default Layout;
