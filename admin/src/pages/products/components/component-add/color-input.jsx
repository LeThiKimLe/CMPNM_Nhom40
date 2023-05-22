import React, { useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Input, notification, Row, Col, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import colorThunk from '../../../../features/color/color.service';

const deletebtn = [
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
      fill="#111827"
      className="fill-danger"
    ></path>
  </svg>,
];
const ColorInput = (props) => {
  const {
    colorList,
    addBtn,
    addBtnOpen,
    removeBtn,
    removeBtnOpen,
    handleCloseAdd,
    category,
    setColorList,
    handleCloseRemove,
    setColorSubmit,
    colorSubmit,
  } = props;
  const dispatch = useDispatch();
  const [color, setColor] = useState('');
  const [colorName, setColorName] = useState('');

  const handleSelectColor = (e, value) => {
    if (value === colorSubmit) {
      return;
    } else {
      setColorSubmit(value);
    }
  };

  const handleAddColor = () => {
    const colorData = {
      name: colorName,
      value: color.hex,
      category,
    };
    dispatch(colorThunk.addColorAPI(colorData))
      .unwrap()
      .then(() => {
        notification.success({ message: 'Color created successfully' });
        setTimeout(() => {
          handleCloseAdd();
          dispatch(colorThunk.getColorAllByCategoryAPI(category))
            .unwrap()
            .then((res) => {
              setColorList(res.list);
            });
        }, 1000);
      })
      .catch((error) => {
        notification.success({ message: error.message });
      });
  };
  const data = colorList.map((color) => {
    return { color: color.value };
  });
  return (
    <div>
      <Row align="middle" justify="start">
        <Col span={2}>
          {addBtn || removeBtn ? null : (
            <Button
              style={{
                width: '40px',
                height: '40px',
                paddingLeft: '3px',
                marginLeft: '3px',
              }}
              icon={<MinusOutlined />}
              size="small"
              onClick={removeBtnOpen}
            />
          )}
        </Col>
        <Col span={20}>
          <Row align="middle" justify="start">
            {!removeBtn ? (
              data.map((item, index) => {
                return (
                  <Button
                    key={index}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: item.color,
                      border:
                        colorSubmit === item.color ? '2px solid #000000' : '',
                      marginLeft: '20px',
                    }}
                    onClick={(e) => handleSelectColor(e, item.color)}
                  >
                    {' '}
                  </Button>
                );
              })
            ) : (
              <>
                {data.map((item, index) => {
                  return (
                    <Col span={2}>
                      <Button
                        style={{
                          background: item.color,
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          marginBottom: '10px',
                        }}
                      >
                        {' '}
                      </Button>
                      <Button
                        style={{
                          width: '40px',
                          height: '40px',
                        }}
                        danger
                      >
                        {deletebtn}
                      </Button>
                    </Col>
                  );
                })}
                <Button
                  style={{
                    border: '1px solid #C0C0C0',
                    borderRadius: '10px',
                    background: '#FF6347',
                    color: 'white',
                    width: '80px',
                    height: '40px',
                  }}
                  onClick={handleCloseRemove}
                >
                  Hủy
                </Button>
              </>
            )}
          </Row>
        </Col>
        <Col span={2}>
          {addBtn || removeBtn ? null : (
            <Button
              style={{
                width: '40px',
                height: '40px',
                paddingLeft: '3px',
                marginLeft: '3px',
              }}
              icon={<PlusOutlined />}
              onClick={addBtnOpen}
            ></Button>
          )}
        </Col>
      </Row>
      {/* list color */}

      {addBtn ? (
        <div
          style={{
            border: '1px solid #C0C0C0',
            borderRadius: '10px',
            padding: '20px',
            margin: '10px',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <span>Tên màu:</span>
              <Input
                style={{
                  borderRadius: '10px',
                }}
                onChange={(e) => setColorName(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <span>Giá trị: </span>
              <SketchPicker
                color={color}
                onChange={(updateColor) => setColor(updateColor)}
              />
            </Col>
          </Row>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              onClick={handleAddColor}
              style={{
                background: '#40E0D0',
                color: 'white',
                marginRight: '10px',
                minWidth: '80px',
              }}
            >
              Thêm
            </Button>
            <Button
              onClick={handleCloseAdd}
              style={{
                background: '#FF6347',
                color: 'white',
                minWidth: '80px',
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ColorInput;
