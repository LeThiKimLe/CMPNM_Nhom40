import React, { useMemo, useState } from 'react';
import { Button, Result, Spin, Row, Col, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userThunk from '../../features/users/user.service';
function VerifyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailValue, setEmailValue] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const onClickHandler = () => {
    console.log(emailValue);
    setLoading(true);
    dispatch(userThunk.reSendVerifyEmailAPI(emailValue))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate('/resend-verify-email');
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useMemo(() => {
    const verifyData = { token, email };
    dispatch(userThunk.verifyEmailAPI(verifyData));
  }, [dispatch, token, email]);
  if (user.loading) {
    return (
      <div
        style={{
          margin: 'auto',
          width: '50%',

          padding: '10px',
        }}
      >
        <Spin size="large" />{' '}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {user.error ? (
        <Result
          status="error"
          title={user.message}
          subTitle="You resend verify email"
          extra={
            <div>
              <Row style={{ marginBottom: '10px' }}>
                <Col span={24}>
                  {' '}
                  <Input
                    placeholder="Email"
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {loading ? <Spin /> : null}
                  </div>
                  <Button type="primary" key="console" onClick={onClickHandler}>
                    Resend email
                  </Button>
                </Col>
              </Row>
            </div>
          }
        />
      ) : (
        <Result
          status="success"
          title="Email has been verified successfully!!!"
          subTitle="You can now sign in"
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/sign-in')}
            >
              Go Sign In Page
            </Button>
          }
        />
      )}
    </div>
  );
}

export default VerifyAccount;
