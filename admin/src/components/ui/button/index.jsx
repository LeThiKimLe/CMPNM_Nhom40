import React from 'react';
import { Button } from 'antd';

const ButtonHandle = (props) => {
  const { bgColor, icon, handle, title } = props;
  return (
    <Button
      style={{
        background: bgColor,
        color: 'white',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
        paddingBottom: '10px',
      }}
      icon={icon}
      onClick={handle}
    >
      {title}
    </Button>
  );
};

export default ButtonHandle;
