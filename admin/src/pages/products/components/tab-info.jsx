import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Slider,
  Upload,
  Select,
  notification,
} from 'antd';
import ColorInput from '../components/color-input';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import categoryThunk from '../../../features/category/category.service';
import colorThunk from '../../../features/color/color.service';
const { Option } = Select;
const TabInfo = (props) => {
  const { form, setColorSubmit, colorSubmit, fileList, handleChangeUpload } =
    props;
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [categorySelect, setCategorySelect] = useState('');

  const [btnAddCheck, setBtnAddCheck] = useState(false);
  const [btnRemoveCheck, setBtnRemoveCheck] = useState(false);
  // * color
  const [colorList, setColorList] = useState([]);
  // * color selected

  const onChangeSelect = (value) => {
    setCategorySelect(value);
    dispatch(colorThunk.getColorAllByCategoryAPI(value))
      .unwrap()
      .then((res) => {
        setColorList(res.list);
      });
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  // * color input
  const removeColorBtnOpen = () => {
    if (!form.getFieldValue('category')) {
      notification.warn({
        message: 'Vui lòng chọn nhãn hiệu',
        placement: 'top',
      });
    } else {
      setBtnRemoveCheck(true);
      setColorSubmit('');
    }
  };
  const addColorBtnOpen = () => {
    if (!form.getFieldValue('category')) {
      notification.warn({
        message: 'Vui lòng chọn nhãn hiệu',
        placement: 'top',
      });
    } else {
      setBtnAddCheck(true);
      setColorSubmit('');
    }
  };
  // *color input
  useEffect(() => {
    if (category.categories.length === 0) {
      dispatch(categoryThunk.getAllAPI());
    }
  }, [category.categories, dispatch]);
  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Form.Item
          style={{ fontWeight: '600' }}
          className="username"
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên sản phẩm!',
            },
          ]}
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Tên sản phẩm"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Giá gốc (đ)"
          style={{ fontWeight: '600' }}
          name="regularPrice"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá sản phẩm!',
            },
          ]}
        >
          <Input
            style={{
              border: '1px solid #C0C0C0',
              borderRadius: '10px',
              width: '100%',
              height: '40px',
            }}
            size="large"
            placeholder="Giá gốc"
          />
        </Form.Item>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            {' '}
            <Form.Item
              className="username"
              label="Phần trăm giảm giá (%)"
              style={{ fontWeight: '600' }}
              name="sale"
              hasFeedback
            >
              <Row>
                <Col span={12}>
                  <InputNumber
                    min={0}
                    max={50}
                    style={{
                      borderRadius: '10px',
                    }}
                    size="middle"
                    step={1}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          className="username"
          label="Giá đã giảm (đ)"
          style={{ fontWeight: '600' }}
          name="salePrice"
        >
          <Input
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Thương hiệu"
          style={{ fontWeight: '600' }}
          name="category"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thương hiệu!',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn nhãn hiệu"
            optionFilterProp="children"
            onChange={onChangeSelect}
            size="large"
            onSearch={onSearch}
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {category.categories.map((category) => {
              return (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* color */}
        <Form.Item
          className="username"
          label="Màu sắc"
          style={{ fontWeight: '600' }}
          name="color"
        >
          <ColorInput
            setColorList={setColorList}
            category={categorySelect}
            colorList={colorList}
            addBtn={btnAddCheck}
            removeBtn={btnRemoveCheck}
            removeBtnOpen={removeColorBtnOpen}
            addBtnOpen={addColorBtnOpen}
            handleCloseAdd={() => setBtnAddCheck(false)}
            handleCloseRemove={() => setBtnRemoveCheck(false)}
            setColorSubmit={setColorSubmit}
            colorSubmit={colorSubmit}
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Số lượng trong kho"
          style={{ fontWeight: '600' }}
          name="stock"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền số lượng sản phẩm trong kho!',
            },
          ]}
        >
          <Input
            type="number"
            style={{ border: '1px solid #C0C0C0', borderRadius: '10px' }}
            placeholder="Số lượng sản phẩm"
          />
        </Form.Item>
        <Form.Item
          className="username"
          label="Hình ảnh"
          style={{ fontWeight: '600' }}
          name="image"
          rules={[
            {
              required: true,
              message: 'Please input image category!',
            },
          ]}
        >
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept=".png, .jpeg, .jpg"
            fileList={fileList}
            onChange={handleChangeUpload}
            multiple={true}
          >
            <Button
              style={{
                border: '1px solid #C0C0C0',
                borderRadius: '10px',
              }}
              icon={<UploadOutlined />}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default TabInfo;
