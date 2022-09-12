import { Layout, Menu } from 'antd';
import React from 'react';

const { Footer } = Layout;
const FooterSignIn = () => {
  return (
    <Footer>
      <Menu mode="horizontal">
        <Menu.Item>About Us</Menu.Item>
        <Menu.Item>Teams</Menu.Item>
        <Menu.Item>Products</Menu.Item>
        <Menu.Item>Blogs</Menu.Item>
      </Menu>
      <p className="copyright">
        {' '}
        Copyright © 2021 Muse by <a href="#pablo">Bui Tiep</a>.{' '}
      </p>
    </Footer>
  );
};

export default FooterSignIn;
