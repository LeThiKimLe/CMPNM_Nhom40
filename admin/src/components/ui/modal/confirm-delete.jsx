import { Modal, Result, Button, Spin } from 'antd';
import React from 'react';

const ConfirmDelete = (props) => {
  const { visible, handleDelete, loading, onCancel } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal footer={null} visible={visible} title="Delete Category" onCancel={onCancel} width={500}>
        <Result status="warning" title="Are you sure you want to delete?" />
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
        <Button onClick={handleDelete} style={{ background: '#40E0D0', color: 'white', width: '30%', marginRight: '10px' }}>
          Delete
        </Button>
        <Button onClick={onCancel} style={{ background: '#FF6347', color: 'white', width: '30%' }}>
          Cancel
        </Button>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
