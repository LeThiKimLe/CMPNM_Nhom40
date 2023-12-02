/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, List, Divider, Button } from 'antd';
import ModalAddAddress from './modal-add-address';
import AddressItem from './addressItem';
import MDButton from '../../components/MDButton';

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
    getAddressList,
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
      title="My Addresses"
      width={600}
    >
      <ModalAddAddress
        open={openModalAdd}
        setOpen={setOpenModalAdd}
        onCancel={() => setOpenModalAdd(false)}
        getAddressList={getAddressList}
      />
      <List
        itemLayout="horizontal"
        dataSource={listAddress}
        renderItem={(item, index) => (
          <div key={item._id}>
            <AddressItem
              item={item}
              keyIndex={index}
              addressIndex={addressIndex}
              setAddressIndex={setAddressIndex}
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
        <MDButton
          size="small"
          color="info"
          sx={{
            textTransform: 'initial !important',
            fontWeight: '500',
          }}
          onClick={() => setOpenModalAdd(true)}
        >
          Add new
        </MDButton>
      </div>
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
          onClick={onHandleCancel}
        >
          Cancel
        </MDButton>

        <MDButton
          size="small"
          color="dark"
          sx={{
            marginLeft: '10px',
            textTransform: 'initial !important',
            fontWeight: '500',
          }}
          onClick={handleChangeAddress}
        >
          Confirm
        </MDButton>
      </div>
    </Modal>
  );
};

export default ModalAddress;
