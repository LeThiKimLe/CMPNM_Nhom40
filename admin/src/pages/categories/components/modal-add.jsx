import { Modal, Form, Button, Upload, Input, Spin, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
const { Option } = Select;
const AddCategoryModal = (props) => {
  const {
    visible,
    onFinish,
    loading,
    onCancel,
    form,
    handleCancel,
    categoriesParent,
    setCategoryParent,
  } = props;
  // form.submit
  const handleCategoryParent = (value) => {
    console.log(value);
    setCategoryParent(value);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
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
        title="Thêm mới thương hiệu"
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
            label="Tên"
            style={{ fontWeight: '600' }}
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên thương hiệu!',
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Thương hiệu"
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            />
          </Form.Item>
          <Form.Item
            className="username"
            label="Thương hiệu"
            style={{ fontWeight: '600' }}
            name="parentId"
          >
            <Select
              showSearch
              placeholder="Chọn nhãn hiệu"
              optionFilterProp="children"
              onChange={handleCategoryParent}
              size="large"
              onSearch={onSearch}
              style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {categoriesParent.length > 0
                ? categoriesParent.map((category) => {
                    return (
                      <Option
                        size="large"
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            className="username"
            label="Hình ảnh"
            style={{ fontWeight: '600' }}
            name="image"
          >
            <Upload
              beforeUpload={() => {
                return false;
              }}
              accept=".png, .jpeg, .jpg"
            >
              <Button
                style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
                icon={<UploadOutlined />}
              >
                Click để tải ảnh
              </Button>
            </Upload>
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
            <Button
              htmlType="submit"
              style={{
                border: '1px solid #C0C0C0',
                borderRadius: '10px',
                background: '#40E0D0',
                color: 'white',
                width: '30%',
                marginRight: '10px',
              }}
            >
              Thêm
            </Button>

            <Button
              onClick={handleCancel}
              style={{
                border: '1px solid #C0C0C0',
                borderRadius: '10px',
                background: '#FF6347',
                color: 'white',
                width: '30%',
              }}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
