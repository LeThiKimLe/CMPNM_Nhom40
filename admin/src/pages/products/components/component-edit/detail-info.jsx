import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Row, Col, InputNumber, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const inputStyle = {
  border: '1px solid #C0C0C0',
  borderRadius: '10px',
  fontWeight: '600',
  color: '#111',
  fontSize: '14px',
};
const requiredRule = {
  required: true,
  message: 'Vui lòng nhập thông tin!',
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const DetailInfo = (props) => {
  const { form, info } = props;
  const {
    name,
    productPictures,
    quantitySold,
    sale,
    salePrice,
    regularPrice,
    stock,
    category,
  } = info;
  const initialValues = {
    name,
    regularPrice,
    sale,
    quantitySold,
    salePrice,
    stock,
  };

  const categoryData = useSelector((state) => state.category);

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const categoryName = _.find(categoryData.categories, { _id: category }).name;
  const handleChangeUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Form form={form} initialValues={initialValues} {...formItemLayout}>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[requiredRule]}
          style={{ fontWeight: '500' }}
          className="username"
        >
          <Input
            style={inputStyle}
            placeholder="Tên sản phẩm"
            initialvalue={initialValues.name}
          />
        </Form.Item>
        <Form.Item
          label="Giá gốc (đ)"
          name="regularPrice"
          rules={[requiredRule]}
          style={{ fontWeight: '500' }}
          className="username"
        >
          <Input
            style={{ ...inputStyle, height: '40px' }}
            size="large"
            placeholder="Giá gốc"
            initialvalue={initialValues.regularPrice}
          />
        </Form.Item>{' '}
        <Form.Item
          className="username"
          label="Phần trăm giảm giá (%)"
          style={{ fontWeight: '500' }}
          name="sale"
          rules={[requiredRule]}
        >
          <InputNumber
            min={0}
            max={50}
            style={{ ...inputStyle }}
            step={1}
            initialvalue={initialValues.sale}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Giá đã giảm (đ)"
          style={{ fontWeight: '500' }}
          name="salePrice"
          rules={[requiredRule]}
        >
          <Input
            style={{ ...inputStyle, height: '40px' }}
            size="large"
            initialvalue={initialValues.salePrice}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Thương hiệu"
          style={{ fontWeight: '500' }}
          name="category"
          rules={[requiredRule]}
        >
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>
            {categoryName && categoryName}
          </span>
        </Form.Item>
        <Form.Item
          className="username"
          label="Số lượng trong kho"
          style={{ fontWeight: '500' }}
          name="stock"
        >
          <Input
            type="number"
            style={{ ...inputStyle }}
            placeholder="Số lượng sản phẩm"
            initalvalue={initialValues.stock}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Hình ảnh"
          style={{ fontWeight: '500' }}
          name="image"
          rules={[
            {
              required: true,
              message: 'Vui lòng tải hình ảnh!',
            },
          ]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept=".png, .jpeg, .jpg"
            multiple={true}
            listType="picture-card"
            fileList={fileList}
            onChange={handleChangeUpload}
            onPreview={handlePreview}
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
      </Form>
      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default DetailInfo;
