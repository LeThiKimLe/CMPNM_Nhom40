import React from 'react';
import { Modal, Tabs } from 'antd';
import DetailInfo from './component-edit/detail-info';
import DigitalInfo from './component-edit/digital-info';
import DescriptionTab from './component-edit/description';

const ModalEdit = (props) => {
  const { open, onCancel, formInfo, formDigital } = props;
  const listTabs = [
    {
      key: '1',
      label: 'Thông tin sản phẩm',
      children: <DetailInfo form={formInfo} />,
    },
    {
      key: '2',
      label: 'Thông số kỹ thuật',
      children: <DigitalInfo form={formDigital} />,
    },
    {
      key: '3',
      label: 'Mô tả sản phẩm',
      children: <DescriptionTab />,
    },
  ];
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title="Chỉnh sủa sản phẩm"
      width={800}
    >
      <Tabs defaultActiveKey="1" size="large" items={listTabs} />
    </Modal>
  );
};

export default ModalEdit;
