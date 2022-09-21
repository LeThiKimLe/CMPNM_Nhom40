import { Layout, Button, Row, Col, Typography, Form, Switch, Input, Spin, Alert } from 'antd';
import signinbg from '../../assets/images/img-signin.jpg';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderSignIn from './components/header';
import FooterSignIn from './components/footer';
import authThunk from '../../features/auth/auth.service';
import { authActions } from '../../features/auth/auth.slice';
const { Title } = Typography;
const { Content } = Layout;

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { logging, isLoggedIn, error, user, message } = auth;
  const onFinish = (values) => {
    const { email, password } = values;
    const userData = {
      email,
      password,
    };
    dispatch(authThunk.signinAPI(userData));
  };

  useEffect(() => {
    if (isLoggedIn || user) {
      navigate('/');
    }
    dispatch(authActions.reset());
  }, [user, isLoggedIn, navigate, dispatch]);
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Layout className="layout-default layout-signin">
      <HeaderSignIn />
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
            <Title className="mb-15">Sign In</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            {error ? <Alert message={message} type="error" showIcon /> : null}
            <Form
              layout="vertical"
              className="row-col"
              autoComplete="off"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                className="username"
                label="Email"
                style={{ fontWeight: '600' }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Password"
                name="password"
                style={{ fontWeight: '600' }}
                rules={[
                  {
                    min: 6,
                    message: 'Password min required 6 character',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                <Switch defaultChecked onChange={onChange} />
                Remember me
              </Form.Item>
              <Form.Item
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {logging ? <Spin /> : null}
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
      <FooterSignIn />
    </Layout>
  );
}

export default SignIn;
