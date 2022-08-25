import React from 'react';
import { Row, Col, Breadcrumb, Input } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
function Header({ name, subname }) {
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
          <Link to="/sign-in" className="btn-sign-in">
            <FontAwesomeIcon icon={faRightToBracket} />
            <span>Sign in</span>
          </Link>
          <Input className="header-search" placeholder="Type here..." prefix={<SearchOutlined />} />
        </Col>
      </Row>
    </>
  );
}

export default Header;
