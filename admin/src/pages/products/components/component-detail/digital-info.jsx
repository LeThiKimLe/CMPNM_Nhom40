import React from 'react';

const DigitalInfo = (props) => {
  const { detailsProduct } = props;
  const {
    screen,
    OS,
    backCamera,
    cpu,
    frontCamera,
    ram,
    storage,
    sim,
    batteryPowerAndCharger,
  } = detailsProduct;
  const listData = [
    {
      name: 'Màn hình',
      value: screen && screen,
    },
    {
      name: 'Hệ điều hàng',
      value: OS && OS,
    },
    {
      name: 'Camera sau',
      value: backCamera && backCamera,
    },
    {
      name: 'Camera trước',
      value: frontCamera && frontCamera,
    },
    {
      name: 'Chip',
      value: cpu && cpu,
    },
    {
      name: 'Dung lượng Ram',
      value: ram && ram,
    },
    {
      name: 'Dung lượng lưu trữ',
      value: storage && storage,
    },
    {
      name: 'Thông số sim',
      value: sim && sim,
    },
    {
      name: 'Pin & sạc',
      value: batteryPowerAndCharger && batteryPowerAndCharger,
    },
  ];
  return (
    <div style={{ marginTop: '20px', marginLeft: '10px' }}>
      {listData.map((item, index) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              minWidth: '600px',
            }}
          >
            <p
              style={{
                minWidth: '250px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              {item.name}
            </p>
            <p style={{ fontSize: '16px', fontWeight: '400' }}>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DigitalInfo;
