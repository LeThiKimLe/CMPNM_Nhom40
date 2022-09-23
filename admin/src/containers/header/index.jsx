import React from 'react';
import { Row, Col, Breadcrumb, Input, Button } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { authActions } from '../../features/auth/auth.slice';
import TokenService from '../../features/token/token.service';
import { useNavigate } from 'react-router-dom';
function Header({ name, subname }) {
  const dispatch = useDispatch();

  const token = TokenService.getLocalAccessToken();
  const handleSignOut = () => {
    dispatch(authActions.signout());
  };
  const navigate = useNavigate();
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
            <Button className="btn-sign-in" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          ) : (
            <Button className="btn-sign-in" onClick={() => navigate('/sign-in')}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          )}
          <Button className="btn-sign-in">
            <FontAwesomeIcon icon={faCircleUser} />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
