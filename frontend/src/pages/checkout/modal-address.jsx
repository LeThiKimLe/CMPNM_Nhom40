/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, List, Divider, Button } from 'antd';
import ModalAddAddress from './modal-add-address';
import AddressItem from './addressItem';

const ModalAddress = (props) => {
  const {
    open,
    onCancel,
    onHandleCancel,
    addressIndexSelected,
    listAddress,
    handleChangeAddress,
    addressIndex,
    setAddressIndex,
    setListAddress,
  } = props;
  const [openModalAdd, setOpenModalAdd] = useState(false);
  useEffect(() => {
    setAddressIndex(addressIndexSelected);
  }, []);
  return (
    <Modal
      footer={null}
      open={open}
      onCancel={onCancel}
      title="Địa chỉ của tôi"
      width={600}
    >
      <ModalAddAddress
        open={openModalAdd}
        setOpen={setOpenModalAdd}
        onCancel={() => setOpenModalAdd(false)}
        setListAddress={setListAddress}
      />
      <List
        itemLayout="horizontal"
        dataSource={listAddress}
        renderItem={(item, index) => (
          <div key={item._id}>
            <AddressItem
              item={item}
              keyIndex={index}
              addressSelected={addressIndex}
              setAddressSelected={setAddressIndex}
            />
            {index === listAddress.length - 1 ? null : <Divider />}
          </div>
        )}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginTop: '10px',
        }}
      >
        <Button
          style={{
            border: '1px solid #C0C0C0',
            borderRadius: '8px',
            background: '#344767',
            color: 'white',
            width: '30%',
            marginRight: '10px',
            marginTop: '20px',
          }}
          onClick={() => setOpenModalAdd(true)}
        >
          Thêm địa chỉ mới
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: '10px',
        }}
      >
        <Button
          style={{
            border: '1px solid #C0C0C0',
            borderRadius: '8px',
            background: '#40E0D0',
            color: 'white',
            width: '20%',
            marginRight: '10px',
            marginTop: '20px',
          }}
          onClick={onHandleCancel}
        >
          Hủy
        </Button>

        <Button
          style={{
            border: '1px solid #C0C0C0',
            borderRadius: '10px',
            background: '#FF6347',
            color: 'white',
            width: '20%',
          }}
          onClick={handleChangeAddress}
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAddress;
