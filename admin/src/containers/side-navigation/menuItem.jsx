import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const MenuItem = (props) => {
  const { icon, key, to, label } = props;
  return (
    <Menu.Item key={key}>
      <NavLink to={to}>
        <span className="icon">
          <FontAwesomeIcon icon={icon} className="fa-lg" />
        </span>
        <span className="label">{label}</span>
      </NavLink>
    </Menu.Item>
  );
};

export default MenuItem;
