import React from 'react';
import { Layout } from 'antd';
import Sidenav from '../side-navigation';
import FooterComponent from '../footer';
import HeaderAnt from '../header';
import { useLocation } from 'react-router-dom';
const namePage = [
  {
    key: 'products',
    value: 'Sản phẩm',
  },
  {
    key: 'categories',
    value: 'Thương hiệu',
  },
  {
    key: 'users',
    value: 'Người dùng',
  },
  {
    key: 'orders',
    value: 'Đơn hàng',
  },
];
const getPathName = (pathName) => {
  let name = '';
  namePage.map((item) => {
    if (item.key === pathName) {
      name = item.value;
    }
  });
  return name;
};
const { Sider, Content } = Layout;
const Main = ({ children }) => {
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');
  const namePage = getPathName(pathname);
  if (
    pathname === 'sign-in' ||
    pathname === 'verify-email' ||
    pathname === 'resend-verify-email'
  ) {
    return <>{children}</>;
  } else {
    return (
      <Layout
        className="layout-dashboard"
        style={{ backgroundColor: '#f3f6f4' }}
      >
        {/* sider custom */}
        <Sider
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary`}
          style={{ background: 'transparent' }}
        >
          <Sidenav color={'#1890ff'} />
        </Sider>
        <Layout className="layout-dashboard">
          <HeaderAnt name={namePage} subname={namePage} />
          <Content className="content-ant">{children}</Content>
          <FooterComponent />
        </Layout>
      </Layout>
    );
  }
};

export default Main;
