import React from 'react';
import { Layout } from 'antd';
import Sidenav from '../side-navigation';
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
  {
    key: 'banner',
    value: 'Quảng cáo',
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
  if (pathname === 'sign-in') {
    return <>{children}</>;
  } else {
    return (
      <Layout className="layout-dashboard" style={{ backgroundColor: '#fff' }}>
        {/* sider custom */}
        <Sider
          trigger={null}
          theme="dark"
          className={`sider-primary ant-layout-sider-primary`}
          style={{
            backgroundColor: '#05050b',
            borderRadius: '10px',
            marginLeft: '20px',
            margin: '10px',
          }}
        >
          <Sidenav />
        </Sider>
        <Layout>
          <HeaderAnt name={namePage} subname={namePage} />
          <Content className="content-ant">{children}</Content>
        </Layout>
      </Layout>
    );
  }
};

export default Main;
