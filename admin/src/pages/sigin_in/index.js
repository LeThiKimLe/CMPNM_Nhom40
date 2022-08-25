import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Row, Col, Typography, Form, Switch } from 'antd';
import signinbg from '../../assets/images/img-signin.jpg';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faCircleUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import InputRefactor from '../../components/ui/input';
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

function SignIn() {
  return (
    <Layout className="layout-default layout-signin">
      <Header>
        {/* <div className="header-col header-brand">
          <h5>Admin Dashboard</h5>
        </div> */}
        <div className="header-col header-nav">
          <Menu mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faToolbox} />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/profile">
                <FontAwesomeIcon icon={faCircleUser} />
                <span>Profile</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/sign-in">
                <FontAwesomeIcon icon={faRightToBracket} />
                <span> Sign In</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form layout="vertical" className="row-col">
              <InputRefactor className="username" label="Email" placeholder="Email" required={true} message="Please input your email!" />
              <InputRefactor className="username" label="Password" placeholder="Password" required={true} message="Please input your password!" />
              <Form.Item className="aligin-center" valuePropName="checked">
                <Switch defaultChecked onChange={onChange} />
                Remember me
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>

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
    </Layout>
  );
}

export default SignIn;
