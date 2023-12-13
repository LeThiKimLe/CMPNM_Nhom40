import { Modal, Form, Button, Upload, Input, Spin, Switch } from 'antd';
import ImgCrop from 'antd-img-crop';
import React from 'react';

const EditCategoryModal = (props) => {
  const {
    visible,
    onFinish,
    loading,
    onCancel,
    form,
    fileList,
    onChange,
    onPreview,
  } = props;
  // form.submit
  const { name, categoryImage, checked } = form.getFieldsValue();

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
        open={visible}
        title="Edit Category"
        onCancel={onCancel}
      >
        <Form
          form={form}
          layout="vertical"
          className="row-col"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            className="username"
            label="Name"
            name="name"
            style={{ fontWeight: '600' }}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên thương hiệu',
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Tên thương hiệu"
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            />
          </Form.Item>

          <Form.Item
            name="checked"
            valuePropName="checked"
            className="username"
            label="Status"
            style={{ fontWeight: '600' }}
          >
            {checked ? <Switch defaultChecked /> : <Switch />}
          </Form.Item>
          <Form.Item
            className="username"
            label="Image"
            style={{ fontWeight: '600' }}
            rules={[
              {
                required: true,
                message: 'Please input image category!',
              },
            ]}
          >
            <Form.Item name="categoryImage">
              <ImgCrop rotate>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  accept=".png, .jpeg, .jpg"
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  + Upload
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Form.Item>

          <Form.Item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loading ? <Spin /> : null}
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: '100%' }}>
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategoryModal;
