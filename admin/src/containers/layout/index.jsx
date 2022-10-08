import React from 'react';
import { Layout } from 'antd';
import Sidenav from '../side-navigation';
import FooterComponent from '../footer';
import HeaderAnt from '../header';
import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const Main = ({ children }) => {
  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  if (
    pathname === 'sign-in' ||
    pathname === 'verify-email' ||
    pathname === 'resend-verify-email'
  ) {
    return <>{children}</>;
  } else {
    return (
      <Layout className="layout-dashboard">
        {/* sider custom */}
        <Sider
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary`}
          style={{ background: 'transparent' }}
        >
          <Sidenav color={'1890ff'} />
        </Sider>
        <Layout className="layout-dashboard">
          <Header>
            <HeaderAnt name={pathname} subname={pathname} />
          </Header>
          <Content className="content-ant">{children}</Content>
          <FooterComponent />
        </Layout>
      </Layout>
    );
  }
};

export default Main;
