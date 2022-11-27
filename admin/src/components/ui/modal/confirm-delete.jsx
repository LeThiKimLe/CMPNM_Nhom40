import { Modal, Result, Button, Spin } from 'antd';
import React from 'react';

const ConfirmDelete = (props) => {
  const { open, handleDelete, loading, onCancel, title } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal
        footer={null}
        open={open}
        title={title}
        onCancel={onCancel}
        width={500}
      >
        <Result status="warning" title="Bạn có chắc chăn muốn xóa không!" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '20px',
          }}
        >
          {loading ? <Spin /> : null}
        </div>
        <Button
          onClick={handleDelete}
          style={{
            background: '#40E0D0',
            color: 'white',
            width: '30%',
            marginRight: '10px',
          }}
        >
          Xóa
        </Button>
        <Button
          onClick={onCancel}
          style={{ background: '#FF6347', color: 'white', width: '30%' }}
        >
          Hủy
        </Button>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
