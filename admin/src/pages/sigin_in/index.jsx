import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Spin,
  Alert,
} from 'antd';
import signinbg from '../../assets/images/img-signin.jpg';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderSignIn from './components/header';
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
  }, [user, isLoggedIn, navigate]);

  return (
    <Layout className="layout-default layout-signin">
      <HeaderSignIn />
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 6, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Đăng nhập</Title>
            <Title className="font-regular text-muted" level={5}>
              Nhập email và mật khẩu để đăng nhập
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
                    message: 'Vui lòng nhập địa chỉ email!',
                  },
                  {
                    type: 'email',
                    message: 'Vui lòng nhập đúng địa chỉ email',
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Email"
                  style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                />
              </Form.Item>
              <Form.Item
                className="username"
                label="Mật khẩu"
                name="password"
                style={{ fontWeight: '600' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                  {
                    min: 6,
                    message: 'Mật khẩu phải tối thiểu 6 kí tự!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                />
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 12 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default SignIn;
