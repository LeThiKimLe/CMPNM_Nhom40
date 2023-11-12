import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faPeopleGroup,
  faBoxesStacked,
  faBagShopping,
  faHome,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
function Sidenav() {
  return (
    <>
      <div className="brand" style={{ margin: '10px 15px ' }}>
        <span style={{ color: '#fff' }}>Admin Dashboard</span>
      </div>
      <Menu>
        <Menu.Item key="dashboard">
          <NavLink to="/">
            <span className="icon">
              <FontAwesomeIcon icon={faHome} className="fa-lg" />
            </span>
            <span
              style={{
                fontWeight: '600',
                fontSize: '13px',
              }}
            >
              Dashboard
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users">
          <NavLink to="/users">
            <span className="icon">
              <FontAwesomeIcon icon={faPeopleGroup} className="fa-lg" />
            </span>
            <span style={{ fontWeight: '600', fontSize: '13px' }}>Users</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="categories">
          <NavLink to="/categories">
            <span className="icon">
              <FontAwesomeIcon icon={faLayerGroup} className="fa-lg" />
            </span>
            <span style={{ fontWeight: '600', fontSize: '13px' }}>
              Categories
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="products">
          <NavLink to="/products">
            <span className="icon">
              <FontAwesomeIcon icon={faBoxesStacked} className="fa-lg" />
            </span>
            <span
              className="label"
              style={{ fontWeight: '600', fontSize: '13px' }}
            >
              Products
            </span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="orders">
          <NavLink to="/orders">
            <span className="icon">
              <FontAwesomeIcon icon={faBagShopping} className="fa-lg" />
            </span>
            <span
              className="label"
              style={{ fontWeight: '600', fontSize: '13px' }}
            >
              Orders
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="banner">
          <NavLink to="/banner">
            <span className="icon">
              <FontAwesomeIcon icon={faImage} className="fa-lg" />
            </span>
            <span
              className="label"
              style={{ fontWeight: '600', color: '#fff', fontSize: '0.875rem' }}
            >
              Banner
            </span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
