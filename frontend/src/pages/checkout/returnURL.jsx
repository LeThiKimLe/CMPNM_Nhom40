import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Result, Button } from 'antd';
import crypto from 'crypto';
const queryString = require('query-string');
const AccessKeyMOMO = 'F8BBA842ECF85';
const SecretKeyMOMO = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

const ReturnURL = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  const searchObject = queryString.parse(search);

  const {
    extraData,
    amount,
    message,
    orderId,
    orderInfo,
    orderType,
    partnerCode,
    payType,
    requestId,
    responseTime,
    resultCode,
    transId,
  } = searchObject;
  const searchCopy = searchObject.signature;
  delete searchObject.signature;

  const rawSignature =
    'accessKey=' +
    AccessKeyMOMO +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&message=' +
    message +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&orderType=' +
    orderType +
    '&partnerCode=' +
    partnerCode +
    '&payType=' +
    payType +
    '&requestId=' +
    requestId +
    '&responseTime=' +
    responseTime +
    '&resultCode=' +
    resultCode +
    '&transId=' +
    transId;
  useEffect(() => {
    const signature = crypto
      .createHmac('sha256', SecretKeyMOMO)
      .update(rawSignature)
      .digest('hex');
    if (signature === searchCopy && resultCode === '0') {
      // update order and setResult == success
    } else {
      setResult('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Layout>
        {result === 'success' ? (
          <Result
            status="success"
            title="Đặt hàng thành công!!! Cảm ơn quý khách đã tin tưởng chúng tôi."
            subTitle={`Mã đơn hàng: ${orderId}`}
            extra={[
              <Link to={'/'}>
                <Button type="primary" key="console">
                  Trở về trang chủ
                </Button>
              </Link>,
              <Link to={`/order_details/${orderId}`}>
                <Button key="buy">Xem chi tiết đơn hàng</Button>
              </Link>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
              <Button type="primary" key="console">
                Go Console
              </Button>,
              <Button key="buy">Buy Again</Button>,
            ]}
          ></Result>
        )}
      </Layout>
    </div>
  );
};
