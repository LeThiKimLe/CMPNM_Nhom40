import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faToolbox,
  faCircleUser,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { authActions } from '../../../features/auth/auth.slice';
const { Header } = Layout;
const HeaderSignIn = () => {
  const dispatch = useDispatch();
  return (
    <Header>
      <div className="header-col header-nav">
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="dashboard">
            <Link to="/">
              <FontAwesomeIcon icon={faToolbox} />
              <span>Trang chủ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to="/profile">
              <FontAwesomeIcon icon={faCircleUser} />
              <span>Hồ sơ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="signin">
            <Link to="/sign-in">
              <FontAwesomeIcon icon={faRightToBracket} />
              <span>Đăng nhập</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderSignIn;
