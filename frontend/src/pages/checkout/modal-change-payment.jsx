import React, { useEffect, useState } from 'react';
import { Modal, Radio, Space } from 'antd';
import MDButton from '../../components/MDButton';

const ModalChangePayment = (props) => {
  const { open, setOpen, paymentValue, setPaymentValue } = props;
  const [value, setValue] = useState(paymentValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleChangePayment = () => {
    console.log(value);
    setPaymentValue(value);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    setPaymentValue(paymentValue);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title={'Phương thức thanh toán'}
    >
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={0}>Thanh toán khi nhận hàng</Radio>
          <Radio value={1}>Thanh toán qua ví Momo</Radio>
        </Space>
      </Radio.Group>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: '10px',
        }}
      >
        <MDButton
          size="small"
          color="primary"
          sx={{
            textTransform: 'initial !important',
            fontWeight: '500',
          }}
          onClick={handleCancel}
        >
          Hủy
        </MDButton>

        <MDButton
          size="small"
          color="success"
          sx={{
            marginLeft: '10px',
            textTransform: 'initial !important',
            fontWeight: '500',
          }}
          onClick={handleChangePayment}
        >
          Xác nhận
        </MDButton>
      </div>
    </Modal>
  );
};

export default ModalChangePayment;
