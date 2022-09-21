import React from 'react';
import { Row, Col, Breadcrumb, Input } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import TokenService from '../../features/token/token.service';
function Header({ name, subname }) {
  const token = TokenService.getLocalAccessToken();
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: 'capitalize' }}>{name.replace('/', '')}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span className="ant-page-header-heading-title" style={{ textTransform: 'capitalize' }}>
              {subname.replace('/', '')}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          {token ? (
            <Link to="/sign-out" className="btn-sign-in">
              <FontAwesomeIcon icon={faRightToBracket} />
              <span>Sign out</span>
            </Link>
          ) : (
            <Link to="/sign-in" className="btn-sign-in">
              <FontAwesomeIcon icon={faRightToBracket} />
              <span>Sign in</span>
            </Link>
          )}
          <Link to="/profile" className="btn-sign-in">
            <FontAwesomeIcon icon={faCircleUser} />
            <span>Profile</span>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Header;
