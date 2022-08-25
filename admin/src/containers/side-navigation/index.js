import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faCircleUser, faRightToBracket, faPeopleGroup, faBoxesStacked, faBagShopping } from '@fortawesome/free-solid-svg-icons';
function Sidenav() {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Admin Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span className="icon">
              <FontAwesomeIcon icon={faToolbox} className="fa-lg" />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/products">
            <span className="icon">
              <FontAwesomeIcon icon={faBoxesStacked} className="fa-lg" />
            </span>
            <span className="label">Products</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/users">
            <span className="icon">
              <FontAwesomeIcon icon={faPeopleGroup} className="fa-lg" />
            </span>
            <span className="label">Users</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/orders">
            <span className="icon">
              <FontAwesomeIcon icon={faBagShopping} className="fa-lg" />
            </span>
            <span className="label">Orders</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/profile">
            <span className="icon">
              <FontAwesomeIcon icon={faCircleUser} className="fa-lg" />
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
