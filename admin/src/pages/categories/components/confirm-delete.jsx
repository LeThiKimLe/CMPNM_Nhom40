import { Modal, Result, Button, Row } from 'antd';
import React from 'react';

const ConfirmDeleteCategories = (props) => {
  const { open, handleDelete, onCancel, title } = props;
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
        <Result
          status="warning"
          title="Are you sure you want to delete it!"
          style={{ fontWeight: '600' }}
        />
        <Row className="custom-row-button" style={{ marginTop: '10px' }}>
          <Button className="delete-button" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="search-button" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Modal>
    </div>
  );
};

export default ConfirmDeleteCategories;
