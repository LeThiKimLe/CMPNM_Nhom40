import React, { useState } from 'react';
import { Button, Form, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProductModal from './components/modal-add';
import { useDispatch } from 'react-redux';
import productThunk from '../../features/product/product.service';

import { getBase64 } from '../../utils';
function Products() {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
    },
    {
      title: 'Giá gốc',
      key: 'originalPrice',
      dataIndex: 'originalPrice',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
    },

    {
      title: 'Màu sắc',
      key: 'color',
      dataIndex: 'color',
    },
    {
      title: 'Số lượng',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Hình ảnh',
      key: 'image',
      dataIndex: 'image',
    },
  ];
  // * useDispatch
  const dispatch = useDispatch();

  const [visibleAdd, setVisibleAdd] = useState(false);
  // *tab mô tả
  const [description, setDescription] = useState('');
  // *tab info
  const [colorSubmit, setColorSubmit] = useState('');
  const [fileList, setFileList] = useState([]);
  const [formTabInfo] = Form.useForm();
  const [formTabDigital] = Form.useForm();
  const onCancel = () => {
    setVisibleAdd(false);
  };

  const handleChangeUpload = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleAddProduct = async () => {
    if (fileList.length === 0) {
      notification.warn({
        message: 'Vui lòng chọn ảnh',
        placement: 'top',
      });
      return;
    }
    let productPictures = [];
    let productData = {};
    let listImage = [];
    let infoValues, digitalValues;

    fileList.forEach((file, index) => {
      const image = getBase64(file.originFileObj);
      console.log(typeof image);
      listImage.push(image);
    });

    const infoValuesForm = formTabInfo.validateFields();
    const digitalValuesForm = formTabDigital.validateFields();
    Promise.all([...listImage, infoValuesForm, digitalValuesForm])
      .then((values) => {
        for (let i = 0; i < fileList.length + 2; i++) {
          if (i < fileList.length) {
            productPictures.push(values[i]);
          }
          infoValues = values[fileList.length];
          digitalValues = values[fileList.length + 1];
        }

        infoValues.color = colorSubmit;
        if (!infoValues.sale) {
          infoValues.sale = '0';
        }
        infoValues.productPictures = productPictures;

        productData = {
          info: infoValues,
          digital: digitalValues,
          description,
        };
        delete infoValues.image;
        return new Promise((resolve, reject) => {
          resolve(productData);
        });
      })
      .then((result) => {
        console.log(result);
        dispatch(productThunk.createAPI(result));
      })
      .catch(() => {
        notification.warn({
          message: 'Vui lòng điền đầy đủ thông tin',
          placement: 'top',
        });
      });
  };
  return (
    <>
      <AddProductModal
        visible={visibleAdd}
        onCancel={onCancel}
        handleCancel={() => setVisibleAdd(false)}
        handleChangeUpload={handleChangeUpload}
        handleAddProduct={handleAddProduct}
        formTabInfo={formTabInfo}
        formTabDigital={formTabDigital}
        colorSubmit={colorSubmit}
        setColorSubmit={setColorSubmit}
        fileList={fileList}
        description={description}
        setDescription={setDescription}
      />
      <div className="layout-content">
        <Button
          style={{
            background: '#00994C',
            color: 'white',
            borderRadius: '10px',
          }}
          onClick={() => setVisibleAdd(true)}
          icon={<PlusOutlined />}
        >
          Thêm
        </Button>
      </div>
    </>
  );
}

export default Products;
